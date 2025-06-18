import React from 'react';
import { View } from 'react-native';

import Animated from 'react-native-reanimated';

import { DATA_STEPS_ORDER } from '../mock';
import { StepOrder } from '../type';
import { Block } from '@/library/components/block';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';

import _MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import _Entypo from 'react-native-vector-icons/Entypo';
import { useStyles } from 'react-native-unistyles';
import { Collapsible } from '@/library/components/collapsible';
import { useTranslation } from 'react-i18next';
const MaterialCommunityIcons =
  _MaterialCommunityIcons as unknown as React.ElementType;
const Entypo = _Entypo as unknown as React.ElementType;

export const FollowOrderSection = () => {
  // func
  const renderSpacer = (leadingItem: StepOrder) => {
    return (
      <Block
        marginLeft={5.5}
        height={20}
        width={1}
        colorTheme={leadingItem?.time ? 'primaryGreen' : 'neutral10'}
      />
    );
  };

  const renderStep = (item: StepOrder, index: number) => {
    return (
      <View key={item.id}>
        <Block middle justifyContent="space-between" direction="row">
          <Block middle>
            <Block
              borderWidth={2}
              borderColorTheme={item.time ? 'primaryGreen' : 'neutral10'}
              colorTheme={item.time ? 'primaryGreen' : 'neutral10'}
              width={12}
              height={12}
              borderRadius={8}
            />
          </Block>
          <Spacer width={12} />
          <Text
            flex
            preset="paragraph1"
            colorTheme="Neutrals07"
            text={item.title}
          />
          <Text
            preset="label"
            colorTheme="Neutrals09"
            text={item?.time ?? ''}
          />
        </Block>
        {index === DATA_STEPS_ORDER.length - 1 ? null : renderSpacer(item)}
      </View>
    );
  };

  const renderMasterView = (
    _: Animated.SharedValue<number>,
    isShow: boolean,
  ) => {
    const { t } = useTranslation();
    const {
      theme: { color },
    } = useStyles();

    return (
      <Block direction="row" middle justifyContent="space-between">
        <Block direction="row">
          <MaterialCommunityIcons
            name="truck-delivery"
            color={color.primaryYellow}
            size={24}
          />
          <Spacer width={8} />
          <Text
            preset="paragraph1Bold"
            colorTheme="Neutrals07"
            text={t('detail_order:follow_order')}
          />
        </Block>
        <Spacer width={8} />
        <Entypo
          name={!isShow ? 'chevron-down' : 'chevron-up'}
          size={24}
          color={color.primaryBase}
        />
      </Block>
    );
  };

  // render
  return (
    <Block paddingVertical={12} paddingHorizontal={15}>
      <Collapsible renderMasterView={renderMasterView}>
        <Spacer height={12} />
        {DATA_STEPS_ORDER.map(renderStep)}
      </Collapsible>
    </Block>
  );
};
