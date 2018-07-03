const config = require('.././../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     code:"",
     title:'',
     author: '',
     publisher: '',
     pubdate: '',
     files:[],
     tags:[],
     isbn:'',
     bookImageUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("codeOPtion"+options);
    //  this.setData({
    //    code:options.code
    //  });

     // this.getbook(9787111547426);
    this.getbook(options.code);
     console.log(this.data.code);
  },


  getbook:function(code){
    var _this=this;
    wx.request({
      url:   config.host+  '/book/isbn/'+code, //仅为示例，并非真实的接口地址
      data: {
       
      },
      method: 'GET',
      header: {
         'content-type': 'application/json' 
      },
      success: function (res) {
        var _tags=[];
        for (var index in res.data.tags) {
          _tags = _tags.concat(res.data.tags[index].name);
          if(index>1)
          break;
        }
          _this.setData({
            title:res.data.title,
            author: res.data.author[0],
            publisher: res.data.publisher,
            pubdate: res.data.pubdate,
            tags: _tags,
            isbn: res.data.isbn13
        });
      }
    })
  },
  bindDateChange: function (e) {
    this.setData({
      pubdate: e.detail.value
    })
  },
  save: function () {
    
    var formData=this.data;
    console.log(formData);
    wx.request({
      url: config.host + '/book', //仅为示例，并非真实的接口地址
      data: JSON.stringify({
        bookName: formData.title,
        bookSummary:'',
        bookAuthor:formData.author,
        bookAuthorIntro: '',
        bookPubdate: formData.pubdate,
        bookISBN: formData.isbn,
        bookImageUrl: formData.bookImageUrl
      }),
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'UserId':  wx.getStorageSync('userId')

      },
      success: function (res) {
        console.log(res.data);
        wx.switchTab({
          url: '/pages/booklist'
        })
      }
    })
  },
  chooseImage:function(e){
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: config.host + '/book/image/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            
          },
          success: function (r) {
             var uploadResut= JSON.parse( r.data);
            that.setData({
              bookImageUrl: uploadResut.data
            });

          }
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var _files= that.data.files;
        console.log(_files.length);
        if(_files.length>0)
        {
          _files[0] = res.tempFilePaths;
        }else{
          _files=_files.concat(res.tempFilePaths)
        }
        that.setData({
          files: _files
        });
      }
    })
  }
})