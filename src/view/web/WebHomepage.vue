<script setup lang="ts">
import type { ServerInfo } from '@/data/ServerInfo'
import IconParkLink from '@/components/IconParkLink.vue'
import { emptyServerInfo } from '@/data/ServerInfo'
import ServerDialog from '@/view/web/ServerDialog.vue'
import ServerTable from '@/view/web/ServerTable.vue'
import SettingDialog from '@/view/web/SettingDialog.vue'

import { Add, AllApplication, Book, Moon, Setting, Sun, Translate } from '@icon-park/vue-next'
import { useDark } from '@vueuse/core'
import { BrowserWindowApi } from '@widget-js/core'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()
const isDark = useDark()
const router = useRouter()

isDark.value = true

const currentServer = ref<ServerInfo>(JSON.parse(JSON.stringify(emptyServerInfo)))
const showServerDialog = ref(false)
const showSettingDialog = ref(false)

function onAddServerClicked() {
  currentServer.value = JSON.parse(JSON.stringify(emptyServerInfo))
  showServerDialog.value = true
}

function onEditServer(server: ServerInfo) {
  currentServer.value = JSON.parse(JSON.stringify(server))
  showServerDialog.value = true
}

function widgetPage() {
  const routeUrl = router.resolve({ path: '/widget/homepage' })
  window.open(routeUrl.href, '_blank')
}

function onDocClicked() {
  BrowserWindowApi.openUrl('https://widgetjs.cn/monitor/doc/quick-start.html', { external: true })
}
function setLocale(l: string) {
  locale.value = l
}
</script>

<template>
  <el-container>
    <el-header>
      <div class="flex items-center gap-4 px-4">
        <img src="@/assets/logo.png" alt="Monitor logo" style="width: 32px">
        <h3>{{ t('app.title') }}</h3>
        <span class="ml-auto" />
        <el-button link @click="onAddServerClicked">
          <div class="flex items-center gap-1">
            <Add /> {{ t('app.addServer') }}
          </div>
        </el-button>
        <el-button link @click="showSettingDialog = true">
          <div class="flex items-center gap-1">
            <Setting />{{ t('app.settings') }}
          </div>
        </el-button>
        <div style="margin: 12px 12px;height: 32px;border-right: 2px solid var(--el-border-color)" />
        <el-button link @click="onDocClicked">
          <template #icon>
            <Book />
          </template>{{ t('app.docs') }}
        </el-button>
        <el-button link @click="widgetPage">
          <template #icon>
            <AllApplication />
          </template> {{ t('app.widget') }}
        </el-button>
        <div style="margin: 12px 12px;height: 32px;border-right: 2px solid var(--el-border-color)" />
        <Moon v-if="isDark" class="cursor-pointer" size="20" @click="isDark = false" />
        <Sun v-else class="cursor-pointer" size="20" @click="isDark = true" />
        <el-dropdown placement="top">
          <Translate class="cursor-pointer" size="20" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click.prevent="setLocale('zh')">
                {{ t('app.chinese') }}
              </el-dropdown-item>
              <el-dropdown-item @click.prevent="setLocale('en')">
                {{ t('app.english') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <IconParkLink type="tencentQq" :size="20" link="https://qm.qq.com/cgi-bin/qm/qr?k=XW88uNiqeCZhmolqMQQZUwQndxysb6Tz&authKey=MUAYv7vDO6UMI74K86D8K7p7MIhSPraMG3ukeec8oFipm5qGO0NTIyPYMQp5iCt%2F&noverify=0&group_code=701784679" />
        <IconParkLink type="github" :size="20" link="https://github.com/rtugeek/monitor" />
      </div>
    </el-header>
    <el-main>
      <el-card shadow="hover" body-style="padding:0">
        <ServerTable @add="onAddServerClicked" @edit="onEditServer" />
      </el-card>
    </el-main>
    <ServerDialog v-model="currentServer" v-model:show="showServerDialog" />
    <SettingDialog v-model="showSettingDialog" />
  </el-container>
</template>

<style lang="css">
</style>
