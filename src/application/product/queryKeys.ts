export const productQueryKeys = {
  all: ['product'] as const,
  detail: (id: string) => ['product', id] as const,
}
