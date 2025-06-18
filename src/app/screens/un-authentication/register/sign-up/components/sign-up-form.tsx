import { PrimaryButton } from '@/library/components/button/primary-button';
import { Checkbox } from '@/library/components/checkbox';
import { ControlledInput } from '@/library/components/input';
import { APP_SCREEN } from '@/navigation/screen-types';
import { toast } from '@backpackapp-io/react-native-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { FormType, schema } from '../type';
import { userRegister } from '../../../../../services/service-auth/login.api';
import { useOtpConfirmType } from '@/zustands/otp-confirm-type';
import { useTranslation } from 'react-i18next';

const SignUpForm = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(styleSheet);
  const [isChecked, setIsChecked] = useState(false);
  const { mutateAsync, isPending } = userRegister();
  const { email } = useOtpConfirmType();

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (e: FormType) => {
    if (!isChecked) {
      toast.error('Requires agreement to terms and conditions', {
        duration: 4000,
      });
      return;
    }

    mutateAsync({
      email,
      phone: e.phoneNumber,
      password: e.password,
      fullname: e.fullName,
    });

    navigation.navigate(APP_SCREEN.CREATE_SUCCESS);
  };

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ControlledInput
        control={control}
        name="fullName"
        label={t('register_info:full_name')}
        placeholder={t('register_info:full_name_placeholder')}
      />
      <ControlledInput
        control={control}
        name="phoneNumber"
        keyboardType="phone-pad"
        label={t('register_info:phone_number')}
        placeholder={t('register_info:phone_number_placeholder')}
      />
      <ControlledInput
        control={control}
        name="password"
        label={t('register_info:password')}
        placeholder={t('register_info:password_placeholder')}
        secureTextEntry={true}
      />
      <ControlledInput
        control={control}
        name="rePassword"
        label={t('register_info:confirm_password')}
        placeholder={t('register_info:confirm_password')}
        secureTextEntry={true}
      />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Checkbox onToggle={setIsChecked} />
        <Text
          style={{
            display: 'flex',
            flexDirection: 'row',
            fontSize: 12,
            paddingLeft: 5,
          }}>
          <Text>{t('register_info:agree_term')}</Text>
          {/* <Text>Tôi đồng ý với các </Text>
          <Text style={styles.textHigthlight}>Điều khoản</Text>
          <Text> và </Text>
          <Text style={styles.textHigthlight}>Chính sách bảo mật</Text> */}
        </Text>
      </View>

      <View
        style={{
          marginTop: 10,
        }}>
        <PrimaryButton
          onPress={handleSubmit(onSubmit)}
          text={t('account:login')}
          loading={isPending}
        />
      </View>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  container: {
    gap: 10,
    // marginTop: '10%',
  },
  textHigthlight: {
    color: color.primaryBase,
    fontWeight: '600',
  },
}));

export default SignUpForm;
