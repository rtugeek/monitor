<script setup lang="ts">
import type { ServerInfo } from '@/data/ServerInfo'
import type { Systeminformation } from 'systeminformation'
import { MonitorApi } from '@/api/MonitorApi'
import CircleProgress from '@/components/CircleProgress.vue'
import OsDataComponent from '@/components/OsDataComponent.vue'
import { IconUtils } from '@/utils/IconUtils'
import { IpUtils } from '@/utils/IpUtils'
import { NotificationUtils } from '@/utils/NotificationUtils'
import { WindowUtils } from '@/utils/WindowUtils'
import { Copy, Pencil } from '@icon-park/vue-next'
import { useIntervalFn } from '@vueuse/core'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { BytesUtils } from '../../../utils/BytesUtils'

const props = defineProps<{
  server: ServerInfo
}>()

const maskIp = ref(true)
function copyIp() {
  maskIp.value = !maskIp.value
  navigator.clipboard.writeText(props.server.ip)
  NotificationUtils.toastSuccess('已复制')
}

function edit() {
  WindowUtils.open(`/server/edit?id=${props.server.id}`)
}

const currentLoad = ref<Systeminformation.CurrentLoadData>()
const mem = ref<Systeminformation.MemData>()
const fsSize = ref<Systeminformation.FsSizeData>()
useIntervalFn(async () => {
  const stats = await MonitorApi.getBasicStats(props.server.api)
  currentLoad.value = stats.currentLoad
  mem.value = stats.mem
  fsSize.value = stats.fsSize[0]
}, (props.server.api.interval ?? 10) * 1000, { immediate: true, immediateCallback: true })

const systemLoad = computed(() => {
  if (currentLoad.value) {
    return currentLoad.value.currentLoad / 100
  }
  else {
    return 0
  }
})

const memLoad = computed(() => {
  if (mem.value) {
    return (mem.value.total - mem.value.available) / mem.value.total
  }
  else {
    return 0
  }
})

const fsLoad = computed(() => {
  if (fsSize.value) {
    return fsSize.value.use / 100
  }
  return 0
})
</script>

<template>
  <div class="server flex flex-col">
    <div class="header flex items-center gap-1">
      <div class="name flex  items-center gap-1 cursor-pointer" @click="edit">
        <img style="width: 24px" :src="IconUtils.getPlatformIcon(server.platform)"> {{ server.name }} <Pencil />
      </div>
      <div class="ml-auto cursor-pointer flex items-center gap-1" @click="copyIp">
        {{ maskIp ? IpUtils.mask(server.ip) : server.ip }}
        <Copy class="cursor-pointer" @click="copyIp" />
      </div>
    </div>
    <hr>
    <div class="flex justify-around w-full">
      <div v-if="currentLoad" class="flex flex-col gap-1 items-center">
        <span style="font-size: 12px">负载</span>
        <CircleProgress :progress="systemLoad" />
        <span style="font-size: 12px">{{ server.cpu.cores }}/{{ server.cpu.processors }}</span>
      </div>
      <div v-if="mem" class="flex flex-col gap-1 items-center ">
        <span style="font-size: 12px">内存</span>
        <CircleProgress :progress="memLoad" />
        <span style="font-size: 12px">{{ BytesUtils.pretty(mem.active) }} / {{ BytesUtils.pretty(mem.total) }}</span>
      </div>
      <div v-if="fsSize" class="flex flex-col gap-1 items-center">
        <span style="font-size: 12px">磁盘</span>
        <CircleProgress :progress="fsLoad" />
        <span style="font-size: 12px">{{ BytesUtils.pretty(fsSize.used) }} / {{ BytesUtils.pretty(fsSize.size) }}</span>
      </div>
    </div>
    <hr>
    <div class="flex footer">
      <OsDataComponent v-if="server.os" :os="server.os" />
      <div v-if="server.expireTime" class="ml-auto">
        {{ dayjs(server.expireTime).diff(dayjs(), 'd') }}天到期
      </div>
    </div>
  </div>
</template>

<style scoped>
.server{
  padding: 0.5rem;
  background: var(--widget-background-color);
  border-radius: 0.5rem;
}
.header{
  font-size: 14px;
}
hr{
  width: 100%;
  opacity: 0.5;
}

.footer{
  font-size: 12px;
}
</style>
