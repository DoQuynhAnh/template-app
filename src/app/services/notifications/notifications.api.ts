import { getClient } from '@/common/api/axios-instance';
import { ApiResponse, QueryResponse } from '@/model/interfaces';
import { toast } from '@backpackapp-io/react-native-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { t } from 'i18next';

interface NotificationMetadata {
  bookingId?: string;
  flightNumber?: string;
  departureTime?: string;
  type?: string;
  [key: string]: any;
}

/**
 * Interface cho thông báo
 */
export interface INotification {
  _id: string;
  createdAt: number;
  isDeleted: boolean;
  title: string;
  body: string;
  recipient: string;
  isRead: boolean;
  type: string;
  metadata: NotificationMetadata;
  updatedAt: number;
  __v: number;
}

const fetchNotications = async () => {
  const client = await getClient();

  const { data: response } = await client.get<QueryResponse<INotification>>(
    '/notifications',
  );
  return response.data;
};
export const getNotications = () => {
  return useQuery({
    queryKey: ['fetchNotications'],
    queryFn: fetchNotications,
    retry: 0
  });
};

const fetchNoticationsCount = async () => {
  const client = await getClient();

  const { data: response } = await client.get<
    ApiResponse<{ unreadCount: number }>
  >('/notifications/unread-count');
  return response.data;
};
export const getNoticationsCount = () => {
  return useQuery({
    queryKey: ['fetchNoticationsCount'],
    queryFn: fetchNoticationsCount,
    retry: 0
  });
};

// đọc 1 thông báo
const fetchReadNotication = async (id: string) => {
  const client = await getClient();

  const { data: response } = await client.post<ApiResponse<INotification>>(
    `/notifications/${id}/mark-as-read`,
  );
  return response.data;
};
export const postReadNotication = () => {
  return useMutation({
    mutationKey: ['fetchReadNotication'],
    mutationFn: fetchReadNotication,
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra');
    },
  });
};

// đọc tất cả thông báo
const fetchReadAllNotication = async () => {
  const client = await getClient();

  const { data: response } = await client.post<ApiResponse<INotification>>(
    '/notifications/mark-all-as-read',
  );
  return response.data;
};
export const postReadAllNotication = () => {
  return useMutation({
    mutationKey: ['postReadAllNotication'],
    mutationFn: fetchReadAllNotication,
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra');
    },
    onSuccess: () => {
      toast.success(t('messages:read_all_notifications'));
    },
  });
};
