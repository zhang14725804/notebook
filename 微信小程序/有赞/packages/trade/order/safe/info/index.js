!function(e) {
    function a(s) {
        if (t[s]) return t[s].exports;
        var o = global.installedModules[s] = t[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return e[s].call(o.exports, o, o.exports, a), o.l = !0, o.exports;
    }
    e = Object.assign(require("../../../../../commons.js").modules, e), e = Object.assign(require("../../../../../vendors.js").modules, e);
    var t = {};
    t = global.installedModules = global.installedModules || {}, a.m = e, a.c = t, a.d = function(e, t, s) {
        a.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: s
        });
    }, a.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, a.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return a.d(t, "a", t), t;
    }, a.o = function(e, a) {
        return Object.prototype.hasOwnProperty.call(e, a);
    }, a.p = "", a(a.s = 122);
}({
    118: function(e, a, t) {
        var s = t(22), o = t(28), n = t(2);
        e.exports = {
            showYouzanDialog: function() {
                this.setData({
                    "youzanDialog.show": !0
                });
            },
            hideYouzanDialog: function() {
                this.setData({
                    "youzanDialog.show": !1
                });
            },
            onYouzanDialogTextChange: function(e) {
                this.setData({
                    "youzanDialog.message": e.detail.value
                });
            },
            submitYouzanDialog: function() {
                var e = this, a = this.data.youzanDialog;
                a.message ? this.validateImages(a.imgs) ? this.isSubmitingYouzan || (this.isSubmitingYouzan = !0, 
                o.submitYouzan(this.data, function() {
                    e.isSubmitingYouzan = !1, e.setData({
                        "youzanDialog.message": "",
                        "youzanDialog.show": !1,
                        "youzanDialog.imgs": []
                    }), e.fetchSafeData();
                }, function(a) {
                    e.isSubmitingYouzan = !1, e.showZanToast(a || "网络抖了下，请稍候再试~");
                })) : this.showZanToast("还有部分图片还没有上传完成，请稍候再试~") : this.showZanToast("请填写维权理由");
            },
            chooseYouzanImages: function() {
                var e = this, a = this.data, t = a.MAX_PICTURES - a.youzanDialog.imgs.length;
                t = t > 0 ? t : 0, wx.chooseImage({
                    count: t,
                    sizeType: [ "compressed" ],
                    success: function(t) {
                        var s = t.tempFilePaths || [], o = e.data.youzanDialog.imgs || [], n = [];
                        o.length + s.length > a.MAX_PICTURES ? e.showZanToast("最多一共只能上传" + a.MAX_PICTURES + "张图片~") : (s.forEach(function(a) {
                            n.push({
                                uploading: !0,
                                src: a,
                                srcPreview: a,
                                key: e.generateKey()
                            });
                        }), e.uploadYouzanImgs(n), o = o.concat(n), e.setData({
                            "youzanDialog.imgs": o
                        }));
                    }
                });
            },
            onYouzanImageDelete: function(e) {
                var a = (e.currentTarget.dataset || {}).key || "", t = this.data.youzanDialog.imgs || [], s = t.findIndex(function(e) {
                    return e.key == a;
                });
                s < 0 || (t.splice(s, 1), this.setData({
                    "youzanDialog.imgs": t
                }));
            },
            uploadYouzanImgs: function() {
                var e = this, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                s(a, {
                    afterUploadSuccess: function(a, t) {
                        var s = e.data.youzanDialog.imgs, o = s.findIndex(function(e) {
                            return t.key == e.key;
                        });
                        if (!(o < 0)) {
                            var i = s[o];
                            i.src = a, i.srcPreview = n(a, "!100x100.jpg"), i.uploading = !1, e.setData({
                                "youzanDialog.imgs": s
                            });
                        }
                    },
                    afterUploadFail: function(a) {
                        var t = e.data.youzanDialog.imgs, s = t.findIndex(function(e) {
                            return a.key == e.key;
                        });
                        s < 0 || (t.splice(s, 1), e.setData({
                            "youzanDialog.imgs": t
                        }), e.showZanToast("部分图片上传出错，已经自动剔除"));
                    }
                });
            }
        };
    },
    119: function(e, a, t) {
        var s = t(22), o = t(28), n = t(2);
        e.exports = {
            showMessageDialog: function() {
                this.setData({
                    "messageDialog.show": !0
                });
            },
            hideMessageDialog: function() {
                this.setData({
                    "messageDialog.show": !1
                });
            },
            onMessageDialogTextChange: function(e) {
                this.setData({
                    "messageDialog.message": e.detail.value
                });
            },
            submitMessageDialog: function() {
                var e = this, a = this.data.messageDialog;
                a.message ? this.validateImages(a.imgs) ? this.isSubmitingMessage || (this.isSubmitingMessage = !0, 
                o.submitMessage(this.data, function(a) {
                    e.isSubmitingMessage = !1;
                    var t = e.data.messageDialog || {};
                    t.message = "", t.imgs = [], t.show = !1;
                    var s = a;
                    s.ext_info = s.ext_info.map(function(e) {
                        return {
                            src: e,
                            srcPreview: n(e, "!200x200.jpg")
                        };
                    });
                    var o = e.data.log || [];
                    o.unshift(s), e.setData({
                        log: o,
                        messageDialog: t
                    });
                }, function(a) {
                    e.isSubmitingMessage = !1, e.showZanToast(a || "网络抖了下，请稍候再试~");
                })) : this.showZanToast("还有部分图片还没有上传完成，请稍候再试~") : this.showZanToast("请填写留言信息");
            },
            chooseMessageImages: function() {
                var e = this, a = this.data, t = a.MAX_PICTURES - a.messageDialog.imgs.length;
                t = t > 0 ? t : 0, wx.chooseImage({
                    count: t,
                    sizeType: [ "compressed" ],
                    success: function(t) {
                        var s = t.tempFilePaths || [], o = e.data.messageDialog.imgs || [], n = [];
                        o.length + s.length > a.MAX_PICTURES ? e.showZanToast("最多一共只能上传" + a.MAX_PICTURES + "张图片~") : (s.forEach(function(a) {
                            n.push({
                                uploading: !0,
                                src: a,
                                srcPreview: a,
                                key: e.generateKey()
                            });
                        }), e.uploadMessageImgs(n), o = o.concat(n), e.setData({
                            "messageDialog.imgs": o
                        }));
                    }
                });
            },
            onMessageImageDelete: function(e) {
                var a = (e.currentTarget.dataset || {}).key || "", t = this.data.messageDialog.imgs || [], s = t.findIndex(function(e) {
                    return e.key == a;
                });
                s < 0 || (t.splice(s, 1), this.setData({
                    "messageDialog.imgs": t
                }));
            },
            uploadMessageImgs: function() {
                var e = this, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                s(a, {
                    afterUploadSuccess: function(a, t) {
                        var s = e.data.messageDialog.imgs, o = s.findIndex(function(e) {
                            return t.key == e.key;
                        });
                        if (!(o < 0)) {
                            var i = s[o];
                            i.src = a, i.srcPreview = n(a, "!100x100.jpg"), i.uploading = !1, e.setData({
                                "messageDialog.imgs": s
                            });
                        }
                    },
                    afterUploadFail: function(a) {
                        var t = e.data.messageDialog.imgs, s = t.findIndex(function(e) {
                            return a.key == e.key;
                        });
                        s < 0 || (t.splice(s, 1), e.setData({
                            "messageDialog.imgs": t
                        }), e.showZanToast("部分图片上传出错，已经自动剔除"));
                    }
                });
            }
        };
    },
    120: function(e, a, t) {
        e.exports = {
            stateMap: {
                201: "safe-ing",
                202: "safe-ing",
                203: "disagree",
                205: "fill-address",
                206: "sended",
                250: "agreed",
                204: "youzan",
                249: "closed",
                207: "no-receive"
            },
            btnsMap: {
                201: [ "close" ],
                202: [ "close" ],
                203: [ "modify", "close", "youzan" ],
                205: [ "close" ],
                206: [],
                250: [ "order" ],
                204: [ "close" ],
                249: [],
                207: [ "close", "youzan" ]
            }
        };
    },
    121: function(e, a, t) {
        var s = t(120), o = t(6), n = t(2);
        e.exports = {
            parseSafeData: function(e) {
                var a = {};
                a.safe = e, a.type = s.stateMap[e.state] || "safe-ing", a.btns = s.btnsMap[e.state] || [], 
                a.item_id = e.item_id;
                var t = e.log;
                t.forEach(function(e) {
                    e.ext_info = e.ext_info || [], e.ext_info = e.ext_info.map(function(e) {
                        return {
                            src: e,
                            srcPreview: n(e, "!200x200.jpg")
                        };
                    });
                }), a.log = t;
                var i = e.item || {}, r = "";
                return e.item.sku.forEach(function(e) {
                    r += e.v + " ";
                }), i.skuStr = r, i.payPriceStr = o(e.item.pay_price).toYuan(), i.imgPreview = n(i.img_url, "!200x200.jpg"), 
                i.orderStateStr = e.order_state.status_str, a.goods = i, a.timeout = 1e3 * e.timeout || 0, 
                a;
            },
            parseRefundProcessData: function(e) {
                e = e[0] || {};
                var a = {};
                a.pay_method_str = e.pay_method_str || "", a.add_time = e.add_time;
                var t = [];
                t.push({
                    text: "卖家退款(" + e.add_time + ")",
                    done: !0
                }), t.push({
                    text: e.pay_method_str + "(" + e.update_time + ")",
                    done: !0
                });
                var s = {
                    text: "确认到账",
                    done: !1
                };
                return 2 == e.refund_state && (s.text = "确认到账(" + e.update_time + ")", s.done = !0), 
                t.push(s), a.steps = t, a;
            }
        };
    },
    122: function(e, a, t) {
        function s(e) {
            if (e && e.__esModule) return e;
            var a = {};
            if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (a[t] = e[t]);
            return a.default = e, a;
        }
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var n = o(t(0)), i = s(t(1)), r = o(t(15)), u = s(t(13)), c = s(t(28)), d = s(t(121)), g = s(t(119)), f = s(t(118)), l = getApp();
        (0, n.default)(i.Toast, i.Tab, g, f, {
            data: {
                fetching: !0,
                safe_no: "",
                order_no: "",
                item_id: "",
                type: "safe-ing",
                timeout: 0,
                countdown: {},
                countdownStr: {},
                goods: {},
                refund_process: {
                    show: !1
                },
                tab: {
                    selectedId: "1",
                    list: [ {
                        id: "1",
                        title: "退款详情"
                    }, {
                        id: "2",
                        title: "协商记录"
                    } ]
                },
                btns: [],
                log: [],
                messageDialog: {
                    show: !1,
                    message: "",
                    imgs: []
                },
                youzanDialog: {
                    show: !1,
                    message: "",
                    imgs: []
                },
                MAX_PICTURES: 5
            },
            onPullDownRefresh: function() {
                this.fetchSafeData(!0);
            },
            onLoad: function(e) {
                var a = l.db.get(e.dbid) || {};
                this.setData({
                    safe_no: a.safe_no || "",
                    order_no: a.order_no || ""
                });
            },
            onShow: function() {
                this.fetchSafeData(), this.setData({
                    copyright: l.globalData.copyright,
                    is_big_shop: l.globalData.is_big_shop
                });
            },
            handleZanTabChange: function(e) {
                var a = e.selectedId;
                this.setData({
                    "tab.selectedId": a
                });
            },
            showPicture: function(e) {
                var a = e.currentTarget.dataset.src;
                wx.previewImage({
                    urls: [ a ]
                });
            },
            closeSafe: function() {
                var e = this;
                wx.showModal({
                    title: "提示",
                    content: "确定要关闭维权么？",
                    success: function(a) {
                        a.confirm && c.close({
                            safe_no: e.data.safe_no,
                            order_no: e.data.order_no
                        }, function() {
                            return e.fetchSafeData();
                        }, function(a) {
                            e.showZanToast(a || "关闭维权失败");
                        });
                    }
                });
            },
            backToOrder: function() {
                wx.navigateBack();
            },
            jumpToFillAddress: function() {
                var e = l.db.set({
                    safe_no: this.data.safe_no,
                    order_no: this.data.order_no
                });
                wx.redirectTo({
                    url: "/packages/trade/order/safe/express/index?dbid=" + e
                });
            },
            modifySafe: function() {
                var e = l.db.set({
                    safe_no: this.data.safe_no,
                    order_no: this.data.order_no
                });
                wx.redirectTo({
                    url: "/packages/trade/order/safe/apply/index?dbid=" + e
                });
            },
            fetchSafeData: function(e) {
                var a = this;
                this.countdown && this.countdown.stop(), wx.showToast({
                    title: "数据加载中",
                    icon: "loading",
                    duration: 1e4
                }), c.getSafeDetail(this.data, function(t) {
                    wx.hideToast(), e && wx.stopPullDownRefresh();
                    var s = d.parseSafeData(t);
                    a.setData(Object.assign({
                        fetching: !1
                    }, s)), "agreed" == a.data.type && a.fetchRefundProcess(), a.startTimeout();
                }, function(t) {
                    wx.hideToast(), e && wx.stopPullDownRefresh(), a.showZanToast(t || "网络出了点问题~请稍候再试~");
                });
            },
            fetchRefundProcess: function() {
                var e = this;
                c.getRefundProcess(this.data, function(a) {
                    var t = Object.assign({}, e.data.refund_process, d.parseRefundProcessData(a));
                    e.setData({
                        refund_process: t
                    });
                });
            },
            showRefundProcess: function() {
                this.setData({
                    "refund_process.show": !0
                });
            },
            startTimeout: function() {
                var e = this;
                this.data.timeout && (this.countdown = new r.default(this.data.timeout, {
                    onChange: function(a, t) {
                        e.setData({
                            countdown: a,
                            countdownStr: t
                        });
                    },
                    onEnd: function() {
                        e.fetchSafeData();
                    }
                }));
            },
            generateKey: function() {
                return u.makeRandomString(8) + new Date().getTime();
            },
            validateImages: function() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).every(function(e) {
                    return !e.uploading;
                });
            }
        });
    },
    28: function(e, a, t) {
        var s = getApp();
        e.exports = {
            getSafeDetail: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = arguments[1], t = arguments[2];
                s.carmen({
                    api: "kdt.trade.safe.detail/1.0.0/getBySafeNoWithValidate",
                    data: {
                        safe_no: e.safe_no,
                        order_no: e.order_no
                    },
                    success: function(e) {
                        return a && a(e);
                    },
                    fail: function(e) {
                        return t && t(e.msg);
                    }
                });
            },
            getRefundProcess: function(e, a) {
                s.carmen({
                    api: "kdt.trade.refund.detail/1.0.0/getProcess",
                    data: {
                        item_id: e.item_id,
                        safe_no: e.safe_no,
                        order_no: e.order_no
                    },
                    success: function(e) {
                        return a && a(e);
                    }
                });
            },
            submitMessage: function(e, a, t) {
                var o = e.messageDialog, n = o.imgs.map(function(e) {
                    return e.src;
                });
                s.carmen({
                    api: "kdt.trade.safe.creator/1.0.0/createMessage",
                    method: "POST",
                    data: {
                        safe_no: e.safe_no,
                        order_no: e.order_no,
                        message: o.message,
                        ext_info: JSON.stringify(n)
                    },
                    success: function(e) {
                        a && a(e);
                    },
                    fail: function(e) {
                        t && t(e.msg);
                    }
                });
            },
            submitYouzan: function(e, a, t) {
                var o = e.youzanDialog, n = o.imgs.map(function(e) {
                    return e.src;
                });
                s.carmen({
                    api: "kdt.trade.safe.modify/1.0.0/involve",
                    method: "POST",
                    data: {
                        safe_no: e.safe_no,
                        order_no: e.order_no,
                        explain: o.message,
                        ext_info: JSON.stringify(n)
                    },
                    success: function(e) {
                        a && a(e);
                    },
                    fail: function(e) {
                        t && t(e.msg);
                    }
                });
            },
            close: function(e, a, t) {
                s.carmen({
                    api: "kdt.trade.safe.modify/1.0.0/close",
                    data: {
                        safe_no: e.safe_no,
                        order_no: e.order_no
                    },
                    success: function(e) {
                        return a && a(e);
                    },
                    fail: function(e) {
                        return t && t(e.msg);
                    }
                });
            }
        };
    }
});