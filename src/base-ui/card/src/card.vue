<template>
  <a-collapse
    v-model:activeKey="activeKey"
    :bordered="false"
    style="width: 100%; height: fit-content; background-color: transparent"
  >
    <template #expandIcon="{ isActive }">
      <CaretRightOutlined :rotate="isActive ? 90 : 0" />
    </template>

    <a-collapse-panel
      v-for="yearItem in listByYear"
      :key="yearItem[0]"
      :header="yearItem[0]"
      :style="customStyle"
    >
      <div class="flex flex-row flex-wrap justify-around">
        <div
          v-for="item in yearItem[1]"
          :key="item.id"
          style="height: 400px; width: 340px"
          class="list-container"
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

              <span class="absolute bottom-0">{{ item.create_time }}</span>
            </a-card>
          </router-link>
        </div>
      </div>
    </a-collapse-panel>
  </a-collapse>
  <!-- <a-collapse v-model:activeKey="activeKey" :bordered="false">
    <template #expandIcon="{ isActive }">
      <CaretRightOutlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel key="1" header="This is panel header 1" :style="customStyle">
      <p>a</p>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="This is panel header 2" :style="customStyle">
      <p>a</p>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="This is panel header 3" :style="customStyle">
      <p>a</p>
    </a-collapse-panel>
  </a-collapse> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TagOutlined, CaretRightOutlined } from '@ant-design/icons-vue'
const props = defineProps<{ list: Array<Article> }>()
const ellipsis = ref(true)
const list: Array<Article> = props.list
const listByYear = new Map()
list.map((item) => {
  const create_time = new Date(item.create_time)
  const year = create_time.getFullYear()
  let yearlist = listByYear.get(year)
  if (yearlist) {
    yearlist.push(item)
  } else {
    yearlist = []
    yearlist.push(item)
    listByYear.set(year, yearlist)
  }
})
console.log(listByYear)
const activeKey = ref([2023])
const customStyle =
  'background: transparent;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden'
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
