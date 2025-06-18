/* eslint-disable no-inline-comments */
/* eslint-disable sortKeysFix/sort-keys-fix */
import { ProductData } from '@/zustands/shopping-cart';

export const productData: ProductData = {
  name: '(남성)다이아몬드 패턴 퀼팅 자켓(BH670E-54N 050)차콜그레이',
  productCode: 'BH670E-54N 050',
  color: '차콜그레이',

  quantity: {
    label: 'Số lượng',
    value: 1,
  },

  price: {
    currentPrice: {
      value: 1980,
      currency: '원',
      formattedPrice: '1,980 원',
    },
    originalPrice: {
      value: 2000,
      currency: '원',
      formattedPrice: '2,000 원',
      strikethrough: true,
    },
    alternativeCurrency: {
      value: 344520,
      currency: 'VND',
      formattedPrice: '344,520 VND',
    },
    discount: {
      percentage: 1,
      amountSaved: 20,
    },
  },

  imageUrl: 'product_image.jpg',

  metadata: {
    category: "Men's Clothing",
    subcategory: 'Jackets',
    style: 'Quilted',
    pattern: 'Diamond',
  },
};

/**
 * Creates an array of cloned ProductData objects with the specified length
 * @param originalProduct - The original ProductData object to clone
 * @param count - The desired number of items in the resulting array
 * @returns An array of cloned ProductData objects
 */
export function cloneProductData(
  originalProduct: ProductData,
  count: number,
): ProductData[] {
  // Validate input parameters
  if (!originalProduct) {
    throw new Error('Original product data cannot be null or undefined');
  }

  if (count <= 0) {
    throw new Error('Count must be a positive integer');
  }

  // Initialize the result array
  const productArray: ProductData[] = [];

  // Clone the product data the specified number of times
  for (let i = 0; i < count; i++) {
    // Perform a deep clone of the original product to avoid reference issues
    const clonedProduct: ProductData = {
      name: originalProduct.name,
      productCode: `${originalProduct.productCode}-${i + 1}`, // Make product codes unique
      color: originalProduct.color,

      quantity: {
        label: originalProduct.quantity.label,
        value: originalProduct.quantity.value,
      },

      price: {
        currentPrice: {
          value: originalProduct.price.currentPrice.value,
          currency: originalProduct.price.currentPrice.currency,
          formattedPrice: originalProduct.price.currentPrice.formattedPrice,
        },
        originalPrice: {
          value: originalProduct.price.originalPrice.value,
          currency: originalProduct.price.originalPrice.currency,
          formattedPrice: originalProduct.price.originalPrice.formattedPrice,
          strikethrough: originalProduct.price.originalPrice.strikethrough,
        },
        alternativeCurrency: {
          value: originalProduct.price.alternativeCurrency.value,
          currency: originalProduct.price.alternativeCurrency.currency,
          formattedPrice:
            originalProduct.price.alternativeCurrency.formattedPrice,
        },
        discount: {
          percentage: originalProduct.price.discount.percentage,
          amountSaved: originalProduct.price.discount.amountSaved,
        },
      },

      imageUrl: originalProduct.imageUrl,

      metadata: {
        category: originalProduct.metadata.category,
        subcategory: originalProduct.metadata.subcategory,
        style: originalProduct.metadata.style,
        pattern: originalProduct.metadata.pattern,
      },
    };

    // Add the cloned product to the result array
    productArray.push(clonedProduct);
  }

  return productArray;
}
