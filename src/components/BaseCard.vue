<script setup lang="ts">
defineProps({
  bodyHeight: {
    type: String,
    default: 'auto',
  },
})
</script>

<template>
  <el-card :body-style="`padding:0;height:${bodyHeight}`" shadow="hover">
    <div class="w-full h-full">
      <div class="flex items-center m-2">
        <div class="flex gap-2 items-center w-full">
          <slot name="header" />
        </div>
      </div>
      <slot />
    </div>
  </el-card>
</template>

<style scoped>

</style>
