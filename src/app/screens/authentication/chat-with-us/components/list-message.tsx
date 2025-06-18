import React from 'react';

import { ListRenderItemInfo } from '@shopify/flash-list';

import { ImageMessage } from './image-message';
import { TextMessage } from './text-message';

import { messages } from '../mock';
import { Message, MessageType } from '@/model/chat';
import { Spacer } from '@/library/components/spacer';
import { ListView } from '@/library/components/list-view';

export const ListMessage = () => {
  // func
  const renderItem = ({ item }: ListRenderItemInfo<Message>) => {
    switch (item.type) {
      case MessageType.TEXT:
        return <TextMessage mine={item.mine} text={item.text} />;

      case MessageType.IMAGE:
        return <ImageMessage mine={item.mine} image={item.image} />;
      default:
        return null;
    }
  };

  const getItemType = (item: Message) => {
    return item.type;
  };

  const renderSpacer = () => {
    return <Spacer height={8} />;
  };

  // render
  return (
    <ListView
      data={messages}
      inverted
      canRefresh={false}
      keyboardShouldPersistTaps={'handled'}
      ItemSeparatorComponent={renderSpacer}
      renderItem={renderItem}
      estimatedItemSize={150}
      getItemType={getItemType}
    />
  );
};
