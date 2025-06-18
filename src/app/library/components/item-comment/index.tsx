import React from 'react';

import { ListView } from '@components/list-view';

import { Block } from '../block';
import { Image } from '../image';
import { RowRate } from '../row-rate';
import { Spacer } from '../spacer';
import { Text } from '../text';
import { TagComment } from '@/model/app';
import { DATA_TAGS } from '@/common/constant';

export const ItemComment = () => {
  // func
  const renderTag = (tag: TagComment) => {
    return (
      <Block
        key={tag.id}
        marginBottom={8}
        marginRight={8}
        paddingVertical={6}
        paddingHorizontal={16}
        colorTheme={'neutral_03'}
        borderRadius={8}>
        <Text colorTheme="Neutrals07" preset="label">
          {tag.content}
        </Text>
      </Block>
    );
  };

  const renderImage = () => {
    return (
      <Block width={90} height={90} borderRadius={8} overflow={'hidden'}>
        <Image
          source={
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
          }
        />
      </Block>
    );
  };

  const renderSpacer = () => {
    return <Spacer width={8} />;
  };

  // render
  return (
    <Block padding={16} colorTheme="background">
      <Block direction="row">
        <Block overflow="hidden" width={32} height={32} borderRadius={32}>
          <Image
            source={
              'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            }
          />
        </Block>
        <Spacer width={8} />
        <Block block>
          <Block block direction="row">
            <Block block>
              <Text
                colorTheme="Neutrals07"
                preset="placeholderBold"
                text="Nguyễn Thị Linh"
              />
              <Spacer height={4} />
              <Block direction="row" middle>
                <Text
                  colorTheme="neutral_05"
                  preset="label"
                  text="15-05-2022 12:34"
                />
                <Block
                  width={1}
                  height={10}
                  colorTheme={'neutral_05'}
                  marginLeft={4}
                  marginRight={4}
                />
                <Text
                  colorTheme="neutral_05"
                  preset="label"
                  text="15-05-2022 12:34"
                />
              </Block>
            </Block>
            <RowRate star={4} />
          </Block>
          <Spacer height={12} />
          <Text colorTheme="dark150" preset="placeholderBold">
            Sản phẩm xinh đẹp. Sản phẩm xinh đẹp. Sản phẩm xinh đẹp.
          </Text>
          <Spacer height={8} />
          <Block direction="row" flexWrap="wrap">
            {DATA_TAGS.map(renderTag)}
          </Block>
          <Spacer height={4} />
          <ListView
            canRefresh={false}
            data={[1, 2, 3, 4, 5]}
            horizontal
            estimatedItemSize={90}
            renderItem={renderImage}
            ItemSeparatorComponent={renderSpacer}
          />
        </Block>
      </Block>
    </Block>
  );
};
