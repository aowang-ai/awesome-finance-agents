import { h } from 'vue'
// No bundled Inter: use the reader's system UI font (and system CJK fonts).
import DefaultTheme from 'vitepress/theme-without-fonts'
import Disclaimer from './Disclaimer.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      // quiet one-line reminder at the bottom of the sidebar on every doc page
      'sidebar-nav-after': () => h(Disclaimer),
    }),
}
