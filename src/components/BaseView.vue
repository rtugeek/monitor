<script lang="ts" setup>
import { BrowserWindowApi } from '@widget-js/core'
import { Close, Left } from '@icon-park/vue-next'
import { useRoute, useRouter } from 'vue-router'
import { usePreferredDark } from '@vueuse/core'
import { AppUtils } from '@/utils/AppUtils'

const props = defineProps({
  title: String,
  leftShow: {
    type: Boolean,
    default: true,
  },
})

const isDark = usePreferredDark()

const router = useRouter()
function goBack() {
  AppUtils.back(router)
}

function mouseDown() {
  BrowserWindowApi.startDraggingWindow()
}

function mouseUp() {
  BrowserWindowApi.stopDraggingWindow()
}

function close() {
  window.close()
}

const route = useRoute()
</script>

<template>
  <NutConfigProvider :theme="isDark ? 'dark' : 'light'">
    <div class="base-view flex flex-col w-full">
      <div class="div" @mousedown="mouseDown" @mouseup="mouseUp">
        <nut-navbar fixed v-bind="{ ...props, leftShow: false }" style="height: 56px;font-size: 24px" @click-back="goBack">
          <template #left>
            <Left size="26" @click="goBack" />
          </template>
          <template #right>
            <div class="flex gap-2">
              <slot name="actions" />
              <nut-button v-electron plain size="small" @click="close">
                <Close />
              </nut-button>
            </div>
          </template>
        </nut-navbar>
      </div>
      <slot />
    </div>
  </NutConfigProvider>
</template>

<style scoped>
.base-view{
  width: 100vw;
  height: 100vh;
  background-color: var(--background-color);
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
