/* eslint-disable no-inline-comments */
import { CalendarIcon } from '@assets/icon/svg';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface DateTimePickerProps {
  onChange: (date: number) => void;
  currentDate: number | string;
  maxDate?: Date;
  minDate?: Date;
  onHandleOpen?: () => void;
  isOpen?: boolean;
  notShowDate?: boolean;
  // Custom style props
  containerStyle?: ViewStyle;
  dateButtonStyle?: ViewStyle;
  dateTextStyle?: TextStyle;
  calendarIconProps?: {
    width?: number;
    height?: number;
    color?: string;
  };
  modalProps?: Partial<DateTimePickerModal>;
}

export default function DateTimePicker(props: DateTimePickerProps) {
  const {
    onChange,
    onHandleOpen,
    isOpen,
    currentDate,
    minDate,
    maxDate,
    notShowDate,
    // Custom style props
    containerStyle,
    dateButtonStyle,
    dateTextStyle,
    calendarIconProps,
    modalProps,
  } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    onHandleOpen && onHandleOpen();
  };

  const handleConfirm = (date: Date) => {
    onChange(date ? date.getTime() : Date.now());
    hideDatePicker();
    onHandleOpen && onHandleOpen();
  };

  useEffect(() => {
    if (isOpen !== undefined) {
      setDatePickerVisibility(isOpen);
    }
  }, [isOpen]);

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.dateButton, dateButtonStyle]}
        onPress={showDatePicker}>
        <Text style={[styles.dateText, dateTextStyle]}>
          {!notShowDate
            ? new Date(currentDate || Date.now()).toLocaleDateString('vi')
            : ''}
        </Text>
        <CalendarIcon {...calendarIconProps} />
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePickerModal
          themeVariant="light"
          locale="vi"
          isVisible={isDatePickerVisible}
          mode="date"
          cancelTextIOS="Hủy"
          confirmTextIOS="Chọn"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={maxDate || new Date()}
          minimumDate={minDate}
          date={new Date(currentDate)}
          pickerComponentStyleIOS={{
            marginHorizontal: 'auto',
          }}
          pickerStyleIOS={{
            width: '100%',
          }}
          {...modalProps}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Default container styles
  },
  dateButton: {
    alignItems: 'center',
    borderColor: '#E6E8EC',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  dateText: {
    color: 'black',
  },
});

// Ví dụ
// eslint-disable-next-line no-lone-blocks
{/* <DateTimePicker
        // maxDate={new Date(params['sessionDate[lte]'] as number)}
        onChange={date => console.log(date)}
        currentDate={Date.now()}
      /> */}