import { userForgotPassword } from '../../../services/service-auth/login.api';
import {
  OtpConfirmTypeEnum,
  useOtpConfirmType,
} from '@/zustands/otp-confirm-type';
import BackButton from '@components/back-button';
import { PrimaryButton } from '@components/button/primary-button';
import { ControlledInput } from '@components/input';
import { Screen } from '@components/screen';
import { zodResolver } from '@hookform/resolvers/zod';
import { APP_SCREEN } from '@navigation/screen-types';
import { useNavigation } from '@react-navigation/native';
import { View } from '@rn-core';
import { lightColors } from '@theme/colors/light';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string({
      required_error: 'validation:email_required',
    })
    .email('Email không hợp lệ'),
});

export type FormType = z.infer<typeof schema>;

const ForgotPasswordVerified = () => {
  const { mutateAsync, isPending } = userForgotPassword();

  const rootRef = useRef<View>(null);
  const { styles } = useStyles(styleSheet);
  const navigation = useNavigation();
  const { setTypeOtpConfirm, setEmail, setResetToken } = useOtpConfirmType();

  const onSubmit = async (data: FormType) => {
    const { resetToken } = await mutateAsync({
      email: data.email,
    });
    setResetToken(resetToken);
    navigation.navigate(APP_SCREEN.PASSWORD_RECOVERY);
    setTypeOtpConfirm(OtpConfirmTypeEnum.FORGOT_PASSWORLD);
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
          <Text
            style={{
              ...styles.textHeader,
              fontSize: 24,
              fontWeight: '700',
              marginTop: '25%',
              paddingTop: 15,
            }}>
            Quên mật khẩu
          </Text>
          <Text
            style={{
              color: lightColors.dark150,
              marginBottom: '10%',
              marginTop: 20,
            }}>
            Nhập Email đã đăng ký để nhận mật khẩu mới
          </Text>
        </View>

        <ControlledInput
          style={{
            marginBottom: 15,
          }}
          control={control}
          name="email"
          label={'Email'}
          placeholder={'Nhập địa chỉ Email của bạn đã đăng ký'}
        />
        <PrimaryButton
          onPress={handleSubmit(onSubmit)}
          text="Tiếp tục"
          loading={isPending}
        />
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
  },
}));

export default ForgotPasswordVerified;
