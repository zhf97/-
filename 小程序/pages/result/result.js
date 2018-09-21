var a=wx.getStorageSync('result')
Page({
  data:{
result:'',
  },
  onLoad:function(option){
    console.log("option",option)
this.setData({

  result:option.data
})
  },
  back: function () {
    wx.redirectTo({
      url: '../cropper/cropper'
    })
  }
})
