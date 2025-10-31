<script setup lang="ts">
import { IconPark } from '@icon-park/vue-next/es/all'

const props = defineProps({
  size: {
    type: Number,
    default: 16,
  },
  type: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: '',
  },
})

function open() {
  if (props.link) {
    window.open(props.link, '_blank')
  }
}
</script>

<template>
  <IconPark :type="type" :size="size" class="cursor-pointer" theme="filled" @click="open" />
</template>

<style scoped>

</style>
