<script setup lang="ts">
import type { ServerPlatform } from '@/data/ServerInfo'
import { ref } from 'vue'

const emits = defineEmits(['confirm'])
const modelVisible = defineModel<boolean>()
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

function confirm({ selectedValue }) {
  emits('confirm', selectedValue[0])
  modelVisible.value = false
}
</script>

<template>
  <nut-popup v-model:visible="modelVisible" position="bottom">
    <nut-picker :columns="columns" title="选择云服务商" @cancel="modelVisible = false" @confirm="confirm" />
  </nut-popup>
</template>

<style scoped>

</style>
