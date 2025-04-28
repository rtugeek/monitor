import { createRouter, createWebHashHistory } from 'vue-router'
import WidgetRouter from '../widgets/widget-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Index',
      path: '/',
      children: [],
      component: () => import('@/LandingPage.vue'),
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
  ],
})

export default router
