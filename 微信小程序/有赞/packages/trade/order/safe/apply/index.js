var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(e) {
    function t(a) {
        if (n[a]) return n[a].exports;
        var o = global.installedModules[a] = n[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
    }
    e = Object.assign(require("../../../../../commons.js").modules, e), e = Object.assign(require("../../../../../vendors.js").modules, e);
    var n = {};
    n = global.installedModules = global.installedModules || {}, t.m = e, t.c = n, t.d = function(e, n, a) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: a
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(n, "a", n), n;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 126);
}({
    124: function(e, t, n) {
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var o = a(n(5)), s = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e, t;
        }(n(13)), i = a(n(2));
        e.exports = {
            parseSafeBasicData: function(e, t) {
                var n = {}, a = {}, r = [ {
                    text: "请选择处理方式",
                    code: 0
                } ];
                if ((0, o.default)(e.type, function(e, t) {
                    r.push({
                        text: e,
                        code: t
                    });
                }), n.methods = r, n.pay_time = e.pay_time, n.goods_title = e.goods_title, t) {
                    var d = e.safe_info || {};
                    n.moneyStr = d.refund_fee, n.phone = d.phone || "", n.message = d.remark || "", 
                    n.method = d.safe_type || 0, n.express = 0, n.reason = d.safe_reason || 0, n.imgs = (d.ext_info || []).map(function(e) {
                        return {
                            uploading: !1,
                            src: e,
                            key: s.makeRandomString(8) + new Date().getTime(),
                            srcPreview: (0, i.default)(e, "!200x200.jpg")
                        };
                    });
                }
                return n.real_pay = e.real_pay, n.is_full_refund = e.is_full_refund, a.reason_relation = function(e) {
                    var t = {};
                    t.refund = e.refund.map(function(e) {
                        var t = [];
                        return (0, o.default)(e, function(e, n) {
                            t.push({
                                code: n,
                                text: e
                            });
                        }), t;
                    });
                    var n = [];
                    return (0, o.default)(e.refund_and_return, function(e, t) {
                        n.push({
                            code: t,
                            text: e
                        });
                    }), t.refund_and_return = n, t;
                }(e.reason_relation), n.originData = a, n;
            },
            getReasons: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, a = [ {
                    code: 0,
                    text: "请选择退款原因"
                } ];
                return t ? a = 1 == t ? a.concat(e.refund[n] || []) : a.concat(e.refund_and_return) : a;
            }
        };
    },
    125: function(e, t, n) {
        var a = getApp();
        e.exports = {
            getApplyBasicData: function(e, t, n) {
                a.carmen({
                    api: "kdt.trade.safe.detail/1.0.0/getSafeApplyBasicInfo",
                    data: e,
                    success: function(e) {
                        t && t(e);
                    },
                    fail: function(e) {
                        n && n(e.msg);
                    }
                });
            },
            submitFormId: function(e, t, n) {
                a.carmen({
                    api: "youzan.trade.weapp.formid/3.0.0/update",
                    data: e,
                    method: "GET",
                    success: function(e) {
                        t && t(e);
                    },
                    fail: function(e) {
                        n && n(e.msg, e);
                    }
                });
            },
            submit: function(e, t, n) {
                var o = {
                    safe_no: e.safe_no,
                    order_no: e.order_no,
                    phone: e.phone,
                    photos: e.photos,
                    refund_fee: e.money,
                    remark: e.message,
                    safe_reason: e.reason,
                    safe_type: e.method
                };
                e.item_id && (o.item_id = e.item_id), a.carmen({
                    api: "kdt.trade.safe.creator/1.0.0/safeCreateOrUpdate",
                    data: o,
                    method: "POST",
                    success: function(e) {
                        t && t(e);
                    },
                    fail: function(e) {
                        n && n(e.msg, e);
                    }
                });
            }
        };
    },
    126: function(t, n, a) {
        function o(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e, t;
        }
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var i = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : e(t);
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
        }, r = s(a(0)), d = o(a(13)), u = o(a(30)), f = s(a(2)), c = s(a(6)), l = s(a(22)), h = o(a(1)), p = o(a(125)), m = o(a(124)), g = getApp();
        (0, r.default)(h.Toast, {
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
                var t = this, n = e.dbid || "", a = g.db.get(n), o = {};
                o = n ? {
                    safe_no: a.safe_no || "",
                    order_no: a.order_no || "",
                    item_id: a.item_id || ""
                } : {
                    safe_no: e.safe_no || "",
                    order_no: e.order_no || "",
                    item_id: e.item_id || ""
                }, this.setData(o), wx.showToast({
                    title: "数据加载中",
                    icon: "loading",
                    duration: 1e4
                });
                var s = {
                    order_no: this.data.order_no
                };
                this.data.safe_no ? s.safe_no = this.data.safe_no : s.item_id = this.data.item_id, 
                p.getApplyBasicData(s, function(e) {
                    wx.hideToast(), t.setData(Object.assign({
                        fetching: !1
                    }, m.parseSafeBasicData(e, t.data.safe_no))), t.data.safe_no ? (t.onMoneyChange({
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
                this.setData({
                    copyright: g.globalData.copyright,
                    is_big_shop: g.globalData.is_big_shop
                });
            },
            onImageDelete: function(e) {
                var t = (e.currentTarget.dataset || {}).key || "", n = this.data.imgs || [], a = n.findIndex(function(e) {
                    return e.key == t;
                });
                a < 0 || (n.splice(a, 1), this.setData({
                    imgs: n
                }));
            },
            onImageAdd: function() {
                var e = this, t = 5 - this.data.imgs.length;
                t = t > 0 ? t : 0, wx.chooseImage({
                    count: t,
                    sizeType: [ "compressed" ],
                    success: function(t) {
                        var n = t.tempFilePaths || [], a = e.data.imgs || [], o = [];
                        a.length + n.length > 5 ? e.showZanToast("最多一共只能上传5张图片~") : (n.forEach(function(t) {
                            o.push({
                                uploading: !0,
                                src: t,
                                srcPreview: t,
                                key: e.generateKey()
                            });
                        }), e.uploadImg(o), a = a.concat(o), e.setData({
                            imgs: a
                        }));
                    }
                });
            },
            bindMethodChange: function(e) {
                var t = e.detail.value, n = (this.data.methods[t] || {}).code || 0;
                this.setData({
                    method: n,
                    methodIndex: t
                }), this.rebuildReasonSelect();
            },
            bindExpressChange: function(e) {
                var t = e.detail.value, n = (this.data.expressList[t] || {}).code || 0;
                this.setData({
                    express: n,
                    expressIndex: t
                }), this.rebuildReasonSelect();
            },
            bindReasonChange: function(e) {
                var t = e.detail.value, n = (this.data.reasons[t] || {}).code || 0;
                this.setData({
                    reason: n,
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
                var t = e.detail.value, n = (0, c.default)(t).toCent();
                t = (0, c.default)(n).toYuan(), this.setData({
                    money: n,
                    moneyStr: t
                });
            },
            onSubmitClick: function(e) {
                var t = this, n = e.detail.formId || "";
                p.submitFormId({
                    form_id: n,
                    order_no: this.data.order_no
                }, function(e) {
                    console.log(e);
                }, function(e) {
                    console.log(e);
                });
                var a = this.getPostData();
                this.validData(a) && (this.applying || (this.applying = !0, p.submit(a, function(e) {
                    t.applying = !1;
                    var n = e.safe_no;
                    "object" === (void 0 === n ? "undefined" : i(n)) && (n = n.data);
                    var a = g.db.set({
                        order_no: t.data.order_no,
                        safe_no: n
                    });
                    wx.redirectTo({
                        url: "/packages/trade/order/safe/info/index?dbid=" + a
                    });
                }, function(e) {
                    t.applying = !1, t.showZanToast(e || "网络卡了下，稍候再试试~");
                })));
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
                    photos: JSON.stringify(e.imgs.map(function(e) {
                        return e.src;
                    }))
                };
                return e.safe_no || (t.item_id = e.item_id), t;
            },
            validData: function(e) {
                if (e.method) if (e.reason) if (e.money) if (e.phone) if (u.phone(e.phone) || u.mobile(e.phone)) if (e.message.length > 200) this.showZanToast("备注信息不要超过200字~"); else {
                    if (!this.data.imgs.some(function(e) {
                        return e.uploading;
                    })) return !0;
                    this.showZanToast("部分图片正在上传中，请稍候~");
                } else this.showZanToast("请填写正确的手机号码"); else this.showZanToast("请填写手机号码"); else this.showZanToast("请填写退款金额"); else this.showZanToast("请选择退款原因"); else this.showZanToast("请选择处理方式");
            },
            uploadImg: function() {
                var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                (0, l.default)(t, {
                    afterUploadSuccess: function(t, n) {
                        var a = e.data.imgs, o = a.findIndex(function(e) {
                            return n.key == e.key;
                        });
                        if (!(o < 0)) {
                            var s = a[o];
                            s.src = t, s.srcPreview = (0, f.default)(t, "!200x200.jpg"), s.uploading = !1, e.setData({
                                imgs: a
                            });
                        }
                    },
                    afterUploadFail: function(t) {
                        var n = e.data.imgs, a = n.findIndex(function(e) {
                            return t.key == e.key;
                        });
                        a < 0 || (n.splice(a, 1), e.setData({
                            imgs: n
                        }), e.showZanToast("部分图片上传出错，已经自动剔除"));
                    }
                });
            },
            generateKey: function() {
                return d.makeRandomString(8) + new Date().getTime();
            },
            generateSelect: function() {
                var e = this, t = this.data.methods.findIndex(function(t) {
                    return t.code == e.data.method;
                }) || 0, n = this.data.expressList.findIndex(function(t) {
                    return t.code == e.data.express;
                }) || 0, a = this.generateReasons(), o = a.findIndex(function(t) {
                    return t.code == e.data.reason || 0;
                });
                -1 === o && (o = 0), this.setData({
                    methodIndex: t,
                    expressIndex: n,
                    reasons: a,
                    reasonIndex: o
                });
            },
            generateReasons: function() {
                var e = this.data, t = e.originData.reason_relation;
                return m.getReasons(t, e.method, e.express) || [];
            },
            rebuildReasonSelect: function() {
                var e = this.generateReasons();
                this.setData({
                    reasons: e,
                    reasonIndex: 0,
                    reason: 0
                });
            }
        });
    }
});