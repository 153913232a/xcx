// pages/component/my-detail/my-detail.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
   content: {
     type: String,
     default: ''
   },
   tabs: {
     type:Array, 
     default: []
   }
  },

  /**
   * 组件的初始数据
   */
  data: {
    content: '',
    TabCur: '',
    scrollLeft: 0,
    // cars: [
    //   {
    //     id: '1',
    //     name: 'A',
    //     price: '30',
    //     url: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'
    //   },
    //   {
    //     id: '2',
    //     name: 'B',
    //     price: '35',
    //     url: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'
    //   },
    //   {
    //     id: '3',
    //     name: 'C',
    //     price: '40',
    //     url: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'
    //   }, {
    //     id: '4',
    //     name: 'D',
    //     price: '45',
    //     url: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'
    //   }
    // ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e) {
      wx.navigateTo({
        url: "/pages/component/home-detai/home-detail?type=1",
      })
    },
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })

       this.triggerEvent('tabCurEvent', {tabcur:this.data.TabCur}) //传给父组件
    },
  },
  
  onLoad(option,e) {
    // console.log(option)
    // let tabs = JSON.parse(option.tabs) || [];
    // this.setData({
    //   content: option.content,
    //   tabs: tabs
    // })
  }
})
