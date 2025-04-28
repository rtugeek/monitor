import type { MonitorApiConfig, ServerInfo } from '@/data/ServerInfo'
import type { Systeminformation } from 'systeminformation'
import axios from 'axios'

export class MonitorApi {
  static async getServers(info: MonitorApiConfig): Promise<ServerInfo[]> {
    const res = await axios.get(`${info.url}/servers`, {
      params: {
        token: info.token,
      },
    })
    return res.data
  }

  static async postServers(info: MonitorApiConfig, servers: ServerInfo[]): Promise<ServerInfo[]> {
    const res = await axios.post(`${info.url}/servers`, servers, { params: {
      token: info.token,
    } })
    return res.data
  }

  static async getOs(info: MonitorApiConfig): Promise<Systeminformation.OsData> {
    const res = await axios.get(`${info.url}/os`, {
      params: {
        token: info.token,
      },
    })
    return res.data
  }

  static async getMem(info: MonitorApiConfig): Promise<Systeminformation.MemData> {
    const res = await axios.get(`${info.url}/mem`, {
      params: {
        token: info.token,
      },
    })
    return res.data
  }

  static async getCpu(info: MonitorApiConfig): Promise<Systeminformation.CpuData> {
    const res = await axios.get(`${info.url}/cpu`, {
      params: {
        token: info.token,
      },
    })
    return res.data
  }

  static async getLoad(info: MonitorApiConfig): Promise<Systeminformation.CurrentLoadData> {
    const res = await axios.get(`${info.url}/load`, {
      params: {
        token: info.token,
      },
    })
    return res.data
  }

  static async getBasicStats(info: MonitorApiConfig): Promise<{ mem: Systeminformation.MemData, fsSize: Systeminformation.FsSizeData[], currentLoad: Systeminformation.CurrentLoadData }> {
    const res = await axios.get(`${info.url}`, {
      params: {
        token: info.token,
        mem: '*',
        currentLoad: 'avgLoad,currentLoad,currentLoadUser,currentLoadIdle,currentLoadSystem',
        fsSize: '*',
      },
    })
    return res.data
  }
}
