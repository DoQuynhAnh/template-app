/* eslint-disable no-inline-comments */
import { getClient } from '@/common/api/axios-instance';
import { ApiResponse, QueryResponse } from '@/model/interfaces';
import { toast } from '@backpackapp-io/react-native-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ProductTrackings } from '../service-products/products.api';
import { ImageData } from '../categories/categories.api';
import { t } from 'i18next';

export enum OrderStatusEnum {
  PENDING = 'PENDING', //- Chờ xác nhận
  PREPARE = 'PREPARE', //- Đang chuẩn bị
  DELIVERED = 'DELIVERED', //- Giao hàng
  CANCEL = 'CANCEL',
}

export const mapOrderStatusEnum = {
  [OrderStatusEnum.PENDING]: 'Chờ xác nhận',
  [OrderStatusEnum.PREPARE]: 'Đang chuẩn bị',
  [OrderStatusEnum.DELIVERED]: 'Giao hàng',
  [OrderStatusEnum.CANCEL]: 'Đã huỷ',
};

export enum PaymentStatusEnum {
  PENDING_PAID = 'PENDING_PAID', //- Chờ thanh toán
  PAID = 'PAID', //- Đã thanh toán thành công
  PENDING_APPROVE = 'PENDING_APPROVE', //- Thanh toán xong chờ xác nhận
}

interface PlayloadCartsUpdate {
  skuId: string;
  quantity: number;
}

export interface ICartItemResponsePost {
  _id: string;
  skuId: string;
  clientId: string;
  isOrdered: boolean;
  __v: number;
  createdAt: number;
  isDeleted: boolean;
  quantity: number;
  updatedAt: number;
}

/**
 * Interface cho sản phẩm
 */
interface ProductInCart {
  _id: string;
  createdAt: number;
  isDeleted: boolean;
  name: string;
  slug: string;
  categoryId: string;
  productImages: ImageData[];
  trackings: ProductTrackings;
  updatedAt: number;
  __v: number;
}

/**
 * Interface cho biến thể sản phẩm (SKU)
 */
interface ProductSku {
  _id: string;
  createdAt: number;
  isDeleted: boolean;
  sku: string;
  description: string;
  productId: string;
  categoryId: string;
  quantity: number;
  priceSell: number;
  priceBuy: number;
  skuImages: string[];
  updatedAt: number;
  __v: number;
  product?: ProductInCart;
}

export interface ICartItem {
  _id: string;
  skuId: string;
  clientId: string;
  isOrdered: boolean;
  __v: number;
  createdAt: number;
  isDeleted: boolean;
  quantity: number;
  updatedAt: number;
  sku?: ProductSku;
  orderCode?: string;
  price?: number;
  promotion?: number;
}

export interface IQuickBuy {
  isDeleted: boolean;
  clientId: string;
  orderCode: string;
  totalPrice: number;
  VAT: number;
  deliverFee: number;
  addressId: string;
  orderStatus: OrderStatusEnum;
  paymentStatus: PaymentStatusEnum;
  _id: string;
  createdAt: number;
}

export interface Address {
  _id: string;
  isDeleted: boolean;
  clientId: string;
  name: string;
  address: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  isDefault: boolean;
  createdAt: number;
  updatedAt: number;
  __v: number;
}

export interface OrderItem {
  _id: string;
  isDeleted: boolean;
  clientId: string;
  orderCode: string;
  skuId: string;
  cartId: string;
  quantity: number;
  price: number;
  promotion: number;
  createdAt: number;
  updatedAt: number;
  sku: {
    _id: string;
    createdAt: number;
    isDeleted: false;
    sku: string;
    description: string;
    productId: string;
    categoryId: string;
    quantity: number;
    priceSell: number;
    priceBuy: number;
    skuImages: [];
    product: {
      _id: string;
      createdAt: number;
      isDeleted: false;
      name: string;
      slug: string;
      categoryId: string;
      productImages: [
        {
          _id: string;
          publicUrl: string;
          size: number;
          mimetype: string;
          uploader: string;
          tag: string;
          bucketName: string;
          filename: string;
          originalname: string;
          state: string;
          createdAt: string;
          updatedAt: string;
        },
      ];
      trackings: {
        _commentCount: number;
        _rating_01_count: number;
        _rating_02_count: number;
        _rating_03_count: number;
        _rating_04_count: number;
        _rating_05_count: number;
        _interactive: number;
        _favoriteCount: number;
      };
    };
  };
}

