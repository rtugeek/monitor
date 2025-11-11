<script setup lang="ts">
import type { ServerInfo } from '@/data/ServerInfo'
import { MonitorApi } from '@/api/MonitorApi'
import ElCloudSelect from '@/components/ElCloudSelect.vue'
import { useServerInfoStore } from '@/stores/useServerInfoStore'
import { ElMessage } from 'element-plus'
import { nextTick, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emits = defineEmits(['cancel', 'save'])
const { t } = useI18n()
const serverInfoStore = useServerInfoStore()
const server = defineModel<ServerInfo>({
  required: true,
})
const show = defineModel<boolean>('show')
const loading = ref(false)
const masterServer = ref(false)
const formRef = ref(null)

// 新增校验规则
const ipRegex = /^(?:25[0-5]|2[0-4]\d|[01]?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d?\d)){3}$/
const rules: Record<string, Array<any>> = {
  'name': [
    { required: true, message: t('server.validation.enterName'), trigger: 'blur' },
    { max: 30, message: t('server.validation.nameMax'), trigger: 'blur' },
  ],
  'ip': [
    {
      validator: (_rule: any, value: string) => {
        if (!value) {
          return Promise.reject(new Error(t('server.validation.enterIp')))
        }
        return ipRegex.test(value)
          ? Promise.resolve()
          : Promise.reject(new Error(t('server.validation.invalidIpv4')))
      },
      trigger: 'blur',
    },
  ],
  'api.url': [
    {
      validator: (_rule: any, value: string) => {
        if (!value) {
          return Promise.reject(new Error(t('server.validation.enterApiUrl')))
        }
        try {
          // 简单校验 URL 格式
          // 如果需要更严格可替换为更复杂的正则
          // eslint-disable-next-line no-new
          new URL(value)
          return Promise.resolve()
        }
        catch (e) {
          return Promise.reject(new Error(t('server.validation.invalidUrl')))
        }
      },
      trigger: 'blur',
    },
  ],
  'api.token': [
    { required: true, message: t('server.validation.enterToken'), trigger: 'blur' },
  ],
  // Add a new field for account under other information
  'account': [
    { required: false, message: t('server.validation.enterAccount'), trigger: 'blur' },
  ],
}

// 修改 save：先校验表单，校验通过才继续
async function save() {
  try {
    // 校验表单
    await (formRef.value as any)?.validate()
  }
  catch (err) {
    // 校验失败，直接返回（Element 会在表单项显示错误）
    return
  }

  try {
    loading.value = true
    server.value.cpu = await MonitorApi.getCpu(server.value.api)
    server.value.memery = await MonitorApi.getMem(server.value.api)
    server.value.os = await MonitorApi.getOs(server.value.api)
    await serverInfoStore.save(server)
    emits('save', server.value)
    if (masterServer.value) {
      serverInfoStore.setMasterServer(server.value.api)
    }
    show.value = false
  }
  catch (e: any) {
    ElMessage({
      message: e.message,
      type: 'error',
    })
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  nextTick().then(() => {
    (formRef.value as any)?.clearValidate()
  })
})
</script>

<template>
  <el-dialog v-model="show" :title="t('server.dialog.editServer')">
    <el-form ref="formRef" :model="server" :rules="rules" label-width="150">
      <!-- 名称 -->
      <el-form-item :label="t('server.table.server')" prop="name" required>
        <el-input v-model="server.name" :max-length="30" />
      </el-form-item>
      <!-- IP地址 -->
      <el-form-item :label="t('server.table.ip')" prop="ip" required>
        <el-input v-model="server.ip" />
      </el-form-item>
      <el-form-item :label="t('server.dialog.apiUrl')" prop="api.url" required>
        <el-input v-model="server.api.url" :placeholder="t('server.dialog.apiUrlPlaceholder')" />
      </el-form-item>
      <el-form-item :label="t('server.dialog.tokenPlaceholder')" prop="api.token" required>
        <el-input v-model="server.api.token" :placeholder="t('server.dialog.tokenPlaceholder')" />
      </el-form-item>
      <el-tooltip :content="t('server.dialog.tooltipMaster')" placement="left">
        <el-form-item :label="t('server.dialog.masterServer')">
          <el-switch v-model="masterServer" />
        </el-form-item>
      </el-tooltip>
      <!--      <el-form-item label="刷新间隔(S)" prop="token"> -->
      <!--        <el-input v-model="server.api.interval" placeholder="默认10秒" /> -->
      <!--      </el-form-item> -->
      <el-divider>{{ t('server.dialog.otherInfo') }}</el-divider>
      <!-- 云平台 -->
      <el-form-item :label="t('server.dialog.cloudPlatform')" prop="platform">
        <ElCloudSelect v-model="server.platform" />
      </el-form-item>
      <!--        &lt;!&ndash; ipV6 &ndash;&gt; -->
      <!--        <el-form-item label="IPv6" prop="ipV6"> -->
      <!--          <el-input v-model="server.ipV6" /> -->
      <!--        </el-form-item> -->
      <!-- 区域 -->
      <el-form-item :label="t('server.table.region')" prop="region">
        <el-input v-model="server.region" />
      </el-form-item>
      <el-form-item :label="t('server.dialog.createTime')" prop="createTime">
        <el-date-picker v-model="server.createTime" />
      </el-form-item>
      <el-form-item :label="t('server.dialog.expireTime')" prop="expireTime">
        <el-date-picker v-model="server.expireTime" />
      </el-form-item>
      <el-form-item :label="t('server.dialog.intranetIp')" prop="intranetIp">
        <el-input v-model="server.intranetIp" />
      </el-form-item>
      <el-form-item :label="t('server.dialog.note')" prop="note">
        <el-input v-model="server.note" />
      </el-form-item>
      <!-- Add the account field in the template -->
      <el-form-item :label="t('server.dialog.account')" prop="account">
        <el-input v-model="server.account" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="show = false">
        {{ t('server.dialog.cancel') }}
      </el-button>
      <el-button type="primary" @click="save">
        {{ t('server.dialog.save') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
