<template>
  <a-layout>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="返回"
      @back="() => router.go(-1)"
    />
    <div class="artical-detail bg-transparent flex justify-evenly">
      <a-card hoverable class="item-container w-2/3">
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
          <MdEditor
            :editorId="state.id"
            v-model="recordDetail.content"
            :previewTheme="state.theme"
            :previewOnly="previewOnly"
            :codeTheme="state.codeTheme"
            @onGetCatalog="onGetCatalog"
            class="myEditor w-1/2"
          />

          <!-- <Editor :previewOnly="previewOnly" :content="recordDetail.content" /> -->
        </div>
        <div>评论区</div>
      </a-card>
      <a-affix :offset-top="0" class="w-1/4">
        <a-card hoverable>
          <MdCatalog :editorId="state.id" :scrollElement="scrollElement" :theme="state.theme" />
        </a-card>
      </a-affix>
    </div>
  </a-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { reactive } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useInfoStore } from '@/store/modules/info'
import { router } from '@/router'
const route = useRoute()
const id = route.params.id
const infoStore = useInfoStore()
const previewOnly = true
const articles = computed(() => infoStore.articles)
const MdCatalog = MdEditor.MdCatalog
// const text = ref(infoStore.currentArticle.content)
const scrollElement = document.documentElement
const state = reactive({
  id: 'article',
  theme: 'smart-blue',
  catalogList: [],
  codeTheme: ''
})
const onGetCatalog = (list: any) => {
  state.catalogList = list
}
const recordDetail: any = articles.value.find((item: any) => {
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

.flexContainer {
  margin: 20px;
}
.img-container {
  /* width: 100%; */
  padding: 0 10%;
}
.artical-detail {
  /* background-color: white; */
  margin: 10px;
  border-radius: 20px;
}
</style>
