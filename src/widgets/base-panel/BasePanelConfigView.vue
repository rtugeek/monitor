<script setup lang="ts">
import {useWidget,WidgetConfigOption} from "@widget-js/vue3";

const {widgetParams} = useWidget()
const widgetConfigOption = new WidgetConfigOption({
  showFooter: false,
  custom: false,
  theme: {
    fontSize: [8,24],
    borderRadius: true,
  },
})
</script>

<template>
 <WidgetEditDialog :widget-params="widgetParams" :option="widgetConfigOption"/>
</template>

<style scoped>

</style>