import type { RouteRecordRaw } from 'vue-router'

import ServerWidgetRoutes from '@/widgets/server/ServerWidgetRoutes'
import BasePanelWidgetRoutes from './base-panel/BasePanelWidgetRoutes'
import EnergyLabelWidgetRoutes from './energy-label/EnergyLabelWidgetRoutes'
// FBI WANING! IMPORT PLACE, DONT DELETE THIS LINE
const WidgetRouter: RouteRecordRaw[] = [
  ...BasePanelWidgetRoutes,
  ...ServerWidgetRoutes,
  ...EnergyLabelWidgetRoutes,
  // FBI WANING! ROUTE PLACE, DONT DELETE THIS LINE
]
export default WidgetRouter
