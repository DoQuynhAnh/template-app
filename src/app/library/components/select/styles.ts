/* eslint-disable no-inline-comments */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  errorText: {
    color: '#F87171',
    fontSize: 14, // danger-300
  },
  inputContainer: {
    alignItems: 'center',
    borderColor: '#E8E8E8', borderRadius: 8,
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
    // grey-50
    padding: 12,
  },
  inputContainerDisabled: {
    backgroundColor: '#E5E7EB', // neutral-200
  },
  inputContainerError: {
    borderColor: '#DC2626', // danger-600
  },
  inputValue: {
    color: '#000000',
  },
  inputValueContainer: {
    flex: 1,
  },
  inputValueError: {
    color: '#DC2626', // danger-600
  },
  requireText: {
    color: '#9A9A9A',
    fontSize: 14,
  },
  requireAsterisk: {
    color: '#FF0000',
    fontSize: 14,
    marginTop: 10,
  },
  label: {
    color: '#353945',
    fontSize: 14,
    // grey-100
    marginBottom: 4,
  },
  labelError: {
    color: '#DC2626', // danger-600
  },
  option: {
    alignItems: 'center',
    // neutral-300
    backgroundColor: '#FFFFFF',

    borderBottomColor: '#D1D5DB',

    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  optionText: {
    flex: 1,
  },
});
