!function(e) {
    function t(a) {
        if (s[a]) return s[a].exports;
        var n = global.installedModules[a] = s[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
    }
    e = Object.assign(require("../../../../../commons.js").modules, e), e = Object.assign(require("../../../../../vendors.js").modules, e);
    var s = {};
    s = global.installedModules = global.installedModules || {}, t.m = e, t.c = s, t.d = function(e, s, a) {
        t.o(e, s) || Object.defineProperty(e, s, {
            configurable: !1,
            enumerable: !0,
            get: a
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var s = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(s, "a", s), s;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 123);
}({
    123: function(e, t, s) {
        function a(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            return t.default = e, t;
        }
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var o = n(s(0)), i = n(s(5)), r = a(s(13)), d = n(s(22)), u = n(s(2)), c = a(s(30)), f = a(s(1)), l = getApp();
        (0, o.default)(f.Toast, {
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
                var t = e.dbid, s = l.db.get(t) || {};
                this.setData({
                    safe_no: s.safe_no || "",
                    order_no: s.order_no || ""
                }), this.fetchExpressCompany();
            },
            onShow: function() {
                this.setData({
                    copyright: l.globalData.copyright,
                    is_big_shop: l.globalData.is_big_shop
                });
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
                this.validateData(t) && (this.submiting || (this.submiting = !0, l.carmen({
                    api: "kdt.trade.safe.modify/1.0.0/postExp",
                    method: "POST",
                    data: t,
                    success: function() {
                        e.submiting = !1;
                        var t = l.db.set({
                            safe_no: e.data.safe_no,
                            order_no: e.data.order_no
                        });
                        wx.redirectTo({
                            url: "/packages/trade/order/safe/info/index?dbid=" + t
                        });
                    },
                    fail: function() {
                        e.submiting = !1;
                    }
                })));
            },
            onImageAdd: function() {
                var e = this, t = this.data, s = t.MAX_PICTURES - t.imgs.length;
                s = s > 0 ? s : 0, wx.chooseImage({
                    count: s,
                    sizeType: [ "compressed" ],
                    success: function(s) {
                        var a = s.tempFilePaths || [], n = e.data.imgs || [], o = [];
                        n.length + a.length > t.MAX_PICTURES ? e.showZanToast("最多一共只能上传" + t.MAX_PICTURES + "张图片~") : (a.forEach(function(t) {
                            o.push({
                                uploading: !0,
                                src: t,
                                srcPreview: t,
                                key: e.generateKey()
                            });
                        }), e.uploadMessageImgs(o), n = n.concat(o), e.setData({
                            imgs: n
                        }));
                    }
                });
            },
            onMessageImageDelete: function(e) {
                var t = (e.currentTarget.dataset || {}).key || "", s = this.data.imgs || [], a = s.findIndex(function(e) {
                    return e.key == t;
                });
                a < 0 || (s.splice(a, 1), this.setData({
                    imgs: s
                }));
            },
            uploadMessageImgs: function() {
                var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                (0, d.default)(t, {
                    afterUploadSuccess: function(t, s) {
                        var a = e.data.imgs, n = a.findIndex(function(e) {
                            return s.key == e.key;
                        });
                        if (!(n < 0)) {
                            var o = a[n];
                            o.src = t, o.srcPreview = (0, u.default)(t, "!100x100.jpg"), o.uploading = !1, e.setData({
                                imgs: a
                            });
                        }
                    },
                    afterUploadFail: function(t) {
                        var s = e.data.imgs, a = s.findIndex(function(e) {
                            return t.key == e.key;
                        });
                        a < 0 || (s.splice(a, 1), e.setData({
                            imgs: s
                        }), e.showZanToast("部分图片上传出错，已经自动剔除"));
                    }
                });
            },
            fetchExpressCompany: function() {
                var e = this;
                l.carmen({
                    api: "kdt.logistics.express.map/1.0.0/get",
                    success: function(t) {
                        if (200 == t.code) {
                            var s = [ {
                                code: 0,
                                text: "请选择物流公司"
                            } ];
                            (0, i.default)(t.data, function(e, t) {
                                "41" != t && s.push({
                                    text: e,
                                    code: t
                                });
                            }), t.data[41] && s.push({
                                code: "41",
                                text: t.data[41]
                            }), e.setData({
                                express: s
                            });
                        } else e.showZanToast(t.message || "获取物流公司列表失败，请稍候再试");
                    },
                    fail: function(t) {
                        e.showZanToast(t.msg || "网络抖了一下~请稍候再试");
                    }
                });
            },
            generateKey: function() {
                return r.makeRandomString(8) + new Date().getTime();
            },
            validateData: function(e) {
                if (e.express_id) if (e.express_no) if (e.phone) if (c.phone(e.phone) || c.mobile(e.phone)) {
                    if (!this.data.imgs.some(function(e) {
                        return e.uploading;
                    })) return !0;
                    this.showZanToast("部分图片正在上传中，请稍候~");
                } else this.showZanToast("请填写正确的手机号码"); else this.showZanToast("请填写手机号码"); else this.showZanToast("请填写物流单号"); else this.showZanToast("请选择物流公司");
            },
            getFormData: function() {
                var e = {
                    safe_no: this.data.safe_no,
                    order_no: this.data.order_no,
                    express_no: this.data.express_no,
                    phone: this.data.phone,
                    remark: this.data.message
                }, t = this.data.imgs.map(function(e) {
                    return e.src;
                });
                e.photos = JSON.stringify(t);
                var s = (this.data.express[this.data.expressIndex] || {}).code || 0;
                return e.express_id = s, e;
            }
        });
    }
});