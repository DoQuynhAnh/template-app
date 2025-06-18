import { Modal } from '@/library/components/modal';
import React from 'react';
import { Text, View } from 'react-native';

interface IPModalCoupon {
  isVisible: boolean;
}

const ModalCoupon = ({ isVisible }: IPModalCoupon) => {
  return (
    <View>
      <Modal isVisible={isVisible}>
        <Text>Modal content</Text>
      </Modal>
    </View>
  );
};

export default ModalCoupon;
