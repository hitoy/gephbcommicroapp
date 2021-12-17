let Request = require('../../utils/request.js');
let Utils = require('../../utils/utils.js');
let ajaxurl = getApp().globalData.ajaxurl;

Page({
    data: {
        rawdata: {},
        id: 0,
        subtitle: '',
        content: '',
        flowchart: '',
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
        //获取页面信息
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
                overview: result.post_overview,
                thumbnail: result.post_thumbnail,
                summary: result.post_summary,
                application: JSON.parse(result.post_application),
                flowchart: result.post_flowchart,
                content: result.post_content,
                releaseDate: result.post_date,
                images: result.post_images,
                video_url: result.post_video_url,
                video_duration: result.post_video_duration,
                video_width: result.post_video_width,
                video_height: result.post_video_height,
                video_cover: result.post_video_cover,
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
            title: _this.data.title,
            desc: _this.data.description,
            imageUrl: _this.data.thumbnail,
            path: '/pages/materials/single?id=' + this.data.id + '&ref=share',
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
