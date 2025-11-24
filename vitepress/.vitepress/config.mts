import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Monitor',
  description: 'Monitor for server',
  srcDir: 'docs',
  base: '/monitor/doc',
  head: [
    ['meta', { name: 'keywords', content: '监控, 服务器监控, Monitor, 实时监控, 性能分析, PM2, API, 数据备份, 数据恢复, 桌面组件, 日志管理, 可视化, 集群监控, Node.js, Vue, VitePress' }],
    ['meta', { name: 'author', content: 'rtugeek' }],
  ],
  themeConfig: {
    nav: [
      { text: '指南', link: '/quick-start' },
    ],
    sidebar: [
      {
        text: '快速上手',
        link: '/quick-start',
      },
      {
        text: '服务端',
        items: [
          { text: 'PM2部署', link: '/server/pm2' },
          { text: 'API', link: '/server/api' },
        ],
      },
      {
        text: 'Web端',
        items: [
          { text: '数据备份/恢复', link: '/client/data' },
          { text: '桌面组件', link: 'https://rtugeek.github.io/monitor/#/widget/homepage' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
