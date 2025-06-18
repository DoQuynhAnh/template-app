import { Block } from '@/library/components/block';
import { PrimaryButton } from '@/library/components/button/primary-button';
import { ControlledInput } from '@/library/components/input';
import { ControlledSelect } from '@/library/components/select';
import { Spacer } from '@/library/components/spacer';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';

import { useForm } from 'react-hook-form';
import { FormType, schema } from '../type';
import { useTranslation } from 'react-i18next';

export const FormCancel = () => {
  const [t] = useTranslation();

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (e: FormType) => {
    console.log(e);
  };

  // render
  return (
    <Block>
      <ControlledSelect
        require
        options={[
          {
            label: 'Hà Nội',
            value: 'Hà Nội',
          },
          {
            label: 'Hải Dương',
            value: 'Hải Dương',
          },
          {
            label: 'Nam Định',
            value: 'Nam Định',
          },
        ]}
        control={control}
        name="reason"
        label={t('cancel_order:reason')}
        placeholder={t('cancel_order:reason_placeholder')}
        // inputContainerStyle={{ borderColor: '#E8E8E8', borderRadius: 8 }}
      />
      <Spacer height={15} />
      <ControlledInput
        control={control}
        name="detail"
        label={t('cancel_order:detail')}
        placeholder={t('cancel_order:detail_placeholder')}
        require
        multiline
        numberOfLines={40}
        style={{
          height: 80
        }}
      />
      <Spacer height={24} />
      <PrimaryButton
        t18n="cancel_order:submit"
        onPress={handleSubmit(onSubmit)}
      />
    </Block>
  );
};
