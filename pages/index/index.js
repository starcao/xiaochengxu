//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    loginArr: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.token != '') {
      wx.reLaunch({
        url: '/pages/work/index',
      })
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  sublogin: function (e) {
    if(this.data.loginArr.mobile == null) {
        wx.showModal({
          title: '提示',
          content: '请输入手机号',  
        })
        return false
    }
    if(this.data.loginArr.password == null) {
        wx.showModal({
          title: '提示',
          content: '请输入密码',
        })
        return false
    }

    var loginArr = this.data.loginArr;
    wx.request({
      url: 'http://wx.zjnuoxin.cn/index.php?r=v1/member/login',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded"},
      data: { mobile: loginArr.mobile, password: loginArr.password},
      success: function(res) {
        if (res.data.resCode == "0000") {
          app.globalData.token = res.data.data.token;
          app.globalData.nick = res.data.data.nickName;
          wx.setStorage({
            key: 'token',
            data: res.data.data.token,
            success: function() {
              wx.navigateTo({
                url: '../work/index',
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.resMsg
          })
        }
      }
    })
  },
  setmobile: function(e) {
    this.setData({['loginArr.mobile']: e.detail.value});
    app.globalData.mobile = e.detail.value;
  },
  setpass: function(e) {
    this.setData({['loginArr.password']: e.detail.value});
  }
})
