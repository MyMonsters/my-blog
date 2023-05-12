<template>
  <div
    v-for="item in  data.filter((item: any) => {
      return item.parent_id === -1
    })"
    :key="item.id"
  >
    <div class="text-left flex flex-row">
      <div class="mt-4 mb-4 mr-4">
        <a-avatar src="https://joeschmoe.io/api/v1/random" :size="50" />
      </div>
      <div class="flex flex-col flex-1">
        <div class="flex items-center">
          <a class="text-xl font-bold">{{ item.nickname }}</a>
          <span class="ml-4 text-sm">2023-5-12</span>
          <MessageOutlined class="ml-auto" @click="Handlecomment(item)" />
        </div>
        <div class="text-xl">{{ item.content }}</div>
      </div>
    </div>
    <div
      class="text-left flex ml-16"
      v-for="childitem in data.filter((child: any) => {
          return item.id === child.parent_id
        })"
      :key="childitem.id"
    >
      <div class="mt-4 mb-4 mr-4">
        <a-avatar src="https://joeschmoe.io/api/v1/random" :size="50" />
      </div>
      <div class="flex flex-col flex-1">
        <div class="flex items-center">
          <a class="text-xl font-bold">{{ childitem.nickname }}</a>
          <span class="ml-4 text-sm">2023-5-12</span>
          <MessageOutlined class="ml-auto" @click="Handlecomment(childitem)" />
        </div>
        <div class="text-xl">
          <a>@{{ childitem.replyto }}：</a>{{ childitem.content }}
        </div>
        <Editor
          v-if="currentCommentId === childitem.id"
          :parent_id="childitem.id"
          :parent_name="childitem.nickname"
        ></Editor>
      </div>
    </div>
    <Editor
      v-if="currentCommentId === item.id"
      :parent_id="item.id"
      :parent_name="item.nickname"
    ></Editor>
  </div>
</template>
<script lang="ts" setup>
import { Ref, computed } from 'vue'
import { getComment } from '@/api/info/api'
import { MessageOutlined } from '@ant-design/icons-vue'
import { useInfoStore } from '@/store/modules/info'

const infoStore = useInfoStore()
const currentCommentId = computed(() => infoStore.currentCommentId)
getComment().then((res) => {
  infoStore.setComments(res.data)
})
const data: Ref<Comment[]> = computed(() => infoStore.comments)

const Handlecomment = (item: Comment) => {
  if (item.id !== currentCommentId.value) {
    //目前处于关闭状态，要打开评论
    infoStore.setCurrentCommentId(item.id)
    // item.iscomment = true
    // lastIndex.value === -1 ? '' : (data.value[lastIndex.value].iscomment = false)
    // console.log(data.value)
    // lastIndex.value = index
  } else {
    infoStore.setCurrentCommentId(-1)
  }
}
</script>
