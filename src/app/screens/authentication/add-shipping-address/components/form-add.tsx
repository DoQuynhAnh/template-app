import { Block } from '@/library/components/block';
import { PrimaryButton } from '@/library/components/button/primary-button';
import { Checkbox } from '@/library/components/checkbox';
import { ControlledInput } from '@/library/components/input';
import { useSelectAddressStore } from '@/zustands/address';
import { toast } from '@backpackapp-io/react-native-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { FormType, schema } from '../type';
import {
  userAddShippingAddresses,
  userUpdateShippingAddresses,
} from '../../../../services/service-auth/login.api';
import { useTranslation } from 'react-i18next';

const FormAdd = () => {
  const {
    theme: { color },
  } = useStyles(styleSheet);
  const navigation = useNavigation();
  const { mutateAsync, isPending } = userAddShippingAddresses();
  const { mutateAsync: mutateAsyncUpdate, isPending: isLoading } =
    userUpdateShippingAddresses();

  const [isDefault, setIsDefault] = useState(false);
  const { setAddress, address, itemEdit } = useSelectAddressStore();

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: itemEdit?.name ?? '',
      phoneNumber: itemEdit?.phone ?? '',
      specificAddress: itemEdit?.address ?? '',
      districts: itemEdit?.district ?? '',
      province: itemEdit?.province ?? '',
      wards: itemEdit?.ward ?? '',
    },
  });

  const onSubmit = async (e: FormType) => {
    let newArray = [...address];
    if (isDefault) {
      newArray = newArray.map(e => ({ ...e, isDefault: false }));
    }

    if (itemEdit) {
      const indexOf = address.findIndex(e => e._id === itemEdit._id);
      const newValueEdit = {
        ...itemEdit,
        name: e.fullName,
        phone: e.phoneNumber,
        address: e.specificAddress,
        isDefault,
      };
      const {} = await mutateAsyncUpdate({
        data: {
          address: e.specificAddress,
          district: e.districts,
          isDefault,
          name: e.fullName,
          phone: e.phoneNumber,
          province: e.province,
          ward: e.wards,
        },
        shippingAddressId: itemEdit._id,
      });
      setAddress([
        ...newArray.slice(0, indexOf),
        newValueEdit,
        ...newArray.slice(indexOf + 1),
      ]);
    } else {
      const data = await mutateAsync({
        address: e.specificAddress,
        district: e.districts,
        isDefault,
        name: e.fullName,
        phone: e.phoneNumber,
        province: e.province,
        ward: e.wards,
      });

      setAddress([
        ...newArray,
        {
          ...data,
        },
      ]);
    }
    toast.success(
      !itemEdit ? t('messages:create_address_success') : t('messages:update_address_success'),
    );
    navigation.goBack();
  };

  useEffect(() => {
    setIsDefault(!!itemEdit?.isDefault);
  }, [itemEdit?.isDefault]);

  const { t } = useTranslation();

  return (
    <Block
      padding={15}
      paddingVertical={20}
      style={{
        gap: 10,
      }}>
      <ControlledInput
        control={control}
        name="fullName"
        label={t('account_information:full_name')}
        placeholder={t('account_information:full_name')}
        require
      />
      <ControlledInput
        control={control}
        keyboardType="phone-pad"
        name="phoneNumber"
        label={t('account_information:phone_number')}
        placeholder={t('account_information:phone_number')}
        require
      />
      <ControlledInput
        control={control}
        name="districts"
        label={t('update_address:city_province')}
        placeholder={t('update_address:city_province')}
        require
      />
      <ControlledInput
        control={control}
        name="province"
        label={t('update_address:district')}
        placeholder={t('update_address:district_placeholder')}
        require
      />
      <ControlledInput
        control={control}
        name="wards"
        label={t('update_address:wards')}
        placeholder={t('update_address:wards_placeholder')}
        require
      />

      <ControlledInput
        control={control}
        name="specificAddress"
        // label={'Địa chỉ cụ thể'}
        label={t('update_address:address_detail')}
        placeholder={t('update_address:address_detail')}
        require
        // numberOfLines={40}
        multiline
        style={{
          height: 80,
        }}
      />

      <Block direction="row" alignItems="center" marginTop={15}>
        <Checkbox onToggle={setIsDefault} value={isDefault} />
        <Text style={{ paddingLeft: 10, color: color.Neutrals07 }}>
          {t('update_address:set_as_default')}
        </Text>
      </Block>

      <Block paddingHorizontal={16} paddingBottom={10} marginTop={20}>
        <PrimaryButton
          onPress={handleSubmit(onSubmit)}
          text={
            itemEdit
              ? t('update_address:edit_address')
              : t('update_address:add_address')
          }
          loading={isPending || isLoading}
        />
      </Block>
    </Block>
  );
};

const styleSheet = createStyleSheet(() => ({}));

export default FormAdd;
