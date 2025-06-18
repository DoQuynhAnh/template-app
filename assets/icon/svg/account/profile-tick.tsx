import React from 'react';
import Svg, { Path } from 'react-native-svg';

const VerifiedUserIcon = ({ width = 20, height = 20, color = '#353945', ...props }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M12.0333 15.8751L13.3 17.1417L15.8333 14.6084"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.1333 9.05805C10.0418 9.04972 9.9498 9.04972 9.85832 9.05805C8.89071 9.02203 7.97587 8.60771 7.31056 7.90418C6.64525 7.20066 6.28261 6.26414 6.30063 5.29602C6.31864 4.3279 6.71588 3.40551 7.4069 2.72723C8.09792 2.04895 9.02753 1.66895 9.99582 1.66895C10.9641 1.66895 11.8937 2.04895 12.5847 2.72723C13.2758 3.40551 13.673 4.3279 13.691 5.29602C13.709 6.26414 13.3464 7.20066 12.6811 7.90418C12.0158 8.60771 11.1009 9.02203 10.1333 9.05805V9.05805Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.99167 18.1751C8.51811 18.2033 7.06795 17.8038 5.81667 17.0251C3.8 15.6751 3.8 13.4751 5.81667 12.1334C7.07772 11.3808 8.51893 10.9834 9.9875 10.9834C11.4561 10.9834 12.8973 11.3808 14.1583 12.1334"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default VerifiedUserIcon;