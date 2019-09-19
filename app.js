//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    //登录

    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        if (!wx.getStorageSync("cookie")) {
          wx.login({
            success: res => {
              console.log("code:" + res.code);
              //let sessionId = "123"; 
              // 发送sessionId  res.code 到后台换取 openId, sessionKey, unionId，并存在服务端
              wx.request({
                url: getApp().globalData.urlPath + 'user/login',
                data: {
                  code: res.code,
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: res => {
                  wx.setStorageSync('cookie', res.data.data.USER_ID),
                    wx.setStorageSync('ntacct', res.data.data.NTACCT),
                    // getApp().globalData.avatarUrl = res.data.data.PORTRAIT,
                    // getApp().globalData.nickName = res.data.data.NI_NAME,
                    getApp().globalData.userId = res.data.data.USER_ID
                  // getApp().globalData.username = res.data.data.USER_NAME,
                  // getApp().globalData.email = res.data.data.EMAIL,
                  // getApp().globalData.phone=res.data.data.PHONE,
                  // getApp().globalData.signature = res.data.data.SIGNATURE,
                  // getApp().globalData.ntacct = res.data.data.NTACCT
                }
              })
            }
          })
        }
        console.log("session_key 未过期");
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
       
        wx.login({
          success: res => {
            console.log("code:" + res.code);
            // 发送sessionId  res.code 到后台换取 openId, sessionKey, unionId，并存在服务端
            wx.request({
              url: getApp().globalData.urlPath + 'user/login',
              data: {
                code: res.code,
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: res => {
                wx.setStorageSync('cookie', res.data.data.USER_ID),
                  wx.setStorageSync('ntacct', res.data.data.NTACCT),
                  getApp().globalData.userId = res.data.data.USER_ID
              }
            })
          }
        })
      }
    })
    this.globalData.userId = wx.getStorageSync("cookie");
    this.globalData.ntacct = wx.getStorageSync("ntacct");
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenHeight = res.screenHeight
      }
    })
  },
  globalData: {
    userId: "",
    avatarUrl: "",
    nickName: "",
    ntacct: '',
    screenHeight: '',
    urlPath: 'https://www.bainiu6.com/docs/',
   // urlPath: 'http://192.168.1.11:9001/docs/',
    //urlPath: 'http://127.0.0.1:9001/docs/',
  },
})