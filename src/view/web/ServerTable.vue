<script setup lang="ts">
import type { ServerInfo } from '@/data/ServerInfo'
import type { Systeminformation } from 'systeminformation'
import { MonitorApi } from '@/api/MonitorApi'
import LevelProgress from '@/components/LevelProgress.vue'
import OsDataComponent from '@/components/OsDataComponent.vue'
import { useServerInfoStore } from '@/stores/useServerInfoStore'
import { IconUtils } from '@/utils/IconUtils'
import { IpUtils } from '@/utils/IpUtils'
import { ServerUtils } from '@/utils/ServerUtils'
import { Add, Book, Copy, Delete, Edit, Notes } from '@icon-park/vue-next'
import { useIntervalFn } from '@vueuse/core'
import { BrowserWindowApi } from '@widget-js/core'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const emits = defineEmits(['add', 'edit', 'note'])
const { t } = useI18n()
const serverInfoStore = useServerInfoStore()
const router = useRouter()
function copyIp(ip: string) {
  navigator.clipboard.writeText(ip)
  ElMessage({
    message: t('server.actions.copied'),
    type: 'success',
  })
}

useIntervalFn(async () => {
  for (const server of serverInfoStore.servers) {
    if (ServerUtils.hasApiInfo(server)) {
      if (!server.status) {
        server.status = {}
      }
      try {
        const masterServerConfig = serverInfoStore.masterServerConfig
        const stats = await MonitorApi.getBasicStats({
          ...masterServerConfig,
          forwardUrl: server.api.url,
          forwardToken: server.api.token,
        })
        server.status.cpuLoad = stats.currentLoad
        server.status.mem = stats.mem
        server.status.fsSize = stats.fsSize
        server.status.msg = undefined
      }
      catch (e: any) {
        server.status.msg = e.message
      }
    }
  }
}, 3 * 1000, { immediate: true, immediateCallback: true })

function getMemPercentage(mem?: Systeminformation.MemData): number {
  if (!mem) {
    return 0
  }
  return (mem.total - mem.available) / mem.total * 100
}

function editServer(server: ServerInfo) {
  emits('edit', JSON.parse(JSON.stringify(server)))
}

function editServerNote(server: ServerInfo) {
  router.push({
    name: 'ServerDetail',
    query: { id: server.id },
  })
  // emits('note', JSON.parse(JSON.stringify(server)))
}

function viewDoc() {
  BrowserWindowApi.openUrl('https://widgetjs.cn/monitor/doc')
}
</script>

<template>
  <el-table :data="serverInfoStore.servers">
    <template #empty>
      <el-empty>
        <template #description>
          <el-button type="primary" @click="emits('add')">
            <template #icon>
              <Add />
            </template> {{ t('app.addServer') }}
          </el-button>
          <el-button @click="viewDoc">
            <template #icon>
              <Book />
            </template> {{ t('app.docs') }}
          </el-button>
        </template>
      </el-empty>
    </template>
    <el-table-column :label="t('server.table.server')">
      <template #default="{ row }">
        <div class="flex items-center gap-1">
          <img style="width: 24px" :src="IconUtils.getPlatformIcon(row.platform)" :alt="row.name"> {{ row.name }}
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="t('server.table.ip')">
      <template #default="{ row }">
        <div class="ml-auto cursor-pointer flex items-center gap-1" @click="copyIp(row.ip)">
          {{ serverInfoStore.config.maskIp ? IpUtils.mask(row.ip) : row.ip }}
          <Copy class="cursor-pointer" />
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="t('server.table.os')">
      <template #default="{ row }">
        <el-text v-if="!ServerUtils.hasApiInfo(row)" type="warning">
          {{ t('server.actions.noApi') }}
        </el-text>
        <el-text v-else-if="row.status?.msg" type="danger">
          {{ row.status.msg }}
        </el-text>
        <OsDataComponent v-else-if="row.os" :os="row.os" />
      </template>
    </el-table-column>
    <el-table-column :label="t('server.table.region')" />
    <el-table-column :label="t('server.table.expireTime')">
      <template #default="{ row }">
        <span v-if="row.expireTime">{{ dayjs(row.expireTime).format('YYYY-MM-DD') }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="t('server.table.cpu')">
      <template #default="{ row }">
        <LevelProgress :percentage="row.status?.cpuLoad?.currentLoad" />
      </template>
    </el-table-column>
    <el-table-column :label="t('server.table.mem')">
      <template #default="{ row }">
        <LevelProgress :percentage="getMemPercentage(row?.status?.mem)" />
      </template>
    </el-table-column>
    <el-table-column :label="t('server.table.fs')">
      <template #default="{ row }">
        <LevelProgress :percentage="row.status?.fsSize ? (row.status.fsSize[0].use) : 0" />
      </template>
    </el-table-column>
    <el-table-column :label="t('server.table.note')" />
    <el-table-column :label="t('server.table.action')" width="120">
      <template #default="{ row }">
        <el-button
          type="primary" circle size="small" @click="editServer(row)"
        >
          <Edit />
        </el-button>
        <el-button type="warning" circle size="small" @click="editServerNote(row)">
          <Notes />
        </el-button>
        <el-popconfirm
          :title="t('server.actions.confirmDelete', { name: row.name })"
          width="250"
          @confirm="serverInfoStore.remove(row.id)"
        >
          <template #reference>
            <el-button circle type="danger" size="small">
              <Delete />
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>
