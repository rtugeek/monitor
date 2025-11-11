import type { Systeminformation } from 'systeminformation'

export type ServerPlatform = 'Alibaba Cloud' | 'AWS' | 'Azure' | 'Tencent Cloud' | 'Google Cloud' | 'Huawei Cloud' | '天翼云' | 'UCloud' | 'Other'
export interface MonitorApiConfig {
  url: string
  token: string
  /**
   * 单位秒
   * @deprecated
   */
  interval?: number
}

export interface AppConfig {
  maskIp: boolean
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
  status?: ServerStatus
  account?: string // Added an optional 'account' field to the ServerInfo interface
}

export interface ServerStatus {
  cpuLoad?: Systeminformation.CurrentLoadData
  mem?: Systeminformation.MemData
  fsSize?: Systeminformation.FsSizeData[]
  msg?: string
}

export const emptyServerInfo: ServerInfo = {
  id: '',
  name: '',
  ip: '',
  platform: '',
  api: {
    url: '',
    token: '',
    interval: 10,
  },
}
