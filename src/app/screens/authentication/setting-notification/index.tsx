/* eslint-disable no-inline-comments */
import { Screen } from '@/library/components/screen';
import ToggleSwitch from '@/library/components/toggle-switch';
import Header from '@/library/components/ui/header';
import React, { useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const SettingNotification = () => {
  const rootRef = useRef<View>(null);
  const { styles } = useStyles(styleSheet);

  // Khởi tạo state cho các loại thông báo
  const [settings, setSettings] = useState({
    orderUpdates: true,
    // Chat của cửa hàng
    productChat: true,

    // Chat của sàn
    promotions: true,
    // Cập nhập đơn hàng
    storeChat: false, // Khuyến mãi
    systemUpdates: true, // Hệ thống
  });

  // Hàm xử lý thay đổi trạng thái switch
  interface Settings {
    orderUpdates: boolean;
    storeChat: boolean;
    productChat: boolean;
    promotions: boolean;
    systemUpdates: boolean;
  }

  const toggleSwitch = (key: keyof Settings) => {
    setSettings((prevState: Settings) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Header title="Cài đặt thông báo" />

        <View style={styles.container}>
          {/* Cập nhập đơn hàng */}
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Cập nhập đơn hàng</Text>
            <ToggleSwitch
              onToggle={() => toggleSwitch('orderUpdates')}
              isOn={settings.orderUpdates}
              trackOffColor="#B1B5C3"
              trackOnColor="#2760ED"
            />
          </View>

          {/* Chat của cửa hàng */}
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Chat của cửa hàng</Text>
            <ToggleSwitch
              onToggle={() => toggleSwitch('storeChat')}
              isOn={settings.storeChat}
              trackOffColor="#B1B5C3"
              trackOnColor="#2760ED"
            />
          </View>

          {/* Chat của sản */}
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Chat của sàn</Text>
            <ToggleSwitch
              onToggle={() => toggleSwitch('productChat')}
              isOn={settings.productChat}
              trackOffColor="#B1B5C3"
              trackOnColor="#2760ED"
            />
          </View>

          {/* Khuyến mãi */}
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Khuyến mãi</Text>
            <ToggleSwitch
              onToggle={() => toggleSwitch('promotions')}
              isOn={settings.promotions}
              trackOffColor="#B1B5C3"
              trackOnColor="#2760ED"
            />
          </View>

          {/* Hệ thống */}
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Hệ thống</Text>
            <ToggleSwitch
              onToggle={() => toggleSwitch('systemUpdates')}
              isOn={settings.systemUpdates}
              trackOffColor="#B1B5C3"
              trackOnColor="#2760ED"
            />
          </View>
        </View>
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  root: {
    backgroundColor: color.primaryWhite,
    flex: 1,
    paddingTop: 0,
  },
  settingItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  settingText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
  },
}));

export default SettingNotification;
