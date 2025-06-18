import { Block } from '@/library/components/block';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { styleSheet } from './styles';
import { Text } from '@/library/components/text';
import _Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { APP_SCREEN } from '@/navigation/screen-types';
import { NewsArticle } from '../../../../services/service-news/news.api';
import { getImageUrl } from '@/utils';
import moment from 'moment';
const Entypo = _Entypo as unknown as React.ElementType;

interface Props {
  item?: NewsArticle;
}

const ItemNews = ({ item }: Props) => {
  const { navigate } = useNavigation();

  const {
    styles,
    theme: { color, textPresets },
  } = useStyles(styleSheet);

  return (
    <TouchableOpacity
      onPress={() =>
        navigate(APP_SCREEN.NEWS_DETAILS, { _id: item?._id ?? '' })
      }>
      <Block direction="row" style={styles.container}>
        <Image
          source={{
            uri: getImageUrl(item?.thumbnailImage?.publicUrl),
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <Block padding={5}>
          <Text
            numberOfLines={2}
            style={{
              ...textPresets.paragraph1Bold,
              color: color.Neutrals07,
              width: '53%',
            }}>
            {item?.name ??
              'Lorem ipsum dolor sit amet, consectetur adipisci adipisci adipisci'}
          </Text>
          {/* <Text
            numberOfLines={2}
            style={{
              ...textPresets.label,
              color: color['5C5C5C'],
            }}>
            {item?.name ??
              'Lorem ipsum dolor sit amet, consectetur adipisci adipisci adipisci'}

          </Text> */}

          <Block
            //   block
            marginTop={5}
            direction="row"
            alignItems="center">
            <Text
              style={{
                ...textPresets.label,
                color: color.dark150,
              }}>
              {moment(item?.createdAt).format('DD/MM/YYYY')}
            </Text>
            <Entypo name="dot-single" color={color.dark150} size={15} />
            <Block paddingLeft={3}>
              <Entypo name="eye" color={color.dark150} size={20} />
            </Block>
            <Block paddingLeft={3}>
              <Text
                style={{
                  ...textPresets.label,
                  color: color.dark150,
                }}>
                {item?.viewCount ?? 0}
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

export default ItemNews;
