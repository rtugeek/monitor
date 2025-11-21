<script setup lang="ts">
import { ColorUtils } from '@/utils/ColorUtils'
import { computed } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
  },
})

const color = computed(() => {
  return ColorUtils.getProcessColor(props.percentage)
})

const fixedPercentage = computed(() => {
  if (props.percentage == undefined) {
    return 0
  }
  return props.percentage
})

function format(value: number) {
  return `${value.toFixed(1)}%`
}
</script>

<template>
  <el-progress :percentage="fixedPercentage" :color="color" :format="format" />
</template>

<style scoped>

</style>
