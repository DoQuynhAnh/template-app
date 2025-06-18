import { getClient } from '@/common/api/axios-instance';
import { ApiResponse, QueryResponse } from '@/model/interfaces';
import { useQuery } from '@tanstack/react-query';

export interface NewsArticle {
  _id: string;
  createdBy: string;
  createdAt: number;
  isDeleted: boolean;
  name: string;
  slug: string;
  thumbnailImage?: {
    bucketName: string
    createdAt: string
    filename: string
    mimetype: string
    originalname: string
    publicUrl: string
    size: number;
  };
  contentImages: string[];
  content: string;
  authorId: string;
  status: 'PUBLISHED' | 'DRAFT' | 'PENDING';
  viewCount: number;
  updatedAt: number;
  __v: number;
}

// Danh sách tin tức
const fetchNews = async () => {
  const client = await getClient();

  const { data: response } = await client.get<QueryResponse<NewsArticle>>(
    '/news',
  );
  return response.data;
};
export const getNews = () => {
  return useQuery({
    queryKey: ['getNews'],
    queryFn: fetchNews,
  });
};

// GET Chi tiết tin tức
const fetchNewItem = async (id: string) => {
  const client = await getClient();

  const { data: response } = await client.get<ApiResponse<NewsArticle>>(
    `news/${id}`,
  );
  return response.data;
};
export const getNewDetail = (id: string) => {
  return useQuery({
    queryKey: ['fetchNewItem'],
    queryFn: () => fetchNewItem(id),
    // onError: error => {
    //   toast.error(error.message ?? '');
    // },
  });
};


const fetchNewRelated = async (id: string) => {
  const client = await getClient();

  const { data: response } = await client.get<QueryResponse<NewsArticle>>(
    `news/related/${id}`,
  );
  return response.data;
};
export const getNewRelated = (id: string) => {
  return useQuery({
    queryKey: ['fetchNewRelated'],
    queryFn: () => fetchNewRelated(id),
    // onError: error => {
    //   toast.error(error.message ?? '');
    // },
  });
};
