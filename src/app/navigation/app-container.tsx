import { PopupConfirm } from '@/library/components/popup';
import { SnackBar } from '@components/snack-bar';
import { PortalHost } from '@gorhom/portal';
import { RootNavigation } from '@navigation/root-navigator';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export const AppContainer = () => {
  // render
  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      {/* {!loadingApp && ( */}
      <>
        <RootNavigation />
        <PortalHost name={'AppModal'} />
        <SnackBar />
        <PopupConfirm />
      </>
      {/* )} */}
      {/* <RXStore /> */}
    </>
  );
};
