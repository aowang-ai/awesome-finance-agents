import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Disclaimer from './Disclaimer.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      // keep "not investment advice" visible in the sidebar on every doc page
      'sidebar-nav-before': () => h(Disclaimer),
    }),
}
