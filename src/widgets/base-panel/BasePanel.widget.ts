import { Widget, WidgetKeyword } from '@widget-js/core';
const BasePanelWidget = new Widget({
  name: 'cn.example.widget.base_panel',
  title: { 'zh-CN': '监控面板' ,'en-US': 'Monitor' },
  description: { 'zh-CN': '显示CPU、内存、磁盘等硬件负载信息', 'en-US': 'Display CPU, memory, disk information and so on' },
  keywords: [WidgetKeyword.RECOMMEND],
  categories: ['utilities'],
  lang: 'zh-CN',
  width: 4,
  height: 2,
  minWidth: 4,
  maxWidth: 4,
  minHeight: 2,
  maxHeight: 2,
  previewImage: '/image/preview_base_panel.png',
  path: '/widget/base_panel',
  configPagePath: undefined,
});

export default BasePanelWidget;
