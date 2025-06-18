import { Block } from '@/library/components/block';
import { Screen } from '@/library/components/screen';
import Header from '@/library/components/ui/header';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { FormChangePassword } from './components/form-change-password';
import { FormChangePasswordType } from '@/model/authentication';
import { userChangePassword } from '../../../services/service-auth/login.api';

export const ChangePassword = () => {
  const { styles } = useStyles(styleSheet);
  const rootRef = useRef<View>(null);
  const [t] = useTranslation();
  const { isPending, mutateAsync } = userChangePassword();

  // func
  const handleSubmit = (data: FormChangePasswordType) => {
    mutateAsync({
      currentPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };

  // render
  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'} 
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Header title={t('change_password:header')} />
        <Block padding={15}>
          <FormChangePassword onSubmit={handleSubmit} isPending={isPending} />
        </Block>
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.primaryWhite,
    height: '100%',
  },
}));
