<script setup lang="ts">
import type { ServerInfo } from '@/data/ServerInfo'
import type { Systeminformation } from 'systeminformation'
import type { PropType } from 'vue'
import { MonitorApi } from '@/api/MonitorApi'
import BaseCard from '@/components/BaseCard.vue'
import Process from '@/components/icon/Process.vue'
import { useServerInfoStore } from '@/stores/useServerInfoStore'
import { useIntervalFn } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps({
  server: {
    type: Object as PropType<ServerInfo>,
    required: true,
  },
})
const serverInfoStore = useServerInfoStore()
const processList = ref<Systeminformation.ProcessesProcessData[]>([])
const loading = ref(false)

function getProcess() {
  loading.value = true
  MonitorApi.post({
    ...serverInfoStore.masterServerConfig,
    forwardToken: props.server.api.token,
    forwardUrl: props.server.api.url,
    processes: '*',
  }).then((res) => {
    processList.value = res.processes?.list ?? []
  }).finally(() => {
    loading.value = false
  })
}

useIntervalFn(() => {
  getProcess()
}, 3000, { immediate: true, immediateCallback: true })

function getTagType(state: string): 'success' | 'warning' | 'info' | 'danger' | undefined {
  switch (state) {
    case 'running':
      return 'success'
    case 'sleeping':
    case 'unknown':
      return 'info'
    case 'stopped':
      return 'warning'
    case 'zombie':
      return 'danger'
    default:
      return undefined
  }
}
</script>

<template>
  <BaseCard>
    <template #header>
      <Process :size="24" /><h4>{{ $t('server.processInfo') }}</h4>
    </template>
    <el-table :data="processList" style="width: 100%;height: 800px">
      <el-table-column prop="pid" label="PID" width="80px" />
      <el-table-column prop="name" label="NAME" width="200px" sortable />
      <el-table-column prop="parentPid" label="Parent PID" width="120px" />
      <el-table-column prop="cpu" label="CPU" width="100px" sortable>
        <template #default="scope">
          {{ (scope.row.cpu).toFixed(2) }}%
        </template>
      </el-table-column>
      <el-table-column prop="mem" label="MEM" width="100px" sortable>
        <template #default="scope">
          {{ (scope.row.mem).toFixed(2) }}%
        </template>
      </el-table-column>
      <el-table-column prop="started" label="started" width="220px" />
      <el-table-column prop="user" label="User" width="120" sortable />
      <el-table-column prop="state" label="State" width="120" sortable>
        <template #default="{ row }">
          <el-tag :type="getTagType(row.state)">
            {{ row.state }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="params" label="Params" width="200" />
      <el-table-column prop="path" label="PATH" />
    </el-table>
  </BaseCard>
</template>

<style scoped>

</style>
