// pages/work/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    markers:{
      iconPath: "../../image/location.png",
      longitude: 116.44355,
      latitude: 39.9219,
      width: 30,
      heigth: 20
    }
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
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        that.setData({longitude:longitude, latitude:latitude})
        console.log(that.data)
      },
    })
  }
})