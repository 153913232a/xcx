// pages/component/chat-detail/chat-detail.js
const app = getApp()
const io = require('../../../lib/weapp.socket.io.js');
const socket = io('ws://localhost:9093')
Page({
  /**
   * 组件的属性列表
   */


  /**
   * 组件的初始数据
   */
  data: {
    InputBottom: 0,
    messageData: [],
    userInfo: {},
    message: 0
  },

  /**
   * 组件的方法列表
   */
  onLoad: function (options) {
    console.log('options:', options)
    let chat_id = options.chat_id;
    this.initMessage(chat_id)
    let r_user_id = app.globalData.userInfo.openId===options.r_user_id? options.t_user_id : options.r_user_id;
    app.globalData.userInfo.r_user_id=r_user_id;
    //监听列表 
    socket.on('recId',  (chatId)=> {

      // 更新chatId
      var value = wx.getStorageSync('chatId')
      console.log(value,typeof value)
      if (!value) {
        value = []
        value.push(chatId)
        wx.setStorage({
          key: 'chatId',
          data: JSON.stringify(value)
        })
      } else {
        value = JSON.parse(value)
        if (value.indexOf(chatId) === -1) {
          value.push(chatId)
          wx.setStorage({
            key: 'chatId',
            data: JSON.stringify(value)
          })
        }
      }
      this.initMessage(chatId)
    })   

    var that = this
    this.setData({
      userInfo: app.globalData.userInfo
    })
    
    

  },
  initMessage(chat_id) {
    let that=this
    wx.request({
      url: 'http://localhost:9093/message/getMyMessage',
      data: {
        sendData: {
          chat_id
        }
      },
      success: function (e) {
        that.setData({
          messageData: e.data.data
        })
      }
    })
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  bindMessage(e) {
    console.log(e)
    this.setData({
      message: e.detail.value
    })
  },
  send() {
    let message = this.data.message;
    console.log(message, app.globalData.userInfo)
    socket.emit('insertMessage', { t_user_id: app.globalData.userInfo.openId, r_user_id: "3a", message: message }) 

  }
})
