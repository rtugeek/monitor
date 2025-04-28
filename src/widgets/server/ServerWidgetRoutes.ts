import type { RouteRecordRaw } from 'vue-router'
import ServerWidget from './Server.widget'

const path = ServerWidget.path
const name = ServerWidget.name

const configPagePath = ServerWidget.configPagePath!.split('?')[0]

const ServerWidgetRoutes: RouteRecordRaw[] = [
  {
    path,
    name: `${name}`,
    component: () => import('./ServerWidgetView.vue'),
  },
  {
    path: configPagePath,
    name: `${name}.config`,
    component: () => import('./ServerConfigView.vue'),
  },
]

export default ServerWidgetRoutes
