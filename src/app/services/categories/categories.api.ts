import { getClient } from '@/common/api/axios-instance';
import { QueryResponse } from '@/model/interfaces';
import { useQuery } from '@tanstack/react-query';

export interface ImageData {
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
  __v: number;
}

// Interface định nghĩa cấu trúc của một danh mục
export interface Category {
  _id: string;
  createdBy: string;
  createdAt: number;
  isDeleted: boolean;
  name: string;
  image: ImageData | null;
  parentId: string | null;
  parents: string[];
  childrens: string[];
  updatedAt: number;
  __v: number;
  children?: Category[];
  products: IProduct[];
}

export interface CategoryWithChildren extends Category {
  children: CategoryWithChildren[];
}

// Interface cho sản phẩm
export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  categoryId?: string;
  productImages: ImageData[];
  productSkus?: IProductSkus[];
  // Thêm các trường khác nếu có
}

export interface IVariants {
  createdAt: number;
  isDeleted: false;
  name: string;
  type: string;
  updatedAt: number;
  _id: string;
  variantValue: string
  variant: {
    createdAt: number;
    isDeleted: boolean;
    name: string;
    type: string;
    _id: string;
  };
}

export interface IProductSkus {
  categoryId: string;
  createdAt: number;
  description: string;
  isDeleted: boolean;
  priceBuy: number;
  priceSell: number;
  productId: string;
  quantity: number;
  sku: string;
  variants: IVariants[];
}

const fetchCategories = async () => {
  const client = await getClient();

  const { data: response } = await client.get<QueryResponse<Category>>(
    '/categories',
  );
  return response.data;
};

// Danh sách sản phẩm theo danh mục
const fetchCategorieProducts = async (query: string) => {
  const client = await getClient();

  const { data: response } = await client.get<QueryResponse<Category>>(
    `/categories/products?${query}&limit=100`,
  );
  return response.data;
};

export const getCategories = () => {
  return useQuery({
    queryKey: ['fetchCategories'],
    queryFn: fetchCategories,
    retry: 0,
    // onError: error => {
    //   toast.error(error.message ?? '');
    // },
  });
};
// GET Sản phẩm theo danh mục
export const getCategorieProducts = (query: string) => {
  return useQuery({
    queryKey: ['getCategorieProducts'],
    queryFn: () => fetchCategorieProducts(query),
    retry: 0,
    // onError: error => {
    //   toast.error(error.message ?? '');
    // },
  });
};
