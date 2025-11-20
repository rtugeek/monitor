import fs from 'node:fs'
import path from 'node:path'
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import * as si from 'systeminformation'
import { MonitorRequestOptions, ServerInfo } from './server-info'

@Injectable()
export class AppService {
  private backupFilePath = path.resolve(__dirname, 'backup.json')
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  saveServers(serverData: ServerInfo[]) {
    this.cacheManager.set('servers', serverData)
    fs.writeFileSync(this.backupFilePath, JSON.stringify(serverData, null, 2), 'utf8')
  }

  async getServers(): Promise<ServerInfo[]> {
    const servers = await this.cacheManager.get('servers') as ServerInfo[] | undefined
    if (servers) {
      return servers
    }
    if (fs.existsSync(this.backupFilePath)) {
      const content = fs.readFileSync(this.backupFilePath, 'utf8')
      if (content) {
        try {
          const parse = JSON.parse(content) as ServerInfo[]
          this.cacheManager.set('servers', parse)
          return parse
        }
        catch (e) {
        }
      }
    }

    return []
  }

  async request(body: MonitorRequestOptions) {
    if (body.forwardToken && body.forwardUrl) {
      const res = await fetch(body.forwardUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': body.forwardToken,
        },
        body: JSON.stringify({
          ...body,
          token: null,
          forwardToken: null,
        }),
      })
      const json = await res.text()
      return JSON.parse(json)
    }
    else {
      return si.get(body)
    }
  }
}
