// pages/index/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',//输入框的值
    message: '',
    screenHeight: app.globalData.screenHeight,
    num: 0,
    content:["云计算", "大数据", "技术", "成功案例"],
    image: ["../../images/classify1.png"],
    messag: [
      {
        id: '0',
        text:"大数据",
        img: "images / wx_login.png",
        msg: ["云计算", "大数据", "技术","成功案例"],
        img: "../../images/classify1.png",

      },
      {
        id: '1',
        text: "5G",
        msg: ["云计算","能力提升", "用户体验"],
        img:"../../images/classify2.png"
      },
      {
        id: '2',
        text: "域外",
        msg: ["政企", "专票打印"],
        img: "../../images/classify3.png"
      },
      {
        id: '3',
        text: "创新搜索",
        msg: ["云计算", "技术"],
        img: "../../images/classify2.png"
      }, {
        id: '4',
        text: "物联网",
        msg: ["能力提升", "培训", "5G"],
        img: "../../images/classify3.png"
      }
    ]
  },
  clickList: function (e) {
    let num = e.target.id
    let content = this.data.messag[num].msg
    let image = this.data.messag[num].img
    this.setData({
      num: num,
      content: content,
      image:image
    })
  },
  bindsearch: function () {
    // 查看是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/serch/serch'
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '您还没授权登录，请先登录',
          })
          wx.switchTab({
            url: '/pages/selfcentre/selfcentre',
          })
        }
      }
    })
  },
  
  gotoserch: function (e){
    var value = e.currentTarget.dataset.value
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/classifyA/classifyA'
          })
        }
      }
    }),
    app.requestvalue = value;
  }
})