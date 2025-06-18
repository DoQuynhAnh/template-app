import React from 'react';
import { Path, Rect, Svg } from 'react-native-svg';

const CartWithCircle = () => {
  return (
    <Svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      >
      <Rect width="32" height="32" rx="16" fill="#808080" fill-opacity="0.4" />
      <Path
        d="M13.6 12.3334H18.4C20.6667 12.3334 20.8933 13.3934 21.0467 14.6867L21.6467 19.6867C21.84 21.3267 21.3334 22.6667 19 22.6667H13.0067C10.6667 22.6667 10.16 21.3267 10.36 19.6867L10.96 14.6867C11.1067 13.3934 11.3333 12.3334 13.6 12.3334Z"
        stroke="#FFF"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13.3334 13.3333V11C13.32 10.7776 13.3539 10.5549 13.4329 10.3466C13.5119 10.1383 13.6343 9.94918 13.7918 9.79165C13.9493 9.63413 14.1385 9.51182 14.3467 9.43281C14.555 9.3538 14.7777 9.31988 15.0001 9.3333H17.0001C17.2225 9.31988 17.4451 9.3538 17.6534 9.43281C17.8617 9.51182 18.0509 9.63413 18.2084 9.79165C18.3659 9.94918 18.4882 10.1383 18.5673 10.3466C18.6463 10.5549 18.6802 10.7776 18.6668 11V13.3333"
        stroke="#FFF"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M21.6066 19.3533H13.3333"
        stroke="#FFF"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CartWithCircle;
