Page({
    data: {
        title: '',
        articleTitle: '',
        keywords: '',
        description: '',
        releaseDate: '',
        articleTitle: '',
        image: [],
        video: []
    },

    call(e) {
        let number = e.currentTarget.dataset.number;
        tt.makePhoneCall({
            phoneNumber: number,
            success: function(){
                tt.sendtoTAQ({
                    event_type: 'phone',
                    extra: {
                        assets_id: '1716815542574091',
                        page: '/pages/about/index'
                    },
                });
            }
        });
    },

    onShow() {
        this.setData({
            title: '郑州洁普智能环保技术有限公司',
            articleTitle: '郑州洁普智能环保技术有限公司',
            keywords: '洁普智能环保,撕碎机厂家,破碎机厂家,垃圾破碎机厂家',
            description: '洁普智能环保，是一家专注于智能、环保技术和固废破碎设备的研发、生产、销售和服务的国家高新技术企业，始终致力于绿色科技的持续发展和固体废弃物的再生利用。',
            releaseDate: '2021-12-08 10:00'
        });
    },
    onShareAppMessage() {
        let _this = this;
        return {
            title: _this.data.title,
            desc: _this.data.description,
            path: '/pages/about/index?ref=share',
            templateId: 'h3cc879h25gb8d7815'
        };
    }
});
