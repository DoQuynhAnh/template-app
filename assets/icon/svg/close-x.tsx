import React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

const CloseXSvg = (props: SvgProps) => {

  return (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
      <Path
        d="M11.8327 1.34199L10.6577 0.166992L5.99935 4.82533L1.34102 0.166992L0.166016 1.34199L4.82435 6.00033L0.166016 10.6587L1.34102 11.8337L5.99935 7.17533L10.6577 11.8337L11.8327 10.6587L7.17435 6.00033L11.8327 1.34199Z"
        fill={'#000'}
      />
    </Svg>
  );
};

export default CloseXSvg;
