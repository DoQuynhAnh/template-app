import { Block } from '@/library/components/block';
import { PrimaryButton } from '@/library/components/button/primary-button';
import { ListView } from '@/library/components/list-view';
import { Screen } from '@/library/components/screen';
import Header from '@/library/components/ui/header';
import { APP_SCREEN } from '@/navigation/screen-types';
import {
  TypeFormEmun,
  TypeScreenEmun,
  useSelectAddressStore,
} from '@/zustands/address';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ItemAddress from './components/item-address';
import { EmptyList } from './components/emty-list';
import { useTranslation } from 'react-i18next';
import { userGetShippingAddresses } from '../../../services/service-auth/login.api';
import { Loading } from '@/library/components/post-delay/loading';

const SelectAddress = () => {
  const { styles } = useStyles(styleSheet);
  const navigation = useNavigation();
  const rootRef = useRef<View>(null);
  const [t] = useTranslation();
  const { data, isFetching, refetch } = userGetShippingAddresses();

  const isFocused = useIsFocused();

  const {
    address,
    addressSelect,
    setAddress,
    setAddressSelect,
    typeScreen,
    setTypeForm,
    setItemEdit,
  } = useSelectAddressStore();

  useEffect(() => {
    if (!addressSelect) {
      setAddressSelect(address.find(e => e.isDefault)?._id ?? '');
    }
  }, [address, addressSelect]);

  useEffect(() => {
    data && setAddress(data);
  }, [data]);

  useEffect(() => {
    isFocused && refetch();
  }, [isFocused]);

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        scroll
        backgroundColor={'transparent'}>
        <Header
          title={
            typeScreen === TypeScreenEmun.ADDRESS_ORDER
              ? t('select_address:header')
              : t('list_address:header')
          }
        />

        <View style={{ height: '100%' }}>
          {address?.length === 0 ? (
            <>{isFetching ? <Loading /> : <EmptyList />}</>
          ) : (
            <ListView
              data={address}
              keyExtractor={item => item._id}
              estimatedItemSize={109}
              renderItem={({ item }) => {
                // return <Block></Block>;
                return <ItemAddress {...item} isDefault={item.isDefault} />;
              }}
            />
          )}
        </View>
      </Screen>
      <Block paddingHorizontal={16} paddingBottom={10}>
        <PrimaryButton
          onPress={() => {
            setItemEdit(undefined);
            setTypeForm(TypeFormEmun.CREATE);
            navigation.navigate(APP_SCREEN.ADD_SHIPPING_ADDRESS);
          }}
          t18n="list_address:add_new"
          // text=
        />
      </Block>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.white01,
    flex: 1,
    paddingBottom: 15,
    paddingTop: 0,
    position: 'relative',
  },
}));
export default SelectAddress;
