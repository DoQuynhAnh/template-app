/* eslint-disable no-inline-comments */
import { getClient } from '@/common/api/axios-instance';
import { ApiResponse, QueryResponse } from '@/model/interfaces';
import { IMessageCustom } from '@/screens/authentication/chat-with-us';
import { toast } from '@backpackapp-io/react-native-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IMessage, User } from 'react-native-gifted-chat';

export interface CustomDBMessage {
  _id: string;
  content: string;
  createdAt: number;
  isDeleted: boolean;
  isRead: boolean;
  receiverId: string;
  senderId: string;
  updatedAt: number;
  attachments: IUploadImage[];
  __v: number;
}

// User mapping interface to keep track of user details
export interface UserMapping {
  [userId: string]: User;
}

/**
 * Converts custom backend message format to GiftedChat IMessage format
 * This function properly formats messages for left/right alignment
 *
 * @param message The custom message from backend
 * @param currentUserId The current user's ID
 * @param userMapping Object mapping user IDs to user objects with name and avatar
 * @returns IMessage formatted for GiftedChat
 */
export const convertToGiftedChatFormat = (
  message: CustomDBMessage,
  currentUserId: string,
  userMapping: UserMapping,
): IMessageCustom => {
  // Determine if the message is from the current user
  const isCurrentUser = message.senderId === currentUserId;

  // Get the appropriate user details
  const userId = isCurrentUser ? currentUserId : message.senderId;
  const user = userMapping[userId] || {
    _id: userId,
    name: isCurrentUser ? 'You' : 'User',
    avatar: null,
  };

  return {
    _id: message?._id ?? 'bsksdkwhkw deideo' + new Date().getTime(),
    text: message.content,
    createdAt: message?.createdAt ?? new Date().getTime(),
    user: user,
    sent: true,
    received: message?.isRead ?? false,
    image:
      message?.attachments?.[0]?.type === 'IMAGE'
        ? message?.attachments?.[0]?.publicUrl
        : undefined,
    isFile: message?.attachments?.[0]?.type === 'FILE',
    file: message?.attachments?.[0] ?? undefined,
    // Add any additional properties as needed
  };
};

/**
 * Helper function to determine if a message is sent by the current user
 * This is useful for custom renderers to apply different styles
 */
export const isMessageFromCurrentUser = (
  message: IMessage,
  currentUserId: string,
): boolean => {
  return String(message.user._id) === currentUserId;
};

/**
 * Helper function to process message status for display
 * Returns an object with message status information
 */
export const getMessageStatus = (
  message: IMessage,
): {
  isSent: boolean;
  isReceived: boolean;
  statusText: string;
} => {
  const isSent = Boolean(message.sent);
  const isReceived = Boolean(message.received);

  let statusText = '';
  if (isReceived) {
    statusText = '✓✓'; // Double check for read
  } else if (isSent) {
    statusText = '✓'; // Single check for sent
  }

  return {
    isSent,
    isReceived,
    statusText,
  };
};

export interface IUploadImage {
  publicUrl: string;
  size: number;
  mimetype: string;
  uploader: string;
  tag: string;
  bucketName: string;
  filename: string;
  originalname: string;
  state: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  type: 'FILE' | 'IMAGE';
}

export const sortMessagesByDateDesc = (messages: any[]): any[] => {
  if (messages?.length !== undefined) {
    return [...messages].sort((a, b) => {
      // Sắp xếp theo thời gian tạo, từ mới nhất đến cũ nhất
      return b.createdAt - a.createdAt;
    });
  }

  return [];
};
export const groupMessagesByDate = (
  messages: IMessage[],
): Record<string, IMessage[]> => {
  const groups: Record<string, IMessage[]> = {};

  messages.forEach(message => {
    const date = new Date(message.createdAt);
    // eslint-disable-next-line prefer-destructuring
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD

    if (!groups[dateString]) {
      groups[dateString] = [];
    }

    groups[dateString].push(message);
  });

  return groups;
};

const fetchChatHistory = async () => {
  const client = await getClient();

  const { data: response } = await client.get<QueryResponse<CustomDBMessage>>(
    '/chat/history?limit=100',
  );
  return response.data;
};
export const getfetchChatHistorys = () => {
  return useQuery({
    queryKey: ['fetchChatHistory'],
    queryFn: () => fetchChatHistory(),
    retry: 0,
  });
};
// Xoá tin nhắn
const deleteChatMessages = async (id: string) => {
  const client = await getClient();

  const { data: response } = await client.delete<ApiResponse<any>>(
    `/chat/messages/${id}`,
  );
  return response;
};

export const useDeleteChatMessages = () => {
  return useMutation({
    mutationFn: deleteChatMessages,
    mutationKey: ['deleteChatMessages'],
    onError: (error: any) => {
      // Handle error here
      toast.error(
        error?.response?.data?.message ?? 'An error occurred.',
      );
    }
  });
};

// tải ảnh lên server
const uploadImage = async (payload: FormData) => {
  const client = await getClient();
  const { data } = await client.post<ApiResponse<IUploadImage>>(
    '/resources/upload/image',
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImage,
    mutationKey: ['uploadImage'],
  });
};

// tải file lên server
const uploadFile = async (payload: FormData) => {
  const client = await getClient();
  const { data } = await client.post<ApiResponse<IUploadImage>>(
    '/resources/upload/file',
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

export const useUploadFile = () => {
  return useMutation({
    mutationFn: uploadFile,
    mutationKey: ['uploadFile'],
  });
};
