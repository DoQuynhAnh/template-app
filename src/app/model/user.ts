import { Gender } from '@/common/constant';

export type FormUpdateUserType = {
  email?: string;
  name: string;
  gender: string;
  birth?: string;
  phone: string;
};

export type UserInfo = {
  _id?: string;
  // createdAt: number;
  // updatedAt: number;
  isDeleted?: boolean;
  email: string;
  phone: string;
  fullname: string;
  providerType: 'REGISTER' | 'GOOGLE' | 'FACEBOOK' | 'APPLE';
  dob?: string;
  gender?: Gender;
  // __v: number;
};

export type UpdateProfileBody = {
  name: string;
  gender: Gender;
  phone: string;
};
