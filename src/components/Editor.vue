<template>
  <div>
    <MdEditor
      :editorId="state.id"
      v-model="props.content"
      :previewTheme="state.theme"
      :previewOnly="props.previewOnly"
      :codeTheme="state.codeTheme"
      @onUploadImg="onUploadImg"
      @onGetCatalog="onGetCatalog"
      @onSave="onSave"
      :toolbarsExclude="Exclude"
      class="myEditor"
    />
    <!-- <MdCatalog
			:editorId="state.id"
			:scrollElement="scrollElement"
			:theme="state.theme"
		/> -->
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useInfoStore } from '../store/modules/info'
const MdCatalog = MdEditor.MdCatalog

const infoStore = useInfoStore()
const text = ref(infoStore.currentArticle.content)
const onGetCatalog = (list) => {
  state.catalogList = list
}
const props = defineProps({
  previewOnly: {
    type: Boolean,
    default: false
  },
  content: String
})
const Exclude = ['github']
console.log(props.content)
//将上传后的urls作为回调参数返回
const onUploadImg = async (files: any, callback: Function) => {
  const res = await Promise.all(
    files.map((file: any) => {
      return new Promise((rev, rej) => {
        const form = new FormData()
        form.append('file', file)

        // 	service
        // 		.post('/api/img/upload', form, {
        // 			headers: {
        // 				'Content-Type': 'multipart/form-data'
        // 			}
        // 		})
        // 		.then((res) => rev(res))
        // 		.catch((error) => rej(error))
      })
    })
  )

  callback(res.map((item) => item.data.url))
}
const onSave = (v: any, h: any) => {
  console.log(v)

  h.then((html: any) => {
    console.log(html)
  })
}
const state = reactive({
  id: 'article',
  theme: 'smart-blue',
  catalogList: [],
  codeTheme: ''
})
</script>

<style lang="css" scoped>
.md-editor {
  text-align: left;
}
.content-container {
  text-align: left;
}

.myEditor {
  text-align: left;
}
</style>
