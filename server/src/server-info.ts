export interface MonitorApiConfig {
  url: string
  token: string
}

export interface ServerInfo {
  name: string
  ip: string
  platform: string
  id?: string
  createTime?: Date
  ipV6?: string
  region?: string
  expireTime?: Date
  api: MonitorApiConfig
}

/**
 *  Request options for monitoring data.
 *  @see https://systeminformation.io/general.html
 */
export interface MonitorRequestOptions {
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
