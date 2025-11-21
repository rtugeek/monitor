import type { AppConfig, MonitorApiConfig, ServerInfo } from '@/data/ServerInfo'
import type { MaybeRef } from '@vueuse/core'
import { MonitorApi } from '@/api/MonitorApi'
import { ServerInfoRepository } from '@/data/repository/ServerInfoRepository'

import { useBroadcastChannel, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref, toRaw, toValue, watch } from 'vue'

export const useServerInfoStore = defineStore('serverInfo', () => {
  const servers = ref<ServerInfo[]>([])
  const masterServerConfig = useStorage<MonitorApiConfig>('sync-server', { url: '', token: '' })
  const config = useStorage<AppConfig>('config', { maskIp: false })
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
    if (masterServerConfig) {
      MonitorApi.postServers(masterServerConfig.value!, servers.value)
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
    if (masterServerConfig) {
      MonitorApi.postServers(masterServerConfig.value!, servers.value)
    }
  }

  function setMasterServer(config: MonitorApiConfig) {
    if (config.token && config.url) {
      masterServerConfig.value.token = config.token
      masterServerConfig.value.url = config.url
      fetchFromServer()
    }
    else {
      throw new Error('Url and token are required')
    }
  }

  async function fetchFromServer() {
    const servers = await MonitorApi.getServers(masterServerConfig.value)
    await saveAll(servers)
  }

  function getById(id: string) {
    return ServerInfoRepository.get(id)
  }
  load()
  return { servers, load, save, saveAll, getById, remove, masterServerConfig, setMasterServer, config, fetchFromServer }
})
