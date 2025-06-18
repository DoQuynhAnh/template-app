import React from 'react';

import { Block } from '@components/block';

import { RowRateProps } from './type';
import { useStyles } from 'react-native-unistyles';
import _AntDesign from 'react-native-vector-icons/AntDesign';
const AntDesign = _AntDesign as unknown as React.ElementType;

export const RowRate = ({ star, size }: RowRateProps) => {
  const {theme: {color}} = useStyles()

  // func
  const renderStar = (_: number, index: number) => {
    return (
      <Block key={index} paddingHorizontal={1}>
        <AntDesign
          name="star"
          size={size || 14}
          color={star < index + 1 ? color.neutral_04 : color.status_yellow}
        />
      </Block>
    );
  };

  // render
  return <Block direction="row">{Array(5).fill(0).map(renderStar)}</Block>;
};
