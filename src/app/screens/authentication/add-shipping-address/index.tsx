import { Screen } from '@/library/components/screen';
import Header from '@/library/components/ui/header';
import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import FormAdd from './components/form-add';
import { useSelectAddressStore } from '@/zustands/address';
import { useTranslation } from 'react-i18next';

const AddShippingAddress = () => {
  const {t} = useTranslation();
  const { styles } = useStyles(styleSheet);
  const rootRef = useRef<View>(null);

  const { typeForm } = useSelectAddressStore();

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        // scroll
        backgroundColor={'transparent'}>
        <Header
          title={
            typeForm === 'create'
              ? t('list_address:add_delivery_address')
              : t('list_address:update_delivery_address')
          }
        />
        <ScrollView>
          <FormAdd />
        </ScrollView>
      </Screen>
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
export default AddShippingAddress;
