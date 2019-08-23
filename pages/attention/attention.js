const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true,
    list: null,
    screenHeight: app.globalData.screenHeight,
    background: '/images/writer.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let base64 = wx.getFileSystemManager().readFileSync(this.data.background, 'base64');
    that.setData({
      'background': 'data:image/jpg;base64,' + base64
    });
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
                isShow: true,
                list: res.data.data
              })
            }else
            {
              that.setData({
                isShow: false,
               
              })
            }

            }
      }
    });
  },
  qrywriter: function (e){
    let ntacct = e.currentTarget.dataset.ntacct;
    wx.navigateTo({
      url: '/pages/writershow/writershow?ntacct=' + ntacct ,
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