import { messages } from '../../content/messages'
import type { Product } from '../../domain/entities/product'
import type { ProductRepository } from '../../domain/repositories/productRepository'
import { PLAIN_TEE_PRODUCT } from '../config/productFixtures'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

function getSimulateErrorFromLocation(): boolean {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('simulateError') === '1'
}

export function createMockProductRepository(
  options: { minDelayMs?: number; maxDelayMs?: number } = {},
): ProductRepository {
  const min = options.minDelayMs ?? 400
  const max = options.maxDelayMs ?? 1000

  return {
    async getById(id: string): Promise<Product> {
      const wait = min + Math.random() * (max - min)
      await delay(wait)
      if (getSimulateErrorFromLocation() || id === 'error') {
        throw new Error(messages.errors.productLoad)
      }
      if (id !== PLAIN_TEE_PRODUCT.id) {
        throw new Error(messages.errors.productNotFound)
      }
      return { ...PLAIN_TEE_PRODUCT, variants: [...PLAIN_TEE_PRODUCT.variants] }
    },
  }
}

let singleton: ProductRepository | null = null

export function getDefaultProductRepository(): ProductRepository {
  if (!singleton) {
    singleton = createMockProductRepository()
  }
  return singleton
}
