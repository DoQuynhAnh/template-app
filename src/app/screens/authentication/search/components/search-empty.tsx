import { PrimaryButton } from '@/library/components/button/primary-button';
import SearchIcon from '@assets/icon/svg/search-icon';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const SearchEmpty = () => {
  const { styles } = useStyles(styleSheet);
const {t} = useTranslation();
  return (
    <View style={styles.root}>
      <SearchIcon />
      <Text style={styles.text}>
        {t('search_product:empty')}
        {/* Try_searching_different */}
      </Text>
      <PrimaryButton text={t('search_product:Try_searching_different')} />
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    alignItems: 'center',
    backgroundColor: color.primaryWhite,
    display: 'flex',
    gap: 18,
    justifyContent: 'center',
    padding: 15,
    height: '75%',
  },
  text: {
    color: color.neutral10,
    fontSize: 14,
    width: 300,
    textAlign: 'center',
  },
}));

export default SearchEmpty;
