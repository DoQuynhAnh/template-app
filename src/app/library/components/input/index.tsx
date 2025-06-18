import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import * as React from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { Controller, useController } from 'react-hook-form';
import type { StyleProp, TextInputProps, TextStyle } from 'react-native';
import { TextInput as NTextInput, TouchableOpacity, View } from 'react-native';
import { NumericFormat } from 'react-number-format';
import { styles } from './styles';
import { EyeIcon, EyeSlashIcon } from '@assets/icon/svg';
import { Text } from '../text';
import { useTranslation } from 'react-i18next';

export interface NInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  disabled?: boolean;
  error?: string;
  require?: boolean;
  isBottomSheetInput?: boolean;
  style?: StyleProp<TextStyle>;
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

interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {
  type?: 'string' | 'number';
}

export const Input = React.forwardRef<NTextInput, NInputProps>((props, ref) => {
  const {
    label,
    error,
    testID,
    style,
    editable = true,
    isBottomSheetInput = false,
    ...inputProps
  } = props;
  const [isFocussed, setIsFocussed] = React.useState(false);
  const onBlur = React.useCallback(() => setIsFocussed(false), []);
  const onFocus = React.useCallback(() => setIsFocussed(true), []);
  const [showPassword, setShowPassword] = React.useState(false);
  // const { t } = useTranslation();
  const [t] = useTranslation();
  const { require } = props;

  const InputComponent = isBottomSheetInput ? BottomSheetTextInput : NTextInput;

  // Create base input style
  const baseInputStyle: StyleProp<TextStyle> = {
    ...styles.input,
    ...(isFocussed ? styles.inputFocused : {}),
    ...(error ? styles.inputError : {}),
    ...(props.disabled ? styles.inputDisabled : {}),
    ...(inputProps.secureTextEntry ? { paddingRight: 48 } : {}),
  };

  console.log(t(error as any));

  // const i18nText = React.useMemo(
  //   () => t18n && t(t18n, t18nOptions),
  //   [ t],
  // );

  return (
    <View style={styles.container}>
      {label && (
        <Text
          testID={testID ? `${testID}-label` : undefined}
          style={[styles.label, error ? styles.labelError : undefined]}>
          {label}
          {require && (
            <Text style={styles.requireText}>
              {' '}
              <Text style={styles.requireAsterisk}>*</Text>
            </Text>
          )}
        </Text>
      )}
      <View>
        <InputComponent
          testID={testID}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={ref as React.Ref<any>}
          placeholderTextColor={'#A3A3A3'}
          style={[baseInputStyle, style]}
          onBlur={onBlur}
          onFocus={onFocus}
          editable={editable}
          {...inputProps}
          secureTextEntry={inputProps.secureTextEntry && !showPassword}
        />
        {inputProps.secureTextEntry && (
          <TouchableOpacity
            style={styles.passwordIcon}
            onPress={() => {
              setShowPassword(!showPassword);
            }}>
            {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text
          testID={testID ? `${testID}-error` : undefined}
          style={styles.errorText}>
          {t(error as any)}
        </Text>
      )}
    </View>
  );
});

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>,
) {
  const { name, control, rules, type = 'string', ...inputProps } = props;
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <>
      {type === 'string' ? (
        <Input
          ref={field.ref}
          autoCapitalize="none"
          onChangeText={field.onChange}
          value={(field.value as string) || ''}
          {...inputProps}
          error={fieldState.error?.message}
        />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field: { value } }) => (
            <NumericFormat
              value={value}
              displayType={'text'}
              thousandSeparator={true}
              decimalSeparator="."
              allowNegative={true}
              min={0}
              isAllowed={values => {
                const { value } = values;
                return Number(value) >= 0;
              }}
              type={'text'}
              renderText={val => {
                return (
                  <Input
                    ref={field.ref}
                    autoCapitalize="none"
                    onChangeText={text => {
                      // Sanitize input to only keep numbers
                      const sanitizedText = text
                        .replace(/[^0-9]/g, '')
                        .replace(/^0+(?=\d)/, '');

                      field.onChange(sanitizedText);
                    }}
                    value={(val as string) || ''}
                    {...inputProps}
                    error={fieldState.error?.message}
                  />
                );
              }}
            />
          )}
        />
      )}
    </>
  );
}
