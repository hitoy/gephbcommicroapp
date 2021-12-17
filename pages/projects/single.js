let Request = require('../../utils/request.js');
let Utils = require('../../utils/utils.js');
let ajaxurl = getApp().globalData.ajaxurl;

Page({
    data: {
        rawdata: {},
        id: 0,
        subtitle: '',
        client: '',
        material: '',
        capacity: '',
        application: '',
        gallery: '',
        review: '',
        content: '',
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

        _this.requestTask.then(function (data) {
            let result = JSON.parse(data);

            _this.setData({
                rawdata: result,
                id: result.ID,
                title: result.post_title,
                articleTitle: result.post_title,
                subtitle: result.post_subtitle,
                keywords: result.post_keywords,
                description: result.post_excerpt,
                gallery: result.post_gallery,
                client: result.post_client,
                material: result.post_material,
                capacity: result.post_capacity,
                application: result.post_application,
                review: result.post_review,
                content: result.post_content,
                video_url: result.post_video_url,
                video_duration: result.post_video_duration,
                video_width: result.post_video_width,
                video_height: result.post_video_height,
                video_cover: result.post_video_cover,
                releaseDate: result.post_date,
                images: result.post_images,
                thumbnail: result.post_images[0],
                views: result.views,
                likes: result.likes,
                shares: result.shares,
                related_applications: result.post_related_application,
                related_products: result.post_related_product,
                related_projects: result.post_related_project,
                related_posts: result.post_related_article
            });
        });
    },

    onShareAppMessage() {
        let _this = this;

        return {
            title: _this.data.title,
            desc: _this.data.description,
            imageUrl: _this.data.images[0],
            path: '/pages/projects/single?id=' + this.data.id + '&ref=share',
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