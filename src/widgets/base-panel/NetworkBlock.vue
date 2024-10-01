<script setup lang="ts">

import {BytesUtils} from "@/utils/BytesUtils";
import {ref} from "vue";
import {SystemApi} from "@widget-js/core";
const downloadSpeed = ref(0)
const uploadSpeed = ref(0)
const downloadedData = ref(0)
const uploadedData = ref(0)

const update = ()=>{
  SystemApi.getHardware('Network').then(res =>{
    let uploadTotalSpeed = 0
    let downloadTotalSpeed = 0
    let downloadedDataTotal = 0
    let uploadedDataTotal = 0

    let throughput = res.map(it=> it.children).flat().filter(it=> it.text == 'Throughput').map(it=> it.children).flat();
    let networkData = res.map(it=> it.children).flat().filter(it=> it.text == 'Data').map(it=> it.children).flat();
    const uploadSpeedSensorData = throughput.filter(it=> it.text == 'Upload Speed');
    const downloadSpeedSensorData = throughput.filter(it=> it.text == 'Download Speed');
    const downloadSensorData = networkData.filter(it=> it.text == 'Data Downloaded');
    const uploadedSensorData = networkData.filter(it=> it.text == 'Data Uploaded');
    uploadSpeedSensorData.forEach((item)=>{
      const speed =  BytesUtils.parseKilobyte(item.value);
      if (speed > 0) {
        uploadTotalSpeed += speed
      }
    })

    downloadSpeedSensorData.forEach((item)=>{
      const speed =  BytesUtils.parseKilobyte(item.value);
      if (speed > 0) {
        downloadTotalSpeed += speed
      }
    })

    downloadSensorData.forEach((item)=>{
      downloadedDataTotal += BytesUtils.parseKilobyte(item.value)
    })
    uploadedSensorData.forEach((item)=>{
      uploadedDataTotal += BytesUtils.parseKilobyte(item.value)
    })

    downloadedData.value = downloadedDataTotal
    uploadedData.value = uploadedDataTotal

    downloadSpeed.value = downloadTotalSpeed
    uploadSpeed.value = uploadTotalSpeed
  })
}
defineExpose({update})
</script>

<template>
  <div class="flex flex-col flex-1 justify-between h-full items-center">
    <div>Net</div>
    <div class="text-sm">↓: {{ BytesUtils.prettyKilobyte(downloadSpeed) }}</div>
    <div class="data">{{ BytesUtils.prettyKilobyte(downloadedData) }}</div>
    <div class="text-sm">↑: {{ BytesUtils.prettyKilobyte(uploadSpeed) }}</div>
    <div class="data">{{ BytesUtils.prettyKilobyte(uploadedData) }}</div>
  </div>
</template>

<style scoped>
.data{
  font-size: 12px;
  opacity: 0.6;
}
</style>