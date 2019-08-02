// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pngname: '',
    niname: '',
    username: '',
    email: '',
    phone: '',
    signature: '',
    modalHidden: true,
    modaltext: '',
    list: [{ DOC_ID: "123", DOC_NAME: "微信小程序", DOC_SUMMARY:"微信小程序简介"},
      { DOC_ID: "1234", DOC_NAME: "SpringBoot", DOC_SUMMARY: "SpringBoot简介"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   pngname: '',
    //   niname: '丹',
    //   username: '王丹丹',
    //   email: 'wangdd@asianfo.com',
    //   phone: '18625167105',
    //   signature: '一粒麦子它若不落在地里死了不论过了多少时候它仍旧是它自己它若愿意\
    //            让自己被掩埋被用尽就必结出许多子粒经历生命的奇迹'
    // })
    this.queryUsreInfo();

  },
  queryUsreInfo: function () {
    var that = this;
    let cookie = wx.getStorageSync("cookie");
    let header = { 'content-type': 'application/json' };
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: getApp().globalData.urlPath + 'querybyauthor',
      data: {
        id: "83612795",//"83612795"  cookie
      },
      method: "get",
      header: header,
      success: res => {
        //从数据库获取用户信息
        if (res.data.flag) {
          that.setData({
            // pngname: res.data.data.user.PORTRAIT,
            niname: res.data.data.user.NI_NAME,
            username: res.data.data.user.USER_NAME,
            email: res.data.data.user.EMAIL,
            phone: res.data.data.user.PHONE,
            signature: res.data.data.user.SIGNATURE,
            list:res.data.data.docslist
          })
        } else {
          that.setData({
            modaltext: '获取作者信息失败！',
            modalHidden: false
          })

        }

      },

      faill: function (res) {
        console.log("失败");
        that.setData({
          modaltext: '获取作者信息失败！',
          modalHidden: false
        })
      }
    });
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