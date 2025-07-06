<script setup lang="ts">
const props = defineProps({
  width: {
    type: Number,
    default: 200,
  },
  color: {
    type: String,
    default: '#1b814a', // 鲜绿色，可替换为具体色值
  },
  level: {
    type: Number,
    default: 1,
  },
})
</script>

<template>
  <div class="arrow-label">
    <div class="level">
      {{ level }} <span style="font-size: 14px">级</span>
    </div>
  </div>
</template>

<style scoped>
.arrow-label {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-left: 15px;
  background-color: v-bind(color); /* 鲜绿色，可替换为具体色值 */
  color: white;
  font-size: 18px;
  width: 60px;
  height: 30px;
  transition: all 0.8s ease-in-out;
  font-weight: bold;
  text-align: center;
  clip-path: polygon(
      20px 0,
      100% 0%,
      100% 100%,
      20px 100%,
      0% 50%
  );
  border-radius: 2px 0 0 2px;
}

.level{
  font-size: 25px;
}
</style>
