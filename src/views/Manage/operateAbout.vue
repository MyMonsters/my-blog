<template>
  <div class="operateAbout text-left">
    <div class="checkbox-wrapper-34 p-6 flex justify-between">
      <input class="tgl tgl-ios" id="toggle-34" type="checkbox" @click="handleSwitchType" />
      <label class="tgl-btn" for="toggle-34"></label>
      <div>
        Theme：<a-select
          size="large"
          v-model:value="theme"
          style="width: 200px"
          @change="handleChangeTheme"
          default
          ><a-select-option value="default">default</a-select-option>
          <a-select-option value="vuepress">vuepress</a-select-option>
          <a-select-option value="mk-cute">mk-cute</a-select-option>
          <a-select-option value="smart-blue">smart-blue</a-select-option>
          <a-select-option value="cyanosis">cyanosis</a-select-option>
          <a-select-option value="arknights">arknights</a-select-option>
        </a-select>
      </div>
    </div>

    <MdEditor v-model="current.intro" :previewTheme="theme" />
    <div class="flex justify-center">
      <a-button class="mt-10" @click="handleUpdateInfo">保存</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useInfoStore } from '@/store/modules/info'
import { updateAboutAPI } from '@/api/auth/api'
import { message } from 'ant-design-vue'
import { getAbout } from '@/api/info/api'
const infoStore = useInfoStore()
getAbout().then((res) => {
  console.log(res.data)
  infoStore.setAbout(res.data)
})
const aboutInfo: any = computed(() => infoStore.about)
const blogInfo = aboutInfo.value[0]
const meInfo = aboutInfo.value[1]
const blog = reactive({
  content: blogInfo.intro,
  theme: blogInfo.theme,
  codeTheme: 'github'
})
const myself = reactive({
  // '## 🤖About Me    ### 💻 前端选手\n  ### ☘️ React, Redux \n ### ☘️ Vue, Vue-router, Pinia, Vuex\n ### ☘️ Antd, Element UI \n### ☘️ Express\n### ☘️ Echarts, ThreeJS',
  content: meInfo.intro,
  theme: meInfo.theme,
  codeTheme: 'github'
})
const type = ref('me')
let current = reactive({ intro: myself.content, theme: myself.theme, type: type.value })

const handleSwitchType = () => {
  if (type.value === 'blog') {
    type.value = 'me'
    current.intro = myself.content
    current.theme = myself.theme
  } else {
    type.value = 'blog'
    current.intro = blog.content
    current.theme = blog.theme
  }
}
const theme = ref(current.theme)
const handleUpdateInfo = () => {
  console.log('object')
  updateAboutAPI(current).then((res: any) => {
    message.info(res.message)
  })
}
const handleChangeTheme = (value: string) => {
  current.theme = value
  console.log('current', current)
}
</script>

<style scoped>
.operateAbout {
  background-color: white;
  min-height: 90vh;
  border-radius: 20px;
  width: 100%;
}
.checkbox-wrapper-34 {
  --blue: #0d7eff;
  --g08: #e1e5eb;
  --g04: #848ea1;
}

.checkbox-wrapper-34 .tgl {
  display: none;
}
.checkbox-wrapper-34 .tgl,
.checkbox-wrapper-34 .tgl:after,
.checkbox-wrapper-34 .tgl:before,
.checkbox-wrapper-34 .tgl *,
.checkbox-wrapper-34 .tgl *:after,
.checkbox-wrapper-34 .tgl *:before,
.checkbox-wrapper-34 .tgl + .tgl-btn {
  box-sizing: border-box;
}
.checkbox-wrapper-34 .tgl::selection,
.checkbox-wrapper-34 .tgl:after::selection,
.checkbox-wrapper-34 .tgl:before::selection,
.checkbox-wrapper-34 .tgl *::selection,
.checkbox-wrapper-34 .tgl *:after::selection,
.checkbox-wrapper-34 .tgl *:before::selection,
.checkbox-wrapper-34 .tgl + .tgl-btn::selection {
  background: none;
}
.checkbox-wrapper-34 .tgl + .tgl-btn {
  outline: 0;
  display: block;
  width: 70px;
  height: 27px;
  position: relative;
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
}
.checkbox-wrapper-34 .tgl + .tgl-btn:after,
.checkbox-wrapper-34 .tgl + .tgl-btn:before {
  position: relative;
  display: block;
  content: '';
  width: 44%;
  height: 100%;
}
.checkbox-wrapper-34 .tgl + .tgl-btn:after {
  left: 0;
}
.checkbox-wrapper-34 .tgl + .tgl-btn:before {
  display: inline;
  position: absolute;
  top: 7px;
}
.checkbox-wrapper-34 .tgl:checked + .tgl-btn:after {
  left: 56.5%;
}

.checkbox-wrapper-34 .tgl-ios + .tgl-btn {
  background: var(--g08);
  border-radius: 20rem;
  padding: 2px;
  transition: all 0.4s ease;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:after {
  border-radius: 2em;
  background: #fff;
  transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), padding 0.3s ease, margin 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:before {
  content: 'me';
  font-size: medium;
  left: 35px;
  top: 0px;
  color: var(--g04);
  transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:active {
  box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:active:after {
  padding-right: 0.4em;
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn {
  background: var(--blue);
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn:active {
  box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn:active:after {
  margin-left: -0.4em;
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn:before {
  content: 'blog';
  left: 4px;
  color: #fff;
}
</style>
