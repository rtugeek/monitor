import type { MonitorApiConfig, ServerInfo } from '@/data/ServerInfo'
import type { Systeminformation } from 'systeminformation'
import axios from 'axios'

export class MonitorApi {
  static async getServers(info: MonitorApiConfig): Promise<ServerInfo[]> {
    const res = await axios.get(`${info.url}/servers`, {
      headers: {
        token: info.token,
      },
    })
    return res.data
  }

  static async postServers(info: MonitorApiConfig, servers: ServerInfo[]): Promise<ServerInfo[]> {
    const res = await axios.post(`${info.url}/servers`, servers, { headers: {
      token: info.token,
    } })
    return res.data
  }

  static async post(options: MonitorRequestOptions): Promise<MonitorResponse> {
    const res = await axios.post(`${options.url}`, options, { headers: {
      token: options.token,
    } })
    return res.data
  }

  static async getBasicStats(options: MonitorRequestOptions): Promise<MonitorResponse> {
    options.mem = '*'
    options.currentLoad = 'avgLoad,currentLoad,currentLoadUser,currentLoadIdle,currentLoadSystem'
    options.fsSize = '*'
    return await this.post(options)
  }
}

/**
 *  Request options for monitoring data.
 *  @see https://systeminformation.io/general.html
 */
export interface MonitorRequestOptions extends MonitorApiConfig {
  /**
   * Use forward token to get data from another server.
   * this is useful when you want to get data from a server behind a firewall or CORS/HTTPS issue in browser.
   */
  forwardToken?: string
  forwardUrl?: string
  system?: string
  uuid?: string
  bios?: string
  cpu?: string
  cpuFlags?: string
  cpuCurrentSpeed?: string
  mem?: string
  memLayout?: string
  graphics?: string
  osInfo?: string
  shell?: string
  versions?: string
  users?: string
  currentLoad?: string
  fullLoad?: string
  processes?: string
  processLoad?: string
  services?: string
  diskLayout?: string
  blockDevices?: string
  disksIO?: string
  fsSize?: string
  fsOpenFiles?: string
  fsStats?: string
  networkInterfaces?: string
  networkInterfaceDefault?: string
  networkGatewayDefault?: string
  networkStats?: string
  networkConnections?: string
  inetChecksite?: string
  inetLatency?: string
  dockerInfo?: string
  dockerImages?: string
  dockerContainers?: string
  dockerContainerStats?: string
  dockerContainerProcesses?: string
  dockerVolumes?: string
  dockerAll?: string
}

export interface MonitorResponse {
  cpu?: Systeminformation.CpuData
  mem?: Systeminformation.MemData
  osInfo?: Systeminformation.OsData
  currentLoad?: Systeminformation.CurrentLoadData
  fsSize?: Systeminformation.FsSizeData[]
  networkConnections?: Systeminformation.NetworkConnectionsData[]
  services?: Systeminformation.ServicesData[]
  versions?: Systeminformation.VersionData[]
  processes?: Systeminformation.ProcessesData
  shell?: string
}
