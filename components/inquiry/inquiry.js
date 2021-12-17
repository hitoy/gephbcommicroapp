Component({
  properties: {
    phone: {
      type: String,
      value: '15838176062'
    }
  },
  methods: {
    call: function () {
      let phone = this.data.phone;
      tt.makePhoneCall({
        phoneNumber: phone,
        fail: function () {
          tt.showModal({
            title: '拨打失败',
            content: '请检查是否输入了正确的电话号码',
            showCancel: false
          });
        },
        success: function () {
          tt.reportAnalytics('userMessage', {
            visit: 1,
            message: '拨打电话: ' + phone
          });
        }
      });
    },
    message: function () {
      tt.navigateTo({
        url: "/pages/about/inquiry"
      });
    }
  }
});
