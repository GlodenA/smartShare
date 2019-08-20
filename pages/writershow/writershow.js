const app = getApp()
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
    screenHeight: app.globalData.screenHeight,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //非本人可见关注标志
    let flag = false;
    let seq_id ="";
    let nt = app.globalData.nt;
    if (options.nt != nt)
    {
      flag = true;
    }
    if(options.seqId!=null)
    {
      seq_id = options.seqId;
    }
    this.setData({
      nt: options.nt,
      isShow : flag,
      seqId : seq_id,
    })
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
      url: getApp().globalData.urlPath + 'querybyauthor',
      data: {
        id: that.data.nt,
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
    let that = this;
    let cookie = app.globalData.userId;
    let header = { 'content-type': 'application/json' };
    if (cookie) {
      header.Cookie = cookie;
    }
    if(this.data.isAttention)
    {


      wx.request({
        url: getApp().globalData.urlPath + 'focus/deletFocus',
        method: 'GET',
        data: {
          user_id: cookie,
          nt:that.data.nt
        },
        header: header,
        success: res => {
          that.setData({
            icon: "friendadd",
            iconColour: "white",
            iconText: "关注",
            iconShow: true,
            isAttention: false,
          })
        }
      }) 
    }
    else{


      wx.request({
        url: getApp().globalData.urlPath + 'focus/insertFocus',
        method: 'GET',
        data: {
          "user_id": cookie,
          "nt": that.data.nt,
          "author_name": that.data.username,
        },
        header: header,
        success: res => {
          that.setData({
            icon: "friendaddfill",
            iconColour: "white",
            iconText: "取消关注",
            iconShow: true,
            isAttention: true,
          })
        }
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