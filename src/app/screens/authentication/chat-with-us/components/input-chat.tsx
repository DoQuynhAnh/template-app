/* eslint-disable no-nested-ternary */
import React from 'react';
import { Image, TextInput, TouchableOpacity } from 'react-native';
import { ComposerProps, IMessage, SendProps } from 'react-native-gifted-chat';

import { useTranslation } from 'react-i18next';

import { Block } from '@/library/components/block';
import { Spacer } from '@/library/components/spacer';
import { useStyles } from 'react-native-unistyles';
import _AntDesign from 'react-native-vector-icons/AntDesign';
import _EvilIcons from 'react-native-vector-icons/EvilIcons';
import _FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Text } from '@/library/components/text';
import { IUploadImage } from '../../../../services/service-chat/chat.api';
import { getImageUrl } from '@/utils';
import { styles } from '../styles';

const EvilIcons = _EvilIcons as unknown as React.ElementType;
const FontAwesome = _FontAwesome as unknown as React.ElementType;
const AntDesign = _AntDesign as unknown as React.ElementType;

export const CustomSend = (
  props: SendProps<IMessage> & {
    selectedImage: { id: string; url: string } | null;
    file: IUploadImage | undefined;
  },
) => {
  const { text, onSend } = props;
  // const { t } = useTranslation();
  const {
    theme: { color },
  } = useStyles();

  const handleSend = () => {
    if (onSend) {
      onSend({ text: text?.trim() ?? '' }, true);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSend}
      // disabled={file ? false : selectedImage ? false : !text}
      // style={{ opacity: selectedImage || file ? 1 : text ? 1 : 0.5 }}

      disabled={!text}
      style={{ opacity:  text ? 1 : 0.5 }}
      >
      <Block
        width={32}
        height={32}
        middle
        justifyContent="center"
        borderRadius={32}>
        <FontAwesome name="send" color={color.primaryBase} size={16} />
      </Block>
    </TouchableOpacity>
  );
};

export const CustomComposer = (props: ComposerProps) => {
  const { text, onTextChanged, placeholder } = props;
  const { t } = useTranslation();
  const {
    theme: { color, textPresets },
  } = useStyles();

  return (
    <TextInput
      testID="gifted-chat-composer"
      accessible
      accessibilityLabel="Message input"
      placeholder={placeholder || t('chat_with_us:input_placeholder')}
      placeholderTextColor={color.neutral_05}
      multiline={false}
      onChange={e => {
        if (onTextChanged) {
          onTextChanged(e.nativeEvent.text);
        }
      }}
      style={[
        textPresets.placeholder,
        styles.input,
        { color: color.Neutrals07, width: '100%' },
      ]}
      value={text}
      enablesReturnKeyAutomatically
      underlineColorAndroid="transparent"
      keyboardAppearance="light"
      selectionColor={color.primaryBase}
      autoCorrect={false}
    />
  );
};

export const InputChat = (
  props: SendProps<IMessage> &
    ComposerProps & {
      selectedImage: {
        id: string;
        url: string;
      } | null;
      file: IUploadImage | undefined;
      handleAddMedia: () => Promise<void>;
      handleAddFile: () => Promise<void>;
      setSelectedImage: (
        value: React.SetStateAction<{ id: string; url: string } | null>,
      ) => void;
      setFile: React.Dispatch<React.SetStateAction<IUploadImage | undefined>>;
      setIsShowOption: React.Dispatch<React.SetStateAction<boolean>>;
      isShowOption: boolean;
    },
) => {
  const {
    file,
    isShowOption,
    selectedImage,
    setFile,
    handleAddFile,
    handleAddMedia,
    setIsShowOption,
    setSelectedImage,
  } = props;
  return (
    <Block
      padding={16}
      colorTheme="background"
      direction="row"
      width={'100%'}
      paddingBottom={5}
      style={{
        position: 'relative',
      }}
      middle>
      {isShowOption && (
        <Block
          style={{
            position: 'absolute',
            backgroundColor: '#5c5c5c',
            gap: 17,
            top: -60,
            left: 5,
          }}
          padding={10}
          borderRadius={10}
          color=""
          direction="column"
          justifyContent="center"
          alignItems="center">
          <TouchableOpacity
            onPress={() => {
              handleAddMedia();
              setIsShowOption(false);
            }}>
            <EvilIcons size={30} name="image" color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleAddFile();
              setIsShowOption(false);
            }}>
            <AntDesign size={20} name="addfile" color={'#fff'} />
          </TouchableOpacity>
          {/*  */}
        </Block>
      )}

      <TouchableOpacity onPress={() => setIsShowOption(true)}>
        <AntDesign size={20} name="pluscircle" color={'#2760ED'} />
      </TouchableOpacity>

      {/* Hiện preview ảnh nếu đã chọn */}
      {selectedImage && (
        <Block width={40} height={40} marginLeft={8}>
          <Image
            source={{ uri: getImageUrl(selectedImage.url) }}
            style={{ width: 40, height: 40, borderRadius: 4 }}
          />
          <TouchableOpacity
            style={{ position: 'absolute', top: -4, right: -4 }}
            onPress={() => setSelectedImage(null)}>
            <FontAwesome name="times-circle" color={'#d1cfcf'} size={16} />
          </TouchableOpacity>
        </Block>
      )}

      {file && (
        <Block
          paddingHorizontal={8}
          paddingVertical={4}
          color="#f0f0f0"
          borderRadius={4}
          direction="row"
          alignItems="center"
          marginLeft={8}
          // marginRight={8}
          >
          <FontAwesome name="file" color={'#2760ED'} size={16} />
          <Spacer width={4} />
          <Text numberOfLines={1} style={{ width: 70, fontSize: 12 }}>
            {file.originalname}
          </Text>
          <TouchableOpacity
            style={{ marginLeft: 4 }}
            onPress={() => setFile(undefined)}>
            <FontAwesome name="times-circle" color={'#2760ED'} size={14} />
          </TouchableOpacity>
        </Block>
      )}

      <Spacer width={8} />
      <Block
        borderColorTheme="primaryBase"
        borderWidth={1}
        borderRadius={48}
        padding={8}
        paddingLeft={8}
        // eslint-disable-next-line no-nested-ternary
        width={file ? (file ? '58%' : '94%') : selectedImage ? '82%' : '94%'}
        // block
        direction="row">
        <Block block>
          <CustomComposer {...props} />
        </Block>
        <Spacer width={8} />
        <CustomSend {...props} />
      </Block>
    </Block>
  );
};
