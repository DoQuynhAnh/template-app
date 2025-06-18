/* eslint-disable no-inline-comments */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSocket } from '@/common/socketIo';
import { Screen } from '@/library/components/screen';
import { useProfileStore } from '@/zustands/profile';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import {
  convertToGiftedChatFormat,
  CustomDBMessage,
  getfetchChatHistorys,
  IUploadImage,
  sortMessagesByDateDesc,
  useDeleteChatMessages,
  UserMapping,
  useUploadFile,
  useUploadImage,
} from '../../../services/service-chat/chat.api';
import { Header } from './components/header';
import { InputChat } from './components/input-chat';

import { pickFile, pickMedia } from '@/common/method';
import { Spacer } from '@/library/components/spacer';
import { getItem } from '@/library/storage';
import { useIsFocused } from '@react-navigation/native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import {
  CLIENT_LOCAL,
  IClient,
} from '../../../services/service-auth/login.api';
import { BottomSheet, renderBubble } from './components/standard-chat-bubbles';
import { ImagePreview } from './components/image-preview';
// import { getFileUrl } from '@/utils';
import { FilePreview } from './components/file-preview';
import { useTranslation } from 'react-i18next';
// import { useAssetChat } from '@/zustands/asset-chat';

export interface IMessageCustom extends IMessage {
  isFile?: boolean;
  file?: IUploadImage;
}

