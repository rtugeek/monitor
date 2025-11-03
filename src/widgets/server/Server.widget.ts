import { Widget, WidgetKeyword } from '@widget-js/core'

const ServerWidget = new Widget({
  name: 'widget.js.monitor.server',
  title: { 'zh-CN': '服务器监控', 'en-US': 'Server Monitor' },
  description: { 'zh-CN': '实时监控多个云服务器状态', 'en-US': 'Real-time monitoring of multiple cloud server status' },
  keywords: [WidgetKeyword.RECOMMEND],
  categories: ['utilities'],
  lang: 'zh-CN',
  width: 4,
  height: 6,
  minWidth: 4,
  maxWidth: 4,
  minHeight: 4,
  maxHeight: 12,
  previewImage: '/image/preview_server.png',
  path: '/widget/server',
  configPagePath:
    '/widget/config/server?width=400&height=700&frame=true&transparent=false',
  socialLinks: [
    {
      name: 'github',
      link: 'https://github.com/rtugeek/monitor',
    },
  ],
})

export default ServerWidget
