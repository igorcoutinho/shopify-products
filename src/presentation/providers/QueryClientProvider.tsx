import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})

type Props = { children: ReactNode }

export function AppQueryProvider({ children }: Props) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
