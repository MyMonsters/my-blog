<template>
  <div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="返回" @back="backClick">
      <template #extra>
        <div class="relative w-60">
          <template
            v-for="tag in currentArticle.label ? currentArticle.label.split(',') : []"
            :key="tag"
          >
            <a-tooltip v-if="tag.length > 20" :title="tag">
              <a-tag @close="handleClose(tag)">
                {{ `${tag.slice(0, 20)}...` }}
              </a-tag>
            </a-tooltip>
            <a-tag v-else :closable="true" @close="handleClose(tag)">
              {{ tag }}
            </a-tag>
          </template>
          <a-tag style="background: #fff; border-style: dashed" @click="showInput">
            <plus-outlined />
            New Tag
          </a-tag>
          <div class="absolute h-40 w-60 top-8 z-10 overflow-y-scroll left-0" v-show="TagsVisible">
            <div class="bg-white shadow-md">
              <p>标签</p>
              <a-input
                ref="inputRef"
                v-model:value="inputValue"
                type="text"
                size="small"
                :style="{ width: '90%' }"
                @keyup.enter="handleInputConfirm"
              />
              <div class="flex flex-wrap justify-start ml-4">
                <span
                  class="m-1 bg-amber-100 text-amber-600 p-1"
                  v-for="item in labels"
                  :key="item.label_id"
                  @click="handleLabelsConfirm(item.label_name)"
                >
                  {{ item.label_name }}
                </span>
              </div>
            </div>
            <CloseOutlined
              class="absolute closebtn p-1 right-4 top-1"
              @click="TagsVisible = !TagsVisible"
            />
          </div>
        </div>

        <div class="mt-2">
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
        </div>

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
import { UploadOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { computed, ref, reactive, nextTick, Ref, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useInfoStore } from '@/store/modules/info'
import { addArticle, updateArticle, updateArticleImg, addLabel } from '@/api/auth/api'
import { getAllArticles, getLabel } from '@/api/info/api'
// import { cloneDeep } from 'lodash-es'
const infoStore = useInfoStore()
getLabel().then((res) => {
  infoStore.setLabel(res.data)
})
const labels: Ref<any> = computed(() => infoStore.labels)
const route = useRoute()
const router = useRouter()
const id: any = ref(route.params.id)
const isEdit = id.value ? true : false
const rawArticle: any = toRaw(infoStore.getArticleById(parseInt(id.value)))
const currentArticle: any = isEdit
  ? ref({ ...rawArticle })
  : ref({
      content: '',
      title: '',
      label: '',
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
  const formData = new FormData()
  if (isEdit) {
    //编辑文章的情况下
    updateArticle(currentArticle.value).then((response) => {
      console.log(response)
      if (response.status === 0) {
        message.success('保存成功啦！')
      }
    })
    if (fileList.value.length !== 0) {
      formData.append('pic', fileList.value[0].originFileObj)
      formData.append('id', id.value)
      updateArticleImg(formData)
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
    //添加新文章的情况下
    if (fileList.value.length !== 0) {
      addArticle(currentArticle.value).then((response) => {
        // console.log(response)
        // if(response.data.code === 200) visible.value =true
        console.log(response)
        formData.append('pic', fileList.value[0].originFileObj)
        id.value = response.id
        formData.append('id', id.value)
        updateArticleImg(formData).then((response) => {
          //  fileList.value = []
          console.log('updateImg', response)
          if (response.data.status === 0) {
            message.success('上传成功')
          } else {
            message.error(response.data.message)
          }
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
const inputRef = ref()
const inputValue = ref('')
const TagsVisible = ref(false)
const handleClose = (removedTag: string) => {
  const label = currentArticle.value.label
  const index = label.indexOf(removedTag)
  currentArticle.value.label = label.replace(removedTag, '')
  if (removedTag.length === label.length)
    //只有一个标签的情况下
    currentArticle.value.label = ''
  else if (index === 0)
    //标签就在第一个
    currentArticle.value.label = label.replace(removedTag + ',', '')
  else currentArticle.value.label = label.replace(',' + removedTag, '')
  // const tags = currentArticle.value.label.filter((tag) => tag !== removedTag)
  // console.log(tags)
  // Tagstate.tags = tags
}

const showInput = () => {
  TagsVisible.value = true
  nextTick(() => {
    inputRef.value.focus()
  })
}

const handleInputConfirm = async () => {
  const value = inputValue.value
  if (currentArticle.value.label.indexOf(value) !== -1) {
    message.warn('已存在该标签！')
    return
  }
  const Labelres = await addLabel(value)
  if (Labelres.status === 0) {
    currentArticle.value.label
      ? (currentArticle.value.label += `,${value}`)
      : (currentArticle.value.label += `${value}`)
    inputValue.value = ''
    getLabel().then((res) => {
      infoStore.setLabel(res.data)
    })
  }
}
const handleLabelsConfirm = (label_name: string) => {
  const str = currentArticle.value.label.length === 0 ? '' : ','
  currentArticle.value.label += str + label_name
}
</script>

<style scoped>
.img-container {
  height: 100px;
}
.closebtn:hover {
  background-color: #ccc;
  cursor: pointer;
  border-radius: 4px;
}
</style>
