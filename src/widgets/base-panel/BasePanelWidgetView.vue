<template>
  <widget-wrapper>
    <div class="flex flex-col p-2 h-full box-border">
      <div class="header pb-1 mb-1">
        <div class="text-md font-bold">Base Panel</div>
      </div>
      <div class="w-full" style="border: aliceblue"></div>
      <div class="flex gap-2 flex-1 items-center">
        <HardwareProgress title="CPU" :progress="cpuPercent" :subtitle="`${cpuCoreNumber} C`"/>
        <HardwareProgress title="Mem" :progress="memPercent" :subtitle="`${memTotal} GB`"/>
        <HardwareProgress title="GPU" :progress="gpuPercent" :subtitle="`${gpuCoreTemperature} ℃`"/>
      </div>
    </div>
  </widget-wrapper>
</template>

<script lang="ts" setup>
import {useWidget} from '@widget-js/vue3';
import {useTimeoutPoll} from "@vueuse/core";
import {ref} from "vue";
import HardwareProgress from "@/widgets/base-panel/HardwareProgress.vue";
import {SystemApi} from "@widget-js/core";

useWidget();
const cpuCoreNumber = ref(0)
const cpuPercent = ref(0)
const memPercent = ref(0)
const gpuPercent = ref(0)
const gpuCoreTemperature = ref(0)
const memTotal = ref(0)
const load = ()=>{
  SystemApi.getHardwareSensor('Cpu','Load').then((res)=>{
    cpuCoreNumber.value = res.length - 2
    const cpuTotalLoad = res.find((item)=>item.text === 'CPU Total');
    if (cpuTotalLoad) {
      cpuPercent.value = Number.parseInt(cpuTotalLoad.value.replace("%","")) / 100
    }
  })

  SystemApi.getHardware('Memory').then(res=>{
    const load = res[0].children.find(it=> it.text == 'Load')
    const data = res[0].children.find(it=> it.text == 'Data')
    if (load) {
      let memoryLoad = load.children.find(it=> it.text == 'Memory');
      memPercent.value = Number.parseInt(memoryLoad.value.replace("%","")) / 100
    }
    if (data) {
      const used = Number.parseInt(data.children.find(it=> it.text == "Memory Used").value.replace("GB",""));
      const available = Number.parseInt(data.children.find(it=> it.text == "Memory Available").value.replace("GB",""));
      memTotal.value = used + available
    }
  })

  SystemApi.getHardware('Gpu').then(res=>{
    const gpuLoad = res[0].children.find(it=> it.text == 'Load')
    const gpuTemperature = res[0].children.find(it=> it.text == 'Temperatures')
    if (gpuLoad) {
      const coreLoad = gpuLoad.children.find(it=> it.text == 'GPU Core');
      if (coreLoad) {
        gpuPercent.value = Number.parseInt(coreLoad.value.replace("%","")) / 100
      }
    }
    if (gpuTemperature) {
      console.log(gpuTemperature)
      const coreTemperature = gpuTemperature.children.find(it=> it.text == 'GPU Core');
      if (coreTemperature) {
        let value = Number.parseInt(coreTemperature.value.replace("℉",""));
        // 将华氏度转换为摄氏度
        gpuCoreTemperature.value = Math.round((value - 32) / 1.8)
      }
    }
  })
}

useTimeoutPoll(load, 2000,{immediate:true})
</script>

<style scoped>
.header{
  border-bottom: solid 1px var(--widget-border-color, #fff);
}
</style>
