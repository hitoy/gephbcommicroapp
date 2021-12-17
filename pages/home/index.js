/**
 * @file index.js
 * @author Hito
 */
let Request = require('../../utils/request.js');
let Utils = require('../../utils/utils.js');
let ajaxurl = getApp().globalData.ajaxurl;

Page({
    data: {
        title: '',
        keywords: '',
        description: '',
        images: '',
        releaseDate: '',
        banners: [],
        solutions: [],
        projects: [],
        items: {
            news: [],
            infos: [],
            posts: [],
            videos: []
        },
        itemstatus: {
            newstotal: 0,
            infostotal: 0,
            poststotal: 0,
            videostotal: 0
        },
        currentTab: 'news',
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

    opentab(e) {
        if (e.currentTarget.dataset.href) {
            tt.switchTab({
                url: e.currentTarget.dataset.href
            });
        }
    },

    changetab(e) {
        let tab = e.currentTarget.dataset.tab;
        this.setData({
            currentTab: tab,
            complete: false
        });
    },

    onLoad() {
        let _this = this;
        //请求站点基础信息
        _this.requestTask = Request.get(ajaxurl, {
            action: 'getsiteinfo'
        });

        //获取banner信息
        let images = _this.data.images || [];
        Request.get(ajaxurl, {
            action: 'getsitebanners'
        }).then(function (data) {
            let banners = JSON.parse(data);
            banners.forEach(function (el) {
                if (el.type == 'image') {
                    images.push(el.url);
                }
            });

            _this.setData({
                banners,
                banners,
                images: images
            });
        });

        //获取解决方案信息
        Request.get(ajaxurl, {
            action: 'getposts',
            cat: 9
        }).then(function (data) {
            let result = JSON.parse(data);

            _this.setData({
                'solutions': result.items
            });
        });

        //获取精品案例
        Request.get(ajaxurl, {
            action: 'getposts',
            cat: 11,
            data_key: 'recommend',
            data_value: '1'
        }).then(function (data) {
            let result = JSON.parse(data);

            _this.setData({
                'projects': result.items
            });
        });

        //获取公司新闻
        Request.get(ajaxurl, {
            action: 'getposts',
            cat: 13
        }).then(function (data) {
            let result = JSON.parse(data);

            _this.setData({
                ['items.news']: result.items,
                ['itemstatus.newstotal']: result.total
            });
        });

        //获取行业新闻
        Request.get(ajaxurl, {
            action: 'getposts',
            cat: 14
        }).then(function (data) {
            let result = JSON.parse(data);

            _this.setData({
                ['items.infos']: result.items,
                ['itemstatus.infostotal']: result.total
            });
        });

        //获取博客
        Request.get(ajaxurl, {
            action: 'getposts',
            cat: 15
        }).then(function (data) {
            let result = JSON.parse(data);

            _this.setData({
                ['items.posts']: result.items,
                ['itemstatus.poststotal']: result.total
            });
        });

        //获取视频信息
        Request.get(ajaxurl, {
            action: 'getposts',
            cat: 16
        }).then(function (data) {
            let result = JSON.parse(data);

            _this.setData({
                ['items.videos']: result.items,
                ['itemstatus.videostotal']: result.total
            });
        });
    },

    onShow() {
        let _this = this;

        let images = _this.data.images || [];

        _this.requestTask.then(function (data) {
            let result = JSON.parse(data);
            images = images.concat(result.image);

            _this.setData({
                title: result.title,
                keywords: result.keywords,
                description: result.description,
                images: images,
                releaseDate: result.pubdate
            });
        });
    },

    onReachBottom() {
        let _this = this;

        let tab = _this.data.currentTab;
        let data;

        if (tab == 'news') {
            let items = _this.data.items.news;

            if (items.length == _this.data.itemstatus.newstotal) {
                _this.setData({
                    'complete': true
                });

                return;
            }

            data = {
                action: 'getposts',
                cat: 13,
                offset: _this.data.items.news.length
            };
            Request.get(ajaxurl, data).then(function (data) {
                let result = JSON.parse(data);

                _this.setData({
                    ['items.news']: items.concat(result.items)
                });
            });
        } else if (tab == 'infos') {
            let items = _this.data.items.infos;

            if (items.length == _this.data.itemstatus.infostotal) {
                _this.setData({
                    'complete': true
                });

                return;
            }

            data = {
                action: 'getposts',
                cat: 14,
                offset: _this.data.items.infos.length
            };
            Request.get(ajaxurl, data).then(function (data) {
                let result = JSON.parse(data);

                _this.setData({
                    ['items.infos']: items.concat(result.items)
                });
            });
        } else if (tab == 'posts') {
            let items = _this.data.items.posts;

            if (items.length == _this.data.itemstatus.poststotal) {
                _this.setData({
                    'complete': true
                });

                return;
            }

            data = {
                action: 'getposts',
                cat: 15,
                offset: _this.data.items.posts.length
            };
            Request.get(ajaxurl, data).then(function (data) {
                let result = JSON.parse(data);

                _this.setData({
                    ['items.posts']: items.concat(result.items)
                });
            });
        } else if (tab == 'videos') {
            let items = _this.data.items.videos;

            if (items.length == _this.data.itemstatus.videostotal) {
                _this.setData({
                    'complete': true
                });

                return;
            }

            data = {
                action: 'getposts',
                cat: 16,
                offset: _this.data.items.videos.length
            };
            Request.get(ajaxurl, data).then(function (data) {
                let result = JSON.parse(data);

                _this.setData({
                    ['items.videos']: items.concat(result.items)
                });
            });
        }
    },
    onShareAppMessage(options) {
        let _this = this;
        return {
            title: _this.data.title,
            desc: _this.data.description,
            imageUrl: _this.data.images[0],
            path: '/pages/home/index?ref=share',
        };
    }
});
