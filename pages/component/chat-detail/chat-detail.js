// pages/component/chat-detail/chat-detail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    InputBottom: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    InputFocus(e) {
      this.setData({
        InputBottom: e.detail.height
      })
    },
    InputBlur(e) {
      this.setData({
        InputBottom: 0
      })
    }
  }
})
