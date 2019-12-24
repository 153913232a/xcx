const app = getApp()
Page({
  data: {
    PageCur: 'home',
    unReadNum: null
  },
  onLoad() {
  }, 
  getUnReadNum() {
    var that = this
    if (!JSON.parse(wx.getStorageSync('chatId'))) {  // 说明没有
      return;
    }
    let chatIds = JSON.parse(wx.getStorageSync('chatId')) || []
    wx.request({
      url: 'http://localhost:9093/message/getMessages',
      data: {
        chatIds: chatIds,
        userId: app.globalData.userInfo.openId
      },
      success: function (res) {
        let data = res.data.data;
        let allUnReadNum = 0;
        data.forEach((item) => {
          allUnReadNum += item.unread_num;
        })
        that.setData({
          unReadNum: allUnReadNum
        })
      }
    })
  },
  NavChange(e) {
    // debugger
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    // if(this.data.PageCur==='message' && JSON.stringify(app.globalData.userInfo!=null)) {
    //   this.getUnReadNum()
    // }
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
  changeUnReadfNum(e) {
    // this.setData({
    //   unReadNum: e.detail
    // })
  },
  changeNum() {
    this.getUnReadNum()
  }
})