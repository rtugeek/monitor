<script setup lang="ts">
import type { Systeminformation } from 'systeminformation'
import { IconUtils } from '@/utils/IconUtils'
import { defineProps } from 'vue'

defineProps<{
  os: Systeminformation.OsData
}>()
</script>

<template>
  <div class="os flex items-center gap-1 text-sm">
    <img :src="IconUtils.getOsIcon(os.distro)"> {{ os.distro }} {{ os.release }} {{ os.arch }}
  </div>
</template>

<style scoped lang="scss">
.os{
  font-size: 12px;
  img{
    width: 16px;
  }
}
</style>
