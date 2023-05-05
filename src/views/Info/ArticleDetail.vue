<template>
  <a-layout class="detail-container">
    <div class="artical-detail">
      <a-card hoverable class="item-container">
        <div class="flexContainer">
          <a-tag color="green">{{ recordDetail.category }}</a-tag>
          <a-tag color="green">{{ recordDetail.time }}</a-tag>
        </div>

        <h1 class="list-title">
          {{ recordDetail.title }}
        </h1>
        <div class="img-container">
          <img style="width: 100%" :src="recordDetail.image" />
        </div>
        <!-- <div class="content-container">
        {{item.content}}
      </div> -->
        <div class="description">
          {{ recordDetail.description }}
        </div>
        <div class="content-container">
          <!-- <preview :value="item.content" /> -->
          <Editor :previewOnly="previewOnly" :content="recordDetail.content" />
        </div>
        <div>评论区</div>
      </a-card>
    </div>
  </a-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Editor from '@/components/Editor.vue'
import { useInfoStore } from '@/store/modules/info'
const route = useRoute()
const id = route.params.id
const infoStore = useInfoStore()
const previewOnly = true
const articles = computed(() => infoStore.articles)

const recordDetail:any = articles.value.find((item: any) => {
  return item.id == id
})
console.log(recordDetail)

// service.get('/record/getArticleById/' + id).then((response) => {
// 	recordDetail.list = response.data
// })
</script>

<style scoped>
.content-container {
  font-size: large;
  text-align: left;
  padding: 50px 0;
}
.item-container {
  border-radius: 20px;
}
.flexContainer {
  margin: 20px;
}
.img-container {
  /* width: 100%; */
  padding: 0 10%;
}
.artical-detail {
  background-color: white;
  margin: 10px;
  border-radius: 20px;
}
</style>
