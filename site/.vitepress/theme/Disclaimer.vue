<script setup lang="ts">
import { useData } from 'vitepress'
const { lang } = useData()
</script>

<template>
  <p class="afa-sidebar-note" role="note">
    <template v-if="lang === 'zh-CN'">不构成投资建议。收录不代表背书；模拟盘不等于实盘。</template>
    <template v-else>Not investment advice. Inclusion is not endorsement; paper trading is not live trading.</template>
  </p>
</template>
