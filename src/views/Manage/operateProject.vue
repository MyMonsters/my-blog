<template>
  <div class="operateProject">
    <a-button class="editable-add-btn" style="margin: 8px 0" @click="handleAdd">Add</a-button>
    <a-table :columns="columns" :data-source="project" bordered>
      <template #bodyCell="{ column, text, record, index }">
        <template v-if="['desc', 'link'].includes(column.dataIndex)">
          <div>
            <a-input
              v-if="editableData[record.project_id]"
              v-model:value="editableData[record.project_id][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="['index'].includes(column.dataIndex)">
          <div class="text-center">
            {{ index + 1 }}
          </div>
        </template>
        <template v-else-if="['imgUrl'].includes(column.dataIndex)">
          <div>
            <a-input
              v-if="editableData[record.project_id]"
              v-model:value="editableData[record.project_id][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              <img :src="record.imgUrl" />
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.project_id]">
              <a-typography-link @click="save(record.project_id)">保存</a-typography-link>
              <a-popconfirm
                title="确定要取消吗"
                okText="是"
                cancelText="否"
                @confirm="cancel(record.project_id)"
              >
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.project_id)">编辑</a>
              <a-divider type="vertical" />
              <a>删除</a>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import { reactive, ref } from 'vue'

import { useInfoStore } from '@/store/modules/info'
import { addProjectAPI, updateProjectAPI } from '@/api/auth/api'
const infoStore = useInfoStore()
const columns = [
  {
    title: 'Index',
    dataIndex: 'index',
    width: '5%'
  },
  {
    title: 'ImgUrl',
    dataIndex: 'imgUrl',
    width: '25%'
  },
  {
    title: 'Link',
    dataIndex: 'link',
    width: '20%'
  },
  {
    title: 'Description',
    dataIndex: 'desc',
    width: '20%'
  },
  {
    title: 'Operation',
    dataIndex: 'operation'
  }
]

const project = ref(infoStore.projects)
// const dataSource = ref(data)
const editableData: any = reactive({})

const edit = (id: string) => {
  editableData[id] = cloneDeep(project.value.filter((item: any) => id === item.project_id)[0])
}
const save = (id: string) => {
  const info = editableData[id]
  console.log(info)
  updateProjectAPI(info).then((res) => {
    console.log(res)
    let newproject = infoStore.projects
    Object.assign(newproject.filter((item: any) => id === item.project_id)[0], info)
    infoStore.setProject(newproject)
  })
  delete editableData[id]
}
const cancel = (key: string) => {
  delete editableData[key]
}
const handleAdd = () => {
  const info = {
    desc: 'desc',
    link: 'link',
    imgUrl: 'imgUrl'
  }
  addProjectAPI(info).then((res) => {
    let newProject: any = infoStore.projects
    newProject.unshift({ ...info, id: res.id })
    infoStore.setProject(newProject)
  })
}
</script>

<style scoped>
.operateProject {
  background-color: white;
  min-height: 90vh;
  border-radius: 20px;
  width: 100%;
}
.editable-row-operations a {
  margin-right: 8px;
}
</style>
