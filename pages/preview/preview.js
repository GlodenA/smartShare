// pages/preview/preview.js
var util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    preview_docid:1,
    preview_docsummey:'',
    preview_docname: '',
    preview_docauthorname:'',
    path:'',
    msg:[],
    msgText:'',
    fileType:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDocsummery(options.docid)
    ,
    this.getDocsComments(options.docid)

  },
  /**
   * 获取文档的留言信息
   */
  getDocsComments: function (docid){
    wx.request({
      url: getApp().globalData.urlPath + 'msg/getMsgByDocId',
      method: 'GET',
      data: {
        "doc_id": docid
      },
      header: {
        'Accept': 'application/json'
      },
      success: res => {
        //时间格式化
        let msglist = res.data.data
        for (let i in msglist){
          let date = util.formatTime(new Date(msglist[i].update_time))
          msglist[i].update_time = date
        }
        this.setData({
          msg: msglist||[]

        })
      }
    })
  },
  /**
   * 获取文件的简介
   */
  getDocsummery: function (docid){
    wx.request({
      url: getApp().globalData.urlPath + 'getdocs',
      method: 'GET',
      data: {
        "DOC_ID": docid
      },
      header: {
        'Accept': 'application/json'
      },
      success: res => {
        this.setData({
          preview_docname: res.data.data.DOC_NAME,
          preview_docauthorname: res.data.data.DOC_AUTHOR_NAME,
          preview_docsummey: res.data.data.DOC_SUMMARY,
          preview_docid: docid

        })
      }
    })
  },
  /**
   * 下载
   */
  preview:function(){  
    var docid = this.data.preview_docid
    var that = this
    wx.request({
      url: getApp().globalData.urlPath +'getdocstype',
      method: 'GET',
      data:{
        "doc_id": docid
      },
      header: {
        'Accept': 'application/json'
      },
      success: res => {
        this.setData({
          fileType: res.data.data,

        })
      }
    })
    wx.downloadFile({
      url: getApp().globalData.urlPath + 'filedownload?doc_id=' + docid,
      success: function (res) {
        console.log("已下载")
        that.setData({
          path: res.tempFilePath
        })
        that.openDocument(that.data.fileType)
      }
    })
  
  },
  /**
   * 预览
   */
  openDocument: function (fileType) {
    let path = this.data.path
    if (path == '') {
      wx.showModal({
        title: '提示',
        content: '请先下载文档',
        showCancel: false
      })
    }
    console.log(path)
    wx.openDocument({
      filePath: path,
      fileType: fileType,
      fail: function (err) {
        console.log(err)
      }
    })
  },
  /**
   * 监听输入框
   */
  msginput:function(e){
    this.setData({
      msgText: e.detail.value
    })
  },
  /**
   * 留言
   */
  insertMsg:function(){
    var msglist = {
      "user_id": app.globalData.userId,
      "doc_id": this.data.preview_docid,
      "msg_txt": this.data.msgText,
      "update_time": util.formatTime(new Date()),
      "is_valid":'0',
      "is_good":'0'
    }
    this.setData({
      msg: this.data.msg.concat(msglist),
      msgText: ''
    })
    wx.request({
      url: getApp().globalData.urlPath + 'msg/insertMsg',
      method: 'GET',
      data: msglist,
      header: {
        'Accept': 'application/json'
      },
      success: res => {
       if(res.statusCode='2000'){
         console.log("插入成功")
         
       }
      }
    })
  },
  /**
  * 点赞和取消点赞
  * 
  */
  favorclick: function (e) {

    var that = this;
    var msgid = e.currentTarget.dataset.id;
    var cancel = e.currentTarget.dataset.isgood; //操作 1 点赞  0 取消点赞
    var index = e.currentTarget.dataset.dex;

    var message = this.data.msg;
    for (let i in message) {
      if (i == index) {
        if (message[i].is_good == 0) {
          that.data.msg[index].is_good = 1
          that.data.msg[index].good_times += 1
        } else {
          that.data.msg[index].good_times -= 1
        }
      }
    }
    that.setData({
      msg: message
    })
    var zanInfo = {
      "user_id": app.globalData.userId,
      "msg_id": msgid,
      "cancel": cancel
    }

    wx.request({
      url: getApp().globalData.urlPath + 'msg/updateGoodTimes',
      method: 'GET',
      data: zanInfo,
      header: {
        'Accept': 'application/json'
      },
      success: res => {
        console.log("点赞操作成功！")
      },
    })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      　　　　title: "转发的标题",        // 默认是小程序的名称(可以写slogan等)
      　　　　path: '/pages/preview/preview',        // 默认是当前页面，必须是以‘/’开头的完整路径
      　　　　imageUrl: '/images/wx_login.png',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      　　　　success: function (res) {
        　　　　　　// 转发成功之后的回调
        　　　　if (res.errMsg == 'shareAppMessage:ok') {
        　　　　}
      　　　　},
      　　　　fail: function () {
        　　　　　　// 转发失败之后的回调
        　　　　　　if (res.errMsg == 'shareAppMessage:fail cancel') {
          　　　　　　　　// 用户取消转发
        　　　　　　} else if (res.errMsg == 'shareAppMessage:fail') {
          　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
        　　　　　　}
      　　　　},
      // 　　　　complete: fucntion(){
      //   　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
      // 　　　　}
  　　};

  },
})