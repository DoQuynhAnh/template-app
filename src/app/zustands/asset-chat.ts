import { IUploadImage } from '../services/service-chat/chat.api';
import { create } from 'zustand';

interface AssetChatState {
  file: IUploadImage | undefined;
  selectedImage: {
    id: string;
    url: string;
  } | null;

  setFile: (file: IUploadImage | undefined) => void;
  setSelectedImage: (
    selectedImage: {
      id: string;
      url: string;
    } | null,
  ) => void;
}

// Create the store
const useAssetChat = create<AssetChatState>(set => ({
  file: undefined,
  selectedImage: null,

  setFile: file => set({ file }),
  setSelectedImage: selectedImage => set({ selectedImage }),
}));

// Export the store
export { useAssetChat };
