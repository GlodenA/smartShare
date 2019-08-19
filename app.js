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
        if (!wx.getStorageSync("cookie")) 
        {
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
                  globalData.avatarUrl = res.data.data.PORTRAIT,
                  globalData.nickName = res.data.data.NI_NAME,
                  globalData.userId = res.data.data.USER_ID,
                  globalData.username = res.data.data.USER_NAME,
                  globalData.email = res.data.data.EMAIL,
                  globalData.phone=res.data.data.PHONE,
                  globalData.signature = res.data.data.SIGNATURE
                }
              })

            }
          })
        }
        console.log("session_key 未过期");
      },
      fail() {
        //wx.setStorageSync('cookie', '123')
        // session_key 已经失效，需要重新执行登录流程
        wx.login({ 
          success: res => {
            console.log("code:" + res.code);
            //let sessionId = "123"; 
            // 发送sessionId  res.code 到后台换取 openId, sessionKey, unionId，并存在服务端
            wx.request({
              url: getApp().globalData.urlPath+'user/login',
              data: {
                code: res.code,
              },  
              header: {
                'content-type': 'application/json' // 默认值
              }, 
              success:res=>{
                //把sessionId存储在本地
                wx.setStorageSync('cookie', res.data.data.USER_ID)
              }
            })

          }
        })
      }
    })
    this.globalData.userId = wx.getStorageSync("cookie");
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenHeight = res.screenHeight
      }
    }) 
  },
  globalData: {
    userInfo: null,
    userId:"",
    avatarUrl:"",
    nickName:"",
    userId:"",
    username: '',
    email: '',
    phone: '',
    signature: '',
    screenHeight:'',
    urlPath: 'https://www.bainiu6.com/docs/',
    //urlPath: 'http://192.168.1.16:9001/docs/',
    //urlPath: 'http://127.0.0.1:9001/docs/',
  },
  // isNeedSearch() {
  //   var needSearch = wx.getStorageSync("cookie");
  //   console.log(needSearch);
  //   if (!needSearch) {
  //     return true;
  //   }
  //   return false;
  // },

  // enterMainPage(flag) {
  //   if (flag) {
  //     wx.redirectTo({
  //       url: '/pages/login/login',
  //     });
  //   } else {
  //     wx.switchTab({
  //       url: '/pages/index/index',
  //     });
  //   }
  // },
})