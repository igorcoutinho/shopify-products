import { useState } from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { messages } from '../../../content/messages'
import { PLAIN_TEE_PRODUCT } from '../../../infrastructure/config/productFixtures'
import type { Product, ProductVariant, ProductVariantId } from '../../../domain/entities/product'
import { ProductCardView } from './ProductCardView.tsx'

function TestHarness({ product = PLAIN_TEE_PRODUCT }: { product?: Product }) {
  const [id, setId] = useState<ProductVariantId>(product.defaultVariantId)
  const selected =
    product.variants.find((v) => v.id === id) ?? product.variants[0]
  return (
    <ProductCardView
      product={product}
      selectedVariant={selected}
      onSelectVariant={setId}
    />
  )
}

const productNotOnSale: Product = {
  ...PLAIN_TEE_PRODUCT,
  isOnSale: false,
}

function StaticView({ variant }: { variant: ProductVariant }) {
  return (
    <ProductCardView
      product={productNotOnSale}
      selectedVariant={variant}
      onSelectVariant={() => {}}
    />
  )
}

describe('ProductCardView', () => {
  it('renders brand, title, sale state and prices', () => {
    render(<TestHarness />)
    expect(screen.getByText(PLAIN_TEE_PRODUCT.brand)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: PLAIN_TEE_PRODUCT.title })).toBeInTheDocument()
    expect(screen.getByText(messages.ui.saleBadge)).toBeInTheDocument()
    expect(screen.getByText(/\$20\.00/)).toBeInTheDocument()
    expect(screen.getByText(/\$29\.50/)).toBeInTheDocument()
  })

  it('does not show sale copy when the product is not on sale', () => {
    const v = productNotOnSale.variants[0] as ProductVariant
    render(<StaticView variant={v} />)
    expect(screen.queryByText(messages.ui.saleBadge)).not.toBeInTheDocument()
    expect(screen.queryByText(/\$29\.50/)).not.toBeInTheDocument()
  })

  it('updates the main image when a different color swatch is selected', async () => {
    const user = userEvent.setup()
    const { container } = render(<TestHarness />)
    const card = screen.getByRole('article', { name: PLAIN_TEE_PRODUCT.title })
    const primaryAtStart = container.querySelector(
      'img[src="/products/orange.png"]',
    ) as HTMLImageElement
    expect(primaryAtStart).toBeInTheDocument()
    await user.click(within(card).getByTitle('Dark Green'))
    const main = container.querySelector(
      'img[src="/products/green.png"]',
    ) as HTMLImageElement
    expect(main).toBeInTheDocument()
  })

  it('moves selection with arrow keys on the listbox', async () => {
    const user = userEvent.setup()
    render(<TestHarness />)
    const listbox = screen.getByRole('listbox', {
      name: messages.ui.colorSwatchGroup,
    })
    const box = within(listbox)
    listbox.focus()
    await user.keyboard('{ArrowRight}')
    expect(box.getByTitle('Orange')).toHaveAttribute('aria-selected', 'false')
    expect(box.getByTitle('Dark Green')).toHaveAttribute('aria-selected', 'true')
  })
})
