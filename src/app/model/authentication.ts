export type FormLoginType = {
  email: string;
  password: string;
};

export interface AuthenticationState {
  loading: boolean;
}

export type FormChangePasswordType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
