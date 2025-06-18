import { Block } from '@/library/components/block';
import { ListView } from '@/library/components/list-view';
import { ReloadByState } from '@/library/components/reload-by-state';
import { Screen } from '@/library/components/screen';
import { Spacer } from '@/library/components/spacer';
import Header from '@/library/components/ui/header';
import { ListRenderItemInfo } from '@shopify/flash-list';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { getNews, NewsArticle } from '../../../services/service-news/news.api';
import ItemNews from './components/item-news';
import { useIsFocused } from '@react-navigation/native';

const News = () => {
  const rootRef = useRef<View>(null);
  const { styles } = useStyles(styleSheet);
  const [t] = useTranslation();
  const { data, isFetching, refetch } = getNews();
  const isFocused = useIsFocused();

  console.log(JSON.stringify(data?.hits), 'data');


  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }
  , [isFocused]);
  // func
  const renderItem = ({ index, item }: ListRenderItemInfo<NewsArticle>) => {
    return <ItemNews key={index} item={item} />;
  };

  const renderSpacer = () => {
    return <Spacer height={15} />;
  };

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        // statusColor="#2760ED"
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Header title={t('news:header')} isShowLeft={false} />
        <Block padding={15} height={'100%'}>
          <ReloadByState reloadState={isFetching} delayMs={600}>
            <ListView
              data={data?.hits ?? []}
              renderItem={renderItem}
              estimatedItemSize={100}
              // numColumns={2}
              ItemSeparatorComponent={renderSpacer}
            />
          </ReloadByState>
        </Block>
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.background,
    flex: 1,
    paddingTop: 0,
  },
}));

export default News;
