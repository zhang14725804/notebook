!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 30 ], {
    309: function(e, t, a) {
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var s = n(a(4)), o = n(a(2)), i = n(a(1)), d = a(3), r = a(56), h = a(108), u = a(6), c = a(15), f = a(70), l = a(0), g = a(8), m = a(310), p = a(311), _ = getApp();
        (0, i.default)(d({}, g.Toast, {
            data: {
                fetching: !0,
                safe_no: "",
                order_no: "",
                item_id: "",
                pay_time: "",
                goods_title: "",
                imgs: [],
                message: "",
                phone: "",
                money: 0,
                moneyStr: "",
                method: 0,
                methodIndex: 0,
                express: 0,
                expressIndex: 0,
                reason: 0,
                reasonIndex: 0,
                MAX_PICTURES: 5,
                methods: [],
                expressList: [ {
                    code: 0,
                    text: "未收到货"
                }, {
                    code: 1,
                    text: "已收到货"
                } ],
                reasons: [],
                real_pay: "0.00",
                is_full_refund: !1,
                originData: {}
            },
            onLoad: function(e) {
                var t = this, a = e.dbid || "", n = _.db.get(a), s = {
                    safe_no: n.safe_no || "",
                    order_no: n.order_no || "",
                    item_id: n.item_id || "",
                    kdt_id: n.kdt_id || ""
                };
                this.setData(s), wx.showToast({
                    title: "数据加载中",
                    icon: "loading",
                    duration: 1e4
                });
                var i = {
                    order_no: this.data.order_no
                };
                this.data.safe_no ? i.safe_no = this.data.safe_no : i.item_id = this.data.item_id, 
                i.kdt_id = this.data.kdt_id, m.getApplyBasicData(i, function(e) {
                    wx.hideToast(), t.setData((0, o.default)({
                        fetching: !1
                    }, p.parseSafeBasicData(e, t.data.safe_no))), t.data.safe_no ? (t.onMoneyChange({
                        detail: {
                            value: t.data.moneyStr
                        }
                    }), t.generateSelect()) : t.rebuildReasonSelect(), t.onMoneyChange({
                        detail: {
                            value: t.data.real_pay
                        }
                    });
                });
            },
            onShow: function() {
                l.page.show();
            },
            onImageDelete: function(e) {
                var t = (e.currentTarget.dataset || {}).key || "", a = this.data.imgs || [], n = a.findIndex(function(e) {
                    return e.key == t;
                });
                0 > n || (a.splice(n, 1), this.setData({
                    imgs: a
                }));
            },
            onImageAdd: function() {
                var e = this, t = 5 - this.data.imgs.length;
                t = 0 < t ? t : 0, wx.chooseImage({
                    count: t,
                    sizeType: [ "compressed" ],
                    success: function(t) {
                        var a = t.tempFilePaths || [], n = e.data.imgs || [], s = [];
                        return n.length + a.length > 5 ? void e.showZanToast("最多一共只能上传5张图片~") : (a.forEach(function(t) {
                            s.push({
                                uploading: !0,
                                src: t,
                                srcPreview: t,
                                key: e.generateKey()
                            });
                        }), e.uploadImg(s), n = n.concat(s), void e.setData({
                            imgs: n
                        }));
                    }
                });
            },
            bindMethodChange: function(e) {
                var t = e.detail.value, a = (this.data.methods[t] || {}).code || 0;
                this.setData({
                    method: a,
                    methodIndex: t
                }), this.rebuildReasonSelect();
            },
            bindExpressChange: function(e) {
                var t = e.detail.value, a = (this.data.expressList[t] || {}).code || 0;
                this.setData({
                    express: a,
                    expressIndex: t
                }), this.rebuildReasonSelect();
            },
            bindReasonChange: function(e) {
                var t = e.detail.value, a = (this.data.reasons[t] || {}).code || 0;
                this.setData({
                    reason: a,
                    reasonIndex: t
                });
            },
            onMessageChange: function(e) {
                var t = e.detail.value;
                this.setData({
                    message: t
                });
            },
            onPhoneChange: function(e) {
                var t = e.detail.value;
                this.setData({
                    phone: t
                });
            },
            onMoneyChange: function(e) {
                var t = e.detail.value, a = c(t).toCent();
                t = c(a).toYuan(), this.setData({
                    money: a,
                    moneyStr: t
                });
            },
            onSubmitClick: function() {
                var e = this, t = this.getPostData();
                !this.validData(t) || this.applying || (this.applying = !0, m.submit(t, function(t) {
                    e.applying = !1;
                    var a = _.db.set({
                        order_no: e.data.order_no,
                        safe_no: t.safe_no,
                        kdt_id: e.data.kdt_id
                    });
                    wx.redirectTo({
                        url: "/pages/trade/safe/info/index?dbid=" + a
                    });
                }, function(t) {
                    e.applying = !1, e.showZanToast(t || "网络卡了下，稍候再试试~");
                }));
            },
            getPostData: function() {
                var e = this.data, t = {
                    safe_no: e.safe_no,
                    order_no: e.order_no,
                    method: e.method || 0,
                    reason: e.reason || 0,
                    money: e.money,
                    phone: e.phone,
                    message: e.message,
                    kdt_id: e.kdt_id,
                    photos: (0, s.default)(e.imgs.map(function(e) {
                        return e.src;
                    }))
                };
                return e.safe_no || (t.item_id = e.item_id), t;
            },
            validData: function(e) {
                if (e.method) if (e.reason) if (e.money) if (e.phone) if (h.phone(e.phone) || h.mobile(e.phone)) {
                    if (!(200 < e.message.length)) return !this.data.imgs.some(function(e) {
                        return e.uploading;
                    }) || void this.showZanToast("部分图片正在上传中，请稍候~");
                    this.showZanToast("备注信息不要超过200字~");
                } else this.showZanToast("请填写正确的手机号码"); else this.showZanToast("请填写手机号码"); else this.showZanToast("请填写退款金额"); else this.showZanToast("请选择退款原因"); else this.showZanToast("请选择处理方式");
            },
            uploadImg: function() {
                var e = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [];
                f(t, {
                    kdt_id: this.data.kdt_id,
                    afterUploadSuccess: function(t, a) {
                        var n = e.data.imgs, s = n.findIndex(function(e) {
                            return a.key == e.key;
                        });
                        if (!(0 > s)) {
                            var o = n[s];
                            o.src = t, o.srcPreview = u(t, "!200x200.jpg"), o.uploading = !1, e.setData({
                                imgs: n
                            });
                        }
                    },
                    afterUploadFail: function(t) {
                        var a = e.data.imgs, n = a.findIndex(function(e) {
                            return t.key == e.key;
                        });
                        0 > n || (a.splice(n, 1), e.setData({
                            imgs: a
                        }), e.showZanToast("部分图片上传出错，已经自动剔除"));
                    }
                });
            },
            generateKey: function() {
                return r.makeRandomString(8) + new Date().getTime();
            },
            generateSelect: function() {
                var e = this, t = this.data.methods.findIndex(function(t) {
                    return t.code == e.data.method;
                }) || 0, a = this.data.expressList.findIndex(function(t) {
                    return t.code == e.data.express;
                }) || 0, n = this.generateReasons(), s = n.findIndex(function(t) {
                    return t.code == e.data.reason;
                }) || 0;
                this.setData({
                    methodIndex: t,
                    expressIndex: a,
                    reasons: n,
                    reasonIndex: s
                });
            },
            generateReasons: function() {
                var e = this.data, t = e.originData.reason_relation;
                return p.getReasons(t, e.method, e.express) || [];
            },
            rebuildReasonSelect: function() {
                var e = this.generateReasons();
                this.setData({
                    reasons: e,
                    reasonIndex: 0,
                    reason: 0
                });
            }
        }));
    }
}, [ 309 ]);