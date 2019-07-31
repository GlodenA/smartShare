//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //登录
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
       // wx.setStorageSync('cookie','123')
        console.log("session_key 未过期");
      },
      fail() {
        //wx.setStorageSync('cookie', '123')
        // session_key 已经失效，需要重新执行登录流程
        wx.login({ 
          success: res => {
            console.log("code:" + res.code);
            let sessionId = "123";
            // 发送sessionId  res.code 到后台换取 openId, sessionKey, unionId，并存在服务端
            wx.request({
              url: getApp().globalData.urlPath+'docs/login',
              data: {
                "code": res.code,
                "cookie": sessionId
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                //把sessionId存储在本地
                wx.setStorageSync({
                  key: 'cookie',
                  data: res.data.userId,
                })
              }
            })

          }
        })
      }
    })


  },
  globalData: {
    userInfo: null,
    urlPath: 'https://10.1.241.22/docs',
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