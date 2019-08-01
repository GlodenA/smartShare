// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'' ,
    email: '' ,
    phone: '',
    signature: '',
    modalHidden: true
  },
  modalChange: function (e) {
    this.setData({
      modalHidden: true
    })
  },
  modalTap: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  saveUserInfo:function(){
       var that = this;
    this.setData({
      modalHidden: false
    })
    // wx.showToast({
    //   title: '保存成功',
    //   icon: 'success',
    //   duration: 2000
    // })
      //  let cookie = wx.getStorageSync("cookie");
      //  let header = {'content-type': 'application/json'};
      // if(cookie)
      // {
      //   header.Cookie = cookie;
      // }
      // wx.request({
      //   url: getApp().globalData.urlPath + 'user/update',
      //   data: {
      //     USER_ID: cookie,//"83612795"
      //     USER_NAME: that.data.username,
      //     EMAIL: that.data.email,
      //     PHONE: that.data.phone,
      //     SIGNATURE: that.data.signature,
      //   },
      //   method:"post",
      //   header: header,
      //   success: function (res) {
      // //     //从数据库获取用户信息
      // //     that.queryUsreInfo();
      //     console.log("插入小程序登录用户信息成功！");
 
        
      //   },
      //   faill:function(res){

      //   }
      // });
    
  },
  textareaInput(e) {
    this.setData({
      signature: e.detail.value
    })
  },
  usernameInput(e) {
    this.setData({
      username: e.detail.value
    })
  },
  emailInput(e) {
    this.setData({
      email: e.detail.value
    })
  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username: '王丹丹',
      email: 'wangdd@asianfo.com',
      phone: '18625167105',
      signature: '一粒麦子它若不落在地里死了不论过了多少时候它仍旧是它自己它若愿意\
               让自己被掩埋被用尽就必结出许多子粒经历生命的奇迹'
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