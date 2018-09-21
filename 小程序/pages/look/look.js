var con=new Array();
var no=new Array();
var cname=new Array();
var mcookie=new Array();
mcookie[1]="core";
mcookie[2]="TTl";
mcookie[3]="zigbee";
mcookie[4]="wifi";
mcookie[5]="RTC";
mcookie[6]="OLED";
mcookie[7]="motor";
mcookie[8]="bluetooth";
mcookie[9]="base";
mcookie[10]="audio";
mcookie[11]="audioshield";
mcookie[12]="amp";
mcookie[13]="battery";
mcookie[14]="cable";
mcookie[15]="smotor";
mcookie[16]="remote";
mcookie[17]="speaker"
Page({
  data: {
    /*sy:{
      1: {
        pcon: '',
        pno: '',
        pcname: '',
      },
      2: {
        pcon: '',
        pno: '',
        pcname: '',
      },
      3: {
        pcon: '',
        pno: '',
        pcname: '',
      },
      4: {
        pcon: '',
        pno: '',
        pcname: '',
      },
      5: {
        pcon: '',
        pno: '',
        pcname: '',
      },
      6: {
        pcon: '',
        pno: '',
        pcname: '',
      },
      7: {
        pcon: '',
        pno: '',
        pcname: '',
      },
      8: {
        pcon: '',
        pno: '',
        pcname: '',
      },
      9: {
        pcon: '',
        pno: '',
        pcname: '',
      },
      10: {
        pcon: '',
        pno: '',
        pcname: '',
      },
      11: {
        pcon: '',
        pno: '',
        pcname: '',
      },
      12: {
        pcon: '',
        pno: '',
        pcname: '',
      },
      13: {
        pcon: '',
        pno: '',
        pcname: '',
      },
      14: {
        pcon: '',
        pno: '',
        pcname: '',
      },
      15: {
        pcon: '',
        pno: '',
        pcname: '',
      },
    },*/
  // sy:[{ pcon: {},
   // pno: 0,
    //pcname: '',
    //pmcookie:mcookie,
   //}],
   sy:'',
    pcount:''
  },
  onLoad:function(options){
    var that = this;
wx.request({
  url:"http://www.jl-lagrange.com.cn/cxsy/sy_view.php",
  method: 'GET',
  header: {
    'content-type': 'application/x-www-form-urlencoded' //默认值
  },
  success:function(res)
  {
   /* for(var i=0;i<res.data.count;i++)
    {

      that.data.sy[i].pno=i;
      that.data.sy[i].pcname=res.data.content[i].cname;
      that.data.sy[i].pcon=res.data.content[i].con;
      
    }*/
    con=res.data.content;
 
      that.setData({
        sy:con
      })
    
    console.log(that.data.sy);
    
  }
  
})
  },
  onshow:function()
  {
    //this.setata({
      //pno: no,
      //pcon: con,
      //pcname: cname,
    //})
  },
  back:function()
  {
    wx.redirectTo({
      url: '../teacher/teacher'
    })
  }
})