export default {
  state: {
    iframeUrl: [],   // 当前嵌套页面路由路径
    iframeUrls: []   // 所有嵌套页面路由路径访问URL
  },
  getters: {},
  mutations: {
    setIFrameUrl(state, iframeUrl) {  // 设置iframeUrl
      state.iframeUrl = iframeUrl
    },
    addIFrameUrl(state, iframeUrl) {  // iframeUrls
      state.iframeUrls.push(iframeUrl)
      let hash = {}
      let data = state.iframeUrls.reduce((preVal, curVal) => {
        hash[curVal.path] ? '' : hash[curVal.path] = true && preVal.push(curVal)
        return preVal
      }, [])
      state.iframeUrls = data
    }
  },
  actions: {}
}
