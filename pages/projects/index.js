let Request = require('../../utils/request.js');
let Utils = require('../../utils/utils.js');
let ajaxurl = getApp().globalData.ajaxurl;

Page({
    data: {
        title: '',
        keywords: '',
        description: '',
        releaseDate: '',
        thumbnail: '',
        solutions: [],
        items: [],
        total: 0,
        complete: false
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

    onLoad() {
        //获取栏目信息
        let _this = this; //栏目基础信息


        _this.requestTask = Request.get(ajaxurl, {
            action: 'getcategoryinfo',
            id: 11
        }); //获取精品案例

        Request.get(ajaxurl, {
            action: 'getposts',
            cat: 9
        }).then(function (data) {
            let result = JSON.parse(data);

            _this.setData({
                'solutions': result.items
            });
        }); //获取行业方案

        Request.get(ajaxurl, {
            action: 'getposts',
            cat: 11
        }).then(function (data) {
            let result = JSON.parse(data);

            _this.setData({
                items: result.items,
                total: result.total
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
                thumbnail: result.thumbnail,
                content: result.content
            });
        });
    },

    onReachBottom() {
        let _this = this;

        let items = _this.data.items;

        if (items.length == _this.data.total) {
            _this.setData({
                'complete': true
            });

            return;
        }

        Request.get(ajaxurl, {
            action: 'getposts',
            cat: 11,
            offset: items.length
        }).then(function (data) {
            let result = JSON.parse(data);

            _this.setData({
                items: items.concat(result.items)
            });
        });
    },

    onShareAppMessage() {
        let _this = this;

        return {
            title: _this.data.title,
            desc: _this.data.description,
            imageUrl: _this.data.thumbnail,
            path: '/pages/projects/index?ref=share',
            templateId: 'h3cc879h25gb8d7815'
        };
    }
});
