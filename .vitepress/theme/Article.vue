<script setup lang="ts">
import Date from './Date.vue'
import Author from './Author.vue'
import Toc from './Toc.vue'
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { data as posts } from './posts.data.js'

const { frontmatter: data } = useData()

const route = useRoute()

// 确保 posts 是数组
const postsArray = Array.isArray(posts) ? posts : []

function findCurrentIndex() {
  return postsArray.findIndex((p) => p.url === route.path)
}

// use the customData date which contains pre-resolved date info
const currentIndex = computed(() => findCurrentIndex())
const date = computed(() => {
  const index = currentIndex.value
  return index >= 0 && postsArray[index] ? postsArray[index].date : null
})
const nextPost = computed(() => {
  const index = currentIndex.value
  return index >= 0 && index > 0 && postsArray[index - 1]
    ? postsArray[index - 1]
    : undefined
})
const prevPost = computed(() => {
  const index = currentIndex.value
  return index >= 0 && index < postsArray.length - 1 && postsArray[index + 1]
    ? postsArray[index + 1]
    : undefined
})

const agentYaml = computed(() => {
  // Exclude VitePress internal fields
  const excludeFields = ['title', 'date', 'author', 'index', 'layout']
  
  // Get all frontmatter keys except excluded ones
  const customFields = Object.keys(data.value).filter(
    key => !excludeFields.includes(key) && data.value[key] !== undefined
  )
  
  // If no custom fields, don't show anything
  if (customFields.length === 0) return ''
  
  // Generate YAML from all custom fields
  let yaml = '---\n'
  customFields.forEach(key => {
    yaml += `${key}: ${data.value[key]}\n`
  })
  yaml += '---'
  
  return yaml
})
</script>

<template>
  <article class="xl:divide-y xl:divide-gray-200 dark:xl:divide-slate-200/5">
    <div class="divide-y xl:divide-y-0 divide-gray-200 dark:divide-slate-200/5 pb-16 xl:pb-20">
      <!-- 移动端布局 -->
      <div class="xl:hidden space-y-10">
        <Author />
        <!-- Agent/Command Metadata Card (Mobile) -->
        <div v-if="agentYaml" class="language-yaml">
          <pre class="shiki bg-gray-50 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-gray-200 dark:border-slate-700"><code>{{ agentYaml }}</code></pre>
        </div>
        <div class="divide-y divide-gray-200 dark:divide-slate-200/5">
          <Content class="prose dark:prose-invert max-w-none pt-10 pb-8" />
        </div>
      </div>

      <!-- 桌面端三列布局 -->
      <div class="hidden xl:grid xl:gap-x-10" style="grid-template-columns: 140px 1fr 160px; grid-template-areas: 'author-nav content toc'">
        <div class="space-y-8" style="grid-area: author-nav">
          <Author />
          <nav class="text-sm font-medium leading-5 divide-y divide-gray-200 dark:divide-slate-200/5">
            <div v-if="prevPost" class="py-4">
              <span class="text-xs tracking-wide uppercase text-gray-500 dark:text-white mb-2">
                Previous
              </span>
              <a class="link block hover:text-gray-900 dark:hover:text-white" :href="prevPost.url">
                {{ prevPost.title }}
              </a>
            </div>
            <div v-if="nextPost" class="py-4">
              <span class="text-xs tracking-wide uppercase text-gray-500 dark:text-white mb-2">
                Next
              </span>
              <a class="link block hover:text-gray-900 dark:hover:text-white" :href="nextPost.url">
                {{ nextPost.title }}
              </a>
            </div>
            <div class="pt-4">
              <a class="link block hover:text-gray-900 dark:hover:text-white" href="/">
                ← Back to the blog
              </a>
            </div>
          </nav>
        </div>
        <div class="divide-y divide-gray-200 dark:divide-slate-200/5" style="grid-area: content">
          <!-- Agent/Command Metadata Card (Desktop) -->
          <div v-if="agentYaml" class="language-yaml mb-8 mt-10">
            <pre class="shiki bg-gray-50 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-gray-200 dark:border-slate-700"><code>{{ agentYaml }}</code></pre>
          </div>
          <Content class="prose dark:prose-invert max-w-none pt-10 pb-8" />
        </div>
        <div style="grid-area: toc">
          <Toc />
        </div>
      </div>

      <!-- 移动端footer -->
      <footer
        class="xl:hidden text-sm font-medium leading-5 divide-y divide-gray-200 dark:divide-slate-200/5"
      >
        <div v-if="nextPost" class="py-8">
          <span class="text-xs tracking-wide uppercase text-gray-500 dark:text-white">
            Next Article
          </span>
          <div class="link mt-2">
            <a :href="nextPost.url">{{ nextPost.title }}</a>
          </div>
        </div>
        <div v-if="prevPost" class="py-8">
          <span class="text-xs tracking-wide uppercase text-gray-500 dark:text-white">
            Previous Article
          </span>
          <div class="link mt-2">
            <a :href="prevPost.url">{{ prevPost.title }}</a>
          </div>
        </div>
        <div class="pt-8">
          <a class="link" href="/">← Back to the blog</a>
        </div>
      </footer>
    </div>
  </article>
</template>
