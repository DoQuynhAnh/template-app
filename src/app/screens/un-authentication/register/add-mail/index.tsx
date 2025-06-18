import BackButton from '@/library/components/back-button';
import { PrimaryButton } from '@/library/components/button/primary-button';
import { View } from '@/library/components/core';
import { ControlledInput } from '@/library/components/input';
import { Screen } from '@/library/components/screen';
import SocialButton from '@/library/components/ui/social-button';
import { APP_SCREEN } from '@/navigation/screen-types';
import {
  OtpConfirmTypeEnum,
  useOtpConfirmType,
} from '@/zustands/otp-confirm-type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string({
      required_error: 'validation:email_required',
    })
    .email('Email invalid'),
});

export type FormType = z.infer<typeof schema>;

const AddMail = () => {
  const rootRef = useRef<View>(null);
  const { styles } = useStyles(styleSheet);
  const navigation = useNavigation();
  const { setTypeOtpConfirm, setEmail } = useOtpConfirmType();
  const { t } = useTranslation();

  const onSubmit = (data: FormType) => {
    console.log(data);
    navigation.navigate(APP_SCREEN.OTP_CONFIRM);
    setTypeOtpConfirm(OtpConfirmTypeEnum.CREATE_ACCOUNT);
    setEmail(data.email);
  };

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        scroll
        excludeEdges={['bottom']}
        statusBarStyle={'auto'}
        backgroundColor={'transparent'}>
        <BackButton />
        <View>
          <Text style={styles.textHeader}>{t('register:header')}</Text>
        </View>

        <ControlledInput
          style={{
            marginBottom: 15,
          }}
          control={control}
          name="email"
          label={'Email'}
          placeholder={'Email...'}
        />
        <PrimaryButton onPress={handleSubmit(onSubmit)} text={t('register:register')} />

        <SocialButton />
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.background,
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 0,
  },
  textHeader: {
    color: color.dark100,
    fontSize: 24,
    fontWeight: 700,
    marginBottom: '15%',
    marginTop: '25%',
  },
}));

export default AddMail;
