import type { RouteRecordRaw } from 'vue-router';
import BasePanelWidget from './BasePanel.widget';

const path = BasePanelWidget.path;
const configPagePath = BasePanelWidget.configPagePath!!.split('?')[0];
const name = BasePanelWidget.name;

const BasePanelWidgetRoutes: RouteRecordRaw[] = [
  {
    path: path,
    name: `${name}`,
    component: () =>
      import(
        /* webpackChunkName: "cn.example.widget.base_panel" */ './BasePanelWidgetView.vue'
      ),
  },
  {
    path: configPagePath,
    name: `${name}.config`,
    component: () =>
        import(
            /* webpackChunkName: "cn.example.widget.configPagePath" */ './BasePanelConfigView.vue'
            ),
  },
];

export default BasePanelWidgetRoutes;
