import { type SvgProps } from 'react-native-svg';

export type SvgIconProps = SvgProps & {
  size?: string | number;

  /**
   * Tint color of icon
   * @default undefined
   */
  color?: string;

  /**
   * Allow onPress to icon
   * @default undefined
   */
  onPress?: () => void;

  /**
   * state focus icon
   * @default false
   */
  focused?: boolean;
};
