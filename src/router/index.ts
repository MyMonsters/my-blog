import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import localCache from '@/utils/cache'
// import { setupPageGuard } from './permission';

import NProgress from 'nprogress'
import login from '@/views/login/Login.vue'
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
      },

      {
        path: 'link',
        component: () => {
          return import('../views/Info/Link.vue')
        }
      },
      {
        path: 'label',
        component: () => {
          return import('../views/Info/Label.vue')
        }
      },
      {
        path: ':label_name',
        props: (route) => ({ query: route.query.label_id }),
        component: () => {
          return import('../views/Info/ArticleByLabel.vue')
        }
      }
    ]
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/authMain',
    component: () => {
      return import('@/views/Manage/AuthMain.vue')
    },
    beforeEnter: () => {
      if (!localCache.getCache('token')) {
        router.push('/login')
      }
    },
    children: [
      {
        path: 'operateContent',
        component: () => {
          return import('../views/Manage/operateContent.vue')
        },
        children: [
          {
            path: '',
            redirect: '/authMain/operateContent/article'
          },
          {
            name: 'article',
            path: 'article/:id?',
            component: () => {
              return import('../views/Manage/operateArticle.vue')
            }
          },
          {
            path: 'todo',
            component: () => {
              return import('../views/Manage/operateTodos.vue')
            }
          },
          {
            path: 'project',
            component: () => {
              return import('../views/Manage/operateProject.vue')
            }
          },

          {
            path: 'link',
            component: () => {
              return import('../views/Manage/operateLink.vue')
            }
          },
          {
            path: 'about',
            component: () => {
              return import('../views/Manage/operateAbout.vue')
            }
          },
          {
            path: 'editArticle/:id?',
            component: () => {
              return import('../views/Manage/EditArticle.vue')
            }
          },
          {
            path: 'timeline',
            component: () => {
              return import('../views/Manage/operateTimeline.vue')
            }
          }
        ]
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
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
