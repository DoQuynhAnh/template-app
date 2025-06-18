import { Block } from '@/library/components/block';
import { ItemComment } from '@/library/components/item-comment';
import { ListView } from '@/library/components/list-view';
import { Spacer } from '@/library/components/spacer';
import React from 'react';

export const TabRated = () => {
  // func
  const renderComment = () => {
    return <ItemComment />;
  };

  const renderSpacer = () => {
    return <Spacer height={8} />;
  };

  // render
  return (
    <Block flex={1}>
      <ListView
        canRefresh={false}
        ItemSeparatorComponent={renderSpacer}
        ListHeaderComponent={<Spacer height={8} />}
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={renderComment}
        estimatedItemSize={200}
      />
    </Block>
  );
};
