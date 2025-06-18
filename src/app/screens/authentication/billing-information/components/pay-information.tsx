/* eslint-disable sortKeysFix/sort-keys-fix */
import React from 'react';

import { RowPayInformationProps } from '../type';
import { CURRENCY } from '@/common/constant';
import { Text } from '@/library/components/core';
import { lightColors } from '@/themes/colors/light';
import { View } from '@/library/components/core/View';

const RowInformation = ({ cost, title, bold }: RowPayInformationProps) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 4,
      }}>
      <Text
        style={{
          color: lightColors.Neutrals07,
          fontWeight: !bold ? '400' : '700',
          fontSize: 14,
        }}>
        {title}
      </Text>
      <Text
        style={{
          color: bold ? lightColors.status_red : lightColors.Neutrals07,
          fontWeight: !bold ? '400' : '700',
          fontSize: !bold ? 14 : 16,
        }}>
        {cost} {CURRENCY}
      </Text>
    </View>
  );
};

export const PayInformation = () => {
  // func

  // render
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingVertical: 12,
        paddingHorizontal: 16
      }}>
      <RowInformation title="Thành tiền " cost="14.000"  />
      <RowInformation title="Phí vận chuyển" cost="14.000"  />
      <RowInformation title="Giảm giá discount" cost="14.000"  />
      <RowInformation
        bold
        title="Tổng thanh toán"
        cost="14.000"
      />
    </View>
  );
};
