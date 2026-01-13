<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useData, useRoute } from 'vitepress'

const { page } = useData()
const route = useRoute()

// 从 page.headers 获取标题数据，如果为空则从DOM读取
const headers = ref<any[]>([])
const activeIndex = ref(-1)

// 从DOM提取headers
const extractHeadersFromDOM = () => {
  const headerElements = document.querySelectorAll('main article h2, main article h3, main article h4, main article h5, main article h6')
  const extractedHeaders: any[] = []

  headerElements.forEach((header, index) => {
    const element = header as HTMLElement
    // 排除footer中的标题
    if (element.closest('footer')) {
      return
    }

    const level = parseInt(element.tagName.charAt(1))
    const title = element.textContent?.trim() || ''
    const id = element.id || `header-${index}`

    // 如果没有ID，生成一个并设置到元素上
    if (!element.id) {
      element.id = id
    }

    extractedHeaders.push({ level, title, id })
  })

  return extractedHeaders
}

// 监听路由变化，重新提取headers
watch(() => route.path, () => {
  activeIndex.value = -1
  nextTick(() => {
    // 首先尝试使用page.headers
    const pageHeaders = page.value.headers || []
    if (pageHeaders.length > 0) {
      headers.value = pageHeaders
    } else {
      // 如果page.headers为空，从DOM提取
      headers.value = extractHeadersFromDOM()
    }
    setupObserver()
  })
})

// 在组件挂载时初始化headers
onMounted(() => {
  nextTick(() => {
    const pageHeaders = page.value.headers || []
    if (pageHeaders.length > 0) {
      headers.value = pageHeaders
      console.log('使用 page.headers:', pageHeaders.length)
    } else {
      headers.value = extractHeadersFromDOM()
      console.log('从DOM提取 headers:', headers.value.length)
    }
    setupObserver()
  })
})

// IntersectionObserver 实例
let observer: IntersectionObserver | null = null

// 监听路由变化，重置激活状态
watch(() => route.path, () => {
  activeIndex.value = -1
  nextTick(() => {
    setupObserver()
  })
})

// 点击导航项，滚动到对应位置
const onNavigate = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// 设置 IntersectionObserver
const setupObserver = () => {
  // 清理旧的 observer
  if (observer) {
    observer.disconnect()
  }

  // 等待 DOM 更新
  nextTick(() => {
    const observerOptions = {
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          const index = headers.value.findIndex(h => h.id === id)
          if (index !== -1) {
            activeIndex.value = index
          }
        }
      })
    }, observerOptions)

    // 观察所有标题元素
    headers.value.forEach((header) => {
      const element = document.getElementById(header.id)
      if (element) {
        observer?.observe(element)
      }
    })
  })
}

onMounted(() => {
  setupObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div class="hidden xl:block">
    <div class="toc-container">
      <h3 class="toc-title">页面导航</h3>
      <ul v-if="headers.length > 0" class="toc-list">
        <li v-for="(header, index) in headers"
            :key="header.id"
            :class="[
              'toc-item',
              `toc-level-${header.level}`,
              { active: index === activeIndex }
            ]">
          <a :href="`#${header.id}`"
             @click.prevent="onNavigate(header.id)">
            {{ header.title }}
          </a>
        </li>
      </ul>
      <p v-else class="toc-empty">暂无目录</p>
    </div>
  </div>
</template>

<style scoped>
.toc-container {
  position: sticky;
  top: 4rem;
  padding: 0.5rem 0;
  max-height: none;
}

.toc-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #374151;
}

.dark .toc-title {
  color: #e5e7eb;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-left: 0;
}

.toc-level-2 {
  margin-left: 0;
}

.toc-level-3 {
  margin-left: 1rem;
}

.toc-level-4 {
  margin-left: 2rem;
}

.toc-level-5,
.toc-level-6 {
  margin-left: 2.5rem;
}

.toc-item a {
  display: block;
  padding: 0.25rem 0;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5rem;
  text-decoration: none;
  transition: color 0.2s;
  border-left: 2px solid transparent;
  padding-left: 0.5rem;
}

.dark .toc-item a {
  color: #9ca3af;
}

.toc-item.active a {
  color: #2563eb;
  font-weight: 500;
  border-left-color: #2563eb;
}

.dark .toc-item.active a {
  color: #60a5fa;
  border-left-color: #60a5fa;
}

.toc-item a:hover {
  color: #1f2937;
}

.dark .toc-item a:hover {
  color: #d1d5db;
}

.toc-empty {
  font-size: 0.875rem;
  color: #9ca3af;
}
</style>
