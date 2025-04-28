import type { RouteRecordRaw } from 'vue-router'

import ServerWidgetRoutes from '@/widgets/server/ServerWidgetRoutes'
import BasePanelWidgetRoutes from './base-panel/BasePanelWidgetRoutes'
// FBI WANING! IMPORT PLACE, DONT DELETE THIS LINE
const WidgetRouter: RouteRecordRaw[] = [
  ...BasePanelWidgetRoutes,
  ...ServerWidgetRoutes,
  // FBI WANING! ROUTE PLACE, DONT DELETE THIS LINE
]
export default WidgetRouter
