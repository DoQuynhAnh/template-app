/* eslint-disable no-inline-comments */
import { Text } from '@/library/components/text';
import moment from 'moment';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IMessage, MessageProps } from 'react-native-gifted-chat';

const RenderMessage = (props: MessageProps<IMessage>) => {
  const { currentMessage } = props;
  if (!currentMessage) return null;

  return (
    <View style={styles.messageContainer}>
      <View style={styles.messageBubble}>
        <Text style={styles.messageText}>{currentMessage.text}</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {moment(currentMessage.createdAt).format('hh:mm DD/MM/YYYY')}
          </Text>
          {currentMessage.received && (
            <View style={styles.tickContainer}>
              <Text style={styles.tickText}>✓✓</Text>
            </View>
          )}
          {!currentMessage.received && currentMessage.sent && (
            <View style={styles.tickContainer}>
              <Text style={styles.tickText}>✓</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: '80%',
    alignSelf: 'flex-end', // All messages aligned to right
  },
  messageBubble: {
    backgroundColor: '#3e99e5', // Hanvietair blue color from screenshot
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 40,
  },
  messageText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginRight: 2,
  },
  tickContainer: {
    marginLeft: 2,
  },
  tickText: {
    color: 'white',
    fontSize: 12,
  },
//   dayContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 10,
//   },
//   dayBubble: {
//     backgroundColor: '#4a4a4a',
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   dayText: {
//     color: 'white',
//     fontSize: 14,
//   },
});

export default RenderMessage;
