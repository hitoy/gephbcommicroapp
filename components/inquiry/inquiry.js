Component({
    properties: {
        phone: {
            type: String,
            value: '15838176062'
        }
    },
    methods: {
        call: function(){
            let phone = this.data.phone;
            tt.makePhoneCall({
                phoneNumber: phone,
                fail: function(){
                    tt.showModal({
                        title: '拨打失败',
                        content: '请检查是否输入了正确的电话号码',
                        showCancel: false
                    });
                },
                success: function(){
                    let page = getCurrentPages().pop();
                    page = page.route + (page.options.id ? '?id=' + page.options.id : '');

                    //记录拨打电话转化
                    tt.sendtoTAQ({
                        event_type: 'phone',
                        extra: {
                            assets_id: '1716815542574091',
                            page: page,
                        },
                    });

                    //发送分析数据
                    tt.reportAnalytics('userMessage', {
                        visit: 1,
                        message: '拨打电话: ' + phone
                    });
                }
            });
        },
        message: function(){
            tt.navigateTo({
                url: "/pages/about/inquiry"
            });
        },
        chat: function(){
             //访问客服页面
            tt.sendtoTAQ({
                event_type: 'view',
                extra: {
                    assets_id: '1716815542574091',
                    page: 'chat',
                },
            });
        }
    }
});
