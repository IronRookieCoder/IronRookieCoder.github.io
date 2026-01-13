<script setup lang="ts">
import Date from './Date.vue'
import { data as posts } from './posts.data.js'
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div class="divide-y divide-gray-200 dark:divide-slate-200/5">
    <div class="pt-6 pb-8 space-y-2 md:space-y-5">
      <p class="text-lg leading-7 text-gray-500 dark:text-white">
        {{ frontmatter.subtext }}
      </p>
    </div>
    <ul class="divide-y divide-gray-200 dark:divide-slate-200/5">
      <li class="py-12" v-for="{ title, url, date, excerpt } of (Array.isArray(posts) ? posts : [])">
        <a
          :href="url"
          class="block space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline hover:bg-gray-50 dark:hover:bg-slate-800/50 -mx-4 px-4 py-4 rounded-lg transition-colors cursor-pointer"
        >
          <Date :date="date" />
          <div class="space-y-5 xl:col-span-3">
            <div class="space-y-6">
              <div class="text-2xl leading-8 font-bold tracking-tight">
                {{ title }}
              </div>
              <div
                v-if="excerpt"
                class="prose dark:prose-invert max-w-none text-gray-500 dark:text-gray-300"
                v-html="excerpt"
              ></div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
