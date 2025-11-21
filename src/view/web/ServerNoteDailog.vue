<script setup lang="ts">
import type { PortNote, RedisNote } from '@/data/ServerInfo'
import Redis from '@/components/icon/Redis.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  portNotes: { type: Array as () => PortNote[], default: () => [] },
  redisNotes: { type: Array as () => RedisNote[], default: () => [] },
})
const emit = defineEmits(['save'])
const visible = defineModel<boolean>('show')
const localPortNotes = ref<PortNote[]>([])
const localRedisNotes = ref<RedisNote[]>([])

watch(() => props.portNotes, (val) => {
  localPortNotes.value = val ? [...val] : []
}, { immediate: true })
watch(() => props.redisNotes, (val) => {
  localRedisNotes.value = val ? [...val] : []
}, { immediate: true })

// RedisNote dialog
const editingRedisNote = ref<RedisNote>({ db: 0, note: '' })
function addRedisNote() {
  editingRedisNote.value = { db: 0, note: '' }
  localRedisNotes.value.push({
    db: 0,
    note: '',
  })
}
function deleteRedisNote(index: number) {
  localRedisNotes.value.splice(index, 1)
}

function handleClose() {
  visible.value = false
}
function handleSave() {
  emit('save', localPortNotes.value, localRedisNotes.value)
  visible.value = false
}
</script>

<template>
  <el-dialog v-model="visible" title="编辑备注信息" width="700px" @close="handleClose">
    <el-divider />
    <div>
      <div class="flex items-center">
        <div class="flex gap-2 items-center">
          <Redis :size="24" /><h3>Redis备注</h3>
        </div>
        <el-button class="ml-auto" type="primary" size="small" @click="addRedisNote">
          新增备注
        </el-button>
      </div>
      <el-table :data="localRedisNotes" style="width: 100%" table-layout="auto">
        <el-table-column prop="db" label="数据库编号" width="160">
          <template #default="scope">
            <el-input-number v-model.number="scope.row.db" type="number" :min="0" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="note" label="备注">
          <template #default="scope">
            <el-input v-model="scope.row.note" size="small" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template #default="scope">
            <el-popconfirm
              title="确定要删除这条记录吗？"
              confirm-button-text="确定"
              cancel-button-text="取消"
              width="200"
              @confirm="deleteRedisNote(scope.$index)"
            >
              <template #reference>
                <el-button size="small" type="danger">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <el-button @click="handleClose">
        取消
      </el-button>
      <el-button type="primary" @click="handleSave">
        保存
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
