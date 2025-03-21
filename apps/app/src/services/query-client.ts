import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export const baseQueryOptions = {
  staleTime: 1000 * 60,
  refetchOnWindowFocus: false,
}

export const getQueryClient = () => queryClient
