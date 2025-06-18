import { Block } from '@/library/components/block';
import {
  OtpConfirmTypeEnum,
  useOtpConfirmType,
} from '@/zustands/otp-confirm-type';
import BackButton from '@components/back-button';
import { PrimaryButton } from '@components/button/primary-button';
import OtpInput from '@components/otp-input';
import { Screen } from '@components/screen';
import { APP_SCREEN } from '@navigation/screen-types';
import { useNavigation } from '@react-navigation/native';
import { lightColors } from '@theme/colors/light';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const OtpConfirm = () => {
  const {t} = useTranslation();
  const rootRef = useRef<View>(null);
  const { styles } = useStyles(styleSheet);
  const navigation = useNavigation();
  const { typeOtpConfirm, email, resetToken } = useOtpConfirmType();

  const [otpValue, setOtpValue] = useState('');
  const onSubmit = () => {
    console.log({ otpValue, typeOtpConfirm });

    typeOtpConfirm === OtpConfirmTypeEnum.FORGOT_PASSWORLD
      ? navigation.navigate(APP_SCREEN.PASSWORD_RECOVERY)
      : navigation.navigate(APP_SCREEN.SIGN_UP);
  };

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        scroll
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <BackButton />
        <View>
          <Text
            style={{
              ...styles.textHeader,
              fontSize: 24,
              fontWeight: '700',
              marginBottom: '10%',
              marginTop: '25%',
              paddingTop: 15,
            }}>
            {t('register_otp:header')}
          </Text>
          <Text
            style={{
              color: lightColors.dark150,
              marginTop: 20,
              textAlign: 'center',
            }}>
            {t('register_otp:otp_sent')}{' '}
            <Text
              style={{
                fontWeight: '600',
              }}>
              {email}
            </Text>
          </Text>
        </View>

        <View style={{ marginHorizontal: 'auto', marginVertical: 25 }}>
          <OtpInput numberOfDigits={6} onTextChange={setOtpValue} />
        </View>

        <PrimaryButton
          onPress={onSubmit}
          text={t('register_otp:next')}
          disabled={otpValue.length !== 6}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={[styles.dontGetCode, styles.textDark150]}>
            {t('register_otp:no_otp')}{' '}
          </Text>
          <Text style={[styles.dontGetCode, styles.textDanger550]}>
            {t('register_otp:resend')}
          </Text>
        </View>
        {resetToken &&
          typeOtpConfirm === OtpConfirmTypeEnum.FORGOT_PASSWORLD && (
            <Block marginTop={10}>
              <Text>{resetToken}</Text>
            </Block>
          )}
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  dontGetCode: {
    fontSize: 12,
    fontWeight: 400,
    marginTop: 15,
    // marginHorizontal: 'auto'
  },
  root: {
    backgroundColor: color.background,
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 0,
  },
  textDanger550: {
    color: color.danger550,
    fontWeight: 'bold',
  },
  textDark150: {
    color: color.dark150,
  },
  textHeader: {
    color: color.dark100,
  },
  // textPress: {
  //   color: color.danger550,
  //   fontSize: 12,
  //   fontWeight: 400,
  // },
}));

export default OtpConfirm;
