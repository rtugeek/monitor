<script setup lang="ts">
import { useTimeoutPoll } from '@vueuse/core'
import { SystemApi } from '@widget-js/core'
import { ref } from 'vue'

const emits = defineEmits(['update'])
const cpuPercent = ref(0)
const memPercent = ref(0)
function load() {
  SystemApi.getHardware(['Memory', 'Cpu']).then((res) => {
    const cpu = res.find(it => it.hardwareType == 'Cpu')
    if (cpu) {
      const load = cpu.children.find(sensor => sensor.sensorType == 'Load')
      if (load) {
        const cpuTotalLoad = load.children?.find(it => it.text == 'CPU Total')
        if (cpuTotalLoad) {
          cpuPercent.value = cpuTotalLoad.value
        }
      }
    }

    const mem = res.find(it => it.hardwareType == 'Memory')
    if (mem) {
      const load = mem.children.find(sensor => sensor.sensorType == 'Load')
      if (load) {
        const memoryLoad = load.children?.find(it => it.text == 'Memory')
        if (memoryLoad) {
          memPercent.value = memoryLoad.value
        }
      }
    }
    emits('update', {
      cpuPercent: cpuPercent.value,
      memPercent: memPercent.value,
    })
  })
}

useTimeoutPoll(load, 3000, { immediate: true })
</script>

<template>
  <div class="block w-full">
    <b>
      能耗等级=CPU使用率*0.8+内存使用率*0.2
    </b>
    <hr>
    <div class="flex">
      CPU使用率：<span class="ml-auto">{{ Math.round(cpuPercent) }}%</span>
    </div>
    <div class="flex">
      内存使用率：<span class="ml-auto">{{ Math.round(memPercent) }}%</span>
    </div>
  </div>
</template>

<style scoped>

</style>
