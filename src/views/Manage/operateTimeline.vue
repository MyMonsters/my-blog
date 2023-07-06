<template>
  <div class="operate-timeline-wrapper">
    <a-button class="editable-add-btn" style="margin: 8px 0" @click="handleAdd">Add</a-button>
    <a-table :columns="columns" :data-source="timeline">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'title'">
          <span>
            <smile-outlined />
            Title
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, text, record }">
        <template v-if="column.key === 'action'">
          <span v-if="editableData[record.id]">
            <a-typography-link @click="save(record.id)">保存</a-typography-link>

            <a @click="cancel(record.id)">取消</a>
          </span>
          <span v-else>
            <a @click="edit(record.id)">编辑</a>
            <a-divider type="vertical" />
            <a @click="removeTimeline(record.id)">删除</a>
          </span>
        </template>
        <template v-else>
          <a-input
            v-if="editableData[record.id]"
            v-model:value="editableData[record.id][column.dataIndex]"
          />
          <span v-else>
            {{ text }}
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { SmileOutlined } from '@ant-design/icons-vue'
import { cloneDeep } from 'lodash-es'
import { addTimelineAPI, removeTimelineAPI } from '@/api/auth/api'
import { useInfoStore } from '@/store/modules/info'
import { updateTimelineAPI } from '@/api/auth/api'
const columns = [
  { name: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Time', dataIndex: 'time', key: 'time' },
  { title: 'Color', dataIndex: 'color', key: 'color' },
  { title: 'Action', key: 'action' }
]

const infoStore = useInfoStore()
const timeline = computed(() => infoStore.timeline)
const editableData: any = reactive({})
const edit = (id: string) => {
  editableData[id] = cloneDeep(timeline.value.filter((item: any) => id === item.id)[0])
}
const handleAdd = () => {
  const info = {
    title: 'title',
    color: 'color',
    time: 'time'
  }
  addTimelineAPI(info).then((res) => {
    console.log(res)
    let newtimeline: any = infoStore.timeline
    newtimeline.push({ ...info, id: res.id })
    infoStore.setTimeline(newtimeline)
  })
}
const save = (id: string) => {
  const info = editableData[id]
  updateTimelineAPI(info).then((res) => {
    console.log(res)
    let newtimeline = infoStore.timeline
    Object.assign(newtimeline.filter((item: any) => id === item.id)[0], info)
    infoStore.setTimeline(newtimeline)
  })
  delete editableData[id]
}
const cancel = (key: string) => {
  delete editableData[key]
}
const removeTimeline = (id: string) => {
  removeTimelineAPI(id).then((res) => {
    console.log(res)
    let newtimeline = infoStore.timeline
    newtimeline = newtimeline.filter((item: any) => id !== item.id)
    infoStore.setTimeline(newtimeline)
  })
}
</script>

<style scoped>
.operate-timeline-wrapper {
  height: 90vh;
  background-color: white;
  border-radius: 20px;
}
.ant-typography {
  margin: 0 3px;
}
</style>
