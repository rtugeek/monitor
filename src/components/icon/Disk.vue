<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  size: { type: [Number, String], default: undefined },
  width: { type: [Number, String], default: undefined },
  height: { type: [Number, String], default: undefined },
})

// size has the highest priority
function toCss(val: number | string | undefined) {
  if (val === undefined) {
    return '1em'
  }
  const n = Number(val as any)
  // treat numeric values and numeric strings as px values
  if (!Number.isNaN(n)) {
    return `${n}px`
  }
  return String(val)
}

const computedWidth = computed(() => toCss(props.size ?? props.width ?? undefined))
const computedHeight = computed(() => toCss(props.size ?? props.height ?? undefined))
</script>

<template>
  <svg
    t="1763692948650" class="icon" viewBox="0 0 1246 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
    p-id="7555"
    :width="computedWidth"
    :height="computedHeight"
  >
    <path
      d="M0 619.272725L280.550575 76.574491A83.459936 83.459936 0 0 1 356.373927 27.875619h461.324796a83.459936 83.459936 0 0 1 76.115461 49.283092L1168.439104 619.230995H0z"
      fill="#E1E3E6" p-id="7556"
    />
    <path
      d="M0 584.720311m41.729968 0l1084.979168 0q41.729968 0 41.729968 41.729968l0 271.662092q0 41.729968-41.729968 41.729968l-1084.979168 0q-41.729968 0-41.729968-41.729968l0-271.662092q0-41.729968 41.729968-41.729968Z"
      fill="#AAAAAA" p-id="7557"
    />
    <path
      d="M34.385494 584.720311h1099.668116v279.006566a41.729968 41.729968 0 0 1-41.729968 41.729968H76.115462a41.729968 41.729968 0 0 1-41.729968-41.729968v-279.006566z"
      fill="#2C2C2C" p-id="7558"
    />
    <path
      d="M224.507228 745.046848m-51.536511 0a51.53651 51.53651 0 1 0 103.073021 0 51.53651 51.53651 0 1 0-103.073021 0Z"
      fill="#000000" p-id="7559"
    />
    <path
      d="M224.507228 745.046848m-51.536511 0a51.53651 51.53651 0 1 0 103.073021 0 51.53651 51.53651 0 1 0-103.073021 0Z"
      fill="#6DD400" p-id="7560"
    />
  </svg>
</template>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle
}

.port-icon {
  display: inline-block;
  vertical-align: middle
}
</style>
