<template>
  <div
    class="list-container"
    v-for="item in props.list"
    :key="item.id"
    style="height: 400px; width: 340px"
  >
    <router-link :to="`/articleDetail/${item.id}`" style="width: 100%">
      <a-card hoverable class="item-container">
        <template #cover>
          <img alt="example" :src="item.image" style="height: 200px; padding: 20px" />
        </template>
        <div class="tag-container">
          <div v-for="labelItem in item.label ? item.label.split(',') : []" :key="labelItem">
            <a-tag color="green"><tag-outlined class="mr-2" />{{ labelItem }}</a-tag>
          </div>
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
import { TagOutlined } from '@ant-design/icons-vue'
const props = defineProps<{ list: any }>()
const ellipsis = ref(true)
console.log(props.list[0] ? props.list[0].label.split(',') : [])
</script>

<style scoped>
.item-container {
  color: #155853;
  background-color: transparent;
  border-radius: 20px;
  height: 100%;
  min-height: 400px;
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
