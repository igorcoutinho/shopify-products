import { describe, it, expect } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { messages } from '../../../content/messages'
import { PLAIN_TEE_PRODUCT_ID } from '../../../config/productId'
import { PLAIN_TEE_PRODUCT } from '../../../infrastructure/config/productFixtures'
import { createMockProductRepository } from '../../../infrastructure/repositories/mockProductRepository'
import type { ProductRepository } from '../../../domain/repositories/productRepository'
import { renderWithQueryClient } from '../../../test/test-utils'
import { ProductCardContainer } from './ProductCardContainer.tsx'

describe('ProductCardContainer', () => {
  it('load state transitions to the product card when the repository resolves', async () => {
    const repository = createMockProductRepository({
      minDelayMs: 0,
      maxDelayMs: 0,
    })
    renderWithQueryClient(
      <ProductCardContainer productId={PLAIN_TEE_PRODUCT_ID} repository={repository} />,
    )
    const heading = await screen.findByRole('heading', {
      name: PLAIN_TEE_PRODUCT.title,
    })
    expect(heading).toBeInTheDocument()
    expect(screen.getByText(PLAIN_TEE_PRODUCT.brand)).toBeInTheDocument()
  })

  it('renders the error state when the repository rejects', async () => {
    const repository: ProductRepository = {
      getById: () => Promise.reject(new Error('network down')),
    }
    renderWithQueryClient(
      <ProductCardContainer productId={PLAIN_TEE_PRODUCT_ID} repository={repository} />,
    )
    expect(
      await screen.findByText(messages.ui.errorPageTitle),
    ).toBeInTheDocument()
    expect(screen.getByText('network down')).toBeInTheDocument()
  })

  it('refetches when Retry is used after a failure', async () => {
    const user = userEvent.setup()
    let calls = 0
    const repository: ProductRepository = {
      getById: async (id) => {
        calls += 1
        if (calls < 2) {
          return Promise.reject(new Error('transient'))
        }
        if (id !== PLAIN_TEE_PRODUCT_ID) {
          return Promise.reject(new Error('not found'))
        }
        return { ...PLAIN_TEE_PRODUCT, variants: [...PLAIN_TEE_PRODUCT.variants] }
      },
    }
    renderWithQueryClient(
      <ProductCardContainer productId={PLAIN_TEE_PRODUCT_ID} repository={repository} />,
    )
    expect(
      await screen.findByText('transient'),
    ).toBeInTheDocument()
    const alert = await screen.findByRole('alert')
    await user.click(
      within(alert).getByRole('button', { name: messages.ui.retry }),
    )
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: PLAIN_TEE_PRODUCT.title }),
      ).toBeInTheDocument()
    })
  })
})
