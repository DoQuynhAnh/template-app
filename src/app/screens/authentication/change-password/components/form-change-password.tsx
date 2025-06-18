import React from 'react';

import { useForm } from 'react-hook-form';

import { Block } from '@/library/components/block';
import { PrimaryButton } from '@/library/components/button/primary-button';
import { ControlledInput } from '@/library/components/input';
import { Spacer } from '@/library/components/spacer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { FormChangePasswordProps, FormType, schema } from '../type';

export const FormChangePassword = ({ onSubmit, isPending }: FormChangePasswordProps) => {
  const [t] = useTranslation();

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  // render
  return (
    <Block>
      <Spacer height={24} />
      <ControlledInput
        control={control}
        name="oldPassword"
        label={t('change_password:old_password')}
        placeholder={t('change_password:old_password_placeholder')}
        secureTextEntry
      />
      <Spacer height={12} />
      <ControlledInput
        control={control}
        name="newPassword"
        label={t('change_password:new_password')}
        placeholder={t('change_password:new_password_placeholder')}
        secureTextEntry
      />
      <Spacer height={12} />
      <ControlledInput
        control={control}
        name="confirmPassword"
        label={t('change_password:confirm_new_password')}
        placeholder={t('change_password:confirm_new_password_placeholder')}
        secureTextEntry
      />
      <Spacer height={24} />
      <PrimaryButton
        onPress={handleSubmit(onSubmit)}
        t18n="change_password:submit"
        loading={isPending}
      />
    </Block>
  );
};
