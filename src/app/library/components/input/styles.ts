import { StyleSheet } from 'react-native';

// Define styles using StyleSheet
export const styles = StyleSheet.create({
    container: {
      marginBottom: 8,
    },
    errorText: {
      color: '#F87171',
      fontSize: 14,
    },
    input: {
      borderColor: '#E6E8EC',
      borderRadius: 8,
      borderWidth: 1,
      fontSize: 14,
      fontWeight: '500',
      height: 48,
      // lineHeight: 20,
      marginTop: 0,
      paddingHorizontal: 16,
      // paddingVertical: 12,
    },
    inputDisabled: {
      backgroundColor: '#E5E5E5',
    },
    inputError: {
      borderColor: '#DC2626',
    },
    inputFocused: {
      borderColor: '#A3A3A3',
    },
    label: {
      color: '#353945',
      fontSize: 14,
      marginBottom: 4,
      alignItems: 'center',
      alignContent: 'center',
    },
    labelError: {
      color: '#DC2626',
    },
    passwordIcon: {
      backgroundColor: 'transparent',
      bottom: 0,
      paddingHorizontal: 12,
      paddingVertical: 16,
      position: 'absolute',
      right: 0,
    },
    requireAsterisk: {
      color: '#FF0000',
      fontSize: 14,
      marginTop: 10
    },
    requireText: {
      color: '#9A9A9A',
      fontSize: 14,
    },
  });
