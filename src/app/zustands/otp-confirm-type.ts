import { create } from 'zustand';

export enum OtpConfirmTypeEnum {
  FORGOT_PASSWORLD = 'FORGOT_PASSWORLD',
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  OTHER = 'OTHER',
}

interface OtpConfirmType {
  typeOtpConfirm: OtpConfirmTypeEnum;
  email: string;

  setTypeOtpConfirm: (typeOtpConfirm: OtpConfirmTypeEnum) => void;
  setEmail: (email: string) => void;

  resetToken: string;
  setResetToken: (resetToken: string) => void;
}

// Create the store
const useOtpConfirmType = create<OtpConfirmType>(set => ({
  setEmail: email => set({ email }),
  setResetToken: resetToken => set({ resetToken }),
  setTypeOtpConfirm: typeOtpConfirm => set({ typeOtpConfirm }),

  email: '',
  resetToken: '',
  typeOtpConfirm: OtpConfirmTypeEnum.FORGOT_PASSWORLD,
}));

// Export the store
export { useOtpConfirmType };
