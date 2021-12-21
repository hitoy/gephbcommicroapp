let Request = require('../../utils/request.js');
let Utils = require('../../utils/utils.js');
let ajaxurl = getApp().globalData.ajaxurl;

Page({
    data: {
        rawdata: {},
        id: 0,
        subtitle: '',
        content: '',
        author: '',
        author_avatar: '',
        author_tel: '',
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
    follow(){
        tt.followOfficialAccount({
            success: function(){console.log(111)},
            fail: function(){}
        });
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
                article: result.post_title,
                subtitle: result.post_subtitle,
                keywords: result.post_keywords,
                description: result.post_excerpt,
                releaseDate: result.post_date,
                author: result.post_author,
                author_avatar: result.post_author_avatar,
                author_tel: result.post_author_tel,
                content: result.post_content,
                thumbnail: result.post_images[0],
                images: result.post_images,
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
            imageUrl: _this.data.thumbnail,
            path: '/pages/posts/single?id=' + this.data.id + '&ref=share',
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
