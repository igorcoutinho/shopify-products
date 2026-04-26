export type ProductVariantId =
  | 'orange'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'pink'
  | 'navy'

export interface ProductVariant {
  id: ProductVariantId
  label: string
  swatchColor: string
  imagePrimary: string
  imageSecondary: string
}

export interface Product {
  id: string
  brand: string
  title: string
  isOnSale: boolean
  compareAtPrice: number
  price: number
  currency: string
  defaultVariantId: ProductVariantId
  variants: ProductVariant[]
}
