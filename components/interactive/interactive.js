const REQUEST = require('../../utils/request.js');
const STORAGE = require('../../utils/storage.js');
const app = getApp();

Component({
    properties: {
        objectid: {
            type: Number,
            value: 0,
            observer: function(id){
                if(id != 0) {
                    let _this = this;
                    REQUEST.request(app.globalData.ajaxurl, {
                        action: 'getmetadata',
                        'page': 'post',
                        'id': id
                    }).then(function (data) {
                        let result = JSON.parse(data);
                        _this.setData({
                            id: id,
                            likes: result.likes,
                            shares: result.shares,
                            liked: STORAGE.is_liked(id)
                        });
                    });
                }
            }
        },
        objecttitle: {
            type: String,
            value: ''
        },
        objectimageUrl: {
            type: String,
            value: ''
        }
    },
    data: {
        id: 0,
        likes: 0,
        shares: 0,
        liked: false
    },
    methods: {
        like: function () {
            let _this = this;
            let id = _this.data.id;
            if(STORAGE.is_liked(id)) return false;

            _this.setData({
                'liked': true
            });
            REQUEST.request(app.globalData.ajaxurl, {
                action: 'addlike',
                'page': 'post',
                'id': id
            }).then(function(data){
                _this.setData({
                    'likes': data
                });
                STORAGE.add_like(id);
            });
        }
    }
});
