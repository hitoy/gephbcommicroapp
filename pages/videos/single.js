let Request = require('../../utils/request.js');
let Utils = require('../../utils/utils.js');
let ajaxurl = getApp().globalData.ajaxurl;

Page({
    data: {
        rawdata: {},
        id: 0,
        subtitle: '',
        content: '',
        video_url: '',
        video_duration: '',
        video_width: '',
        video_heigh: '',
        video_cover: '',
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
                subtitle: result.post_subtitle,
                articleTitle: result.post_title,
                keywords: result.post_keywords,
                description: result.post_excerpt,
                releaseDate: result.post_date,
                images: result.post_images,
                thumbnail: result.post_video_cover,
                content: result.post_content,
                video_url: result.post_video_url,
                video_duration: result.post_video_duration,
                video_width: result.post_video_width,
                video_height: result.post_video_height,
                video_cover: result.post_video_cover,
                views: result.views,
                likes: result.likes,
                shares: result.shares,
                related_products: result.post_related_product,
                related_projects: result.post_related_project
            });

            tt.setNavigationBarTitle({
                title: result.post_title,
            });
        });
    },
    onShareAppMessage() {
        let _this = this;
        return {
            title: _this.data.title,
            desc: _this.data.description,
            imageUrl: _this.data.video_cover,
            path: '/pages/videos/single?id=' + this.data.id + '&ref=share',
            templateId: 'h3cc879h25gb8d7815',
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
