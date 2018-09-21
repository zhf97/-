//index.js
//获取应用实例
var app = getApp();
var that;

Page({
  data: {

  },

  //登录获取code
  onLoad: function () {
    console.log('123')
    wx.login({
      success: function (res) {
        console.log(res.code)
  
        //发送请求
        wx.request({
          url: 'http://www.jl-lagrange.com.cn/cxsy/get_id.php', //接口地址
          data: { code: res.code },
          header: {
            'content-type': 'application/x-www-form-urlencoded' //默认值
          },
          method: "POST",
          success: function (res) {
            console.log(res.data)
            if(res.data.code==0)
            {
             // wx.setStorage({
               // key: "openid",
                //data: "res.data.content.openid"
              //})
              getApp().globaldata.openid=res.data.content.openid;
              console.log(getApp().globaldata.openid);
              wx.setStorageSync('name', res.data.content.name);
              wx.setStorageSync('STnumber', res.data.content.no);
              if(res.data.content.role==0)
              {
                wx.redirectTo({
                  url: '../register/register'
                })
             // 注册/1学生/2老师
              }
              if(res.data.content.role==1)
              {
                wx.redirectTo({
                  url: '../student/student'
                })
              }
              if(res.data.content.role==2)
              {
                wx.redirectTo({
                  url: '../teacher/teacher'
                })
              }
            }
            else
            {
              console.log("loginerror")
            }
          }
        
        })
      }
    })
  }
})
