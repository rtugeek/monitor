<script setup lang="ts">
import CircleProgress from "@/widgets/base-panel/CircleProgress.vue";
defineProps({
  title:String,
  progress:Number,
  subtitle:String
})
</script>

<template>
  <div class="flex flex-col items-center">
    <div>{{title}}</div>
    <circle-progress :progress="progress" style="height:60px;"/>
    <div>{{ subtitle }}</div>
  </div>
</template>

<style scoped>
</style>