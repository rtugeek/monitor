<script lang="ts" setup>
import { MonitorApi } from '@/api/MonitorApi'
import BaseView from '@/components/BaseView.vue'
import { useServerInfoStore } from '@/stores/useServerInfoStore'
import { NotificationUtils } from '@/utils/NotificationUtils'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const serverInfoStore = useServerInfoStore()
const { syncServerConfig } = storeToRefs(serverInfoStore)

const url = ref<string>(syncServerConfig.value?.url ?? '')
const token = ref<string>(syncServerConfig.value?.token ?? '')

const loading = ref(false)
async function onSubmit() {
  if (loading.value) {
    return
  }
  loading.value = true
  NotificationUtils.loading()
  const newConfig = {
    url: url.value,
    token: token.value,
  }
  syncServerConfig.value = newConfig
  try {
    const servers = await MonitorApi.getServers(newConfig)
    await serverInfoStore.saveAll(servers)
    NotificationUtils.success("同步成功")
  }
  catch (e) {
    console.error(e)
    NotificationUtils.toastError(e.message)
  }
  finally {
    loading.value = false
    NotificationUtils.hide()
  }
}
</script>

<template>
  <BaseView title="同步设置">
    <div style="padding: 8px 16px;overflow: auto">
      <NutForm>
        <nut-form-item label="服务地址" prop="token">
          <nut-input v-model="url" placeholder="http://127.0.0.1:5549/api/monitor" />
        </nut-form-item>
        <nut-form-item label="Token" prop="token">
          <nut-input v-model="token" placeholder="令牌" />
        </nut-form-item>
      </NutForm>
      <div class="flex gap-2" style="margin: 20px 0;">
        <nut-button type="primary" class="flex-1" @click="onSubmit">
          同步
        </nut-button>
      </div>
    </div>
  </BaseView>
</template>

<style scoped></style>
