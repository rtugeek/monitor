<template>
  <widget-wrapper>
    <div class="flex flex-col p-2 h-full box-border">
      <div class="header pb-1 mb-1">
        <div class="text-md font-bold">Monitor</div>
      </div>
      <div class="w-full" style="border: aliceblue"></div>

      <div class="flex flex-1 items-center">
        <template v-if="needUpdate">
          <div class="w-full text-center">请升级应用版本至{{targetVersion}}</div>
        </template>
        <template v-else>
        <HardwareProgress class="flex-1" title="CPU" :progress="cpuPercent" :subtitle="`${cpuCoreNumber} C`"/>
        <HardwareProgress class="flex-1" title="Mem" :progress="memPercent" :subtitle="`${memTotal} GB`"/>
        <HardwareProgress class="flex-1" title="GPU" :progress="gpuPercent" :subtitle="`${gpuCoreTemperature} ℃`"/>
        <NetworkBlock ref="networkRef"/>
        </template>
      </div>
    </div>
  </widget-wrapper>
</template>

<script lang="ts" setup>
import {useAppVersion, useWidget} from '@widget-js/vue3';
import {useTimeoutPoll} from "@vueuse/core";
import {ref} from "vue";
import HardwareProgress from "@/widgets/base-panel/HardwareProgress.vue";
import {SystemApi} from "@widget-js/core";
import NetworkBlock from "@/widgets/base-panel/NetworkBlock.vue";

useWidget();
const cpuCoreNumber = ref(0)
const cpuPercent = ref(0)
const networkRef = ref<InstanceType<typeof NetworkBlock>>()
const memPercent = ref(0)
const gpuPercent = ref(0)
const gpuCoreTemperature = ref(0)
const memTotal = ref(0)
const load = ()=>{
  SystemApi.getHardware(['Memory', 'Gpu' , 'Cpu' , 'Network']).then(res=>{
    const cpu = res.find(it => it.hardwareType == 'Cpu');
    if (cpu) {
      const load = cpu.children.find(sensor=> sensor.sensorType == 'Load')
      if (load) {
        const cpuTotalLoad = load.children.find(it=> it.text == 'CPU Total');
        cpuCoreNumber.value = load.children.length - 2
        if (cpuTotalLoad) {
          cpuPercent.value = cpuTotalLoad.value / 100
        }
      }
    }

    const mem = res.find(it => it.hardwareType == 'Memory');
    if (mem) {
      const load = mem.children.find(sensor=> sensor.sensorType == 'Load')
      if (load) {
        const memoryLoad = load.children.find(it=> it.text == 'Memory');
        if (memoryLoad) {
          memPercent.value = memoryLoad.value / 100
        }
      }

      const data = mem.children.find(sensor=> sensor.sensorType == 'Data')
      if (data) {
        const used = data.children.find(it=> it.text == "Memory Used").value
        const available = data.children.find(it=> it.text == "Memory Available").value
        memTotal.value = Math.ceil(used + available)
      }
    }

    const gpu = res.find(it => it.hardwareType.toLowerCase().startsWith("gpu"));
    if (gpu) {
      const load = gpu.children.find(sensor=> sensor.sensorType == 'Load')
      if (load) {
        const coreLoad = load.children.find(it=> it.text == 'GPU Core');
        if (coreLoad) {
          gpuPercent.value = coreLoad.value / 100
        }
      }

      const temperature = gpu.children.find(sensor=> sensor.sensorType == 'Temperature')
      if (temperature) {
        const coreTemperature = temperature.children.find(it=> it.text == 'GPU Core');
        if (coreTemperature) {
          gpuCoreTemperature.value = Math.round(coreTemperature.value)
        }
      }
    }

    networkRef.value?.update(res.filter(it => it.hardwareType == 'Network'))
  })
}

useTimeoutPoll(load, 3000,{immediate:true})

const appVersion = useAppVersion()
const needUpdate = ref(false)
const targetVersion = '24.10.6'
appVersion.isLessThan(targetVersion).then((result) => {
  needUpdate.value = result
})
</script>

<style>
body{
  font-size: var(--widget-font-size);
}
.header{
  border-bottom: solid 1px var(--widget-divider-color, #fff);
}
</style>
