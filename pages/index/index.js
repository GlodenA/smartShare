//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    docsData:[],
    menuList: [{ index: 1, name: "热   搜" }, { index: 2, name: "为你推荐" }],
    currentTab: 1,
    windowWidth: 60,
    tabScroll: 2,
    count: 2

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
    wx.request({
      //url: 'http://127.0.0.1:9001/docs/getdocslist',
      url: getApp().globalData.urlPath + '/getdocslist',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: res => {
        this.setData({
          docsData: res.data.data,
        })
      }
    }) 

  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
    bindsearch: function () {
    wx.navigateTo({
      url: '/pages/serch/serch'
    })
  }
})
