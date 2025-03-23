import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

const controller = new AbortController()
const CancelToken = axios.CancelToken
const source = CancelToken.source()

export const apiHttpClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL_API}`,
  signal: controller.signal,
  cancelToken: source.token,
})

apiHttpClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('designerHaus:accessToken')

    config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiHttpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    toast.error((error as AxiosError<ErrorResponse>).response?.data.title || '', {
      description: (error as AxiosError<ErrorResponse>).response?.data.message || '',
    })

    if (error.status === 401) {
      deleteCookie('designerHaus:accessToken')
      redirect('/auth/login')
    }

    return Promise.reject(error)
  },
)

apiHttpClient.defaults.headers.common['Content-Type'] = 'application/json'
apiHttpClient.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export interface ErrorResponse {
  code: string
  title: string
  message: string
}

const customInstanceBuilder = <T>(
  instance: AxiosInstance,
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = axios.CancelToken.source()
  const promise = instance({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

export const apiInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) =>
  customInstanceBuilder<T>(apiHttpClient, config, options)
