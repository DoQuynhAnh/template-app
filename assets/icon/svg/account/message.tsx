import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MessageIcon = ({
  width = 20,
  height = 20,
  color = '#353945',
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      {...props}>
      <Path
        d="M7.08332 15.8337H6.66666C3.33332 15.8337 1.66666 15.0003 1.66666 10.8337V6.66699C1.66666 3.33366 3.33332 1.66699 6.66666 1.66699H13.3333C16.6667 1.66699 18.3333 3.33366 18.3333 6.66699V10.8337C18.3333 14.167 16.6667 15.8337 13.3333 15.8337H12.9167C12.7874 15.8346 12.6602 15.8651 12.5446 15.9228C12.429 15.9806 12.3282 16.0642 12.25 16.167L11 17.8337C10.8931 18.0021 10.7454 18.1409 10.5706 18.237C10.3958 18.3332 10.1995 18.3836 9.99999 18.3836C9.80047 18.3836 9.60419 18.3332 9.42937 18.237C9.25455 18.1409 9.10685 18.0021 8.99999 17.8337L7.74999 16.167C7.6674 16.069 7.56567 15.9889 7.45104 15.9316C7.33641 15.8742 7.21128 15.8409 7.08332 15.8337V15.8337Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.3308 9.16699H13.335"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.99664 9.16699H10.0008"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.66251 9.16699H6.66667"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default MessageIcon;
