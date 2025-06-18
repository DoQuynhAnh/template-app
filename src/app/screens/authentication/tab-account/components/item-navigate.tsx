import React from 'react';

// import { VectorIcon } from '@assets/vector-icon/vector-icon';

import { ItemNavigateProps } from '../type';
import { TouchableOpacity } from 'react-native';
import { Block } from '@/library/components/block';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import _FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useStyles } from 'react-native-unistyles';
const FontAwesome6 = _FontAwesome6 as unknown as React.ElementType;

export const ItemNavigate = ({
  title,
  leftIcon,
  description,
  descriptionOption,
  onPress,
}: ItemNavigateProps) => {

  const {
    theme: { color },
  } = useStyles();
  // render
  return (
    <TouchableOpacity onPress={onPress}>
      <Block paddingVertical={12} direction="row" middle>
        {leftIcon}
        <Spacer width={8} />
        <Text
          t18n={title}
          preset={'paragraph2'}
          colorTheme={'Neutrals07'}
          flex
        />
        <Spacer width={4} />
        <Text
          t18n={description}
          t18nOptions={descriptionOption}
          preset={'label'}
          colorTheme={'neutral_05'}
        />
        <Spacer width={8} />
        <FontAwesome6 name="arrow-right" color={color.primaryBase} />
      </Block>
    </TouchableOpacity>
  );
};
