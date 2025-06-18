import BackButton from '@/library/components/back-button';
import { Input } from '@/library/components/input';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface IPHeaderSearch {
  onChangeText?: (text: string) => void;
}

const HeaderSearch = ({ onChangeText }: IPHeaderSearch) => {
  const { styles } = useStyles(styleSheet);

  return (
    <View style={styles.root}>
      <View style={{ marginBottom: 8 }}>
        <BackButton />
      </View>

      <Input onChangeText={onChangeText} style={styles.input} />
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  input: {
    height: 38,
    width: Dimensions.get('screen').width - 75,
  },
  root: {
    alignItems: 'center',
    backgroundColor: color.primaryWhite,
    borderBottomColor: color.info550,
    borderBottomWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  //   title: {
  //     color: color.Neutrals07,
  //     fontSize: 16,
  //     fontWeight: 'bold',
  //   },
}));

export default HeaderSearch;
