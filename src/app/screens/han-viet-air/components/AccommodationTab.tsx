import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const AccommodationTab = ({ title, active }: any) => {
  return (
    <TouchableOpacity>
      <Block
        paddingHorizontal={20}
        paddingVertical={12}
        borderRadius={25}
        color={active ? '#2A58F6' : '#F0F0F0'}>
        <Text
          fontWeight="700"
          text={title}
          fontSize={14}
          color={active ? '#FFFFFF' : '#666666'}
        />
      </Block>
    </TouchableOpacity>
  );
};

export default AccommodationTab;
