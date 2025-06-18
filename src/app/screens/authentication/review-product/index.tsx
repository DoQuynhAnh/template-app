import React, { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { DATA_TAGS } from '@/common/constant';
import { pickMedia } from '@/common/method';
import { Block } from '@/library/components/block';
import { OutlineButton } from '@/library/components/button/outline-button';
import { PrimaryButton } from '@/library/components/button/primary-button';
import { Image } from '@/library/components/image';
import { Input } from '@/library/components/input';
import { ItemCommentTag } from '@/library/components/item-comment-tag';
import { ItemMediaPicker } from '@/library/components/item-media-picker';
import { RowRate } from '@/library/components/row-rate';
import { Screen } from '@/library/components/screen';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import Header from '@/library/components/ui/header';
import { TagComment } from '@/model/app';
import { useTranslation } from 'react-i18next';
import { Asset } from 'react-native-image-picker';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const ReviewProduct = () => {
  const { styles } = useStyles(styleSheet1);
  const rootRef = useRef<View>(null);
  const [t] = useTranslation();

  // state
  const [listSelected, setListSelected] = useState<Array<any>>([]);
  const [listMedia, setListMedia] = useState<Array<Asset>>([]);

  // func
  const handleAddMedia = async () => {
    const media = await pickMedia({});
    if (media) {
      setListMedia(d => {
        if (d.find(x => x.uri === media.uri)) {
          return d;
        }
        return d.concat([media]);
      });
    }
  };

  const handleDeleteMedia = (media: Asset) => {
    return () => setListMedia(d => d.filter(x => x.uri !== media.uri));
  };

  const renderMedia = (media: Asset) => {
    return (
      <ItemMediaPicker
        media={media}
        key={media.uri}
        onDelete={handleDeleteMedia(media)}
      />
    );
  };

  const handleTagPress = (tag: TagComment) => {
    return () => {
      setListSelected(d => {
        if (d.find(x => x.id === tag.id)) {
          return d.filter(f => f.id !== tag.id);
        }
        return d.concat([tag]);
      });
    };
  };

  const renderTag = (item: TagComment) => {
    return (
      <ItemCommentTag
        key={item.id}
        tag={item}
        onPress={handleTagPress(item)}
        selected={listSelected.find(x => x.id === item.id) !== undefined}
      />
    );
  };
  // render
  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Header title={t('review_product:header')} />
        <Block padding={15}>
          <Block padding={16} colorTheme={'background'}>
            <Block direction="row" middle>
              <Block
                width={64}
                height={64}
                borderRadius={4}
                overflow={'hidden'}>
                <Image
                  source={
                    'https://images.unsplash.com/photo-1669390412953-677ec75ae6d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                  }
                />
              </Block>
              <Spacer width={8} />
              <Block>
                <Text
                  preset="paragraphBold"
                  colorTheme="dark150"
                  text="Máy móc nông nghiệp"
                />
                <Spacer height={4} />
                <Text
                  preset="label"
                  colorTheme="neutral_05"
                  t18n="my_reviews:category_type"
                  t18nOptions={{ type: 'Khác' }}
                />
                <Spacer height={4} />
                <Text
                  preset="label"
                  colorTheme="neutral_05"
                  text="Máy móc nông nghiệp"
                  t18n="my_reviews:amount"
                  t18nOptions={{ count: 10 }}
                />
              </Block>
            </Block>
            <Spacer height={16} />
            <Block alignSelf="center">
              <RowRate size={26} star={4} />
            </Block>
            <Spacer height={16} />
            <Input
              // name="email"
              label={t('my_reviews:detail_rate')}
              placeholder={t('my_reviews:detail_rate')}
            />
            <Spacer height={12} />
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {DATA_TAGS.map(renderTag)}
              </ScrollView>
            </View>
            {listMedia.length > 0 ? (
              <>
                <Spacer height={12} />
                <Block>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {listMedia.map(renderMedia)}
                  </ScrollView>
                </Block>
                <Spacer height={12} />
              </>
            ) : null}
            <Spacer height={12} />
            <Block direction="row" middle>
              <Block block>
                <OutlineButton
                  onPress={handleAddMedia}
                  t18n="my_reviews:add_media"
                />
              </Block>
              <Spacer width={16} />
              <Block block>
                <PrimaryButton
                  t18n="my_reviews:send_review"
                />
              </Block>
            </Block>
          </Block>
        </Block>
      </Screen>
    </View>
  );
};

const styleSheet1 = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.primaryWhite,
    height: '100%',
  },
}));
