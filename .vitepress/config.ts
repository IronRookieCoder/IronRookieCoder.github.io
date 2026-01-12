import { defineConfig } from 'vitepress'
import { genFeed } from './genFeed.js'

export default defineConfig({
  lang: 'zh-CN',
  title: 'IronRookieCoder',
  description: 'The blog for IronRookieCoder',
  head: [['link', { rel: 'icon', href: '/logo.ico' }]],
  cleanUrls: true,
  buildEnd: genFeed
})
