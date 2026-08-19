import { type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { queryClient } from '../../shared/api/query-client'
import { router } from '../router'

interface AppProvidersProps {
  children?: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children || <RouterProvider router={router} />}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}