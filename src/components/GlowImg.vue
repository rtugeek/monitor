<script setup lang="ts">
const props = defineProps<{
  color: string
}>()
</script>

<template>
  <img class="glow-img" :style="`--glow-color: ${color};`" src="@/assets/logo.png">
</template>

<style scoped>
.glow-img {
  transition: all 0.3s ease-in-out;
  filter: drop-shadow(0 1px 0.4rem color-mix(in srgb, var(--glow-color) 50%, transparent));
  &:hover {
    filter: drop-shadow(0 1px 0.7rem color-mix(in srgb, var(--glow-color) 80%, transparent));
  }
}
</style>
