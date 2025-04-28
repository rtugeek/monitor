<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'

const modelValue = defineModel({ default: new Date() })
const textModel = ref<string>(dayjs().format('YYYY年MM月DD日'))
const showDateTimePicker = ref(false)
const selectedDateTime = ref(modelValue.value)

function onDateTimeConfirm() {
  textModel.value = dayjs(selectedDateTime.value).format('YYYY年MM月DD日')
  modelValue.value = selectedDateTime.value
  showDateTimePicker.value = false
}

function formatter(type: string, option: any) {
  switch (type) {
    case 'year':
      option.text += '年'
      break
    case 'month':
      option.text += '月'
      break
    case 'day':
      option.text += '日'
      break
    case 'hour':
      option.text += '时'
      break
    case 'minute':
      option.text += '分'
      break
    default:
      option.text += ''
  }
  return option
}
</script>

<template>
  <nut-input
    v-model="textModel" readonly placeholder="日期" @click="showDateTimePicker = true"
    @focus="showDateTimePicker = true"
  >
    <template #left>
      <slot name="left" />
    </template>
  </nut-input>
  <nut-popup v-model:visible="showDateTimePicker" position="bottom">
    <nut-date-picker
      v-model="selectedDateTime"
      type="date"
      :formatter="formatter"
      :three-dimensional="false"
      @confirm="onDateTimeConfirm"
      @cancel="showDateTimePicker = false"
    />
  </nut-popup>
</template>

<style scoped lang="scss">

</style>
