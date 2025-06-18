import { ICartItem } from '../services/service-order/order.api';
import { create } from 'zustand';

export interface ProductData {
  // Basic product information
  name: string;
  productCode: string;
  color: string;

  // Quantity information
  quantity: {
    label: string;
    value: number;
  };

  // Price information
  price: {
    currentPrice: {
      value: number;
      currency: string;
      formattedPrice: string;
    };
    originalPrice: {
      value: number;
      currency: string;
      formattedPrice: string;
      strikethrough: boolean;
    };
    alternativeCurrency: {
      value: number;
      currency: string;
      formattedPrice: string;
    };
    discount: {
      percentage: number;
      amountSaved: number;
    };
  };

  // Product image URL
  imageUrl: string;

  // Additional metadata
  metadata: {
    category: string;
    subcategory: string;
    style: string;
    pattern: string;
  };
}

interface ShopingCartTypeStore {
  productChose: ICartItem[]
  setProductsChose: (productChose: ICartItem[]) => void;

  products: ICartItem[];
  setProducts: (product: ICartItem[]) => void;
}

// Create the store
const useShopingCartStore = create<ShopingCartTypeStore>(set => ({
  products: [],
  setProducts: products => set({ products }),

  productChose: [],
  setProductsChose: productChose => set({ productChose }),
}));

// Export the store
export { useShopingCartStore };
