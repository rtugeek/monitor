<script setup lang="ts">
import type { ServerInfo } from '@/data/ServerInfo'
import { MonitorApi } from '@/api/MonitorApi'
import BaseView from '@/components/BaseView.vue'
import CloudInput from '@/components/CloudInput.vue'
import DateInput from '@/components/DateInput.vue'
import { ServerInfoRepository } from '@/data/repository/ServerInfoRepository'
import { useServerInfoStore } from '@/stores/useServerInfoStore'
import { IpUtils } from '@/utils/IpUtils'
import { NotificationUtils } from '@/utils/NotificationUtils'
import { Help } from '@icon-park/vue-next'
import { showDialog } from '@nutui/nutui'
import { BrowserWindowApi } from '@widget-js/core'
import dayjs from 'dayjs'
import { ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import '@nutui/nutui/dist/packages/dialog/style'

const route = useRoute()
const formRef = ref()
const serverStore = useServerInfoStore()
// 创建响应式数据
const server = ref<ServerInfo>({
  name: '',
  ip: '',
  platform: '',
  note: '',
  ipV6: '',
  region: '',
  api: {
    token: '',
    url: '',
    interval: 10,
  },
  expireTime: dayjs().add(1, 'years').toDate(),
  intranetIp: '',
})

const editMode = ref(false)
if (route.query.id) {
  ServerInfoRepository.get(route.query.id as string).then((data) => {
    if (data) {
      editMode.value = true
      if (!data.api) {
        data.api = toRaw(server.value.api)
      }
      server.value = data
    }
  })
}

const rules = {
  name: [
    { required: true, message: '请输入名称' },
    { max: 30, message: '名称不能超过30个字符' },
  ],
  ip: [
    { required: true, message: '请输入IP地址' },
    { pattern: IpUtils.ipv4Regex, message: '请输入正确的IPv4地址' },
  ],
}
const loading = ref(false)

// 保存数据处理
async function onSubmit() {
  try {
    if (loading.value) {
      return
    }
    NotificationUtils.loading()
    loading.value = true
    const osData = await MonitorApi.getOs(server.value.api)
    const mem = await MonitorApi.getMem(server.value.api)
    const cpu = await MonitorApi.getCpu(server.value.api)
    formRef.value?.validate().then(({ valid, errors }) => {
      if (valid) {
        server.value.memery = mem
        server.value.cpu = cpu
        server.value.os = osData
        serverStore.save(server).then(() => {
          BrowserWindowApi.close()
        })
      }
    })
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

const showDeleteConfirm = ref(false)
function onDelete() {
  showDialog({
    title: '确定要删除吗？',
    content: `${server.value.name}:${server.value.ip}`,
    onCancel: () => {

    },
    onOk: async () => {
      await serverStore.remove(server.value.id)
      BrowserWindowApi.close()
    },
  })
}
</script>

<template>
  <BaseView title="服务器编辑">
    <nut-dialog
      v-model:visible="showDeleteConfirm"
      title="确定要删除吗？"
      :content="server.name"
    />
    <div style="padding: 8px 16px;overflow: auto">
      <nut-form ref="formRef" v-model="server" :rules="rules">
        <!-- 名称 -->
        <nut-form-item label="名称" prop="name" required>
          <nut-input v-model="server.name" max-length="30" />
        </nut-form-item>
        <!-- IP地址 -->
        <nut-form-item label="IP地址" prop="ip" required>
          <nut-input v-model="server.ip" />
        </nut-form-item>
        <!-- 云平台 -->
        <nut-form-item label="云平台" prop="platform">
          <CloudInput v-model="server.platform" />
        </nut-form-item>
        <!--        &lt;!&ndash; ipV6 &ndash;&gt; -->
        <!--        <nut-form-item label="IPv6" prop="ipV6"> -->
        <!--          <nut-input v-model="server.ipV6" /> -->
        <!--        </nut-form-item> -->
        <!-- 区域 -->
        <nut-form-item label="区域" prop="region">
          <nut-input v-model="server.region" />
        </nut-form-item>
        <nut-form-item label="创建时间" prop="createTime">
          <DateInput v-model="server.createTime" />
        </nut-form-item>
        <nut-form-item label="过期时间" prop="expireTime">
          <DateInput v-model="server.expireTime" />
        </nut-form-item>
        <nut-form-item label="内网IP" prop="intranetIp">
          <nut-input v-model="server.intranetIp" />
        </nut-form-item>
        <nut-form-item label="备注" prop="note">
          <nut-input v-model="server.note" />
        </nut-form-item>
      </nut-form>
      <div
        class="form-item cursor-pointer"
        @click="BrowserWindowApi.openUrl('https://github.com/rtugeek/monitor-server', { external: true })"
      >
        <h5>监控服务器地址</h5>
        <Help />
      </div>
      <nut-form>
        <nut-form-item label="服务地址" prop="token">
          <nut-input v-model="server.api.url" placeholder="http://127.0.0.1:5549/api/monitor" />
        </nut-form-item>
        <nut-form-item label="Token" prop="token">
          <nut-input v-model="server.api.token" placeholder="令牌" />
        </nut-form-item>
        <nut-form-item label="刷新间隔(S)" prop="token">
          <nut-input v-model="server.api.interval" placeholder="默认10秒" />
        </nut-form-item>
      </nut-form>
      <div class="flex gap-2" style="margin: 20px 0;">
        <nut-button v-if="editMode" type="danger" class="flex-1" @click="onDelete">
          删除
        </nut-button>
        <nut-button type="primary" class="flex-1" @click="onSubmit">
          保存
        </nut-button>
      </div>
    </div>
  </BaseView>
</template>

<style scoped>
</style>
