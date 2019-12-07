// pages/my/my-order/my-order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabcur: '1',
    content: "我的订单",
    tabs: [{
      "name": "我的收入订单",
      "type": "r"
    }, {
      "name": "我的支出订单",
      "type": "t"
    }],
    orders: [
      {
        id: '0',
        name: '汽车A',
        price: '30',
        payU: "小杨",
        useTime: "2",
        time:'12:12',
        url: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'
      },
      {
        id: '1',
        name: '汽车B',
        payU: "小陈",
        price: '35',
        useTime: "2",
        time: '12:00',
        url: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'
      },
      {
        id: '2',
        name: '汽车C',
        price: '40',
        payU: "小陈",
        time: '11:00',
        useTime: "2",
        url: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'
      }, {
        id: '3',
        name: '汽车D',
        price: '45',
        payU: "小张",
        useTime: "2",
        time: '10:03',
        url: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  toDetail(e) {
    let curIndex=e.currentTarget.dataset.id;
    this.setData({
      curIndex: curIndex
    });
    this.selectComponent("#modalId").showModal(e);
  }
})