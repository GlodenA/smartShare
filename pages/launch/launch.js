const app = getApp()
Page({
  data: {
    alpha: [1, 1, 1, 1, 1]
  },
  onLoad: function () {
    var that = this;
    var _index = 0;
    var _alpha = that.data.alpha;
    var _speed = 300;
    var timer = setInterval(function () {
      var an_show = wx.createAnimation({});
      var an_hide = wx.createAnimation({});
      an_show.opacity(1).step({ duration: _speed });
      an_hide.opacity(0).step({ duration: _speed });
      _alpha[_index] = an_show;
      _alpha[_index == 0 ? 4 : _index - 1] = an_hide;
      that.setData({
        alpha: _alpha
      })
      _index = _index == 4 ? 0 : _index + 1;
    }, _speed);
    setTimeout(function () {
      // 查看是否授权
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            console.log("授权");
            that.queryUsreInfo();
            wx.switchTab({
              url: '/pages/index/index',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
          else
          {
            console.log("未授权")
            wx.redirectTo({
              url: '/pages/login/login',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        }
      })
    }.bind(this), 3000);

  },
  queryUsreInfo: function () {
    var that = this;
    let cookie = app.globalData.userId;
    let header = { 'content-type': 'application/json' };
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: getApp().globalData.urlPath + 'user/getuserinfo',
      data: {
        USER_ID: cookie,//"83612795"  cookie
      },
      method: "get",
      header: header,
      success: res => {
        //从数据库获取用户信息
        if (res.data.flag) {
          that.setData({
            //userInfo: app.globalData.userInfo,
            avatarUrl: res.data.data.PORTRAIT,
            nickName: res.data.data.NI_NAME,
            hasUserInfo: true
          });
          app.globalData.avatarUrl = res.data.data.PORTRAIT;
          app.globalData.nickName = res.data.data.NI_NAME;
        } else {
          that.setData({
            modaltext: '获取用户失败！',
            modalHidden: false
          })

        }

      },

      faill: function (res) {
        console.log("失败");
        that.setData({
          modaltext: '获取用户失败！',
          modalHidden: false
        })
      }
    });
  },
})
