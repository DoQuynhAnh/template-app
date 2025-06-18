import { Block } from '@/library/components/block';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from 'react-native-unistyles';
import _Entypo from 'react-native-vector-icons/Entypo';
const Entypo = _Entypo as unknown as React.ElementType;


export const PayTypeSection = () => {
  const { theme: {color} } = useStyles();

  const {t} = useTranslation();

  // render
  return (
    <Block
      paddingHorizontal={15}
      paddingVertical={12}
      >
      <Block direction="row">
        <Entypo icon="wallet" color={color.primaryGreen} size={20} />
        <Spacer width={5} />
        <Block block>
          <Text
            preset="paragraph1Bold"
            colorTheme="Neutrals07"
            text={t('detail_order:pay_type')}
            />
          <Spacer height={8} />
          <Text
            preset="paragraph1"
            colorTheme="Neutrals07"
            text={t('detail_order:payment_transfer')}
            // text="Thanh toán bằng hình thức chuyển khoản QR"
          />
        </Block>
      </Block>
    </Block>
  );
};
