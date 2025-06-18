import React from 'react';

import { ItemNotYetRated } from './item-not-yet-rated';
import { Spacer } from '@/library/components/spacer';
import { ListView } from '@/library/components/list-view';
import { Block } from '@/library/components/block';

export const TabNotYetRated = () => {
  // func
  const renderItemRate = () => {
    return <ItemNotYetRated />;
  };

  const renderSpacer = () => {
    return <Spacer height={8} />;
  };

  // render
  return (
    <Block flex={1}>
      <ListView
        // useLegacy
        canRefresh={false}
        ItemSeparatorComponent={renderSpacer}
        ListHeaderComponent={<Spacer height={8} />}
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={renderItemRate}
        estimatedItemSize={200}
      />
    </Block>
  );
};
