// pages/my/my-car/my-car.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstPhoto: [],
    cars: [
      // {
      //   id: '1',
      //   name: 'A',
      //   price: '30',
      //   url: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'
      // },
      // {
      //   id: '2',
      //   name: 'B',
      //   price: '35',
      //   url: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'
      // },
      // {
      //   id: '3',
      //   name: 'C',
      //   price: '40',
      //   url: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'
      // }, {
      //   id: '4',
      //   name: 'D',
      //   price: '45',
      //   url: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'
      // }
    ],
    content: "我的车辆详情"
  },

  toDetail(e) {
    console.log(e)
    let car = e.currentTarget.dataset.target
    wx.navigateTo({
      url: "/pages/component/home-detai/home-detail?type=1&car=" + JSON.stringify(car),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://localhost:9093/car/getCars',
      data: {
        openId: app.globalData.userInfo.openId
      },
      success: function (res) {
        console.log(res)
        // let list = res.data.data.carTypes
        that.setData({
          cars: res.data.data
        })
        let fist=[]
        that.data.cars.forEach(function(item) {
          fist.push(item.photo_addr.split(',')[0])
        })
        console.log(fist)
        that.setData({
          firstPhoto: fist
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})