const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    docsData: [],
    screenHeight: app.globalData.screenHeight,
    hasdata:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 查看是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          let that = this;
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
              let tempdata = res.data.data;
              let hasdata = true;
              for (let i in tempdata) {
                let str = tempdata[i].DOC_LABEL;
                var docLabel = str.split('，');
                tempdata[i].DOC_LABEL = docLabel;
              }
              if (tempdata == null) {
                hasdata = false;
              }
              that.setData({
                docsData: tempdata || [],
                hasdata: hasdata,
              })
            }
          }) 
        }
        else {
          wx.showModal({
            title: '提示',
            content: '您还没授权登录，请先登录',
          })
          wx.switchTab({
            url: '/pages/selfcentre/selfcentre',
          })
        }
      }
    })

   
  },
  /**
 *点击发布人跳转 
 */
  gotowritershow: function (e) {
    var ntacct = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/writershow/writershow?ntacct=' + ntacct
    })
  },
  gotoPreview: function (e) {
    var docid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/preview/preview?docid=' + docid
    })
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
