import { API_URL } from '@/common/api/axios-instance';
import { lightColors } from '@/themes/colors/light';
import { toast, ToastPosition } from '@backpackapp-io/react-native-toast';

export const handleNavigate = (
  navigateFn: () => void,
  status: 'idle' | 'signOut' | 'signIn',
  onRidrect?: () => void,
) => {
  if (status === 'signIn') {
    navigateFn();
  } else {
    toast('Bạn cần đăng nhập để sử dụng tính năng này', {
      duration: 4000,
      position: ToastPosition.TOP,
      icon: '',
      styles: {
        pressable: {
          backgroundColor: lightColors.info,
        },
      },
    });
    onRidrect && onRidrect();
  }
};


export const getImageUrl = (image?: string) => {
  if (image) {
    return `${API_URL}/resources/images${image}`;
  }
  return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ_sk39M1CQ_d53Sd1G8zfWxZ9YqIm21UXYQ&s';
}

export const getFileUrl = (image?: string) => {
  if (image) {
    return `${API_URL}/resources/files${image}`;
  }
  return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ_sk39M1CQ_d53Sd1G8zfWxZ9YqIm21UXYQ&s';
}
