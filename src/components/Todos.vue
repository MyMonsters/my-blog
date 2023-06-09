<template>
  <a-layout-sider class="todos">
    <h2 class="todoTitle">Todos</h2>

    <div v-for="item in todoList" :key="item.id" style="margin: 10px">
      <a-col :span="24">
        <a-checkbox v-if="item.isdone" v-model:checked="item.isdone" :value="item.id" disabled
          ><a-typography-text delete>{{ item.title }}</a-typography-text></a-checkbox
        >
        <a-checkbox v-else v-model:checked="item.isdone" :value="item.id" disabled>{{
          item.title
        }}</a-checkbox>
      </a-col>
    </div>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { getTodoList } from '@/api/info/api'
import { useInfoStore } from '@/store/modules/info'

const infoStore = useInfoStore()
getTodoList().then((res) => {
  infoStore.setTodolist(res.data)
})
const todoList: any = computed(() => infoStore.todolist)
</script>

<style lang="scss" scoped>
/* .container {
  background-color: azure;
} */
.todos {
  background-image: linear-gradient(-225deg, #e3fdf5 0%, #ffe6fa 100%);
  margin: 10px;
  [data-theme='dark'] & {
    background-image: linear-gradient(25deg, #7288c5, #8ca5cb, #a4c4d0, #bbe3d5);
  }
  border-radius: 20px;
  text-align: left;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
    rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
}
.todoTitle {
  margin: 10px 0;
  text-align: center;
}
</style>
