import { useQuery } from '@tanstack/react-query'
import { apiInstance } from '../http-client'
import { baseQueryOptions } from '../query-client'

export function useUserQuery({ id }: { id: string }) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => {
      apiInstance({
        url: '/users/',
        method: 'GET',
      })
    },
    ...baseQueryOptions,
  })
}

export function useUserMeQuery() {
  return useQuery({
    queryKey: ['user-me'],
    queryFn: async () => {
      const response = await apiInstance({
        url: '/users/me',
        method: 'GET',
      })

      return response
    },
    ...baseQueryOptions,
  })
}
