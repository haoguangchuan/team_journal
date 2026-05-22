import Taro from '@tarojs/taro'
import type { ApiResponse } from '@/api/types'
import { API_BASE_URL } from '@/config/env'

const BASE_URL = API_BASE_URL
const TIMEOUT = 15000
const SUCCESS_CODES = [0, 200]

type RequestMethod = keyof Taro.request.Method

export type RequestOptions = Omit<
  Taro.request.Option,
  'url' | 'method' | 'data'
>

function buildUrl (url: string, params?: Record<string, unknown>): string {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`
  if (!params || Object.keys(params).length === 0) return fullUrl

  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&')

  if (!query) return fullUrl
  return `${fullUrl}${fullUrl.includes('?') ? '&' : '?'}${query}`
}

async function request<T> (
  method: RequestMethod,
  url: string,
  data?: unknown,
  params?: Record<string, unknown>,
  options?: RequestOptions
): Promise<T> {
  const { header, ...rest } = options ?? {}
  const token = Taro.getStorageSync('token')

  try {
    const res = await Taro.request<ApiResponse<T>>({
      url: buildUrl(url, method === 'GET' ? params : undefined),
      method,
      data: method === 'GET' ? undefined : (data as TaroGeneral.IAnyObject),
      timeout: TIMEOUT,
      header: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...header,
      },
      ...rest,
    })

    const body = res.data

    if (res.statusCode < 200 || res.statusCode >= 300) {
      const message = body?.message || `请求失败(${res.statusCode})`
      Taro.showToast({ title: message, icon: 'none' })
      throw new Error(message)
    }

    if (!SUCCESS_CODES.includes(body.code)) {
      Taro.showToast({ title: body.message || '请求失败', icon: 'none' })
      throw new Error(body.message || '请求失败')
    }

    return body.data
  } catch (error) {
    if (error instanceof Error) throw error
    const message = '网络异常，请稍后重试'
    Taro.showToast({ title: message, icon: 'none' })
    throw new Error(message)
  }
}

export function get<T = unknown> (
  url: string,
  params?: Record<string, unknown>,
  options?: RequestOptions
): Promise<T> {
  return request<T>('GET', url, undefined, params, options)
}

export function post<T = unknown> (
  url: string,
  data?: unknown,
  options?: RequestOptions
): Promise<T> {
  return request<T>('POST', url, data, undefined, options)
}

export function put<T = unknown> (
  url: string,
  data?: unknown,
  options?: RequestOptions
): Promise<T> {
  return request<T>('PUT', url, data, undefined, options)
}

export function del<T = unknown> (
  url: string,
  options?: RequestOptions
): Promise<T> {
  return request<T>('DELETE', url, undefined, undefined, options)
}
