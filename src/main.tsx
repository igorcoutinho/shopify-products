import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import App from './App.tsx'
import { AppQueryProvider } from './presentation/providers/QueryClientProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppQueryProvider>
      <App />
      {import.meta.env.DEV ? (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      ) : null}
    </AppQueryProvider>
  </StrictMode>,
)
