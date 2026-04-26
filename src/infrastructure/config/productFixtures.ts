import type { Product } from '../../domain/entities/product'
import { PLAIN_TEE_PRODUCT_ID } from '../../config/productId'

const asset = (fileName: string) => `${import.meta.env.BASE_URL}products/${fileName}`

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
      imagePrimary: asset('orange.png'),
      imageSecondary: asset('orange-secondary.png'),
    },
    {
      id: 'green',
      label: 'Dark Green',
      swatchColor: '#2D5016',
      imagePrimary: asset('green.png'),
      imageSecondary: asset('green-secondary.png'),
    },
    {
      id: 'blue',
      label: 'Blue',
      swatchColor: '#2563EB',
      imagePrimary: asset('blue.png'),
      imageSecondary: asset('blue-secondary.png'),
    },
    {
      id: 'yellow',
      label: 'Yellow',
      swatchColor: '#EAB308',
      imagePrimary: asset('yellow.png'),
      imageSecondary: asset('yellow-secondary.png'),
    },
    {
      id: 'pink',
      label: 'Light Pink',
      swatchColor: '#F9A8D4',
      imagePrimary: asset('pink.png'),
      imageSecondary: asset('pink-secondary.png'),
    },
    {
      id: 'navy',
      label: 'Dark Navy',
      swatchColor: '#1E3A5F',
      imagePrimary: asset('navy.png'),
      imageSecondary: asset('navy-secondary.png'),
    },
  ],
}
