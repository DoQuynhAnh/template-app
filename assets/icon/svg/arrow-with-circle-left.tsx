import React from 'react';
import { Path, Rect, Svg } from 'react-native-svg';

const ArrowWithCircleLeft = () => {
  return (
    <Svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      >
      <Rect width="32" height="32" rx="16" fill="#808080" fill-opacity="0.4" />
      <Path
        d="M14.3799 11.9534L10.3333 16L14.3799 20.0467"
        stroke="#fff"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M21.6668 16H10.4468"
        stroke="#fff"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ArrowWithCircleLeft;
