const poster = {
  state: {
    preview: false,
    previewUrl: ''
  },
  mutations: {
    //设置海报预览弹出框状态,和预览的图片
    SET_PREVIEW(state, data) {
      state.preview = true
      state.previewUrl = data
    },
    // 取消预览
    CANCEL_PREVIEW(state) {
      state.preview = false
    }
  },
  actions: {}
}
export default poster