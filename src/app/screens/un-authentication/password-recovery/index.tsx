import { useOtpConfirmType } from '@/zustands/otp-confirm-type';
import { userResetPassword } from '../../../services/service-auth/login.api';
import BackButton from '@components/back-button';
import { PrimaryButton } from '@components/button/primary-button';
import { ControlledInput } from '@components/input';
import { Screen } from '@components/screen';
import { zodResolver } from '@hookform/resolvers/zod';
import { APP_SCREEN } from '@navigation/screen-types';
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { z } from 'zod';
import { toast } from '@backpackapp-io/react-native-toast';
import { useTranslation } from 'react-i18next';

const schema = z
  .object({
    newPassword: z
      .string({
        invalid_type_error: 'reset_password:password_required',
      })
      .nonempty('validation:password_required')
      .min(8, 'validation:new_password_min_length'),
    reNewPassword: z.string().nonempty('validation:password_required'),
  })
  .refine(data => data.newPassword === data.reNewPassword, {
    message: 'validation:password_not_match',
    path: ['reNewPassword'],
  });

export type FormType = z.infer<typeof schema>;

const PasswordRecovery = () => {
  const { mutateAsync, isPending } = userResetPassword();

  const rootRef = useRef<View>(null);
  const { styles } = useStyles(styleSheet);
  const navigation = useNavigation();
  const { resetToken } = useOtpConfirmType();
  const { t } = useTranslation();

  const onSubmit = async (data: FormType) => {
    const {
      errorCode,
      data: { message },
    } = await mutateAsync({
      password: data.newPassword,
      token: resetToken,
    });


    if (errorCode !== 0) {
      return;
    }

    toast.success(message);
    navigation.navigate(APP_SCREEN.LOGIN);
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

        <Text
          style={{
            ...styles.textHeader,
            fontSize: 24,
            fontWeight: '700',
            marginVertical: '10%',
            paddingTop: 15,
          }}>
          {t('reset_password:header')}
        </Text>

        <View
          style={{
            gap: 10,
          }}>
          <ControlledInput
            control={control}
            name="newPassword"
            label={t('reset_password:new_password')}
            placeholder={t('reset_password:new_password_placeholder')}
            secureTextEntry={true}
          />

          <ControlledInput
            // style={{
            //   marginBottom: 15,
            // }}
            control={control}
            name="reNewPassword"
            label={t('reset_password:confirm_password')}
            placeholder={t('reset_password:confirm_password_placeholder')}
            secureTextEntry={true}
          />
          <View>
            <PrimaryButton
              onPress={handleSubmit(onSubmit)}
              text="Lưu và thay đổi"
              loading={isPending}
            />
          </View>
        </View>
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

export default PasswordRecovery;
