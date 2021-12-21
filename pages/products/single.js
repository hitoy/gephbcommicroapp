let Request = require('../../utils/request.js');

let Utils = require('../../utils/utils.js');

let ajaxurl = getApp().globalData.ajaxurl;
Page({
    data: {
        rawdata: {},
        id: 0,
        subtitle: '',
        excerpt: '',
        technical: '',
        summary: '',
        gallery: [],
        advantages: [],
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
        permalink: '',
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
                articleTitle: result.post_title,
                subtitle: result.post_subtitle,
                keywords: result.post_keywords,
                description: result.post_excerpt,
                excerpt: result.post_excerpt,
                overview: result.post_overview,
                thumbnail: result.post_thumbnail,
                summary: result.post_summary,
                technical: result.post_technical,
                gallery: result.post_gallery,
                advantages: JSON.parse(result.post_advantages),
                content: result.post_content,
                images: result.post_images,
                releaseDate: result.post_date,
                have_video: result.post_video_url.substr(-4) == '.mp4',
                video_url: result.post_video_url,
                video_duration: result.post_video_duration,
                video_width: result.post_video_width,
                video_height: result.post_video_height,
                video_cover: result.post_video_cover,
                permalink: result.mobile_permalink,
                views: result.views,
                likes: result.likes,
                shares: result.shares,
                related_applications: result.post_related_application,
                related_products: result.post_related_product,
                related_projects: result.post_related_project,
                related_videos: result.post_related_video,
                related_posts: result.post_related_article
            });

            tt.setNavigationBarTitle({
                title: result.post_title,
            });
        });
    },

    onShareAppMessage() {
        let _this = this;
        return {
            title: _this.data.subtitle,
            desc: _this.data.descriptioin,
            imageUrl: _this.data.thumbnail,
            path: '/pages/products/single?id=' + this.data.id + '&ref=share',
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
