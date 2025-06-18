import React, { useMemo } from 'react';

import { useForm } from 'react-hook-form';

import { Block } from '@/library/components/block';
import { PrimaryButton } from '@/library/components/button/primary-button';
import DateTimePicker from '@/library/components/date-time-picker';
import { ControlledInput } from '@/library/components/input';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
// import _AntDesign from 'react-native-vector-icons/AntDesign';
import { FormType, FormUpdateUserProps, schema } from '../type';
import { SelectGender } from './select-gender';
import {
  CLIENT_LOCAL,
  IClient,
} from '../../../../services/service-auth/login.api';
import { getItem } from '@/library/storage';
// const AntDesign = _AntDesign as unknown as React.ElementType;

export const FormUpdateUser = ({
  onSubmit,
  isPending,
}: FormUpdateUserProps) => {
  const client: IClient = useMemo(() => getItem(CLIENT_LOCAL), []);
  const [t] = useTranslation();
  // const {
  //   theme: { color },
  // } = useStyles();

  // state

  const { handleSubmit, control, setValue, watch } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: client?.email ?? '',
      phone: client?.phone ?? '',
      birth: client?.dob ? client?.dob : `${new Date().getTime()}`,
      gender: client?.gender ?? '',
      name: client?.fullname ?? '',
    },
  });

  // render
  return (
    <Block>
      {/* <Text
        t18n="account_information:avatart"
        color="dark100"
        preset="placeholderBold"
      />
      <Spacer height={11} /> */}
      {/* <Block alignSelf="center">
        <Block overflow="hidden" width={72} height={72} borderRadius={72}>
          <Image source={''} />
        </Block>
        <Block position="absolute" right={0} bottom={0}>
          <TouchableOpacity>
            <Block
              colorTheme="neutral_03"
              width={24}
              height={24}
              middle
              justifyContent="center"
              borderRadius={12}
              overflow={'hidden'}>
              <AntDesign name="camerao" size={14} color={color.dark150} />
            </Block>
          </TouchableOpacity>
        </Block>
      </Block> */}
      <Spacer height={11} />
      <Text
        t18n="account_information:detail"
        color="dark100"
        preset="placeholderBold"
      />
      <Spacer height={26} />
      <Block>
        <ControlledInput
          control={control}
          name="email"
          label={t('account_information:username')}
          placeholder={t('account_information:username_placeholder')}
        />
        <Spacer height={11} />
        <ControlledInput
          control={control}
          name="name"
          label={t('account_information:full_name')}
          placeholder={t('account_information:full_name_placeholder')}
        />
        <Spacer height={11} />
        <SelectGender watch={watch} setValue={setValue} />
        <Spacer height={19} />
        <ControlledInput
          control={control}
          name="phone"
          keyboardType="phone-pad"
          label={t('account_information:phone_number')}
          placeholder={t('account_information:phone_number_placeholder')}
        />
        <Spacer height={11} />
        <Block style={{ gap: 4 }}>
          <Text t18n="account_information:date_of_birth" preset="paragraph2" />
          <DateTimePicker
            currentDate={Number(watch('birth'))}
            onChange={e => setValue('birth', `${e}`)}
          />
        </Block>
      </Block>
      <Spacer height={26} />

      <PrimaryButton
        onPress={onSubmit ? handleSubmit(onSubmit) : undefined}
        t18n="account_information:save"
        loading={isPending}
        // buttonType="fill"
      />
    </Block>
  );
};
