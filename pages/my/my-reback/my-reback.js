// pages/my/my-reback/my-reback.js
Page({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    content: "我的反馈",
    tabs: [{
      "name": "我收到的反馈",
      "type":"r"
    }, {
      "name": "我提出的反馈",
      "type":"t"
    }]
  },

 
  tabChange(e) {
    console.log(e);
  }
  
})
