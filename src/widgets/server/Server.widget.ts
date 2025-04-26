import { Widget, WidgetKeyword } from '@widget-js/core';
//TODO 修改组件信息，标题，描述，关键词
const ServerWidget = new Widget({
  name: 'widget.js.monitor.server',
  title: { 'zh-CN': '服务器监控','en-US':'Server Monitor' },
  description: { 'zh-CN': '' },
  keywords: [WidgetKeyword.RECOMMEND],
  categories: [],
  lang: 'zh-CN',
  width: 4,
  height: 6,
  minWidth: 4,
  maxWidth: 4,
  disabled: true,
  minHeight: 4,
  maxHeight: 6,
  previewImage: '修改为组件预览图地址',
  path: '/widget/server',
  configPagePath:
    '/widget/config/server?width=600&height=500&frame=true&transparent=false',
});

export default ServerWidget;
