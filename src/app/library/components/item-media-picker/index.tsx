import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import Video from 'react-native-video';

import { ItemMediaProps } from './type';
import { Block } from '../block';
import _Ionicons from 'react-native-vector-icons/Ionicons';
import _MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useStyles } from 'react-native-unistyles';
const Ionicons = _Ionicons as unknown as React.ElementType;
const MaterialIcons = _MaterialIcons as unknown as React.ElementType;

export const ItemMediaPicker = ({ media, onDelete }: ItemMediaProps) => {

  const {theme: {color}} = useStyles()

  // render
  return (
    <Block
      marginRight={8}
      width={96}
      height={96}
      borderRadius={5}
      justifyContent={'center'}
      overflow={'hidden'}>
      {media.type?.includes('image') ? (
        <Image
          resizeMode="cover"
          source={{ uri: media.uri }}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <>
          <Video
            paused
            muted
            resizeMode="cover"
            style={StyleSheet.absoluteFillObject}
            source={{ uri: media.uri }}
          />
          <Block
            alignSelf="center"
            position="absolute"
            width={22}
            height={22}
            borderRadius={22}
            middle
            justifyContent="center"
            overflow={'hidden'}>
            <Block
              style={StyleSheet.absoluteFillObject}
              colorTheme={'neutral_08'}
              opacity={0.6}
            />
            {/* <Icon colorTheme="neutral_01" size={12} icon="play" />
             */}
            <Ionicons
              name="play-circle"
              size={30}
              color="#fff"
              // style={styles.playIcon}
            />
          </Block>
        </>
      )}

      <Block position="absolute" right={5} top={5}>
        <TouchableOpacity onPress={onDelete}>
          <Block
            colorTheme="neutral_05"
            width={20}
            height={20}
            borderRadius={16}
            middle
            justifyContent="center">
            <MaterialIcons color={color.neutral_01} size={12} name="cancel" />
          </Block>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};
