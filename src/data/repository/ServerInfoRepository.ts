import type { Table } from 'dexie'
import type { ServerInfo } from '../ServerInfo'
import Dexie from 'dexie'
import { nanoid } from 'nanoid'
// ...existing code or comments...

// 定义Dexie数据库
export class ServerInfoDB extends Dexie {
  serverInfos!: Table<ServerInfo> // 使用ip作为主键

  constructor() {
    super('server-info')
    this.version(1).stores({
      serverInfos: 'id, ip, name, platform',
    })
  }
}

// ServerInfoRepository实现，所有方法修改为静态方法
export class ServerInfoRepository {
  private static db: ServerInfoDB = new ServerInfoDB()

  static async get(id: string): Promise<ServerInfo | undefined> {
    return this.db.serverInfos.get(id)
  }

  // 更新服务器信息，返回修改记录数
  static async save(info: ServerInfo): Promise<ServerInfo> {
    if (!info.createTime) {
      info.createTime = new Date()
    }
    if (!info.id) {
      info.id = nanoid()
    }
    await this.db.serverInfos.put(info)
    return info
  }

  // 删除服务器信息
  static async remove(id: string): Promise<void> {
    await this.db.serverInfos.delete(id)
  }

  static async list(): Promise<ServerInfo[]> {
    return this.db.serverInfos.toArray()
  }
}
