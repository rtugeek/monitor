<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { useWidget, WidgetConfigOption } from '@widget-js/vue3'

const { widgetParams } = useWidget()
const title = useStorage('energy-label-productor', '牛马冬')
const spec = useStorage('energy-label-spec', '996-007')
// 修改成需要设置组件参数配置
const widgetConfigOption = new WidgetConfigOption({
  theme: {
    fontSize: [8, 24],
    backgroundColor: false,
    borderRadius: true,
    color: false,
  },
})
</script>

<template>
  <widget-edit-dialog
    :widget-params="widgetParams"
    :option="widgetConfigOption"
  >
    <template #custom>
      <el-form label-width="100">
        <el-form-item label="生产者名称">
          <el-input v-model="title" placeholder="" :maxlength="10" />
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model="spec" placeholder="" :maxlength="10" />
        </el-form-item>
      </el-form>
    </template>
  </widget-edit-dialog>
</template>

<style scoped></style>
