import type { Systeminformation } from 'systeminformation'

export type ServerPlatform = 'Alibaba Cloud' | 'AWS' | 'Azure' | 'Tencent Cloud' | 'Google Cloud' | 'Huawei Cloud' | '天翼云' | 'UCloud' | 'Other'
export interface MonitorApiConfig {
  url: string
  token: string
  /**
   * 单位秒
   */
  interval?: number
}
export interface ServerInfo {
  name: string
  ip: string
  platform: ServerPlatform | string
  id?: string
  createTime?: Date
  ipV6?: string
  region?: string
  expireTime?: Date
  api: MonitorApiConfig
  /**
   * 单位MB
   */
  memery?: Systeminformation.MemData
  /**
   * cpu
   */
  cpu?: Systeminformation.CpuData
  os?: Systeminformation.OsData
  /**
   * 内网ip
   */
  intranetIp?: string
  note?: string
}
