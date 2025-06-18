import React from 'react';

import { ItemTabFilterProps } from '../type';
import { TouchableOpacity } from 'react-native';
import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';
import { Spacer } from '@/library/components/spacer';
import _Ionicons from 'react-native-vector-icons/Ionicons';
import { useStyles } from 'react-native-unistyles';
const Ionicons = _Ionicons as unknown as React.ElementType;

export const ItemTabFilter = ({
  title,
  focused,
  rightIcon,
  onPress,
}: ItemTabFilterProps) => {
  const {
    theme: { color },
  } = useStyles();

  // render
  return (
    <TouchableOpacity onPress={onPress}>
      <Block direction="row" middle>
        <Text
          t18n={title}
          // text={title}
          colorTheme={focused ? 'primaryBase' : 'neutral_05'}
          preset={focused ? 'paragraphBold' : 'paragraph2'}
        />
        {rightIcon ? (
          <>
            <Spacer width={5} />
            <Ionicons
              // na={rightIcon}
              name={rightIcon}
              size={16}
              colorTheme={focused ? color.primaryBase : color.neutral_05}
            />
          </>
        ) : null}
      </Block>
    </TouchableOpacity>
  );
};
