<script setup lang="ts">

import {nextTick, onMounted, ref, watch} from "vue";
import {TransitionPresets, useTransition} from "@vueuse/core";

const props = defineProps({
  progress: {
    type: Number,
    default: 0.5
  },
  strokeWidth: {
    type: Number,
    default: 100 * 0.12
  },
})

const startDeg = 15
const maxDeg = 360 - 15
const totalDeg = 360 - 30
const canvasRef = ref<HTMLCanvasElement>()
const animProgress = useTransition(()=>props.progress,{  transition: TransitionPresets.easeInOutCubic,duration: 1000})
watch(animProgress, (progress)=>{
  draw(progress)
})

const deg2rad = (deg: number)=>{
  return deg * Math.PI / 180
}
const draw = (progress: number)=>{
  const progressRad = deg2rad(progress * totalDeg)
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = (canvas.width/2) * 0.8
  ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.save()
  ctx.translate(centerX, centerY);
  ctx.rotate(deg2rad(90));

  // draw backgroun border
  ctx.beginPath();
  const startRad = deg2rad(startDeg);
  ctx.arc(0, 0, radius, startRad, deg2rad(maxDeg));
  ctx.strokeStyle = 'rgba(222,222,222,0.4)';
  ctx.lineWidth = props.strokeWidth;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Create a radial gradient
  const gradient = ctx.createConicGradient(0, 0, 0);
  gradient.addColorStop(0, '#2cd228');
  gradient.addColorStop(0.3, '#2cd228');
  gradient.addColorStop(0.6, '#ffaf42');
  gradient.addColorStop(0.8, '#ffaf42');
  gradient.addColorStop(0.9, '#ff682d');
  gradient.addColorStop(1, '#ff492d');

  // Draw the circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, startRad, startRad + progressRad);
  ctx.strokeStyle = gradient;
  ctx.lineCap = 'round';
  ctx.lineWidth = props.strokeWidth;
  ctx.stroke();
  ctx.restore()

}
onMounted(async ()=>{
  await nextTick()
  draw(0)
})

</script>

<template>
  <div class="circle-progress">
    <canvas ref="canvasRef" width="100" height="100">
    </canvas>
    <div class="label">{{ Math.round(progress * 100)}}%</div>
  </div>
</template>

<style scoped>
.circle-progress{
  position: relative;
  width: 60px;
  height: 60px;
  max-width: 60px;
}
canvas{
  position: absolute;
  width: 60px;
}

.label{
  position: absolute;
  top: 50%;
  left: 50%;
  user-select: none;
  transform: translate(-50%,-50%);
  font-size: 12px;
  font-weight: bold;
}
</style>