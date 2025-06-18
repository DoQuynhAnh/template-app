import React from 'react';

import { LanguageButtonProps } from '../type';
import { TouchableOpacity } from 'react-native';
import { Block } from '@/library/components/block';
import { LocalImage } from '@/library/components/local-image';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';

export const LanguageButton = ({
  flag,
  language,
  onPress,
}: LanguageButtonProps) => {
  // render
  return (
    <TouchableOpacity onPress={onPress}>
      <Block
        justifyContent="center"
        borderRadius={8}
        paddingVertical={10}
        colorTheme="primary_light"
        direction="row"
        middle>
        <Block width={30} height={20} borderRadius={4} overflow={'hidden'}>
          <LocalImage source={flag} />
        </Block>
        <Spacer width={8} />
        <Text
          t18n={language}
          preset={'paragraph2'}
          colorTheme={'primaryBase'}
        />
      </Block>
    </TouchableOpacity>
  );
};
