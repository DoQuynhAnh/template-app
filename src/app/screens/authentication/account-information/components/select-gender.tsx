import React from 'react';


import { GENDER, Gender } from '@/common/constant';
import { Block } from '@/library/components/block';
import { RadioButton } from '@/library/components/radio-button';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import { TouchableOpacity } from 'react-native';
import { RadioSelectGenderProps, SelectGenderProps } from '../type';

const RadioSelectGender = ({
  text,
  selected,
  onPress,
}: RadioSelectGenderProps) => {
  // render
  return (
    <TouchableOpacity onPress={onPress}>
      <Block direction="row" middle>
        <Block pointerEvents="none">
          <RadioButton value={selected} />
        </Block>
        <Spacer width={8} />
        <Text colorTheme="Neutrals07" t18n={text} />
      </Block>
    </TouchableOpacity>
  );
};

export const SelectGender = ({ setValue, watch }: SelectGenderProps) => {
  // state

  const handleChangeGender = (gender: Gender) => {
    return () => {
      setValue('gender', gender);
    };
  };

  // render
  return (
    <Block>
      <Text
        preset="paragraph2"
        colorTheme="Neutrals07"
        t18n="account_information:gender"
      />
      <Spacer height={12} />
      <Block direction="row" middle justifyContent="space-around">
        <RadioSelectGender
          text="account_information:male"
          onPress={handleChangeGender(GENDER.MAN)}
          selected={watch('gender') === GENDER.MAN}
        />
        <RadioSelectGender
          text="account_information:female"
          onPress={handleChangeGender(GENDER.WOMAN)}
          selected={watch('gender') === GENDER.WOMAN}
        />
        <RadioSelectGender
          text="account_information:other"
          onPress={handleChangeGender(GENDER.OTHER)}
          selected={watch('gender') === GENDER.OTHER}
        />
      </Block>
    </Block>
  );
};
