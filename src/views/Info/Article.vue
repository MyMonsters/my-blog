<template>
  <a-layout-content class="contentContainer">
    <card :list="articleList" />
  </a-layout-content>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import card from '@/base-ui/card'
import { useInfoStore } from '@/store/modules/info'
import { getAllArticles } from '@/api/info/api'
const infoStore = useInfoStore()
getAllArticles().then((res) => {
  console.log(res)
  infoStore.setArticles(res.data)
})
const articleList: any = computed(() => infoStore.articles)
</script>

<style scoped>
.contentContainer {
  margin: 10px;
  width: 70%;
  padding: 0 2%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
