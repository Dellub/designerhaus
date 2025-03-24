import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { deleteCookie } from 'cookies-next'
import { redirect } from 'next/navigation'
import { apiHttpClient, apiInstance } from '../http-client'
import { baseQueryOptions } from '../query-client'

interface UserLoginResponse {
  accessToken?: string
}

export function useLoginMutation() {
  return useMutation({
    mutationKey: ['user-login'],
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    mutationFn: async (payload: any) => {
      console.log(payload)

      const result = await apiInstance<UserLoginResponse>({
        url: '/users/auth/login',
        method: 'POST',
        data: payload,
      })

      console.log(result)

      apiHttpClient.defaults.headers.common.Authorization = `Bearer ${result.accessToken}`

      return result
    },
    ...baseQueryOptions,
  })
}

export function useCreateUserMutation() {
  return useMutation({
    mutationKey: ['create-user'],
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    mutationFn: async (payload: any) => {
      await apiInstance({
        url: '/users/auth/register',
        method: 'POST',
        data: payload,
      })
    },
    ...baseQueryOptions,
  })
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationKey: ['user-forgot-password'],
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    mutationFn: async (payload: any) => {
      console.log(payload)

      const result = await apiInstance({
        url: '/users/auth/forgot-password',
        method: 'POST',
        data: payload,
      })

      console.log(result)

      return result
    },
    ...baseQueryOptions,
  })
}

export function useValidateCodeMutation() {
  return useMutation({
    mutationKey: ['user-validate-code'],
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    mutationFn: async (payload: any) => {
      console.log(payload)

      const result = await apiInstance({
        url: '/users/auth/validate-code',
        method: 'POST',
        data: payload,
      })

      console.log(result)

      return result
    },
    ...baseQueryOptions,
  })
}

export function useNewPasswordMutation() {
  return useMutation({
    mutationKey: ['user-new-password'],
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    mutationFn: async (payload: any) => {
      console.log(payload)

      const result = await apiInstance({
        url: '/users/auth/new-password',
        method: 'POST',
        data: payload,
      })

      console.log(result)

      return result
    },
    ...baseQueryOptions,
  })
}

export function useLogoutUserMutation() {
  return useMutation({
    mutationKey: ['logout-user'],
    mutationFn: async () => {
      deleteCookie('designerHaus:accessToken')

      redirect('/auth/login')
    },
    ...baseQueryOptions,
  })
}
