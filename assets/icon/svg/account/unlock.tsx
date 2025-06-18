import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LockIcon = ({ width = 20, height = 20, color = '#353945', ...props }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M14.1667 18.333H5.83332C2.49999 18.333 1.66666 17.4997 1.66666 14.1663V12.4997C1.66666 9.16634 2.49999 8.33301 5.83332 8.33301H14.1667C17.5 8.33301 18.3333 9.16634 18.3333 12.4997V14.1663C18.3333 17.4997 17.5 18.333 14.1667 18.333Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 8.33366V6.66699C5 3.90866 5.83333 1.66699 10 1.66699C13.75 1.66699 15 3.33366 15 5.83366"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.0833 13.3333C12.0833 13.7454 11.9611 14.1482 11.7322 14.4908C11.5033 14.8334 11.1779 15.1004 10.7972 15.2581C10.4166 15.4158 9.99768 15.457 9.59355 15.3766C9.18943 15.2963 8.81821 15.0978 8.52685 14.8065C8.23549 14.5151 8.03707 14.1439 7.95669 13.7398C7.8763 13.3356 7.91756 12.9168 8.07524 12.5361C8.23292 12.1554 8.49995 11.83 8.84255 11.6011C9.18516 11.3722 9.58795 11.25 9.99999 11.25C10.5525 11.25 11.0824 11.4695 11.4731 11.8602C11.8638 12.2509 12.0833 12.7808 12.0833 13.3333Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default LockIcon;