export interface IOrder {
  _id: string;
  isDeleted: boolean;
  clientId: string;
  orderCode: string;
  totalPrice: number;
  VAT: number;
  deliverFee: number;
  addressId: string;
  orderStatus: string;
  paymentStatus: string;
  createdAt: number;
  updatedAt: number;
  __v: number;
  address: Address;
  orderItems: OrderItem[];
}

// POST Thêm vào giỏ hàng
export const cartsUpdate = () => {
  const mutationFn = async (data: PlayloadCartsUpdate) => {
    const client = await getClient();

    const { data: response } = await client.post<
      ApiResponse<ICartItemResponsePost>
    >('/carts/update', data);
    return response;
  };
  return useMutation({
    mutationKey: ['cartsUpdate'],
    mutationFn,
    onError: error => {
      toast.error(error.message ?? '');
    },
    onSuccess: () => {
      toast.success(t('product:added_to_cart_successfully'));
    },
  });
};

// Xoá sản phẩm trong cart
export const cartsRemove = () => {
  const mutationFn = async (data: { id: string }) => {
    const client = await getClient();

    const { data: response } = await client.delete<ApiResponse<any>>(
      '/carts/remove',
      { data },
    );
    return response;
  };
  return useMutation({
    mutationKey: ['cartsRemove'],
    mutationFn,
    onError: error => {
      toast.error(error.message ?? '');
    },
    onSuccess: () => {
      toast.success(t('messages:delete_success'));
    },
  });
};

// Xoá nhiều sản phẩm trong cart
export const cartsRemoveAll = () => {
  const mutationFn = async ({ ids }: { ids: string[] }) => {
    const client = await getClient();

    const { data: response } = await client.delete<ApiResponse<any>>(
      '/carts/remove-multiple',
      { data: { ids } },
    );
    return response;
  };
  return useMutation({
    mutationKey: ['cartsRemoveAll'],
    mutationFn,
    onError: error => {
      toast.error(error.message ?? '');
    },
    onSuccess: () => {
      toast.success(t('messages:delete_all_success'));
    },
  });
};

const fetchCarts = async () => {
  const client = await getClient();

  const { data: response } = await client.get<QueryResponse<ICartItem>>(
    '/carts',
  );
  return response.data;
};
export const getCarts = () => {
  return useQuery({
    queryKey: ['getNews'],
    queryFn: fetchCarts,
    retry: 0,
  });
};

export const getOrderDetail = (id: string) => {
  const fetchApi = async () => {
    const client = await getClient();

    const { data: response } = await client.get<ApiResponse<IOrder>>(
      `/orders/${id}`,
    );
    return response.data;
  };
  return useQuery({
    queryKey: ['getOrderDetail'],
    queryFn: fetchApi,
    retry: 0,
  });
};

// Danh Sách Đơn Hàng
export const getOrders = (orderStatus?: OrderStatusEnum) => {
  const fetchApi = async () => {
    const client = await getClient();

    const { data: response } = await client.get<QueryResponse<IOrder>>(
      `/orders?${orderStatus ? 'orderStatus[eq]=' + orderStatus : ''}`,
    );
    return response.data;
  };
  return useQuery({
    queryKey: ['getOrders'],
    queryFn: fetchApi,
    retry: 0,
  });
};

// Quick Buy
export const useQuickBuy = () => {
  const mutationFn = async (data: {
    skuId: string;
    quantity: number;
    addressId: string;
  }) => {
    const client = await getClient();

    const { data: response } = await client.post<ApiResponse<IQuickBuy>>(
      '/quick-buy',
      data,
    );
    return response;
  };

  return useMutation({
    mutationFn,
    mutationKey: ['useQuickBuy'],
  });
};

//Tạo Đơn Hàng
export const useCreateOrders = () => {
  const mutationFn = async (data: {
    orderItems: { cartId: string }[];
    addressId: string;
  }) => {
    const client = await getClient();

    const { data: response } = await client.post<ApiResponse<IQuickBuy>>(
      '/orders',
      data,
    );
    return response;
  };

  return useMutation({
    mutationFn,
    mutationKey: ['useCreateOrders'],
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra');
    },
    onSuccess: () => {
      toast.success(t('messages:create_order_success'));
    },
  });
};
