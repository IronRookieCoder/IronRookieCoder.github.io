import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  excerpt: string | undefined
}

declare const data: Post[]
export { data }

export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    if (!raw || !Array.isArray(raw)) {
      return []
    }
    return raw
      .map(({ url, frontmatter, excerpt }) => {
        // 确保必需的字段存在
        if (!frontmatter || !frontmatter.title) {
          console.warn(`Warning: Post at ${url} is missing title, skipping`)
          return null
        }
        return {
          title: frontmatter.title,
          url,
          excerpt,
          date: frontmatter.date ? formatDate(frontmatter.date) : {
            time: Date.now(),
            string: 'Unknown date'
          }
        }
      })
      .filter((post): post is Post => post !== null)
      .sort((a, b) => b.date.time - a.date.time)
  }
})

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}
