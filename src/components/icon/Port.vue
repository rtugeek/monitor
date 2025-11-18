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
    :width="computedWidth"
    :height="computedHeight"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    class="icon port-icon"
    role="img"
    aria-hidden="false"
  >
    <path d="M751.146667 256l-35.84-77.44a42.666667 42.666667 0 0 0-38.613334-24.96H347.306667a42.666667 42.666667 0 0 0-38.613334 24.96L272.853333 256A42.666667 42.666667 0 0 1 234.666667 281.6H107.733333a42.666667 42.666667 0 0 0-42.666666 42.666667v490.666666a42.666667 42.666667 0 0 0 42.666666 42.666667h810.666667a42.666667 42.666667 0 0 0 42.666667-42.666667v-490.666666a42.666667 42.666667 0 0 0-42.666667-42.666667H789.333333a42.666667 42.666667 0 0 1-38.186666-25.6z" fill="#ED7D31" />
    <path d="M150.4 420.266667m42.666667 0l640 0q42.666667 0 42.666666 42.666666l0 213.333334q0 42.666667-42.666666 42.666666l-640 0q-42.666667 0-42.666667-42.666666l0-213.333334q0-42.666667 42.666667-42.666666Z" fill="#FBAC48" />
    <path d="M275.2 548.266667h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v149.333333h-85.333333v-149.333333a21.333333 21.333333 0 0 1 21.333333-21.333333zM491.733333 548.266667h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v149.333333h-85.333333v-149.333333a21.333333 21.333333 0 0 1 21.333333-21.333333zM698.666667 548.266667h42.666666a21.333333 21.333333 0 0 1 21.333334 21.333333v149.333333h-85.333334v-149.333333a21.333333 21.333333 0 0 1 21.333334-21.333333z" fill="#FFFFFF" />
  </svg>
</template>

<style scoped>
.icon{display:inline-block;vertical-align:middle}
.port-icon{display:inline-block;vertical-align:middle}
</style>
