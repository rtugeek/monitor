<script setup lang="ts">
import type { ServerInfo } from '@/data/ServerInfo'
import type { Systeminformation } from 'systeminformation'
import type { PropType } from 'vue'
import { MonitorApi } from '@/api/MonitorApi'
import BaseCard from '@/components/BaseCard.vue'
import System from '@/components/icon/System.vue'
import { useServerInfoStore } from '@/stores/useServerInfoStore'
import { IconUtils } from '@/utils/IconUtils'
import { onMounted, ref } from 'vue'

const props = defineProps({
  server: {
    type: Object as PropType<ServerInfo>,
    required: true,
  },
})
const serverInfoStore = useServerInfoStore()
const osInfo = ref<Systeminformation.OsData | undefined>()
const loading = ref(false)
const shell = ref('')

function getOsInfo() {
  loading.value = true
  MonitorApi.post({
    ...serverInfoStore.masterServerConfig,
    forwardToken: props.server.api.token,
    forwardUrl: props.server.api.url,
    osInfo: '*',
    shell: '*',
  }).then((res) => {
    osInfo.value = res.osInfo
    shell.value = res.shell
  }).finally(() => {
    loading.value = false
  })
}

onMounted(() => {
  getOsInfo()
})
</script>

<template>
  <BaseCard body-height="360px">
    <template #header>
      <System :size="24" /><h4>{{ $t('server.systemInfo') }}</h4>
    </template>
    <div v-if="osInfo"class="flex items-center justify-evenly p-4">
      <img :src="IconUtils.getOsIcon(osInfo.distro)" style="width: 200px;height: 200px">
      <el-descriptions :column="1" :label-width="80">
        <el-descriptions-item label="Platform">
          {{ osInfo.platform }}
        </el-descriptions-item>
        <el-descriptions-item label="Distro">
          {{ osInfo.distro }}
        </el-descriptions-item>
        <el-descriptions-item label="Release">
          {{ osInfo.release }}
        </el-descriptions-item>
        <el-descriptions-item label="Kernel">
          {{ osInfo.kernel }}
        </el-descriptions-item>
        <el-descriptions-item label="Arch">
          {{ osInfo.arch }}
        </el-descriptions-item>
        <el-descriptions-item label="Hostname">
          {{ osInfo.hostname }}
        </el-descriptions-item>
        <el-descriptions-item label="Build">
          {{ osInfo.build }}
        </el-descriptions-item>
        <el-descriptions-item label="Shell">
          {{ shell }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </BaseCard>
</template>

<style scoped>

</style>
