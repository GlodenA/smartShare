// pages/userinfo/userinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    list: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryUsreInfo();
  },
  queryUsreInfo: function () {
    var that = this;
    let cookie = app.globalData.userId;
    let header = { 'content-type': 'application/json' };
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: getApp().globalData.urlPath + 'user/queryattention',
      data: {
        user_id: cookie,
      },
      method: "get",
      header: header,
      success: res => {
        //从数据库获取用户信息
        if (res.data.flag) {
          if(res.data.code==2000)
            {
              that.setData({
              isShow:true,
              list: res.data.data
             })
            }

        } 
      }
    });
  },
  qrywriter: function (e){
    let userId = e.currentTarget.dataset.userid;//"83612795"
    wx.navigateTo({
      url: '/pages/writershow/writershow?userId=' + userId ,
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

  }
})