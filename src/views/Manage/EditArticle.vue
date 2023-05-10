<template>
  <div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="返回" @back="backClick">
      <template #extra>
        <a-select ref="select" v-model:value="currentArticle.category" style="width: 120px">
          <a-select-option value="生活记录">生活记录</a-select-option>
          <a-select-option value="学习记录">学习记录</a-select-option>
        </a-select>

        <a-upload
          v-model:file-list="fileList"
          list-type="picture"
          class="upload-list-inline"
          :before-upload="beforeUpload"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Select File
          </a-button>
        </a-upload>
        <div class="img-container" v-if="isEdit">
          <img :src="currentArticle.image" alt="" style="height: 100%" />
        </div>
      </template>
    </a-page-header>
    <a-input v-model:value="currentArticle.title" allowClear required class="mt-5" prefix="标题" />
    <a-input
      v-model:value="currentArticle.description"
      allowClear
      required
      class="mt-5"
      prefix="描述"
    />

    <div class="text-left">
      <!-- <Editor :content="currentArticle.content" /> -->
      <MdEditor
        :editorId="state.id"
        v-model="currentArticle.content"
        :previewTheme="state.theme"
        :toolbarsExclude="Exclude"
      />
    </div>

    <div class="mt-3">
      <a-button @click="save">发布</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UploadOutlined } from '@ant-design/icons-vue'
import { computed, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useInfoStore } from '@/store/modules/info'
import { addArticle, updateArticle, updateImg } from '@/api/auth/api'
import { getAllArticles } from '@/api/info/api'
// import { cloneDeep } from 'lodash-es'
const infoStore = useInfoStore()
const articles = computed(() => infoStore.articles)
const route = useRoute()
const router = useRouter()
const id: any = ref(route.params.id)
console.log(id, articles)
const isEdit = id.value ? true : false
const currentArticle: any = isEdit
  ? ref(
      articles.value.find((item: any) => {
        return item.id == id.value
      })
    )
  : ref({
      content: '',
      title: '',
      category: '',
      type: 1,
      description: '',
      image: ''
    })

const fileList: any = ref([])
if (isEdit) {
  fileList
}
const Exclude = ['github']
const state = reactive({
  id: 'Managearticle',
  theme: 'smart-blue',
  catalogList: []
})
const save = () => {
  console.log(currentArticle)
  currentArticle.value.type = 1
  const formData = new FormData()
  if (isEdit) {
    updateArticle(currentArticle.value).then((response) => {
      console.log(response)
      if (response.status === 0) {
        message.success('保存成功啦！')
      }
    })
    if (fileList.value.length !== 0) {
      formData.append('pic', fileList.value[0].originFileObj)
      formData.append('id', id.value)
      updateImg(formData)
        .then((response) => {
          // fileList.value = ""
          console.log(response.data)
          if (response.status === 0) {
            message.success('上传成功')
          } else {
            message.error(response.data.message)
          }
        })
        .catch(() => {
          message.error('上传失败')
        })
    }
  } else {
    if (fileList.value.length !== 0) {
      addArticle(currentArticle.value).then((response) => {
        // console.log(response)
        // if(response.data.code === 200) visible.value =true
        console.log(response)
        formData.append('pic', fileList.value[0].originFileObj)
        id.value = response.id
        formData.set('id', id.value)
        updateImg(formData).then((response) => {
          //  fileList.value = []
          console.log('updateImg', response)
          // if (response.data.status === 0) {
          //   message.success('上传成功')
          // } else {
          //   message.error(response.data.message)
          // }
        })
      })
    } else {
      message.error('请给我一张封面吧T T')
    }
  }
  getAllArticles().then((res) => {
    infoStore.setArticles(res.data)
  })
}

const backClick = () => {
  router.go(-1)
}
const beforeUpload = (file: any) => {
  fileList.value = [...fileList.value, file]
  console.log(fileList.value)
  return false
}
</script>

<style scoped>
.img-container {
  height: 100px;
}
</style>
