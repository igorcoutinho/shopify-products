import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { getProduct } from '../../application/product/getProduct'
import { productQueryKeys } from '../../application/product/queryKeys'
import type { ProductRepository } from '../../domain/repositories/productRepository'
import { getDefaultProductRepository } from '../../infrastructure/repositories/mockProductRepository'

type Options = { repository?: ProductRepository }

export function useProductQuery(productId: string, options: Options = {}) {
  const repository = useMemo(
    () => options.repository ?? getDefaultProductRepository(),
    [options.repository],
  )

  return useQuery({
    queryKey: productQueryKeys.detail(productId),
    queryFn: () => getProduct(repository, productId),
  })
}
