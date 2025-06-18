import React, { useMemo } from 'react';
import {
  ColorValue,
  Text as ReactNativeText,
  StyleProp,
  StyleSheet,
  TextStyle,
} from 'react-native';

import { useTranslation } from 'react-i18next';

import { FontDefault } from '@theme/typography';

import { useStyles } from 'react-native-unistyles';
import { TextProps } from './type';
import { propsToStyle } from '@/common/method';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export const Text = ({
  t18n,
  text,
  flex,
  color,
  center,
  children,
  fontSize,
  textAlign,
  fontStyle,
  lineHeight,
  fontWeight,
  fontFamily,
  colorTheme,
  t18nOptions,
  textTransform,
  letterSpacing,
  textDecorationLine,
  preset = 'label',
  style: styleOverride = {},
  ...rest
}: TextProps) => {
  // state
  const { theme } = useStyles();
  const { textPresets } = theme;
  const [t] = useTranslation();
  const i18nText = useMemo(
    () => t18n && t(t18n, t18nOptions),
    [t18n, t18nOptions, t],
  );
  const content = useMemo<React.ReactNode>(
    () => (i18nText as unknown as string) || text || children,
    [i18nText, text, children],
  );
  const styleComponent = useMemo<StyleProp<TextStyle>>(
    () => [
      [
        preset && textPresets[preset],
        flex === true && styles.flex,
        fontSize !== undefined && { fontSize: fontSize },
        fontFamily !== undefined && {
          fontFamily: FontDefault[fontFamily as keyof typeof FontDefault],
        },
        colorTheme !== undefined && {
          color: theme.color[colorTheme] as ColorValue,
        },
        center && { textAlign: 'center' },
        propsToStyle([
          { fontWeight },
          { color },
          { textAlign },
          { textTransform },
          { textDecorationLine },
          { fontStyle },
          { letterSpacing },
          { lineHeight },
        ]),
      ],
    ],
    [
      preset,
      textPresets,
      flex,
      fontSize,
      fontFamily,
      colorTheme,
      theme.color,
      center,
      fontWeight,
      color,
      textAlign,
      textTransform,
      textDecorationLine,
      fontStyle,
      letterSpacing,
      lineHeight,
    ],
  );
  // render
  return (
    <ReactNativeText
      allowFontScaling={false}
      {...rest}
      style={[styleComponent, styleOverride]}>
      {content}
    </ReactNativeText>
  );
};
