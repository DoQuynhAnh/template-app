/* eslint-disable sortKeysFix/sort-keys-fix */
import { IAddress } from '../services/service-auth/login.api';
import { create } from 'zustand';

export enum TypeScreenEmun {
  ADDRESS_ORDER = 'address-order',
  ADDRESS_ACCOUNT = 'address-account',
}

export enum TypeFormEmun {
  UPDATE = 'update',
  CREATE = 'create',
}

interface SelectAddressStoreType {
  addressSelect: string;
  setAddressSelect: (addressSelect: string) => void;

  address: IAddress[];
  setAddress: (address: IAddress[]) => void;

  typeScreen: TypeScreenEmun;
  setTypeScreen: (typeScreen: TypeScreenEmun) => void;

  typeForm: TypeFormEmun;
  setTypeForm: (typeScreen: TypeFormEmun) => void;

  itemEdit: IAddress | undefined;
  setItemEdit: (itemEdit: IAddress | undefined) => void;
}

// Create the store
const useSelectAddressStore = create<SelectAddressStoreType>(set => ({
  addressSelect: '',
  setAddressSelect: addressSelect => set({ addressSelect }),

  address: [],
  setAddress: address => set({ address }),

  typeScreen: TypeScreenEmun.ADDRESS_ACCOUNT,
  setTypeScreen: typeScreen => set({ typeScreen }),

  typeForm: TypeFormEmun.CREATE,
  setTypeForm: typeForm => set({ typeForm }),

  itemEdit: undefined,
  setItemEdit: itemEdit => set({ itemEdit }),
}));

// Export the store
export { useSelectAddressStore };
