import { createStyleSheet } from 'react-native-unistyles';

export const buttonStyleSheet = createStyleSheet(({ color, textPresets }) => ({
  buttonColor: (disabled?: boolean) => ({
    backgroundColor: disabled ? color.neutral200 : color.PrimaryLight,
    borderColor: disabled ? color.neutral200 : color.primaryBase,
  }),
  extraSmall: {
    alignItems: 'center',
    borderRadius: 8,
    columnGap: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 8,
  },
  normal: {
    alignItems: 'center',
    borderRadius: 8,
    columnGap: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 12,
  },
  outline: {
    borderWidth: 1,
  },
  small: {
    alignItems: 'center',
    borderRadius: 8,
    columnGap: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 10,
  },
  textColor: (disabled?: boolean) => ({
    color: disabled ? color.neutral200 : color.neutral50,
  }),
  textStyle: {
    fontWeight: 'bold',
    marginHorizontal: 'auto',
    textAlign: 'center',
  },
  text_extraSmall: { ...textPresets.extraSmall },
  text_normal: { ...textPresets.CTAs },
  text_small: { ...textPresets.CTASmall },
}));
