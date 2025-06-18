/* eslint-disable sortKeysFix/sort-keys-fix */
/* eslint-disable no-inline-comments */
import _Ionicons from 'react-native-vector-icons/Ionicons';
import _AntDesign from 'react-native-vector-icons/AntDesign';

import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
const AntDesign = _AntDesign as unknown as React.ElementType;
const Ionicons = _Ionicons as unknown as React.ElementType;

const ReviewItem = () => {
  const { styles } = useStyles(styleSheet);

  // Dữ liệu hình ảnh
  const images = [
    {
      id: '1',
      uri: 'https://bizweb.dktcdn.net/100/415/697/products/naukhoi.jpg?v=1715048844013',
    }, // Thay bằng URL hình ảnh thực
    {
      id: '2',
      uri: 'https://bizweb.dktcdn.net/100/415/697/products/xanhden-59dac545-b271-49ac-9176-810775077983.jpg?v=1715066500533',
    },
    {
      id: '3',
      uri: 'https://m.media-amazon.com/images/I/81L5shykO1L._AC_SL1300_.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Thông tin người đánh giá */}
      <View style={{ ...styles.flexStyle, width: '89%' }}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRblJ7qPRsvhJG66qYujCEsWyoyT35H4ZaSA&s',
          }}
          style={styles.avatar}
        />

        <View>
          <View>
            <View
              style={{
                ...styles.flexStyle,
                marginBottom: 5,
              }}>
              <Text style={styles.userName}>Nguyễn Thị Linh</Text>
              <View style={styles.stars}>
                {[...Array(5)].map((_, index) => (
                  <AntDesign
                    key={index}
                    name="star"
                    size={14}
                    color={'#FFB600'}
                  />
                ))}
              </View>
            </View>
            <Text style={styles.reviewDate}>
              15-05-2022 12:34 | Phân loại: Trái cây
            </Text>
          </View>

          {/* Nội dung đánh giá */}
          <Text style={styles.reviewContent}>
            Sản phẩm xinh đẹp. Sản phẩm xinh đẹp. Sản phẩm xinh đẹp.
          </Text>

          {/* Các thẻ đánh giá */}
          <View style={styles.tags}>
            <TouchableOpacity style={styles.tag}>
              <Text style={styles.tagText}>Chất lượng sản phẩm tuyệt vời</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tag}>
              <Text style={styles.tagText}>
                Đóng gói sản phẩm đẹp và chắc chắn
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tag}>
              <Text style={styles.tagText}>Thời gian giao hàng rất nhanh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tag}>
              <Text style={styles.tagText}>Rất đáng tiền</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tag}>
              <Text style={styles.tagText}>Shop phục vụ tốt</Text>
            </TouchableOpacity>
          </View>

          {/* Hình ảnh đính kèm */}
          <FlatList
            data={images}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.imageContainer}>
                <Image
                  source={{ uri: item.uri }}
                  style={styles.image}
                  resizeMode="contain"
                />
                {/* Icon play nếu là video */}
                {item.id === '1' && (
                  <Ionicons
                    name="play-circle"
                    size={30}
                    color="#fff"
                    style={styles.playIcon}
                  />
                )}
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  container: {
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 2,
    padding: 15,
  },
  actionButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  actionText: {
    color: '#666',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    borderRadius: 20,
    height: 40,
    marginRight: 10,
    width: 40,
  },
  stars: {
    flexDirection: 'row',
    gap: 3,
    marginRight: 9,
  },
  flexStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 8,
    height: 96,
    width: 96,
  },
  imageContainer: {
    marginRight: 10,
    position: 'relative',
  },
  playIcon: {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: [{ translateX: -12 }, { translateY: -15 }],
  },

  reviewContent: {
    color: color.Neutrals07,
    fontSize: 14,
    marginBottom: 10,
  },
  reviewDate: {
    color: color.Neutrals09,
    fontSize: 10,
    marginBottom: 12,
  },

  tag: {
    backgroundColor: color.bgLight01,
    borderRadius: 15,
    marginBottom: 5,
    marginRight: 10,
    padding: 10,
  },
  tagText: {
    color: color.dark100,
    fontSize: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  userName: {
    color: color.Neutrals07,
    fontSize: 14,
    fontWeight: 'bold',
  },
}));

export default ReviewItem;
