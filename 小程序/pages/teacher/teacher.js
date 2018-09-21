var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var myCharts = require("../../utils/wxcharts.js")//引入一个绘图的插件
var stat_all=0;
var mk=0;
var id=0;
var status=0;
var stat= new Array();
stat[0]=0;
var DUST=0;
const io = require('../../utils/weapp.socket.io.js')
const socket =  io(
  'https://www.jl-lagrange.com.cn:5000/update',
)
socket.on('update',d=>{console.log(d);
   stat_all = JSON.parse(d.data).stat_all;
  mk = JSON.parse(d.data).mk;
  id = JSON.parse(d.data).id;
  status = JSON.parse(d.data).status;
  stat = JSON.parse(d.data).stat;
  DUST = JSON.parse(d.data).DUST;
})
Page({
  data: {
    tabs: ["创建订单", "实时统计数据", "提问统计数据"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    pstat_all:stat_all,
    pmk:mk,
    pid:id,
    pstatus:status,
    pstat:stat,
    pDUST:DUST,
    pDUST1:"",
    toastModalStatus: false,//弹框
    toastColor: '',// 图标背景颜色
    toastFontColor: '',// 图标颜色
con1:'',
  },

  onLoad: function () {
    var that = this;
    var time=0;
    var interval=setInterval(function () {
  time=time+1;
      //console.log(this.data.mk)
      //console.log("123123123");
      //console.log(that.data.pstart)
      if(status=="normal")
      {
        that.setData({
        pstat_all: stat_all,
        pmk: mk,
        pid: id,
        pstat: stat,
        pDUST: DUST
      })
      }
      if(that.data.pDUST==1)
      {
        that.setData({
          pDUST1:"非所需模块"
        })
      }
      if(that.data.pDUST==0){
        that.setData({
          pDUST1:"为所需模块"
        })
      }
      if(status=="normal")
      {
      that.setData({
        pstatus: status
      })
      time=0;
      }
      if(status=="finish")
      {
        that.setData({
          pstatus:status
        });
        that.showok();
        if(time==10)
        clearInterval(interval);
      }
      if(status=="jz")
      {
        that.showjz();
      }
      else{
        console.log("error");
        //console.log("error");
        /*that.setData({
          count: 1500,
          toastType: '危险！',
          toastText: '什么鬼什么鬼什么鬼',
          toastColor: '#ff0000',
          toastFontColor: '#fff'
        });
        that.showToast();*/
       //that.showok();
     //that.showgz();

     
      }
    }, 1000) //循环时间 这里是1秒   
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    wx.request({
      url: "http://www.jl-lagrange.com.cn/cxsy/stat_stu.php?datatype=0",
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //默认值
      },
      success: function (res) {
//that.setData({
  //con1:JSON.stringify(res.data).content
//})
      }
    })
    myCharts =
      new myCharts({
        canvasId: 'pieCanvas',
        type: 'pie',
        series: [{
          name: 'ttl',
          data: 46,
        }, {
          name: 'amp_f',
          data: 5,
        }, {
          name: 'audio_b',
          data:1,
        }, {
          name:'bluetooth_b',
          data: 8,
        }, {
          name:'OLED',
          data: 18,
        }],
        width: 360,
        height: 300,
        dataLabel: true
      })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  byModule:function()
  {
    wx.navigateTo({
      url: '../byModule/byModule'
    })
  },
  byTest: function () {
    wx.navigateTo({
      url: '../byTest/byTest'
    })
  },
  Customize: function () {
    wx.navigateTo({
      url: '../Customize/Customize'
    })
    wx.setStorageSync('barrel1', '0');
    wx.setStorageSync('barrel2', '0');
    wx.setStorageSync('barrel3', '0');
    wx.setStorageSync('barrel4', '0');
    wx.setStorageSync('barrel5', '0');
   // wx.setStorageSync('barrel6', '0');
    //wx.setStorageSync('barrel7', '0');
    //wx.setStorageSync('barrel8', '0');
  },
   
  showToast: function () {
    var vm = this;
    vm.data.count = parseInt(vm.data.count) ? parseInt(vm.data.count) : 3000;
    vm.data.toastColor = vm.data.toastColor ? vm.data.toastColor : '#f6a623';
    vm.data.toastFontColor = vm.data.toastFontColor ? vm.data.toastFontColor : '#fff';
    vm.setData({
      toastModalStatus: true,
      toastColor: vm.data.toastColor,
      toastFontColor: vm.data.toastFontColor
    });
    setTimeout(function () {
      vm.setData({
        toastModalStatus: false,
        toastColor: '',
        toastFontColor: ''
      });
    }, vm.data.count);
  },

  showok: function () {
    wx.showToast({
      title: '完成',
      icon: 'success',
      duration: 2000
    })
  } ,
  showjz: function () {
    wx.showToast({
      title: '校准中',
      icon: 'loading',
      duration: 2000
    })
  } ,
  showgz: function () {
    wx.showToast({
      title: '故障',
      icon: 'none',
      duration: 2000
    })
  },
  

});