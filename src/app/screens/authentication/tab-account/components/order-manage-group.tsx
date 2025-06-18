import React from 'react';

import { Block } from '@/library/components/block';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import CubeTimerIcon from '@assets/icon/svg/account/box-time';
import WalletIcon from '@assets/icon/svg/account/wallet-2';
import { TouchableOpacity } from 'react-native';
import { ButtonOrderManageProps } from '../type';
import DeliveryTruckIcon from '@assets/icon/svg/account/delivery-truck';
import CubeCheckmarkIcon from '@assets/icon/svg/account/box-tick';
import { APP_SCREEN } from '@/navigation/screen-types';
import { useNavigation } from '@react-navigation/native';

const ButtonOrderManage = ({
  icon,
  text,
  badged,
  onPress,
}: ButtonOrderManageProps) => {
  // render
  return (
    <TouchableOpacity onPress={onPress}>
      <Block width={70} middle overflow="hidden">
        <Block
          width={50}
          colorTheme={'neutral_02'}
          height={50}
          borderRadius={48}
          middle
          justifyContent="center"
          overflow={'hidden'}>
          {icon}
          {/* <VectorIcon icon={icon} colorTheme="neutral_06" /> */}
        </Block>
        <Spacer height={4} />
        <Text center t18n={text} colorTheme="Neutrals07" preset="label" />
        {badged ? (
          <Block
            position="absolute"
            right={5}
            top={3}
            minWidth={20}
            height={20}
            middle
            paddingHorizontal={2}
            justifyContent="center"
            borderRadius={20}
            colorTheme={'status_red'}>
            <Text
              center
              text={String(badged)}
              colorTheme="neutral_01"
              preset="labelBold"
            />
          </Block>
        ) : null}
      </Block>
    </TouchableOpacity>
  );
};

export const OrderManageGroup = () => {
  const { navigate } = useNavigation();

  // func
  const handleViewOrder = (selectedTab: number) => {
    return () => {
      navigate(APP_SCREEN.MY_ORDER, { defaultSelectedTab: selectedTab });
    };
  };

  // render
  return (
    <Block padding={15}>
      <TouchableOpacity>
        <Block marginBottom={15} direction="row" middle>
          <Text
            flex
            t18n="account:my_order"
            colorTheme="Neutrals07"
            preset="placeholder"
          />
        </Block>
      </TouchableOpacity>
      <Block justifyContent="space-around" direction="row">
        <ButtonOrderManage
          onPress={handleViewOrder(0)}
          icon={<WalletIcon />}
          text="account:pending_pay_order"
        />
        <ButtonOrderManage
          onPress={handleViewOrder(1)}
          icon={<CubeTimerIcon />}
          text="account:pending_take_order"
        />
        <ButtonOrderManage
          onPress={handleViewOrder(2)}
          badged={0}
          icon={<DeliveryTruckIcon />}
          text="account:transporting_order"
        />
        <ButtonOrderManage
          onPress={handleViewOrder(3)}
          icon={<CubeCheckmarkIcon />}
          text="account:sent_order"
        />
      </Block>
    </Block>
  );
};
