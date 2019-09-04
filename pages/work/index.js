// pages/work/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    markers:[]
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
            console.log($this.data)
          }
        })
      }
    })
  }
})