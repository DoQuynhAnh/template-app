// export {};

import { GoogleSignin } from '@react-native-google-signin/google-signin';

const init = () => {
  GoogleSignin.configure({
    webClientId: '412162967986-eqmbm8e8gbf57ovlrdimguh363k58elv.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });
};
type LoginResult = { success: boolean; token?: string };
const login = async (): Promise<LoginResult> => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    const userToken = await GoogleSignin.getTokens();
    return { success: true, token: userToken.accessToken };
  } catch (err) {
    console.log('GOOGLE-LOGIN-ERROR', err);
    return { success: false };
  }
};

const logout = async () => {
  try {
    await GoogleSignin.signOut();
    return true;
  } catch (err) {
    console.log('GOOGLE-LOGOUT-ERROR', err);
  }
};

export const GoogleService = {
  init,
  login,
  logout,
};
