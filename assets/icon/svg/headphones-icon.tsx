import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HeadphonesIcon = ({ width = 24, height = 24, color = '#23262F', ...props }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 5C8.23858 5 6 7.23858 6 10V11V18H3C1.89543 18 1 17.1046 1 16V12C1 10.8954 1.89543 10 3 10L4 10C4 6.13401 7.13401 3 11 3H13C16.866 3 20 6.13401 20 10H21C22.1046 10 23 10.8954 23 12V16C23 17.1046 22.1046 18 21 18H19.874C19.4299 19.7252 17.8638 21 16 21H14.7324C14.3866 21.5978 13.7403 22 13 22C11.8954 22 11 21.1046 11 20C11 18.8954 11.8954 18 13 18C13.7403 18 14.3866 18.4022 14.7324 19H16C17.1046 19 18 18.1046 18 17V11V10C18 7.23858 15.7614 5 13 5H11ZM4 12H3L3 16H4V12ZM20 12H21V16H20V12Z"
        fill={color}
      />
    </Svg>
  );
};

export default HeadphonesIcon;