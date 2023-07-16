<template>
  <div class="h-full min-h-700 bg-white">
    <a-menu v-model:selectedKeys="currentMenu" class="w-full" mode="inline" @click="ClickItem">
      <a-menu-item key="project">
        <template #icon>
          <SvgIcon style="width: 1.6em" name="project" />
        </template>
        Project
      </a-menu-item>
      <a-menu-item key="article">
        <template #icon><SvgIcon style="width: 1.6em" name="article" /></template>
        Article
      </a-menu-item>
      <a-menu-item key="todo">
        <template #icon> <SvgIcon style="width: 1.6em" name="todo" /></template>
        Todo
      </a-menu-item>

      <a-menu-item key="timeline">
        <template #icon><SvgIcon style="width: 1.6em" name="timeline" /></template>
        Timeline
      </a-menu-item>
      <a-menu-item key="link">
        <template #icon><SvgIcon style="width: 1.6em" name="link" /></template>
        Link
      </a-menu-item>
      <a-menu-item key="about">
        <template #icon><SvgIcon style="width: 1.6em" name="about" /></template>
        About
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const currentMenu = ref(['article'])
const ClickItem = ({ key }: { key: string }) => {
  router.push({
    path: '/authMain/operateContent/' + key
  })
}
</script>
