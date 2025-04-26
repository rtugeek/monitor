<template>
  <widget-wrapper>
    <div class="content">Hello World!</div>
  </widget-wrapper>
</template>

<script lang="ts" setup>
import { useWidget } from '@widget-js/vue3';

const { widgetParams } = useWidget();
</script>

<style scoped>
.content {
  padding: 1rem;
  color: var(--widget-color);
}
</style>
