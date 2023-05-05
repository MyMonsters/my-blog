import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
// import { setupPageGuard } from './permission';
import NProgress from 'nprogress'
const routes: RouteRecordRaw[] = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404/index.vue')
  },

  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500/index.vue')
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/404'
  },
  {
    path: '/',
    redirect: '/main/home'
  },
  {
    path: '/articleDetail/:id',
    component: () => {
      return import('../views/Info/ArticleDetail.vue')
    }
  },
  {
    path: '/main',
    component: () => {
      return import('../views/main/main.vue')
    },
    children: [
      {
        path: 'home',
        component: () => {
          return import('../views/Info/Home.vue')
        }
      },
      {
        path: 'article',
        component: () => {
          return import('../views/Info/Article.vue')
        }
      },
      {
        path: 'project',
        component: () => {
          return import('../views/Info/Project.vue')
        }
      },
      {
        path: 'about',
        component: () => {
          return import('../views/Info/About.vue')
        }
      },

      {
        path: 'timeline',
        component: () => {
          return import('../views/Info/Timeline.vue')
        }
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
// 页面路由刚开始切换的时候
router.beforeEach((to, from, next) => {
  console.log(to, from)
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
