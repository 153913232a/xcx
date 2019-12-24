const app = getApp()
const isAuth = require('../../utils/util.js').isAuth


Component({
  options: {
    addGlobalClass: true
  },
  data: {
    toggleDelay: false,
    messages: [
      // {
      //   name: "s1",
      //   created_ts: "08:54",
      //   unread_num:"5"
      // },
      // {
      //   name: "s2",
      //   created_ts: "10:54",
      //   unread_num: "3"
      // }
      ],
    animation: ''
  },
  methods: {
    toChatDetail(e) {
      let message = e.currentTarget.dataset['message'];
      console.log(message)
      // let t_chat_id = message.t_user_id +message.r_user_id;
      // let r_chat_id = message.r_user_id +message.t_user_id;
      wx.navigateTo({
        url: '/pages/component/chat-detail/chat-detail?chat_id=' + message.id+'&r_user_id=' + message.r_user_id + '&t_user_id='+message.t_user_id
      })
    },
    // ListTouch触摸开始
    ListTouchStart(e) {
      this.setData({
        ListTouchStart: e.touches[0].pageX
      })
    },

    // ListTouch计算方向
    ListTouchMove(e) {
      this.setData({
        ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
      })
    },

    // ListTouch计算滚动
    ListTouchEnd(e) {
      if (this.data.ListTouchDirection == 'left') {
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
      } else {
        this.setData({
          modalName: null
        })
      }
      this.setData({
        ListTouchDirection: null
      })
    },
    toggle(e) {
      console.log(e);
      var animation = e.currentTarget.dataset.class;
      var that = this;
      this.setData({
        animation: animation
      })
      setTimeout(function () {
        that.setData({
          animation: ''
        })
      }, 1000)
    },
    toggleDelay() {
      var that = this;
      that.setData({
        toggleDelay: true
      })
      setTimeout(function () {
        that.setData({
          toggleDelay: false
        })
      }, 1000)
    },
    formatData(data) {
      let obj = {}
      obj.message = data.message;
      obj.created_ts = data.created_ts;
      obj.unread_num = data.unread_num;
      obj.id=data.id;
      obj.r_user_id=data.r_user_id;
      obj.t_user_id=data.t_user_id;
      return obj;
    },
    getMessage(data) {
      // 请求消息列表
      var that = this
      if (!JSON.parse(wx.getStorageSync('chatId'))){  // 说明没有
        return;
      }
      let chatIds = JSON.parse(wx.getStorageSync('chatId')) || []
      wx.request({
        url: 'http://localhost:9093/message/getMessages',
        data: {
          chatIds: data!==undefined? data: chatIds,
          userId: app.globalData.userInfo.openId
        },
        success: function (res) {
          let data = res.data.data;
          console.log('data', data);


          let arr = []
          let allUnReadNum=0;
          data.forEach((item) => {
            let obj = {}
            if (item.t_user_id === app.globalData.userInfo.openId) {
              obj = that.formatData(item);
              obj.avatar_url = item.r_avatar_url;
              obj.name = item.r_name;
            } else if (item.r_user_id === app.globalData.userInfo.openId) {
              obj = that.formatData(item);
              obj.avatar_url = item.t_avatar_url;
              obj.name = item.t_name;
            }
            allUnReadNum+=obj.unread_num;
            arr.push(obj)
          })

          // that.triggerEvent('changeUnReadfNum', allUnReadNum)
          
          that.setData({
            messages: arr
          })
        }
      })
    }
  },
  ready: function () {
    console.log("12")
    if(!isAuth()) {
      return;
    }
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.getMessage(); // 初始化
    // 监听对方发来的信息
  }
})