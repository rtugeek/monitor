<script setup lang="ts">
import type { ServerInfo } from '@/data/ServerInfo'
import BaseLayout from '@/components/BaseLayout.vue'
import ServerHardwareCard from '@/components/ServerHardwareCard.vue'
import ServerOsInfoCard from '@/components/ServerOsInfoCard.vue'
import ServerPortCard from '@/components/ServerPortCard.vue'
import ServerProcessCard from '@/components/ServerProcessCard.vue'
import { useServerInfoStore } from '@/stores/useServerInfoStore'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.query.id
const serverInfoStore = useServerInfoStore()
const server = ref<ServerInfo>()

onMounted(() => {
  if (id) {
    serverInfoStore.getById(id as string).then((data) => {
      server.value = data
    })
  }
})
</script>

<template>
  <BaseLayout>
    <el-row v-if="server" :gutter="12">
      <el-col :span="8">
        <ServerOsInfoCard :server="server" />
      </el-col>
      <el-col :span="8">
        <ServerHardwareCard :server="server" />
      </el-col>
      <el-col :span="8">
        <ServerPortCard v-model="server" />
      </el-col>
      <el-col />
    </el-row>
    <el-row v-if="server" class="mt-4">
      <el-col :span="24">
        <ServerProcessCard :server="server" />
      </el-col>
    </el-row>
  </BaseLayout>
</template>

<style scoped>

</style>
