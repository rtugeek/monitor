<script setup lang="ts">
import type { ServerPlatform } from '@/data/ServerInfo'
import { ref } from 'vue'

const showPicker = ref(false)
const model = defineModel<ServerPlatform | string>()

function onConfirm(value: ServerPlatform) {
  model.value = value
}

const columns = ref<{ text: string, value: ServerPlatform | string }[]>([
  { text: 'AWS', value: 'AWS' },
  { text: 'Alibaba Cloud', value: 'Alibaba Cloud' },
  { text: 'Azure', value: 'Azure' },
  { text: 'Tencent Cloud', value: 'Tencent Cloud' },
  { text: 'Google Cloud', value: 'Google Cloud' },
  { text: 'Huawei Cloud', value: 'Huawei Cloud' },
  { text: 'UCloud', value: 'UCloud' },
  { text: '天翼云', value: '天翼云' },
  { text: 'Other', value: 'Other' },
])
</script>

<template>
  <el-select
    v-model="model" readonly placeholder="选择云服务商" @click="showPicker = true"
    @focus="showPicker = true"
  >
    <el-option
      v-for="item in columns"
      :key="item.value"
      :label="item.text"
      :value="item.value"
    />
  </el-select>
</template>

<style scoped>

</style>
