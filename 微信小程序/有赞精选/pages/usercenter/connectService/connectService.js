!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 22 ], {
    269: function(e, i, t) {
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var c = n(t(2)), a = n(t(4)), l = n(t(1)), d = t(44), h = t(0), s = (0, c.default)({}, {
            data: {
                windowHeight: 0,
                windowWidth: 0,
                imageList: [],
                clickInterface: {
                    helpPhoneCall: "helpPhoneCall"
                }
            },
            onLoad: function() {
                d(this), this.setData({
                    imageList: [ {
                        url: "https://img.yzcdn.cn/public_files/2016/12/05/a7a2430dd1f7ddeb9a5857bcc30784d8.png",
                        height: 0
                    }, {
                        url: "https://img.yzcdn.cn/public_files/2016/12/05/861fcdb1832005d46109024b91b751f5.png",
                        height: 0
                    }, {
                        url: "https://img.yzcdn.cn/public_files/2016/12/05/2fed7ffe00bf72e0b55e21f1701917ac.png",
                        height: 0
                    }, {
                        url: "https://img.yzcdn.cn/public_files/2016/12/05/b7b4bb1aa7695bcd3ca64eff3132c9ef.png",
                        height: 0
                    }, {
                        url: "https://img.yzcdn.cn/public_files/2016/12/05/5eda505fe2535443d3cb4ecddd533980.png",
                        height: 0
                    }, {
                        url: "https://img.yzcdn.cn/public_files/2016/12/05/7c85374799d67dde5633d55b34deeab2.png",
                        height: 0
                    }, {
                        url: "https://img.yzcdn.cn/public_files/2016/12/05/2a41610844f4b35108281866dde86be0.png",
                        height: 0
                    }, {
                        url: "https://img.yzcdn.cn/public_files/2016/12/05/7bb30c77552f176a8c6c3ae5453aa029.png",
                        height: 0
                    } ]
                });
            },
            onShow: function() {
                h.page.show();
            },
            onLoadImageFinish: function(e) {
                (0, a.default)(e);
                var i = e.detail.height, t = e.detail.width;
                console.log((0, a.default)(e));
                var n = e.currentTarget.dataset.idx, c = JSON.parse((0, a.default)(this.data.imageList));
                console.log("imageList " + n), c[n].height = i * (this.data.windowWidth / t), this.setData({
                    imageList: c
                });
            },
            helpPhoneCall: function() {
                wx.showModal({
                    title: "0571-89988550",
                    cancelText: "取消",
                    confirmText: "拨打",
                    cancelColor: "#333",
                    success: function(e) {
                        e.confirm && wx.makePhoneCall({
                            phoneNumber: "0571-89988550"
                        });
                    }
                });
            }
        });
        (0, l.default)(s);
    }
}, [ 269 ]);