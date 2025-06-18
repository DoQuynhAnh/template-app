import ArrowLeft from '@assets/icon/svg/arrow-left';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const BackButton = ({
  color,
  customBack,
}: {
  color?: string;
  customBack?: () => void;
}) => {
  const navigation = useNavigation();
  return (
    <View style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <TouchableOpacity
        onPress={() => {
          customBack ? customBack() : navigation.goBack();
        }}>
        <ArrowLeft color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
