/* eslint-disable max-params */
/* eslint-disable react/no-unstable-nested-components */
import { Block } from '@/library/components/block';
import { ListView } from '@/library/components/list-view';
import { Loading } from '@/library/components/post-delay/loading';
import { Screen } from '@/library/components/screen';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import Header from '@/library/components/ui/header';
import { APP_SCREEN, StackScreenProps } from '@/navigation/screen-types';
import { getImageUrl } from '@/utils';
import { ListRenderItemInfo } from '@shopify/flash-list';
import moment from 'moment';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import _Entypo from 'react-native-vector-icons/Entypo';
import _FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  getNewDetail,
  getNewRelated,
  NewsArticle,
} from '../../../services/service-news/news.api';
import ItemNews from '../news/components/item-news';
import { processHtmlContent } from './hooks/useImageUtils';

const FontAwesome5 = _FontAwesome5 as unknown as React.ElementType;
const Entypo = _Entypo as unknown as React.ElementType;

const DetailNews = ({
  route: { params },
}: StackScreenProps<APP_SCREEN.NEWS_DETAILS>) => {
  const rootRef = useRef<View>(null);
  const {
    styles,
    theme: { color, textPresets },
  } = useStyles(styleSheet);
  const [t] = useTranslation();

  const { data, isFetching } = getNewDetail(params._id);
  const { data: newRelateds } = getNewRelated(params._id);

  const renderSpacer = () => {
    return <Spacer height={15} />;
  };

  const renderItem = ({ index, item }: ListRenderItemInfo<NewsArticle>) => {
    return <ItemNews key={index} item={item} />;
  };

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        // statusColor="#2760ED"
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Header title={t('news:news_details')} />
        <ScrollView>
          {isFetching ? (
            <Block style={{ marginTop: '40%' }}>
              <Loading />
            </Block>
          ) : (
            <>
              <Block padding={15} height={'100%'}>
                <Text
                  style={{
                    ...textPresets.subtitle1,
                    color: color['141414'],
                  }}>
                  {data?.name}
                </Text>
                <Block
                  direction="row"
                  paddingVertical={15}
                  borderBottomColor="#E6E8EC"
                  borderBottomWidth={1}
                  alignItems="center">
                  <FontAwesome5
                    name={'calendar-alt'}
                    size={16}
                    color={color.neutral_05}
                  />
                  <Text
                    color={color.neutral_05}
                    style={{
                      paddingLeft: 5,
                      paddingRight: 10,
                    }}>
                    {moment(data?.createdAt).format('DD/MM/YYYY')}
                  </Text>
                  <Block direction="row">
                    <Entypo name="eye" color={color.neutral_05} size={16} />
                    <Text
                      color={color.neutral_05}
                      style={{
                        paddingLeft: 5,
                      }}>
                      {data?.viewCount}
                    </Text>
                  </Block>
                </Block>

                <Block paddingTop={15}>
                  <Image
                    source={{
                      uri: getImageUrl(data?.thumbnailImage?.publicUrl),
                    }}
                    style={styles.img}
                    resizeMode="contain"
                  />

                  <RenderHtml
                    source={{ html: processHtmlContent(data?.content ?? '') }}
                  />
                  {/* {data?.contentImages.map((item, index) => {
                  return (
                  );
                })} */}
                </Block>
                {newRelateds?.hits && <Block
                  marginTop={15}
                  borderTopColor="#E6E8EC"
                  borderTopWidth={1}
                  paddingTop={15}>
                  <Text
                    style={{
                      ...textPresets.subtitle1,
                      color: color['141414'],
                    }}>
                    Tin liên quan
                  </Text>

                  <ListView
                    data={newRelateds?.hits ?? []}
                    renderItem={renderItem}
                    estimatedItemSize={100}
                    // numColumns={2}
                    ItemSeparatorComponent={renderSpacer}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </Block>}
              </Block>
            </>
          )}
        </ScrollView>
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
  img: {
    paddingVertical: 15,
    width: '100%',
    height: '35%',
  },
}));

export default DetailNews;
