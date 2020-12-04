import Vue from 'vue'
import vuex from 'vuex'
import vuexAlong from 'vuex-along'

Vue.use(vuex)
// vuexAlong.onlySession(true)
import app from './modules/app'
import tab from './modules/tab'
import iframe from './modules/iframe'
import user from './modules/user'
import menu from './modules/menu'
import sysInfo from './modules/sys'

const store = new vuex.Store({
  modules: {
    app: app,
    tab: tab,
    iframe: iframe,
    user: user,
    menu: menu,
    sysInfo: sysInfo
  },
  // plugins: [vuexAlong]
})

export default store
