// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    niname: '',
    username: '',
    email: '',
    phone: '',
    signature: '',
    userId:'',
    modalHidden: true,
    modaltext: '',
    icon: "friendaddfill",
    iconColour: "white",
    iconText: "取消关注",
    isAttention:true,
    isShow:false,
    list: [{ DOC_ID: "123", DOC_NAME: "微信小程序", DOC_SUMMARY:"微信小程序简介"},
      { DOC_ID: "1234", DOC_NAME: "SpringBoot", DOC_SUMMARY: "SpringBoot简介"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //非本人可见关注标志
    let flag = false;
    let cookie = wx.getStorageSync("cookie");
    if (options.userId != cookie)
    {
      flag = true;
    }
    this.setData({
      userId: options.userId,//"1908021425435781"
      isShow : flag
    })
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
        id: that.data.userId,//"83612795"  cookie
      },
      method: "get",
      header: header,
      success: res => {
        //从数据库获取用户信息
        if (res.data.flag) {
          that.setData({
            avatarUrl: res.data.data.user.PORTRAIT,
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
  cancelattention:function()
  {
    if(this.data.isAttention)
    {
      this.setData({
        icon: "friendadd",
        iconColour: "white",
        iconText: "关注",
        iconShow: true,
        isAttention:false,
      })
    }
    else{
      this.setData({
        icon: "friendaddfill",
        iconColour: "white",
        iconText: "取消关注",
        iconShow: true,
        isAttention: true,
      })
    }
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