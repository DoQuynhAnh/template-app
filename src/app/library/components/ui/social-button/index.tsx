import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Divider } from '../../divider';
import FbIcon from '@assets/icon/svg/fb-icon';
import GgIcon from '@assets/icon/svg/gg-icon';
import { useTranslation } from 'react-i18next';

const SocialButton = () => {
  const { styles } = useStyles(styleSheet);
  const { t } = useTranslation();

  return (
    <View
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <View style={styles.wrapsociallogin}>
        <View
          style={{
            width: 100,
          }}>
          <Divider />
        </View>
        <Text
          style={{
            color: '#B1B5C3',
            fontSize: 14,
          }}>
          {t('common:or')}
        </Text>
        <View
          style={{
            width: 100,
          }}>
          <Divider />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 7,
          marginTop: 10,
        }}>
        <TouchableOpacity>
          <FbIcon />
        </TouchableOpacity>
        <TouchableOpacity>
          <GgIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styleSheet = createStyleSheet(() => ({
  wrapsociallogin: {
    // marginHorizontal: 'auto',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 7,
    justifyContent: 'space-between',
    marginTop: 15,
  },
}));

export default SocialButton;
