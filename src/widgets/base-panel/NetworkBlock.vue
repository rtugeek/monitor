<script setup lang="ts">

import {BytesUtils} from "@/utils/BytesUtils";
import {ref} from "vue";
import {type Hardware, SystemApi} from "@widget-js/core";
const downloadSpeed = ref(0)
const uploadSpeed = ref(0)
const downloadedData = ref('')
const uploadedData = ref('')

const update = (network: Hardware[])=>{
    let uploadTotalSpeed = 0
    let downloadTotalSpeed = 0
    let downloadedDataTotal = 0
    let uploadedDataTotal = 0

    let throughput = network.map(it=> it.children).flat().filter(it=> it.sensorType == 'Throughput').map(it=> it.children).flat();
    let networkData = network.map(it=> it.children).flat().filter(it=> it.sensorType == 'Data').map(it=> it.children).flat();
    const uploadSpeedSensorData = throughput.filter(it=> it.text == 'Upload Speed');
    const downloadSpeedSensorData = throughput.filter(it=> it.text == 'Download Speed');
    const downloadSensorData = networkData.filter(it=> it.text == 'Data Downloaded');
    const uploadedSensorData = networkData.filter(it=> it.text == 'Data Uploaded');
    uploadSpeedSensorData.forEach((item)=>{
      const speed =  item.value;
      if (speed > 0) {
        uploadTotalSpeed += speed
      }
    })

    downloadSpeedSensorData.forEach((item)=>{
      const speed =  item.value;
      if (speed > 0) {
        downloadTotalSpeed += speed
      }
    })

  let downloadDataUnit = 'B'
  let uploadDataUnit = 'B'
    downloadSensorData.forEach((item)=>{
      downloadedDataTotal += item.value
      downloadDataUnit = item.unit
    })
    uploadedSensorData.forEach((item)=>{
      uploadedDataTotal += item.value
      uploadDataUnit = item.unit
    })

    downloadedData.value = `${downloadedDataTotal.toFixed(2)}${downloadDataUnit}`
    uploadedData.value = `${uploadedDataTotal.toFixed(2)}${uploadDataUnit}`

    downloadSpeed.value = downloadTotalSpeed
    uploadSpeed.value = uploadTotalSpeed
}
defineExpose({update})

const needUpdate = ref(true)
</script>

<template>
  <div class="flex flex-col flex-1 justify-between h-full items-center">
    <div>Net</div>
    <div class="text-sm">↓: {{ BytesUtils.pretty(downloadSpeed) }}</div>
    <div class="data">{{ downloadedData }}</div>
    <div class="text-sm">↑: {{ BytesUtils.pretty(uploadSpeed) }}</div>
    <div class="data">{{ uploadedData }}</div>
  </div>
</template>

<style scoped>
.data{
  font-size: 12px;
  opacity: 0.6;
}
</style>