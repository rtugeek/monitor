import { createRouter, createWebHashHistory } from 'vue-router'
import WidgetRouter from '../widgets/widget-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Index',
      path: '/',
      children: [],
      component: () => import('@/view/web/WebHomepage.vue'),
    },
    ...WidgetRouter,
    {
      name: 'Server',
      path: '/server',
      children: [{
        path: 'edit',
        name: 'ServerEdit',
        component: () => import('@/view/server/EditServerView.vue'),
      }],
    },
    {
      name: 'WidgetHomepage',
      path: '/widget/homepage',
      component: () => import('@/LandingPage.vue'),
    },
  ],
})

export default router
