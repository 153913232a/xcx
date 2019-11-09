
Page({
  data: {
    PageCur: 'my'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    // wx.navigateTo({
    //   url: `/pages/${ this.data.PageCur }/${this.data.PageCur}`　　// 页面 A
    // })
  },
  onShareAppMessage() {
    return {
      title: 'ColorUI-高颜值的小程序UI组件库',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },
})