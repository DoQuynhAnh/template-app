import React, { useEffect, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

interface ToggleSwitchProps {
  isOn?: boolean;
  onToggle?: (value: boolean) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  trackOnColor?: string;
  trackOffColor?: string;
  thumbOnColor?: string;
  thumbOffColor?: string;
  label?: string;
  labelPosition?: 'left' | 'right';
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
  testID?: string;
  animationSpeed?: number;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn = false,
  onToggle,
  size = 'medium',
  disabled = false,
  trackOnColor = '#4CD964',
  trackOffColor = '#E5E5E5',
  thumbOnColor = '#FFFFFF',
  thumbOffColor = '#FFFFFF',
  label,
  labelPosition = 'right',
  labelStyle,
  containerStyle,
  testID,
  animationSpeed = 300,
}) => {
  const [isActive, setIsActive] = useState<boolean>(isOn);
  const [dimensions, setDimensions] = useState({
    height: 0,
    thumbPosition: 0,
    thumbSize: 0,
    width: 0,
  });

  // Animation value for thumb position
  const [thumbAnim] = useState(new Animated.Value(isOn ? 1 : 0));

  // Calculate dimensions based on size
  useEffect(() => {
    let width, height, thumbSize;

    switch (size) {
      case 'small':
        width = 40;
        height = 22;
        thumbSize = 16;
        break;
      case 'large':
        width = 70;
        height = 36;
        thumbSize = 30;
        break;
      case 'medium':
      default:
        width = 50;
        height = 28;
        thumbSize = 22;
        break;
    }

    const thumbPosition = width - thumbSize - 4;

    setDimensions({
      height,
      thumbPosition,
      thumbSize,
      width,
    });
  }, [size]);

  // Update animation when isOn prop changes
  useEffect(() => {
    setIsActive(isOn);
    Animated.timing(thumbAnim, {
      duration: animationSpeed,
      toValue: isOn ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [isOn, thumbAnim, animationSpeed]);

  // Calculate animated values
  const thumbPosition = thumbAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, dimensions.thumbPosition],
  });

  const trackColor = thumbAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [trackOffColor, trackOnColor],
  });

  const thumbColor = thumbAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [thumbOffColor, thumbOnColor],
  });

  // Handle toggle
  const handleToggle = () => {
    if (disabled) {return;}

    const newValue = !isActive;
    setIsActive(newValue);

    Animated.timing(thumbAnim, {
      duration: animationSpeed,
      toValue: newValue ? 1 : 0,
      useNativeDriver: false,
    }).start();

    if (onToggle) {
      onToggle(newValue);
    }
  };

  return (
    <View
      style={[
        styles.container,
        labelPosition === 'left' ? styles.containerReverse : null,
        containerStyle,
      ]}
      testID={testID}>
      {label && (
        <Text
          style={[
            styles.label,
            labelPosition === 'left' ? styles.labelLeft : styles.labelRight,
            disabled && styles.disabledText,
            labelStyle,
          ]}>
          {label}
        </Text>
      )}

      <TouchableWithoutFeedback onPress={handleToggle} disabled={disabled}>
        <View style={[styles.wrapper, { opacity: disabled ? 0.5 : 1 }]}>
          <Animated.View
            style={[
              styles.track,
              {
                backgroundColor: trackColor,
                borderRadius: dimensions.height / 2,
                height: dimensions.height,
                width: dimensions.width,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.thumb,
              {
                backgroundColor: thumbColor,
                borderRadius: dimensions.thumbSize / 2,
                height: dimensions.thumbSize,
                transform: [{ translateX: thumbPosition }],
                width: dimensions.thumbSize,
              },
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerReverse: {
    flexDirection: 'row-reverse',
  },
  disabledText: {
    opacity: 0.6,
  },
  label: {
    fontSize: 16,
  },
  labelLeft: {
    marginRight: 10,
  },
  labelRight: {
    marginLeft: 10,
  },
  thumb: {
    elevation: 2,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    top: 2.5,
  },
  track: {
    justifyContent: 'center',
  },
  wrapper: {
    position: 'relative',
  },
});

export default ToggleSwitch;
