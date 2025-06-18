import React from 'react';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

import { IconProps } from 'react-native-vector-icons/Icon';

import { ICONS } from './icon-name';
import { CustomOmit } from '@/common/type';
import { Colors } from '@/themes';
import { useStyles } from 'react-native-unistyles';
import { ColorValue } from 'react-native';

const VectorIconBase = createIconSetFromIcoMoon(
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('./selection.json'),
  'icons',
  'icons.ttf',
) as any;

export type VectorIconIcon = keyof typeof ICONS;

type VectorIconProps = CustomOmit<IconProps, 'name'> & {
  icon: VectorIconIcon;
  colorTheme?: Colors;
};

export const VectorIcon = (props: VectorIconProps) => {
  // state
  const { theme: {color} } = useStyles();
  // render
  return (
    <VectorIconBase
      size={24}
      {...(props)}
      name={ICONS[props.icon]}
      color={props.colorTheme ? (color[props.colorTheme] as ColorValue) : props.color}
    />
  );
};