const ChatWithUs = () => {
  const { t } = useTranslation();
  const client: IClient = useMemo(() => getItem(CLIENT_LOCAL), []);
  const { socketListen, socketInit, socket } = useSocket();
  const { styles } = useStyles(styleSheet);
  const rootRef = useRef<View>(null);
  const isFocused = useIsFocused();

  const { userInfor } = useProfileStore();
  // const { setSelectedImage, file, selectedImage, setFile } = useAssetChat();

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    id: string;
    url: string;
  } | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<IMessageCustom | null>(
    null,
  );
  const [file, setFile] = useState<IUploadImage | undefined>(undefined);
  const [isShowOption, setIsShowOption] = useState(false);
  const [itemPreview, setItemPreview] = useState<IMessageCustom | null>(null);
  const [selectedFile, setSelectedFile] = useState<IUploadImage | null>(null);

  const { mutateAsync } = useUploadImage();
  const { mutateAsync: mutateUploadFile } = useUploadFile();
  const { isFetching, data, refetch } = getfetchChatHistorys();
  const { mutateAsync: deleteChatMessagesAsync } = useDeleteChatMessages();

  const userMapping: UserMapping = {
    USER_ID: {
      _id: client?._id ?? '67e59b1c62885b1926d99fc4',
      name: 'username',
    },
    '67e6d79e5a0316025c26f466': {
      _id: '67e6d79e5a0316025c26f466',
      name: 'Customer Support',
    },
  };

  const [messages, setMessages] = useState<IMessageCustom[]>([]);

  useEffect(() => {
    if (itemPreview) {
    }
  }, [itemPreview]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const convertedMessages = sortMessagesByDateDesc(
      data.hits as unknown as CustomDBMessage[],
    ).map(msg =>
      convertToGiftedChatFormat(
        msg,
        client?._id ?? '67e59b1c62885b1926d99fc4',
        userMapping,
      ),
    );

    setMessages([...convertedMessages]);
  }, [data, isFetching]);

  useEffect(() => {
    if (!socket) {
      socketInit();
    }
  }, []);

  // Handler for sending messages
  const onSend = useCallback(
    (newMessages: IMessageCustom[] = []) => {
      const chatMessage = {
        content: newMessages[0].text,
      } as { content: string; attachments?: string[] };

      if (selectedImage) {
        chatMessage.attachments = [selectedImage.id];
      }
      if (file) {
        chatMessage.attachments = [file._id];
      }
      setSelectedImage(null);
      setFile(undefined);

      const newMessage: IMessageCustom = {
        _id: Date.now().toString(),
        text: newMessages[0].text,
        createdAt: new Date(),
        user: {
          _id: client._id,
          name: client.fullname,
        },
        sent: true,
        image: selectedImage?.url || undefined,
        isFile: !!file,
        file,
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [newMessage]),
      );

      socket?.emit('sendMessage', chatMessage);
    },
    [socket, selectedImage, file],
  );

  const onHandleSocket = () => {
    socketListen('newMessage', message => {
      const formattedReply = convertToGiftedChatFormat(
        message,
        client?._id ?? '67e59b1c62885b1926d99fc4',
        userMapping,
      );
      console.log({ message });

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [{ ...formattedReply }]),
      );
    });

    socket?.on('messageSent', _ => {
      // const formattedReply = convertToGiftedChatFormat(
      //   msg,
      //   client?._id ?? '67e59b1c62885b1926d99fc4',
      //   userMapping,
      // );
      // console.log({ msg });
      // setMessages(previousMessages =>
      //   GiftedChat.append(previousMessages, [
      //     {
      //       ...formattedReply,
      //       image: selectedImage?.url || undefined,
      //       file: file,
      //       isFile: !!file,
      //     },
      //   ]),
      // );
      // console.log({ file, selectedImage });
      setSelectedImage(null);
      setFile(undefined);
    });
  };

  useEffect(() => {
    onHandleSocket();
  }, [socket, selectedImage, file]);

  // Handle long press on bubble
  const handleLongPress = useCallback((_: any, message: IMessageCustom) => {
    setSelectedMessage(message);

    const userID = userInfor?._id ? userInfor?._id : '67e59b1c62885b1926d99fc4';
    setBottomSheetVisible(message.user._id === userID);
  }, []);

  const handleDeleteMessage = useCallback(async () => {
    if (!selectedMessage) {
      return;
    }
    await deleteChatMessagesAsync(selectedMessage._id as string);
    setMessages(prevMessages =>
      prevMessages.filter(message => message._id !== selectedMessage._id),
    );

    Alert.alert(t('chat_with_us:message_deleted'));
    setBottomSheetVisible(false);
  }, [selectedMessage]);

  const closeBottomSheet = useCallback(() => {
    setBottomSheetVisible(false);
  }, []);

  const handleFilePress = useCallback((message: IMessageCustom) => {
    if (message.file) {
      setSelectedFile(message.file);
    }
  }, []);

  const handleCloseFilePreview = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const handleAddMedia = async () => {
    const media = await pickMedia({ mediaType: 'photo' });
    if (media) {
      const param = {
        type: media.type ?? '',
        name: media.fileName,
        uri: media.uri,
      };

      const formData = new FormData();
      formData.append('image', param);
      const { data: response } = await mutateAsync(formData);
      setSelectedImage({ id: response._id, url: response.publicUrl ?? '' });
      setFile(undefined);
    }
  };

  const handleAddFile = async () => {
    const fileItem = await pickFile();
    if (fileItem) {
      const formData = new FormData();
      formData.append('file', {
        type: fileItem.type ?? '',
        name: fileItem.name,
        uri: fileItem.uri,
      });

      const { data: response } = await mutateUploadFile(formData);
      setFile({
        ...response,
      });
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
    setMessages([]);
  }, [isFocused]);

  console.log(messages, 'messages');

  // Xử lý đóng preview ảnh
  const handleClosePreview = useCallback(() => {
    setItemPreview(null);
  }, []);

  return (
    <View
      collapsable={false}
      ref={rootRef}
      style={styles.root}
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => {
        isShowOption && setIsShowOption(false);
      }}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Header />
        <KeyboardAvoidingView style={styles.keyboard} enabled>
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: userInfor?._id ?? '67e59b1c62885b1926d99fc4',
              name: 'username',
            }}
            renderBubble={e =>
              renderBubble({
                bubbleProps: e,
                handleLongPress,
                client,
                setItemPreview,
                handleFilePress,
              })
            }
            alwaysShowSend
            infiniteScroll
            renderInputToolbar={props =>
              InputChat({
                ...props,
                file,
                isShowOption,
                selectedImage,
                setFile,
                handleAddFile,
                handleAddMedia,
                setSelectedImage,
                setIsShowOption,
              })
            }
            bottomOffset={-80}
          />
          {<Spacer height={50} />}
        </KeyboardAvoidingView>

        <BottomSheet
          visible={bottomSheetVisible}
          onClose={closeBottomSheet}
          onDelete={handleDeleteMessage}
          message={selectedMessage}
          currentUserId={userInfor?._id ?? '67e59b1c62885b1926d99fc4'}
        />
        <ImagePreview message={itemPreview} onClose={handleClosePreview} />
        <FilePreview file={selectedFile} onClose={handleCloseFilePreview} />
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.primaryWhite,
    flex: 1,
  },
  keyboard: {
    height: '100%',
  },
}));
export default ChatWithUs;
