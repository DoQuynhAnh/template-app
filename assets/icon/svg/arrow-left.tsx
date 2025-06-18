import React from 'react';

import Svg, { Path } from 'react-native-svg';
import { SvgIconProps } from './type';

const ArrowLeft = (props: SvgIconProps) => {
  const { color = '#23262F' } = props;

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M9.57 5.92999L3.5 12L9.57 18.07"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M20.4999 12H3.66992"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ArrowLeft;
