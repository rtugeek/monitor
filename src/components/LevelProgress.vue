<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
  },
})

const color = computed(() => {
  if (props.percentage > 90) { return '#ff4d4f' } // danger (red)
  if (props.percentage > 60) { return '#ffa940' } // warning (orange)
  if (props.percentage < 20) { return '#52c41a' } // success (green)
  return '#1890ff' // info (blue)
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
