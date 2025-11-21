<script setup lang="ts">
import type { PortNote, RedisNote, ServerInfo } from '@/data/ServerInfo'
import BaseLayout from '@/components/BaseLayout.vue'
import { emptyServerInfo } from '@/data/ServerInfo'
import { useServerInfoStore } from '@/stores/useServerInfoStore'
import ServerDialog from '@/view/web/ServerDialog.vue'

import ServerNoteDailog from '@/view/web/ServerNoteDailog.vue'
import ServerTable from '@/view/web/ServerTable.vue'
import { ref, toRaw } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const currentServer = ref<ServerInfo>(JSON.parse(JSON.stringify(emptyServerInfo)))
const showServerDialog = ref(false)
const showServerNoteDialog = ref(false)
const serverStore = useServerInfoStore()

function onAddServerClicked() {
  currentServer.value = JSON.parse(JSON.stringify(emptyServerInfo))
  showServerDialog.value = true
}

function onEditServer(server: ServerInfo) {
  currentServer.value = JSON.parse(JSON.stringify(server))
  showServerDialog.value = true
}

function onEditServerNote(server: ServerInfo) {
  currentServer.value = JSON.parse(JSON.stringify(server))
  showServerNoteDialog.value = true
}

function onSaveServerNote(portNotes: PortNote[], redisNotes: RedisNote[]) {
  currentServer.value.portNotes = portNotes.map(toRaw)
  currentServer.value.redisNotes = redisNotes.map(toRaw)
  serverStore.save(currentServer)
}
</script>

<template>
  <BaseLayout>
    <el-card shadow="hover" body-style="padding:0">
      <ServerTable @add="onAddServerClicked" @edit="onEditServer" @note="onEditServerNote" />
    </el-card>

    <ServerDialog v-model="currentServer" v-model:show="showServerDialog" />
    <ServerNoteDailog v-model:show="showServerNoteDialog" :port-notes="currentServer.portNotes" :redis-notes="currentServer.redisNotes" @save="onSaveServerNote" />
  </BaseLayout>
</template>

<style lang="css">
</style>
