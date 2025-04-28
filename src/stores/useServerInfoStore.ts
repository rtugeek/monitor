import type { MonitorApiConfig, ServerInfo } from '@/data/ServerInfo'
import type { MaybeRef } from '@vueuse/core'
import { MonitorApi } from '@/api/MonitorApi'
import { ServerInfoRepository } from '@/data/repository/ServerInfoRepository'

import { useBroadcastChannel, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref, toRaw, toValue, watch } from 'vue'

export const useServerInfoStore = defineStore('serverInfo', () => {
  const servers = ref<ServerInfo[]>([])
  const syncServerConfig = useStorage<MonitorApiConfig>('sync-server', { url: '', token: '' })
  const broadcastChannel = useBroadcastChannel({ name: 'serverInfo' })
  watch(() => broadcastChannel.data, () => {
    load()
  }, { deep: true })

  async function load(): Promise<ServerInfo[]> {
    servers.value = await ServerInfoRepository.list()
    return servers.value
  }

  async function save(info: MaybeRef<ServerInfo>) {
    const raw = toRaw(toValue(info))
    await ServerInfoRepository.save(raw)
    broadcastChannel.post({
      type: 'save',
      data: raw,
    })
    await load()
    if (syncServerConfig) {
      MonitorApi.postServers(syncServerConfig.value!, servers.value)
    }
  }

  async function saveAll(servers: ServerInfo[]) {
    for (const server of servers) {
      const raw = toRaw(toValue(server))
      await ServerInfoRepository.save(raw)
    }
    broadcastChannel.post({
      type: 'saveAll',
    })
    await load()
  }

  async function remove(id: string) {
    await ServerInfoRepository.remove(id)
    broadcastChannel.post({
      type: 'remove',
      data: id,
    })
    await load()
    if (syncServerConfig) {
      MonitorApi.postServers(syncServerConfig.value!, servers.value)
    }
  }
  load()
  return { servers, load, save, saveAll, remove, syncServerConfig }
})
