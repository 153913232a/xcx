// const io = require('../../lib/weapp.socket.io.js');
// const socket = io('ws://localhost:9093')
// socket.emit('send', {title: '123'})
// socket.on('recvMsg', function (data) {
//   console.log(data)
// })
const app = getApp()
let userInfo = app.globalData.userInfo
let position = app.globalData.position
const OPENID_URL ='https://api.weixin.qq.com/sns/jscode2session'
const APP_ID = 'wxffd37f2dbbb5c6f5';
const SECRET = '35e2e982df2ea2bfb50bfa58ecfeb118';
const isAuth = require('../../utils/util.js').isAuth

Component({
  options: {
    addGlobalClass: true
  },
  ready: function() {
    console.log(app.globalData)
    console.log(this.data.userInfo)
    //初始化
    if (this.data.userInfo.avatarUrl === './user-unlogin.png' && app.globalData.userInfo.openId) {
      this.setData({
        'userInfo': app.globalData.userInfo
      })
    }
    // socket.on('recvMsg', function(data) {
    //   console.log(data)
    // })
  },
  data: {
    userInfo: {
      avatarUrl: './user-unlogin.png'
    }
      ,
    // tabs: {
    //   "我的车辆": [],
    //   "我的收藏": [],
    //   "我的订单":[
    //     {
    //       id: 1,
    //       name: "支出订单"
    //     },
    //     {
    //       id: 2,
    //       name: "收入订单"
    //     }
    //   ], 
    //   "我的反馈": [
    //     {
    //       id: 1,
    //       name: "我提出的反馈"
    //     },
    //     {
    //     id: 2,
    //     name: "我收到的反馈"
    //   }]
    // },
    types:{
      "我的车辆": "/pages/my/my-car/my-car",
      "我的反馈": "/pages/my/my-reback/my-reback",
      "我的订单": "/pages/my/my-order/my-order"
    }
    

  },
  methods: {
    getOpenId() {
      return new Promise((resolve, reject) =>{
        wx.login({
          success: res => {
           
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              wx.request({
                url: OPENID_URL + '?appid=' + APP_ID + '&secret=' + SECRET + '&grant_type=authorization_code&js_code=' + res.code,
                header: { 'content-type': 'application/json' },
                success: function (res) {
              
                  resolve(res.data)
                }
              })
            }
          }
        })
      })
     
    },
    toMyDetail(e) {
      if(!isAuth()) {
        return
      }

      let type = e.target.dataset.content || e.currentTarget.dataset.content;
      wx.navigateTo({
        url: this.data.types[type]
      })
    },
   async formatSendData (data) {
      // 获取openid
      var openData=await this.getOpenId()
      data.longitude = position.longitude
      data.latitude = position.latitude
      return {
        id: openData.openid,
        city: data.city,
        name: data.nickName,
        gender: data.gender,
        avatar_url: data.avatarUrl,
        age: data.age || 0,
        longitude: data.longitude,
        latitude: data.latitude
      }
    },
    async getUserInfo (e) {
      if (JSON.stringify(app.globalData.userInfo) === '{}') {
        let that = this;
        // console.log(e)
        // 获取用户信息
        
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                async success(res) {
                  console.log(res)
                  that.setData({
                    userInfo: res.userInfo
                  })
                  app.globalData.userInfo = res.userInfo
                  var sendUser = await that.formatSendData(res.userInfo)
                  app.globalData.userInfo.openId = sendUser.id
                  wx.request({
                    url: 'http://localhost:9093/users/updateUser',
                    data: {
                      sendUser: sendUser 
                    },
                    success: function (res) {
                      that.triggerEvent('changeNum')
                    }
                  })  
                },
                fail(res) {
                  console.log("获取用户信息失败", res)
                }
              })
            } else {
              console.log("未授权=====")
            }
          }
        })
      } else {
        this.setData({
          'userInfo': app.globalData.userInfo
        })
      }
    },
  }
})