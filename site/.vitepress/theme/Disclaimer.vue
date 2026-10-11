<script setup lang="ts">
import { useData } from 'vitepress'
const { lang } = useData()
</script>

<template>
  <div class="afa-disclaimer" role="note">
    <template v-if="lang === 'zh-CN'">
      <strong>不构成投资建议。</strong>收录不代表背书；模拟盘不等于实盘。
    </template>
    <template v-else>
      <strong>Not investment advice.</strong> Inclusion is not endorsement; paper trading is not live trading.
    </template>
  </div>
</template>
