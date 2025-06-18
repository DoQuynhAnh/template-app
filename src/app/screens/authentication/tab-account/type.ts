import { UserInfo } from '@/model/user';
import { ImageTypes } from '@assets/image';

export type ItemNavigateProps = {
  leftIcon: React.ReactNode;
  title: I18nKeys;
  onPress?: () => void;
  description?: I18nKeys;
  descriptionOption?: any;
};
export type ButtonOrderManageProps = {
  text: I18nKeys;
  badged?: number;
  onPress?: () => void;
  icon: React.ReactNode;
};
export type StatisticButtonProps = {
  text: I18nKeys;
  onPress?: () => void;
  subText: I18nKeys;
  icon: React.ReactNode;
  subTextOptions: any;
};

export type AccountInformationGroupProps = {
  profile?: UserInfo;
};

export type LanguageButtonProps = {
  language: I18nKeys;
  flag: ImageTypes;
  onPress?: () => void;
};

export type PopupSelectLanguageRef = {
  show: () => void;
};
