import { InputControllerType } from '@components/input/type';
import { FieldValues } from 'react-hook-form';
import { TextStyle, ViewStyle } from 'react-native';

export type OptionType = { label: string; value: string | number };

export interface SelectProps {
  value?: string | number;
  label?: string;
  disabled?: boolean;
  error?: string;
  options?: OptionType[];
  onSelect?: (value: string | number) => void;
  placeholder?: string;
  testID?: string;
  // Custom styling props
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputContainerStyle?: ViewStyle;
  inputValueStyle?: TextStyle;
  errorTextStyle?: TextStyle;
  caretIconStyle?: ViewStyle;
  // Options styling
  optionsContainerStyle?: ViewStyle;
  optionStyle?: ViewStyle;
  optionTextStyle?: TextStyle;
  optionSelectedIconStyle?: ViewStyle;
  require?: boolean
}

export interface ControlledSelectProps<T extends FieldValues>
  extends SelectProps,
    InputControllerType<T> {}
