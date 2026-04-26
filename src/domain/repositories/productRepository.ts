import type { Product } from '../entities/product'

export interface ProductRepository {
  getById(id: string): Promise<Product>
}
