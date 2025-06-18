import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';
import { ArrowRight } from '@assets/icon/svg/arrow-right';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const SeeMore = () => {
  return (
    <Block justifyContent="center" alignItems="center" marginTop={20}>
      <TouchableOpacity>
        {/* <ButtonSvg /> */}
        <Block
          width={120}
          height={40}
          borderRadius={20}
          justifyContent="center"
          alignItems="center"
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            backgroundColor: '#F5F5F5',
            borderWidth: 1,
            borderColor: '#E0E0E0',
            paddingHorizontal: 10,
            gap: 15,
          }}>
          <Text t18n="home:view_all" fontSize={16} fontWeight="500" />
          <ArrowRight />
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

export default SeeMore;
