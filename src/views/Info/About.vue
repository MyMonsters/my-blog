<script lang="ts" setup>
import { reactive } from 'vue'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
// import Emoji from '@/components/Emoji'
const blog = reactive({
  content:
    '## 🤖blog\n<font size="4">为了记录平时学习知识的笔记和遇到问题和bug时候的解决方案，同时也能提高自己对所学的技术框架应用的熟练度，所以建了这个博客网站。\n' +
    '功能包括**查看文章和标签**、**查看项目**、**博客建立的时间轴**、**交换友链（待完善）**、**todolist**，博客支持**日夜模式的切换**和**留言板功能**。\n' +
    '除了博客展示系统以外，点击导航栏的图标可以跳转到后台管理系统。<font/>\n' +
    '### 🐣 Vue3 + Vite  + Typescript + pinia + vue-router\n' +
    '### 🐣 tailwindCSS + antd\n' +
    '### 🐣 md-editor-v3\n' +
    '### 🐣 nprogress\n' +
    '### 🐣 node + express\n',
  theme: 'cyanosis',
  codeTheme: 'github'
})

const myself = reactive({
  content:
    '## 🤖About Me\n ### 💻 前端选手\n  ### ☘️ React, Redux \n ### ☘️ Vue, Vue-router, Pinia, Vuex\n ### ☘️ Antd, Element UI \n### ☘️ Express\n### ☘️ Echarts, ThreeJS',
  theme: 'cyanosis',
  codeTheme: 'github'
})
</script>
<template>
  <div class="about">
    <a-layout-content class="contentContainer">
      <div class="text-7xl">菜鸡成长之路</div>
      <div class="info flex mt-10 text-justify leading-relaxed justify-around">
        <MdPreview
          editorId="blog"
          v-model="blog.content"
          :previewTheme="blog.theme"
          :codeTheme="blog.codeTheme"
          style="background-color: transparent; width: 45%"
        />
        <MdPreview
          editorId="zplus"
          v-model="myself.content"
          :previewTheme="myself.theme"
          previewOnly="true"
          :codeTheme="myself.codeTheme"
          style="background-color: transparent; width: 45%"
        />

        <!-- <Emoji /> -->
      </div>
    </a-layout-content>
  </div>
</template>
<style scoped>
.contentContainer {
  margin: 100px;
}

.about {
}
</style>
