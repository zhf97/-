//app.js
App({
  
  
  globaldata:{
    openid:'123',
    barrel:
    {
      cart1: 
      {
        count: 0,
        total: 0,
        list: {}
      },
        cart2:
          {
            count: 0,
            total: 0,
            list: {}
          },
        cart3:
          {
            count: 0,
            total: 0,
            list: {}
          },
        cart4:
          {
            count: 0,
            total: 0,
            list: {}
          },
        cart5:
          {
            count: 0,
            total: 0,
            list: {}
          },
        cart6:
          {
            count: 0,
            total: 0,
            list: {}
          },
        cart7:
          {
            count: 0,
            total: 0,
            list: {}
          },
        cart8:
          {
            count: 0,
            total: 0,
            list: {}
          }
    }
  },
  // onLaunch: function () {
  //   //调用API从本地缓存中获取数据
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)
  // },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})