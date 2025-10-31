import type { ServerInfo } from '@/data/ServerInfo'

export class ServerUtils {
  static hasApiInfo(server: ServerInfo): boolean {
    return !!(server.api && server.api.url && server.api.token)
  }
}
