let Request = require('../../utils/request.js');

let Utils = require('../../utils/utils.js');

let ajaxurl = getApp().globalData.ajaxurl;
Page({
    data: {
        title: '',
        keywords: '',
        description: '',
        content: '',
        thumbnail: '',
        video: '',
        items: {
            shredders: [],
            crushers: [],
            units: [],
            matchings: []
        },
        currentTab: 'shredders'
    },

    open(e) {
        if (e.currentTarget.dataset.href) {
            let url = '/pages/browse/index?url=' + encodeURI(e.currentTarget.dataset.href);
            tt.navigateTo({
                url: url
            });
        } else if (e.currentTarget.dataset.page) {
            tt.navigateTo({
                url: e.currentTarget.dataset.page
            });
        }
    },

    changetab(e) {
        let tab = e.currentTarget.dataset.tab;
        this.setData({
            'currentTab': tab
        });
    },

    onLoad() {
        let _this = this; //栏目基础信息


        _this.requestTask = Request.get(ajaxurl, {
            action: 'getcategoryinfo',
            id: 1
        }); //获取撕碎机产品信息: 双轴撕碎机

        Request.get(ajaxurl, {
            action: 'getpost',
            id: 21
        }).then(function (data) {
            let result = JSON.parse(data);
            let item = {
                id: result.ID,
                title: result.post_subtitle,
                excerpt: result.post_excerpt,
                thumbnail: result.post_thumbnail
            };
            let shredders = _this.data.items.shredders;
            shredders.push(item);

            _this.setData({
                ['items.shredders']: shredders
            });
        }); //获取撕碎机产品信息: 单轴撕碎机

        Request.get(ajaxurl, {
            action: 'getpost',
            id: 22
        }).then(function (data) {
            let result = JSON.parse(data);
            let item = {
                id: result.ID,
                title: result.post_subtitle,
                excerpt: result.post_excerpt,
                thumbnail: result.post_thumbnail
            };
            let shredders = _this.data.items.shredders;
            shredders.push(item);

            _this.setData({
                ['items.shredders']: shredders
            });
        }); //获取撕碎机产品信息: 其他撕碎机

        Request.get(ajaxurl, {
            action: 'getposts',
            cat: '2'
        }).then(function (data) {
            let result = JSON.parse(data);
            let shredders = _this.data.items.shredders;
            result.items.forEach(function (item) {
                shredders.push({
                    id: item.ID,
                    title: item.post_subtitle,
                    excerpt: item.post_excerpt,
                    thumbnail: item.post_thumbnail
                });
            });

            _this.setData({
                ['items.shredders']: shredders
            });
        }); //获取破碎机产品

        Request.get(ajaxurl, {
            action: 'getposts',
            cat: '5'
        }).then(function (data) {
            let result = JSON.parse(data);
            let crushers = _this.data.items.crushers;
            result.items.forEach(function (item) {
                crushers.push({
                    id: item.ID,
                    title: item.post_subtitle,
                    excerpt: item.post_excerpt,
                    thumbnail: item.post_thumbnail
                });
            });

            _this.setData({
                ['items.crushers']: crushers
            });
        }); //获取成套设备

        Request.get(ajaxurl, {
            action: 'getposts',
            cat: '6'
        }).then(function (data) {
            let result = JSON.parse(data);
            let units = _this.data.items.units;
            result.items.forEach(function (item) {
                units.push({
                    id: item.ID,
                    title: item.post_subtitle,
                    excerpt: item.post_excerpt,
                    thumbnail: item.post_thumbnail
                });
            });

            _this.setData({
                ['items.units']: units
            });
        }); //获取配套设备

        Request.get(ajaxurl, {
            action: 'getposts',
            cat: '8',
            count: 50
        }).then(function (data) {
            let result = JSON.parse(data);
            let matchings = _this.data.items.matchings;
            result.items.forEach(function (item) {
                matchings.push({
                    id: item.ID,
                    title: item.post_subtitle,
                    excerpt: item.post_excerpt,
                    thumbnail: item.post_thumbnail
                });
            });

            _this.setData({
                ['items.matchings']: matchings
            });
        });
    },

    onShow() {
        let _this = this;

        _this.requestTask.then(function (data) {
            let result = JSON.parse(data);

            _this.setData({
                title: result.title,
                keywords: result.keywords,
                description: result.description,
                releaseDate: result.pubdate,
                video: result.thumbnail,
                content: result.content
            });
        });

        tt.setNavigationBarTitle({
                title: result.title,
            });
    },

    onShareAppMessage() {
        let _this = this;
        return {
            title: _this.data.title,
            desc: _this.data.description,
            imageUrl: _this.data.items[_this.data.currentTab][0].thumbnail,
            path: '/pages/home/index?ref=share',
            templateId: 'h3cc879h25gb8d7815'
        };
    }
});
