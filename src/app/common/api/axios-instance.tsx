/* eslint-disable no-inline-comments */
import { TOKEN, TokenType } from '@/library/auth/utils';
import { getItem } from '@/library/storage';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { logout } from '../method';
import { setIsAuthDirectly } from '@/zustands/auth';
import { navigateScreen } from '@/navigation/navigation-service';
import { APP_SCREEN } from '@/navigation/screen-types';
import { toast } from '@backpackapp-io/react-native-toast';
import { t } from 'i18next';

interface ApiResponse<T = unknown> {
  errorCode: number;
  message?: string;
  data?: T;
}

export const API_URL = 'https://pet-api-dev.vfmtech.vn/v1.0/api';
const EXPO_PUBLIC_REQUEST_TIMEOUT = 7000;

// Global client instance, initialized later
let client: AxiosInstance | null = null;
const ourRequest = axios.CancelToken.source();

// Function to create default client
const createDefaultClient = (): AxiosInstance => {
  if (!client) {
    const instance = axios.create({
      baseURL: API_URL,
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
      cancelToken: ourRequest.token,
      timeout: EXPO_PUBLIC_REQUEST_TIMEOUT,
      validateStatus: (status: number) => status >= 200 && status < 400,
    });

    setupInterceptors(instance);
    client = instance;
  }
  return client;
};

// Set up interceptors for client
const setupInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(async function (request) {
    const accessToken: TokenType | null = getItem(TOKEN);
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken.access}`;
    }
    if (request.method === 'get') {
      request.params = { ...request.params };
    }
    return request;
  });

  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      // console.log(JSON.stringify(response));

      if (response.data.errorCode !== 0) {
        response.data.message !== 'Invalid or expired reset token' &&
          checkUnauthorized(response.data.errorCode);

        return Promise.reject(response.data);
      }
      return response;
    },
    (error: unknown) => Promise.reject(error),
  );
};

// Now we can update the store directly without using hooks
const checkUnauthorized = (errorCode: number) => {
  try {
    if (errorCode === 1003) {
      setIsAuthDirectly(false);
      logout();
      setTimeout(() => {
        navigateScreen(APP_SCREEN.LOGIN);
        toast.error(t('messages:token_expired'));
      }, 200);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getClient = async (): Promise<AxiosInstance> => {
  if (!client) {
    client = createDefaultClient();
  }
  return client;
};

// Initialize client initially (called from RootLayout)
export const initClient = async (): Promise<void> => {
  client = null; // Reset client
  await getClient(); // Re-initialize client
};
