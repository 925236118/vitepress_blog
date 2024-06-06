import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Moshangzhu's Blog",
  description: "Hi, Welcome to my blog!",
  srcDir: './docs',
  markdown: {
    math: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '独立游戏开发', link: '/独立游戏开发总览' },
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: '独立游戏开发总览', link: '/独立游戏开发总览' },
          { 
            text: 'Godot笔记', 
            link: '/Godot', 
            items: [
              { text: 'Godot有限状态机', link: '/Godot有限状态机' },
              { text: 'Godot着色器案例', link: '/Godot着色器案例' },
            ]
          },
          { 
            text: 'Git', 
            link: '/Git', 
            items: [
              { text: 'Git安装', link: '/Git安装' },
              { text: 'Git配置SSH', link: '/Git配置SSH' },
              { text: '将新的仓库推送到Github', link: '/将新的仓库推送到Github' },
              { text: 'Git常见命令', link: '/Git常见命令' },
              { text: '常用Git工具', link: '/常用Git工具' },
            ]
          },
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/925236118' }
    ],
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  }
})
