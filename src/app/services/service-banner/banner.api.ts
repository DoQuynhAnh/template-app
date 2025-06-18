import { getClient } from '@/common/api/axios-instance';
import { ApiResponse } from '@/model/interfaces';
import { useQuery } from '@tanstack/react-query';

export interface IBannersPosition {
  _id: string;
  createdAt: number;
  isDeleted: false;
  title: string;
  description: string;
  image: string;
  linkUrl: string;
  position: string;
  order: number;
  isActive: true;
  startDate: number;
  endDate: number;
}

export const useGetBannersPosition = () => {
  const queryFn = async () => {
    const client = await getClient();

    const { data: response } = await client.get<
      ApiResponse<IBannersPosition[]>
    >('banners/position/HOME_TOP');
    return response.data;
  };

  return useQuery({
    queryKey: ['useGetProductFavorites'],
    queryFn,
  });
};
