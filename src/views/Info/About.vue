<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { getAbout } from '@/api/info/api'
import { useInfoStore } from '@/store/modules/info'
// import Emoji from '@/components/Emoji'
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
console.error(
  '%cConsole error Test===>>>: ',
  'color: MidnightBlue; background: Aquamarine; font-size: 20px;',
  'Console error Test'
)
const myself = reactive({
  // '## 🤖About Me    ### 💻 前端选手\n  ### ☘️ React, Redux \n ### ☘️ Vue, Vue-router, Pinia, Vuex\n ### ☘️ Antd, Element UI \n### ☘️ Express\n### ☘️ Echarts, ThreeJS',
  content: meInfo.intro,
  theme: meInfo.theme,
  codeTheme: 'github'
})
</script>
<template>
  <div class="whitespace-pre-wrap about">
    <a-layout-content class="contentContainer">
      <!-- <div class="info flex mt-10 text-justify leading-relaxed justify-around"> -->
      <a-row>
        <a-col :xs="23" :sm="23" :md="24" :lg="12" :xl="12"
          ><div class="info flex mt-10 text-justify leading-relaxed justify-around">
            <MdPreview
              editorId="blog"
              class="text-base"
              v-model="blog.content"
              :previewTheme="blog.theme"
              :codeTheme="blog.codeTheme"
              style="background-color: transparent"
            /></div
        ></a-col>
        <a-col :xs="23" :sm="23" :md="24" :lg="12" :xl="12">
          <div class="info flex mt-10 text-justify leading-relaxed justify-around">
            <MdPreview
              editorId="zplus"
              v-model="myself.content"
              :previewTheme="myself.theme"
              previewOnly="true"
              :codeTheme="myself.codeTheme"
              style="background-color: transparent"
            />
          </div>
        </a-col>
      </a-row>

      <!-- <Emoji /> -->
      <!-- </div> -->
    </a-layout-content>
  </div>
</template>
<style scoped>
.contentContainer {
  margin: 0 100px;
}

.about {
  height: fit-content !important;
}
</style>
