import React from 'react';
import {
  Animated,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { View } from '@rn-core';
import { styles } from './styles';
import { useStyles } from 'react-native-unistyles';

type Route = {
  key: string;
  title: string;
};
interface IPTabBarCutom {
  inactiveOpacity: Animated.AnimatedInterpolation<number>;
  route: Route;
  activeOpacity: Animated.AnimatedInterpolation<number>;
  jumpTo: (key: string) => void;

  // style
  textStyleActive?: StyleProp<TextStyle>;
  textStyleInActive?: StyleProp<TextStyle>;
  tabBarStyleInActive?: StyleProp<ViewStyle>;
  tabBarStyleActive?: StyleProp<ViewStyle>;
}

const initStyleText = {
  backgroundColor: 'transparent',
  color: '#000',
  fontSize: 14,
};

const TabBarCustom = ({
  inactiveOpacity,
  route,
  activeOpacity,
  jumpTo,
  textStyleActive = { ...initStyleText, fontWeight: '500' },
  textStyleInActive = initStyleText,
  tabBarStyleActive,
  tabBarStyleInActive,
}: IPTabBarCutom) => {
  const {
    theme: { color },
  } = useStyles();

  return (
    <View style={styles.tab}>
      <Animated.View
        style={[
          styles.item,
          {
            borderBottomColor: color.neutral600,
            borderBottomWidth: 1,
            opacity: inactiveOpacity,
            ...(typeof tabBarStyleInActive === 'object'
              ? tabBarStyleInActive
              : {}),
          },
        ]}>
        <TouchableOpacity onPress={() => jumpTo(route.key)}>
          <Text
            style={{
              ...styles.label,
              ...(typeof textStyleInActive === 'object'
                ? textStyleInActive
                : {}),
            }}>
            {route.title}
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          ...styles.item,
          ...styles.activeItem,
          borderColor: color.primaryBase,
          opacity: activeOpacity,
          ...(typeof tabBarStyleActive === 'object' ? tabBarStyleActive : {}),
        }}>
        <TouchableOpacity onPress={() => jumpTo(route.key)}>
          <Text
            style={{
              ...styles.label,
              ...(typeof textStyleActive === 'object' ? textStyleActive : {}),
            }}>
            {route.title}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default TabBarCustom;
