import { getClient } from '@/common/api/axios-instance';
import { ApiResponse, QueryResponse } from '@/model/interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ImageData, IVariants } from '../categories/categories.api';

/**
 * Interface cho theo dõi thống kê sản phẩm
 */
export interface ProductTrackings {
  _commentCount: number;
  _rating_01_count: number;
  _rating_02_count: number;
  _rating_03_count: number;
  _rating_04_count: number;
  _rating_05_count: number;
  _interactive: number;
  _favoriteCount: number;
}

/**
 * Interface cho các biến thể (SKUs) của sản phẩm
 */
export interface ProductSku {
  _id: string;
  createdAt: number;
  isDeleted: boolean;
  sku: string;
  description: string;
  productId: string;
  quantity: number;
  priceSell: number;
  priceBuy: number;
  skuImages: string[];
  updatedAt: number;
  __v: number;
  variants: IVariants[];
}

/**
 * Interface cho sản phẩm
 */
export interface IProduct {
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
  productSkus: ProductSku[];
}

// GET Chi tiết
const fetchProductDetail = async (id: string) => {
  const client = await getClient();

  const { data: response } = await client.get<ApiResponse<IProduct>>(
    `products/${id}`,
  );
  return response.data;
};
export const getProductDetail = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['fetchProductDetail'],
    queryFn: () => fetchProductDetail(id),
    enabled,
  });
};

// Kiểm Tra Sản Phẩm Có Trong Yêu Thích
export const useProductFavoritesToggle = () => {
  const mutationFn = async (data: { productId: string }) => {
    const client = await getClient();

    const { data: response } = await client.post<ApiResponse<boolean>>(
      '/product-favorites/toggle',
      data,
    );
    return response.data;
  };

  return useMutation({
    mutationFn,
    mutationKey: ['useProductFavoritesToggle'],
  });
};

// Kiểm Tra Sản Phẩm Có Trong Yêu Thích
export const useProductFavoritesCheck = () => {
  const mutationFn = async (data: { productId: string }) => {
    const client = await getClient();

    const { data: response } = await client.post<ApiResponse<boolean>>(
      '/product-favorites/check',
      data,
    );
    return response.data;
  };

  return useMutation({
    mutationFn,
    mutationKey: ['useProductFavoritesCheck'],
  });
};

// Danh Sách Sản Phẩm Yêu Thích
export const useGetProductFavorites = () => {
  const queryFn = async () => {
    const client = await getClient();

    const { data: response } = await client.get<ApiResponse<IProduct[]>>(
      '/product-favorites',
    );
    return response.data;
  };

  return useQuery({
    queryKey: ['useGetProductFavorites'],
    queryFn,
  });
};

// GET Sản Phẩm Đề Xuất
const fetchRecommendProducts = async () => {
  const client = await getClient();

  const { data: response } = await client.get<QueryResponse<IProduct>>(
    'products/recommend-products?page=1&limit=20',
  );
  return response.data;
};
export const getRecommendProducts = () => {
  return useQuery({
    queryKey: ['fetchRecommendProducts'],
    queryFn: () => fetchRecommendProducts(),
  });
};

//GET Sản Phẩm Bán Chạy
const fetchBestSellerProducts = async () => {
  const client = await getClient();

  const { data: response } = await client.get<QueryResponse<IProduct>>(
    '/products/best-seller?page=1&limit=10',
  );
  return response.data;
};
export const getBestSellerProducts = () => {
  return useQuery({
    queryKey: ['fetchBestSellerProducts'],
    queryFn: () => fetchBestSellerProducts(),
  });
};

//GET Sản Phẩm Liên Quan
const fetchRelatedProducts = async (id: string) => {
  const client = await getClient();

  const { data: response } = await client.get<ApiResponse<IProduct[]>>(
    `/products/related-products/${id}`,
  );
  return response.data;
};
export const getRelatedProducts = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['fetchRelatedProducts'],
    queryFn: () => fetchRelatedProducts(id),
    enabled,
  });
};

//Search san pham

export const searchProducts = (productName: string, enabled: boolean) => {
  const fetchProducts = async (productName: string) => {
    const client = await getClient();

    const { data: response } = await client.get<QueryResponse<IProduct>>(
      `/products/search?page=1&limit=30&keyword=${productName}`,
    );
    return response.data;
  };

  return useQuery({
    queryKey: ['fetchRelatedProducts'],
    queryFn: () => fetchProducts(productName),
    enabled,
  });
};
