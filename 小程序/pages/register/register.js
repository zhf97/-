var app = getApp();
Page({
  data: {
    showTopTips: false,
    openid:getApp().globaldata.openid,
    Name:'',
    STnumber:'',

    radioItems: [
      { name: 'cell standard', value: '0' },
      { name: 'cell standard', value: '1', checked: true }
    ],
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],

    date: "2016-09-01",
    time: "12:01",

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    countries: ["中国", "美国", "英国"],
    countryIndex: 0,

    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,

    isAgree: false
  },
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },

  NameInput: function (e) {
    // console.log(e.detail.value)设置用户名
    this.setData({
      Name: e.detail.value
    })
  },
  STnumberInput: function (e) {
    // console.log(e.detail.value)设置用户名
    this.setData({
      STnumber: e.detail.value,
      

    })
    
  },
  

   register: function (res) {
    console.log(res)
     wx.setStorageSync('STnumber', this.data.STnumber)
   /* wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data)
        openid:res.data.openid
      }
    })*/
    wx.request
    ({
        url: 'https://www.jl-lagrange.com.cn/cxsy/register_id.php', //接口地址
      data: {openid:getApp().globaldata.openid, name:this.data.Name,no:this.data.STnumber },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //默认值
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 0) {
          if (res.data.content.role == 1) {
            wx.redirectTo({
              url: '../cropper/cropper'
            })
          }
          if (res.data.content.role == 2) {
            wx.redirectTo({
              url: '../teacher/teacher'
            })
          }
        }
        else {
          console.log("loginerror")
        }
      }
    })
    }

});