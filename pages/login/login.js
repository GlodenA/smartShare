const app = getApp()

Page({
  data: {
    userInfo: {},
    avatarUrl:"",
    nickName: "",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
   

  },
  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮 
      var that = this;
      if (that.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          that.setData({
            userInfo: res.userInfo,
            avatarUrl: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            that.setData({
              userInfo: res.userInfo,
              avatarUrl: res.userInfo.avatarUrl,
              nickName: res.userInfo.nickName,
              hasUserInfo: true
            })
          }
        })
      }

 
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      that.setData({
        userInfo: e.detail.userInfo,
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
        hasUserInfo: true
      });
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
      app.globalData.nickName = e.detail.userInfo.nickName;
      app.globalData.userId = e.detail.userInfo.USER_ID,
      app.globalData.username = e.detail.userInfo.USER_NAME,
      app.globalData.email = e.detail.userInfo.EMAIL,
      app.globalData.phone = e.detail.userInfo.PHONE,
      app.globalData.signature = e.detail.userInfo.SIGNATURE,
      this.saveUserInfo();
      
      wx.switchTab({
        url: "/pages/index/index",
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }


  },
 //保存用户信息
  saveUserInfo: function () {
    console.log("保存用户信息：");
    var that = this;
    let cookie = app.globalData.userId;
    let header = { 'content-type': 'application/json' };
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: getApp().globalData.urlPath + 'user/update',
      data: {
        USER_ID: cookie,//"83612795"  cookie
        PORTRAIT: that.data.avatarUrl,
        NI_NAME: that.data.nickName,
        USER_NAME: that.data.username,
        EMAIL: that.data.email,
        PHONE: that.data.phone,
        SIGNATURE: that.data.signature,
      },
      method: "post",
      header: header,
      success: function (res) {      
      },
      faill: function (res) {
      }
    });
  },
})
