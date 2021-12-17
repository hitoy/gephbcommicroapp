Page({
    data: {
        url: 'https://m.gephb.com/',
    },
    hideloading(){
        wx.hideLoading();
    },
    onLoad(options){
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        let url = options.url || this.getData('url');
        this.setData({
           url: url,
        });
    },
});
