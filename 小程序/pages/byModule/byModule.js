var app = getApp();
Page({
  data: {
    goods: {
      1: {
        id: 1,
        name: 'core',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/core_f.jpg',
        sold: 1014,
        price: 1
      },
      2: {
        id: 2,
        name: 'TTL',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/TTL_f.jpg',
        sold: 1029,
        price: 1
      },
      3: {
        id: 3,
        name: 'zigbee',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/zigbee_f.jpg',
        sold: 1030,
        price: 1
      },
      4: {
        id: 4,
        name: 'wifi',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/wifi_f.jpg',
        sold: 1059,
        price: 1
      },
      5: {
        id: 5,
        name: 'RTC',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/RTC_f.jpg',
        sold: 1029,
        price: 1
      },
      6: {
        id: 6,
        name: 'OLED',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/OLED_f.jpg',
        sold: 1064,
        price: 1
      },
      7: {
        id: 7,
        name: 'motor',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/motor_f.jpg',
        sold: 814,
        price: 1
      },
      8: {
        id: 8,
        name: 'bluetooth',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/bluetooth_f.jpg',
        sold: 124,
        price: 1
      },
      9: {
        id: 9,
        name: 'base',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/base_f.jpg',
        sold: 102,
        price: 1
      },
      10: {
        id: 10,
        name: 'audio',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/audio_f.jpg',
        sold: 124,
        price: 1
      },
      11: {
        id: 11,
        name: 'audioshield',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/audioshield_f.jpg',
        sold: 124,
        price: 1
      },
      12: {
        id: 12,
        name: 'amp',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/amp_f.jpg',
        sold: 124,
        price: 1
      },
      13: {
        id: 13,
        name: 'battery',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/battery.jpg',
        sold: 124,
        price: 1
      },
      14: {
        id: 14,
        name: 'cable',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/cable.jpg',
        sold: 124,
        price: 1
      },
      15: {
        id: 15,
        name: 'smotor',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/smotor.jpg',
        sold: 124,
        price: 1
      },
      16: {
        id: 16,
        name: 'remote',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/remote.jpg',
        sold: 124,
        price: 1
      },
      17: {
        id: 17,
        name: 'speaker',
        pic: 'https://www.jl-lagrange.com.cn/cxsy/src/speaker.jpg',
        sold: 124,
        price: 1
      },
    },
    goodsList: [
      {
        id: 'mcookie',
        classifyName: 'mcookie模块',
        goods: [1, 2, 3, 4, 5,6,7,8,9,10,11,12]
      },
      {
        id: 'sensor',
        classifyName: '传感器',
        goods: []
      },
      {
        id: 'componet',
        classifyName: '组件',
        goods: [13,14,15,16,17]
      },
      {
        id: 'all',
        classifyName: '全部模块',
        goods: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
      }
    ],
    cart: {
      count: 0,
      total: 0,
      list: {}
    },
    showCartDetail: false
  },
  onLoad: function (options) {
    var shopId = options.id;
    for (var i = 0; i < app.globalData.shops.length; ++i) {
      if (app.globalData.shops[i].id == shopId) {
        this.setData({
          shop: app.globalData.shops[i]
        });
        break;
      }
    }
  },
  onShow: function () {
    this.setData({
      classifySeleted: this.data.goodsList[0].id
    });
  },
  tapAddCart: function (e) {
    this.addCart(e.target.dataset.id);
  },
  tapReduceCart: function (e) {
    this.reduceCart(e.target.dataset.id);
  },
  addCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    this.data.cart.list[id] = num + 1;
    this.countCart();
    console.log(this.data.cart.list);
  },
  reduceCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    if (num <= 1) {
      delete this.data.cart.list[id];
    } else {
      this.data.cart.list[id] = num - 1;
    }
    this.countCart();
  },
  countCart: function () {
    var count = 0,
      total = 0;
    for (var id in this.data.cart.list) {
      var goods = this.data.goods[id];
      count += this.data.cart.list[id];
      total += goods.price * this.data.cart.list[id];
    }
    this.data.cart.count = count;
    this.data.cart.total = total;
    this.setData({
      cart: this.data.cart
    });
  },
  follow: function () {
    this.setData({
      followed: !this.data.followed
    });
  },
  onGoodsScroll: function (e) {
    if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }

    var scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = this.data.goodsList.length;
    this.data.goodsList.forEach(function (classify, i) {
      var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
      if (scrollTop >= h - 100 / scale) {
        classifySeleted = classify.id;
      }
      h += _h;
    });
    this.setData({
      classifySeleted: classifySeleted
    });
  },
  tapClassify: function (e) {
    var id = e.target.dataset.id;
    this.setData({
      classifyViewed: id
    });
    var self = this;
    setTimeout(function () {
      self.setData({
        classifySeleted: id
      });
    }, 100);
  },
  showCartDetail: function () {
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
  },
  hideCartDetail: function () {
    this.setData({
      showCartDetail: false
    });
  },
 
  submit: function (e) {
    
    var barrel=new Array();
    for(var i=1;i<5;i++)
    {
        barrel[i]=this.data.cart.list;
    }
    barrel[0]=0;
    console.log(barrel)
    wx.request
      ({
        url: 'https://www.jl-lagrange.com.cn/cxsy/order.php', //接口地址
        data: { barrel: JSON.stringify(barrel) },
        header: {
          'content-type': 'application/x-www-form-urlencoded' //默认值
        },
        method: "POST",
        success: function (res) {
          console.log(res.data)
        }
      })
  }
});

