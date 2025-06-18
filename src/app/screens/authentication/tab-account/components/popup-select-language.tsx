import { Block } from '@/library/components/block';
import { Modal } from '@/library/components/modal';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { LanguageButton } from './language-button';
import { changeLanguage } from '@/library/utils/i18n/translate';

export const PopupSelectLanguage = forwardRef((_, ref) => {
  // state
  const [visible, setVisible] = useState<boolean>(false);

  // func
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

  const onChangeLanguage = (language: 'vi' | 'en' | 'ko') => {
    changeLanguage(language);
    hideModal();
  }

  // render
  return (
    <Modal
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      isVisible={visible}>
      <Block
        borderRadius={8}
        marginRight={60}
        marginLeft={60}
        colorTheme="background"
        padding={16}>
        <Text
          center
          preset="paragraph2"
          colorTheme="Neutrals07"
          t18n="account:title_select_language"
        />
        <Spacer height={16} />
        <Text
          center
          preset="label"
          colorTheme="dark150"
          t18n="account:content_select_language"
        />
        <Spacer height={24} />
        <LanguageButton flag="VN" language="account:vietnamese" onPress={() => onChangeLanguage('vi')} />
        <Spacer height={12} />
        <LanguageButton flag="GB" language="account:english" onPress={() => onChangeLanguage('en')} />
        <Spacer height={12} />
        <LanguageButton flag="KO" language="account:ko" onPress={() => onChangeLanguage('ko')} />
      </Block>
    </Modal>
  );
});
