<script setup lang="ts">
// "Copy page" menu: copy / view the page's Markdown copy, or open it in an AI chat.
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { page } = useData()
const route = useRoute()
const open = ref(false)
const state = ref<'idle' | 'copying' | 'copied' | 'error'>('idle')
const root = ref<HTMLElement | null>(null)

const zh = computed(() => page.value.relativePath.startsWith('zh/'))
const t = computed(() =>
  zh.value
    ? {
        copy: '复制页面', copied: '已复制', error: '复制失败', more: '更多选项',
        copyMd: '复制为 Markdown', copyMdHint: '粘贴给大模型使用',
        viewMd: '查看 Markdown', viewMdHint: '纯文本版本',
        chatgpt: '在 ChatGPT 中打开', claude: '在 Claude 中打开', aiHint: '让它读这一页再回答问题',
        prompt: (u: string) => `请阅读 ${u} ，然后回答我关于这一页内容的问题。`,
      }
    : {
        copy: 'Copy page', copied: 'Copied', error: 'Copy failed', more: 'More options',
        copyMd: 'Copy as Markdown', copyMdHint: 'For pasting into an LLM',
        viewMd: 'View as Markdown', viewMdHint: 'Plain-text version',
        chatgpt: 'Open in ChatGPT', claude: 'Open in Claude', aiHint: 'Ask questions about this page',
        prompt: (u: string) => `Read ${u} and answer questions about it.`,
      },
)

const mdPath = computed(() => '/' + page.value.relativePath)
const mdAbs = () => (typeof location === 'undefined' ? mdPath.value : location.origin + mdPath.value)
const chatgptUrl = () => `https://chatgpt.com/?hints=search&q=${encodeURIComponent(t.value.prompt(mdAbs()))}`
const claudeUrl = () => `https://claude.ai/new?q=${encodeURIComponent(t.value.prompt(mdAbs()))}`

let timer: ReturnType<typeof setTimeout> | undefined
async function copy() {
  open.value = false
  state.value = 'copying'
  try {
    const text = fetch(mdPath.value).then((r) => {
      if (!r.ok) throw new Error(String(r.status))
      return r.text()
    })
    // ClipboardItem with a promise keeps the user gesture in Safari
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      await navigator.clipboard.write([
        new ClipboardItem({ 'text/plain': text.then((s) => new Blob([s], { type: 'text/plain' })) }),
      ])
    } else {
      await navigator.clipboard.writeText(await text)
    }
    state.value = 'copied'
  } catch {
    state.value = 'error'
  }
  clearTimeout(timer)
  timer = setTimeout(() => (state.value = 'idle'), 2000)
}

const onDoc = (e: Event) => {
  if (open.value && root.value && !root.value.contains(e.target as Node)) open.value = false
}
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') open.value = false
}
onMounted(() => {
  document.addEventListener('click', onDoc)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDoc)
  document.removeEventListener('keydown', onKey)
})
watch(() => route.path, () => (open.value = false))

const label = computed(() =>
  state.value === 'copied' ? t.value.copied : state.value === 'error' ? t.value.error : t.value.copy,
)
</script>

<template>
  <div v-if="!page.isNotFound" ref="root" class="afa-pageactions">
    <div class="afa-pa-group">
      <button type="button" class="afa-pa-main" :disabled="state === 'copying'" @click="copy">
        <svg v-if="state !== 'copied'" class="afa-pa-icon" viewBox="0 0 16 16" aria-hidden="true">
          <rect x="5.5" y="5.5" width="8" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.3" />
          <path d="M10.5 3.5v-1h-8v8h1" fill="none" stroke="currentColor" stroke-width="1.3" />
        </svg>
        <svg v-else class="afa-pa-icon" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>
        <span aria-live="polite">{{ label }}</span>
      </button>
      <button
        type="button"
        class="afa-pa-toggle"
        :aria-label="t.more"
        :aria-expanded="open"
        aria-haspopup="menu"
        @click.stop="open = !open"
      >
        <svg class="afa-pa-icon" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.4" />
        </svg>
      </button>
    </div>
    <div v-if="open" class="afa-pa-menu" role="menu">
      <button type="button" role="menuitem" class="afa-pa-item" @click="copy">
        <span class="afa-pa-label">{{ t.copyMd }}</span>
        <span class="afa-pa-hint">{{ t.copyMdHint }}</span>
      </button>
      <a role="menuitem" class="afa-pa-item" :href="mdPath" target="_blank" rel="noopener" @click="open = false">
        <span class="afa-pa-label">{{ t.viewMd }} <span class="afa-pa-ext">↗</span></span>
        <span class="afa-pa-hint">{{ t.viewMdHint }}</span>
      </a>
      <div class="afa-pa-sep" role="separator" />
      <a role="menuitem" class="afa-pa-item" :href="chatgptUrl()" target="_blank" rel="noopener" @click="open = false">
        <span class="afa-pa-label">{{ t.chatgpt }} <span class="afa-pa-ext">↗</span></span>
        <span class="afa-pa-hint">{{ t.aiHint }}</span>
      </a>
      <a role="menuitem" class="afa-pa-item" :href="claudeUrl()" target="_blank" rel="noopener" @click="open = false">
        <span class="afa-pa-label">{{ t.claude }} <span class="afa-pa-ext">↗</span></span>
        <span class="afa-pa-hint">{{ t.aiHint }}</span>
      </a>
    </div>
  </div>
</template>
