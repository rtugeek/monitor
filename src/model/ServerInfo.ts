
export type ServerPlatform = 'alibaba' | 'aws' | 'azure' | 'tencent' | 'google' | 'huawei' | 'ucloud' | 'other'
export interface SSHConfig{
    port: number
    user: string
    identityFile?: string
}
export interface ServerInfo {
    name: string
    ip:string
    platform: ServerPlatform | string
    createTime?:Date
    ipV6?:string
    region?: string
    expireTime?:Date
    /**
     * 单位MB
     */
    memery?: number
    /**
     * cpu核心数
     */
    cpuCore?: number
    os?: string
    /**
     * 内网ip
     */
    intranetIp?: string
    note?: string
    ssh?: SSHConfig
}