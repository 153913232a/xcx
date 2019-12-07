const app = getApp()
Component({
  options: {
    addGlobalClass: true
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    listData: [{
      type: "A",
      data:[
      {
        name: "A1",
        price: "30",
        remark: "remark"
      }
    ]},
      
    ],
    load: true,
    loadModal: false
  },
  created: function() {
    
  },
  ready: function () {
    
    this.setData({
      loadModal: true
    });

    let list = [{}];
    for (let i = 0; i < 26; i++) {
      list[i] = {};
      list[i].name = String.fromCharCode(65 + i);
      list[i].id = i;
      list[i].data = []
      for(var j=0; j < 4; j++) {
        var item = {};
        item.name = list[i].name + j;
        item.remark = "remark" + j;
        item.price = "30";
        list[i].data.push(item)
      }
    }
    this.setData({
      list: list,
      listCur: list[0]
    })
    this.setData({
      loadModal: false
    })
    console.log(this.data);
  },
  methods: {
    loadModal() {
      this.setData({
        loadModal: true
      })
      setTimeout(() => {
        this.setData({
          loadModal: false
        })
      }, 2000)
    },
    onLoad: function (options) {
      console.log('similar onloading')
    },
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        MainCur: e.currentTarget.dataset.id,
        VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
      })
    },
    VerticalMain(e) {
      let that = this;
      let list = this.data.list;
      let tabHeight = 0;
      if (this.data.load) {
        for (let i = 0; i < list.length; i++) {
          let view = wx.createSelectorQuery().in(that).select("#main-" + list[i].id);
          view.fields({
            size: true
          }, data => {
            list[i].top = tabHeight;
            tabHeight = tabHeight + data.height;
            list[i].bottom = tabHeight;
          }).exec();
        }
        that.setData({
          load: false,
          list: list
        })
      }
      let scrollTop = e.detail.scrollTop + 20;
      for (let i = 0; i < list.length; i++) {
        if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
          that.setData({
            VerticalNavTop: (list[i].id - 1) * 50,
            TabCur: list[i].id
          })
          return false
        }
      }
    }
  }
})