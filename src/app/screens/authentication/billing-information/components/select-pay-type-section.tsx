import { RadioButton } from '@/library/components/radio-button';
import { Spacer } from '@/library/components/spacer';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

// import { Block, RadioButton, Spacer, Text } from '@components';

export const SelectPayTypeSection = () => {
  const { t } = useTranslation();

  const {
    theme: { color, textPresets },
  } = useStyles(styleSheet);

  // state
  const [payType, setPayType] = useState<0 | 1>(0);
  // func
  const handleChangeType = (type: 0 | 1) => {
    return () => setPayType(type);
  };

  const renderCODType = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}>
        <RadioButton onToggle={handleChangeType(0)} value={payType === 0} />
        <Spacer width={12} />
        <Text
          style={{
            ...textPresets.placeholder,
            color: color.dark150,
          }}>
          {t('billing_information:pay_by_QR')}
        </Text>
      </View>
    );
  };

  const renderCreditType = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}>
        <RadioButton onToggle={handleChangeType(1)} value={payType === 1} />
        <Spacer width={12} />
        <Text
          style={{
            ...textPresets.placeholder,
            color: color.dark150,
          }}>
          {t('billing_information:credit_pay')}
        </Text>
      </View>
    );
  };

  // render
  return (
    <View
      style={{
        flexDirection: 'column',
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}>
      <Text
        style={{
          ...textPresets.paragraphBold,
          color: color.Neutrals07,
        }}>
        {t('billing_information:select_pay_type')}
      </Text>
      <Spacer height={12} />
      {renderCODType()}
      <Spacer height={12} />
      {renderCreditType()}
    </View>
  );
};

const styleSheet = createStyleSheet(() => ({}));
