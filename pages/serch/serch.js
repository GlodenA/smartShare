// pages/serch/serch.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKey:[],//关键词
    hisqrylog:[],//查询历史
    searchValue:'',//输入框的值
    docsData: [],//文档LIST
    resultShow: false,//文档list展示
    messageShow:false,//message展示
    message:'',
    actionSheetHidden: true,
    actionSheetItems: ['按上传时间排序', '按文件名排序','item3','item4']

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: getApp().globalData.urlPath + 'querylog',
      method: 'GET',
      data: {
        "id": app.globalData.userId
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
   * 查询功能
   * 
   */
  bindsearch: function (e) {
    this.setData({
      searchValue:e.detail.value
    })
    var hotkey = e.detail.value
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: getApp().globalData.urlPath + 'getdocsbykeyword',
      method: 'GET',
      data: {
        "Keyword": hotkey,
        "id": app.globalData.userId
      },
      header: {
        'Accept': 'application/json'
      },
      success: res => {
        if (res.data.code == 2000) {
          let tempdata = res.data.data
          for (let i in tempdata) {
            let str = tempdata[i].DOC_LABEL
            var docLabel = str.split('，')
            tempdata[i].DOC_LABEL = docLabel
          }
          this.setData({
            docsData: tempdata||[],
            resultShow:true,
            messageShow: false
        })
        }else{
          this.setData({
            message: res.data.message,
            resultShow: false,
            messageShow: true
          })
        }       
      },
      complete(){
        wx.hideLoading()
      },
    })
  },
  /**
   * 点赞和取消点赞
   * 
   */
  favorclick:function(e){
  
    var that = this;
    var docid = e.currentTarget.dataset.id;
    var cancel = e.currentTarget.dataset.isgood; //操作 1 点赞  0 取消点赞
    var index = e.currentTarget.dataset.dex;
    
    var message = this.data.docsData;
    for (let i in message) {
      if (i == index) {
        if (message[i].is_good == 0) {
          that.data.docsData[index].is_good = 1
        } else {
          that.data.docsData[index].is_good = 0
        }
      }
    }
    that.setData({
      docsData: message
    })
    var zanInfo = {
      "user_id": app.globalData.userId,
      "doc_id": docid,
      "type":"1",//1点赞  2 收藏
      "cancel": cancel
      }

    wx.request({
      url: getApp().globalData.urlPath + 'goodcollect/setGoodOrCollect',
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
   * 收藏和取消收藏
   * 
   */
  collectclick: function (e) {
    var that = this;
    var docid = e.currentTarget.dataset.id;
    var cancel = e.currentTarget.dataset.iscollect; //操作 1 取消点赞  0 点赞
    var index = e.currentTarget.dataset.dex;

    var message = this.data.docsData;
    for (let i in message) {
      if (i == index) {
        if (message[i].is_collect == 0) {
          that.data.docsData[index].is_collect = 1
        } else {
          that.data.docsData[index].is_collect = 0
        }
      }
    }
    that.setData({
      docsData: message
    })
    var zanInfo = {
      "user_id": app.globalData.userId,
      "doc_id": docid,
      "type": "2",//1点赞  2 收藏
      "cancel": cancel//操作 1取消点赞 0 点赞
    }

    wx.request({
      url: getApp().globalData.urlPath + 'goodcollect/setGoodOrCollect',
      method: 'GET',
      data: zanInfo,
      header: {
        'Accept': 'application/json'
      },
      success: res => {
        console.log("收藏操作成功！")
      },
    }) 

  }, 
  /**
   * actionSeet实现方式
   */
  // actionSheetTap: function (e) {
  //   this.setData({
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   });
  // },
 
  // bindItemTap: function (e) {
  //   console.log('tap ' + e.currentTarget.dataset.name);
  //   this.setData({
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   });
  // },
/**
 * picker 实现方式
 * 
 */
selectorChange:function(e){
  let i = e.detail.value;
  let value = this.data.actionSheetItems[i];
  //实现排序功能
  
},
  gotoPreview: function (e) {
    var docid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/preview/preview?docid=' + docid
    })
  },
  /**
   * 点击回填搜索框
   * 
   */
  backTosearch:function(e){
    var value = e.currentTarget.dataset.value
    this.setData({
      searchValue:value
    })
  },
})