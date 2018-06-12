!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 29 ], {
    317: function(e, t, a) {
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var n = s(a(4)), i = s(a(1)), o = getApp(), d = a(3), r = a(11), u = a(56), h = a(70), c = a(6), f = a(108), p = a(0), g = a(8);
        (0, i.default)(d({}, g.Toast, {
            data: {
                safe_no: "",
                order_no: "",
                express: [ {
                    code: 0,
                    text: "物流公司获取中"
                } ],
                expressIndex: 0,
                express_no: "",
                phone: "",
                message: "",
                imgs: [],
                MAX_PICTURES: 5
            },
            onLoad: function(e) {
                var t = e.dbid, a = o.db.get(t) || {};
                this.setData({
                    safe_no: a.safe_no || "",
                    order_no: a.order_no || "",
                    kdt_id: a.kdt_id || ""
                }), this.fetchExpressCompany();
            },
            onShow: function() {
                p.page.show();
            },
            bindExpressChange: function(e) {
                this.setData({
                    expressIndex: e.detail.value || 0
                });
            },
            onExpressNoChange: function(e) {
                this.setData({
                    express_no: e.detail.value || ""
                });
            },
            onPhoneChange: function(e) {
                this.setData({
                    phone: e.detail.value || ""
                });
            },
            onMessageChange: function(e) {
                this.setData({
                    message: e.detail.value || ""
                });
            },
            onSubmitClick: function() {
                var e = this, t = this.getFormData();
                !this.validateData(t) || this.submiting || (this.submiting = !0, o.carmen({
                    api: "kdt.trade.safe.modify/1.0.0/postExp",
                    method: "POST",
                    data: t,
                    success: function() {
                        e.submiting = !1;
                        var t = o.db.set({
                            safe_no: e.data.safe_no,
                            order_no: e.data.order_no,
                            kdt_id: e.data.kdt_id
                        });
                        wx.redirectTo({
                            url: "/pages/trade/safe/info/index?dbid=" + t
                        });
                    },
                    fail: function() {
                        e.submiting = !1;
                    }
                }));
            },
            onImageAdd: function() {
                var e = this, t = this.data, a = t.MAX_PICTURES - t.imgs.length;
                a = 0 < a ? a : 0, wx.chooseImage({
                    count: a,
                    sizeType: [ "compressed" ],
                    success: function(a) {
                        var s = a.tempFilePaths || [], n = e.data.imgs || [], i = [];
                        return n.length + s.length > t.MAX_PICTURES ? void e.showZanToast("最多一共只能上传" + t.MAX_PICTURES + "张图片~") : (s.forEach(function(t) {
                            i.push({
                                uploading: !0,
                                src: t,
                                srcPreview: t,
                                key: e.generateKey()
                            });
                        }), e.uploadMessageImgs(i), n = n.concat(i), void e.setData({
                            imgs: n
                        }));
                    }
                });
            },
            onMessageImageDelete: function(e) {
                var t = (e.currentTarget.dataset || {}).key || "", a = this.data.imgs || [], s = a.findIndex(function(e) {
                    return e.key == t;
                });
                0 > s || (a.splice(s, 1), this.setData({
                    imgs: a
                }));
            },
            uploadMessageImgs: function() {
                var e = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [];
                h(t, {
                    kdt_id: this.data.kdt_id,
                    afterUploadSuccess: function(t, a) {
                        var s = e.data.imgs, n = s.findIndex(function(e) {
                            return a.key == e.key;
                        });
                        if (!(0 > n)) {
                            var i = s[n];
                            i.src = t, i.srcPreview = c(t, "!100x100.jpg"), i.uploading = !1, e.setData({
                                imgs: s
                            });
                        }
                    },
                    afterUploadFail: function(t) {
                        var a = e.data.imgs, s = a.findIndex(function(e) {
                            return t.key == e.key;
                        });
                        0 > s || (a.splice(s, 1), e.setData({
                            imgs: a
                        }), e.showZanToast("部分图片上传出错，已经自动剔除"));
                    }
                });
            },
            fetchExpressCompany: function() {
                var e = this;
                o.carmen({
                    api: "kdt.logistics.express.map/1.0.0/get",
                    success: function(t) {
                        if (200 == t.code) {
                            var a = [ {
                                code: 0,
                                text: "请选择物流公司"
                            } ];
                            r(t.data, function(e, t) {
                                "41" == t || a.push({
                                    text: e,
                                    code: t
                                });
                            }), t.data[41] && a.push({
                                code: "41",
                                text: t.data[41]
                            }), e.setData({
                                express: a
                            });
                        } else e.showZanToast(t.message || "获取物流公司列表失败，请稍候再试");
                    },
                    fail: function(t) {
                        e.showZanToast(t.msg || "网络抖了一下~请稍候再试");
                    }
                });
            },
            generateKey: function() {
                return u.makeRandomString(8) + new Date().getTime();
            },
            validateData: function(e) {
                if (e.express_id) if (e.express_no) if (e.phone) {
                    if (f.phone(e.phone) || f.mobile(e.phone)) return !this.data.imgs.some(function(e) {
                        return e.uploading;
                    }) || void this.showZanToast("部分图片正在上传中，请稍候~");
                    this.showZanToast("请填写正确的手机号码");
                } else this.showZanToast("请填写手机号码"); else this.showZanToast("请填写物流单号"); else this.showZanToast("请选择物流公司");
            },
            getFormData: function() {
                var e = {
                    safe_no: this.data.safe_no,
                    order_no: this.data.order_no,
                    express_no: this.data.express_no,
                    phone: this.data.phone,
                    remark: this.data.message,
                    kdt_id: this.data.kdt_id
                }, t = this.data.imgs.map(function(e) {
                    return e.src;
                });
                e.photos = (0, n.default)(t);
                var a = (this.data.express[this.data.expressIndex] || {}).code || 0;
                return e.express_id = a, e;
            }
        }));
    }
}, [ 317 ]);