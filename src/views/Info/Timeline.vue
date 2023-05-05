<template>
  <div class="timeline-wrapper">
    <a-timeline mode="alternate" pending="正在coding的路上">
      <a-timeline-item
        v-for="item of timeline"
        :key="item.id"
        :label="item.time"
        :color="item.color"
        >{{ item.title }}</a-timeline-item
      >
    </a-timeline>
  </div>
</template>

<script lang="ts" setup>
import { useInfoStore } from '@/store/modules/info'
import { computed } from 'vue'
import { getTimeline } from '@/api/info/api'

const infoStore = useInfoStore()
getTimeline().then((res) => {
  infoStore.setTimeline(res.data)
})
const timeline: any = computed(() => infoStore.timeline)
</script>

<style>
.timeline-wrapper {
  background-color: white;
  padding-top: 20px;
  margin-top: 10px;
  width: 100%;
  border-radius: 20px;
}

.ant-timeline-item-tail {
  display: block;
  border-left: 2px dashed rgb(157, 157, 161);
  height: calc(100%-1px);
}
.ant-timeline-item-label {
  font-size: 20px;
  font-weight: bold;
}
.ant-timeline-item {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
  padding-bottom: 40px;
}
</style>
