// pages/component/home-detai/home-detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    car:{},
    type: 0,
    pickerStatus: ['闲置中', '使用中', '维修中'],
    imgList: []
    // imgList: [],
    // pickerStatus: ['闲置中', '使用中', '维修中'],
    // status: '0',
    // region: [
    // ]
  },
  reback(e) {
    this.selectComponent("#modalId").showModal(e);
  },
  message() {
    wx.navigateTo({
      url: '/pages/component/chat-detail/chat-detail'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type!=undefined) {
      this.setData({
        type: options.type,
        car: JSON.parse(options.car)
      })
      this.setData({
        imgList: this.data.car.photo_addr.split(',')
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    this.setData({
      region: [
        app.globalData.position.province,
        app.globalData.position.city,
        app.globalData.position.district
      ]
    })
    console.log(this.data)
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
  formSubmit(e) {
    console.log(e);
    let data = e.detail.value;
    let sendData = {
      isNew: data.isNew,
      addrDetail: data.detail,
      status: data.status,
      price: data.price,
      id: this.data.car.id,
      imgList: this.data.imgList.join(',')
    }
    wx.request({
      url: 'http://localhost:9093/car/updateCar',
      data: {
        sendData
      },
      success:function(e) {
        if(e.data.code==='0') {
          wx.showModal({
            title: '提示',
            content: '修改成功！',
          })
        }
      }
    })
  
  },
  ChooseImage() {
    // console.log(app.globalData.userInfo)
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
 
  PickerChange(e) {
    console.log(e);
    this.setData({
      status: e.detail.value
    })
  },

  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  }
})