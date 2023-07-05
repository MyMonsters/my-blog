<script lang="ts" setup>
import {
  HomeTwoTone,
  SmileTwoTone,
  InfoCircleTwoTone,
  CodeTwoTone,
  DownOutlined
} from '@ant-design/icons-vue'
import { ref } from 'vue'
import Todos from './Todos.vue'
import SwitchDark from './switchDark/index.vue'
// const props = defineProps<{ msg: string }>()
const emit: any = defineEmits<{ (ifFold: boolean): void }>()
const onBreakpoint = (broken: boolean) => {
  const menubtn = document.querySelector('.menu-btn')
  const nav = document.querySelector('.navContainer')
  if (!broken) {
    console.log(document.getElementsByClassName('menu-btn'))
    menubtn && menubtn.setAttribute('style', 'display: none')
    nav && nav.setAttribute('style', 'display: flex')
    emit('FoldChange', broken)
  } else {
    menubtn && menubtn.setAttribute('style', 'display: block')
    nav && nav.setAttribute('style', 'display: none')
    emit('FoldChange', broken)
  }
}

const visible = ref(false)
const showDrawer = () => {
  visible.value = !visible.value
}

const onClose = () => {
  visible.value = false
}
</script>

<template>
  <!-- <a-layout id="components-layout-demo-responsive" >#b0cff5 -->
  <a-layout-header class="header">
    <div class="flex justify-around items-center h-[64px]">
      <div class="menu-btn trigger" style="cursor: pointer" @click="showDrawer">
        <svg
          t="1666693980148"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2548"
          width="16"
          height="16"
        >
          <path
            d="M853.333333 938.666667h-213.333333c-46.933333 0-85.333333-38.4-85.333333-85.333334v-213.333333c0-46.933333 38.4-85.333333 85.333333-85.333333h213.333333c46.933333 0 85.333333 38.4 85.333334 85.333333v213.333333c0 46.933333-38.4 85.333333-85.333334 85.333334z m0-469.333334h-213.333333c-46.933333 0-85.333333-38.4-85.333333-85.333333V170.666667c0-46.933333 38.4-85.333333 85.333333-85.333334h213.333333c46.933333 0 85.333333 38.4 85.333334 85.333334v213.333333c0 46.933333-38.4 85.333333-85.333334 85.333333zM384 938.666667H170.666667c-46.933333 0-85.333333-38.4-85.333334-85.333334v-213.333333c0-46.933333 38.4-85.333333 85.333334-85.333333h213.333333c46.933333 0 85.333333 38.4 85.333333 85.333333v213.333333c0 46.933333-38.4 85.333333-85.333333 85.333334z m0-469.333334H170.666667c-46.933333 0-85.333333-38.4-85.333334-85.333333V170.666667c0-46.933333 38.4-85.333333 85.333334-85.333334h213.333333c46.933333 0 85.333333 38.4 85.333333 85.333334v213.333333c0 46.933333-38.4 85.333333-85.333333 85.333333z"
            p-id="2549"
          ></path>
        </svg>
      </div>
      <div class="loginbtn-container">
        <router-link to="/login" class="loginbtn">
          <SvgIcon style="width: 2em" name="logo" />
        </router-link>
      </div>
      <div class="flex justify-center navContainer items-end">
        <router-link to="/main/home">
          <div class="header-item"><HomeTwoTone /><span style="margin-left: 4px">HOME</span></div>
        </router-link>
        <router-link to="/main/project">
          <div class="header-item">
            <code-two-tone /><span style="margin-left: 4px">PROJECTS</span>
          </div>
        </router-link>

        <a>
          <a-dropdown>
            <div class="header-item">
              <smile-two-tone /><span style="margin-left: 4px">ARTICLE</span>
              <DownOutlined />
            </div>
            <template #overlay
              ><a-menu>
                <a-menu-item key="0">
                  <router-link to="/main/article">Articles</router-link>
                </a-menu-item>
                <a-menu-item key="1">
                  <router-link to="/main/label">Tags</router-link>
                </a-menu-item>
                <a-menu-divider /> </a-menu
            ></template>
          </a-dropdown>
        </a>

        <router-link to="/main/timeline">
          <div class="header-item">
            <info-circle-two-tone /><span style="margin-left: 4px">TIMELINE</span>
          </div>
        </router-link>
        <router-link to="/main/link">
          <div class="header-item">
            <info-circle-two-tone /><span style="margin-left: 4px">LINK</span>
          </div>
        </router-link>
        <router-link to="/main/about">
          <div class="header-item">
            <info-circle-two-tone /><span style="margin-left: 4px">ABOUT</span>
          </div>
        </router-link>

        <SwitchDark />
      </div>
    </div>
  </a-layout-header>

  <a-layout-sider
    class="menu-collapse"
    breakpoint="md"
    collapsed-width="0"
    @breakpoint="onBreakpoint"
    :trigger="null"
  >
    <a-drawer
      title=""
      placement="left"
      :closable="false"
      :visible="visible"
      @close="onClose"
      class="custom-class"
    >
      <div class="text-center">
        <div class="">
          <img class="profile m-auto" src="../assets/img/profile.jpg" alt="" />
        </div>
        <div class="introContainer">一团一团亮晶晶</div>
      </div>
      <div class="menu-container">
        <router-link to="/main/home">
          <div class="menu-item"><HomeTwoTone /><span style="margin-left: 4px">HOME</span></div>
        </router-link>
        <router-link to="/main/project">
          <div class="menu-item">
            <code-two-tone /><span style="margin-left: 4px">PROJECTS</span>
          </div>
        </router-link>
        <router-link to="/main/article">
          <div class="menu-item">
            <smile-two-tone /><span style="margin-left: 4px">ARTICLE</span>
          </div>
        </router-link>
        <router-link to="/main/label">
          <div class="menu-item"><smile-two-tone /><span style="margin-left: 4px">TAGS</span></div>
        </router-link>
        <router-link to="/main/link">
          <div class="menu-item"><smile-two-tone /><span style="margin-left: 4px">LINK</span></div>
        </router-link>
        <router-link to="/main/about">
          <div class="menu-item">
            <info-circle-two-tone /><span style="margin-left: 4px">ABOUT</span>
          </div>
        </router-link>
        <router-link to="/main/timeline">
          <div class="menu-item">
            <info-circle-two-tone /><span style="margin-left: 4px">TIMELINE</span>
          </div>
        </router-link>
      </div>
      <todos />
    </a-drawer>
  </a-layout-sider>
