import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Monitor',
  description: 'Monitor for server',
  srcDir: 'docs',
  base: '/monitor/doc',
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
