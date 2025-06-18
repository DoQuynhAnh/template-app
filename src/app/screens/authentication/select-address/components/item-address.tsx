/* eslint-disable sortKeysFix/sort-keys-fix */
import { showConfirm } from '@/library/components/popup';
import { RadioButton } from '@/library/components/radio-button';
import { Spacer } from '@/library/components/spacer';
import { APP_SCREEN } from '@/navigation/screen-types';
import {
  IAddress,
  userDeleteShippingAddresses,
} from '../../../../services/service-auth/login.api';
import {
  TypeFormEmun,
  TypeScreenEmun,
  useSelectAddressStore,
} from '@/zustands/address';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { LayoutAnimation, Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';

const ItemAddress = (props: IAddress) => {
  const { _id, isDefault, name, phone } = props;
  const {
    styles,
    theme: { color, textPresets },
  } = useStyles(styleSheet);

  const {
    addressSelect,
    setAddressSelect,
    setAddress,
    address,
    setTypeForm,
    typeScreen,
    setItemEdit,
  } = useSelectAddressStore();
  const navigation = useNavigation();
  const { mutateAsync } = userDeleteShippingAddresses();
  const { t } = useTranslation();

  const handleDeleteAddress = (id: string) => {
    showConfirm({
      title: t('select_address:title_delete_address'),
      content: t('select_address:content_delete_address'),
      rightButton: t('action:delete'),
      rightPress: async () => {
        await mutateAsync({
          shippingAddressId: id,
        });
        setAddress(address.filter(e => e._id !== id));
        if (addressSelect === id) {
          setAddressSelect('');
        }
        // listRef.current?.prepareForLayoutAnimationRender();
        // After removing the item, we can start the animation.
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      },
    });
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
          paddingHorizontal: 15,
        }}>
        {typeScreen === TypeScreenEmun.ADDRESS_ORDER && (
          <>
            <RadioButton
              onToggle={() => {
                setAddressSelect(_id);
              }}
              value={addressSelect === _id}
            />
            <Spacer width={12} />
          </>
        )}
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
                {name}
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
                {phone}
              </Text>
            </View>
            <Spacer height={8} />
            <View>
              <Text
                style={{
                  ...textPresets.label,
                  color: color.Neutrals07,
                }}>
                {props.address}
              </Text>
              <View style={{ marginTop: 8, flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(APP_SCREEN.ADD_SHIPPING_ADDRESS);
                    setTypeForm(TypeFormEmun.UPDATE);
                    setItemEdit(props);
                  }}>
                  <Text
                    style={{
                      ...textPresets.labelBold,
                      color: color.primaryBase,
                    }}>
                    {t('account_information:update')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteAddress(_id)}>
                  {!isDefault && (
                    <Text
                      style={{
                        ...textPresets.labelBold,
                        color: color.primaryBase,
                      }}>
                      {t('action:delete')}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {isDefault && (
            <View
              style={{
                alignSelf: 'flex-start',
                backgroundColor: color.secondaryGreen,
                borderRadius: 4,
                paddingVertical: 2,
                paddingHorizontal: 7,
              }}>
              <Text
                style={{
                  color: color.primaryGreen,
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                {t('select_address:default')}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styleSheet = createStyleSheet(() => ({
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    // marginTop: 16,
  },
}));

export default ItemAddress;
