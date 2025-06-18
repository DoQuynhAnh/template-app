/* eslint-disable sortKeysFix/sort-keys-fix */
import { isSignIn } from '@/library/auth';
import { Spacer } from '@/library/components/spacer';
import { APP_SCREEN } from '@/navigation/screen-types';
import {
  IAddress,
  userGetShippingAddresses,
} from '../../../../services/service-auth/login.api';
import { handleNavigate } from '@/utils';
import { TypeScreenEmun, useSelectAddressStore } from '@/zustands/address';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import _EvilIcons from 'react-native-vector-icons/EvilIcons';
const EvilIcons = _EvilIcons as unknown as React.ElementType;

export const SelectAddressSection = () => {
  const {
    theme: { color, textPresets },
  } = useStyles(styleSheet);
  const navigate = useNavigation();
  const { data, refetch } = userGetShippingAddresses();
  const isFocused = useIsFocused();
  const {
    address,
    addressSelect,
    setAddress,
    setAddressSelect,
    setTypeScreen,
  } = useSelectAddressStore();

  // func
  const handleSelectAddress = () => {
    setTypeScreen(TypeScreenEmun.ADDRESS_ORDER);
    navigate.navigate(APP_SCREEN.SELECT_ADDRESS);
  };

  const [addressDefault, setAddressDefault] = useState<IAddress | undefined>(
    undefined,
  );

  useEffect(() => {
    setAddressDefault(address.find(e => e._id === addressSelect));

    console.log({ addressSelect, address });
  }, [addressSelect, address]);

  console.log(addressDefault, 'addressDefault');

  useEffect(() => {
    if (data) {
      setAddress(data);
      setAddressSelect(data.find(e => e.isDefault)?._id ?? '');
      setAddressDefault(data.find(e => e.isDefault));
    }
  }, [data]);

  useEffect(() => {
    isFocused && refetch();
  }, [isFocused]);

  // render
  return (
    <TouchableOpacity
      onPress={() => {
        handleNavigate(handleSelectAddress, isSignIn() ? 'signIn' : 'signOut');
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
          paddingHorizontal: 15,
        }}>
        <EvilIcons name="location" size={24} color={color.primaryBase} />
        <Spacer width={12} />
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            flex: 1,
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  ...textPresets.paragraphBold,
                  color: color.Neutrals07,
                }}>
                {addressDefault?.name}
              </Text>
              <View
                style={{
                  width: 1,
                  height: 20,
                  backgroundColor: color.neutral10,
                  marginHorizontal: 8,
                }}
              />
              <Text
                style={{
                  ...textPresets.paragraphBold,
                  color: color.Neutrals07,
                }}>
                {addressDefault?.phone}
              </Text>
            </View>
            <Spacer height={8} />
            <Text
              style={{
                ...textPresets.placeholder,
                color: color.Neutrals07,
              }}>
              {addressDefault?.address}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <EvilIcons
              size={24}
              name="chevron-right"
              color={color.primaryBase}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styleSheet = createStyleSheet(() => ({}));
