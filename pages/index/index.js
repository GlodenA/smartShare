//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
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
    this.qryDocs();

  },
  clickMenu: function (event) {
    var res = wx.getSystemInfoSync()
    this.windowWidth = res.windowWidth
    var current = event.currentTarget.dataset.current
    this.qryDocs(current)
    var tabWidth = this.windowWidth / this.count
    this.setData({
      tabScroll: (current - this.count / 2) * tabWidth
    })
    if (this.currentTab == current) {
      return false
    } else {
      this.setData({
        currentTab: event.currentTarget.dataset.current
      })
     
      
    }
   
  },
   
  qryDocs: function (current) {
    var queryPath = 'hotquery'
    if (current==2){
      queryPath ='recommend'
    }
    wx.request({
      //url: 'http://127.0.0.1:9001/docs/getdocslist',
      url: getApp().globalData.urlPath + queryPath,
      method: 'GET',
      data: {
        "id":"83612795"
      },
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
    bindsearch: function () {
    wx.navigateTo({
      url: '/pages/serch/serch'
    })
  },
  gotoPreview: function (e) {
    var docid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/preview/preview?docid='+docid
    })
  }
})
