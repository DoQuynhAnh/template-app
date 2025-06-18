import { getItem, removeItem, setItem } from '../storage';

export const TOKEN = 'token';

export type TokenType = {
  access: string;
  refresh: string;
};

export const STATUS_LOGIN = 'STATUS_LOGIN';

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);
export const setStatusSign = (value: boolean) =>
  setItem<boolean>(STATUS_LOGIN, value);
export const getStatusSign = () => getItem<boolean>(STATUS_LOGIN);
