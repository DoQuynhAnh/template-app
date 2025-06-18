import React from 'react';

// import { CURRENCY } from '@common';
// import { Block, Text } from '@components';

import { RowPayInformationProps } from '../type';
import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';
import { CURRENCY } from '@/common/constant';

const RowInformation = ({ cost, title, bold }: RowPayInformationProps) => {
  return (
    <Block
      marginBottom={4}
      justifyContent="space-between"
      direction="row"
      middle>
      <Text
        text={title}
        colorTheme={'Neutrals07'}
        preset={!bold ? 'paragraph1' : 'paragraph1Bold'}
      />
      <Text
        colorTheme={bold ? 'status_red' : 'Neutrals07'}
        preset={!bold ? 'paragraph1' : 'paragraph1Bold'}
        >
        {cost} {CURRENCY}
      </Text>
    </Block>
  );
};

export const PayInformation = () => {
  // func

  // render
  return (
    <Block
      paddingVertical={12}
      paddingHorizontal={15}
      >
      <RowInformation title="Thành tiền" cost="14.000" />
      <RowInformation title="Phí vận chuyển" cost="14.000" />
      <RowInformation title="Giảm giá" cost="14.000" />
      <RowInformation bold title="Tổng thanh toán" cost="14.000" />
    </Block>
  );
};
