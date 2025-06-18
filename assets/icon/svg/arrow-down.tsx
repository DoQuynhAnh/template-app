import React from 'react';

import Svg, { Path } from 'react-native-svg';

import { type SvgIconProps } from './type';

const ArrowDownSvg = ({ ...props }: SvgIconProps) => {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M13.4391 6.13477H8.76658H4.55908C3.83908 6.13477 3.47908 7.00477 3.98908 7.51477L7.87408 11.3998C8.49658 12.0223 9.50908 12.0223 10.1316 11.3998L11.6091 9.92227L14.0166 7.51477C14.5191 7.00477 14.1591 6.13477 13.4391 6.13477Z"
        fill={'#000'}
      />
    </Svg>
  );
};

export default ArrowDownSvg;
