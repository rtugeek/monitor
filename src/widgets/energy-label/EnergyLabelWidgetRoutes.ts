import type { RouteRecordRaw } from 'vue-router'
import EnergyLabelWidget from './EnergyLabel.widget'

const path = EnergyLabelWidget.path
const name = EnergyLabelWidget.name

const configPagePath = EnergyLabelWidget.configPagePath!.split('?')[0]

const EnergyLabelWidgetRoutes: RouteRecordRaw[] = [
  {
    path,
    name: `${name}`,
    component: () => import('./EnergyLabelWidgetView.vue'),
  },
  {
    path: configPagePath,
    name: `${name}.config`,
    component: () => import('./EnergyLabelConfigView.vue'),
  },
]

export default EnergyLabelWidgetRoutes
