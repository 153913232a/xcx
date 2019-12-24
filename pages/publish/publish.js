// pages/publish/publish.js
const app = getApp()
const isAuth = require('../../utils/util.js').isAuth
Component({

  /**
   * 页面的初始数据
   */
  options: {
    addGlobalClass: true
  },

  data: {
    imgList: [],
    picker: [],
    pickerStatus: ['闲置中', '使用中', '维护中'],
    region: [
    ]
  },
  ready: function () {
    isAuth();

    this.setData({
      region: [
        app.globalData.position.province,
        app.globalData.position.city,
        app.globalData.position.district
      ]
    })
    if(!app.globalData.carTypes.length) {
      var that = this
      wx.request({
        url: 'http://localhost:9093/publish/getCarTypes',
        success: function (res) {
          
          app.globalData.carTypes = res.data.data;
          let picker = []
          app.globalData.carTypes.forEach((type) => {
            picker.push(type.name);
          })
          that.setData({
            picker: picker
          })
        }
      })
    } else {
      let picker = []
      app.globalData.carTypes.forEach((type) => {
        picker.push(type.name);
      })
      this.setData({
        picker: picker
      })
    }
    
  },
  methods: {
    formatData(data) {
      return {
        addr_detail: data.detail,
        isNew: data.isNew? '1': '0',
        price: data.price,
        status: data.status,
        imgList: this.data.imgList.join(','),
        name: data.name,
        carTypeId: data.type,
        latitude: app.globalData.position.latitude,
        logitude: app.globalData.position.longitude,
        userId: app.globalData.userInfo.openId
      }
    },
    formSubmit(e) {
      if(!isAuth()) {
        return;
      }
      let sendData = this.formatData(e.detail.value)
      console.log(sendData)
      wx.request({
        url: 'http://localhost:9093/publish/insertCar',
        data:{
          sendData
        },
        success: (res) => {
          console.log(res)
          if(res.data.code==='0') {
            wx.showModal({
              title: '提示',
              content: '新增成功！',
            })
          }
        }
      })
    },
    ChooseImage() {
      console.log(app.globalData.userInfo)
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
        title: '召唤师',
        content: '确定要删除这段回忆吗？',
        cancelText: '再看看',
        confirmText: '再见',
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

    PickerTypeChange(e) {
      this.setData({
        status: e.detail.value
      })
    },
    PickerChange(e) {
      console.log(e);
      this.setData({
        index: e.detail.value
      })
    },

    RegionChange: function (e) {
      this.setData({
        region: e.detail.value
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(0)
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