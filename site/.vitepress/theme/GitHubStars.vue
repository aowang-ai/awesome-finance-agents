<script setup lang="ts">
// Live stargazer count next to the header GitHub icon.
// Fetched from the public GitHub API and cached in localStorage so
// unauthenticated rate limits (60 req/hour/IP) are not burned on every page.
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const props = withDefaults(defineProps<{ variant?: 'nav' | 'screen' }>(), {
  variant: 'nav',
})

const REPO = 'aowang-ai/awesome-finance-agents'
const REPO_URL = `https://github.com/${REPO}`
const CACHE_KEY = 'afa-github-stars'
const TTL_MS = 30 * 60 * 1000

const { page } = useData()
const zh = computed(() => page.value.relativePath.startsWith('zh/'))
const stars = ref<number | null>(null)

const label = computed(() => {
  if (stars.value == null) return 'GitHub'
  return zh.value
    ? `GitHub 仓库，${stars.value} 星`
    : `GitHub repository, ${stars.value} stars`
})

function format(n: number): string {
  if (n < 1000) return String(n)
  if (n < 1_000_000) {
    const k = n / 1000
    return `${k >= 10 ? k.toFixed(0) : k.toFixed(1).replace(/\.0$/, '')}k`
  }
  const m = n / 1_000_000
  return `${m >= 10 ? m.toFixed(0) : m.toFixed(1).replace(/\.0$/, '')}m`
}

type Cache = { n: number; fresh: boolean }

function readCache(): Cache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { stars?: unknown; ts?: unknown }
    const n = parsed.stars
    const ts = parsed.ts
    if (typeof n !== 'number' || !Number.isFinite(n) || n < 0) return null
    if (typeof ts !== 'number' || !Number.isFinite(ts)) return null
    return { n, fresh: Date.now() - ts < TTL_MS }
  } catch {
    return null
  }
}

function writeCache(n: number) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ stars: n, ts: Date.now() }))
  } catch {
    /* private mode / quota */
  }
}

let inflight: Promise<number | null> | null = null

function loadStars(): Promise<number | null> {
  if (!inflight) {
    inflight = (async () => {
      const cached = readCache()
      if (cached?.fresh) return cached.n
      try {
        const res = await fetch(`https://api.github.com/repos/${REPO}`, {
          headers: { Accept: 'application/vnd.github+json' },
        })
        if (!res.ok) return cached?.n ?? null
        const data = (await res.json()) as { stargazers_count?: unknown }
        const n = data.stargazers_count
        if (typeof n !== 'number' || !Number.isFinite(n) || n < 0) return cached?.n ?? null
        writeCache(n)
        return n
      } catch {
        return cached?.n ?? null
      }
    })()
  }
  return inflight
}

onMounted(() => {
  const cached = readCache()
  if (cached) stars.value = cached.n
  void loadStars().then((n) => {
    if (n != null) stars.value = n
  })
})
</script>

<template>
  <a
    class="afa-github"
    :class="props.variant"
    :href="REPO_URL"
    :aria-label="label"
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg class="afa-github-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
    <span v-if="stars != null" class="afa-github-count">{{ format(stars) }}</span>
  </a>
</template>

<style scoped>
.afa-github {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 36px;
  padding: 0 6px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}
.afa-github:hover {
  color: var(--vp-c-text-1);
}
.afa-github-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
.afa-github-count {
  font-size: 13px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  letter-spacing: -0.01em;
}
.afa-github.screen {
  justify-content: center;
  margin: 8px auto 16px;
}
/* VitePress hides navbar social links below 768px; the count lives in the menu instead. */
@media (max-width: 768px) {
  .afa-github.nav {
    display: none;
  }
}
</style>
