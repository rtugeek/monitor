import type { RouteRecordRaw } from 'vue-router';
import BasePanelWidget from './BasePanel.widget';

const path = BasePanelWidget.path;
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
];

export default BasePanelWidgetRoutes;
