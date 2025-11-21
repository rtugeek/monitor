<script setup lang="ts">
import type { ServerInfo } from '@/data/ServerInfo'
import type { Systeminformation } from 'systeminformation'
import type { PropType } from 'vue'
import { MonitorApi } from '@/api/MonitorApi'
import BaseCard from '@/components/BaseCard.vue'
import Hardware from '@/components/icon/Hardware.vue'
import { useServerInfoStore } from '@/stores/useServerInfoStore'
import { ColorUtils } from '@/utils/ColorUtils'
import { useIntervalFn } from '@vueuse/core'
import prettyBytes from 'pretty-bytes'
import { computed, ref } from 'vue'

const props = defineProps({
  server: {
    type: Object as PropType<ServerInfo>,
    required: true,
  },
})
const serverInfoStore = useServerInfoStore()
const currentLoad = ref<Systeminformation.CurrentLoadData>()
const mem = ref<Systeminformation.MemData>()
const fsSize = ref<Systeminformation.FsSizeData[]>()
const cpuData = ref<Systeminformation.CpuData>()
async function loadData() {
  try {
    const masterServerConfig = serverInfoStore.masterServerConfig
    const stats = await MonitorApi.getBasicStats({
      ...masterServerConfig,
      forwardUrl: props.server.api.url,
      forwardToken: props.server.api.token,
      cpu: '*',
    })
    currentLoad.value = stats.currentLoad
    mem.value = stats.mem
    fsSize.value = stats.fsSize
    cpuData.value = stats.cpu
  }
  catch (e: any) {

  }
}

const memUsage = computed(() => {
  const value = mem.value
  if (value) {
    return Number.parseFloat((value.active / value.total * 100).toFixed(2))
  }
  return 0
})

const diskUsage = computed(() => {
  if (fsSize.value && fsSize.value.length > 0) {
    const use = fsSize.value.reduce((acc, cur) => acc + cur.use, 0)
    return Number.parseFloat((use).toFixed(2))
  }
  return 0
})

const cpuLoad = computed(() => {
  if (currentLoad.value) {
    return Number.parseFloat((currentLoad.value.currentLoad).toFixed(2))
  }
  return 0
})
useIntervalFn(() => {
  loadData()
}, 3000, { immediateCallback: true, immediate: true })
</script>

<template>
  <BaseCard body-height="360px">
    <template #header>
      <Hardware :size="24" /><h4>{{$t('server.hardwareInfo')}}</h4>
    </template>
    <div class="flex flex-col gap-2 items-center pt-10 h-full w-full">
      <div class="flex gap-4 w-full">
        <div class="flex flex-1 flex-col gap-4 items-center">
          <el-progress v-if="currentLoad" type="dashboard" :percentage="cpuLoad" :color="ColorUtils.getProcessColor(cpuLoad)">
            <template #default="{ percentage }">
              <div class="flex flex-col">
                <span class="text-xl">{{ percentage }}%</span>
                <span class="text-xs">CPU</span>
              </div>
            </template>
          </el-progress>
          <div v-if="cpuData" class="flex text-center flex-col gap-2">
            <el-descriptions title="" :column="1">
              <el-descriptions-item label="Cores">
                {{ `${cpuData.cores}/${cpuData.processors}` }}
              </el-descriptions-item>
              <el-descriptions-item label="Vendor">
                {{ cpuData.vendor }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-4 items-center">
          <el-progress type="dashboard" :percentage="memUsage" :color="ColorUtils.getProcessColor(memUsage)">
            <template #default="{ percentage }">
              <div class="flex flex-col">
                <span class="text-xl">{{ percentage }}%</span>
                <span class="text-xs">Mem</span>
              </div>
            </template>
          </el-progress>
          <div class="flex text-center flex-col gap-2">
            <div v-if="mem" class="flex text-center flex-col gap-2">
              <el-descriptions title="" :column="1">
                <el-descriptions-item label="Mem">
                  {{ `${prettyBytes(mem.active)}/${prettyBytes(mem.total)}` }}
                </el-descriptions-item>
                <el-descriptions-item label="Swap">
                  {{ `${prettyBytes(mem.swapused)}/${prettyBytes(mem.swaptotal)}` }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-4 items-center">
          <el-progress type="dashboard" :percentage="diskUsage" :color="ColorUtils.getProcessColor(diskUsage)">
            <template #default="{ percentage }">
              <div class="flex flex-col">
                <span class="text-xl">{{ percentage }}%</span>
                <span class="text-xs">Disk</span>
              </div>
            </template>
          </el-progress>
          <div class="flex text-center flex-col gap-2">
            <div v-if="fsSize" class="flex text-center flex-col gap-2">
              <el-descriptions title="" :column="1">
                <el-descriptions-item v-for="(item, index) in fsSize" :key="index" :label="`Disk ${index + 1}`">
                  {{ `${prettyBytes(item.used)}/${prettyBytes(item.size)}` }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped>

</style>
