import { UserInfo } from '@/model/user';
import { create } from 'zustand';

export const userInfoSample: UserInfo = {
  _id: '65f7a8d9b324e5c1b8f0a3e7',
  email: 'nguyenvan@example.com',
  phone: '0901234567',
  fullname: '',
  isDeleted: false,
  providerType: 'REGISTER',

};

interface ProfileStore {
  userInfor: UserInfo | undefined;
  setUserInfo: (userInfor: UserInfo | undefined) => void;
}

// Create the store
const useProfileStore = create<ProfileStore>(set => ({
  userInfor: undefined,
  setUserInfo: userInfor => set({ userInfor }),
}));

// Export the store
export { useProfileStore };
