import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface IPQuantityButton {
  handleDecrease: () => void;
  handleIncrease: () => void;
  quantity: number;
}

const QuantityButton = ({
  handleDecrease,
  handleIncrease,
  quantity,
}: IPQuantityButton) => {
  const { styles } = useStyles(styleSheet);

  return (
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        onPress={handleDecrease}
        disabled={quantity === 1}
        style={[styles.button, quantity === 1 ? styles.buttonDisable : null]}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity onPress={handleIncrease} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  button: {
    backgroundColor: color.bgLight01,
    height: 25,
    width: 35,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisable: {
    backgroundColor: color.dark200,
  },
  buttonText: {
    color: '#333',
    fontSize: 18,
  },
  quantityContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  quantityText: {
    color: '#333',
    fontSize: 16,
    paddingHorizontal: 15,
  },
}));

export default QuantityButton;
