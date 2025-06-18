/* eslint-disable sortKeysFix/sort-keys-fix */
import { Block } from '@/library/components/block';
import { Icon } from '@/library/components/icon';
import { Modal } from '@/library/components/modal';
import React, { forwardRef, useImperativeHandle } from 'react';
import { Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface IPPopupBuyNow {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const PopupBuyNow = forwardRef(
  ({ setVisible, visible }: IPPopupBuyNow, ref) => {
    const {
      theme: { color, textPresets },
    } = useStyles(styleSheet);

    const hideModal = () => {
      setVisible(false);
    };

    // effect
    useImperativeHandle(
      ref,
      () => ({
        show: () => {
          setVisible(true);
        },
      }),
      [],
    );

    const renderStep = ({
      step1,
      step2,
      marginTop,
    }: {
      step1: string;
      step2: string;
      marginTop?: number;
    }) => {
      return (
        <Block
          direction="row"
          alignItems="center"
          justifyContent="center"
          marginTop={marginTop}>
          <Text
            style={{
              ...textPresets.paragraph1Bold,
              color: color.Neutrals07,
            }}>
            {step1}{' '}
          </Text>
          <Text
            style={{
              ...textPresets.paragraph1,
              color: color.Neutrals07,
            }}>
            {step2}
          </Text>
        </Block>
      );
    };

    return (
      <Modal
        style={{
          justifyContent: 'center',
        }}
        isVisible={visible}
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}>
        <Block
          colorTheme="primaryWhite"
          width={'80%'}
          padding={15}
          style={{
            marginHorizontal: 'auto',
          }}>
          <Block
            borderColor="#E6E8EC"
            borderRadius={12}
            borderWidth={1}
            padding={15}>
            {renderStep({
              step1: 'Bước 1:',
              step2: 'Quét /Chuyển tiền',
            })}
            <Block style={{ marginHorizontal: 'auto' }} paddingVertical={10}>
              <Icon icon={'qr_img'} size={120} />
            </Block>
            <Text
              style={{
                ...textPresets.paragraph1,
                color: color.Neutrals07,
                textAlign: 'center',
                paddingTop: 5,
              }}>
              Tên ngân hàng:
            </Text>
            <Text
              style={{
                ...textPresets.paragraph1Bold,
                color: color.primaryBase,
                textAlign: 'center',
              }}>
              Vietcombank
            </Text>

            <Text
              style={{
                ...textPresets.paragraph1,
                color: color.Neutrals07,
                textAlign: 'center',
                paddingTop: 15,
              }}>
              Số tài khoản:
            </Text>
            <Text
              style={{
                ...textPresets.paragraph1Bold,
                color: color.primaryBase,
                textAlign: 'center',
              }}>
              1028932309
            </Text>

            {renderStep({
              step1: 'Bước 2:',
              step2: 'Nhập nội dung chuyển tiền',
              marginTop: 15
            })}
          </Block>
        </Block>
      </Modal>
    );
  },
);

const styleSheet = createStyleSheet(() => ({}));

export default PopupBuyNow;
