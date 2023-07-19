<template>
  <div class="project-wrapper flex justify-evenly">
    <div class="project-item" v-for="item of project" :key="item.project_id">
      <a :href="item.link" class="info-wrapper">
        <img :src="item.imgUrl" style="border-radius: 20px" class="img-item" />
        <div class="cover flex items-center justify-center">
          <LinkOutlined />
          {{ item.desc }}
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { LinkOutlined } from '@ant-design/icons-vue'
import { useInfoStore } from '@/store/modules/info'
import { getProject } from '@/api/info/api'
const infoStore = useInfoStore()
getProject().then((res) => {
  infoStore.setProject(res.data)
})
const project: any = computed(() => infoStore.projects)
// data.list = [
//   {
//     project_id: 0,
//     desc: 'Vue2+JS+bootstrap官网展示',
//     link: 'https://machao.group',
//     imgUrl: 'https://zplus-blog-1305209635.cos.ap-nanjing.myqcloud.com/img/MaLab.png'
//   },
//   {
//     project_id: 1,
//     desc: 'Vue工具箱系统',
//     link: 'https://tool.machao.group',
//     imgUrl:
//       'https://zplus-blog-1305209635.cos.ap-nanjing.myqcloud.com/img/%E8%81%94%E6%83%B3%E6%88%AA%E5%9B%BE_20230705164422.png'
//   }
// ]
</script>

<style lang="scss" scoped>
.project-wrapper {
  background-color: transparent;
  border-radius: 20px;
  padding: 10px;
  .project-item {
    width: 30%;
    height: fit-content;
    position: relative;
    .info-wrapper {
      /* position: relative; */
      .img-item {
        height: 250px;
        width: 100%;
        overflow: hidden;
      }
      .cover {
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        position: absolute;
        top: 0;
        border-radius: 20px;
        left: 400;
        width: 100%;
        height: 100%;
      }

      /* 鼠标hover,显示遮罩,设置过渡时间 */
      .cover:hover {
        transition: all 2s;

        opacity: 1;
      }
    }
  }
}

/* CSS */
</style>
