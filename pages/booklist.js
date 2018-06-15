var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    src:'http://cdn2.kcomber.com:8195/upload//Plant/violet/0719A03D-7832-4C96-A4D8-544309E31B7D.jpg',
    list:[]
    
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
  },
  onPullDownRefresh: function () {
    var that = this
    wx.request({
      url: 'http://118.184.218.60/student/', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // that.data.list.push(res.data)
        // //样这种方式赋值   坑了我一个上午   
        var cList=that.data.list;
        cList=cList.concat(res.data);
      //  for(var i=0;i<res.data.length;i++)
      //  {
      //    cList.push(res.data[i]);
      //  }
        that.setData({
          list: cList
        });

        wx.stopPullDownRefresh();
      }
    })

  },
 
})