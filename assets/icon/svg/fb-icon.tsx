import * as React from 'react';
import Svg, { Path, Rect, type SvgProps } from 'react-native-svg';
const FbIcon = (props: SvgProps) => {

  return (
    <Svg width="65" height="48" viewBox="0 0 65 48" fill="none"  {...props}>
    <Rect x="1.32002" y="0.5" width="63" height="47" rx="7.5" stroke="#E6E8EC"/>
    <Rect x="16.82" y="8" width="32" height="32" rx="16" fill="#1877F2"/>
    <Path d="M39.0481 28.625L39.7575 24H35.32V21C35.32 19.7344 35.9388 18.5 37.9263 18.5H39.945V14.5625C39.945 14.5625 38.1138 14.25 36.3638 14.25C32.7075 14.25 30.32 16.4656 30.32 20.475V24H26.2575V28.625H30.32V39.8062C31.1356 39.9344 31.97 40 32.82 40C33.67 40 34.5044 39.9344 35.32 39.8062V28.625H39.0481Z" fill="#FCFCFD"/>
    </Svg>
  );
};
export default FbIcon;
