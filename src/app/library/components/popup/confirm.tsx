import React, {
  createRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';

import { ConfirmData, ConfirmPopupType } from './type';

import { Block } from '../block';
import { OutlineButton } from '../button/outline-button';
import { PrimaryButton } from '../button/primary-button';
import { Modal } from '../modal';
import { Spacer } from '../spacer';
import { Text } from '../text';
import { useTranslation } from 'react-i18next';

const PopupConfirmComponent = forwardRef((_, ref) => {
  // state
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmData, setConfirmData] = useState<ConfirmData | undefined>(
    undefined,
  );

  // func
  const onModalHide = () => {
    setConfirmData(undefined);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleLeftPress = () => {
    hideModal();
    execFunc(confirmData?.leftPress);
  };

  const handleRightPress = () => {
    hideModal();
    execFunc(confirmData?.rightPress);
  };

  // effect
  useImperativeHandle(
    ref,
    () => ({
      show: (data: ConfirmData) => {
        setConfirmData(data);
        setVisible(true);
      },
    }),
    [],
  );

  const {t} = useTranslation();

  // render
  return (
    <Modal onModalHide={onModalHide} isVisible={visible}>
      <Block
        margin={50}
        colorTheme="primaryWhite"
        borderRadius={8}
        padding={16}>
        <Text
          center
          colorTheme="dark100"
          preset="paragraphBold"
          text={confirmData?.title}
        />
        <Spacer height={16} />
        <Text
          center
          colorTheme="Neutrals07"
          preset="label"
          text={confirmData?.content}
        />
        <Spacer height={24} />
        <Block direction="row" middle alignSelf="center">
          <OutlineButton
            text={confirmData?.leftButton ?? t('action:cancel')}
            onPress={handleLeftPress}
            style={{ width: 200 }}
          />
          <Spacer width={12} />
          <PrimaryButton
            text={confirmData?.rightButton ?? t('action:delete')}
            onPress={handleRightPress}
          />
        </Block>
      </Block>
    </Modal>
  );
});

const confirmRef = createRef<ConfirmPopupType>();

export const PopupConfirm = () => <PopupConfirmComponent ref={confirmRef} />;

export const showConfirm = (data: ConfirmData) => {
  confirmRef.current?.show(data);
};
