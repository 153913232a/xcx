const app = getApp();
var amapFile = require('../../lib/amap-wx.js');
var KEY ='a69d326cc296c52931441a7f0d5e7b39';
var myAmapFun = new amapFile.AMapWX({ key: KEY });
Component({
  options: {
    addGlobalClass: true
  },
  data: {
    address: {},
    modalName: '',
    position: {},
    showLocation: true,
    markers: [{
      iconPath: "icon-location.png",
      id: 0,
      latitude: 29.8161,
      longitude: 121.547,
      width: 40,
      height: 40
    }, {
        iconPath: "icon-location.png",
        id: 1,
        latitude: 29.8189,
        longitude: 121.547,
        width: 40,
        height: 40
      }
    ],
    polyline: [{
      points: [],
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
  methods: {
    regionchange(e) {
      var that = this;
      if (!this.data.position.latitude) {
        wx.getLocation({
          type: 'wgs84',
          success(res) {
            for (let key in res) {
              app.globalData.position[key] = res[key];
            }
            console.log(res);
            that.setData({
              'position': {
                latitude: app.globalData.position.latitude,
                longitude: app.globalData.position.longitude
              }
            })

            console.log(that.data.position);
            var location = that.data.position.longitude + ',' + that.data.position.latitude;

            myAmapFun.getRegeo({
              location: location,
              success: function (data) {
                app.globalData.position.province = data[0].regeocodeData.addressComponent.province;
                app.globalData.position.city = data[0].regeocodeData.addressComponent.city;
                app.globalData.position.district = data[0].regeocodeData.addressComponent.district;
                that.setData({
                  address: {
                    city: app.globalData.position.city 
                  }
                })
              },
              fail: function (info) {
                //失败回调
                console.log(info)
              }
            })
          }
        })
      }
    },
    markertap(e) {
      var that = this
      var originLg = this.data.position.longitude;
      var originLa = this.data.position.latitude;
      if (!originLa || !originLg) {
        console.log("无法获取位置！");
        return;
      }
      var origin = originLg + ',' + originLa;
      var des = this.data.markers[e.markerId].longitude + ',' + this.data.markers[e.markerId].latitude;
      console.log(this.data.position)
      this.showModal()
      // if (this.data.position.des &&
      //   (this.data.position.des) !== des) {
      //   that.setData({
      //     polyline: [{
      //       points: []
      //     }]
      //   });
      // }

      // if (that.data.polyline[0].points.length) {
      //   wx.navigateTo({
      //     url: "/pages/component/home-detai/home-detail?type=0",
      //   })
      //   return;
      // }

      myAmapFun.getWalkingRoute({
        origin: origin,
        destination: des,
        success: function (data) {
          console.log(data);
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
            }],
            position: 　{
              latitude: app.globalData.position.latitude,
              longitude: app.globalData.position.longitude,
              des: des
            }
          });

          console.log(that.data);
      
          
          
          // if (data.paths[0] && data.paths[0].distance) {
          //   that.setData({
          //     distance: data.paths[0].distance + '米'
          //   });
          // }
          // if (data.taxi_cost) {
          //   that.setData({
          //     cost: '打车约' + parseInt(data.taxi_cost) + '元'
          //   });
          // }

        },
        fail: function (info) {
          console.log(info)
        }
      })
    },
    controltap(e) {
      console.log(e.controlId)
    },
    showModal(e) {
      this.setData({
        modalName: 'bottomModal'
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    toHomeDetail(){
      wx.navigateTo({
        url: "/pages/component/home-detai/home-detail?type=0",
      })
    }
  }
})