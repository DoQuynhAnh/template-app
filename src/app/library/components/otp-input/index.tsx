import React from 'react';
import { ColorValue, View, ViewStyle } from 'react-native';
import {
  OtpInput as RnOtpInput
} from 'react-native-otp-entry';

interface IPOtpInput {
  // extends React.ForwardRefExoticComponent<
  //   OtpInputProps & React.RefAttributes<OtpInputRef>
  // >
  containerStyle?: ViewStyle | undefined;
  pinCodeContainerStyle?: ViewStyle | undefined;
  numberOfDigits: number;
  type?: 'numeric' | 'alpha' | 'alphanumeric' | undefined;
  onTextChange?: ((text: string) => void) | undefined;
  focusColor?: ColorValue | undefined;
}

const OtpInput = ({
  numberOfDigits = 6,
  onTextChange,
  type = 'numeric',
  focusColor = '#353945',
  containerStyle = {
    gap: 10,
    // width: 200,
  },
  pinCodeContainerStyle = {
    height: 48,
    width: 48,
  },
}: IPOtpInput) => {
  return (
    <View>
      <RnOtpInput
        numberOfDigits={numberOfDigits}
        onTextChange={onTextChange}
        focusColor={focusColor}
        type={type}
        secureTextEntry={false}
        theme={{
          containerStyle,
          pinCodeContainerStyle,
        }}
      />
    </View>
  );
};

export default OtpInput;
