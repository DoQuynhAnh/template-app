import BackButton from '@/library/components/back-button';
import { Screen } from '@/library/components/screen';
import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import SignUpForm from './components/sign-up-form';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const rootRef = useRef<View>(null);
  const { styles } = useStyles(styleSheet);

  const { t } = useTranslation();

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
          <Text style={styles.textHeader}>{t('register_info:header')}</Text>
        </View>
        <SignUpForm />
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
    marginTop: '15%',
    marginBottom: '5%',
  },
}));

export default SignUp;
