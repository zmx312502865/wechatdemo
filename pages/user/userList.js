const config = require('.././../config.js');

// pages/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onPullDownRefresh();
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
    var that = this
    wx.request({
      url: config.host + '/account', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json',// 默认值
        'userId': wx.getStorageSync('userId')
      },
      success: function (res) {

        console.log(res);
        that.setData({
          list: res.data.data
        });
        wx.stopPullDownRefresh();
      }
    })

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
  
  },
  goToBookList:function(e){  
    console.log(e.currentTarget.id);
     wx.navigateTo({
       url: '../otherBookList/booklist?userId='+e.currentTarget.id
    });
  }
})