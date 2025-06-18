import React from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import BackButton from '../../back-button';

interface IPHeader {
  title: string;
  renderRight?: () => JSX.Element;
  isShowLeft?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  colorButton?: string;
  customBackButton?: () => void;
}

const Header = ({
  title,
  renderRight,
  isShowLeft = true,
  containerStyle,
  textStyles,
  colorButton,
  customBackButton
}: IPHeader) => {
  const { styles } = useStyles(styleSheet);

  return (
    <View style={[styles.root, containerStyle]}>
      <View>
        {isShowLeft ? (
          <BackButton color={colorButton} customBack={customBackButton} />
        ) : (
          <View style={{ width: 10 }} />
        )}
      </View>
      <Text style={[styles.title, textStyles]}>{title}</Text>
      {renderRight ? (
        <View>{renderRight()}</View>
      ) : (
        <View style={{ width: 10 }} />
      )}
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.primaryWhite,
    borderBottomColor: color.info550,
    borderBottomWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    color: color.Neutrals07,
    fontSize: 16,
    fontWeight: 'bold',
  },
}));

export default Header;
