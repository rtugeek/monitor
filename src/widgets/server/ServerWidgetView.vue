<script lang="ts" setup>
import { useServerInfoStore } from '@/stores/useServerInfoStore'
import { WindowUtils } from '@/utils/WindowUtils'
import ServerComponent from '@/widgets/server/components/ServerComponent.vue'
import { Add, DownloadTwo } from '@icon-park/vue-next'
import { useWindowSize } from '@vueuse/core'
import { BrowserWindowApi, WidgetApi } from '@widget-js/core'
import { useContextMenu, useWidget } from '@widget-js/vue3'

useWidget()
const { height } = useWindowSize()
const serverInfoStore = useServerInfoStore()
useContextMenu({
  menus: [
    {
      label: '添加服务器',
      id: 'add',
    },
  ],
  onMenuClick(menu) {
    if (menu.id === 'add') {
      BrowserWindowApi.openUrl('/server/edit', {
        width: 400,
        height: 700,
        frame: true,
        transparent: false,
      })
    }
  },
})
</script>

<template>
  <widget-wrapper>
    <div id="widget-content" class="content flex flex-col gap-2">
      <div class="flex px-4 pt-4">
        <h4>服务器监控</h4>
        <span class="ml-auto" />
        <DownloadTwo class=" cursor-pointer" size="24" @click="WidgetApi.openConfigPage()" />
        <Add class="ml-3 cursor-pointer" size="24" @click="WindowUtils.open('/server/edit')" />
      </div>
      <el-scrollbar :height="height - 80">
        <div class="px-4 flex flex-col gap-2">
          <ServerComponent v-for="server in serverInfoStore.servers" :key="server.id" :server="server" />
        </div>
      </el-scrollbar>
    </div>
  </widget-wrapper>
</template>

<style scoped>
.content {
  color: var(--widget-color);
}
</style>
