import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
// import { setupPageGuard } from './permission';

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
        path: 'articleDetail/:id',
        component: () => {
          return import('../views/Info/ArticleDetail.vue')
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
