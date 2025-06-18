/* eslint-disable no-lone-blocks */
/* eslint-disable no-inline-comments */
/* eslint-disable max-lines-per-function */
import {
  BottomSheetFlatList,
  type BottomSheetModal,
} from '@gorhom/bottom-sheet';
import * as React from 'react';
import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import {
  Pressable,
  type PressableProps,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

import { CaretDown } from '@assets/icon/svg';
import { Modal, useModal } from './modal';
import { styles } from './styles';
import { ControlledSelectProps, OptionType, SelectProps } from './type';

const List = BottomSheetFlatList;

type OptionsProps = {
  options: OptionType[];
  onSelect: (option: OptionType) => void;
  value?: string | number;
  testID?: string;
  containerStyle?: ViewStyle;
  optionStyle?: ViewStyle;
  optionTextStyle?: TextStyle;
  optionSelectedIconStyle?: ViewStyle;
};

function keyExtractor(item: OptionType) {
  return `select-item-${item.value}`;
}

export const Options = React.forwardRef<BottomSheetModal, OptionsProps>(
  (
    {
      options,
      onSelect,
      value,
      testID,
      containerStyle,
      optionStyle,
      optionTextStyle,
      optionSelectedIconStyle,
    },
    ref,
  ) => {
    const height = options.length * 70 + 100;
    const snapPoints = React.useMemo(() => [height], [height]);

    const renderSelectItem = React.useCallback(
      ({ item }: { item: OptionType }) => (
        <Option
          key={`select-item-${item.value}`}
          label={item.label}
          selected={value === item.value}
          onPress={() => onSelect(item)}
          testID={testID ? `${testID}-item-${item.value}` : undefined}
          style={optionStyle}
          textStyle={optionTextStyle}
          selectedIconStyle={optionSelectedIconStyle}
        />
      ),
      [
        onSelect,
        value,
        testID,
        optionStyle,
        optionTextStyle,
        optionSelectedIconStyle,
      ],
    );

    return (
      <Modal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: '#FFFFFF',
          ...containerStyle,
        }}>
        <List
          data={options}
          keyExtractor={keyExtractor}
          renderItem={renderSelectItem}
          testID={testID ? `${testID}-modal` : undefined}
          // estimatedItemSize={52}
        />
      </Modal>
    );
  },
);

type OptionProps = PressableProps & {
  selected?: boolean;
  label: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  selectedIconStyle?: ViewStyle;
};

const Option = React.memo(
  ({
    label,
    selected = false,
    style,
    textStyle,
    selectedIconStyle,
    ...props
  }: OptionProps) => {
    return (
      <Pressable style={[styles.option, style]} {...props}>
        <Text style={[styles.optionText, textStyle]}>{label}</Text>
        {selected && <Check style={selectedIconStyle} />}
      </Pressable>
    );
  },
);

export const Select = (props: SelectProps) => {
  const {
    label,
    value,
    error,
    options = [],
    placeholder = 'select...',
    disabled = false,
    onSelect,
    testID,
    // Custom styles
    containerStyle,
    labelStyle,
    inputContainerStyle,
    inputValueStyle,
    errorTextStyle,
    caretIconStyle,
    optionsContainerStyle,
    optionStyle,
    optionTextStyle,
    optionSelectedIconStyle,
    require
  } = props;
  const modal = useModal();
  const onSelectOption = React.useCallback(
    (option: OptionType) => {
      onSelect?.(option.value);
      modal.dismiss();
    },
    [modal, onSelect],
  );

  const getInputContainerStyle = React.useMemo(() => {
    const baseStyles = [
      styles.inputContainer,
      error ? styles.inputContainerError : {},
      disabled ? styles.inputContainerDisabled : {},
      inputContainerStyle,
    ];
    return baseStyles;
  }, [error, disabled, inputContainerStyle]);

  const getLabelStyle = React.useMemo(() => {
    const baseStyles = [
      styles.label,
      error ? styles.labelError : {},
      labelStyle,
    ];
    return baseStyles;
  }, [error, labelStyle]);

  const getInputValueStyle = React.useMemo(() => {
    const baseStyles = [
      styles.inputValue,
      error ? styles.inputValueError : {},
      inputValueStyle,
    ];
    return baseStyles;
  }, [error, inputValueStyle]);

  const textValue = React.useMemo(
    () =>
      value !== undefined
        ? options?.filter(t => t.value === value)?.[0]?.label ?? placeholder
        : placeholder,
    [value, options, placeholder],
  );

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text
            testID={testID ? `${testID}-label` : undefined}
            style={getLabelStyle}>
            {label}
            {require && <Text style={styles.requireText}>
              {' '}
              <Text style={styles.requireAsterisk}>*</Text>
            </Text>}
          </Text>
        )}
        <Pressable
          style={getInputContainerStyle}
          disabled={disabled}
          onPress={modal.present}
          testID={testID ? `${testID}-trigger` : undefined}>
          <View style={styles.inputValueContainer}>
            <Text style={getInputValueStyle}>{textValue}</Text>
          </View>
          <View style={caretIconStyle}>
            <CaretDown />
          </View>
        </Pressable>
        {error && (
          <Text
            testID={`${testID}-error`}
            style={[styles.errorText, errorTextStyle]}>
            {error}
          </Text>
        )}
      </View>
      <Options
        testID={testID}
        ref={modal.ref}
        options={options}
        onSelect={onSelectOption}
        value={value}
        containerStyle={optionsContainerStyle}
        optionStyle={optionStyle}
        optionTextStyle={optionTextStyle}
        optionSelectedIconStyle={optionSelectedIconStyle}
      />
    </>
  );
};

// only used with react-hook-form
export function ControlledSelect<T extends FieldValues>(
  props: ControlledSelectProps<T>,
) {
  const { name, control, rules, onSelect: onNSelect, ...selectProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  const onSelect = React.useCallback(
    (value: string | number) => {
      field.onChange(value);
      onNSelect?.(value);
    },
    [field, onNSelect],
  );
  return (
    <Select
      onSelect={onSelect}
      value={field.value}
      error={fieldState.error?.message}
      {...selectProps}
    />
  );
}

const Check = ({ style, ...props }: SvgProps & { style?: ViewStyle }) => {
  return (
    <Svg
      width={25}
      height={24}
      fill="none"
      viewBox="0 0 25 24"
      {...props}
      style={style}>
      <Path
        d="m20.256 6.75-10.5 10.5L4.506 12"
        stroke={'black'}
        strokeWidth={2.438}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

// Ví dụ nếu dùng trong form
{
  /* <ControlledSelect
        options={[
          {
            label: 'label 1',
            value: 1,
          },
          {
            label: 'label 2',
            value: 2,
          },
        ]}
        control={control}
        name="email"
        label="select"
        // containerStyle={{
        //   borderWidth: 1,
        //   borderColor: '#E8E8E8'
        // }}
        // optionsContainerStyle={}
        inputContainerStyle={{ borderColor: '#E8E8E8', borderRadius: 8 }}

      /> */
}

// Ví dụ nếu chỉ dùng select
{
  /* <Select
        options={[
          {
            label: 'label 1',
            value: 1,
          },
          {
            label: 'label 2',
            value: 2,
          },
        ]}
        inputContainerStyle={{ borderColor: '#E8E8E8', borderRadius: 8 }}
        onSelect={(e) => console.log(e)}
      /> */
}
