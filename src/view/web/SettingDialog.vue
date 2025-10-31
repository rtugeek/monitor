<script setup lang="ts">
import { useServerInfoStore } from '@/stores/useServerInfoStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emits = defineEmits(['close'])
const serverInfoStore = useServerInfoStore()
const { masterServerConfig, config } = storeToRefs(serverInfoStore)
const url = ref<string>(masterServerConfig.value?.url ?? '')
const token = ref<string>(masterServerConfig.value?.token ?? '')
const showModel = defineModel<boolean>()
function close() {
  showModel.value = false
  emits('close')
}
const loading = ref(false)
async function save() {
  masterServerConfig.value = {
    url: url.value,
    token: token.value,
  }
  if (loading.value) {
    return
  }
  loading.value = true
  const newConfig = {
    url: url.value,
    token: token.value,
  }
  masterServerConfig.value = newConfig
  try {
    await serverInfoStore.fetchFromServer()
    ElNotification({
      title: t('setting.success'),
      message: t('setting.syncSuccess'),
      type: 'success',
    })
    close()
  }
  catch (e) {
    console.error(e)
    ElNotification({
      title: t('setting.fail'),
      message: e.message,
      type: 'error',
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <el-dialog v-model="showModel" :title="t('setting.title')">
    <ElForm label-width="120">
      <el-form-item :label="t('setting.masterServerAddress')" prop="token">
        <el-input v-model="url" :placeholder="t('server.dialog.apiUrlPlaceholder')" />
      </el-form-item>
      <el-form-item :label="t('server.dialog.tokenPlaceholder')" prop="token">
        <el-input v-model="token" :placeholder="t('server.dialog.tokenPlaceholder')" />
      </el-form-item>
      <el-form-item :label="t('setting.hideIp')">
        <el-switch v-model="config.maskIp" />
      </el-form-item>
    </ElForm>
    <template #footer>
      <el-button @click="close">
        {{ t('server.dialog.cancel') }}
      </el-button>
      <el-button v-loading="loading" type="primary" @click="save">
        {{ t('server.dialog.save') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
