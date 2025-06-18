import { Block } from '@/library/components/block';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import React from 'react';
import { useStyles } from 'react-native-unistyles';
import _EvilIcons from 'react-native-vector-icons/EvilIcons';
const EvilIcons = _EvilIcons as unknown as React.ElementType;

// import { VectorIcon } from '@assets/vector-icon/vector-icon';

export const AddressSection = () => {
  const {
    theme: { color },
  } = useStyles();

  // render
  return (
    <Block
      // colorTheme="background"
      direction="row"
      paddingHorizontal={15}
      paddingVertical={12}>
      <EvilIcons name="location" size={24} color={color.primaryBase} />
      <Spacer width={5} />
      <Block block>
        <Block direction="row" middle>
          <Text
            preset="paragraph1Bold"
            colorTheme="Neutrals07"
            text="Nguyễn Văn A"
          />
          <Block
            width={1}
            height={20}
            // colorTheme={'bgLight02'}
            marginLeft={8}
            marginRight={8}
            style={{
              backgroundColor: '#B1B5C3',
            }}
          />
          <Text
            preset="paragraph1Bold"
            colorTheme="Neutrals07"
            text="0123 456 789"
          />
        </Block>
        <Spacer height={8} />
        <Text
          preset="placeholder"
          colorTheme="Neutrals07"
          text="Số 1, Ngõ 54 Trung Kính, Cầu Giấy, Hà Nội lksjdldkj"
        />
      </Block>
    </Block>
  );
};
