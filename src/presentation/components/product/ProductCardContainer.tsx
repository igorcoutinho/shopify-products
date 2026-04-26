import { useCallback, useState } from 'react'
import { PLAIN_TEE_PRODUCT_ID } from '../../../config/productId'
import { messages } from '../../../content/messages'
import type { ProductVariantId } from '../../../domain/entities/product'
import type { ProductRepository } from '../../../domain/repositories/productRepository'
import { useProductQuery } from '../../hooks/useProductQuery'
import { ProductCardView } from './ProductCardView.tsx'
import { ProductErrorState } from './ProductErrorState.tsx'
import { ProductCardSkeleton } from './ProductCardSkeleton.tsx'
import { productCardStyles as styles } from './ProductCard.styles.ts'

type Props = { productId?: string; repository?: ProductRepository }

export function ProductCardContainer({
  productId = PLAIN_TEE_PRODUCT_ID,
  repository,
}: Props) {
  const { data, isPending, isError, error, refetch, isRefetching } = useProductQuery(
    productId,
    { repository },
  )
  const [selectedId, setSelectedId] = useState<ProductVariantId | null>(null)

  const onSelectVariant = useCallback((id: ProductVariantId) => {
    setSelectedId(id)
  }, [])

  if (isPending) {
    return <ProductCardSkeleton />
  }

  if (isError) {
    return (
      <ProductErrorState
        message={error?.message ?? messages.ui.unknownError}
        onRetry={() => void refetch()}
        retrying={isRefetching}
      />
    )
  }

  if (!data) {
    return <ProductCardSkeleton />
  }

  const resolvedId = selectedId ?? data.defaultVariantId
  const selectedVariant = data.variants.find((v) => v.id === resolvedId)
  if (!selectedVariant) {
    return (
      <ProductErrorState
        message={messages.ui.invalidVariant}
        onRetry={() => void refetch()}
        retrying={isRefetching}
      />
    )
  }

  return (
    <div className={styles.page}>
      <ProductCardView
        product={data}
        selectedVariant={selectedVariant}
        onSelectVariant={onSelectVariant}
      />
    </div>
  )
}
