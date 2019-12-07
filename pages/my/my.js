// const io = require('../../lib/weapp.socket.io.js');
// const socket = io('ws://localhost:9093')
// socket.emit('send', {title: '123'})
// socket.on('recvMsg', function (data) {
//   console.log(data)
// })
Component({
  options: {
    addGlobalClass: true
  },
  ready: function() {
    console.log('ready')
    // socket.on('recvMsg', function(data) {
    //   console.log(data)
    // })
  },
  data: {
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
    toMyDetail(e) {
      console.log(e);
      let type = e.target.dataset.content || e.currentTarget.dataset.content;
      wx.navigateTo({
        url: this.data.types[type]
      })
    }
  }
})