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
    ntacct:'',
    modalHidden: true,
    modaltext: '',
    icon: "friendadd",
    iconColour: "white",
    iconText: "关注",
    iconShow: true,
    isAttention: false,
    screenHeight: app.globalData.screenHeight,
    list: [],
    background: '/images/writer.jpg',
    type:"0"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //非本人可见关注标志
    var that = this;
    let base64 = wx.getFileSystemManager().readFileSync(this.data.background, 'base64');
    that.setData({
      'background': 'data:image/jpg;base64,' + base64
    });
   
    let flag = false;
    let seq_id ="";
    let cookie = app.globalData.ntacct;
    if (options.ntacct != cookie)
    {
      flag = true;
    }
    if(options.seqId!=null)
    {
      seq_id = options.seqId;
    }


    this.queryUsreInfo(options.ntacct, seq_id, flag);
    // if (options.type != null)
    // {
    //   this.setData({
    //     ntacct: options.ntacct,
    //     isShow: flag,
    //     seqId: seq_id,
    //     icon: "friendaddfill",
    //     iconColour: "white",
    //     iconText: "取消关注",
    //     iconShow: true,
    //     isAttention: true,
    //   })
    // }


   

  },
  queryUsreInfo: function (ntacct,seq_id, flag) {
    var that = this;
    let cookie = app.globalData.ntacct;
    let header = { 'content-type': 'application/json' };
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: getApp().globalData.urlPath + 'querybyauthor',
      data: {
        NT: ntacct,//"83612795"  cookie
        user_id: app.globalData.userId
      },
      method: "get",
      header: header,
      success: res => {
        //从数据库获取用户信息
        if (res.data.flag) {
          let tempdata = res.data.data.docslist
          for (let i in tempdata) {
            let str = tempdata[i].DOC_LABEL
            var docLabel = str.split('，')
            tempdata[i].DOC_LABEL = docLabel
          }
          that.setData({
            avatarUrl: res.data.data.user.PORTRAIT,
            niname: res.data.data.user.NI_NAME,
            username: res.data.data.user.USER_NAME,
            email: res.data.data.user.EMAIL,
            phone: res.data.data.user.PHONE,
            signature: res.data.data.user.SIGNATURE,
            type: res.data.data.TYPE,
            list: tempdata||[]
          })

          if (res.data.data.TYPE == '1') {
            that.setData({
              ntacct: ntacct,
              isShow: flag,
              seqId: seq_id,
              icon: "friendaddfill",
              iconColour: "white",
              iconText: "取消关注",
              iconShow: true,
              isAttention: true,
            })
          } else {
            that.setData({
              ntacct: ntacct,
              isShow: flag,
              seqId: seq_id,
            })
          }
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
    let cookie = app.globalData.ntacct;
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
          "user_id": app.globalData.userId,
          "ntacct": that.data.ntacct,
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
          "user_id": app.globalData.userId,
          "ntacct": that.data.ntacct,
          "ntname": that.data.username,
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
  gotoPreview: function (e) {
    var docid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/preview/preview?docid=' + docid
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
 * 点赞和取消点赞
 * 
 */
  favorclick: function (e) {
    var that = this;
    var docid = e.currentTarget.dataset.id;
    var cancel = e.currentTarget.dataset.isgood; //操作 1 点赞  0 取消点赞
    var index = e.currentTarget.dataset.dex;
    var message = that.data.list;
    for (let i in message) {
      if (i == index) {
        if (message[i].is_good == '0') {
          message[i].is_good = '1'
        } else {
          message[i].is_good = '0'
        }
      }
    }
    that.setData({
      list: message
    })
    var zanInfo = {
      "user_id": app.globalData.userId,
      "doc_id": docid,
      "type": "1",//1点赞  2 收藏
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

    var message = this.data.list;
    for (let i in message) {
      if (i == index) {
        if (message[i].is_collect == '0') {
          message[i].is_collect = '1'
        } else {
          message[i].is_collect = '0'
        }
      }
    }
    that.setData({
      list: message
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