import { getClient } from '@/common/api/axios-instance';
import { Gender } from '@/common/constant';
import { ApiResponse } from '@/model/interfaces';
import { toast } from '@backpackapp-io/react-native-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { t } from 'i18next';

export const CLIENT_LOCAL = 'CLIENT_LOCAL';
export interface UserRegisterBody {
  email: string;
  phone: string;
  password: string;
  fullname: string;
}

export interface UserLoginBodyOAuth {
  provider: 'GOOGLE' | 'FACEBOOK';
  token: string;
  deviceToken: string;
}

export interface UserLoginBody {
  username: string;
  password: string;
}
export interface PayloadUpdateProfile {
  fullname: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
}

/**
 * Client user information
 */
export interface IClient {
  _id: string;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  email: string;
  phone: string;
  fullname: string;
  dob?: string;
  gender?: Gender;
  providerType: 'REGISTER' | 'GOOGLE' | 'FACEBOOK' | 'APPLE';
  __v: number;
}

/**
 * Authentication payload containing tokens
 */
export interface IAuthPayload {
  type: 'Bearer';
  accessToken: string;
  // You might also have refreshToken in some APIs
}

export interface IRegisterResponse {
  isDeleted: boolean;
  email: string;
  phone: string;
  password: string;
  fullname: string;
  providerType: string;
  _id: string;
}
/**
 * Complete authentication response
 */
export interface IAuthResponse {
  client: IClient;
  payload: IAuthPayload;
}

export interface IAddress {
  _id: string;
  createdAt?: number;
  isDeleted?: boolean;
  clientId?: string;
  name: string;
  address: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  isDefault: boolean;
}

export interface IAddressForm {
  name: string;
  phone: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  isDefault: boolean;
}

// Đăng kí
export const userRegister = () => {
  const mutationFn = async (data: UserRegisterBody) => {
    const client = await getClient();

    const { data: response } = await client.post<
      ApiResponse<IRegisterResponse>
    >('/auth/client/register', data);
    return response.data;
  };
  // Is a hook that is used to mutate data on the server
  return useMutation({
    mutationKey: ['user-register'],
    mutationFn,
    onError: error => {
      toast.error(error.message ?? '');
    },
  });
};

// User login mutation
export const userLogin = () => {
  const mutationFn = async (data: UserLoginBody) => {
    const client = await getClient();

    const { data: response } = await client.post<ApiResponse<IAuthResponse>>(
      '/auth/client/login',
      data,
    );
    return response.data;
  };
  return useMutation({
    mutationKey: ['user-login'],
    mutationFn,
    onError: error => {
      toast.error(error.message ?? '');
    },
  });
};

// Đăng nhập qua OAuth
export const userLoginOAuth = () => {
  const mutationFn = async (data: {
    provider: 'GOOGLE' | 'FACEBOOK';
    token: string;
    deviceToken: string;
  }) => {
    const client = await getClient();

    const { data: response } = await client.post<ApiResponse<IAuthResponse>>(
      '/auth/client/oauth',
      data,
    );
    return response.data;
  };

  return useMutation({
    mutationKey: ['user-login'],
    mutationFn,
    onError: error => {
      toast.error(error.message ?? '');
    },
  });
};

// Cập Nhật Hồ Sơ Khách Hàng
export const userUpdateProfile = () => {
  const mutationFn = async (data: PayloadUpdateProfile) => {
    const client = await getClient();

    const { data: response } = await client.put<ApiResponse<IClient>>(
      '/auth/client/profile',
      data,
    );
    return response.data;
  };

  return useMutation({
    mutationKey: ['userUpdateProfile'],
    mutationFn,
    onError: error => {
      toast.error(error.message ?? '');
    },
    onSuccess: () => {
      toast.success('Cập nhật thông tin thành công');
    },
  });
};

// Danh Sách Địa Chỉ Giao Hàng
export const userGetShippingAddresses = () => {
  const queryFn = async () => {
    const client = await getClient();

    const { data: response } = await client.get<ApiResponse<IAddress[]>>(
      '/shipping-addresses',
    );
    return response.data.filter(e => !e.isDeleted);
  };

  return useQuery({
    queryKey: ['userGetShippingAddresses'],
    queryFn,
  });
};

// Tạo Địa Chỉ Giao Hàng
export const userAddShippingAddresses = () => {
  const mutationFn = async (data: IAddressForm) => {
    const client = await getClient();

    const { data: response } = await client.post<ApiResponse<IAddress>>(
      '/shipping-addresses',
      data,
    );
    return response.data;
  };

  return useMutation({
    mutationKey: ['userAddShippingAddresses'],
    mutationFn,
    onError: error => {
      toast.error(error.message ?? '');
    },
    // onSuccess: () => {
    //   toast.success('Tạo địa chỉ thành công');
    // },
  });
};

// Cập Nhật Địa Chỉ Giao Hàng
export const userUpdateShippingAddresses = () => {
  const mutationFn = async ({
    data,
    shippingAddressId,
  }: {
    data: IAddressForm;
    shippingAddressId: string;
  }) => {
    const client = await getClient();

    const { data: response } = await client.put<ApiResponse<IAddress>>(
      `/shipping-addresses/${shippingAddressId}`,
      data,
    );
    return response.data;
  };

  return useMutation({
    mutationKey: ['userUpdateShippingAddresses'],
    mutationFn,
    onError: error => {
      toast.error(error.message ?? '');
    },
    // onSuccess: () => {
    //   toast.success('Tạo địa chỉ thành công');
    // },
  });
};

// Xóa Địa Chỉ Giao Hàng
export const userDeleteShippingAddresses = () => {
  const mutationFn = async ({
    shippingAddressId,
  }: {
    shippingAddressId: string;
  }) => {
    const client = await getClient();

    const { data: response } = await client.delete<ApiResponse<IAddress>>(
      `/shipping-addresses/${shippingAddressId}`,
    );
    return response.data;
  };

  return useMutation({
    mutationKey: ['userDeleteShippingAddresses'],
    mutationFn,
    onError: error => {
      toast.error(error.message ?? '');
    },
    onSuccess: () => {
      toast.success(t('messages:delete_address_success'));
    },
  });
};

// Quên mật khẩu (b1)
export const userForgotPassword = () => {
  const mutationFn = async (data: { email: string }) => {
    const client = await getClient();

    const { data: response } = await client.post<
      ApiResponse<{
        message: string;
        resetToken: string;
      }>
    >('/auth/client/forgot-password', data);
    return response.data;
  };

  return useMutation({
    mutationKey: ['userForgotPassword'],
    mutationFn,
    onError: error => {
      toast.error(error.message ?? '');
    },
  });
};

// Quên mật khẩu (b2)
export const userResetPassword = () => {
  const mutationFn = async (data: { token: string; password: string }) => {
    const client = await getClient();

    const { data: response } = await client.post<
      ApiResponse<{
        message: string;
      }>
    >('/auth/client/reset-password', data);
    return response;
  };

  return useMutation({
    mutationKey: ['userResetPassword'],
    mutationFn,
    onError: error => {
      toast.error(error.message ?? '');
    },
  });
};

export const userChangePassword = () => {
  const mutationFn = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const client = await getClient();

    const { data: response } = await client.post<
      ApiResponse<{
        message: string;
      }>
    >('/auth/client/change-password', data);
    return response;
  };

  return useMutation({
    mutationKey: ['userChangePassword'],
    mutationFn,
    onError: error => {
      toast.error(error.message ?? '');
    },
    onSuccess: () => {
      toast.success(t('messages:password_changed_successfully'));
    },
  });
};
