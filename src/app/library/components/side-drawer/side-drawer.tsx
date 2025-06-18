/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerContext } from 'src/app/provider/drawer-context';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DEFAULT_DRAWER_WIDTH = SCREEN_WIDTH * 0.8;

interface SideDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
  backdropColor?: string;
  drawerStyle?: StyleProp<ViewStyle>;
  animationDuration?: number;
}

const SideDrawer: React.FC<SideDrawerProps> = ({
  isVisible,
  onClose,
  children,
  width = DEFAULT_DRAWER_WIDTH,
  backdropColor = 'rgba(0, 0, 0, 0.5)',
  drawerStyle,
  animationDuration = 300,
}) => {
  const translateX = useRef(new Animated.Value(-width)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    setDisable(isVisible);
  }, [isVisible]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: (_, gestureState) => {
        const newPosition = gestureState.dx;
        if (newPosition < 0) {
          translateX.setValue(newPosition);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -width * 0.3) {
          closeDrawer();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
      onStartShouldSetPanResponder: () => true,
    }),
  ).current;

  const openDrawer = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        duration: animationDuration,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        duration: animationDuration,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        duration: 300,
        toValue: -width,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        duration: 300,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  useEffect(() => {
    if (isVisible) {
      openDrawer();
    }
  }, [isVisible]);

  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  if (!isVisible) {return null;}

  return (
    <DrawerContext.Provider value={{ closeDrawer }}>
      <View style={{ ...styles.container, top: statusBarHeight + 50 }}>
        <Pressable
          onPress={() => {
            disable && closeDrawer();
          }}
          style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[
              styles.backdrop,
              {
                backgroundColor: backdropColor,
                opacity,
              },
            ]}
          />
        </Pressable>

        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX }],
              width,
            },
            drawerStyle,
          ]}
          {...panResponder.panHandlers}>
          {children}
        </Animated.View>
      </View>
    </DrawerContext.Provider>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  container: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 1000,
  },
  drawer: {
    backgroundColor: 'white',
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
  },
});

export default SideDrawer;
