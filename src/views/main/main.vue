<template>
  <div>
    <Header @foldChange="handleFoldChange" />
    <a-layout class="bg-transparent">
      <Sider :width="isCollapse ? 0 : 210" />
      <!-- <Content :type="1" /> -->
      <router-view class="center"></router-view>
      <todos :width="isCollapse ? 0 : 200" />
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue'
import Sider from '@/components/Sider.vue'
import Todos from '@/components/Todos.vue'
// import Content from '@/components/Content.vue'
import { ref } from 'vue'

const isCollapse = ref(false)
const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style lang="scss" scoped>
.center {
  width: 100%;

  background-image: linear-gradient(-225deg, #e3fdf5 0%, #ffe6fa 100%);
  [data-theme='dark'] & {
    background-image: linear-gradient(25deg, #7288c5, #8ca5cb, #a4c4d0, #bbe3d5);
  }

  /* background: linear-gradient(to right, rgb(236, 236, 243), rgb(223, 193, 198)); */
  margin: 10px 0;
  min-height: 800px;
  height: 90vh;
  border-radius: 20px;
  /* box-shadow: rgba(194, 156, 211, 0.25) 0px 30px 60px -12px inset,
		rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset; */
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
    rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
}
</style>
