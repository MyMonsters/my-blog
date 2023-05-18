<template>
  <a-layout-content class="contentContainer"><card :list="articleList.list" /> </a-layout-content>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleByLabelName } from '@/api/info/api'
import card from '@/base-ui/card'
const route = useRoute()
const label_name = route.params.label_name // import Content from '@/components/Content.vue'
const articleList = reactive({ list: {} })
getArticleByLabelName(label_name).then((res) => {
  articleList.list = res.data
  console.log(articleList.list)
})
</script>

<style scoped>
.contentContainer {
  margin: 10px;
  width: 70%;
  padding: 0 2%;
  /* height: 100%; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
