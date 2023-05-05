<template>
  <div class="list-container" v-for="item in props.list" :key="item.id" style="width: 340px">
    <router-link :to="`/main/articleDetail/${item.id}`" style="height: 100%; width: 100%">
      <a-card hoverable class="item-container">
        <template #cover>
          <img alt="example" :src="item.image" style="height: 200px; padding: 20px" />
        </template>
        <div class="tag-container">
          <a-tag color="green">{{ item.time }}</a-tag>
          <a-tag color="green">{{ item.category }}</a-tag>
        </div>
        <a-tooltip color="#44BBA3" placement="rightBottom">
          <template #title>{{ item.title }}</template>
          <a-card-meta :title="item.title" style="margin-bottom: 10px"> </a-card-meta>
        </a-tooltip>
        <a-typography-paragraph
          class="article-description text-left"
          :ellipsis="ellipsis ? { rows: 3 } : false"
          :content="item.description"
        />
      </a-card>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import { useInfoStore } from '@/store/modules/info'
// import { useRouter } from 'vue-router'

const props = defineProps<{ list: any }>()
// const router = useRouter()
const ellipsis = ref(true)
// const gotoArticle = (id:string) => {
//   // console.log(id)
//   // store.dispatch('info/getCurrentArticleByIdAction', { id })
//   router.push({ path: '/main/articleDetail/' + id })
// }
</script>

<style scoped>
.item-container {
  color: #155853;
  background-color: transparent;
  border-radius: 20px;
  height: 100%;
  width: 100%;
  align-content: space-around;
}
.list-container {
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border-radius: 20px;
  margin-bottom: 20px;
  align-content: stretch;
  flex-wrap: wrap;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.list-title {
  font-size: 24px;
  color: rgb(8, 1, 79);
  margin-top: 10px;
}
.img-container {
  padding: 0 10%;
}
.sider-container {
  background-color: white;
  border-radius: 20px;
  margin: 10px;
  width: 25%;
  text-align: left;
}

.tag-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
}
.ant-card-body {
  height: 100%;
}
.article-description {
  font-size: 12px;
}
</style>
