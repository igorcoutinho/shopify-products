import { describe, it, expect } from 'vitest'
import { messages } from '../../content/messages'
import { PLAIN_TEE_PRODUCT_ID } from '../../config/productId'
import { getProduct } from './getProduct'
import { createMockProductRepository } from '../../infrastructure/repositories/mockProductRepository'

describe('getProduct', () => {
  it('returns product for known id', async () => {
    const repo = createMockProductRepository({ minDelayMs: 0, maxDelayMs: 0 })
    const p = await getProduct(repo, PLAIN_TEE_PRODUCT_ID)
    expect(p.id).toBe(PLAIN_TEE_PRODUCT_ID)
    expect(p.variants).toHaveLength(6)
  })

  it('rejects for unknown id', async () => {
    const repo = createMockProductRepository({ minDelayMs: 0, maxDelayMs: 0 })
    await expect(getProduct(repo, 'unknown')).rejects.toThrow(
      messages.errors.productNotFound,
    )
  })
})
