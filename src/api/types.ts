/** 后端统一响应结构 */
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

/** 分页列表 */
export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
