const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    var that = this;

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          if (app.globalData.userInfo) {
            that.setData({
              userInfo: app.globalData.userInfo,
              hasUserInfo: true
            })
          } else if (that.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
              that.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })

            }
            wx.switchTab({
              url: "/pages/index/index"
            })
          } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo
                that.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
                })
                wx.switchTab({
                  url: "/pages/index/index"
                })
              }
            })
          }
        }

      }
    })
  },
  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      app.globalData.userInfo = e.detail.userInfo;
       //用户按了允许授权按钮
      //var that = this;
      //插入登录的用户的相关信息到数据库
      //let cookie = wx.getStorageSync("cookie");
      //let header: {
      //     'content-type': 'application/json'
      //   },
      // if(cookie)
      // {
      //   header.Cookie = cookie;
      // }
      // wx.request({
      //   url: getApp().globalData.urlPath + 'hstc_interface/insert_user',
      //   data: {
      //     userId :  cookie,
      //     nickName: e.detail.userInfo.nickName,
      //     avatarUrl: e.detail.userInfo.avatarUrl,
      //     province: e.detail.userInfo.province,
      //     city: e.detail.userInfo.city
      //   },
      //    method:post,
      //   header: header,
      //   success: function (res) {
      //     //从数据库获取用户信息
      //     that.queryUsreInfo();
      //     console.log("插入小程序登录用户信息成功！");
      //   }
      // });
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
  //获取用户信息接口
  queryUsreInfo: function () {
    wx.request({
      url: getApp().globalData.urlPath + 'hstc_interface/queryByOpenid',
      data: {
        openid: getApp().globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        getApp().globalData.userInfo = res.data;
      }
    })
  },
})
