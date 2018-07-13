const config = require('../../config.js');

Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    src: 'http://cdn2.kcomber.com:8195/upload//Plant/violet/0719A03D-7832-4C96-A4D8-544309E31B7D.jpg',
    list: [],
    userId:0

  },

  onLoad: function (options) {
    console.log("userid"+options);

    this.setData({
     userId:options.userId
   });
  },

  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }, onShow: function (e) {
    this.onPullDownRefresh();
  },
  onPullDownRefresh: function () {
    var that = this
    wx.request({
      url: config.host + '/account/' + that.data.userId+'/book', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json',// 默认值
        'userId': that.data.userId
      },
      success: function (res) {
        console.log(res);
        that.setData({
          list: res.data
        });
        wx.stopPullDownRefresh();
      }
    })

  },

})