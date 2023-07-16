<template>
  <div class="operateTodos">
    <a-row justify="start">
      <div class="sendRecord-btn">
        <a-button type="primary" @click="iscreate = true">新建待办事项</a-button>
      </div>
    </a-row>
    <div class="createNewTodo" v-if="iscreate">
      <a-input v-model:value="todoValue" style="width: 70%" placeholder="请输入待办事项" />
      <div class="btn-container">
        <a-button type="primary" @click="addNew">添加</a-button>
        <a-button type="primary" @click="iscreate = false">取消</a-button>
      </div>
    </div>
    <div v-for="item in todoList" :key="item.id" class="text-left ml-20">
      <a-col :span="24">
        <a-checkbox
          v-if="item.isdone"
          v-model:checked="item.isdone"
          :value="item.id"
          style="margin: 4px 0"
          disabled
          ><a-typography-text class="text-2xl" delete>{{
            item.title
          }}</a-typography-text></a-checkbox
        >
        <a-checkbox
          v-else
          style="margin: 4px 0"
          v-model:checked="item.isdone"
          :value="item.id"
          @change="doneTodo(item.id)"
          ><span class="text-2xl">{{ item.title }}</span></a-checkbox
        >
        <a-button type="link" @click="removeTodo(item.id)">删除</a-button>
      </a-col>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { doneTodoAPI, addTodoAPI, removeTodoAPI } from '@/api/auth/api'
import { useInfoStore } from '@/store/modules/info'
import { message } from 'ant-design-vue'
const infoStore = useInfoStore()
const todoList: any = computed(() => infoStore.todolist)
const todoValue = ref('')
const doneTodo = (id: string) => {
  doneTodoAPI(id)
    .then((res) => {
      console.log(res)
      if (res.data.status === 0) {
        const todo: any = todoList.value.filter((item: any) => {
          id === item.id
        })
        todo.isdone = 1
      }
    })
    .catch((err) => {
      console.error(err)
    })
}
const addNew = () => {
  iscreate.value = false
  addTodoAPI(todoValue.value)
    .then((res) => {
      console.log(res)
      let newtodolist: any = todoList.value
      if (res.status === 0) {
        message.success('添加成功！')
        const insertId = res.id
        newtodolist.push({
          title: todoValue.value,
          id: insertId,
          isdone: 0
        })
        infoStore.setTodolist(newtodolist)
      }
    })
    .catch((err) => {
      console.error(err)
    })
}
const removeTodo = (id: string) => {
  removeTodoAPI(id).then((res) => {
    console.log(res)
    if (res.status == 0) {
      //同步
      message.success('删除成功！')
      const newTodolist = todoList.value.filter((item: any) => item.id !== id)
      infoStore.setTodolist(newTodolist)
    }
  })
}

const iscreate = ref(false)
</script>

<style scoped>
.operateTodos {
  background-color: white;
  min-height: 90vh;
  border-radius: 20px;
  width: 100%;
}
.sendRecord-btn {
  margin: 20px;
}
.btn-container {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
}
</style>
