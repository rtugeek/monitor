<script setup lang="ts">
import type { PortNote, ServerInfo } from '@/data/ServerInfo'
import type { Systeminformation } from 'systeminformation'
import { MonitorApi } from '@/api/MonitorApi'
import BaseCard from '@/components/BaseCard.vue'
import Port from '@/components/icon/Port.vue'
import { useServerInfoStore } from '@/stores/useServerInfoStore'
import { Edit, Refresh } from '@icon-park/vue-next'
import { delay } from '@widget-js/core'
import { onMounted, ref } from 'vue'

interface LocalNetworkConnectionsData extends Systeminformation.NetworkConnectionsData {
  note?: string
}

const model = defineModel<ServerInfo>()
const serverInfoStore = useServerInfoStore()
const localPortNotes = ref<PortNote[]>([])
const connections = ref<Systeminformation.NetworkConnectionsData[]>([])
const loading = ref(false)
const editDialogVisible = ref(false)
const editPortNote = ref<LocalNetworkConnectionsData>()

onMounted(() => {
  if (model.value?.portNotes) {
    localPortNotes.value = model.value?.portNotes
  }
  else {
    localPortNotes.value = []
  }
})

function getNetworkConnections() {
  loading.value = true
  MonitorApi.post({
    ...serverInfoStore.masterServerConfig,
    forwardToken: model.value?.api.token,
    forwardUrl: model.value?.api.url,
    networkConnections: '* | state:LISTEN',
  }).then((res) => {
    const arr = (res.networkConnections ?? []) as LocalNetworkConnectionsData[]
    const noteArr = model.value!.portNotes ?? []
    for (const item of arr) {
      const target = noteArr.find(it => it.port.toString() == item.localPort && it.protocol == item.protocol)
      if (target) {
        item.note = target.note
      }
    }
    arr.sort((a, b) => {
      if (a.note && !b.note) {
        return -1
      }
      return Number.parseInt(a.localPort) - Number.parseInt(b.localPort)
    })
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

function openEditDialog(data: LocalNetworkConnectionsData) {
  editPortNote.value = data
  editDialogVisible.value = true
}

async function submitPortNote() {
  const { localPort, note, protocol } = editPortNote.value!
  if (!model.value!.portNotes) {
    model.value!.portNotes = []
  }
  else {
    model.value!.portNotes = model.value!.portNotes.filter(pn => pn.port != localPort || pn.protocol != protocol)
  }
  model.value!.portNotes.push({ port: localPort, note: note ?? '', protocol })
  editDialogVisible.value = false
  const parse = JSON.parse(JSON.stringify(model.value))
  await serverInfoStore.save(parse)
  await delay(1000)
  getNetworkConnections()
}
</script>

<template>
  <BaseCard v-loading="loading" body-height="360px">
    <template #header>
      <div class="flex w-full items-center gap-2">
        <Port :size="24" /><h4>{{ $t('server.portInfo') }}</h4>
        <Refresh class="ml-auto cursor-pointer" @click="getNetworkConnections()" />
      </div>
    </template>
    <el-table :data="connections" style="width: 100%;height: 325px" :loading="loading">
      <el-table-column prop="localPort" label="Port" width="80" />
      <el-table-column prop="protocol" label="Protocol" width="90" />
      <el-table-column prop="localAddress" label="Address" width="120" />
      <el-table-column prop="pid" label="PID" width="100" />
      <el-table-column prop="note" label="Note">
        <template #default="scope">
          <div class="flex">
            {{ scope.row.note }}
            <el-button class="ml-auto" size="small" @click="openEditDialog(scope.row)">
              <Edit />
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="editDialogVisible" title="Edit Port Note" width="400">
      <div>
        <p>Port: {{ editPortNote!.localPort }}</p>
        <el-input v-model="editPortNote!.note" placeholder="Enter note" />
      </div>
      <template #footer>
        <el-button @click="editDialogVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="submitPortNote">
          Confirm
        </el-button>
      </template>
    </el-dialog>
  </BaseCard>
</template>

<style scoped>

</style>
