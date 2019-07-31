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
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.switchTab({
              url: '/pages/index/index',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
          else
          {
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

  }
})
