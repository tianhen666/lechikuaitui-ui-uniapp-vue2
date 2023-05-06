const poster = {
  state: {
    preview: false,
    previewUrl: '',
    id: 0
  },
  mutations: {
    //设置海报预览弹出框状态,和预览的图片
    SET_PREVIEW(state, itemData) {
      state.preview = true
      state.previewUrl = itemData.content + '?imageView2/0/w/300/h/360/q/75'
      state.id = itemData.id
    },
    // 取消预览
    CANCEL_PREVIEW(state) {
      state.preview = false
    }
  },
  actions: {}
}
export default poster