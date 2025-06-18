import React from 'react';
import Svg, { Path } from 'react-native-svg';

const DeliveryTruckIcon = ({ width = 24, height = 18, color = '#353945', ...props }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 16" fill="none" {...props}>
      <Path
        d="M6.375 15C7.47957 15 8.375 14.1046 8.375 13C8.375 11.8954 7.47957 11 6.375 11C5.27043 11 4.375 11.8954 4.375 13C4.375 14.1046 5.27043 15 6.375 15Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.375 15C17.4796 15 18.375 14.1046 18.375 13C18.375 11.8954 17.4796 11 16.375 11C15.2704 11 14.375 11.8954 14.375 13C14.375 14.1046 15.2704 15 16.375 15Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.375 13H2.875C2.59886 13 2.375 12.7761 2.375 12.5V9M1.375 1H11.875C12.1511 1 12.375 1.22386 12.375 1.5V13M8.375 13H14.375M18.375 13H19.375C19.9273 13 20.375 12.5523 20.375 12V7M20.375 7H12.375M20.375 7L17.5207 2.24275C17.4303 2.09215 17.2675 2 17.0919 2H12.375M2.375 5H6.375"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default DeliveryTruckIcon;