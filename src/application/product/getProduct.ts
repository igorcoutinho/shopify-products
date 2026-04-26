import type { Product } from '../../domain/entities/product'
import type { ProductRepository } from '../../domain/repositories/productRepository'

export async function getProduct(
  repository: ProductRepository,
  productId: string,
): Promise<Product> {
  return repository.getById(productId)
}
