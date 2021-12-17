const REQUEST = require('../../utils/request.js');
const app = getApp();

Component({
    properties: {
        search: {
            type: String,
            value: '',
            observer:  function (search) {
                if (!search) return;
                let _this = this;
                let relatedrequest = {
                    action: 'getrelatedposts',
                    s: _this.data.search,
                    cat: _this.data.category,
                    exclude: _this.data.exclude,
                    count: _this.data.number
                };
                let randomrequest = {
                    action: 'getposts',
                    cat: _this.data.category,
                    exclude: _this.data.exclude,
                    count: 3,
                    data_key: 'recommend',
                    data_value: 1,
                    orderby: 'rand'
                };
                REQUEST.get(app.globalData.ajaxurl, relatedrequest).then(function (data) {
                    let result = JSON.parse(data);
                    if (result.total != 0) _this.setData({
                        requested: true,
                        items: result.items
                    });else {
                        REQUEST.post(app.globalData.ajaxurl, randomrequest).then(function (data) {
                            let result = JSON.parse(data);

                            _this.setData({
                                requested: true,
                                items: result.items
                            });
                        });
                    }
                });
            }
        },
        exclude: {
            type: Number,
            value: 0
        },
        category: {
            type: String,
            value: '16'
        },
        number: {
            type: Number,
            value: 5
        }
    },
    data: {
        requested: false,
        exclude: 0,
        search: '',
        category: '16',
        number: 5,
        items: []
    },
    methods: {
        open(e){
            if(e.currentTarget.dataset.href){
                let url = '/pages/browse/index?url=' + encodeURI(e.currentTarget.dataset.href);
                tt.navigateTo({
                    url: url
                });
            }else if (e.currentTarget.dataset.page){
                tt.navigateTo({
                    url: e.currentTarget.dataset.page
                });
            }
        }
    }
});
