import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const IconSuccess = (props: SvgProps) => {
  return (
    <Svg
      width="81"
      height="80"
      viewBox="0 0 81 80"
      fill="none"
      {...props}
      >
      <Path
        d="M40.5 80C62.5914 80 80.5 62.0914 80.5 40C80.5 17.9086 62.5914 0 40.5 0C18.4086 0 0.5 17.9086 0.5 40C0.5 62.0914 18.4086 80 40.5 80Z"
        fill="#09B530"
      />
      <Path
        d="M37.7377 61.6667L18.833 47.0231L24.2083 40.1641L35.8172 49.1563L54.9768 21.6667L62.1663 26.6188L37.7377 61.6667Z"
        fill="#FCFCFD"
      />
    </Svg>
  );
};

export default IconSuccess;
