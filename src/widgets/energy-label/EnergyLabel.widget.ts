import { DeployMode, Widget, WidgetKeyword } from '@widget-js/core'

const EnergyLabelWidget = new Widget({
  name: 'widget.js.monitor.energy_label',
  title: { 'zh-CN': '打工能耗标识' },
  description: { 'zh-CN': '牛马打工人必备' },
  keywords: [WidgetKeyword.RECOMMEND],
  categories: ['fun'],
  lang: 'zh-CN',
  width: 4,
  height: 6,
  minWidth: 3,
  maxWidth: 4,
  minHeight: 5,
  maxHeight: 6,
  previewImage: '/image/preview_energy_label.png',
  path: '/widget/energy_label',
  supportDeployMode: DeployMode.NORMAL,
  configPagePath:
    '/widget/config/energy_label?width=600&height=500&frame=true&transparent=false',
  socialLinks: [
    {
      name: 'github',
      link: 'https://github.com/rtugeek/monitor',
    },
  ],
})

export default EnergyLabelWidget
