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
})