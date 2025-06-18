import { TagComment } from '@/model/app';
import { Platform } from 'react-native';

export const MMKV_KEY = {
  APP_TOKEN: 'APP_TOKEN',
} as const;

export const API_CONFIG = {
  CODE_DEFAULT: -200,
  CODE_SUCCESS: 200,
  CODE_TIME_OUT: 408,
  ERROR_NETWORK_CODE: -100,
  RESULT_CODE_PUSH_OUT: 401,
  STATUS_TIME_OUT: 'ECONNABORTED',
  TIME_OUT: 10 * 1000,
};

export const SLICE_NAME = {
  APP: 'APP_',
  AUTHENTICATION: 'AUTHENTICATION_',
};

export const isIos = Platform.OS === 'ios';

export const CURRENCY = 'đ';

export const GENDER = {
  MAN: 'MALE',
  OTHER: 'OTHER',
  WOMAN: 'FEMALE',
} as const;
export type Gender = (typeof GENDER)[keyof typeof GENDER];

export const DATA_TAGS: Array<TagComment> = [
  { id: 1, content: 'Chất lượng sản phẩm tuyệt vời' },
  { id: 2, content: 'Đóng gói sản phẩm đẹp và chắc chắn' },
  { id: 3, content: 'Thời gian giao hàng rất nhanh' },
  { id: 4, content: 'Rất đáng tiền' },
  { id: 5, content: 'Shop phục vụ tốt' },
];