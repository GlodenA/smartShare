const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    docsData: [],
    screenHeight: app.globalData.screenHeight,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var queryPath = 'querycollect/';
    wx.request({
      url: getApp().globalData.urlPath + queryPath,
      method: 'GET',
      data: {
        user_id: app.globalData.userId
      },
      header: {
        'Accept': 'application/json'
      },
      success: res => {
        let tempdata = res.data.data
        for (let i in tempdata) {
          let str = tempdata[i].DOC_LABEL
          var docLabel = str.split('，')
          tempdata[i].DOC_LABEL = docLabel
        }
        this.setData({
          docsData: tempdata || [],
        })
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

  }
})