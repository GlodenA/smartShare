// pages/selfcentre/selfcentre.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { name: '编辑资料', url: '../userinfo/userinfo', icon: 'text', isShow: true},
      { name: '我的关注', url: '../attention/attention', icon: 'friendadd', isShow: true},
      { name: '我的收藏', url: '../collection/collectionA', icon: 'favor', isShow: true},
      { name: '我的评论', url: '../comments/comments', icon: 'write', isShow: true},
      { name: '我的阅读', url: '../reading/reading', icon: 'settings', isShow: true },
      { name: '我的设置', url: '../setting/setting', icon: 'text', isShow: true},
    ],
    avatarUrl: "/images/default.png",
    nickName: "用户登录",
    screenHeight: app.globalData.screenHeight,
    loginStatus:"0"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            avatarUrl: app.globalData.avatarUrl,
            nickName: app.globalData.nickName,
            loginStatus:"1"
          })
        }
      }
    })

       
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  login:function(){
    wx.redirectTo({
              url: '/pages/login/login',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
  }
})