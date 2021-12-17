Page({
  data: {
    url: 'https://m.gephb.com/'
  },

  onInit(options) {
    let url = options.url || this.getData('url');
    this.setData({
      url: url
    });
  }

});