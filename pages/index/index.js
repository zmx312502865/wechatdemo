
const config = require('.././../config.js');
const app = getApp()

Page({
  data: {
    code:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    icon:'/image/neymar.png'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        icon: app.globalData.userInfo.avatarUrl
      });
      this.login();
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          icon: res.userInfo.avatarUrl
          
        });
        this.login();
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            icon: res.userInfo.avatarUrl
          });
          this.login();
        }
      })
    }
  
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  login:function()
  {
    var _that=this;
    var _hasUserInfo = this.data.hasUserInfo;
    var _nickName = _hasUserInfo?this.data.userInfo.nickName:'';
    var _avatarUrl = _hasUserInfo?this.data.userInfo.avatarUrl:'' ;
    console.log(this.data.userInfo);
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: config.host+  '/account/wxlogin',  //仅为示例，并非真实的接口地址
            data: {
              code: res.code,
              nickName: _nickName,
              avatarUrl: _avatarUrl
            },
            method: 'POST',
            header: {
              // 'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log("userId:" + res.data.userId)
              wx.setStorageSync('userId', res.data.userId)

            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  scanAdd:function(e)
  {
    wx.scanCode({
      success: (res) => {
        wx.navigateTo({
          url: '../book/book?code=' + res.result
        })
      }
    })
  },
  manualAdd: function (e) {
    console.log(this.data);
    var _code=this.data.code;
    console.log(_code);
    wx.navigateTo({
      url: '../book/book?code=' + _code
    })
  },
})
