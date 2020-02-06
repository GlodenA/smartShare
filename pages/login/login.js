const app = getApp()
var  username=''
var  ntacct=''

Page({
  data: {
    avatarUrl:"",
    nickName: "",
    phone:"",
    username:"",
    email:"",
    ntacct:"",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loginModel:true,
    registerModel:false,
    phoneModel: true,
  },
  onLoad: function () {
    

  },
  ntnameInput: function (e) {
    ntacct = e.detail.value
    this.setData({
      ntacct: e.detail.value
    })
  },
  usernameInput: function (e) {
    username = e.detail.value
    this.setData({
      username: e.detail.value
    })
    wx.setStorageSync('username', username);
  },
  login: function (e) {
    let that = this;
    if (username == '' || ntacct == ''){
      wx.showModal({
        title: '提示',
        content: '您输入的nt账号或者姓名不能为空，请重新输入之后再进入!!!',
        showCancel: false,
      });
    }else{
    wx.request({
      url: getApp().globalData.urlPath + 'user/findNT',
      data: {
        'NT': ntacct,
        'NTNAME': username
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code==2002) {
          wx.showModal({
            title: '提示',
            content: '您输入的nt账号或者姓名错误，请重新输入之后再进入!!!',
            showCancel: false,
          });
        } else {
          that.setData({
            loginModel: false,
            registerModel: true,
            phoneModel: true,
          });
        }
      }
    })
    }
  },
 
  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮 
      var that = this;
      if (that.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          that.setData({
            avatarUrl: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName,
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            that.setData({
              userInfo: res.userInfo,
              avatarUrl: res.userInfo.avatarUrl,
              nickName: res.userInfo.nickName,
              hasUserInfo: true
            })
          }
        })
      }

 

      that.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
        loginModel: true,
        phoneModel: false,
        registerModel:true,
      });
      app.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
      app.globalData.nickName = e.detail.userInfo.nickName;

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }


  },
 //保存用户信息
  saveUserInfo: function () {
    console.log("保存用户信息：");
    var that = this;
    let cookie = app.globalData.userId;
    let header = { 'content-type': 'application/json' };
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: getApp().globalData.urlPath + 'user/update',
      data: {
        USER_ID: cookie,
        PORTRAIT: that.data.avatarUrl,
        NI_NAME: that.data.nickName,
        PHONE: that.data.phone,
        USER_NAME: that.data.username,
        NTACCT: that.data.ntacct,
        EMAIL: that.data.email,
      },
      method: "post",
      header: header,
      success: function (res) {  
    
      },
      fail: function (res) {
      }
    });
  },

  getPhoneNumber: function (e) {
    let that =this;
    var detail = e.detail;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    } else {
      wx.request({
        url: getApp().globalData.urlPath+'user/getphone',
        data:{
          'user_id': getApp().globalData.userId,
          "encryptedData": detail.encryptedData,
          "iv": detail.iv
        },
         method: "get",
        success: function (res) {
          that.setData({
            phone: res.data.data.phone,
          });
          that.saveUserInfo();
          wx.setStorageSync('phone', res.data.data.phone);
          // wx.switchTab({
          //   url: "/pages/index/index",
          // })
          wx.navigateBack({
            url: '/pages/selfcentre/selfcentre',
          })
        },
      })

    }
  },
  cancelBind:function(){
    wx.navigateBack({
      url: '/pages/selfcentre/selfcentre',
    })
  },
  cancelBindPhone:function(){
    wx.navigateBack({
      url: '/pages/selfcentre/selfcentre',
    })
  }
})
