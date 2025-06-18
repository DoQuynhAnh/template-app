import { Block } from '@/library/components/block';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import { IOrder } from '../../../../services/service-order/order.api';
import React from 'react';
import _Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
const Feather = _Feather as unknown as React.ElementType;

interface IPOrderCode {
  order: IOrder | undefined;
}

const OrderCode = ({ order }: IPOrderCode) => {
  const { t } = useTranslation();

  return (
    <Block
      // colorTheme="background"
      direction="row"
      paddingHorizontal={15}
      paddingVertical={12}>
      <Feather name="file-text" size={24} color={'#683C73'} />
      <Spacer width={5} />
      <Block block>
        <Block direction="row">
          <Text
            preset="paragraph1Bold"
            colorTheme="Neutrals07"
            text={t('my_order:order_code')}
          />
          <Text text={': '} />
          <Text
            preset="paragraph1Bold"
            colorTheme="primaryBase"
            text={order?.orderCode}
          />
        </Block>
        <Spacer height={8} />
        <Block direction="row" middle>
          <Text
            preset="paragraph1"
            colorTheme="Neutrals09"
            text={`${t('my_order:time_to_order')}: ${moment(
              order?.createdAt,
            ).format('HH:mm DD/MM/YYYY')}`}
          />
        </Block>
        <Spacer height={8} />
        <Text
          preset="paragraph1Bold"
          colorTheme="primaryGreen"
          // text={mapOrderStatusEnum[order?.orderStatus as keyof typeof mapOrderStatusEnum] || ''}
          text={order?.orderStatus}
        />
      </Block>
    </Block>
  );
};

export default OrderCode;
