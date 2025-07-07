<script lang="ts" setup>
import ArrowLabel from '@/widgets/energy-label/ArrowLabel.vue'
import CurrentLabel from '@/widgets/energy-label/CurrentLabel.vue'
import MonitorBlock from '@/widgets/energy-label/MonitorBlock.vue'
import { useStorage } from '@vueuse/core'
import { useWidget } from '@widget-js/vue3'
import { ref } from 'vue'

useWidget()
const productor = useStorage('energy-label-productor', '牛马冬')
const spec = useStorage('energy-label-spec', '996-007')
const currentLevel = ref(1)
const colors = ['#1b814a', '#93bd30', '#f8d701', '#f8a002', '#e30f1b']
const currentColor = ref(colors[0])
const currentTop = ref('0')
function onMonitorUpdate(data: { cpuPercent: number, memPercent: number }) {
  currentLevel.value = Math.ceil((data.cpuPercent * 0.8 + data.memPercent * 0.2) / 20)
  currentLevel.value = Math.max(1, currentLevel.value)
  currentColor.value = colors[currentLevel.value - 1]
  const heightStep = 30 + 6
  currentTop.value = `${Math.round(heightStep * (currentLevel.value - 1))}px`
}
</script>

<template>
  <widget-wrapper>
    <div class="content flex flex-col gap-2 items-center">
      <div class="title">
        打工能耗标识
        <div class="sub-title">
          WORK ENERGY LABEL
        </div>
      </div>

      <div class="flex flex-col w-full gap-1 items-center">
        <div class="input-line">
          <div class="label">
            生产者名称：
          </div>
          <div class="value">
            {{ productor }}
          </div>
        </div>
        <div class="input-line">
          <div class="label">
            规 格 型 号：
          </div>
          <div class="value">
            {{ spec }}
          </div>
        </div>
      </div>
      <div class="block w-full">
        <div class="flex w-full gap-2">
          <div class="flex flex-col" style="box-sizing:border-box;padding: 4px 0;justify-content: space-between;height: calc(30px * 5 + 6px * 4)">
            <b>能耗低</b>
            <b>中&nbsp;&nbsp;&nbsp;等</b>
            <b>能耗高</b>
          </div>
          <div class="flex flex-1 flex-col" style="gap: 6px">
            <ArrowLabel :number="1" style="width: 40px" />
            <ArrowLabel :number="2" color="#93bd30" style="width: 60px" />
            <ArrowLabel :number="3" color="#f8d701" style="width: 80px" />
            <ArrowLabel :number="4" color="#f8a002" style="width: 100px" />
            <ArrowLabel :number="5" color="#e30f1b" style="width: 120px" />
          </div>
          <div ref="currentContainerRef" class="relative">
            <CurrentLabel :color="currentColor" class="current-level" :level="currentLevel" label="级" />
          </div>
        </div>
      </div>
      <MonitorBlock @update="onMonitorUpdate" />
      <div>依据国际标准：YYDS 350628-2025</div>
    </div>
  </widget-wrapper>
</template>

<style lang="scss">
.content {
  padding: 1rem 1.5rem;
  color: white;
  font-size: var(--widget-font-size);
}

.title{
  text-align: center;
  font-size: 2em;
  font-weight: bold;
}
.sub-title{
  font-size: 0.5em;
  text-align: center;
}
.widget-background-mask{
  background-color: #0d9cd0;
}

.current-level{
  position: absolute;
  top: v-bind(currentTop);
  transition: all 0.8s ease-in-out;
}

.input-line{
  width: 80%;
  display: flex;
  font-size: 14px;
  gap: 0;
  .label{
    width: 90px;
  }
  .value{
    flex: 1;
    border-bottom: 1px solid white;
    text-align: center;
  }
}

.block{
  background: white;
  padding: 16px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: black;
  display: flex;
  flex-direction: column;
  text-align: left;
  .title{
    font-size: 0.9rem;
  }
  hr{
    width: 100%;
    border-bottom: 1px solid black;
  }
}
</style>
