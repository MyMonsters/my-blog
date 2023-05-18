<script lang="ts" setup>
import { computed, Ref } from 'vue'
import { getLabel } from '@/api/info/api'
import { useInfoStore } from '@/store/modules/info'

const infoStore = useInfoStore()
getLabel().then((res) => {
  infoStore.setLabel(res.data)
})
const labels: Ref<any> = computed(() => infoStore.labels)
</script>
<template>
  <div class="flex row flex-wrap items-baseline content-start">
    <div v-for="item in labels" class="mt-5 inline-block" :key="item.label_id">
      <router-link :to="`/main/${item.label_name}`">
        <span class="p-4 rounded text-xl label text-center" :title="item.label_name">{{
          item.label_name
        }}</span>
      </router-link>
    </div>
  </div>
</template>
<style scoped>
.contentContainer {
  margin: 100px;
}

.label {
  transition: all 0.54s;
  cursor: pointer;
  display: inline-block;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.label:hover {
  transform: scale(1.06);
  color: aquamarine;
  font-size: x-large;
  /* transform: scale(1.2); */
}
.label::after {
  display: block;
  content: attr(title);
  font-size: x-large;
  height: 0;
  overflow: hidden;
  visibility: hidden;
  color: red;
}
</style>
