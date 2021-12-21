let Request = require('../../utils/request.js');
let app = getApp();

Page({
    data: {
        id: 0,
        referer: '',
        business: '',
    },
    checkboxChange(e){
        this.setData({
            business: e.detail.value.join(', '),
        });
    },
    submit(e){
        let value = e.detail.value;
        value.business = this.data.business;
        value.post_ID = this.data.id;
        value.format = 'json';
        value.content = value.content + "\r\n字节小程序: " + this.data.referer;
        tt.showLoading({
            title: '正在提交...',
            mask: true
        });

        let referer = this.data.referer;
        Request.post(app.globalData.feedbackurl, value).then(function(data) {
            let result = JSON.parse(data);
            tt.hideLoading();
            tt.showToast({
                icon: 'none',
                title: result.message
            });

            //记录表单转化
            if(result.code == 200){
                tt.sendtoTAQ({
                    event_type: 'form',
                    extra: {
                        assets_id: '1716815542574091',
                        page: referer,
                    },
                });
            }
        });
    },

    onShow(){
        let referers = getCurrentPages();
        let referer = referers[referers.length - 2];
        let query = referer.options.id ? '?id=' + referer.options.id : '';
        this.setData({
            id: referer.options.id,
            referer: referer.route + query
        });

        //访问目标页面
        tt.sendtoTAQ({
            event_type: 'page_view',
            extra: {
                assets_id: '1716815542574091',
                page: '/pages/about/inquiry',
            },
        });
    }
});
