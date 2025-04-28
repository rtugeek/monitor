<script setup lang="ts">
import type { ServerPlatform } from '@/data/ServerInfo'
import CloudPicker from '@/components/CloudPicker.vue'
import { ref } from 'vue'

const showPicker = ref(false)
const model = defineModel<ServerPlatform | string>()

function onConfirm(value: ServerPlatform) {
  model.value = value
}
</script>

<template>
  <nut-input
    v-model="model" readonly placeholder="选择云服务商" @click="showPicker = true"
    @focus="showPicker = true"
  >
    <template #left>
      <slot name="left" />
    </template>
  </nut-input>
  <CloudPicker v-model="showPicker" @confirm="onConfirm" />
</template>

<style scoped>

</style>
