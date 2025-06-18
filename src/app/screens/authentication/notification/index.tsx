/* eslint-disable react/no-unstable-nested-components */
import { ListView } from '@/library/components/list-view';
import { Screen } from '@/library/components/screen';
import Header from '@/library/components/ui/header';
import NotificationItem from '@/library/components/ui/notification/notification-item';
import { APP_SCREEN } from '@/navigation/screen-types';
import {
  getNotications,
  INotification,
  postReadAllNotication,
} from '../../../services/notifications/notifications.api';
import SettingIcon from '@assets/icon/svg/setting-icon';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Loading } from '@/library/components/post-delay/loading';
import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';
import { navigateScreen } from '@/navigation/navigation-service';
import { useTranslation } from 'react-i18next';

const Notification = () => {
  const {t} = useTranslation();
  const { data, isFetching, refetch } = getNotications();
  const { styles } = useStyles(styleSheet);
  const rootRef = useRef<View>(null);
  const navigation = useNavigation();
  const { mutateAsync } = postReadAllNotication();

  const renderItem = useCallback(({ item }: { item: INotification }) => {
    return <NotificationItem item={item} key={item._id} />;
  }, []);

  const handleReadAllNotification = async () => {
    await mutateAsync();
    refetch();
  };

  const handleNavigateToHome = () => {
    navigateScreen(APP_SCREEN.HOME);
  };

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'light'}
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Header
          title={t('notification:header')}
          customBackButton={handleNavigateToHome}
          renderRight={() => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(APP_SCREEN.SETTING_NOTIFICATION);
              }}>
              <SettingIcon />
            </TouchableOpacity>
          )}
          // isShowLeft={false}
        />
        <View style={styles.container}>
          <Block
            paddingHorizontal={16}
            marginTop={15}
            paddingBottom={15}
            justifyContent="flex-end"
            alignItems="center"
            direction="row">
            <TouchableOpacity
              onPress={() => {
                handleReadAllNotification();
              }}>
              <Text colorTheme="primaryBase" fontSize={14} fontWeight="600">
                {t('notification:Mark_all_as_read')}
              </Text>
            </TouchableOpacity>
          </Block>
          {isFetching ? (
            <Loading />
          ) : (
            <ListView
              data={data?.hits}
              renderItem={renderItem}
              estimatedItemSize={56}
            />
          )}

          <View style={{ height: 50 }} />
        </View>
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.primaryWhite,
    height: '100%',
  },

  container: {
    width: '100%',
    height: '100%',
  },
}));

export default Notification;
