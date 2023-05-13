<template>
  <div class="border-solid border-gray-50 border-2 mt-8">
    <!-- <MdCatalog
			:editorId="state.id"
			:scrollElement="scrollElement"
			:theme="state.theme"
		/> -->
    <div class="flex justify-around">
      <a-input :bordered="false" v-model:value="comment.nickname" placeholder="nickname" />
      <a-input :bordered="false" v-model:value="comment.email" placeholder="email" />
      <a-input :bordered="false" v-model:value="comment.website" placeholder="website" />
    </div>
    <a-textarea
      v-model:value="comment.content"
      :rows="6"
      :placeholder="props.parent_name ? '@' + props.parent_name : 'comment...'"
    />
    <div class="flex items-center justify-between">
      <a-upload
        v-model:file-list="fileList"
        list-type="text"
        :max-count="1"
        :customRequest="handleUpload"
      >
        <a-button class="button-8">
          <upload-outlined></upload-outlined>
          上传头像
        </a-button>
      </a-upload>
      <button class="button-8" role="button" @click="handleSendComment">发表</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import { message, UploadProps } from 'ant-design-vue'
import { addComment, updateImg } from '@/api/auth/api'
import { getComment } from '@/api/info/api'
import { useInfoStore } from '@/store/modules/info'
const props = defineProps({ parent_id: Number, parent_name: String, article_id: Number })
const parent_id: Ref<number | undefined> = ref(props.parent_id)
const parent_name: Ref<string | undefined> = ref(props.parent_name)
const article_id: Ref<number | undefined> = ref(props.article_id)
const fileList: any = ref<UploadProps['fileList']>([])
const infoStore = useInfoStore()
const comment = ref({
  content: '',
  website: '',
  email: '',
  nickname: '',
  parent_id: -1,
  replyto: '',
  article_id
})
const handleUpload = (file: any) => {
  console.log(file)
  const formData = new FormData()
  formData.append('pic', fileList.value[0].originFileObj)
  updateImg(formData)
}
const handleSendComment = () => {
  if (parent_id.value) comment.value.parent_id = parent_id.value
  if (parent_name.value) comment.value.replyto = parent_name.value
  addComment(comment.value).then((res) => {
    if (res.status === 0) {
      infoStore.setCurrentCommentId(-1)
      getComment().then((res) => {
        message.info('发送成功！')
        comment.value = {
          content: '',
          website: '',
          email: '',
          nickname: '',
          parent_id: -1,
          replyto: '',
          article_id: article_id.value
        }

        useInfoStore().setComments(res.data)
      })
    }
  })
}
</script>
<style scoped>
.button-8 {
  background-color: #e1ecf4;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, 0.7) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #39739d;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, 'Segoe UI', 'Liberation Sans', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  margin: 10px 0;
  outline: none;
  padding: 8px 0.8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

.button-8:hover,
.button-8:focus {
  background-color: #b3d3ea;
  color: #2c5777;
}

.button-8:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
}

.button-8:active {
  background-color: #a0c7e4;
  box-shadow: none;
  color: #2c5777;
}
</style>
