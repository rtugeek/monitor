import { WidgetPackage } from '@widget-js/core'

export default new WidgetPackage({
  author: 'Neo Fu',
  description: {
    'zh-CN': '监控计算机CPU、内存、磁盘、网络等信息',
    'en-US': 'Monitor computer CPU, memory, disk, network and other information',
  },
  entry: '/',
  remote:{
    base: '/monitor',
    hostname: 'widgetjs.cn',
    hash: true,
  },
  requiredAppVersion:'24.9.1',
  hash: true,
  homepage: '',
  name: 'widget.js.monitor',
  title: {
    'zh-CN': '硬件监控组件包',
    'en-US': 'Hardware Monitor Widget Package',
  },
  devOptions: {
    folder: './src/widgets/',
  },
})