</template>

<style lang="scss" scoped>
.header {
  /* background-color: #eceaec; */
  background-image: linear-gradient(to top, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%);
  [data-theme='dark'] & {
    background-image: linear-gradient(25deg, #1a447f, #5873a5, #8da7cb, #c2def3);
  }
  font-size: medium;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;

  border-radius: 35px;
  margin: 10px;
}

.header a {
  color: beige;
}

.header a:hover {
  cursor: pointer;
}

.header-item {
  border: 0;
  background: none;
  text-transform: uppercase;
  color: #04002c;
  [data-theme='dark'] & {
    color: rgb(248, 246, 248);
  }
  /* font-weight: bold; */
  position: relative;
  outline: none;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.header-item::before,
.header-item::after {
  box-sizing: inherit;
  position: absolute;
  content: '';
  border: 2px solid transparent;
  width: 0;
  height: 0;
}

.header-item::after {
  bottom: 0;
  right: 0;
}

.header-item::before {
  top: 0;
  left: 0;
}

.header-item:hover::before,
.header-item:hover::after {
  width: 100%;
  height: 100%;
}

.header-item:hover::before {
  border-top-color: #56abe0;
  border-right-color: #1191ae;
  transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
}

.header-item:hover {
  border: none;
}

.header-item:hover::after {
  border-bottom-color: #4266e9;
  border-left-color: #4361ee;
  transition: border-color 0s ease-out 0.6s, width 0.3s ease-out 0.6s, height 0.3s ease-out 1s;
}

/* #components-layout-demo-responsive .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    } */

.ZHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.profile {
  height: 128px;
  width: 128px;
  border-radius: 40px;
  margin-top: 20px;
}

.siderContainer {
  height: 1000px;
  background-color: white;
  margin: 10px;
  border-radius: 20px;
}

.menu-container {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  align-items: left;
  padding: 10% 30%;
}

.menu-item {
  margin: 8px 0;
}

.loginbtn-container {
  align-items: center;
  display: flex;
}

.menu-item:hover {
  background-color: #d8dee677;
}

/* .introContainer {
  margin: 20px;
} */
.menu-collapse {
  display: none;
}

.infoContainer {
  text-align: center;
}
.loginbtn {
  align-items: center;
  display: flex;
}
</style>
