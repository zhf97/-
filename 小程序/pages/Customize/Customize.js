var app = getApp();
Page({
  
  data:
  {
    barrelid:''
    },
  setbarrelid1:function(res)
  {
    wx.removeStorage('id');
    //var _barrelid = wx.getStorageSync('id');
    wx.setStorageSync('id', 1);
    
  },
  setbarrelid2: function (res)
   {
    wx.removeStorage('id');
    wx.setStorageSync('id',2);
  },
  setbarrelid3: function (res) {
    wx.removeStorage('id');
    wx.setStorageSync('id', 3);
  },
  setbarrelid4: function (res) {
    wx.removeStorage('id');
    wx.setStorageSync('id', 4);
  },
  setbarrelid5: function (res) {
    wx.removeStorage('id');
    wx.setStorageSync('id', 5);
  },
  setbarrelid6: function (res) {
    wx.removeStorage('id');
    wx.setStorageSync('id', 6);
  },
  setbarrelid7: function (res) {
    wx.removeStorage('id');
    wx.setStorageSync('id', 7);
  },
  setbarrelid8: function (res) {
    wx.removeStorage('id');
    wx.setStorageSync('id', 8);
  },
  submitall: function (e) {
    var barrel=new Array();
     barrel[0]=wx.getStorageSync('barrel1');
     barrel[1] = wx.getStorageSync('barrel2');
     barrel[2] = wx.getStorageSync('barrel3');
     barrel[3] = wx.getStorageSync('barrel4');
     barrel[4] = wx.getStorageSync('barrel5');
     barrel[5] = wx.getStorageSync('barrel6');
     barrel[6] = wx.getStorageSync('barrel7');
     barrel[7] = wx.getStorageSync('barrel8');
console.log(barrel);

    wx.request
      ({
        url: 'https://www.jl-lagrange.com.cn/cxsy/order.php', //接口地址
        data: { barrel: JSON.stringify(barrel),
 },
        header: {
          'content-type': 'application/x-www-form-urlencoded' //默认值
        },
        method: "POST",
        success: function (res) {

        }
      })
  }
})