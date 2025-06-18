import { TextInputProps } from 'react-native';

import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
  require?: boolean;
  isBottomSheetInput?: boolean;
}

type TRule<T extends FieldValues> =
  | Omit<
      RegisterOptions<T>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
  | undefined;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
};

export interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {
  type?: 'string' | 'number';
}
