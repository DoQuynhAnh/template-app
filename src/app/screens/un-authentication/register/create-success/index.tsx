import { Screen } from '@/library/components/screen';
import { APP_SCREEN } from '@/navigation/screen-types';
import IconSuccess from '@assets/icon/svg/icon-success';
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const CreateSuccess = () => {
  const navigation = useNavigation();
  const rootRef = useRef<View>(null);
  const { styles } = useStyles(styleSheet);

  const onPress = () => {
    navigation.navigate(APP_SCREEN.LOGIN);
  };

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        scroll
        excludeEdges={['bottom']}
        statusBarStyle={'auto'}
        backgroundColor={'transparent'}>
        <View style={styles.warp}>
          <IconSuccess />
          <Text style={styles.textHeader}>Tạo tài khoản thành công</Text>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Quay lại trang chủ</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.primaryWhite,
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 0,
  },
  warp: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    color: color.dark100,
    fontSize: 14,
    fontWeight: 600,
    marginBottom: '5%',
    marginTop: '5%',
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6E8EC',
    width: '100%'
  },
  buttonText: {
    color: color.Neutrals07,
    fontSize: 16,
    fontWeight: '600',
  },
}));

export default CreateSuccess;
