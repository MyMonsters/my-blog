<template>
  <div class="bg-white rounded-2xl">
    <a-row justify="start">
      <div class="m-5">
        <a-button type="primary" @click="sendNew">发新文章</a-button>
      </div>
    </a-row>

    <a-list
      ref="articleRef"
      hoverble
      item-layout="vertical"
      size="large"
      :pagination="pagination"
      :data-source="articles"
    >
      <template #renderItem="{ item }">
        <a-list-item key="item.id">
          <template #extra>
            <img width="272" alt="logo" :src="item.image" />
          </template>

          <a-list-item-meta>
            <template #title>
              {{ item.title }}
              <!-- <div @click="gotoEditArticle(item.id)">{{ item.title }}</div> -->
              <!-- <a @click="toRecord"></a> -->
            </template>
          </a-list-item-meta>
          <a-typography-paragraph
            :ellipsis="ellipsis ? { rows: 3 } : false"
            :content="item.description"
            style="text-align: left"
          />
          <div>
            <a-button type="link" @click="editRecord(item.id)">编辑</a-button>

            <a-popconfirm
              title="确认删除该条记录？"
              ok-text="是"
              cancel-text="否"
              @confirm="removeRecord(item.id)"
            >
              <a-button type="link">删除</a-button>
            </a-popconfirm>
          </div>
          <div class="text-left">
            <a-tag color="#87d068">{{ item.time }}</a-tag>

            <span v-for="labelItem in item.label ? item.label.split(',') : []" :key="labelItem">
              <a-tag color="green"><tag-outlined class="mr-2" />{{ labelItem }}</a-tag>
            </span>
          </div>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<script lang="ts" setup>
// import qs from 'qs'
import { removeArticle } from '@/api/auth/api'
import { getAllArticles } from '@/api/info/api'
import { useInfoStore } from '@/store/modules/info'
import { message } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { TagOutlined } from '@ant-design/icons-vue'
// import { message } from 'ant-design-vue'
// import service from '@/service'

//   const listData = [];

const infoStore = useInfoStore()
const router = useRouter()
const articleRef = ref()
getAllArticles().then((res) => {
  console.log(res)
  infoStore.setArticles(res.data)
})
const articles = computed(() => infoStore.articles)
const ellipsis = ref(true)
// store.dispatch('getArticleList')
// console.log(store.state.articles)
// listData.list = store.state.articles

const pagination = {
  onChange: () => {
    console.log(articleRef)
    console.log((articleRef.value.scrollTop = 0))
  },
  pageSize: 6
}
const editRecord = (id: number) => {
  router.push({ path: '/authMain/operateContent/editArticle/' + id })
}

const sendNew = () => {
  router.push('/authMain/operateContent/editArticle')
}
const removeRecord = (id: string) => {
  removeArticle(id).then((response) => {
    console.log(response)
    if (response.status === 0) {
      message.success('删除成功！')
      getAllArticles().then((res) => {
        infoStore.setArticles(res.data)
      })
    }
  })
}
// const gotoEditArticle = (id) => {
//   store.dispatch('info/getCurrentArticleByIdAction', { id })
//   router.push({ path: '/main/articleDetail' })
// }
</script>
