const app = getApp()
Page({
  data: {
    PageCur: 'home'
  },
  onLoad() {
    console.log(app)
  }, 
  NavChange(e) {
    // debugger
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    // let page = getCurrentPages().pop();
    // if (page == undefined || page == null) {
    //   return;
    // }
    // if(page.onLoad) {
    //   page.onLoad();
    // }
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