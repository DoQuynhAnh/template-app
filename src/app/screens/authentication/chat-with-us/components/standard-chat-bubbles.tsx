/* eslint-disable no-inline-comments */
import { getImageUrl } from '@/utils';
import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Bubble,
  BubbleProps,
  IMessage,
  Time,
  TimeProps,
} from 'react-native-gifted-chat';
import { IMessageCustom } from '..';
import { FileMessageItem } from './file-message-item';
import { IClient } from '../../../../services/service-auth/login.api';
import { useTranslation } from 'react-i18next';

const { height } = Dimensions.get('window');

export const renderBubble = ({
  client,
  bubbleProps,
  setItemPreview,
  handleLongPress,
  handleFilePress
}: {
  client: IClient;
  bubbleProps: BubbleProps<IMessageCustom>;
  handleFilePress: (message: IMessageCustom) => void
  handleLongPress: (context: any, message: IMessageCustom) => void;
  setItemPreview: React.Dispatch<React.SetStateAction<IMessageCustom | null>>;
}) => {
  const { currentMessage } = bubbleProps;

  // console.log(currentMessage, 'currentMessage');

  if (!currentMessage) return null;

  const renderCustomView = () => {
    // Render image if present
    if (currentMessage?.image) {
      return (
        <TouchableOpacity style={styles.imageContainer} onPress={() => setItemPreview(currentMessage)}>
          <Image
            source={{ uri: getImageUrl(currentMessage.image) }}
            style={styles.messageImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      );
    }

    // Render file if present
    if (currentMessage?.isFile) {
      return (
         <FileMessageItem
          fileInfo={currentMessage?.file}
          position={currentMessage.user._id === client._id ? 'right' : 'left'}
          onPress={(fileInfo) => handleFilePress && handleFilePress({...currentMessage, file: fileInfo})}
        />
      );
    }

    return null;
  };

  return (
    <Bubble
      onLongPress={handleLongPress}
      onPress={e => console.log(e, 'long press 2')}
      {...bubbleProps}
      wrapperStyle={{
        left: {
          backgroundColor: '#EAEAEA',
          marginRight: 60,
          borderRadius: 16,
          padding: 2,
        },
        right: {
          backgroundColor: '#2760ED',
          marginLeft: 60,
          borderRadius: 16,
          padding: 2,
        },
      }}
      textStyle={{
        left: {
          color: '#23262F',
        },
        right: {
          color: '#FCFCFD',
        },
      }}
      bottomContainerStyle={{
        left: {
          justifyContent: 'flex-end',
        },
        right: {
          justifyContent: 'flex-end',
        },
      }}
      tickStyle={{
        color: 'white',
        fontSize: 10,
      }}
      renderTime={timeProps => renderMessageTime(timeProps)}
      renderCustomView={() => renderCustomView()}
      renderMessageImage={() => null}
    />
  );
};

// Custom Time component for messages
const renderMessageTime = (props: TimeProps<IMessage>) => {
  const { currentMessage } = props;

  if (!currentMessage?.createdAt) return null;

  return (
    <Time
      {...props}
      timeTextStyle={{
        left: {
          color: '#888',
          fontSize: 12,
        },
        right: {
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: 12,
        },
      }}
    />
  );
};

// Custom Day component that matches your design
export const renderDay = (props: any) => {
  return (
    <View style={styles.dayContainer}>
      <View style={styles.dayBubble}>
        <Text style={styles.dayText}>
          {props.currentMessage?.createdAt
            ? formatDay(props.currentMessage.createdAt)
            : 'Today'}
        </Text>
      </View>
    </View>
  );
};

// Helper function to format day from Date or timestamp
const formatDay = (date: Date | number): string => {
  if (!date) return '';

  const messageDate = typeof date === 'number' ? new Date(date) : date;

  // Check if the date is today
  const today = new Date();
  if (messageDate.toDateString() === today.toDateString()) {
    return 'Today';
  }

  // Format as day and month
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return `${messageDate.getDate()} ${months[messageDate.getMonth()]}`;
};

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  message: IMessage | null;
  currentUserId: string;
}

// Bottom Sheet component for message options
export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  onDelete,
  message,
  currentUserId,
}) => {
  // Animation value for the bottom sheet position
  const translateY = useRef(new Animated.Value(height)).current;
  const {t} = useTranslation();

  // Show/hide bottom sheet with animation
  React.useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, translateY]);

  // Pan responder for dragging the bottom sheet
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          onClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  // Check if the message belongs to the current user
  const isOwnMessage = message?.user._id === currentUserId;

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
      <Animated.View
        style={[styles.bottomSheetContainer, { transform: [{ translateY }] }]}>
        <View style={styles.dragHandleContainer} {...panResponder.panHandlers}>
          <View style={styles.dragHandle} />
        </View>

        {/* <Text style={styles.bottomSheetTitle}>Tùy chọn tin nhắn</Text> */}

        {isOwnMessage && (
          <TouchableOpacity
            style={{ ...styles.optionButton, justifyContent: 'center' }}
            onPress={onDelete}>
            <Text style={{ ...styles.deleteText, textAlign: 'center' }}>
              {t('chat_with_us:delete_message')}
            </Text>
          </TouchableOpacity>
        )}

        {/* <OutlineButton text="Hủy" onPress={onClose} /> */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dayBubble: {
    backgroundColor: '#4a4a4a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dayText: {
    color: 'white',
    fontSize: 14,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  dragHandleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
  },
  optionButton: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  deleteText: {
    color: '#ff3b30',
    fontSize: 16,
  },
  imageContainer: {
    padding: 4,
    // marginBottom: 5,
  },
  messageImage: {
    width: 150,
    height: 100,
    borderRadius: 13,
  },
});
