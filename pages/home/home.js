const app = getApp();
var amapFile = require('../../lib/amap-wx.js');
Page({
  data: {
    position: {},
    markers: [{
      iconPath: "icon-location.png",
      id: 0,
      latitude: 29.8174,
      longitude: 121.547,
      width: 40,
      height: 40
    }, {
        iconPath: "icon-location.png",
        id: 2,
        latitude: 29.8179,
        longitude: 121.547,
        width: 40,
        height: 40
      }
    ],
    polyline: [{
      points: [
      ],
      color: "#FF0000DD",
      width: 2,
      arrowLine:true,
      dottedLine: false
    }],
    // controls: [{
    //   id: 1,
    //   iconPath: '/resources/location.png',
    //   position: {
    //     left: 0,
    //     top: 300,
    //     width: 50,
    //     height: 50
    //   },
    //   clickable: true
    // }]
  },
  onLoad:function() {
    console.log('123');
  },
  onShow: function () {
    console.log('123');
  },
  regionchange(e) {
    var that = this;
    if (!this.data.position.latitude) {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          for (let key in res) {
            app.globalData.userInfo[key] = res[key];
          }
          console.log(res);
          that.setData({
            'position': {
              latitude: app.globalData.userInfo.latitude,
              longitude: app.globalData.userInfo.longitude
            }
          })
        }
      })
      var that = this
      var myAmapFun = new amapFile.AMapWX({ key: 'a69d326cc296c52931441a7f0d5e7b39' });
      myAmapFun.getRegeo({
        location: '121.579005,29.885258',
        success: function (data) {
          console.log(data)
        },
        fail: function (info) {
          //失败回调
          console.log(info)
        }
      })
    }
  },
  markertap(e) {
    var that = this
    var myAmapFun = new amapFile.AMapWX({ key: 'a69d326cc296c52931441a7f0d5e7b39' });
    myAmapFun.getDrivingRoute({
      origin: '121.55027,29.87386',
      destination: '121.55127,29.87386',
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 2
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.taxi_cost) {
          that.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }

      },
      fail: function (info) {

      }
    })
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})