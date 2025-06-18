export type ConfirmData = {
  title: string;
  content: string;
  leftButton?: string;
  rightButton?: string;
  leftPress?: () => void;
  rightPress?: () => void;
};

export type ConfirmPopupType = {
  show: (data: ConfirmData) => void;
};
