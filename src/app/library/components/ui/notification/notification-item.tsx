import { timeAgoType2 } from '@/common/method';
import {
  INotification,
  postReadNotication,
} from '../../../../services/notifications/notifications.api';
import IconItemNotification from '@assets/icon/svg/icon-item-notification';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import i18n from '@/library/utils/i18n';

interface IPNotificationItem {
  item: INotification;
}

const NotificationItem = ({ item }: IPNotificationItem) => {
  const { isRead } = item;
  const { styles } = useStyles(styleSheet);
  const { mutateAsync } = postReadNotication();
  const [isUnread, setIsUnread] = useState(false);
  const currentLanguage = i18n.language;

  const handleReadNotification = async () => {
    await mutateAsync(item._id);
    setIsUnread(false);
  };

  useEffect(() => {
    setIsUnread(!isRead);
  }, [isRead]);

  return (
    <TouchableOpacity onPress={() => handleReadNotification()}>
      <View
        style={[
          styles.notificationItem,
          isUnread ? styles.unRead : styles.read,
        ]}>
        <View style={styles.iconContainer}>
          <View style={styles.svgIcon}>
            <IconItemNotification />
          </View>
          {/* /> */}
        </View>

        <View style={styles.notificationContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.body}</Text>
          <Text style={styles.timeStamp}>
            {timeAgoType2(item.createdAt, {
              locale: currentLanguage as 'en' | 'vi',
            })}
          </Text>
        </View>

        {/* Chấm xanh hiển thị trạng thái chưa đọc */}
        {isUnread && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  description: {
    color: color.dark150,
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 8,
  },

  iconContainer: {
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    marginRight: 16,
    width: 50,
  },

  notificationContent: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    position: 'relative',
  },
  read: {
    backgroundColor: color.primaryWhite,
  },
  svgIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgIconText: {
    color: '#4CAF50',
    fontSize: 20,
  },
  timeStamp: {
    color: color.base01,
    fontSize: 14,
  },
  title: {
    color: color.Neutrals07,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  unRead: {
    backgroundColor: color.dark200,
  },
  unreadDot: {
    backgroundColor: color.primaryBase,
    borderRadius: 4,
    height: 8,
    width: 8,
  },
}));

export default NotificationItem;
