import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { getImageUrl } from '@/utils';
import { IMessageCustom } from '..';
import _AntDesign from 'react-native-vector-icons/AntDesign';

const AntDesign = _AntDesign as unknown as React.ElementType;

const { width, height } = Dimensions.get('window');

interface ImagePreviewProps {
  message: IMessageCustom | null;
  onClose: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ message, onClose }) => {
  if (!message || !message.image) {return null;}

  return (
    <Modal
      visible={!!message}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <AntDesign name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: getImageUrl(message.image) }}
            style={styles.previewImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  imageContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: width,
    height: width * 1.3,
    backgroundColor: 'transparent',
  },
});
