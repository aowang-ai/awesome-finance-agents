// No bundled Inter: use the reader's system UI font (and system CJK fonts).
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme-without-fonts'
import CopyPage from './CopyPage.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, { 'doc-before': () => h(CopyPage) }),
}
