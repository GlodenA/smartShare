// pages/serch/serch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKey:[],
    hisqrylog:[],
    searchValue:'',
    docsData: [],
    resultShow: false,
    messageShow:false,
    message:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      //url: 'http://127.0.0.1:9001/docs/getdocslist',
      url: getApp().globalData.urlPath + 'querylog',
      method: 'GET',
      data: {
        "id": "83612795"
      },
      header: {
        'Accept': 'application/json'
      },
      success: res => {
        this.setData({
          hotKey:res.data.data.hot,
          hisqrylog: res.data.data.query_log

        })
      }
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  backTosearch: function (e) {
    console.log(e.detail.value)
  },

  bindsearch: function (e) {
    console.log(e.detail.value); 
    this.setData({
      searchValue:e.detail.value
    })
    var hotkey = e.detail.value
    wx.request({
      //url: 'http://127.0.0.1:9001/docs/getdocslist',
      url: getApp().globalData.urlPath + 'getdocsbykeyword',
      method: 'GET',
      data: {
        "Keyword": hotkey,
        "id":"83612795"
      },
      header: {
        'Accept': 'application/json'
      },
      success: res => {
        console.log(res.data.data)
        if (res.data.code==2000){
          this.setData({
            docsData: res.data.data,
            resultShow:true,
            messageShow: false

        })
        }else{
          console.log(res.data.message)
          this.setData({
            message: res.data.message,
            resultShow: false,
            messageShow: true

          })
        }
        
      }
    })

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