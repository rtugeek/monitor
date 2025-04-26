<template>
  <widget-edit-dialog
    :widget-params="widgetParams"
    :option="widgetConfigOption"
  >
  </widget-edit-dialog>
</template>

<script lang="ts" setup>
import { useWidget, WidgetConfigOption } from '@widget-js/vue3';

const { widgetParams } = useWidget();

//修改成需要设置组件参数配置
const widgetConfigOption = new WidgetConfigOption({
  theme: {
    backgroundColor: true,
    borderRadius: true,
    color: true,
  },
});
</script>

<style scoped></style>
