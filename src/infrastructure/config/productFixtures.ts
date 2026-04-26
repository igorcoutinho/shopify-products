import type { Product } from '../../domain/entities/product'
import { PLAIN_TEE_PRODUCT_ID } from '../../config/productId'

export const PLAIN_TEE_PRODUCT: Product = {
  id: PLAIN_TEE_PRODUCT_ID,
  brand: 'Good Brand Company',
  title: 'Plain T-shirt',
  isOnSale: true,
  compareAtPrice: 29.5,
  price: 20.0,
  currency: 'USD',
  defaultVariantId: 'orange',
  variants: [
    {
      id: 'orange',
      label: 'Orange',
      swatchColor: '#E85D04',
      imagePrimary: '/products/orange.png',
      imageSecondary: '/products/orange-secondary.png',
    },
    {
      id: 'green',
      label: 'Dark Green',
      swatchColor: '#2D5016',
      imagePrimary: '/products/green.png',
      imageSecondary: '/products/green-secondary.png',
    },
    {
      id: 'blue',
      label: 'Blue',
      swatchColor: '#2563EB',
      imagePrimary: '/products/blue.png',
      imageSecondary: '/products/blue-secondary.png',
    },
    {
      id: 'yellow',
      label: 'Yellow',
      swatchColor: '#EAB308',
      imagePrimary: '/products/yellow.png',
      imageSecondary: '/products/yellow-secondary.png',
    },
    {
      id: 'pink',
      label: 'Light Pink',
      swatchColor: '#F9A8D4',
      imagePrimary: '/products/pink.png',
      imageSecondary: '/products/pink-secondary.png',
    },
    {
      id: 'navy',
      label: 'Dark Navy',
      swatchColor: '#1E3A5F',
      imagePrimary: '/products/navy.png',
      imageSecondary: '/products/navy-secondary.png',
    },
  ],
}
