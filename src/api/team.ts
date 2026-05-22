import { get } from '@/utils/request'

export interface TeamInfo {
  id: string
  name: string
  logo: string
}

/** 球队相关接口 */
export const teamApi = {
  /** 获取球队详情 */
  getDetail: (teamId: string) =>
    get<TeamInfo>('/team/detail', { teamId }),
}
