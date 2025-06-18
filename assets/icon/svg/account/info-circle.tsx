import React from 'react';
import Svg, { Path } from 'react-native-svg';

const InfoIcon = ({ width = 20, height = 20, color = '#353945', ...props }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M10 18.3337C11.6482 18.3337 13.2593 17.8449 14.6298 16.9292C16.0002 16.0136 17.0683 14.7121 17.699 13.1894C18.3297 11.6666 18.4948 9.99109 18.1732 8.37458C17.8517 6.75807 17.058 5.27321 15.8926 4.10777C14.7271 2.94234 13.2423 2.14866 11.6258 1.82712C10.0092 1.50558 8.33369 1.6706 6.81097 2.30133C5.28825 2.93206 3.98676 4.00017 3.07109 5.37058C2.15541 6.74099 1.66667 8.35215 1.66667 10.0003C1.67304 12.2085 2.55306 14.3244 4.11449 15.8858C5.67591 17.4473 7.79182 18.3273 10 18.3337V18.3337Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 6.66699V10.8337"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.99583 13.333H10.0033"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default InfoIcon;