let Request = require('../../utils/request.js');
let Utils = require('../../utils/utils.js');
let ajaxurl = getApp().globalData.ajaxurl;

Page({
    data: {
        rawdata: {},
        id: 0,
        subtitle: '',
        banner: '',
        content: '',
        video_url: '',
        video_duration: '',
        video_width: '',
        video_heigh: '',
        video_cover: '',
        solutions: [],
        title: '',
        articleTitle: '',
        keywords: '',
        description: '',
        images: '',
        thumbnail: '',
        releaseDate: '',
        views: 0,
        likes: 0,
        shares: 0,
        related_applications: '',
        related_products: '',
        related_projects: '',
        related_posts: ''
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

    onLoad(options) {
        this.requestTask = Request.get(ajaxurl, {
            action: 'getpost',
            id: options.id
        });
    },

    onShow() {
        let _this = this;

        this.requestTask.then(function (data) {
            let result = JSON.parse(data);

            _this.setData({
                rawdata: result,
                id: result.ID,
                title: result.post_title,
                articleTitle: result.post_title,
                subtitle: result.post_subtitle,
                excerpt: result.post_excerpt,
                banner: result.post_banner,
                slogan: result.post_slogan,
                thumbnail: result.post_thumbnail,
                overview: result.post_overview,
                content: result.post_content,
                images: result.post_images,
                video_url: result.post_video_url,
                video_duration: result.post_video_duration,
                video_width: result.post_video_width,
                video_height: result.post_video_height,
                video_cover: result.post_video_cover,
                related_applications: result.post_related_application,
                related_products: result.post_related_product,
                related_projects: result.post_related_project,
                related_videos: result.post_related_video,
                related_posts: result.post_related_article
            });

            if (_this.data.solutions.length == 0) {
                Request.get(ajaxurl, {
                    action: 'getrelatedposts',
                    s: _this.data.related_applications
                }).then(function (data) {
                    let result = JSON.parse(data);

                    _this.setData({
                        'solutions': result.items
                    });
                });
            }
        });
    },

    onShareAppMessage() {
        let _this = this;
        return {
            title: _this.data.title,
            desc: _this.data.description,
            imageUrl: _this.data.thumbnail,
            path: '/pages/business/single?id=' + this.data.id + '&ref=share',
            success: function(){
                Request.request(ajaxurl, {
                    action: 'addshare',
                    'page': 'post',
                    'id': _this.data.id
                });
            }
        };
    }
});
