import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'

type Options = RenderOptions & {
  client?: QueryClient
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
}

export function renderWithQueryClient(
  ui: ReactElement,
  { client, ...options }: Options = {},
) {
  const queryClient = client ?? makeQueryClient()
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return {
    ...render(ui, { wrapper, ...options }),
    queryClient,
  }
}

export { makeQueryClient }
