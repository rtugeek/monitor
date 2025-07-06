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
  label: String,
  number: Number,
})
</script>

<template>
  <div class="arrow-label">
    {{ label }} <span class="number">{{ number }}</span>
  </div>
</template>

<style scoped>
.arrow-label {
  display: flex;
  align-items: center;
  justify-content: right;
  position: relative;
  background-color: v-bind(color); /* 鲜绿色，可替换为具体色值 */
  color: white;
  padding-right: 15px;
  font-size: 18px;
  font-weight: bold;
  height: 30px;
  line-height: 12px;
  text-align: right;
  clip-path: polygon(
      0 0,
      calc(100% - 20px) 0%,
      100% 50%,
      calc(100% - 20px) 100%,
      0% 100%
  );
  border-radius: 2px 0 0 2px;
}

.number{
  font-weight: bold;
  padding-right: 12px;
}

.arrow-label span {
  margin-left: 6px;
}

.arrow-label::after {
  content: "";
  position: absolute;
  top: 0;
  right: -20px; /* 箭头宽度 */
  width: 0;
  height: 0;
  border-top: 100% solid transparent;
  border-bottom: 100% solid transparent;
  border-left: 20px solid v-bind(color); /* 同背景色 */
}
</style>
