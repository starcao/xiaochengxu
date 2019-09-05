// pages/work/index.js
var util = require('../../utils/util.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    markers:[],
    times: {},
    wkpInfo: {},
    startnull: 1,
    endnull: 1,
    startobj: {},
    endobj: {},
    signText: '上班签到'
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

  },
  onLoad: function () {
    this.setData({
      times: util.customtime(new Date())
    })

    var $this = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        $this.setData({longitude: res.longitude, latitude: res.latitude});
        var mark = {longitude: res.longitude, latitude: res.latitude};
        var marks = $this.data.markers;
        marks.push(mark);
        $this.setData({markers: marks})
      },
    })

    wx.getSystemInfo({
      success: function (res) {
        $this.setData({ phonemodel: res.model })
      }
    })

    wx.startWifi({
      success: function (res) {
        wx.getConnectedWifi({
          success: function(res) {
            $this.setData({wifi: res.wifi.SSID});
          },
          fail: function() {
            wx.showModal({
              title: '提示',
              content: '请连接有效的WIFI，并重新启动小程序',
            })
          }
        })
      }
    })

    wx.request({
      url: 'http://wx.zjnuoxin.cn/index.php?r=v1/work/sign',
      method: 'POST',
      header: {"Content-Type": "application/x-www-form-urlencoded"},
      data: {'token': app.globalData.token},
      success: function(res) {
        if (res.data.resCode == "0000") {
          $this.setData({wkpInfo: res.data.data.workplaceArray[0]})
          if (res.data.data.workplaceArray[0].list[0]) {
            $this.setData({startnull: 0, startobj: {time: res.data.data.workplaceArray[0].list[0].time, addr: res.data.data.workplaceArray[0].list[0].address}            })
            if (res.data.data.workplaceArray[0].list[0].Type == 1 || $this.data.times.hour >= 12) {
                $this.setData({'signText': '下班签到'})
            }
          } 
          if (res.data.data.workplaceArray[0].list[1]) {
            $this.setData({endnull: 0, endobj: {time: res.data.data.workplaceArray[0].list[1].time, addr: res.data.data.workplaceArray[0].list[1].address}})
          }
        } else {
          if(res.data.resCode == '1101') {
            wx.showModal({
              title: '提示',
              content: res.data.resMsg,
              showCancel: false,
              success: param => {
                wx.clearStorage({
                  success: function() {
                    app.globalData.token = '';
                    wx.reLaunch({
                      url: '../index/index',
                    })
                  }
                })
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.resMsg,
              showCancel: false
            })
          }
        }
      }
    })
  },

  funview: function() {
    const that = this;
    wx.request({
      url: 'http://wx.zjnuoxin.cn/index.php?r=v1/work/sign-sub',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {'token': app.globalData.token},
      success:function(res) {
        if(res.data.resCode == '0000') {
          wx.showToast({
            title:'签到成功',
            duration: 2000
          })
          that.onLoad()
        }
      }
    })
  }
})