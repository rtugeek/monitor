<script setup lang="ts">
import type { PortNote, ServerInfo } from '@/data/ServerInfo'
import type { Systeminformation } from 'systeminformation'
import { MonitorApi } from '@/api/MonitorApi'
import BaseCard from '@/components/BaseCard.vue'
import Port from '@/components/icon/Port.vue'
import { useServerInfoStore } from '@/stores/useServerInfoStore'
import { onMounted, ref } from 'vue'

const model = defineModel<ServerInfo>()
const serverInfoStore = useServerInfoStore()
const localPortNotes = ref<PortNote[]>([])
const connections = ref<Systeminformation.NetworkConnectionsData[]>([])
const loading = ref(false)

function getNetworkConnections() {
  loading.value = true
  MonitorApi.post({
    ...serverInfoStore.masterServerConfig,
    forwardToken: model.value?.api.token,
    forwardUrl: model.value?.api.url,
    networkConnections: '* | state:LISTEN',
  }).then((res) => {
    const arr = res.networkConnections ?? []
    arr.sort((a, b) => Number.parseInt(a.localPort) - Number.parseInt(b.localPort))
    // 合并相同端口,把localAddress合并到一个字段
    const mergedConnections: Systeminformation.NetworkConnectionsData[] = []
    arr.forEach((conn) => {
      const existing = mergedConnections.find(c => c.localPort === conn.localPort && c.protocol === conn.protocol)
      if (existing) {
        existing.localAddress += `/${conn.localAddress}`
      }
      else {
        mergedConnections.push(conn)
      }
    })
    connections.value = mergedConnections
  }).finally(() => {
    loading.value = false
  })
}

onMounted(() => {
  // localPortNotes.value = model.value ? [...model.value] : []
  getNetworkConnections()
})
</script>

<template>
  <BaseCard body-height="360px">
    <template #header>
      <Port :size="24" /><h4>{{ $t('server.portInfo') }}</h4>
    </template>
    <el-table :data="connections" style="width: 100%;height: 100%" :loading="loading">
      <el-table-column prop="localPort" label="Port" width="80" />
      <el-table-column prop="protocol" label="Type" width="80" />
      <el-table-column prop="localAddress" label="Address" width="120" />
      <el-table-column prop="pid" label="PID" width="100" />
      <el-table-column prop="note" label="Note">
        <template #default="scope">
          <el-input v-model="scope.row.note" size="small" />
        </template>
      </el-table-column>
    </el-table>
  </BaseCard>
</template>

<style scoped>

</style>
