var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(e) {
    function t(n) {
        if (a[n]) return a[n].exports;
        var o = a[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
    }
    var n = wx.webpackJsonp;
    wx.webpackJsonp = function(a, r, i) {
        for (var s, c, u, l = 0, d = []; l < a.length; l++) c = a[l], o[c] && d.push(o[c][0]), 
        o[c] = 0;
        for (s in r) Object.prototype.hasOwnProperty.call(r, s) && (e[s] = r[s]);
        for (n && n(a, r, i); d.length; ) d.shift()();
        if (i) for (l = 0; l < i.length; l++) u = t(t.s = i[l]);
        return u;
    };
    var a = {}, o = {
        54: 0
    };
    t.e = function() {
        throw new Error("Not chunk loading available");
    }, t.m = e, t.c = a, t.d = function(e, n, a) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: a
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
    }, t.p = "/", t.oe = function(e) {
        throw console.error(e), e;
    };
}([ function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(2)), o = n(234), r = n(235), i = n(236), s = {
        prefix: "__ZANLOG__",
        apiBase: "https://tj.youzan.com/1.gif",
        enterScene: "",
        enterPage: "",
        referPage: "",
        currentPage: "",
        globalData: {},
        uuid_prefix: "__zan_uuid__"
    }, c = {
        timer: null,
        interval: 18e5
    }, u = {
        getDeviceInfo: function() {
            if (!s.deviceInfo) {
                var e = wx.getSystemInfoSync();
                s.deviceInfo = {}, s.deviceInfo.brand = e.brand, s.deviceInfo.device = e.model, 
                s.deviceInfo.system = e.system, s.deviceInfo.wxversion = e.version, s.deviceInfo.platform = "weapp";
            }
            return s.deviceInfo;
        },
        request: function(e) {
            var t = {
                link: s.currentPage,
                time: new Date().getTime(),
                spm: r.getSpm()
            };
            s.globalData && (0, a.default)(t, s.globalData), s.referPage && (t.refer_url = s.referPage), 
            s.enterScene && (t.scene = s.enterScene), wx.request({
                url: s.apiBase,
                data: (0, a.default)(e, t, u.getDeviceInfo(), o.getADids() || {}),
                method: "get"
            });
        },
        handleAppQuery: function(e) {
            e && e.channel && l.setGlobalData({
                channel: e.channel
            }), e && e.topic && l.setGlobalData({
                topic: e.topic
            }), e && e.is_share && l.setGlobalData({
                is_share: e.is_share
            });
        },
        getUUID: function() {
            var e = new Date().getTime();
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                var n = 0 | (e + 16 * Math.random()) % 16;
                return e = Math.floor(e / 16), ("x" == t ? n : 8 | 7 & n).toString(16);
            });
        }
    }, l = {
        uid: null,
        app: {
            show: function(e) {
                e && e.path && (s.enterPage = e.path, e.scene && (s.enterScene = e.scene)), setTimeout(function() {
                    getApp(), e && e.query && (u.handleAppQuery(e.query), o.setADids(e.query));
                }, 0);
            }
        },
        page: {
            show: function(e) {
                var t = this;
                setTimeout(function() {
                    var n = getCurrentPages()[getCurrentPages().length - 1];
                    r.setCurrentSpm(n.__route__, e && e.id), s.referPage = s.currentPage, s.currentPage = e && e.query ? i.add(n.__route__, e.query) : n.__route__, 
                    t.uid || (t.uid = wx.getStorageSync(s.uuid_prefix), t.uid || (t.uid = u.getUUID(), 
                    wx.setStorageSync(s.uuid_prefix, t.uid))), u.request((0, a.default)({}, {
                        fm: "display",
                        uuid: t.uid
                    }, e));
                }, 10), c.timer && clearTimeout(c.timer), c.timer = setTimeout(function() {
                    r.removePageSpm();
                }, c.interval);
            }
        },
        track: function(e) {
            u.request((0, a.default)({
                fm: "click",
                uuid: this.uid || (this.uid = wx.getStorageSync(s.uuid_prefix), this.uid || (this.uid = u.getUUID(), 
                wx.setStorageSync(s.uuid_prefix, this.uid)))
            }, e || {}));
        },
        setGlobalData: function(e) {
            o.setADids(e), s.globalData = (0, a.default)({}, s.globalData, e);
        },
        getGlobalData: function() {
            return (0, a.default)({}, s.globalData, o.getADids(), s.enterScene ? {
                scene: s.enterScene
            } : {});
        },
        cleanData: function(e) {
            e.forEach(function(e) {
                delete s.globalData[e];
            });
        }
    };
    e.exports = l;
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    t.__esModule = !0, t.default = function() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return Page(i.apply(void 0, [ {
            onLoad: function(e) {
                getApp(), this.__query__ = e;
            }
        }, r.default ].concat(t)));
    };
    var o = a(n(240)), r = a(n(241)), i = ((0, o.default)({
        life: [ "onLaunch", "onShow", "onHide", "onError" ]
    }), (0, o.default)());
}, function(e, t, n) {
    e.exports = {
        default: n(183),
        __esModule: !0
    };
}, function(e) {
    e.exports = function(e) {
        for (var t = arguments.length, n = Array(1 < t ? t - 1 : 0), a = 1; a < t; a++) n[a - 1] = arguments[a];
        return (n || []).forEach(function(t) {
            if (t) for (var n in t) e[n] = t[n];
        }), e;
    };
}, function(e, t, n) {
    e.exports = {
        default: n(230),
        __esModule: !0
    };
}, , function(e) {
    function t(e) {
        var t = /\.([^.!]+)!([0-9]{1,4})x([0-9]{1,4})(\+2x)?\..+/, n = e, a = 1, o = n.match(t);
        return o && 4 <= o.length && ("+2x" == o[4] && (a = 2), n = n.replace(t, ".") + o[1] + "?imageView2/2/w/" + parseInt(o[2], 10) * a + "/h/" + parseInt(o[3], 10) * a + "/q/75/format/" + ("webp" === o[1] ? "jpg" : o[1])), 
        n;
    }
    e.exports = function(e, n) {
        if (!e) return "https://b.yzcdn.cn/v2/image/wap/no_pic.png";
        if (e.match(/^data:/i)) return e;
        var a = [ /^(https?:)?\/\/imgqn.koudaitong.com/, /^(https?:)?\/\/kdt-img.koudaitong.com/, /^(https?:)?\/\/img.yzcdn.cn/, /^(https?:)?\/\/dn-kdt-img.qbox.me/ ];
        n = (n = n || "") || "";
        for (var o = "https://img.yzcdn.cn", r = 0; r < a.length; r++) e = e.replace(a[r], o);
        if (e.match(/^(https?:)?\/\//i)) {
            if (!e.match(o)) return e;
            n && e.match("!") && (e = e.split("!")[0]), e += n;
        } else e = o + "/" + e + n;
        return t(e);
    };
}, function(e, t, n) {
    t.__esModule = !0;
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(2));
    t.default = a.default || function(e) {
        for (var t, n = 1; n < arguments.length; n++) for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
        return e;
    };
}, function(e, t, n) {
    t.Actionsheet = n(251), t.Dialog = n(252), t.Field = n(253), t.NoticeBar = n(254), 
    t.Select = n(154), t.Stepper = n(255), t.Switch = n(256), t.Tab = n(257), t.Toast = n(24), 
    t.TopTips = n(258), t.CheckLabel = n(154);
    var a = n(53).extend;
    t.extend = a;
}, function(e) {
    var t = e.exports = {
        version: "2.4.0"
    };
    "number" == typeof __e && (__e = t);
}, function(e, t, n) {
    e.exports = {
        default: n(210),
        __esModule: !0
    };
}, function(e) {
    var t = function(e, t) {
        return hasOwnProperty.call(e, t);
    }, n = function(e) {
        if (e !== Object(e)) throw new TypeError("Invalid object");
        var n = [];
        for (var a in e) t(e, a) && n.push(a);
        return n;
    };
    e.exports = function(e, t, a) {
        if (null != e) if (e.length === +e.length) for (var o = 0, r = e.length; o < r; o++) t.call(a, e[o], o, e); else for (var i = n(e), o = 0, r = i.length; o < r; o++) t.call(a, e[i[o]], i[o], e);
    };
}, function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(4));
    e.exports = function(e) {
        var t = getApp();
        try {
            e = (0, a.default)(e), t.carmen({
                api: "weapp.spotlight.weapp.log/1.0.0/get",
                method: "GET",
                data: {
                    content: "有赞精选 weapp " + e
                },
                success: function(e) {
                    console.log("log success:", e);
                },
                fail: function(e) {
                    console.log("log fail", e);
                }
            });
        } catch (e) {
            console.error("log error", e);
        }
    };
}, function(e, t, n) {
    var a = n(88)("wks"), o = n(58), r = n(16).Symbol, i = "function" == typeof r;
    (e.exports = function(e) {
        return a[e] || (a[e] = i && r[e] || (i ? r : o)("Symbol." + e));
    }).store = a;
}, function(e, t, n) {
    e.exports = {
        default: n(206),
        __esModule: !0
    };
}, function(e, t, n) {
    function a(e) {
        this.money = e;
    }
    var o = Math.round, r = n(3);
    a.prototype = r(a.prototype, {
        toCent: function() {
            return parseInt(o(100 * this.money), 10) || 0;
        },
        toYuan: function() {
            return this.adjustFixed(parseFloat(this.money / 100) || 0, 2);
        },
        adjustFixed: function(e, t) {
            var n = Math.pow;
            return (o(e * n(10, t)) / n(10, t)).toFixed(t);
        }
    }), e.exports = function(e) {
        return new a(e);
    };
}, function(e) {
    var t = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = t);
}, function(e, t, n) {
    var a = n(0), o = function(e) {
        return e;
    }, r = {
        encodeGoodsParams: function(e) {
            var t = a.getGlobalData();
            return [ e.alias || "", t.dc_ps || "", t.channel || "" ].join(":");
        },
        decodeGoodsParams: function(e) {
            var t = e.split(":"), n = {};
            return t[0] && (n.alias = t[0]), t[1] && (n.dc_ps = t[1], a.setGlobalData({
                dc_ps: n.dc_ps
            })), t[2] && (n.channel = t[2], a.setGlobalData({
                channel: n.channel
            })), n;
        },
        encodeHomeParams: function(e) {
            var t = a.getGlobalData();
            return [ e.kdtId || "", t.dc_ps || "", t.channel || "", t.topic || "" ].join(":");
        },
        decodeHomeParams: function(e) {
            var t = e.split(":"), n = {};
            return t[0] && (n.kdtId = t[0]), t[1] && (n.dc_ps = t[1], a.setGlobalData({
                dc_ps: n.dc_ps
            })), t[2] && (n.channel = t[2], a.setGlobalData({
                channel: n.channel
            })), t[3] && (n.topic = t[3], a.setGlobalData({
                topic: n.topic
            })), n;
        },
        encodeVenuesParams: function(e) {
            var t = a.getGlobalData();
            return [ e.id || "", e.subId || "", e.type || "", t.dc_ps || "", t.channel || "" ].join(":");
        },
        decodeVenuesParams: function(e) {
            var t = e.split(":"), n = {};
            return t[0] && (n.id = t[0]), t[1] && (n.subId = t[1]), t[2] && (n.type = t[2]), 
            t[3] && (n.dc_ps = t[3], a.setGlobalData({
                dc_ps: n.dc_ps
            })), t[4] && (n.channel = t[3], a.setGlobalData({
                channel: n.channel
            })), n;
        },
        encodeGroupOnParams: function(e) {
            var t = a.getGlobalData();
            return [ e.groupAlias || "", e.kdtId || "", t.dc_ps || "", t.channel || "", t.topic || "" ].join(":");
        },
        decodeGroupOnParams: function(e) {
            var t = e.split(":"), n = {};
            return t[0] && (n.groupAlias = t[0]), t[1] && (n.kdtId = t[1]), t[2] && (n.dc_ps = t[2], 
            a.setGlobalData({
                dc_ps: n.dc_ps
            })), t[3] && (n.channel = t[3], a.setGlobalData({
                channel: n.channel
            })), t[4] && (n.topic = t[4], a.setGlobalData({
                topic: n.topic
            })), n;
        },
        encodeSharecutParams: function(e) {
            a.getGlobalData();
            return [ e.alias || "", e.fromAlias || "", e.discountId || "", e.is_share || "" ].join(":");
        },
        decodeSharecutParams: function(e) {
            var t = e.split(":"), n = {};
            return t[0] && (n.alias = t[0]), t[1] && (n.fromAlias = t[1]), t[2] && (n.discountId = t[2]), 
            t[3] && (n.is_share = t[3], a.setGlobalData({
                is_share: n.is_share
            })), n;
        },
        encodeActivity: function(e) {
            return [ e.collection_id ].join(":");
        },
        decodeActivity: function(e) {
            var t = e.split(":"), n = {};
            return t[0] && (n.collection_id = t[0]), n;
        }
    }, i = {
        goods: "encodeGoodsParams",
        home: "encodeHomeParams",
        groupOn: "encodeGroupOnParams",
        venues: "encodeVenuesParams",
        sharecut: "encodeSharecutParams",
        activity: "encodeActivity"
    }, s = {
        goods: "decodeGoodsParams",
        home: "decodeHomeParams",
        groupOn: "decodeGroupOnParams",
        venues: "decodeVenuesParams",
        sharecut: "decodeSharecutParams",
        activity: "decodeActivity"
    };
    e.exports = {
        encode: function(e, t) {
            return (r[i[e]] || o)(t);
        },
        decode: function(e, t) {
            return t && 0 != t.length ? (a.setGlobalData({
                is_share: 1
            }), t = decodeURIComponent(t), (r[s[e]] || o)(t)) : {};
        }
    };
}, , , function(e) {
    e.exports = {
        data: {
            goTopThreshold: 0,
            goTopVisiable: !1
        },
        component: {
            setThreshold: function() {
                var e = this;
                wx.getSystemInfo({
                    success: function(t) {
                        e.setData({
                            goTopThreshold: t.windowHeight
                        });
                    }
                });
            },
            handleGoTop: function() {
                wx.pageScrollTo({
                    scrollTop: 0
                }), this.setData({
                    goTopVisiable: !1
                });
            },
            onPageScroll: function(e) {
                e.scrollTop >= 2 * this.data.goTopThreshold ? !this.data.goTopVisiable && this.setData({
                    goTopVisiable: !0
                }) : this.data.goTopVisiable && this.setData({
                    goTopVisiable: !1
                });
            }
        }
    };
}, , function(e, t, n) {
    var a = n(37);
    e.exports = function(e) {
        if (!a(e)) throw TypeError(e + " is not an object!");
        return e;
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function o(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 100;
        return console.error("分享页面share: " + e), new p.default(function(n, a) {
            g.carmen({
                api: "weapp.spotlight.weappcode/1.0.0/get",
                data: {
                    page: e,
                    width: t
                },
                success: function(t) {
                    console.log(0, e + " 的小程序码", t), n(t);
                },
                fail: function(e) {
                    wx.hideLoading(), a(e);
                }
            });
        });
    }
    function r(e, t, n, a, o, r) {
        var i = 285 * a / 631;
        return r ? s(o).then(function(o) {
            return e.drawImage(o, t, n, a, a), s(r + "?imageView2/1/w/160|roundPic/radius/!80p");
        }).then(function(o) {
            e.drawImage(o, (a - i) / 2 + t, (a - i) / 2 + n, i, i);
        }) : s(o).then(function(o) {
            e.drawImage(o, t, n, a, a);
        });
    }
    function i(e) {
        return new p.default(function(t) {
            wx.previewImage({
                current: "",
                urls: [ e ]
            }), t(e);
        });
    }
    function s(e) {
        return new p.default(function(t, n) {
            wx.downloadFile({
                url: e,
                success: function(e) {
                    t(e.tempFilePath);
                },
                fail: function() {
                    n();
                }
            });
        });
    }
    function c(e) {
        return new p.default(function(t, n) {
            g.carmen({
                api: "weapp.spotlight.ad.unit.ad/1.0.0/list",
                data: e,
                success: function(e) {
                    t(e[0].hd_img);
                },
                fail: function(e) {
                    wx.hideLoading(), n(e);
                }
            });
        });
    }
    var u = Math.PI, l = a(n(4)), d = a(n(2)), f = a(n(7)), p = a(n(10)), h = n(243), g = getApp(), m = n(0), v = n(17), y = n(65), _ = n(41), w = {
        getUnit: function(e) {
            return "all" === e ? "share_recommend" : "40" === e ? "share_goods_cut" : "12" === e ? "share_cheap_hot" : "13" === e ? "share_timelimited_discount" : "14" === e ? "share_hot_rank" : "share_" + this.data.allTabData[e].name;
        },
        getSharePicData: function(e) {
            return {
                unit: this.getUnit(e),
                category: 1
            };
        },
        onHideShareDialog: function() {
            this.setData({
                showShareDialog: !1
            });
        },
        onShowShareDialog: function() {
            this.setData({
                showShareDialog: !0
            });
        },
        shareToFriend: function() {
            this.setData({
                showShareDialog: !1
            }), this.onShareAppMessage();
        },
        shareCard: function(e) {
            var t = e.target.dataset.posterId || this.data.venuesTab && this.data.venuesTab.selectedId || "";
            return this.setData({
                showShareDialog: !1
            }), y.checkPaintCompatibility() ? (this.setData({
                venuesShareDisplay: "block",
                normalShareDisplay: "block"
            }), wx.showLoading({
                title: "生成图片..."
            }), void ("all" === t ? this.drawTypeAPoster({
                text: [ "最怕被分享的抢购清单", "发现朋友圈的好货", "省钱就是赚钱！", "我的朋友圈囤货清单" ][~~(4 * Math.random())],
                canvasId: "venues-share-poster"
            }) : "10" === t ? this.drawTypeAPoster({
                text: "有赞精选，好货0元限购",
                canvasId: "venues-share-poster"
            }) : "40" === t ? this.drawTypeCPoster().catch(function(e) {
                console.error(e), wx.showToast({
                    title: "网络错误，请重试",
                    icon: "loading",
                    duration: 500
                });
            }) : this.drawTypeBPoster().catch(function(e) {
                console.error(e), wx.showToast({
                    title: "网络错误，请重试",
                    icon: "loading",
                    duration: 500
                });
            }))) : void wx.showModal({
                title: "生成卡片失败",
                content: "您当前微信版本过低，无法生成卡片。请将微信升级至6.5.23版本以上",
                showCancel: !1
            });
        },
        canvasToPoster: function(e) {
            var t = this, n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1e3;
            return new p.default(function(t, a) {
                setTimeout(function() {
                    wx.canvasToTempFilePath({
                        canvasId: e,
                        success: function(e) {
                            t(e.tempFilePath);
                        },
                        fail: function(e) {
                            a(e.errMsg);
                        }
                    });
                }, n);
            }).then(function(e) {
                return console.log("导出图片完成"), wx.hideLoading(), t.setData({
                    venuesShareDisplay: "none",
                    normalShareDisplay: "none"
                }), i(e);
            });
        },
        getSharePicUrl: function() {
            var e = this, t = m.getGlobalData().channel;
            return new p.default(function(n) {
                var a = e.data.imgCache;
                a[t] ? n(a[t]) : c(e.getSharePicData(t)).then(function(o) {
                    var r;
                    e.setData({
                        imgCache: (0, f.default)({}, a, (r = {}, r[t] = o, r))
                    }), n(o);
                });
            });
        },
        drawTypeAPoster: function(e) {
            var t = this, n = e.text, a = e.canvasId, o = Date.now(), i = wx.createCanvasContext(a);
            return i.fillRect(0, 0, 750, 980), this.getSharePicUrl().then(function(e) {
                return s(e);
            }).then(function(e) {
                return console.error("背景图", Date.now() - o), i.drawImage(e, 0, 0, 750, 980), r(i, 541, 776, 160, "https://img.yzcdn.cn/mars/image/venue/home.jpg", t.data.userLogo);
            }).then(function() {
                return console.error("二维码", Date.now() - o), i.setFillStyle("#333333"), i.setFontSize(28), 
                i.fillText(g.globalData.userInfo && g.globalData.userInfo.nickName || "我", 70, 810), 
                i.setFontSize(40), i.fillText("“" + n + "”", 70, 869), i.setFillStyle("#FF4444"), 
                i.setFontSize(24), i.fillText("长按识别有赞精选小程序", 70, 916), i.draw(), console.log("画完了", Date.now() - o), 
                t.canvasToPoster(a, 0);
            }).catch(function(e) {
                console.warn("绘制失败", e), wx.showToast({
                    title: "网络错误，请重试",
                    icon: "loading",
                    duration: 500
                });
            }).then(function() {
                console.error("预览", Date.now() - o);
            });
        },
        drawTypeBPoster: function() {
            var e = this, t = "normal-canvas", n = wx.createCanvasContext(t), a = "", r = "", i = "", c = this.data.userLogo, f = g.globalData.userInfo && g.globalData.userInfo.nickName || "我";
            c ? c += "?imageView2/1/w/160|roundPic/radius/!80p" : c = "https://img.yzcdn.cn/public_files/2017/11/09/99e6bdb52bb2ef654383dde3b0324fbe.png?roundPic/radius/!50p", 
            this.data.venuesTab && !this.data.venuesTab.isNew ? (a = this.data.venuesTab.selectedId, 
            r = this.data.subTab.selectedId, i = 10 == a || 11 == a || 25 == a || 9 == a ? "/pages/venues/index2/index?" : "/pages/venue/home/index?", 
            i += v.encode("venues", (0, d.default)({}, {
                id: a
            }, r ? {
                subId: r
            } : {})), console.error("log: 分会场 share", i)) : this.data.venuesTab && this.data.venuesTab.isNew ? (a = this.data.pageId, 
            i = "/pages/venue/activity/index?" + v.encode("activity", (0, d.default)({}, {
                collection_id: this.data.pageId
            }))) : 14 === this.data.page.id ? (a = 14, i = "/pages/venue/hotsale/index") : (a = 13, 
            i = "/pages/venues/discount/index");
            var m = this.data.allTabData && "{}" !== (0, l.default)(this.data.allTabData) && this.data.allTabData[a].type || 2, y = h[a];
            return console.log("分享路径: ", i), new p.default(function(a, r) {
                var l = Date.now();
                e.getSharePicUrl().then(function(e) {
                    return s(e);
                }).then(function(a) {
                    n.draw(), n.drawImage(a, 0, 0, 750, 980), console.log("背景: ", Date.now() - l), l = Date.now(), 
                    o(i).then(function(a) {
                        n.setTextAlign("left"), n.setTextBaseline("top"), n.setFillStyle("#ffffff"), 2 == m ? (n.setFontSize(40), 
                        n.fillText(y.text, 80, 82), n.setFontSize(52), n.fillText(f, 80, 140)) : (n.setFontSize(52), 
                        n.fillText(f, 80, 82), n.setFontSize(40), n.fillText(y.text, 80, 140)), console.log("fetch: ", Date.now() - l), 
                        l = Date.now(), s(c).then(function(o) {
                            n.arc(590, 150, 84, 0, 2 * u), n.setFillStyle("#ffffff"), n.fill(), n.save(), n.beginPath(), 
                            n.arc(590, 150, 80, 0, 2 * u), n.clip && n.clip(), n.drawImage(o, 510, 70, 160, 160), 
                            n.restore(), n.setFillStyle("#666666"), n.setFontSize(24), n.fillText("长按识别有赞小程序", 100, 806), 
                            n.setFillStyle("#ff4444"), n.setFontSize(28), n.fillText("扫码购买成功，精选商品0元购", 100, 856), 
                            console.log("logo: ", Date.now() - l), l = Date.now(), s(a).then(function(a) {
                                return n.drawImage(a, 540, 782, 150, 150), n.draw(), console.log("share: ", Date.now() - l), 
                                e.canvasToPoster(t, 0);
                            }).catch(function(e) {
                                r(e);
                            });
                        }).catch(function(e) {
                            r(e);
                        });
                    }).catch(function(e) {
                        r(e);
                    });
                }).catch(function(e) {
                    r(e);
                });
            });
        },
        drawTypeCPoster: function() {
            var e = this, t = "normal-canvas", n = wx.createCanvasContext(t), a = g.globalData.userInfo, r = "/pages/venues/sharecut/index?" + v.encode("venues", {}), i = a && a.avatarUrl, c = a && a.nickName || "我";
            return 6 <= c.length && (c = c.slice(0, 6) + "..."), i ? i += "?imageView2/1/w/160|roundPic/radius/!80p" : i = "https://img.yzcdn.cn/public_files/2017/11/09/99e6bdb52bb2ef654383dde3b0324fbe.png?roundPic/radius/!50p", 
            console.log("分享路径: ", r), new p.default(function(a, l) {
                var d = Date.now();
                e.getSharePicUrl().then(function(e) {
                    return s(e);
                }).then(function(a) {
                    n.draw(), n.drawImage(a, 0, 0, 750, 980), console.log("背景: ", Date.now() - d), d = Date.now(), 
                    o(r).then(function(a) {
                        n.setTextAlign("left"), n.setTextBaseline("top"), n.setFillStyle("#A34228"), n.setFontSize(56), 
                        n.fillText(c, 80, 82), n.setFontSize(40), n.fillText("TA正在砍价，给TA一刀", 80, 160), console.log("fetch: ", Date.now() - d), 
                        d = Date.now(), s(i).then(function(o) {
                            n.arc(590, 150, 84, 0, 2 * u), n.setFillStyle("#ffffff"), n.fill(), n.save(), n.beginPath(), 
                            n.arc(590, 150, 80, 0, 2 * u), n.clip && n.clip(), n.drawImage(o, 510, 70, 160, 160), 
                            n.restore(), n.setFillStyle("#333333"), n.setFontSize(36), n.fillText("商品0元购，扫码查看哦", 100, 806), 
                            n.setFillStyle("#ff4444"), n.setFontSize(24), n.fillText("长按识别精选小程序", 100, 866), 
                            console.log("logo: ", Date.now() - d), d = Date.now(), s(a).then(function(a) {
                                return n.drawImage(a, 540, 782, 150, 150), n.draw(), console.log("share: ", Date.now() - d), 
                                e.canvasToPoster(t, 0);
                            }).catch(function(e) {
                                l(e);
                            });
                        }).catch(function(e) {
                            l(e);
                        });
                    }).catch(function(e) {
                        l(e);
                    });
                }).catch(function(e) {
                    l(e);
                });
            });
        }
    };
    (0, d.default)(w, _), e.exports = {
        data: {
            showShareDialog: !1,
            imgCache: {}
        },
        component: w
    };
}, function(e) {
    e.exports = {
        showZanToast: function(e, t) {
            var n = this, a = this.data.zanToast || {};
            clearTimeout(a.timer), a = {
                show: !0,
                title: e
            }, this.setData({
                zanToast: a
            });
            var o = setTimeout(function() {
                n.clearZanToast();
            }, t || 3e3);
            this.setData({
                "zanToast.timer": o
            });
        },
        clearZanToast: function() {
            var e = this.data.zanToast || {};
            clearTimeout(e.timer), this.setData({
                "zanToast.show": !1
            });
        }
    };
}, function(e, t, n) {
    var a = n(16), o = n(9), r = n(36), i = n(32), s = "prototype", c = function e(t, n, c) {
        var u, l, d, f = t & e.F, p = t & e.G, h = t & e.S, g = t & e.P, m = t & e.B, v = t & e.W, y = p ? o : o[n] || (o[n] = {}), _ = y[s], w = p ? a : h ? a[n] : (a[n] || {})[s];
        for (u in p && (c = n), c) (l = !f && w && void 0 !== w[u]) && u in y || (d = l ? w[u] : c[u], 
        y[u] = p && "function" != typeof w[u] ? c[u] : m && l ? r(d, a) : v && w[u] == d ? function(e) {
            var t = function(t, n, a) {
                if (this instanceof e) {
                    switch (arguments.length) {
                      case 0:
                        return new e();

                      case 1:
                        return new e(t);

                      case 2:
                        return new e(t, n);
                    }
                    return new e(t, n, a);
                }
                return e.apply(this, arguments);
            };
            return t[s] = e[s], t;
        }(d) : g && "function" == typeof d ? r(Function.call, d) : d, g && ((y.virtual || (y.virtual = {}))[u] = d, 
        t & e.R && _ && !_[u] && i(_, u, d)));
    };
    c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c;
}, function(e, t, n) {
    var a = n(22), o = n(136), r = n(83), i = Object.defineProperty;
    t.f = n(33) ? Object.defineProperty : function(e, t, n) {
        if (a(e), t = r(t, !0), a(n), o) try {
            return i(e, t, n);
        } catch (t) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value), e;
    };
}, function(t, n, a) {
    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    n.__esModule = !0;
    var r = o(a(189)), i = o(a(143)), s = "function" == typeof i.default && "symbol" == e(r.default) ? function(t) {
        return void 0 === t ? "undefined" : e(t);
    } : function(t) {
        return t && "function" == typeof i.default && t.constructor === i.default && t !== i.default.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
    };
    n.default = "function" == typeof i.default && "symbol" === s(r.default) ? function(e) {
        return void 0 === e ? "undefined" : s(e);
    } : function(e) {
        return e && "function" == typeof i.default && e.constructor === i.default && e !== i.default.prototype ? "symbol" : void 0 === e ? "undefined" : s(e);
    };
}, , , , , function(e, t, n) {
    var a = n(26), o = n(49);
    e.exports = n(33) ? function(e, t, n) {
        return a.f(e, t, o(1, n));
    } : function(e, t, n) {
        return e[t] = n, e;
    };
}, function(e, t, n) {
    e.exports = !n(38)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7;
            }
        }).a;
    });
}, function(e) {
    var t = {}.hasOwnProperty;
    e.exports = function(e, n) {
        return t.call(e, n);
    };
}, function(e, t, n) {
    var a = n(138), o = n(84);
    e.exports = function(e) {
        return a(o(e));
    };
}, function(e, t, n) {
    var a = n(81);
    e.exports = function(e, t, n) {
        return a(e), void 0 === t ? e : 1 === n ? function(n) {
            return e.call(t, n);
        } : 2 === n ? function(n, a) {
            return e.call(t, n, a);
        } : 3 === n ? function(n, a, o) {
            return e.call(t, n, a, o);
        } : function() {
            return e.apply(t, arguments);
        };
    };
}, function(t) {
    t.exports = function(t) {
        return "object" == (void 0 === t ? "undefined" : e(t)) ? null !== t : "function" == typeof t;
    };
}, function(e) {
    e.exports = function(e) {
        try {
            return !!e();
        } catch (e) {
            return !0;
        }
    };
}, function(e, t, n) {
    var a = n(137), o = n(89);
    e.exports = Object.keys || function(e) {
        return a(e, o);
    };
}, function(e) {
    function t(e) {
        return 9 < e ? "" + e : "0" + e;
    }
    var n = Math.floor;
    e.exports = {
        format: function(e) {
            var a = n((e = 0 < e ? e : 0) / 1e3), o = a, r = n(o / 86400), i = n((o = a - 86400 * r) / 3600), s = n((o -= 3600 * i) / 60), c = o -= 60 * s;
            return {
                data: {
                    day: r,
                    hour: i,
                    minute: s,
                    second: c
                },
                strData: {
                    day: t(r),
                    hour: t(i),
                    minute: t(s),
                    second: t(c)
                }
            };
        },
        formatMonthWithZero: function(e) {
            return e = 10 > e + 1 ? "0" + (e + 1) : e + 1;
        },
        formatDayWithZero: function(e) {
            return e = 10 > e ? "0" + e : e;
        }
    };
}, function(e) {
    var t = getApp();
    e.exports = {
        onFormIdSubmit: function(e, n, a) {
            var o = e.currentTarget.dataset, r = o.pageUrl, i = o.position;
            t.carmen({
                method: "POST",
                api: "weapp.spotlight.msg.formids/1.0.0/add",
                data: {
                    form_id: e.detail.formId + "",
                    uid: t.getUserId(),
                    page_url: r,
                    business_module: i
                },
                success: function() {
                    return n && n();
                },
                fail: function() {
                    return a && a();
                }
            });
        }
    };
}, function(e) {
    e.exports = {
        all: {
            title: "推荐你看看，精选好货首单限时让利！",
            url: ""
        },
        1: {
            title: "美食，是最好的治愈／产地直邮，100%新鲜美味！",
            url: ""
        },
        2: {
            title: "全球美妆100%正品带回家。／只有小仙女能点开。",
            url: ""
        },
        3: {
            title: "过日子嘛，会省就是赚，我在这儿买！",
            url: ""
        },
        4: {
            title: "恰当的饰物画龙点睛、烘云托月",
            url: ""
        },
        5: {
            title: "亲测100%保真，娃儿用的重要是安全",
            url: ""
        },
        6: {
            title: "新品迭出，奇思妙想，特有个性",
            url: ""
        },
        9: {
            title: "新用户首单1元专享，十万好货让利给你！",
            url: "https://img.yzcdn.cn/public_files/2017/11/03/f3acb1eb1d6046a16a8f2bd56671a54b.png"
        },
        10: {
            title: "限时24小时，这里的商品0元抱回家！",
            url: "https://img.yzcdn.cn/public_files/2017/11/03/5d2fcfc203061348b0b3ca7e43de307d.png"
        },
        11: {
            title: "约你一起来拼团，100%中奖！",
            url: "https://img.yzcdn.cn/public_files/2017/11/03/ff6589fb505e0fa7f6cc5e0f5ecc7aab.png"
        },
        12: {
            title: "约你一起来拼，人越多越便宜！",
            url: "https://img.yzcdn.cn/public_files/2017/11/03/99ce7a8ee456b71031ec1458992a7e80.png"
        },
        13: {
            title: "买这些东西，你妈不会说你乱花钱",
            url: "https://img.yzcdn.cn/public_files/2017/11/03/2ff27c672a4f45ac796b1d05a9aa06fc.png"
        },
        25: {
            title: "",
            url: ""
        },
        14: {
            title: "热销商品，等你来买",
            url: ""
        }
    };
}, function(e, t, n) {
    function a(e) {
        return new o.default(function(t, n) {
            wx.downloadFile({
                url: e,
                success: function(e) {
                    t(e.tempFilePath);
                },
                fail: function(e) {
                    n(e);
                }
            });
        });
    }
    var o = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(10)), r = getApp(), i = n(99);
    e.exports = function() {
        return new o.default(function(e, t) {
            var n = wx.getStorageSync("qiniuAvatarUrl");
            if (n) e(n); else var o = 0, s = setInterval(function() {
                o++, r.globalData.userInfo && r.globalData.userInfo.avatarUrl ? (clearInterval(s), 
                a(r.globalData.userInfo.avatarUrl).then(function(n) {
                    i({
                        kdt_id: 19346375,
                        file: n,
                        success: function(t) {
                            var n = t.attachment_url.replace("http:", "https:");
                            wx.setStorageSync("qiniuAvatarUrl", n), console.log(0, "用户转存的头像", n), e(n);
                        },
                        fail: function() {
                            t();
                        }
                    });
                }).catch(function(e) {
                    console.error(e.errMsg);
                })) : 100 < o && clearInterval(s);
            }, 100);
        });
    };
}, function(e) {
    e.exports = function(e) {
        wx.getSystemInfo({
            success: function(t) {
                console.log("res window height: " + t.windowHeight + " system: " + t.system), e.setData({
                    windowHeight: t.windowHeight,
                    windowWidth: t.windowWidth,
                    system: t.system
                });
            }
        });
    };
}, function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(2)), o = n(271), r = n(97), i = (n(24), getApp()), s = {
        zanAccount: {
            shouldShowLogin: !1,
            phoneNumber: "",
            showPhoneRedNotice: !1,
            showCodeRedNotice: !1,
            captcha: {
                code: "",
                times: 1,
                countdown: 60,
                text: "获取验证码",
                textStyle: "acc-code__btn--enabled",
                btnStyle: "acc-code--enabled",
                timer: null
            },
            couponTitle: ""
        }
    };
    e.exports = (0, a.default)({}, {
        bindZanAccount: function() {
            this.setData({
                zanAccount: s.zanAccount
            }), i.getBuyerId() ? this.onZanAccountBinded() : this.onShowLoginView();
        },
        onZanAccountBinded: function() {},
        onShowLoginView: function() {
            this._clearCaptchaTimer(), this.setData({
                "zanAccount.shouldShowLogin": !0,
                "zanAccount.message": "",
                "zanAccount.captcha.countdown": 60,
                "zanAccount.captcha.times": 1,
                "zanAccount.captcha.btnStyle": "acc-code--enabled",
                "zanAccount.captcha.textStyle": "acc-code__btn--enabled",
                "zanAccount.captcha.text": "获取验证码"
            });
        },
        onHideLoginView: function() {
            this._clearCaptchaTimer(), this.setData({
                "zanAccount.shouldShowLogin": !1
            });
        },
        onZanAccountLogin: function() {
            var e = this;
            setTimeout(function() {
                var t = e.data.zanAccount.phoneNumber, n = e.data.zanAccount.captcha.code;
                if (!t || 11 != t.length) return e.showZanToast("请输入正确的手机号"), void e._updateRedNotice(!0, !1);
                if (e._updateRedNotice(!1, !1), !n || 6 != n.length) return e.showZanToast("请输入正确验证码"), 
                void e._updateRedNotice(!1, !0);
                e._updateRedNotice(!1, !1);
                var a = e;
                wx.request({
                    url: r({
                        origin: "uic",
                        pathname: "/sso/wx/codeLogin"
                    }),
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        mobile: t,
                        userId: i.globalData.userId,
                        countryCode: "+86",
                        verifyCode: n
                    },
                    success: function(t) {
                        0 == +t.data.code ? (a.onHideLoginView(), t.data.data && t.data.data.buyer_id && i.login(function() {
                            a.onZanAccountBinded(), e._updateRedNotice(!1, !1);
                        })) : (e.showZanToast(t.data.msg), e._updateRedNotice(!0, !0));
                    }
                });
            }, 100);
        },
        onSendCaptchaCode: function() {
            var e = this;
            60 != this.data.zanAccount.captcha.countdown || setTimeout(function() {
                if (!e.data.zanAccount.phoneNumber || 11 != e.data.zanAccount.phoneNumber.length) return e.showZanToast("请输入正确的手机号"), 
                void e._updateRedNotice(!0, !1);
                e._updateRedNotice(!1, !1);
                var t = e.data.zanAccount.captcha.times;
                e._requestCaptchaCode(t, "uic_login_without_password", function() {
                    e.setData({
                        "zanAccount.captcha.times": t
                    });
                });
            }, 100);
        },
        onInputPhoneNumber: function(e) {
            this.setData({
                "zanAccount.phoneNumber": e.detail.value
            });
        },
        onInputCaptchaCode: function(e) {
            this.setData({
                "zanAccount.captcha.code": e.detail.value
            });
        },
        ignoreAction: function() {}
    }, {
        _getSmsToken: function(e, t) {
            var n = new Date(), a = n.getMonth();
            a = 9 < a + 1 ? (a + 1).toString() : "0" + (a + 1);
            var r = n.getDate(), i = 9 < r ? r.toString() : "0" + r, s = n.getHours();
            s = 9 < s ? s.toString() : "0" + s;
            var c = n.getMinutes();
            c = 9 < c ? c.toString() : "0" + c;
            var u = "" + n.getFullYear() + a + i + s + c;
            return o([ "youzan_app_iphone6", u, e, t ].join(""));
        },
        _clearCaptchaTimer: function() {
            var e = this.data.zanAccount.captcha.timer;
            null != e && (clearTimeout(e), this.setData({
                "zanAccount.captcha.timer": null
            }));
        },
        _requestCaptchaCode: function(e, t, n) {
            var a = this, o = this, r = this.data.zanAccount.phoneNumber;
            i.carmen({
                api: "kdt.auth.sms/1.0.0/send",
                method: "POST",
                data: {
                    sms_token: o._getSmsToken(r, t),
                    send_times: e,
                    mobile: r,
                    countryCode: "",
                    biz: t
                },
                success: function(e) {
                    e.is_success && (a._updateRedNotice(!1, !1), n && n(), o.setData({
                        "zanAccount.captcha.btnStyle": "acc-code--disabled",
                        "zanAccount.captcha.textStyle": "acc-code__btn--disabled"
                    }), o._countDownForCaptchaCode());
                },
                fail: function(e) {
                    a._updateRedNotice(!0, !1), a.showZanToast(e.msg);
                }
            });
        },
        _countDownForCaptchaCode: function() {
            var e = this, t = this.data.zanAccount.captcha.countdown;
            0 !== t ? (t--, this.setData({
                "zanAccount.captcha.countdown": t,
                "zanAccount.captcha.text": "已发送(" + t + "s)"
            }), this.data.zanAccount.captcha.timer = setTimeout(function() {
                e._countDownForCaptchaCode();
            }, 1e3)) : this.setData({
                "zanAccount.captcha.countdown": 60,
                "zanAccount.captcha.text": "获取验证码",
                "zanAccount.captcha.btnStyle": "acc-code--enabled",
                "zanAccount.captcha.textStyle": "acc-code__btn--enabled"
            });
        },
        _updateRedNotice: function(e, t) {
            this.setData({
                "zanAccount.showPhoneRedNotice": e,
                "zanAccount.showCodeRedNotice": t
            });
        },
        _upadateTitle: function(e) {
            s.zanAccount.couponTitle = e;
        }
    });
}, , , , function(e) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        };
    };
}, function(e) {
    var t = {}.toString;
    e.exports = function(e) {
        return t.call(e).slice(8, -1);
    };
}, function(e, t, n) {
    var a = n(84);
    e.exports = function(e) {
        return Object(a(e));
    };
}, function(e) {
    e.exports = {};
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var o = a(n(2)), r = a(n(14)), i = [ "onLoad", "onReady", "onShow", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onShareAppMessage", "onPageScroll" ], s = function(e) {
        return "__$" + e;
    };
    e.exports = {
        extractComponentId: function() {
            return ((0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).currentTarget || {}).dataset.componentId;
        },
        extend: o.default,
        extendCreator: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = e.life, n = void 0 === t ? i : t, a = e.exclude, o = void 0 === a ? [] : a, c = o.concat(i.map(s));
            if (!Array.isArray(n) || !Array.isArray(o)) throw new Error("Invalid Extend Config");
            var u = n.filter(function(e) {
                return 0 <= i.indexOf(e);
            });
            return function(e) {
                for (var t = arguments.length, n = Array(1 < t ? t - 1 : 0), a = 1; a < t; a++) n[a - 1] = arguments[a];
                return n.forEach(function(t) {
                    t && (0, r.default)(t).forEach(function(n) {
                        var a = t[n];
                        if (!(0 <= c.indexOf(n))) if (0 <= u.indexOf(n) && "function" == typeof a) {
                            var o = s(n);
                            if (e[o] || (e[o] = [], e[n] && e[o].push(e[n]), e[n] = function() {
                                for (var t = this, n = arguments.length, a = Array(n), r = 0; r < n; r++) a[r] = arguments[r];
                                e[o].forEach(function(e) {
                                    return e.apply(t, a);
                                });
                            }), t[o]) {
                                var r;
                                (r = e[o]).push.apply(r, t[o]);
                            } else e[o].push(a);
                        } else e[n] = a;
                    });
                }), e;
            };
        }
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var o = a(n(10)), r = a(n(153)), i = function() {
        function e(t) {
            (0, r.default)(this, e), this.page = t, this.callbacks = {}, this.imgInfo = {}, 
            this.promises = {}, this.page.data.imgLoadList = [], this.page._imgOnLoad = this._imgOnLoad.bind(this), 
            this.page._imgOnLoadError = this._imgOnLoadError.bind(this);
        }
        return e.prototype.load = function(e) {
            var t = this;
            if (e) {
                var n = this.page.data.imgLoadList, a = this.imgInfo[e], r = this.promises[e];
                if (a) return a;
                if (r) return r;
                var i = new o.default(function(a, o) {
                    -1 == n.indexOf(e) && (n.push(e), t.page.setData({
                        imgLoadList: n
                    }), t.callbacks[e] = {}, t.callbacks[e].success = a, t.callbacks[e].error = o);
                });
                return this.promises[e] = i, i;
            }
        }, e.prototype._imgOnLoad = function(e) {
            var t = e.currentTarget.dataset.src, n = e.detail.width, a = e.detail.height;
            this.imgInfo[t] = {
                src: t,
                width: n,
                height: a
            }, this._removeFromLoadList(t), this.callbacks[t].success({
                src: t,
                width: n,
                height: a
            });
        }, e.prototype._imgOnLoadError = function(e) {
            var t = e.currentTarget.dataset.src;
            this._removeFromLoadList(t), this.callbacks[t].error(t);
        }, e.prototype._removeFromLoadList = function(e) {
            var t = this.page.data.imgLoadList;
            t.splice(t.indexOf(e), 1), this.page.setData({
                imgLoadList: t
            });
        }, e;
    }();
    e.exports = i;
}, , function(e) {
    e.exports = {
        makeRandomString: function(e) {
            var t = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            e = e || 10;
            for (var a = 0; a < e; a++) t += n.charAt(Math.floor(Math.random() * n.length));
            return t;
        }
    };
}, , function(e) {
    var t = 0, n = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++t + n).toString(36));
    };
}, function(e, t) {
    t.f = {}.propertyIsEnumerable;
}, function(e, t, n) {
    var a = n(191)(!0);
    n(139)(String, "String", function(e) {
        this._t = e + "", this._i = 0;
    }, function() {
        var e, t = this._t, n = this._i;
        return n >= t.length ? {
            value: void 0,
            done: !0
        } : (e = a(t, n), this._i += e.length, {
            value: e,
            done: !1
        });
    });
}, function(e) {
    e.exports = !0;
}, function(e, t, n) {
    var a = n(26).f, o = n(34), r = n(13)("toStringTag");
    e.exports = function(e, t, n) {
        e && !o(e = n ? e : e.prototype, r) && a(e, r, {
            configurable: !0,
            value: t
        });
    };
}, function(e, t) {
    function n(e) {
        var t = /\.([^.!]+)!([0-9]{1,4})x([0-9]{1,4})q?([0-9]{0,2}|100)?(\+2x)?\..+/, n = e, a = 1, o = n.match(t);
        return o && 4 <= o.length && ("+2x" === o[5] && (a = 2), n = n.replace(t, ".") + o[1] + "?imageView2/2/w/" + parseInt(o[2], 10) * a + "/h/" + parseInt(o[3], 10) * a + "/q/" + (o[4] || 75) + "/format/jpg"), 
        n;
    }
    t.__esModule = !0, t.default = function(e, t) {
        if (e) {
            if (e.match(/^data:/i)) return e;
            var a = /^https?:\/\/img\.yzcdn\.cn/g;
            if (e.match(/^(https?:)?\/\//i)) {
                if (!e.match(a) && !e.match("dn-kdt-img-test.qbox.me")) return e;
                e.match("!") || (e = "" + e + t);
            } else e = a + "/" + e + t;
            return n(e);
        }
    };
}, function(e, t, n) {
    function a(e, t) {
        this.tid = null, this.leftTime = 0;
        var n = new Date().getTime();
        t = t || {}, this.leftTime = e, this.options = t, this._walkTime(n, this.leftTime);
    }
    var o = n(40);
    a.prototype = {
        stop: function() {
            clearTimeout(this.tid), this.tid = null, this.stopped = !0;
        },
        start: function() {
            if (!this.tid) {
                this.stopped = !1;
                var e = new Date().getTime();
                this._walkTime(e, this.leftTime);
            }
        },
        setTime: function(e) {
            this.stop(), this.leftTime = e, this.start();
        },
        _walkTime: function(e, t) {
            var n = this;
            return 0 >= t ? void (this.options.onEnd && this.options.onEnd()) : void (this.stopped || (this.tid = setTimeout(function() {
                var a = new Date().getTime(), r = t - (a - e), i = o.format(r);
                n.options.onChange && n.options.onChange(i.data, i.strData), n.leftTime = r, n._walkTime(a, n.leftTime);
            }, 500)));
        }
    }, e.exports = a;
}, function(e) {
    var t = Math.floor;
    e.exports.random32str = function() {
        for (var e = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", n = e.length, a = "", o = 0; o < 32; o++) a += e.charAt(t(Math.random() * n));
        return a;
    }, e.exports.showLoading = function() {
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 5e3
        });
    }, e.exports.showToast = function(e) {
        wx.showToast({
            title: e,
            icon: "success",
            duration: 1e3
        }), setTimeout(function() {
            wx.hideToast();
        }, 1e3);
    }, e.exports.formatPrice = function(e) {
        return "string" == typeof e ? (+e).toFixed(2) : e.toFixed(2);
    }, e.exports.getFormattedDate = function(e) {
        var n = e, a = "", o = t(n / 86400);
        console.log("days " + o), 0 < o && (a = o + " 天 ", n -= 86400 * o);
        var r = t(n / 3600) % 24;
        console.log("hours " + r), 0 < r && (a = a + r + " 小时 ", n -= 3600 * r);
        var i = t(n / 60) % 60;
        return console.log("minutes " + i), 0 < i && (a = a + i + " 分 ", n -= 60 * i), a = a + n % 60 + " 秒";
    }, e.exports.checkPaintCompatibility = function() {
        var e = "", t = "";
        try {
            var n = wx.getSystemInfoSync();
            e = n.system || "", t = n.version || "";
        } catch (t) {
            return console.log("获取系统信息Error：" + t.message), !0;
        }
        return !(0 <= e.toLowerCase().indexOf("ios") && "6.5.22" === t);
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var o = a(n(4)), r = a(n(14)), i = a(n(10)), s = a(n(7)), c = getApp(), u = n(12), l = n(67);
    e.exports = {
        data: {},
        component: (0, s.default)({
            initActivity: function() {
                var e = this, t = null, n = this.data.actionSubTab, a = this.data.venuesTab.selectedId, o = this.data.pages;
                o[a] ? t = o[a].data : (o[a] = {
                    data: {
                        page: 1,
                        pageSize: 10,
                        nodata: !1,
                        nomore: !1,
                        isRequest: !1
                    },
                    content: []
                }, t = o[a].data), t.page = 1, t.goods = [], t.nodata = !1, t.nomore = !1, t.loading = !1, 
                t.isRequest = !1, n || (t.banner = []), o[a].data = t, this.setData({
                    pages: o
                });
                return (n ? this.fetchActivityGoodsData() : i.default.all([ this.fetchActivityBannerData(), this.fetchActivityGoodsData() ])).then(function() {
                    e.setData({
                        actionSubTab: !1
                    });
                });
            },
            fetchActivityBannerData: function() {
                var e = this, t = this, n = this.data.venuesTab, a = n.selectedId, s = n.selectedName, l = this.data.pages, d = l[a].data, f = "?imageView2/2/w/720/h/0/q/90/format/jpg/interlace/1";
                return this.requestActivityBannerTask && this.requestActivityBannerTask.abort(), 
                new i.default(function(n, i) {
                    t.requestActivityBannerTask = c.carmen({
                        api: "weapp.spotlight.ad.unit.ad/1.0.0/list",
                        data: {
                            unit: s,
                            category: 1
                        },
                        success: function(o) {
                            if (0 !== o.length) {
                                var i = !0;
                                o.forEach(function(e) {
                                    0 !== (0, r.default)(e).length && (i = !1);
                                }), i && t.showZanToast("当前网络不稳定，请刷新重试");
                            }
                            d.banner = o.map(function(e) {
                                return {
                                    src: "" + e.hd_img + f,
                                    link: e.url
                                };
                            }), l[a].data = d, t.setData({
                                pages: l
                            }), n(), o.map(function(t, n) {
                                var o = e.imgLoader.load("" + t.hd_img + f);
                                "function" == typeof o.then ? o.then(function(t) {
                                    d.banner[n].src = t.src, l[a].data = d, e.setData({
                                        pages: l
                                    });
                                }) : (d.banner[n].src = o.src, l[a].data = d, e.setData({
                                    pages: l
                                }));
                            });
                        },
                        fail: function(e) {
                            "wx:request" === e.type && -1 < e.msg.indexOf("abort") ? n() : (i(e), u("api log: weapp.spotlight.ad.unit.ad/1.0.0/list (activity banner) " + (0, 
                            o.default)(e)));
                        }
                    });
                });
            },
            fetchActivityGoodsData: function() {
                var e = this, t = this.data.venuesTab, n = t.selectedId, a = t.selectedType, r = this.data.pages, s = r[n].data, l = s.page, d = s.pageSize, f = s.nodata, p = s.nomore, h = s.goods, g = void 0 === h ? [] : h;
                return s.isRequest = !0, r[n].data = s, this.setData({
                    pages: r
                }), this.requestActivityGoodsTask && this.requestActivityGoodsTask.abort(), new i.default(function(t, i) {
                    e.requestActivityGoodsTask = c.carmen({
                        api: "weapp.spotlight.goods/1.0.0/list",
                        data: {
                            collectionId: n,
                            type: a,
                            categoryId: 0,
                            page: l,
                            size: d
                        },
                        success: function(a) {
                            var o = a.paginator.total_count, i = a.items || [];
                            if (o) 1 === l && 0 === i.length ? f = !0 : p = !0; else if (0 === i.length) return s.isRequest = !1, 
                            s.page = l + 1, r[n].data = s, e.setData({
                                pages: r
                            }), void e.fetchActivityGoodsData();
                            s.goods = g.concat(i), s.nodata = f, s.nomore = p, s.isRequest = !1, s.page = l + 1, 
                            r[n].data = s, e.setData({
                                pages: r
                            }), t();
                        },
                        fail: function(e) {
                            "wx:request" === e.type && -1 < e.msg.indexOf("abort") ? t() : (i(e), u("api log: weapp.spotlight.goods/1.0.0/list (activity goods) " + (0, 
                            o.default)(e)));
                        }
                    });
                });
            },
            handleActivityScrollToLower: function() {
                var e = this, t = this.data.venuesTab, n = t.selectedId, a = (t.selectedType, this.data.pages[n].data), o = a.nomore, r = a.nodata, s = a.isRequest;
                return r || o || s ? i.default.resolve() : this.fetchActivityGoodsData().then(function() {
                    return i.default.resolve();
                }).catch(function() {
                    return e.setData({
                        isRequest: !1
                    }), i.default.reject();
                });
            }
        }, l)
    };
}, function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(7)), o = n(41);
    e.exports = (0, a.default)({}, o);
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var o = a(n(2)), r = a(n(14)), i = a(n(7)), s = a(n(10)), c = n(65), u = getApp(), l = n(43);
    e.exports = (0, o.default)({}, {
        onHideShareDialog: function() {
            this.setData({
                showShareDialog: !1
            });
        },
        imageUrlChange: function(e) {
            return new s.default(function(t, n) {
                u.carmen({
                    api: "weapp.spotlight.img/1.0.0/change",
                    data: (0, i.default)({}, e),
                    success: function(e) {
                        t(e);
                    },
                    fail: function(e) {
                        n(e);
                    }
                });
            });
        },
        onShowShareDialog: function(e) {
            var t = this;
            u.globalData.userInfo && u.globalData.userInfo.avatarUrl ? this.imageUrlChange({
                uri: u.globalData.userInfo.avatarUrl
            }).then(function(n) {
                u.globalData.userInfo.avatarUrl = n, l().then(function(n) {
                    t.setData({
                        type: e,
                        qiniuAvatarUrl: n + "?roundPic/radius/!50p"
                    });
                }, function(n) {
                    console.error(n.errMsg), t.setData({
                        type: e,
                        qiniuAvatarUrl: "https://img.yzcdn.cn/public_files/2017/11/09/99e6bdb52bb2ef654383dde3b0324fbe.png?roundPic/radius/!50p"
                    });
                });
            }) : this.setData({
                type: e,
                qiniuAvatarUrl: "https://img.yzcdn.cn/public_files/2017/11/09/99e6bdb52bb2ef654383dde3b0324fbe.png?roundPic/radius/!50p"
            }), this.setData({
                showShareDialog: !0,
                type: e
            });
        },
        shareToFriend: function() {
            this.setData({
                showShareDialog: !1
            }), this.onShareAppMessage();
        },
        shareCard: function() {
            if (this.setData({
                showShareDialog: !1
            }), c.checkPaintCompatibility()) {
                var e = this.data.type;
                "goods" === e || "sharecut-goods" === e ? this.drawGoodsShareImg() : "order" === e ? this.drawOrderShareImg() : "shop" === e && this.drawShopShareImg();
            } else wx.showModal({
                title: "生成卡片失败",
                content: "您当前微信版本过低，无法生成卡片。请将微信升级至6.5.23版本以上",
                showCancel: !1
            });
        },
        drawOrderShareImg: function() {
            var e = this;
            wx.showLoading({
                title: "生成图片..."
            }), this.data.orderImgCache ? this.drawPoster(this.data.orderImgCache) : u.carmen({
                api: "weapp.spotlight.ad.unit.ad/1.0.0/list",
                data: {
                    unit: "share_order",
                    category: 1
                },
                success: function(t) {
                    e.setData({
                        orderImgCache: t[0].hd_img
                    }), e.drawPoster(t[0].hd_img);
                },
                fail: function() {
                    wx.hideLoading();
                }
            });
        },
        drawPoster: function(e) {
            var t = this, n = wx.createCanvasContext("goodsContainer"), a = null == u.globalData.userInfo ? "我" : u.globalData.userInfo.nickName, o = this.data.qiniuAvatarUrl, r = this.data.miniCode, i = 750;
            wx.downloadFile({
                url: e,
                success: function(e) {
                    console.log("download envelop success");
                    var s = e.tempFilePath;
                    n.draw(), n.drawImage(s, 0, 0, i, 980), n.setFillStyle("white"), n.setFontSize(56), 
                    n.fillText(a, (i - 56 * a.length) / 2, 136), n.setFontSize(44), n.fillText("给你送了一份礼 扫码免费领取", 80, 210), 
                    wx.downloadFile({
                        url: r,
                        success: function(e) {
                            console.log("download minicode success");
                            var a = e.tempFilePath;
                            n.drawImage(a, 244, 396, 262, 262), wx.downloadFile({
                                url: o,
                                success: function(e) {
                                    console.log("download avtar success");
                                    var a = e.tempFilePath;
                                    n.drawImage(a, 313, 465, 124, 124), n.setFillStyle("#7F7F7F"), n.setFontSize(24), 
                                    n.fillText("长按识别有赞精选小程序", 243, 692), n.draw(), wx.canvasToTempFilePath({
                                        canvasId: "goodsContainer",
                                        success: function(e) {
                                            t.previewMiniCode(e.tempFilePath);
                                        },
                                        fail: function(e) {
                                            t.showZanToast(e.errMsg);
                                        }
                                    });
                                },
                                fail: function() {
                                    console.log("download avtar fail"), wx.showToast({
                                        title: "网络错误，请重试",
                                        icon: "loading",
                                        duration: 500
                                    });
                                }
                            });
                        },
                        fail: function() {
                            console.log("download envelop fail"), wx.showToast({
                                title: "网络错误，请重试",
                                icon: "loading",
                                duration: 500
                            });
                        }
                    });
                }
            });
        },
        drawShopShareImg: function() {
            var e = this;
            wx.showLoading({
                title: "生成图片..."
            });
            var t = 750, n = e.data.miniCode, a = wx.createCanvasContext("goodsContainer"), o = null == u.globalData.userInfo ? "我" : u.globalData.userInfo.nickName, r = (e.data.qiniuAvatarUrl, 
            e.data.shopName), i = e.data.icon.replace("http:", "https:") + "?roundPic/radius/!50p";
            wx.downloadFile({
                url: "https://img.yzcdn.cn/public_files/2017/11/01/1d7f504ba459ce54af3ddae80f598f09.png",
                success: function(s) {
                    var c = s.tempFilePath;
                    a.draw(), a.drawImage(c, 0, 0, t, 980), wx.downloadFile({
                        url: n,
                        success: function(n) {
                            var s = n.tempFilePath;
                            a.drawImage(s, 220, 348, 310, 310), wx.downloadFile({
                                url: i,
                                success: function(n) {
                                    var i = n.tempFilePath;
                                    a.drawImage(i, 299, 428, 152, 152), a.setFillStyle("#999999"), a.setFontSize(28), 
                                    a.fillText(o, (t - 28 * o.length) / 2, 118), a.setLineWidth(1), a.setStrokeStyle("#E5E5E5"), 
                                    a.beginPath(), a.moveTo(104, 148), a.lineTo(367, 148), a.lineTo(375, 132), a.lineTo(383, 148), 
                                    a.lineTo(640, 148), a.stroke(), a.closePath(), a.setFillStyle("#333333"), a.setFontSize(28), 
                                    a.fillText("我发现了一家好店，邀你一起看看", 165, 206), a.setFillStyle("#333333"), a.setFontSize(36), 
                                    a.fillText("“" + r + "”", (t - 36 * (r.length + 2)) / 2, 274), a.setFillStyle("#FF4444"), 
                                    a.setFontSize(36), a.fillText("扫码购买成功，精选商品0元购", 123, 756), a.setFillStyle("#666666"), 
                                    a.setFontSize(24), a.fillText("长按识别有赞精选小程序", 243, 825), a.draw(), wx.canvasToTempFilePath({
                                        canvasId: "goodsContainer",
                                        success: function(t) {
                                            e.previewMiniCode(t.tempFilePath);
                                        },
                                        fail: function(t) {
                                            e.showZanToast(t.errMsg);
                                        }
                                    });
                                },
                                fail: function() {
                                    console.log("download shop logo fail"), wx.showToast({
                                        title: "网络错误，请重试",
                                        icon: "loading",
                                        duration: 500
                                    });
                                }
                            });
                        },
                        fail: function() {
                            console.log("download minicode fail"), wx.showToast({
                                title: "网络错误，请重试",
                                icon: "loading",
                                duration: 500
                            });
                        }
                    });
                },
                fail: function() {
                    console.log("download envelop fail"), wx.showToast({
                        title: "网络错误，请重试",
                        icon: "loading",
                        duration: 500
                    });
                }
            });
        },
        drawGoodsShareImg: function() {
            var e = this;
            wx.showLoading({
                title: "生成图片..."
            });
            var t = 750, n = wx.createCanvasContext("goodsContainer"), a = null == u.globalData.userInfo ? "我" : u.globalData.userInfo.nickName;
            7 < a.length && (a = a.slice(0, 7) + "...");
            var o = e.data.qiniuAvatarUrl, i = e.data.goods, s = i.title, c = 18 < s.length ? s.substring(0, 18) : s, l = 18 < s.length ? 36 < s.length ? s.substring(18, 34) + "..." : s.substring(18, s.length) : "", d = "sharecut-goods" === this.data.type, f = "为你推荐好物", p = !(!e.data.goodsPreference || "one_cent_lottery" != e.data.goodsPreference.view), h = !(!e.data.goodsPreference || "groupOn" != e.data.goodsPreference.type || p), g = 0, m = i.price.origin.desc, v = i.price.desc.split("-"), y = i.price.isRange ? i.price.min.desc : v[0], _ = e.data.miniCode, w = "https://img.yzcdn.cn/public_files/2017/11/07/04879e3246576e1986d8bb06f9371dbb.png";
            e.data.groupAlias ? p ? (f = "邀你1分钱抽大奖", "扫码拼团成功，精选商品0元购", w = "https://img.yzcdn.cn/public_files/2017/11/07/7c5e3015d7f21ffe1b4b511b8f27df29.png") : h && (f = "邀你一起来拼团", 
            "扫码拼团成功，精选商品0元购", g = e.data.joinNumber) : p ? (f = "发现了一个抽奖活动", "扫码拼团成功，精选商品0元购", 
            w = "https://img.yzcdn.cn/public_files/2017/11/07/7c5e3015d7f21ffe1b4b511b8f27df29.png") : h ? (f = "推荐你看", 
            "扫码拼团成功，精选商品0元购", g = e.data.goodsPreference.activity_extra.join_num) : d ? f = "请你帮忙砍价到0元" : !(p || h) && (f = "为你推荐好物");
            var x, b = {
                bg: 980,
                goodsImg: 618,
                firstLineTitle: 800,
                sendLineTitle: 828,
                symbol: 911,
                price: 911,
                originPrice: 900,
                lineMoveTo: 890,
                lineTo: 890,
                fansImg: 712,
                miniCode: 750,
                nickName: 748,
                description: 748
            };
            d ? (x = {}, (0, r.default)(b).forEach(function(e) {
                x[e] = "bg" === e ? 750 : "goodsImg" === e ? 412 : b[e] - 206;
            })) : x = b, wx.downloadFile({
                url: w,
                success: function(r) {
                    var s = r.tempFilePath;
                    n.draw(), n.drawImage(s, 0, 0, t, x.bg), wx.downloadFile({
                        url: i.picture[0],
                        success: function(t) {
                            var r = t.tempFilePath;
                            if (n.drawImage(r, 66, 50, 618, x.goodsImg), n.setFillStyle("#999999"), n.setFontSize(26), 
                            n.setFillStyle("#333333"), n.setFontSize(24), n.fillText(c, 66, x.firstLineTitle), 
                            l && n.fillText(l, 66, x.sendLineTitle), d ? (n.setFontSize(24), n.setFillStyle("#9B9B9B"), 
                            n.fillText("最低", 66, x.originPrice), n.setFillStyle("#FF4444"), n.fillText("¥", 126, x.originPrice), 
                            n.setFontSize(48), n.fillText("0", 146, x.originPrice)) : (n.setFillStyle("#FF4444"), 
                            n.setFontSize(34), n.fillText("￥", 66, x.symbol), n.setFontSize(56), n.fillText(y, 100, x.price)), 
                            m) {
                                for (var i = m.split("."), s = 0, u = d ? 180 : 100 + 32 * y.length + 20, v = 0; v < i.length; v++) s += 18 * i[v].length;
                                s += 5 * i.length + 18, n.setFillStyle("#9B9B9B"), n.setFontSize(28), n.fillText("￥" + m, u + 10, x.originPrice), 
                                n.setStrokeStyle("#999999"), n.beginPath(), n.moveTo(u + 10, x.lineMoveTo), n.lineTo(u + s + 10, x.lineTo), 
                                n.stroke(), n.closePath();
                            }
                            wx.downloadFile({
                                url: o,
                                success: function(t) {
                                    var o = t.tempFilePath;
                                    n.drawImage(o, 66, x.fansImg, 40, 40), wx.downloadFile({
                                        url: _,
                                        success: function(t) {
                                            var o = t.tempFilePath;
                                            n.drawImage(o, 504, x.miniCode, 180, 180);
                                            var r = 7 < (a = 7 < a.length ? a.substring(0, 8) + "..." : a).length ? 8.5 : a.length;
                                            n.fillText(a, 126, x.nickName), n.fillText(f, 126 + 26 * r + 20, x.description), 
                                            p ? (n.setFillStyle("#FF4D4D"), n.setFontSize(36), n.fillRect(66, 50, 174, 64), 
                                            n.setFillStyle("white"), n.fillText("1分抽奖", 92, 94)) : h ? (n.setFillStyle("#FF4D4D"), 
                                            n.setFontSize(36), n.fillRect(66, 50, 174, 64), n.setFillStyle("white"), e.data.groupAlias ? n.fillText(g + "人拼", 106, 94) : n.fillText(g + "人团", 106, 94)) : d && (n.setFillStyle("#FF4D4D"), 
                                            n.setFontSize(36), n.fillRect(66, 50, 220, 64), n.setFillStyle("white"), n.fillText("分享0元得", 91, 94)), 
                                            n.draw(), wx.canvasToTempFilePath({
                                                canvasId: "goodsContainer",
                                                success: function(t) {
                                                    e.previewMiniCode(t.tempFilePath);
                                                },
                                                fail: function(t) {
                                                    e.showZanToast(t.errMsg);
                                                }
                                            });
                                        },
                                        fail: function() {
                                            wx.showToast({
                                                title: "网络错误，请重试",
                                                icon: "loading",
                                                duration: 500
                                            });
                                        }
                                    });
                                }
                            });
                        },
                        fail: function() {
                            wx.showToast({
                                title: "网络错误，请重试",
                                icon: "loading",
                                duration: 500
                            });
                        }
                    });
                },
                fail: function() {
                    wx.showToast({
                        title: "网络错误，请重试",
                        icon: "loading",
                        duration: 500
                    });
                }
            });
        },
        previewMiniCode: function(e) {
            var t = this;
            wx.hideLoading(), wx.previewImage({
                current: "",
                urls: [ e ]
            }), wx.saveImageToPhotosAlbum({
                filePath: e,
                success: function() {
                    t.showZanToast("已保存到系统相册 ");
                },
                fail: function(e) {
                    console.log(e), t.showZanToast("保存失败");
                }
            });
        }
    });
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var o = a(n(4)), r = a(n(2)), i = n(8), s = n(3), c = n(11), u = (n(281), n(282)), l = n(283), d = l.parse, f = l.getDialogGoodsImage, p = l.recordSelectedSku, h = l.getOrderData, g = l.getSelectedSKUKey, m = l.getOrderDataforCart, v = n(0), y = getApp();
    e.exports = s({}, i.Stepper, i.TopTips, i.Toast, u, {
        isFetching: !1,
        showComponentSKU: function(e) {
            var t = this, n = e.alias || "", a = e.btns || [], o = e.needFetch || !1;
            if (this.setData({
                componentSKU: {
                    btns: a,
                    isSetShoppingCart: !0
                },
                createGroupon: e.createGroupon,
                activityAlias: e.activityAlias
            }), o) this._fetchComponentSKUGoodsData(n, function() {
                t._showComponentSKUDialog();
            }); else {
                var r = e.goods;
                this._parseComponentSKUOriginData({
                    alias: n,
                    originData: r.originData,
                    brief: r.brief,
                    sku: r.sku,
                    activity: r.activity,
                    use_ump: r.use_ump,
                    isGoodsDetail: e.isGoodsDetail || 0
                }), this._showComponentSKUDialog();
            }
            e.selectedSKU && !e.needClean && this.setData({
                "componentSKU.selectedSKU": e.selectedSKU
            });
        },
        handleZanStepperChange: function(e) {
            this.setData({
                "componentSKU.stepperData.stepper": e.stepper
            });
        },
        _handleComponentSKUDialogImageTap: function() {
            var e = this.data.componentSKU || {};
            wx.previewImage({
                urls: [ f(e.skuImages, e.goods.goods, e.selectedSKU, !0) ]
            });
        },
        _hideComponentSKUDialog: function() {
            this.setData({
                "componentSKU.show": !1
            });
        },
        _handleComponentSKUValueTap: function(e) {
            var t = e.currentTarget.dataset;
            if (!t.disabled) {
                var n = this.data.componentSKU || {}, a = p(t, n);
                this.setData({
                    componentSKU: (0, r.default)({}, n, a, {
                        dialogGoodsImage: f(n.skuImages, n.goods.goods, n.selectedSKU)
                    })
                }), y.trigger("component:sku:change", {
                    selectedSKU: this.data.componentSKU.selectedSKU
                });
            }
        },
        _catchComponentSKUTouch: function() {},
        _handleComponentSKUAddCart: function() {
            var e = this;
            if (!this.isFetching && !this._validateComponentSKUData()) {
                var t = m(this.data.componentSKU), n = this, a = [];
                c(t.message, function(e) {
                    a.push(e);
                }), this.isFetching = !0, y.carmen({
                    api: "weapp.spotlight.cart/1.0.0/add",
                    method: "POST",
                    data: {
                        message: (0, o.default)(a),
                        activity_alias: t.activity_alias,
                        activity_id: t.activity_id,
                        activity_type: t.activity_type,
                        num: t.num,
                        price: t.price,
                        sku_id: t.skuId,
                        goods_id: t.goods_id,
                        kdt_id: t.kdt_id,
                        dc_ps: v.getGlobalData().dc_ps || ""
                    },
                    success: function() {
                        v.track({
                            act_name: "add_cart"
                        }), y.logger.log({
                            et: "click",
                            ei: "add_cart",
                            en: "添加购物车",
                            si: t.kdt_id
                        }), e._hideComponentSKUDialog(), y.trigger("component:sku:cart", {
                            type: "add"
                        });
                    },
                    fail: function(t) {
                        e.showZanToast(t.msg);
                    },
                    complete: function() {
                        n.isFetching = !1;
                    }
                });
            }
        },
        _handleComponentSKUBuy: function() {
            if (!this._validateComponentSKUData()) {
                var e = h(this.data.componentSKU), t = y.db.set({
                    type: "goods",
                    goods_list: [ e ],
                    createGroupon: this.data.createGroupon,
                    activityAlias: this.data.activityAlias,
                    kdtId: this.data.componentSKU.kdtId,
                    isSecuredTransactions: this.data.componentSKU.isSecuredTransactions
                });
                v.track({
                    act_name: "buy"
                }), y.logger.log({
                    et: "click",
                    ei: "buy",
                    en: "购买",
                    si: this.data.componentSKU.kdtId
                }), wx.redirectTo({
                    url: "/pages/trade/buy/index?dbid=" + t
                });
            }
        },
        _showComponentSKUDialog: function() {
            this._resolveComponentSKUBtns(), this._resolveComponentQuota(), this.setData({
                "componentSKU.show": !0
            });
        },
        _resolveComponentSKUBtns: function() {
            var e = this.data.componentSKU.goods.supportShoppingCart, t = this.data.componentSKU.btns || [], n = t.indexOf("cart");
            -1 < n && !e && t.splice(n, 1), this.setData({
                "componentSKU.btns": t
            });
        },
        _resolveComponentQuota: function() {
            var e = this.data.componentSKU.goods.goods || {};
            0 < e.quota && e.quota === e.quotaUsed && (this.showZanToast("该商品每人限购" + e.quota + "件，您之前已经购买过" + e.quota + "件！"), 
            this.setData({
                "componentSKU.buyButtonDisabled": !0
            }));
        },
        _fetchComponentSKUGoodsData: function(e, t) {
            var n = this;
            this.componentSKUfetching || (this.componentSKUfetching = !0, wx.showToast({
                title: "加载中",
                mask: !0,
                icon: "loading"
            }), y.carmen({
                api: "weapp.wsc.item.detail/1.0.0/get",
                query: {
                    alias: e,
                    fans_type: y.getFansType()
                },
                success: function(a) {
                    var o = {
                        item_id: a.id,
                        kdt_id: a.kdt_id,
                        alias: a.alias,
                        title: a.title,
                        price: a.price,
                        origin: a.origin,
                        wait_to_sold: a.wait_to_sold,
                        is_display: a.is_display,
                        is_virtual: a.is_virtual,
                        picture: a.pictures,
                        sold_status: a.sold_status,
                        quota: a.quota,
                        quota_used: a.quota_used
                    };
                    n._parseComponentSKUOriginData({
                        alias: e,
                        originData: a.data,
                        brief: o,
                        sku: a.skus,
                        activity: a.activity,
                        isPresale: o.presale || 0
                    }), t();
                },
                fail: function(e) {
                    n.showZanToast(e.msg || "获取商品信息失败");
                },
                complete: function() {
                    wx.hideToast(), n.componentSKUfetching = !1;
                }
            }));
        },
        _parseComponentSKUOriginData: function(e) {
            this.setData({
                componentSKU: (0, r.default)({
                    show: !0,
                    btns: 1 == e.isPresale ? [ "buy" ] : this.data.componentSKU.btns,
                    alias: e.alias,
                    kdtId: e.originData.kdt_id,
                    isSecuredTransactions: e.originData.is_secured_transactions,
                    isGoodsDetail: e.isGoodsDetail
                }, d({
                    originData: e.originData,
                    brief: e.brief,
                    sku: e.sku,
                    activity: e.activity,
                    use_ump: e.use_ump
                }))
            });
        },
        _validateComponentSKUData: function() {
            if (this.data.componentSKU.stepperData && 0 == this.data.componentSKU.stepperData.quantity) return this.showZanTopTips("已经卖完啦~"), 
            !0;
            var e = this.data.componentSKU, t = e.goods, n = t.sku, a = [];
            if (!n.none_sku && !n.mapList[g(e.selectedSKU)]) {
                for (var o = 1; o <= n.tree.length; o++) e.selectedSKU["s" + o] || a.push(n.tree[o - 1].k);
                return this.showZanTopTips("请选择: " + a.join(" ")), !0;
            }
            var r = t.messages;
            if (r.length) for (var i, s = 0; s < r.length; s++) if (+(i = r[s]).required && !i.value) return this.showZanTopTips("请填写: " + i.name), 
            !0;
        },
        _handleQuotaTaped: function() {
            this.data.componentSKU.stepperData.stepper == this.data.componentSKU.stepperData.maxQuantity && this.showZanToast("就这么几件啦~");
        }
    });
}, function(e, t, n) {
    function a() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        if (!(0 >= e.length)) {
            var n = e.shift();
            o({
                kdt_id: t.kdt_id,
                file: n.src,
                success: function(o) {
                    t.afterUploadSuccess && t.afterUploadSuccess(o.attachment_full_url, n), a(e, t);
                },
                fail: function() {
                    t.afterUploadFail && t.afterUploadFail(n), a(e, t);
                }
            });
        }
    }
    var o = n(99);
    e.exports = function(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        a(e.slice(0), t);
    };
}, , , , , , , , , , , function(e) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e;
    };
}, function(e, t, n) {
    var a = n(37), o = n(16).document, r = a(o) && a(o.createElement);
    e.exports = function(e) {
        return r ? o.createElement(e) : {};
    };
}, function(e, t, n) {
    var a = n(37);
    e.exports = function(e, t) {
        if (!a(e)) return e;
        var n, o;
        if (t && "function" == typeof (n = e.toString) && !a(o = n.call(e))) return o;
        if ("function" == typeof (n = e.valueOf) && !a(o = n.call(e))) return o;
        if (!t && "function" == typeof (n = e.toString) && !a(o = n.call(e))) return o;
        throw TypeError("Can't convert object to primitive value");
    };
}, function(e) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e;
    };
}, function(e, t, n) {
    var a = n(86), o = Math.min;
    e.exports = function(e) {
        return 0 < e ? o(a(e), 9007199254740991) : 0;
    };
}, function(e) {
    var t = Math.ceil, n = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (0 < e ? n : t)(e);
    };
}, function(e, t, n) {
    var a = n(88)("keys"), o = n(58);
    e.exports = function(e) {
        return a[e] || (a[e] = o(e));
    };
}, function(e, t, n) {
    var a = n(16), o = "__core-js_shared__", r = a[o] || (a[o] = {});
    e.exports = function(e) {
        return r[e] || (r[e] = {});
    };
}, function(e) {
    e.exports = [ "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf" ];
}, function(e, t) {
    t.f = Object.getOwnPropertySymbols;
}, function(e, t, n) {
    var a = n(22), o = n(193), r = n(89), i = n(87)("IE_PROTO"), s = function() {}, c = "prototype", u = function() {
        var e, t = n(82)("iframe"), a = r.length;
        for (t.style.display = "none", n(141).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), 
        e.write("<script>document.F=Object<\/script>"), e.close(), u = e.F; a--; ) delete u[c][r[a]];
        return u();
    };
    e.exports = Object.create || function(e, t) {
        var n;
        return null === e ? n = u() : (s[c] = a(e), n = new s(), s[c] = null, n[i] = e), 
        void 0 === t ? n : o(n, t);
    };
}, function(e, t, n) {
    n(194);
    for (var a = n(16), o = n(32), r = n(52), i = n(13)("toStringTag"), s = [ "NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList" ], c = 0; 5 > c; c++) {
        var u = s[c], l = a[u], d = l && l.prototype;
        d && !d[i] && o(d, i, u), r[u] = r.Array;
    }
}, function(e, t, n) {
    t.f = n(13);
}, function(e, t, n) {
    var a = n(16), o = n(9), r = n(61), i = n(93), s = n(26).f;
    e.exports = function(e) {
        var t = o.Symbol || (o.Symbol = r ? {} : a.Symbol || {});
        "_" == e.charAt(0) || e in t || s(t, e, {
            value: i.f(e)
        });
    };
}, function(e, t, n) {
    var a = n(148), o = n(13)("iterator"), r = n(52);
    e.exports = n(9).getIteratorMethod = function(e) {
        if (void 0 != e) return e[o] || e["@@iterator"] || r[a(e)];
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var o = a(n(14)), r = a(n(27)), i = /\s+/, s = function(e, t, n, a) {
        if (!n) return !0;
        if ("object" === (void 0 === n ? "undefined" : (0, r.default)(n))) {
            for (var o in n) e[t].apply(e, [ o, n[o] ].concat(a));
            return !1;
        }
        if (i.test(n)) {
            for (var s = n.split(i), c = 0, u = s.length; c < u; c++) e[t].apply(e, [ s[c] ].concat(a));
            return !1;
        }
        return !0;
    }, c = function(e, t) {
        var n, a = -1, o = e.length, r = t[0], i = t[1], s = t[2];
        switch (t.length) {
          case 0:
            for (;++a < o; ) (n = e[a]).callback.call(n.ctx);
            return;

          case 1:
            for (;++a < o; ) (n = e[a]).callback.call(n.ctx, r);
            return;

          case 2:
            for (;++a < o; ) (n = e[a]).callback.call(n.ctx, r, i);
            return;

          case 3:
            for (;++a < o; ) (n = e[a]).callback.call(n.ctx, r, i, s);
            return;

          default:
            for (;++a < o; ) (n = e[a]).callback.apply(n.ctx, t);
        }
    }, u = function(e) {
        var t, n = !1;
        return function() {
            return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t);
        };
    };
    e.exports = {
        on: function(e, t, n) {
            return s(this, "on", e, [ t, n ]) && t ? (this._events || (this._events = {}), (this._events[e] || (this._events[e] = [])).push({
                callback: t,
                context: n,
                ctx: n || this
            }), this) : this;
        },
        once: function(e, t, n) {
            if (!s(this, "once", e, [ t, n ]) || !t) return this;
            var a = this, o = u(function() {
                a.off(e, o), t.apply(this, arguments);
            });
            return o._callback = t, this.on(e, o, n);
        },
        off: function(e, t, n) {
            var a, r, i, c, u, l, d, f;
            if (!this._events || !s(this, "off", e, [ t, n ])) return this;
            if (!e && !t && !n) return this._events = {}, this;
            for (u = 0, l = (c = e ? [ e ] : (0, o.default)(this._events)).length; u < l; u++) if (e = c[u], 
            i = this._events[e]) {
                if (this._events[e] = a = [], t || n) for (d = 0, f = i.length; d < f; d++) r = i[d], 
                (t && t !== r.callback && t !== r.callback._callback || n && n !== r.context) && a.push(r);
                a.length || delete this._events[e];
            }
            return this;
        },
        trigger: function(e) {
            if (!this._events) return this;
            var t = [].slice.call(arguments, 1);
            if (!s(this, "trigger", e, t)) return this;
            var n = this._events[e], a = this._events.all;
            return n && c(n, t), a && c(a, arguments), this;
        }
    };
}, function(e, t, n) {
    var a = n(3), o = n(11), r = {
        uic: "https://uic.youzan.com",
        carmen: "https://carmen.youzan.com"
    }, i = {
        origin: "carmen",
        pathname: "",
        query: {}
    };
    e.exports = function(e) {
        var t = [];
        return e = a({}, i, e), o(e.query, function(e, n) {
            t.push(n + "=" + encodeURIComponent(e));
        }), r[e.origin] + e.pathname + (0 < t.length ? "?" : "") + t.join("&");
    };
}, function(e, t) {
    t.__esModule = !0, t.default = function(e, t) {
        var n = {};
        for (var a in e) 0 <= t.indexOf(a) || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
        return n;
    };
}, function(e) {
    function t() {}
    function n(e) {
        var n = e.success || t, o = e.fail || t;
        a.carmen({
            api: "youzan.materials.storage.img.public.token/1.0.0/get",
            query: {
                kdt_id: e.kdt_id,
                max_size: 1048576,
                channel: "YZJingXuan"
            },
            success: function(e) {
                n(e.uploadToken);
            },
            fail: function(e) {
                o(e);
            }
        });
    }
    var a = getApp();
    e.exports = function(e) {
        var a = e.file, o = e.success || t, r = e.fail || t;
        n({
            kdt_id: e.kdt_id,
            success: function(e) {
                wx.uploadFile({
                    url: "https://up.yzcdn.cn/",
                    filePath: a,
                    name: "file",
                    formData: {
                        token: e,
                        "x:skip_save": 1
                    },
                    success: function(e) {
                        try {
                            e = JSON.parse(e.data);
                        } catch (e) {
                            r({
                                type: "yz:uploadFile",
                                code: -99999,
                                msg: "JSON解析错误"
                            });
                        }
                        0 == +e.code ? o(e.data) : r({
                            type: "yz:uploadFile",
                            code: e.code,
                            msg: e.msg
                        });
                    },
                    fail: function(e) {
                        r({
                            type: "wx:uploadFile",
                            code: -99999,
                            msg: e.errMsg
                        });
                    }
                });
            },
            fail: function(e) {
                r(e);
            }
        });
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var o = a(n(2)), r = a(n(4)), i = a(n(10)), s = a(n(156)), c = n(265), u = n(266), l = n(12), d = getApp();
    e.exports = {
        data: {
            venuesTab: [],
            subTab: {
                list: [],
                selectedId: "all"
            },
            tabScroll: 0,
            actionSubTab: !1,
            allTabData: {}
        },
        component: (0, o.default)({}, {
            handleZanTabChange: function(e, t) {
                var n, a = e.selectedId, o = e.type, r = e.name, i = e.alias, s = this.filterSelectedTab(a, this.data.venuesTab && this.data.venuesTab.list || []).data, c = s.subTab && 0;
                a == this.data.venuesTab.selectedId || (this.setData((n = {}, n["venuesTab.selectedId"] = a, 
                n["venuesTab.selectedType"] = o, n["venuesTab.selectedName"] = r, n["venuesTab.selectedAlias"] = i, 
                n["subTab.list"] = s.subTab || {}, n["subTab.selectedId"] = c, n.actionSubTab = !1, 
                n)), this.onTapScroll(t), this.onTabChange());
            },
            handleSubTabChange: function(e) {
                var t;
                e == this.data.subTab.selectedId || (this.setData((t = {}, t["subTab.selectedId"] = e, 
                t.actionSubTab = !0, t)), this.onTabChange());
            },
            onTapScroll: function(e) {
                var t = e.currentTarget.offsetLeft - 68;
                0 > t && (t = 0), this.setData({
                    tabScroll: t
                });
            },
            filterSelectedTab: function(e, t) {
                for (var n, a = -1, o = t, r = Array.isArray(o), i = 0, o = r ? o : (0, s.default)(o); ;) {
                    var c;
                    if (r) {
                        if (i >= o.length) break;
                        c = o[i++];
                    } else {
                        if ((i = o.next()).done) break;
                        c = i.value;
                    }
                    var u = c;
                    if (a++, u.id == e) {
                        n = u;
                        break;
                    }
                }
                return {
                    data: n,
                    index: a
                };
            },
            resetTabData: function() {
                this.setData({
                    venuesTab: {},
                    pages: {},
                    subTab: {}
                });
            },
            fetchAllTabData: function(e) {
                return new i.default(function(t, n) {
                    d.carmen({
                        api: e,
                        method: "GET",
                        data: {
                            type: 1
                        },
                        success: function(e) {
                            t(e);
                        },
                        fail: function(e) {
                            n(e), l("api log: weapp.spotlight.collection.list/1.0.0/all " + (0, r.default)(e));
                        }
                    });
                });
            },
            fetchTabData: function(e) {
                return new i.default(function(t, n) {
                    d.carmen({
                        api: e,
                        method: "GET",
                        data: {},
                        success: function(e) {
                            t(e.items);
                        },
                        fail: function(e) {
                            n(e), l("api log: weapp.spotlight.collection/1.0.0/list " + (0, r.default)(e));
                        }
                    });
                });
            },
            initSubTabData: function(e, t, n) {
                var a = this.filterSelectedTab(e, n.list).data, o = a && a.subTab || [], r = {};
                0 < o.length && (r = {
                    selectedId: t || 0,
                    list: o
                }), this.setData({
                    subTab: r
                });
            },
            initTabPosition: function(e) {
                this.setData({
                    tabScroll: 40 * (e - 1)
                });
            },
            initHomePageContent: function(e) {
                var t;
                this.setData((t = {}, t["pages.all.content"] = e, t));
            },
            initTabData: function() {
                var e = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                return t.reset && this.resetTabData(), i.default.all([ this.fetchTabData("weapp.spotlight.collection/1.0.0/list"), this.fetchAllTabData("weapp.spotlight.collection.list/1.0.0/all") ]).then(function(n) {
                    var a = n[0], o = {};
                    console.log(0, "tabData", a), n[1].forEach(function(e) {
                        o[e.id] = e;
                    });
                    var r = {
                        list: [ {
                            id: "all",
                            type: "home",
                            alias: "推荐",
                            name: "recommend"
                        } ],
                        scroll: !0,
                        selectedId: "all",
                        selectedType: "home",
                        selectedAlias: "推荐",
                        selectedName: "recommend"
                    }, i = [];
                    a.forEach(function(e) {
                        var t = {}, n = null, a = e.categories;
                        t.id = e.id, t.name = e.name, t.type = e.type, t.alias = e.alias, t.isHot = e.is_hot, 
                        a && (n = a.map(function(e) {
                            return {
                                id: e.id,
                                title: e.name
                            };
                        })), t.subTab = n, i.push(t);
                    }), r.list = [].concat(r.list, i);
                    var s = t.id, c = t.subId, u = null;
                    if (s) {
                        r.selectedId = s, (u = e.filterSelectedTab(s, r.list).data) ? (r.selectedType = u.type, 
                        r.selectedName = u.name, r.selectedAlias = u.alias) : (r.selectedType = o[s].type, 
                        r.selectedName = o[s].name, r.selectedAlias = o[s].alias);
                        var l = e.filterSelectedTab(s, r.list).index;
                        e.initTabPosition(l), e.initSubTabData(s, c, r);
                    }
                    e.setData({
                        allTabData: o,
                        venuesTab: r
                    }), e.initPageData();
                    var d = a && a[0].content || [];
                    e.setData({
                        homeContent: d
                    }), e.initHomePageContent(d), e.initContent();
                }).catch(function() {
                    e.showZanToast("网络开小差了，请下拉刷新");
                });
            }
        }, c, u)
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function o(e, t) {
        return new c.default(function(n, a) {
            u.carmen({
                api: e,
                method: "GET",
                data: t,
                success: function(e) {
                    n(e);
                },
                fail: function() {
                    a();
                }
            });
        });
    }
    function r(e) {
        var t = !1;
        return e && 0 < e.length ? e.forEach(function(e) {
            0 === (0, i.default)(e).length && (t = !0);
        }) : t = !0, t;
    }
    var i = a(n(14)), s = a(n(156)), c = a(n(10)), u = getApp(), l = n(0);
    e.exports = {
        data: {},
        component: {
            initHome: function() {
                var e, t = this, n = [].concat(this.data.pages.all.content);
                return this.setData((e = {}, e["pages.all"] = {
                    data: {},
                    content: []
                }, e)), new c.default(function(e, a) {
                    setTimeout(function() {
                        var o;
                        t.setData((o = {}, o["pages.all.content"] = n, o));
                        var r = t.data.pages.all.content, i = [], s = [], u = t.getMethodMap();
                        r.forEach(function(e) {
                            var t = u[e];
                            t && i.push(t);
                        }), i.forEach(function(e) {
                            s.push(t[e]());
                        }), c.default.all(s).then(function() {
                            e();
                        }).catch(function() {
                            a();
                        });
                    }, 300);
                });
            },
            getMethodMap: function() {
                return {
                    banner1111: "fetchFestivalBanner",
                    banner: "fetchNormalBanner",
                    douzaiqiang: "fetchDouzaiQiangGoods",
                    "seckill-goods": "fetchSeckillFengQiang",
                    "hot-sale": "fetchTodayHotSalesTabs",
                    "goods-group": "fetchGoodsGroupData",
                    "limit-discount": "fetchGrouponLimit"
                };
            },
            lazyLoadBanner: function(e, t) {
                var n = this;
                return e.map(function(e, a) {
                    var o = e.hd_img, r = n.imgLoader.load(o + "?imageView2/2/w/1500/h/0/q/90/format/gif");
                    return "function" == typeof r.then ? (r.then(function(e) {
                        var o, r = n.data.pages.all.data.banner, i = "pages.all.data.banner";
                        t && (r = n.data.pages.all.data.banner1111, i = "pages.all.data.banner1111");
                        var s = [].concat(r);
                        s[a].hd_img = e.src, n.setData((o = {}, o[i] = s, o));
                    }), e.hd_img = o + "?imageView2/2/w/60/h/0/q/90/format/jpg/interlace/1", e) : (e.hd_img = r.src, 
                    e);
                });
            },
            fetchBannerData: function(e) {
                var t = this;
                return o("weapp.spotlight.ad.unit.ad/1.0.0/list", {
                    unit: "recommend",
                    category: 1
                }).then(function(n) {
                    var a;
                    console.log(0, "banner", n);
                    var o = n || [], i = r(o);
                    o && 0 === o.length && (o = []), o = t.lazyLoadBanner(o, e);
                    var s = "pages.all.data.banner";
                    if (e && (s = "pages.all.data.banner1111"), t.setData((a = {}, a[s] = o, a)), i) return console.error("banner为空"), 
                    c.default.reject();
                });
            },
            fetchNormalBanner: function() {
                return this.fetchBannerData();
            },
            fetchFestivalBanner: function() {
                return this.fetchBannerData(!0);
            },
            fetchSeckillFengQiang: function() {
                var e = this;
                return o("weapp.spotlight.category/1.0.0/list", {
                    collectionId: 7
                }).then(function(t) {
                    var n;
                    console.log(0, "秒杀疯抢信息", t), console.log(0, "秒杀疯抢商品", t[0].goods);
                    t[0] && t[0].id;
                    var a = t[0] && t[0].goods && t[0].goods.slice(0, 5) || [];
                    if (e.setData((n = {}, n["pages.all.data.seckill"] = t, n["pages.all.data.seckillGoods"] = a, 
                    n)), r(a)) return console.error("秒杀疯抢为空"), c.default.reject();
                });
            },
            fetchTodayHotSalesTabs: function() {
                var e = this;
                return this.fetchCollectionTabs({
                    type: 1,
                    sectionName: "今日爆款"
                }).then(function(t) {
                    var n;
                    return console.log(0, "今日爆款信息", t), e.setData((n = {}, n["pages.all.data.hotSale.tabs"] = t.items, 
                    n["pages.all.data.hotSale.selectedId"] = t.items && t.items[0] && t.items[0].id, 
                    n["pages.all.data.hotSale.page"] = 1, n["pages.all.data.hotSale.size"] = 8, n)), 
                    e.fetchTodayHotSales();
                });
            },
            fetchTodayHotSales: function() {
                var e, t = this;
                console.log("ddddddddddddddddddddddddddd");
                var n = this.data.pages.all.data.hotSale, a = n.selectedId, r = n.page, i = n.size;
                return this.setData((e = {}, e["pages.all.data.hotSale.loading"] = !0, e)), o("weapp.spotlight.collection.goods/1.0.0/list", {
                    collectionId: a,
                    page: r,
                    size: i
                }).then(function(e) {
                    var n, a = e.items || [], o = t.data.pages.all.data.hotSaleGoods || [], i = [].concat(o, a), s = !1, c = !1;
                    1 == e.paginator.total_count && (s = !0), 1 === r && 0 === a.length && (c = !0), 
                    t.setData((n = {}, n["pages.all.data.hotSaleGoods"] = i, n["pages.all.data.hotSale.nomore"] = s, 
                    n["pages.all.data.hotSale.nodata"] = c, n["pages.all.data.hotSale.loading"] = !1, 
                    n)), console.log(0, "今日爆款商品", i);
                });
            },
            bindHotSaleTabTap: function(e) {
                var t, n = e.currentTarget.dataset.id;
                this.setData((t = {}, t["pages.all.data.hotSale.selectedId"] = n, t["pages.all.data.hotSale.page"] = 1, 
                t["pages.all.data.hotSaleGoods"] = [], t["pages.all.data.hotSale.nomore"] = !1, 
                t["pages.all.data.hotSale.nodata"] = !1, t)), this.fetchTodayHotSales();
            },
            fetchGrouponLimit: function() {
                var e = this;
                return o("weapp.spotlight.ad.unit.ad/1.0.0/list", {
                    unit: "groupon_subject",
                    category: 1
                }).then(function(t) {
                    var n;
                    if (console.log(0, "拼团频道 + 限时折扣", t), e.setData((n = {}, n["pages.all.data.grouponLimit"] = t || [], 
                    n)), r(t)) return console.error("限时折扣为空"), c.default.reject();
                });
            },
            fetchGoodsGroupData: function() {
                var e = this;
                return this.fetchCollectionTabs({
                    type: 1,
                    sectionName: "精挑细选"
                }).then(function(t) {
                    var n;
                    console.log(0, "精挑细选信息", t);
                    var a = t.items, o = [];
                    return t.items.forEach(function() {
                        o.push([]);
                    }), e.setData((n = {}, n["pages.all.data.goodsGroupInfos"] = a, n["pages.all.data.goodsGroupGoods"] = o, 
                    n)), t.items;
                }).then(function(t) {
                    t.forEach(function(t, n) {
                        o("weapp.spotlight.collection.goods/1.0.0/list", {
                            collectionId: t.id,
                            type: 1,
                            page: 1,
                            size: 8
                        }).then(function(a) {
                            var o;
                            console.log(t.id, "精挑细选商品", a);
                            var r = e.data.pages.all.data.goodsGroupGoods;
                            r[n] = a.items, e.setData((o = {}, o["pages.all.data.goodsGroupGoods"] = r, o));
                        });
                    });
                });
            },
            bindGoodsGroupBannerTap: function(e) {
                var t = e.currentTarget.dataset.name, n = this.data.venuesTab.list;
                console.log(n, t);
                for (var a = {}, o = n, r = Array.isArray(o), i = 0, o = r ? o : (0, s.default)(o); ;) {
                    var c;
                    if (r) {
                        if (i >= o.length) break;
                        c = o[i++];
                    } else {
                        if ((i = o.next()).done) break;
                        c = i.value;
                    }
                    var u = c;
                    if (u.name === t) {
                        a = u;
                        break;
                    }
                }
                wx.navigateTo({
                    url: "/pages/venues/otherIndex/index?&id=" + a.id
                });
            },
            fetchDouzaiQiangGoods: function() {
                var e, t = this;
                if (!this.data.pages.all.data.douzaiqiang) {
                    var n;
                    this.setData((n = {}, n["pages.all.data.douzaiqiang"] = {
                        page: 1,
                        size: 20,
                        loading: !1
                    }, n));
                }
                this.setData((e = {}, e["pages.all.data.douzaiqiang.loading"] = !0, e));
                var a = this.data.pages.all.data.douzaiqiang;
                return o("weapp.spotlight.goods/1.0.0/list", {
                    categoryId: 0,
                    collectionId: 8,
                    type: 3,
                    page: a.page,
                    size: a.size
                }).then(function(e) {
                    var n, a = e.items || [], o = t.data.pages.all.data.douzaiqiangGoods || [];
                    o = [].concat(o, a);
                    var r = t.data.pages.all.data.douzaiqiang.page, i = !1, s = !1;
                    1 !== r && 0 === a.length && (i = !0), 1 === r && 0 === a.length && (s = !0), t.setData((n = {}, 
                    n["pages.all.data.douzaiqiangGoods"] = o, n["pages.all.data.douzaiqiang.loading"] = !1, 
                    n["pages.all.data.douzaiqiang.nomore"] = i, n["pages.all.data.douzaiqiang.nodata"] = s, 
                    n)), console.log(0, "大家都在抢商品", t.data.pages.all.data.douzaiqiangGoods);
                });
            },
            handleHomeScrollToLower: function() {
                if (console.log(0, "页面滚动到底部"), this.data.pages.all.data.hotSale) {
                    var e = this.data.pages.all.data.hotSale, t = e.loading, n = e.nomore, a = e.nodata;
                    if (!t && !n && !a) {
                        var o;
                        return this.setData((o = {}, o["pages.all.data.hotSale.page"] = this.data.pages.all.data.hotSale.page + 1, 
                        o)), this.fetchTodayHotSales();
                    }
                    return c.default.resolve();
                }
                return c.default.resolve();
            },
            fetchCollectionTabs: function(e) {
                return new c.default(function(t, n) {
                    u.carmen({
                        api: "weapp.spotlight.collection/1.0.0/list",
                        method: "GET",
                        data: e,
                        success: function(e) {
                            t(e);
                        },
                        fail: function(e) {
                            n(e);
                        }
                    });
                });
            },
            onTopicTapped: function(e) {
                var t, n = e.currentTarget.dataset.type;
                "seckill-goods" === n ? t = 7 : "hot-sale" === n ? t = 15 : "douzaiqiang" === n ? t = 8 : "goods-group" === n && (t = 18), 
                t && l.setGlobalData({
                    topic: t
                });
            }
        }
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var o = a(n(4)), r = a(n(14)), i = a(n(10)), s = a(n(7)), c = getApp(), u = n(12), l = n(67);
    e.exports = {
        data: {},
        component: (0, s.default)({
            initHold: function() {
                var e = this, t = this.data.actionSubTab, n = this.data.venuesTab.selectedId, a = this.data.pages, o = a[n].data;
                o.page = 1, o.goods = [], t || (o.banner = []), o.nodata = !1, o.nomore = !1, o.loading = !1, 
                o.isRequest = !1, a[n].data = o, this.setData({
                    pages: a
                });
                return (t ? this.fetchHoldGoodsData() : i.default.all([ this.fetchHoldBannerData(), this.fetchHoldGoodsData() ])).then(function() {
                    e.setData({
                        actionSubTab: !1
                    });
                });
            },
            fetchHoldBannerData: function() {
                var e = this, t = this, n = this.data.venuesTab, a = n.selectedId, s = n.selectedName, l = this.data.pages, d = l[a].data;
                return this.requestHoldBannerTask && this.requestHoldBannerTask.abort(), new i.default(function(n, i) {
                    t.requestHoldBannerTask = c.carmen({
                        api: "weapp.spotlight.ad.unit.ad/1.0.0/list",
                        data: {
                            unit: s,
                            category: 1
                        },
                        success: function(o) {
                            if (0 !== o.length) {
                                var i = !0;
                                o.forEach(function(e) {
                                    0 !== (0, r.default)(e).length && (i = !1);
                                }), i && t.showZanToast("当前网络不稳定，请刷新重试");
                            }
                            d.banner = o.map(function(e) {
                                return {
                                    src: e.hd_img + "?imageView2/2/w/120/h/0/q/90/format/jpg/interlace/1",
                                    link: e.url
                                };
                            }), l[a].data = d, t.setData({
                                pages: l
                            }), n(), o.map(function(t, n) {
                                var o = e.imgLoader.load(t.hd_img + "?imageView2/2/w/600/h/0/q/90/format/jpg/interlace/1");
                                "function" == typeof o.then ? o.then(function(t) {
                                    d.banner[n].src = t.src, l[a].data = d, e.setData({
                                        pages: l
                                    });
                                }) : (d.banner[n].src = o.src, l[a].data = d, e.setData({
                                    pages: l
                                }));
                            });
                        },
                        fail: function(e) {
                            "wx:request" === e.type && -1 < e.msg.indexOf("abort") ? n() : (i(e), u("api log: weapp.spotlight.ad.unit.ad/1.0.0/list (hold banner) " + (0, 
                            o.default)(e)));
                        }
                    });
                });
            },
            fetchHoldGoodsData: function() {
                var e = this, t = this.data.venuesTab, n = t.selectedId, a = t.selectedType, r = this.data.subTab.selectedId, s = this.data.pages, l = s[n].data, d = l.page, f = l.pageSize, p = l.nodata, h = l.nomore, g = l.goods, m = void 0 === g ? [] : g;
                return l.isRequest = !0, s[n].data = l, this.setData({
                    pages: s
                }), this.requestHoldGoodsTask && this.requestHoldGoodsTask.abort(), new i.default(function(t, i) {
                    e.requestHoldGoodsTask = c.carmen({
                        api: "weapp.spotlight.goods/1.0.0/list",
                        data: {
                            collectionId: n,
                            categoryId: r,
                            type: a,
                            page: d,
                            size: f
                        },
                        success: function(a) {
                            var o = a.paginator.total_count, r = a.items || [];
                            if (o) 1 === d && 0 === r.length ? p = !0 : h = !0; else if (0 === r.length) return l.isRequest = !1, 
                            l.page = d + 1, s[n].data = l, e.setData({
                                pages: s
                            }), void e.fetchHoldGoodsData();
                            l.goods = m.concat(r), l.nodata = p, l.nomore = h, l.isRequest = !1, l.page = d + 1, 
                            s[n].data = l, e.setData({
                                pages: s
                            }), t();
                        },
                        fail: function(e) {
                            "wx:request" === e.type && -1 < e.msg.indexOf("abort") ? t() : (i(e), u("api log: weapp.spotlight.goods/1.0.0/list (hold goods) " + (0, 
                            o.default)(e)));
                        }
                    });
                });
            },
            handleHoldScrollToLower: function() {
                var e = this, t = this.data.venuesTab.selectedId, n = this.data.pages[t].data, a = n.nomore, o = n.nodata, r = n.isRequest;
                return a || o || r ? i.default.resolve() : this.fetchHoldGoodsData().then(function() {
                    return i.default.resolve();
                }).catch(function() {
                    return e.setData({
                        isRequest: !1
                    }), i.default.reject();
                });
            }
        }, l)
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var o = a(n(4)), r = a(n(14)), i = a(n(10)), s = a(n(7)), c = getApp(), u = n(12), l = n(67);
    e.exports = {
        data: {},
        component: (0, s.default)({
            initCustom: function() {
                var e = this, t = null, n = this.data.actionSubTab, a = this.data.venuesTab.selectedId, o = this.data.pages;
                o[a] ? t = o[a].data : (o[a] = {
                    data: {
                        page: 1,
                        pageSize: 10,
                        nodata: !1,
                        nomore: !1,
                        isRequest: !1
                    },
                    content: []
                }, t = o[a].data), t.page = 1, t.goods = [], n || (t.banner = []), t.nodata = !1, 
                t.nomore = !1, t.loading = !1, t.isRequest = !1, o[a].data = t, this.setData({
                    pages: o
                });
                return (n ? this.fetchCustomGoodsData() : i.default.all([ this.fetchCustomBannerData(), this.fetchCustomGoodsData() ])).then(function() {
                    e.setData({
                        actionSubTab: !1
                    });
                });
            },
            fetchCustomBannerData: function() {
                var e = this, t = this, n = this.data.venuesTab, a = n.selectedId, s = n.selectedName, l = this.data.pages, d = l[a].data;
                return this.requestCustomBannerTask && this.requestCustomBannerTask.abort(), new i.default(function(n, i) {
                    t.requestCustomBannerTask = c.carmen({
                        api: "weapp.spotlight.ad.unit.ad/1.0.0/list",
                        data: {
                            unit: s,
                            category: 1
                        },
                        success: function(o) {
                            if (0 !== o.length) {
                                var i = !0;
                                o.forEach(function(e) {
                                    0 !== (0, r.default)(e).length && (i = !1);
                                }), i && t.showZanToast("当前网络不稳定，请刷新重试");
                            }
                            d.banner = o.map(function(e) {
                                return {
                                    src: e.hd_img + "?imageView2/2/w/120/h/0/q/90/format/jpg/interlace/1",
                                    link: e.url
                                };
                            }), l[a].data = d, t.setData({
                                pages: l
                            }), n(), o.map(function(t, n) {
                                var o = e.imgLoader.load(t.hd_img + "?imageView2/2/w/600/h/0/q/90/format/jpg/interlace/1");
                                "function" == typeof o.then ? o.then(function(t) {
                                    d.banner[n].src = t.src, l[a].data = d, e.setData({
                                        pages: l
                                    });
                                }) : (d.banner[n].src = o.src, l[a].data = d, e.setData({
                                    pages: l
                                }));
                            });
                        },
                        fail: function(e) {
                            "wx:request" === e.type && -1 < e.msg.indexOf("abort") ? n() : (i(e), u("api log: weapp.spotlight.ad.unit.ad/1.0.0/list (custom banner) " + (0, 
                            o.default)(e)));
                        }
                    });
                });
            },
            fetchCustomGoodsData: function() {
                var e = this, t = this.data.venuesTab, n = t.selectedId, a = (t.selectedType, this.data.pages), r = a[n].data, s = r.page, l = r.pageSize, d = r.nodata, f = r.nomore, p = r.goods, h = void 0 === p ? [] : p;
                return r.isRequest = !0, a[n].data = r, this.setData({
                    pages: a
                }), this.requestCustomGoodsTask && this.requestCustomGoodsTask.abort(), new i.default(function(t, i) {
                    e.requestCustomGoodsTask = c.carmen({
                        api: "weapp.spotlight.collection.goods/1.0.0/list",
                        data: {
                            collectionId: n,
                            page: s,
                            size: l
                        },
                        success: function(o) {
                            var i = o.paginator.total_count, c = o.items || [];
                            if (i) 1 === s && 0 === c.length ? d = !0 : f = !0; else if (0 === c.length) return r.isRequest = !1, 
                            r.page = s + 1, a[n].data = r, e.setData({
                                pages: a
                            }), void e.fetchCustomGoodsData();
                            r.goods = h.concat(c), r.nodata = d, r.nomore = f, r.isRequest = !1, r.page = s + 1, 
                            a[n].data = r, e.setData({
                                pages: a
                            }), t();
                        },
                        fail: function(e) {
                            "wx:request" === e.type && -1 < e.msg.indexOf("abort") ? t() : (i(e), u("api log: weapp.spotlight.collection.goods/1.0.0/list (custom goods) " + (0, 
                            o.default)(e)));
                        }
                    });
                });
            },
            handleCustomScrollToLower: function() {
                var e = this, t = this.data.venuesTab, n = t.selectedId, a = (t.selectedType, this.data.pages[n].data), o = a.nomore, r = a.nodata, s = a.isRequest;
                return r || o || s ? i.default.resolve() : this.fetchCustomGoodsData().then(function() {
                    return i.default.resolve();
                }).catch(function() {
                    return e.setData({
                        isRequest: !1
                    }), i.default.reject();
                });
            }
        }, l)
    };
}, function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(2));
    n(24);
    e.exports = (0, a.default)({}, {
        onShowQrcodeView: function() {
            this.setData({
                showQrcode: !0
            });
        },
        onHideQrcodeView: function() {
            this.setData({
                showQrcode: !1
            });
        },
        onSaveToGalleryTap: function() {
            var e = this;
            console.log("onSaveToGalleryTap"), wx.downloadFile({
                url: "https://img.yzcdn.cn/public_files/2017/10/11/9d70e8e30428434647d85358383f37f9.jpg",
                success: function(t) {
                    console.log(t), wx.saveImageToPhotosAlbum({
                        filePath: t.tempFilePath,
                        success: function() {
                            e.showZanToast("已保存到系统相册 ");
                        },
                        fail: function(t) {
                            console.log(t), e.showZanToast("保存失败");
                        }
                    });
                },
                fail: function() {
                    e.showZanToast("保存失败");
                }
            });
        }
    });
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var o, r, i = a(n(4)), s = a(n(2)), c = getApp(), u = n(45), l = n(8), d = "invalid";
    o = {
        goods_id: "1233",
        goods_alias: "2orj383nf5rr3",
        goods_name: "商品"
    }, o.goods_alias = "12ewadqwd", o.price = "1.00", o.pic_url = "https://img.yzcdn.cn/dasdsadsd", 
    r = {
        goods_id: "1233",
        goods_alias: "2orj383nf5rr3",
        goods_name: "商品"
    }, r.goods_alias = "12ewadqwd", r.price = "1.00", r.pic_url = "https://img.yzcdn.cn/dasdsadsd";
    e.exports = (0, s.default)({}, {
        _onMoredescTaped: function(e) {
            var t = e.currentTarget.dataset.coupon, n = e.currentTarget.dataset.index;
            t.show_more_desc = !t.show_more_desc, this.onMoredescTaped && this.onMoredescTaped(t, n);
        },
        _onCouponButtonTaped: function(e) {
            var t = this, n = e.currentTarget.dataset.coupon, a = e.currentTarget.dataset.index, o = n.component.valid_content, r = n.component.kdtId;
            if ("立即领取" == o) {
                if (!c.getBuyerId() || !c.getMobile()) return void this.bindZanAccount();
                wx.showLoading({
                    title: "领取中"
                }), c.carmen({
                    api: "youzan.ump.coupon/1.0.0/fetch",
                    query: {
                        id: n.id,
                        mobile: c.getMobile()
                    },
                    success: function() {
                        t.showZanToast("领取成功"), n.component.valid_content = "立即使用", t.onCouponObtainedSuccess && t.onCouponObtainedSuccess(n, a);
                    },
                    fail: function(e) {
                        t.showZanToast(e.msg || "领取失败");
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                });
            } else if ("立即使用" == o) if ("all" == n.range_type) wx.navigateTo({
                url: "/pages/usercenter/shopSelection/shopSelection?kdtId=" + r
            }); else {
                var s = n.range_value || [];
                if (0 == s.length) return void wx.navigateTo({
                    url: "/pages/usercenter/shopSelection/shopSelection?kdtId=" + r
                });
                wx.setStorage({
                    key: "coupon_range_value",
                    data: (0, i.default)(s)
                }), wx.navigateTo({
                    url: "/pages/goods/group/index?pageType=coupon"
                });
            }
        },
        _onCouponCellTaped: function(e) {
            var t = e.currentTarget.dataset.coupon;
            t.component.status == d || this.onCouponCellTaped && this.onCouponCellTaped(t, e.currentTarget.dataset.index);
        }
    }, {
        handleCouponData: function(e) {
            console.log("coupon " + e);
            var t = e.group ? (0, s.default)({}, e.group, e) : e;
            delete t.group;
            var n = t;
            if (n.show_more_desc = !1, n.disable_button = e.disable_button || !1, n.disable_charge = e.disable_charge || !1, 
            n.component = {}, n.component.name = t.shop_name || t.name, n.component.type = 9 == t.group_type || 10 == t.group_type ? "code" : "card", 
            n.component.kdtId = t.kdt_id, 1 == t.preferential_type || "code" == n.component.type) {
                var a = (t.value / 100).toString().split("."), o = a[0], r = 2 == a.length ? a[1] : null;
                r = "00" == r ? null : r, n.component.yuan = o, n.component.cent = r;
            } else if (2 == t.preferential_type) {
                var i = t.discount % 10, c = (t.discount - i) / 10;
                n.component.discount = 0 == c ? c + "" : c + "." + i;
            }
            var u = 0;
            if (1 == t.at_least && (u = t.condition), n.component.condition = 0 < u ? "满" + u / 100 + "元可用" : "无使用门槛", 
            t.valid_start_at && t.expire_at) {
                var l = this._timeStampToDate(t.valid_start_at), f = this._timeStampToDate(t.expire_at);
                n.component.valid_time = l + " - " + f;
            } else if (1 == t.date_type || "code" == n.component.type) {
                var p = "string" == typeof t.start_at ? t.start_at : this._timeStampToDate(t.start_at), h = "string" == typeof t.end_at ? t.end_at : this._timeStampToDate(t.end_at);
                n.component.valid_time = p + " - " + h;
            } else 2 == t.date_type && (n.component.valid_time = "领到券" + (0 == t.fixed_begin_term ? "当日" : "次日") + "开始" + t.fixed_term + "天内有效");
            var g = "";
            g += "all" == t.range_type ? "全部商品可用" : "部分商品可用", g += ", 不可抵扣运费", n.component.desclist = [ g ];
            var m = "valid", v = "", y = "";
            return 1 == t.is_invalid ? (m = d, v = "已失效") : 1 == t.is_used ? (m = d, v = "已使用") : 0 == t.stock ? (m = d, 
            v = "已抢完") : t.buyer_taked_limit ? (m = d, v = "已领取") : y = "立即领取", n.component.status = e.status || m, 
            n.component.invalid_content = v, n.component.valid_content = e.valid_content || y, 
            n;
        },
        _timeStampToDate: function(e) {
            var t = new Date(1e3 * e);
            return t.getFullYear() + "." + (t.getUTCMonth() + 1) + "." + t.getDate();
        }
    }, u, l.Toast);
}, function(e) {
    var t = getApp();
    e.exports = {
        fetchChatSupportStatus: function(e, n) {
            t.carmen({
                api: "weapp.spotlight.shop.custom.service/1.0.0/get",
                method: "GET",
                data: {
                    kdt_id: e
                },
                success: function(e) {
                    e.area_code && 10 > e.phone_number.length && (e.phone_number = e.area_code + e.phone_number), 
                    n({
                        supportChat: !!e.is_web_im_available,
                        chatBusinessId: e.business_id || "",
                        phoneNum: e.phone_number || ""
                    });
                },
                fail: function(e) {
                    console.log("[fetchShopContactSupportStatus]" + e.msg);
                }
            });
        }
    };
}, function(e) {
    e.exports = {
        _searchBegin: function() {
            console.log("begin search"), this.setData({
                beginSearch: !0
            }), this.searchBegin && this.searchBegin();
        },
        _searchInput: function(e) {
            if (null == e) this.setData({
                inputvalue: ""
            }); else {
                var t = e.detail.value;
                this.setData({
                    isShowClearButton: 0 < t.length
                }), this.searchInput && this.searchInput();
            }
        },
        _searchBlur: function(e) {
            0 == e.detail.value.length && this.setData({
                beginSearch: !1
            }), this.searchBlur && this.searchBlur();
        },
        _searchDone: function(e) {
            console.log("search done" + e.detail.value), this.searchDone && this.searchDone({
                value: e.detail.value
            });
        },
        _searchContentClear: function() {
            this._searchInput(null), this.setData({
                beginSearch: !0,
                isShowClearButton: !1,
                isfocus: !0
            }), this.searchContentClear && this.searchContentClear();
        },
        _searchCancel: function() {
            this.searchCancel && this.searchCancel();
        }
    };
}, function(e) {
    e.exports = {
        mobile: function(e) {
            return e = "" + e, /^((\+86)|(86))?(1)\d{10}$/.test(e) || /^\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1|)-?\d{1,14}$/.test(e);
        },
        phone: function(e) {
            return e = "" + e, /^0[0-9\-]{10,13}$/.test(e);
        },
        number: function(e) {
            return /^\d+$/.test(e);
        },
        email: function(e) {
            return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e);
        },
        postalCode: function(e) {
            return e = "" + e, /^\d{6}$/.test(e);
        }
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function o(e, t, n) {
        var a = c.formatOrderShowData(e);
        u.carmen({
            api: "weapp.spotlight.orders/1.0.0/confirm",
            data: {
                bill_context: (0, s.default)(a)
            },
            method: "POST",
            success: function(e) {
                return 200 == e.code ? void (t && t(e)) : void n(e.message, e);
            },
            fail: function(e) {
                n && n(e.msg, e);
            }
        });
    }
    function r(e, t, n) {
        var a = {
            orderNo: e.order_no,
            kdtId: e.kdtId
        };
        u.carmen({
            api: "kdt.trade.bill/1.0.0/showPay",
            data: {
                billShowPayParam: (0, s.default)(a)
            },
            method: "GET",
            success: function(e) {
                return 200 == e.code ? void (t && t(e)) : void n(e.message, e);
            },
            fail: function(e) {
                n && n(e.msg, e);
            }
        });
    }
    var i = a(n(7)), s = a(n(4)), c = n(110), u = getApp(), l = n(0);
    e.exports = {
        fetchOrderData: function(e, t, n) {
            (e.order_no ? r : o)(e, function(e) {
                t(e);
            }, function(e, t) {
                n && n(e, t);
            });
        },
        validCouponCode: function(e, t, n) {
            var a = this;
            u.carmen({
                api: "kdt.ump.coupon.take/1.0.0/takecode",
                data: e,
                method: "POST",
                success: function(e) {
                    t && t(e);
                },
                fail: function(e) {
                    n && n(e);
                },
                complete: function() {
                    a.isFetching = !1;
                }
            });
        },
        createOrder: function(e, t, n) {
            var a = c.formatOrderShowData(e, !0);
            u.carmen({
                api: "weapp.spotlight.orders/1.0.1/create",
                data: {
                    bill_context: (0, s.default)(a)
                },
                method: "POST",
                success: function(e) {
                    return 200 === e.code ? (l.track({
                        fm: "orderCreate",
                        act_name: "normal",
                        order_no: e.data.orderNo || ""
                    }), u.logger.log({
                        et: "click",
                        ei: "orderCreate",
                        en: "下单",
                        params: {
                            orderNo: e.data.orderNo || ""
                        }
                    }), void t(e.data, e)) : void (n && n(e.message));
                },
                fail: function(e) {
                    n && n(e.msg);
                }
            });
        },
        payOrder: function(e, t, n) {
            var a = this;
            u.carmen({
                api: "weapp.spotlight.payment/1.0.0/pay",
                data: e,
                method: "POST",
                success: function(o) {
                    if (117700200 === o.code) {
                        var r = o.data || {}, s = {};
                        if (r.operation && "ADJUST_PRICE" === r.operation) return e = (0, i.default)({}, e, {
                            new_price: r.new_price,
                            accept_price: 1
                        }), void a.payOrder(e, t, n);
                        try {
                            s = JSON.parse(r.deep_link_info);
                        } catch (e) {
                            console.error(e.message);
                        }
                        t(s, o);
                    } else n && n(o.message);
                },
                fail: function(e) {
                    n(e.msg);
                }
            });
        }
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function o(e) {
        var t = 1;
        return 0 == (e.payment || {}).realPay && (t = 16), t;
    }
    function r(e, t) {
        return e = 10 > e + 1 ? "0" + (e + 1) : e + 1, t = 10 > t ? "0" + t : t, e + "-" + t;
    }
    var i = a(n(7)), s = a(n(14)), c = a(n(4)), u = a(n(2)), l = n(11), d = n(6), f = n(15), p = n(0), h = getApp();
    e.exports = {
        getBriefGoodsData: function(e) {
            return e.map(function(e) {
                return {
                    sku_id: e.skuId,
                    goods_id: e.goodsId,
                    goods_type: e.goodsType,
                    price: e.price,
                    pay_price: e.payPrice,
                    num: e.num
                };
            });
        },
        parseOrderData: function(e, t) {
            var n = e.shopResultList[0], a = n.orderItemList || [], o = (n.activityResult || {}).activityNameList || [], i = "";
            a = a.map(function(e) {
                e.imgUrl = d(e.imgUrl, "!200x200.jpg"), e.sku = JSON.parse(e.sku);
                var t = "";
                e.sku.forEach(function(e) {
                    t += e.v + " ";
                }), e.skuStr = t;
                try {
                    var n = JSON.parse(e.message), a = [];
                    l(n, function(e, t) {
                        a.push({
                            name: t,
                            value: e
                        });
                    }), e.message = a;
                } catch (t) {
                    e.message = [];
                }
                if (e.isPresale) if (0 == e.presaleTimeType) {
                    var o = new Date(1e3 * e.presaleStartTime), s = o.getFullYear(), c = o.getMonth(), u = o.getDate();
                    i = s + "-" + r(c, u);
                } else if (1 == e.presaleTimeType) {
                    var p = new Date(new Date().getTime() + 1e3 * (e.presaleStartTimeAfterPay + 1) * 24 * 60 * 60), h = p.getFullYear(), g = p.getMonth(), m = p.getDate();
                    i = h + "-" + r(g, m);
                }
                return e.payPriceStr = f(e.payPrice).toYuan(), e;
            });
            var s = n.orderPayment, c = n.chargePriceChangeResult || null, p = {
                realPay: s.realPay,
                goodsPay: s.itemPay,
                postage: s.postage,
                activity: s.decrease,
                changePrice: c
            }, h = this.parsePaymentData(p), g = {
                showDetail: !1
            }, m = [];
            return (n.unavailableItemList || []).forEach(function(e) {
                var t = "";
                JSON.parse(e.sku).forEach(function(e) {
                    t += e.v + " ";
                });
                var n = {
                    goodsId: e.goodsId,
                    skuId: e.skuId,
                    imgUrl: d(e.imgUrl, "!200x200.jpg"),
                    priceStr: f(e.price).toYuan(),
                    title: e.title,
                    num: e.num,
                    unavailableDesc: e.unavailableDesc,
                    skuStr: t
                };
                m.push(n);
            }), g.list = m, {
                shop: (0, u.default)(t.shop, {
                    umpActivity: o,
                    postage: s.postage,
                    realPay: s.realPay,
                    pay: s.pay,
                    shopName: n.shopName,
                    buyer_msg: n.buyerMsg || "",
                    postageStr: f(s.postage).toYuan(),
                    itemPayStr: f(s.itemPay).toYuan()
                }),
                coupons: (0, u.default)(t.coupons, {
                    list: n.chargeCoupon || [],
                    inValid: n.unavailableCoupon || []
                }),
                is_virtual: e.isVirtual || e.hasVirtualGoods,
                goods_list: a,
                payment: p,
                payment_strs: h,
                unavailable_goods: g,
                goodsPresaleStartTime: i
            };
        },
        parsePaymentData: function(e) {
            return {
                realPayStr: f(e.realPay).toYuan(),
                goodsPay: f(e.goodsPay).toYuan(),
                postage: f(e.postage).toYuan(),
                activity: f(e.activity).toYuan(),
                changePrice: e.changePrice ? f(e.changePrice.newPay - e.changePrice.originPay).toYuan() : null
            };
        },
        parseOrderAddressData: function(e) {
            return {
                address_detail: e.addressDetail,
                id: e.addressId,
                area_code: e.areaCode,
                city: e.city,
                community: e.community,
                county: e.county,
                postal_code: e.postalCode,
                province: e.province,
                tel: e.tel,
                user_name: e.userName
            };
        },
        formatCouponCodeData: function(e) {
            var t = e.coupons.code;
            return {
                kdt_id: e.kdtId,
                item_pay: e.payment.goodsPay,
                postage: e.payment.postage,
                fans_type: h.getFansType(),
                item_list: (0, c.default)(this.getBriefGoodsData(e.goods_list)),
                code: t
            };
        },
        formatOrderShowData: function(e, t) {
            var n = {}, a = {}, o = wx.getStorageSync("selectDetailModel"), r = e.isGroupon, d = e.hasOverseaGoods, f = d ? e.identifyCardNo : void 0;
            if (!e.isFirst || r || d) if (e.showSelfFetch && null != o) {
                var g = {
                    id: o.id,
                    kdt_id: e.kdtId,
                    name: o.name,
                    province: o.province,
                    city: o.city,
                    tel: o.tel,
                    county: o.county,
                    address_detail: o.address,
                    dfcode: o.city_code,
                    postal_code: o.city_code,
                    user_name: e.fetchUserName,
                    user_tel: e.fetchPhoneNumber,
                    user_time: e.fetchTime,
                    is_optional_self_fetch_time: o.is_optional_self_fetch_time
                };
                a = r ? {
                    expressType: 1,
                    selfFetch: (0, c.default)(g),
                    groupIsHeader: e.isLeader,
                    groupCollectServiceChosen: e.isLeaderSelected,
                    idCardNumber: f
                } : {
                    expressType: 1,
                    selfFetch: (0, c.default)(g),
                    idCardNumber: f
                };
            } else e.showExpress && e.address && e.address.user_name && (a = r ? {
                addressDetail: e.address.address_detail,
                addressId: e.address.id,
                areaCode: e.address.area_code,
                city: e.address.city,
                community: e.address.community || "",
                county: e.address.county,
                expressType: 0,
                expressTypeChosen: 0,
                postalCode: e.address.postal_code,
                province: e.address.province,
                tel: e.address.tel,
                userName: e.address.user_name,
                groupIsHeader: e.isLeader,
                groupCollectServiceChosen: e.isLeaderSelected,
                idCardNumber: f
            } : {
                addressDetail: e.address.address_detail,
                addressId: e.address.id,
                areaCode: e.address.area_code,
                city: e.address.city,
                community: e.address.community || "",
                county: e.address.county,
                expressType: 0,
                expressTypeChosen: 0,
                postalCode: e.address.postal_code,
                province: e.address.province,
                tel: e.address.tel,
                userName: e.address.user_name,
                idCardNumber: f
            }); else ;
            0 < (0, s.default)(a).length && (n.billAddress = a), n.billCustomer = {};
            var m = e.origin_goods_list;
            if (t) {
                var v = e.unavailable_goods.list || [];
                m = m.filter(function(e) {
                    return !v.some(function(t) {
                        return t.goodsId = e.goodsId && t.skuId == e.skuId;
                    });
                });
            }
            n.billGoodsList = m.map(function(t) {
                10 === (t = (0, u.default)({}, t)).activityType && (t.activityType = 0);
                var n;
                return "cart" == e.orderFrom ? n = t.message || {} : (n = [], l(t.message, function(e) {
                    n.push(e);
                })), t.message = (0, c.default)(n), r && void 0 != e.activityAlias && (t.activityAlias = e.activityAlias), 
                t;
            });
            var y = e.coupons.selected || {};
            if (n.billShopList = [ {
                buyWay: 0,
                buyerMsg: e.shop.buyer_msg,
                couponId: y.id || 0,
                couponType: y.type || 0,
                currency: 1,
                isForbidUmp: !1,
                isPinjian: 0,
                isPoints: 0,
                kdtId: e.kdtId,
                orderType: 0,
                storeId: 0
            } ], n.billSource = {
                bookKey: e.book_key,
                channel: "",
                clientIp: "127.0.0.1",
                hasUnvalidGoods: 0,
                isReceiveMsg: e.sms || 0,
                kdtId: e.kdtId,
                orderFrom: e.orderFrom || "",
                platform: "mobile",
                seller: "",
                source: "",
                track: "",
                orderMark: "weapp_spotlight",
                weAppFormId: e.formId
            }, t) {
                p.getGlobalData();
                var _ = (0, i.default)({
                    platform: "weapp",
                    appId: h.getAppId() || "",
                    userId: h.globalData.userId || "",
                    kdtId: e.kdtId
                }, e.logv3Data);
                n.billSource.extendSource = _;
            }
            return n;
        },
        formatOrderPaymentData: function(e) {
            var t = e.prePaymentPreparation, n = h.globalData.openId;
            return (0, i.default)({
                order_mark: "weapp_jx",
                app_id: h.getAppId(),
                buyWay: o(e),
                pay_tool: "WX_APPLET",
                wx_sub_open_id: n
            }, t);
        }
    };
}, function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(4)), o = getApp();
    e.exports = {
        getSafeDetail: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], n = arguments[2];
            o.carmen({
                api: "kdt.trade.safe.detail/1.0.0/getBySafeNoWithValidate",
                data: {
                    safe_no: e.safe_no,
                    order_no: e.order_no,
                    kdt_id: e.kdt_id
                },
                success: function(e) {
                    return t && t(e);
                },
                fail: function(e) {
                    return n && n(e.msg);
                }
            });
        },
        getRefundProcess: function(e, t) {
            o.carmen({
                api: "kdt.trade.refund.detail/1.0.0/getProcess",
                data: {
                    item_id: e.item_id,
                    safe_no: e.safe_no,
                    order_no: e.order_no,
                    kdt_id: e.kdt_id
                },
                success: function(e) {
                    return t && t(e);
                }
            });
        },
        submitMessage: function(e, t, n) {
            var r = e.messageDialog, i = r.imgs.map(function(e) {
                return e.src;
            });
            o.carmen({
                api: "kdt.trade.safe.creator/1.0.0/createMessage",
                method: "POST",
                data: {
                    safe_no: e.safe_no,
                    order_no: e.order_no,
                    kdt_id: e.kdt_id,
                    message: r.message,
                    ext_info: (0, a.default)(i)
                },
                success: function(e) {
                    t && t(e);
                },
                fail: function(e) {
                    n && n(e.msg);
                }
            });
        },
        submitYouzan: function(e, t, n) {
            var r = e.youzanDialog, i = r.imgs.map(function(e) {
                return e.src;
            });
            o.carmen({
                api: "kdt.trade.safe.modify/1.0.0/involve",
                method: "POST",
                data: {
                    safe_no: e.safe_no,
                    order_no: e.order_no,
                    kdt_id: e.kdt_id,
                    explain: r.message,
                    ext_info: (0, a.default)(i)
                },
                success: function(e) {
                    t && t(e);
                },
                fail: function(e) {
                    n && n(e.msg);
                }
            });
        },
        close: function(e, t, n) {
            o.carmen({
                api: "kdt.trade.safe.modify/1.0.0/close",
                data: {
                    safe_no: e.safe_no,
                    order_no: e.order_no,
                    kdt_id: e.kdt_id
                },
                success: function(e) {
                    return t && t(e);
                },
                fail: function(e) {
                    return n && n(e.msg);
                }
            });
        }
    };
}, , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(176));
    n(180), n(181), n(182), n(188), n(208), global.regeneratorRuntime = a.default;
}, function(e, t, n) {
    e.exports = !n(33) && !n(38)(function() {
        return 7 != Object.defineProperty(n(82)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a;
    });
}, function(e, t, n) {
    var a = n(34), o = n(35), r = n(186)(!1), i = n(87)("IE_PROTO");
    e.exports = function(e, t) {
        var n, s = o(e), c = 0, u = [];
        for (n in s) n != i && a(s, n) && u.push(n);
        for (;t.length > c; ) a(s, n = t[c++]) && (~r(u, n) || u.push(n));
        return u;
    };
}, function(e, t, n) {
    var a = n(50);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == a(e) ? e.split("") : Object(e);
    };
}, function(e, t, n) {
    var a = n(61), o = n(25), r = n(140), i = n(32), s = n(34), c = n(52), u = n(192), l = n(62), d = n(142), f = n(13)("iterator"), p = !([].keys && "next" in [].keys()), h = "keys", g = "values", m = function() {
        return this;
    };
    e.exports = function(e, t, n, v, y, _, w) {
        u(n, t, v);
        var x, b, S, T = function(e) {
            return !p && e in C ? C[e] : function() {
                return new n(this, e);
            };
        }, D = t + " Iterator", k = y == g, I = !1, C = e.prototype, F = C[f] || C["@@iterator"] || y && C[y], P = F || T(y), A = y ? k ? T("entries") : P : void 0, O = "Array" == t ? C.entries || F : F;
        if (O && (S = d(O.call(new e()))) !== Object.prototype && (l(S, D, !0), !a && !s(S, f) && i(S, f, m)), 
        k && F && F.name !== g && (I = !0, P = function() {
            return F.call(this);
        }), (!a || w) && (p || I || !C[f]) && i(C, f, P), c[t] = P, c[D] = m, y) if (x = {
            values: k ? P : T(g),
            keys: _ ? P : T(h),
            entries: A
        }, w) for (b in x) b in C || r(C, b, x[b]); else o(o.P + o.F * (p || I), t, x);
        return x;
    };
}, function(e, t, n) {
    e.exports = n(32);
}, function(e, t, n) {
    e.exports = n(16).document && document.documentElement;
}, function(e, t, n) {
    var a = n(34), o = n(51), r = n(87)("IE_PROTO"), i = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = o(e), a(e, r) ? e[r] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? i : null;
    };
}, function(e, t, n) {
    e.exports = {
        default: n(197),
        __esModule: !0
    };
}, function(e, t, n) {
    var a = n(137), o = n(89).concat("length", "prototype");
    t.f = Object.getOwnPropertyNames || function(e) {
        return a(e, o);
    };
}, function(e, t, n) {
    var a = n(59), o = n(49), r = n(35), i = n(83), s = n(34), c = n(136), u = Object.getOwnPropertyDescriptor;
    t.f = n(33) ? u : function(e, t) {
        if (e = r(e), t = i(t, !0), c) try {
            return u(e, t);
        } catch (t) {}
        return s(e, t) ? o(!a.f.call(e, t), e[t]) : void 0;
    };
}, function() {}, function(e, t, n) {
    var a = n(25), o = n(9), r = n(38);
    e.exports = function(e, t) {
        var n = (o.Object || {})[e] || Object[e], i = {};
        i[e] = t(n), a(a.S + a.F * r(function() {
            n(1);
        }), "Object", i);
    };
}, function(e, t, n) {
    var a = n(50), o = n(13)("toStringTag"), r = "Arguments" == a(function() {
        return arguments;
    }()), i = function(e, t) {
        try {
            return e[t];
        } catch (t) {}
    };
    e.exports = function(e) {
        var t, n, s;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = i(t = Object(e), o)) ? n : r ? a(t) : "Object" == (s = a(t)) && "function" == typeof t.callee ? "Arguments" : s;
    };
}, function(e, t, n) {
    var a = n(22);
    e.exports = function(e, t, n, o) {
        try {
            return o ? t(a(n)[0], n[1]) : t(n);
        } catch (n) {
            var r = e.return;
            throw void 0 !== r && a(r.call(e)), n;
        }
    };
}, function(e, t, n) {
    var a = n(52), o = n(13)("iterator"), r = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (a.Array === e || r[o] === e);
    };
}, function(e, t, n) {
    var a, o, r, i = n(36), s = n(215), c = n(141), u = n(82), l = n(16), d = l.process, f = l.setImmediate, p = l.clearImmediate, h = l.MessageChannel, g = 0, m = {}, v = "onreadystatechange", y = function() {
        var e = +this;
        if (m.hasOwnProperty(e)) {
            var t = m[e];
            delete m[e], t();
        }
    }, _ = function(e) {
        y.call(e.data);
    };
    f && p || (f = function(e) {
        for (var t = [], n = 1; arguments.length > n; ) t.push(arguments[n++]);
        return m[++g] = function() {
            s("function" == typeof e ? e : Function(e), t);
        }, a(g), g;
    }, p = function(e) {
        delete m[e];
    }, "process" == n(50)(d) ? a = function(e) {
        d.nextTick(i(y, e, 1));
    } : h ? (o = new h(), r = o.port2, o.port1.onmessage = _, a = i(r.postMessage, r, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (a = function(e) {
        l.postMessage(e + "", "*");
    }, l.addEventListener("message", _, !1)) : a = v in u("script") ? function(e) {
        c.appendChild(u("script"))[v] = function() {
            c.removeChild(this), y.call(e);
        };
    } : function(e) {
        setTimeout(i(y, e, 1), 0);
    }), e.exports = {
        set: f,
        clear: p
    };
}, function(e, t, n) {
    var a = n(13)("iterator"), o = !1;
    try {
        var r = [ 7 ][a]();
        r.return = function() {
            o = !0;
        }, Array.from(r, function() {
            throw 2;
        });
    } catch (t) {}
    e.exports = function(e, t) {
        if (!t && !o) return !1;
        var n = !1;
        try {
            var r = [ 7 ], i = r[a]();
            i.next = function() {
                return {
                    done: n = !0
                };
            }, r[a] = function() {
                return i;
            }, e(r);
        } catch (t) {}
        return n;
    };
}, function(e, t) {
    t.__esModule = !0, t.default = function(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    };
}, function(e, t, n) {
    function a(e) {
        var t = r(e), n = e.detail.value;
        o.call(this, t, n);
    }
    function o(e, t) {
        var n = {
            componentId: e,
            value: t
        };
        console.info("[zan:Select:change]", n), this.handleZanSelectChange ? this.handleZanSelectChange(n) : console.warn("页面缺少 handleZanSelectChange 回调函数");
    }
    var r = n(53).extractComponentId;
    e.exports = {
        _handleZanSelectChange: function(e) {
            a.call(this, e);
        }
    };
}, function(e) {
    e.exports = {
        data: {},
        component: {
            handleSwitch: function(e) {
                var t = e.currentTarget.dataset.id, n = e.currentTarget.dataset.key, a = e.currentTarget.dataset.time, o = e.currentTarget.dataset.text;
                this.onTabChange({
                    id: t,
                    key: n,
                    time: a,
                    text: o
                });
            }
        }
    };
}, function(e, t, n) {
    e.exports = {
        default: n(263),
        __esModule: !0
    };
}, function(e, t) {
    function n() {
        return r && r.globalData ? r : r = getApp();
    }
    function a() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        return 10 <= (getCurrentPages() || []).length ? void o(e) : void wx.navigateTo(e);
    }
    function o() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        wx.redirectTo(e);
    }
    t.__esModule = !0;
    var r = getApp();
    t.navigate = a, t.redirect = o, t.switchTab = function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        if (n().globalData.isYouzanApp) {
            var t = getCurrentPages() || [], o = t.length, r = t.findIndex(function(t) {
                var n = t.route || "";
                return n === e.url || "/" + n === e.url;
            });
            return -1 < r ? (wx.navigateBack({
                delta: o - r - 1
            }), void console.log(r)) : void a(e);
        }
        wx.switchTab(e);
    }, t.navigateTo = a, t.redirectTo = o;
}, function(e) {
    Date.prototype.Format = function(e) {
        var t = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            S: this.getMilliseconds()
        };
        for (var n in /(y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))), 
        t) new RegExp("(" + n + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[n] : ("00" + t[n]).substr(("" + t[n]).length)));
        return e;
    };
    var t = "trackInfo";
    e.exports = {
        setTrackStorage: function(e) {
            var n = this.getTrackStorage(t);
            n = n || [];
            var a = new Date().Format("MM月dd日"), o = n[0];
            if (o && o.time === a) {
                for (var r = 0; r < o.value.length; r++) o.value[r].alias === e.alias && o.value.splice(r, 1);
                o.value.unshift(e);
            } else (o = {
                time: a,
                value: []
            }).value.unshift(e), n.unshift(o);
            for (var i = 0, s = 0; s < n.length; s++) i += n[s].value.length;
            for (;i.length >= 40; ) {
                var c = n[n.length - 1];
                1 == c.value.length ? n.pop() : c.value.pop();
            }
            try {
                wx.setStorageSync(t, n);
            } catch (e) {
                console.error(e);
            }
        },
        getTrackStorage: function() {
            try {
                return wx.getStorageSync(t);
            } catch (e) {
                console.error(e);
            }
        },
        remove: function() {
            try {
                wx.removeStorageSync(t);
            } catch (e) {
                console.error(e);
            }
        }
    };
}, function(e) {
    var t = getApp();
    e.exports = {
        checkNewUser: function(e, n) {
            t.carmen({
                api: "weapp.spotlight.account/1.0.0/newbie",
                success: function(t) {
                    return e(t ? !0 : !1);
                },
                fail: function() {
                    return n();
                }
            });
        }
    };
}, function(e) {
    function t(e) {
        return e = e.replace(/&forall;/g, "∀"), e = e.replace(/&part;/g, "∂"), e = e.replace(/&exists;/g, "∃"), 
        e = e.replace(/&empty;/g, "∅"), e = e.replace(/&nabla;/g, "∇"), e = e.replace(/&isin;/g, "∈"), 
        e = e.replace(/&notin;/g, "∉"), e = e.replace(/&ni;/g, "∋"), e = e.replace(/&prod;/g, "∏"), 
        e = e.replace(/&sum;/g, "∑"), e = e.replace(/&minus;/g, "−"), e = e.replace(/&lowast;/g, "∗"), 
        e = e.replace(/&radic;/g, "√"), e = e.replace(/&prop;/g, "∝"), e = e.replace(/&infin;/g, "∞"), 
        e = e.replace(/&ang;/g, "∠"), e = e.replace(/&and;/g, "∧"), e = e.replace(/&or;/g, "∨"), 
        e = e.replace(/&cap;/g, "∩"), e = e.replace(/&cap;/g, "∪"), e = e.replace(/&int;/g, "∫"), 
        e = e.replace(/&there4;/g, "∴"), e = e.replace(/&sim;/g, "∼"), e = e.replace(/&cong;/g, "≅"), 
        e = e.replace(/&asymp;/g, "≈"), e = e.replace(/&ne;/g, "≠"), e = e.replace(/&le;/g, "≤"), 
        e = e.replace(/&ge;/g, "≥"), e = e.replace(/&sub;/g, "⊂"), e = e.replace(/&sup;/g, "⊃"), 
        e = e.replace(/&nsub;/g, "⊄"), e = e.replace(/&sube;/g, "⊆"), e = e.replace(/&supe;/g, "⊇"), 
        e = e.replace(/&oplus;/g, "⊕"), e = e.replace(/&otimes;/g, "⊗"), e = e.replace(/&perp;/g, "⊥"), 
        e = e.replace(/&sdot;/g, "⋅");
    }
    function n(e) {
        return e = e.replace(/&Alpha;/g, "Α"), e = e.replace(/&Beta;/g, "Β"), e = e.replace(/&Gamma;/g, "Γ"), 
        e = e.replace(/&Delta;/g, "Δ"), e = e.replace(/&Epsilon;/g, "Ε"), e = e.replace(/&Zeta;/g, "Ζ"), 
        e = e.replace(/&Eta;/g, "Η"), e = e.replace(/&Theta;/g, "Θ"), e = e.replace(/&Iota;/g, "Ι"), 
        e = e.replace(/&Kappa;/g, "Κ"), e = e.replace(/&Lambda;/g, "Λ"), e = e.replace(/&Mu;/g, "Μ"), 
        e = e.replace(/&Nu;/g, "Ν"), e = e.replace(/&Xi;/g, "Ν"), e = e.replace(/&Omicron;/g, "Ο"), 
        e = e.replace(/&Pi;/g, "Π"), e = e.replace(/&Rho;/g, "Ρ"), e = e.replace(/&Sigma;/g, "Σ"), 
        e = e.replace(/&Tau;/g, "Τ"), e = e.replace(/&Upsilon;/g, "Υ"), e = e.replace(/&Phi;/g, "Φ"), 
        e = e.replace(/&Chi;/g, "Χ"), e = e.replace(/&Psi;/g, "Ψ"), e = e.replace(/&Omega;/g, "Ω"), 
        e = e.replace(/&alpha;/g, "α"), e = e.replace(/&beta;/g, "β"), e = e.replace(/&gamma;/g, "γ"), 
        e = e.replace(/&delta;/g, "δ"), e = e.replace(/&epsilon;/g, "ε"), e = e.replace(/&zeta;/g, "ζ"), 
        e = e.replace(/&eta;/g, "η"), e = e.replace(/&theta;/g, "θ"), e = e.replace(/&iota;/g, "ι"), 
        e = e.replace(/&kappa;/g, "κ"), e = e.replace(/&lambda;/g, "λ"), e = e.replace(/&mu;/g, "μ"), 
        e = e.replace(/&nu;/g, "ν"), e = e.replace(/&xi;/g, "ξ"), e = e.replace(/&omicron;/g, "ο"), 
        e = e.replace(/&pi;/g, "π"), e = e.replace(/&rho;/g, "ρ"), e = e.replace(/&sigmaf;/g, "ς"), 
        e = e.replace(/&sigma;/g, "σ"), e = e.replace(/&tau;/g, "τ"), e = e.replace(/&upsilon;/g, "υ"), 
        e = e.replace(/&phi;/g, "φ"), e = e.replace(/&chi;/g, "χ"), e = e.replace(/&psi;/g, "ψ"), 
        e = e.replace(/&omega;/g, "ω"), e = e.replace(/&thetasym;/g, "ϑ"), e = e.replace(/&upsih;/g, "ϒ"), 
        e = e.replace(/&piv;/g, "ϖ"), e = e.replace(/&middot;/g, "·");
    }
    function a(e) {
        return e = e.replace(/&nbsp;/g, " "), e = e.replace(/&quot;/g, "'"), e = e.replace(/&amp;/g, "&"), 
        e = e.replace(/&lt;/g, "<"), e = e.replace(/&gt;/g, ">"), e = e.replace(/&#8226;/g, "•");
    }
    function o(e) {
        return e = e.replace(/&OElig;/g, "Œ"), e = e.replace(/&oelig;/g, "œ"), e = e.replace(/&Scaron;/g, "Š"), 
        e = e.replace(/&scaron;/g, "š"), e = e.replace(/&Yuml;/g, "Ÿ"), e = e.replace(/&fnof;/g, "ƒ"), 
        e = e.replace(/&circ;/g, "ˆ"), e = e.replace(/&tilde;/g, "˜"), e = e.replace(/&ensp;/g, ""), 
        e = e.replace(/&emsp;/g, ""), e = e.replace(/&thinsp;/g, ""), e = e.replace(/&zwnj;/g, ""), 
        e = e.replace(/&zwj;/g, ""), e = e.replace(/&lrm;/g, ""), e = e.replace(/&rlm;/g, ""), 
        e = e.replace(/&ndash;/g, "–"), e = e.replace(/&mdash;/g, "—"), e = e.replace(/&lsquo;/g, "‘"), 
        e = e.replace(/&rsquo;/g, "’"), e = e.replace(/&sbquo;/g, "‚"), e = e.replace(/&ldquo;/g, "“"), 
        e = e.replace(/&rdquo;/g, "”"), e = e.replace(/&bdquo;/g, "„"), e = e.replace(/&dagger;/g, "†"), 
        e = e.replace(/&Dagger;/g, "‡"), e = e.replace(/&bull;/g, "•"), e = e.replace(/&hellip;/g, "…"), 
        e = e.replace(/&permil;/g, "‰"), e = e.replace(/&prime;/g, "′"), e = e.replace(/&Prime;/g, "″"), 
        e = e.replace(/&lsaquo;/g, "‹"), e = e.replace(/&rsaquo;/g, "›"), e = e.replace(/&oline;/g, "‾"), 
        e = e.replace(/&euro;/g, "€"), e = e.replace(/&trade;/g, "™"), e = e.replace(/&larr;/g, "←"), 
        e = e.replace(/&uarr;/g, "↑"), e = e.replace(/&rarr;/g, "→"), e = e.replace(/&darr;/g, "↓"), 
        e = e.replace(/&harr;/g, "↔"), e = e.replace(/&crarr;/g, "↵"), e = e.replace(/&lceil;/g, "⌈"), 
        e = e.replace(/&rceil;/g, "⌉"), e = e.replace(/&lfloor;/g, "⌊"), e = e.replace(/&rfloor;/g, "⌋"), 
        e = e.replace(/&loz;/g, "◊"), e = e.replace(/&spades;/g, "♠"), e = e.replace(/&clubs;/g, "♣"), 
        e = e.replace(/&hearts;/g, "♥"), e = e.replace(/&diams;/g, "♦"), e = e.replace(/&#39;/g, "'");
    }
    function r(e) {
        return e = e.replace(/\r\n/g, ""), e = e.replace(/\n/g, ""), e = e.replace(/code/g, "wxxxcode-style");
    }
    e.exports = {
        strDiscode: function(e) {
            return e = t(e), e = n(e), e = a(e), e = o(e), e = r(e);
        },
        urlToHttpUrl: function(e, t) {
            return /^\/\//.test(e) && (e = t + ":" + e), e;
        }
    };
}, function(e) {
    e.exports = {
        getSteps: function(e, t, n) {
            var a = [];
            switch (e) {
              case 3:
              case 4:
                a = t ? n ? [ {
                    done: !1,
                    current: !0,
                    text: "买家下单"
                }, {
                    done: !1,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !1,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : [ {
                    done: !1,
                    current: !0,
                    text: "买家下单"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !1,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : n ? [ {
                    done: !1,
                    current: !1,
                    text: "买家付款"
                }, {
                    done: !1,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家发货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : [ {
                    done: !1,
                    current: !1,
                    text: "买家付款"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家发货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ];
                break;

              case 50:
                n && (a = [ {
                    done: !0,
                    current: !0,
                    text: "买家付款"
                }, {
                    done: !1,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家发货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ]);
                break;

              case 5:
                a = t ? n ? [ {
                    done: !0,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !0,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !0,
                    current: !0,
                    text: "商家接单"
                }, {
                    done: !1,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : [ {
                    done: !0,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !0,
                    current: !0,
                    text: "商家接单"
                }, {
                    done: !1,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : n ? [ {
                    done: !0,
                    current: !1,
                    text: "买家付款"
                }, {
                    done: !0,
                    current: !0,
                    text: "已成团"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家发货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : [ {
                    done: !0,
                    current: !0,
                    text: "买家付款"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家发货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ];
                break;

              case 6:
                a = t ? n ? [ {
                    done: !0,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !0,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !0,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !0,
                    current: !0,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : [ {
                    done: !0,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !0,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !0,
                    current: !0,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : n ? [ {
                    done: !0,
                    current: !1,
                    text: "买家付款"
                }, {
                    done: !0,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !0,
                    current: !0,
                    text: "商家发货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : [ {
                    done: !0,
                    current: !1,
                    text: "买家付款"
                }, {
                    done: !0,
                    current: !0,
                    text: "商家发货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ];
                break;

              case 8:
              case 100:
                a = t ? n ? [ {
                    done: !0,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !0,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !0,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !0,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !0,
                    current: !0,
                    text: "交易完成"
                } ] : [ {
                    done: !0,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !0,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !0,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !0,
                    current: !0,
                    text: "交易完成"
                } ] : n ? [ {
                    done: !0,
                    current: !1,
                    text: "买家付款"
                }, {
                    done: !0,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !0,
                    current: !1,
                    text: "商家发货"
                }, {
                    done: !0,
                    current: !0,
                    text: "交易完成"
                } ] : [ {
                    done: !0,
                    current: !1,
                    text: "买家付款"
                }, {
                    done: !0,
                    current: !1,
                    text: "商家发货"
                }, {
                    done: !0,
                    current: !0,
                    text: "交易完成"
                } ];
                break;

              default:
                t && (a = n ? [ {
                    done: !1,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !1,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !1,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : [ {
                    done: !1,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !1,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ]);
            }
            return a;
        }
    };
}, function(e) {
    var t = {
        laterReceive: function(e, t) {
            n.carmen({
                api: "trade.order.state/1.0.0/orderLaterReceive",
                data: e,
                success: function() {
                    t.success && t.success();
                },
                fail: function(e) {
                    t.fail && t.fail(e);
                }
            });
        },
        confirmReceive: function(e, t) {
            n.carmen({
                api: "trade.order.state/1.0.0/confirmReceive",
                data: e,
                success: function() {
                    t.success && t.success();
                },
                fail: function(e) {
                    t.fail && t.fail(e);
                }
            });
        }
    }, n = getApp();
    e.exports = function(e) {
        var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}, o = t[e];
        o && o(n, a);
    };
}, , , , , , , , , , , , , , function(e, t, n) {
    e.exports = n(177);
}, function(t, n, a) {
    var o = "object" == ("undefined" == typeof global ? "undefined" : e(global)) ? global : "object" == ("undefined" == typeof window ? "undefined" : e(window)) ? window : "object" == ("undefined" == typeof self ? "undefined" : e(self)) ? self : this, r = o.regeneratorRuntime && 0 <= Object.getOwnPropertyNames(o).indexOf("regeneratorRuntime"), i = r && o.regeneratorRuntime;
    if (o.regeneratorRuntime = void 0, t.exports = a(178), r) o.regeneratorRuntime = i; else try {
        delete o.regeneratorRuntime;
    } catch (n) {
        o.regeneratorRuntime = void 0;
    }
}, function(t, n, a) {
    (function(n) {
        !function(a) {
            function o(e, t, n, a) {
                var o = t && t.prototype instanceof i ? t : i, r = Object.create(o.prototype), s = new g(a || []);
                return r._invoke = d(e, n, s), r;
            }
            function r(e, t, n) {
                try {
                    return {
                        type: "normal",
                        arg: e.call(t, n)
                    };
                } catch (e) {
                    return {
                        type: "throw",
                        arg: e
                    };
                }
            }
            function i() {}
            function s() {}
            function c() {}
            function u(e) {
                [ "next", "throw", "return" ].forEach(function(t) {
                    e[t] = function(e) {
                        return this._invoke(t, e);
                    };
                });
            }
            function l(t) {
                function a(n, o, i, s) {
                    var c = r(t[n], t, o);
                    if ("throw" !== c.type) {
                        var u = c.arg, l = u.value;
                        return l && "object" == (void 0 === l ? "undefined" : e(l)) && _.call(l, "__await") ? Promise.resolve(l.__await).then(function(e) {
                            a("next", e, i, s);
                        }, function(e) {
                            a("throw", e, i, s);
                        }) : Promise.resolve(l).then(function(e) {
                            u.value = e, i(u);
                        }, s);
                    }
                    s(c.arg);
                }
                "object" == (void 0 === n ? "undefined" : e(n)) && n.domain && (a = n.domain.bind(a));
                var o;
                this._invoke = function(e, t) {
                    function n() {
                        return new Promise(function(n, o) {
                            a(e, t, n, o);
                        });
                    }
                    return o = o ? o.then(n, n) : n();
                };
            }
            function d(e, t, n) {
                var a = D;
                return function(o, i) {
                    if (a === I) throw new Error("Generator is already running");
                    if (a === C) {
                        if ("throw" === o) throw i;
                        return {
                            value: void 0,
                            done: !0
                        };
                    }
                    for (n.method = o, n.arg = i; ;) {
                        var s = n.delegate;
                        if (s) {
                            var c = f(s, n);
                            if (c) {
                                if (c === F) continue;
                                return c;
                            }
                        }
                        if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                            if (a === D) throw a = C, n.arg;
                            n.dispatchException(n.arg);
                        } else "return" === n.method && n.abrupt("return", n.arg);
                        a = I;
                        var u = r(e, t, n);
                        if ("normal" === u.type) {
                            if (a = n.done ? C : k, u.arg === F) continue;
                            return {
                                value: u.arg,
                                done: n.done
                            };
                        }
                        "throw" === u.type && (a = C, n.method = "throw", n.arg = u.arg);
                    }
                };
            }
            function f(e, t) {
                var n = e.iterator[t.method];
                if (void 0 === n) {
                    if (t.delegate = null, "throw" === t.method) {
                        if (e.iterator.return && (t.method = "return", t.arg = void 0, f(e, t), "throw" === t.method)) return F;
                        t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method");
                    }
                    return F;
                }
                var a = r(n, e.iterator, t.arg);
                if ("throw" === a.type) return t.method = "throw", t.arg = a.arg, t.delegate = null, 
                F;
                var o = a.arg;
                return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", 
                t.arg = void 0), t.delegate = null, F) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), 
                t.delegate = null, F);
            }
            function p(e) {
                var t = {
                    tryLoc: e[0]
                };
                1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), 
                this.tryEntries.push(t);
            }
            function h(e) {
                var t = e.completion || {};
                t.type = "normal", delete t.arg, e.completion = t;
            }
            function g(e) {
                this.tryEntries = [ {
                    tryLoc: "root"
                } ], e.forEach(p, this), this.reset(!0);
            }
            function m(e) {
                if (e) {
                    var t = e[x];
                    if (t) return t.call(e);
                    if ("function" == typeof e.next) return e;
                    if (!isNaN(e.length)) {
                        var n = -1, a = function t() {
                            for (;++n < e.length; ) if (_.call(e, n)) return t.value = e[n], t.done = !1, t;
                            return t.value = void 0, t.done = !0, t;
                        };
                        return a.next = a;
                    }
                }
                return {
                    next: v
                };
            }
            function v() {
                return {
                    value: void 0,
                    done: !0
                };
            }
            var y = Object.prototype, _ = y.hasOwnProperty, w = "function" == typeof Symbol ? Symbol : {}, x = w.iterator || "@@iterator", b = w.toStringTag || "@@toStringTag", S = "object" == (void 0 === t ? "undefined" : e(t)), T = a.regeneratorRuntime;
            if (T) S && (t.exports = T); else {
                (T = a.regeneratorRuntime = S ? t.exports : {}).wrap = o;
                var D = "suspendedStart", k = "suspendedYield", I = "executing", C = "completed", F = {}, P = {};
                P[x] = function() {
                    return this;
                };
                var A = Object.getPrototypeOf, O = A && A(A(m([])));
                O && O !== y && _.call(O, x) && (P = O);
                var z = c.prototype = i.prototype = Object.create(P);
                s.prototype = z.constructor = c, c.constructor = s, c[b] = s.displayName = "GeneratorFunction", 
                T.isGeneratorFunction = function(e) {
                    var t = "function" == typeof e && e.constructor;
                    return !!t && (t === s || "GeneratorFunction" === (t.displayName || t.name));
                }, T.mark = function(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, c) : (e.__proto__ = c, !(b in e) && (e[b] = "GeneratorFunction")), 
                    e.prototype = Object.create(z), e;
                }, T.awrap = function(e) {
                    return {
                        __await: e
                    };
                }, u(l.prototype), T.AsyncIterator = l, T.async = function(e, t, n, a) {
                    var r = new l(o(e, t, n, a));
                    return T.isGeneratorFunction(t) ? r : r.next().then(function(e) {
                        return e.done ? e.value : r.next();
                    });
                }, u(z), z[b] = "Generator", z.toString = function() {
                    return "[object Generator]";
                }, T.keys = function(e) {
                    var t = [];
                    for (var n in e) t.push(n);
                    return t.reverse(), function n() {
                        for (;t.length; ) {
                            var a = t.pop();
                            if (a in e) return n.value = a, n.done = !1, n;
                        }
                        return n.done = !0, n;
                    };
                }, T.values = m, g.prototype = {
                    constructor: g,
                    reset: function(e) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, 
                        this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(h), 
                        !e) for (var t in this) "t" === t.charAt(0) && _.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0);
                    },
                    stop: function() {
                        this.done = !0;
                        var e = this.tryEntries[0].completion;
                        if ("throw" === e.type) throw e.arg;
                        return this.rval;
                    },
                    dispatchException: function(e) {
                        function t(t, a) {
                            return r.type = "throw", r.arg = e, n.next = t, a && (n.method = "next", n.arg = void 0), 
                            !!a;
                        }
                        if (this.done) throw e;
                        for (var n = this, a = this.tryEntries.length - 1; 0 <= a; --a) {
                            var o = this.tryEntries[a], r = o.completion;
                            if ("root" === o.tryLoc) return t("end");
                            if (o.tryLoc <= this.prev) {
                                var i = _.call(o, "catchLoc"), s = _.call(o, "finallyLoc");
                                if (i && s) {
                                    if (this.prev < o.catchLoc) return t(o.catchLoc, !0);
                                    if (this.prev < o.finallyLoc) return t(o.finallyLoc);
                                } else if (i) {
                                    if (this.prev < o.catchLoc) return t(o.catchLoc, !0);
                                } else {
                                    if (!s) throw new Error("try statement without catch or finally");
                                    if (this.prev < o.finallyLoc) return t(o.finallyLoc);
                                }
                            }
                        }
                    },
                    abrupt: function(e, t) {
                        for (var n, a = this.tryEntries.length - 1; 0 <= a; --a) if ((n = this.tryEntries[a]).tryLoc <= this.prev && _.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                            var o = n;
                            break;
                        }
                        o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
                        var r = o ? o.completion : {};
                        return r.type = e, r.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, 
                        F) : this.complete(r);
                    },
                    complete: function(e, t) {
                        if ("throw" === e.type) throw e.arg;
                        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, 
                        this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), 
                        F;
                    },
                    finish: function(e) {
                        for (var t, n = this.tryEntries.length - 1; 0 <= n; --n) if ((t = this.tryEntries[n]).finallyLoc === e) return this.complete(t.completion, t.afterLoc), 
                        h(t), F;
                    },
                    catch: function(e) {
                        for (var t, n = this.tryEntries.length - 1; 0 <= n; --n) if ((t = this.tryEntries[n]).tryLoc === e) {
                            var a = t.completion;
                            if ("throw" === a.type) {
                                var o = a.arg;
                                h(t);
                            }
                            return o;
                        }
                        throw new Error("illegal catch attempt");
                    },
                    delegateYield: function(e, t, n) {
                        return this.delegate = {
                            iterator: m(e),
                            resultName: t,
                            nextLoc: n
                        }, "next" === this.method && (this.arg = void 0), F;
                    }
                };
            }
        }("object" == ("undefined" == typeof global ? "undefined" : e(global)) ? global : "object" == ("undefined" == typeof window ? "undefined" : e(window)) ? window : "object" == ("undefined" == typeof self ? "undefined" : e(self)) ? self : this);
    }).call(n, a(179));
}, function(e) {
    function t() {
        throw new Error("setTimeout has not been defined");
    }
    function n() {
        throw new Error("clearTimeout has not been defined");
    }
    function a(e) {
        if (u === setTimeout) return setTimeout(e, 0);
        if ((u === t || !u) && setTimeout) return u = setTimeout, setTimeout(e, 0);
        try {
            return u(e, 0);
        } catch (t) {
            try {
                return u.call(null, e, 0);
            } catch (t) {
                return u.call(this, e, 0);
            }
        }
    }
    function o(e) {
        if (l === clearTimeout) return clearTimeout(e);
        if ((l === n || !l) && clearTimeout) return l = clearTimeout, clearTimeout(e);
        try {
            return l(e);
        } catch (t) {
            try {
                return l.call(null, e);
            } catch (t) {
                return l.call(this, e);
            }
        }
    }
    function r() {
        h && f && (h = !1, f.length ? p = f.concat(p) : g = -1, p.length && i());
    }
    function i() {
        if (!h) {
            var e = a(r);
            h = !0;
            for (var t = p.length; t; ) {
                for (f = p, p = []; ++g < t; ) f && f[g].run();
                g = -1, t = p.length;
            }
            f = null, h = !1, o(e);
        }
    }
    function s(e, t) {
        this.fun = e, this.array = t;
    }
    function c() {}
    var u, l, d = e.exports = {};
    !function() {
        try {
            u = "function" == typeof setTimeout ? setTimeout : t;
        } catch (e) {
            u = t;
        }
        try {
            l = "function" == typeof clearTimeout ? clearTimeout : n;
        } catch (e) {
            l = n;
        }
    }();
    var f, p = [], h = !1, g = -1;
    d.nextTick = function(e) {
        var t = Array(arguments.length - 1);
        if (1 < arguments.length) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        p.push(new s(e, t)), 1 !== p.length || h || a(i);
    }, s.prototype.run = function() {
        this.fun.apply(null, this.array);
    }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", 
    d.versions = {}, d.on = c, d.addListener = c, d.once = c, d.off = c, d.removeListener = c, 
    d.removeAllListeners = c, d.emit = c, d.binding = function() {
        throw new Error("process.binding is not supported");
    }, d.cwd = function() {
        return "/";
    }, d.chdir = function() {
        throw new Error("process.chdir is not supported");
    }, d.umask = function() {
        return 0;
    };
}, function() {
    Array.prototype.find || (Array.prototype.find = function(e) {
        if (null == this) throw new TypeError("Array.prototype.find called on null or undefined");
        if ("function" != typeof e) throw new TypeError("predicate must be a function");
        for (var t, n = Object(this), a = n.length >>> 0, o = arguments[1], r = 0; r < a; r++) if (t = n[r], 
        e.call(o, t, r, n)) return t;
    });
}, function() {
    Array.prototype.findIndex || (Array.prototype.findIndex = function(e) {
        if (null === this) throw new TypeError("Array.prototype.findIndex called on null or undefined");
        if ("function" != typeof e) throw new TypeError("predicate must be a function");
        for (var t, n = Object(this), a = n.length >>> 0, o = arguments[1], r = 0; r < a; r++) if (t = n[r], 
        e.call(o, t, r, n)) return r;
        return -1;
    });
}, function(e, t, n) {
    "function" != typeof function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(2)).default && (Object.assign = function(e) {
        if (null == e) throw new TypeError("Cannot convert undefined or null to object");
        e = Object(e);
        for (var t, n = 1; n < arguments.length; n++) if (null != (t = arguments[n])) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
        return e;
    });
}, function(e, t, n) {
    n(184), e.exports = n(9).Object.assign;
}, function(e, t, n) {
    var a = n(25);
    a(a.S + a.F, "Object", {
        assign: n(185)
    });
}, function(e, t, n) {
    var a = n(39), o = n(90), r = n(59), i = n(51), s = n(138), c = Object.assign;
    e.exports = !c || n(38)(function() {
        var e = {}, t = {}, n = Symbol(), a = "abcdefghijklmnopqrst";
        return e[n] = 7, a.split("").forEach(function(e) {
            t[e] = e;
        }), 7 != c({}, e)[n] || Object.keys(c({}, t)).join("") != a;
    }) ? function(e) {
        for (var t = i(e), n = arguments.length, c = 1, u = o.f, l = r.f; n > c; ) for (var d, f = s(arguments[c++]), p = u ? a(f).concat(u(f)) : a(f), h = p.length, g = 0; h > g; ) l.call(f, d = p[g++]) && (t[d] = f[d]);
        return t;
    } : c;
}, function(e, t, n) {
    var a = n(35), o = n(85), r = n(187);
    e.exports = function(e) {
        return function(t, n, i) {
            var s, c = a(t), u = o(c.length), l = r(i, u);
            if (e && n != n) {
                for (;u > l; ) if ((s = c[l++]) != s) return !0;
            } else for (;u > l; l++) if ((e || l in c) && c[l] === n) return e || l || 0;
            return !e && -1;
        };
    };
}, function(e, t, n) {
    var a = n(86), o = Math.max, r = Math.min;
    e.exports = function(e, t) {
        return 0 > (e = a(e)) ? o(e + t, 0) : r(e, t);
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var o = a(n(27));
    a(n(14)).default || (Object.keys = function() {
        var e = Object.prototype.hasOwnProperty, t = !{
            toString: null
        }.propertyIsEnumerable("toString"), n = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ], a = n.length;
        return function(r) {
            if ("object" !== (void 0 === r ? "undefined" : (0, o.default)(r)) && "function" != typeof r || null === r) throw new TypeError("Object.keys called on non-object");
            var i = [];
            for (var s in r) e.call(r, s) && i.push(s);
            if (t) for (var c = 0; c < a; c++) e.call(r, n[c]) && i.push(n[c]);
            return i;
        };
    }());
}, function(e, t, n) {
    e.exports = {
        default: n(190),
        __esModule: !0
    };
}, function(e, t, n) {
    n(60), n(92), e.exports = n(93).f("iterator");
}, function(e, t, n) {
    var a = n(86), o = n(84);
    e.exports = function(e) {
        return function(t, n) {
            var r, i, s = o(t) + "", c = a(n), u = s.length;
            return 0 > c || c >= u ? e ? "" : void 0 : 55296 > (r = s.charCodeAt(c)) || 56319 < r || c + 1 === u || 56320 > (i = s.charCodeAt(c + 1)) || 57343 < i ? e ? s.charAt(c) : r : e ? s.slice(c, c + 2) : i - 56320 + (r - 55296 << 10) + 65536;
        };
    };
}, function(e, t, n) {
    var a = n(91), o = n(49), r = n(62), i = {};
    n(32)(i, n(13)("iterator"), function() {
        return this;
    }), e.exports = function(e, t, n) {
        e.prototype = a(i, {
            next: o(1, n)
        }), r(e, t + " Iterator");
    };
}, function(e, t, n) {
    var a = n(26), o = n(22), r = n(39);
    e.exports = n(33) ? Object.defineProperties : function(e, t) {
        o(e);
        for (var n, i = r(t), s = i.length, c = 0; s > c; ) a.f(e, n = i[c++], t[n]);
        return e;
    };
}, function(e, t, n) {
    var a = n(195), o = n(196), r = n(52), i = n(35);
    e.exports = n(139)(Array, "Array", function(e, t) {
        this._t = i(e), this._i = 0, this._k = t;
    }, function() {
        var e = this._t, t = this._k, n = this._i++;
        return !e || n >= e.length ? (this._t = void 0, o(1)) : "keys" == t ? o(0, n) : "values" == t ? o(0, e[n]) : o(0, [ n, e[n] ]);
    }, "values"), r.Arguments = r.Array, a("keys"), a("values"), a("entries");
}, function(e) {
    e.exports = function() {};
}, function(e) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        };
    };
}, function(e, t, n) {
    n(198), n(146), n(204), n(205), e.exports = n(9).Symbol;
}, function(t, n, a) {
    var o = a(16), r = a(34), i = a(33), s = a(25), c = a(140), u = a(199).KEY, l = a(38), d = a(88), f = a(62), p = a(58), h = a(13), g = a(93), m = a(94), v = a(200), y = a(201), _ = a(202), w = a(22), x = a(35), b = a(83), S = a(49), T = a(91), D = a(203), k = a(145), I = a(26), C = a(39), F = k.f, P = I.f, A = D.f, O = o.Symbol, z = o.JSON, M = z && z.stringify, E = "prototype", L = h("_hidden"), j = h("toPrimitive"), U = {}.propertyIsEnumerable, N = d("symbol-registry"), G = d("symbols"), q = d("op-symbols"), R = Object[E], B = "function" == typeof O, Z = o.QObject, K = !Z || !Z[E] || !Z[E].findChild, H = i && l(function() {
        return 7 != T(P({}, "a", {
            get: function() {
                return P(this, "a", {
                    value: 7
                }).a;
            }
        })).a;
    }) ? function(e, t, n) {
        var a = F(R, t);
        a && delete R[t], P(e, t, n), a && e !== R && P(R, t, a);
    } : P, Y = function(e) {
        var t = G[e] = T(O[E]);
        return t._k = e, t;
    }, V = B && "symbol" == e(O.iterator) ? function(t) {
        return "symbol" == (void 0 === t ? "undefined" : e(t));
    } : function(e) {
        return e instanceof O;
    }, W = function e(t, n, a) {
        return t === R && e(q, n, a), w(t), n = b(n, !0), w(a), r(G, n) ? (a.enumerable ? (r(t, L) && t[L][n] && (t[L][n] = !1), 
        a = T(a, {
            enumerable: S(0, !1)
        })) : (!r(t, L) && P(t, L, S(1, {})), t[L][n] = !0), H(t, n, a)) : P(t, n, a);
    }, J = function(e, t) {
        w(e);
        for (var n, a = y(t = x(t)), o = 0, r = a.length; r > o; ) W(e, n = a[o++], t[n]);
        return e;
    }, Q = function(e) {
        var t = U.call(this, e = b(e, !0));
        return (this !== R || !r(G, e) || r(q, e)) && (!(t || !r(this, e) || !r(G, e) || r(this, L) && this[L][e]) || t);
    }, X = function(e, t) {
        if (e = x(e), t = b(t, !0), e !== R || !r(G, t) || r(q, t)) {
            var n = F(e, t);
            return n && r(G, t) && !(r(e, L) && e[L][t]) && (n.enumerable = !0), n;
        }
    }, $ = function(e) {
        for (var t, n = A(x(e)), a = [], o = 0; n.length > o; ) r(G, t = n[o++]) || t == L || t == u || a.push(t);
        return a;
    }, ee = function(e) {
        for (var t, n = e === R, a = A(n ? q : x(e)), o = [], i = 0; a.length > i; ) r(G, t = a[i++]) && (!n || r(R, t)) && o.push(G[t]);
        return o;
    };
    B || (O = function() {
        if (this instanceof O) throw TypeError("Symbol is not a constructor!");
        var e = p(0 < arguments.length ? arguments[0] : void 0);
        return i && K && H(R, e, {
            configurable: !0,
            set: function t(n) {
                this === R && t.call(q, n), r(this, L) && r(this[L], e) && (this[L][e] = !1), H(this, e, S(1, n));
            }
        }), Y(e);
    }, c(O[E], "toString", function() {
        return this._k;
    }), k.f = X, I.f = W, a(144).f = D.f = $, a(59).f = Q, a(90).f = ee, i && !a(61) && c(R, "propertyIsEnumerable", Q, !0), 
    g.f = function(e) {
        return Y(h(e));
    }), s(s.G + s.W + s.F * !B, {
        Symbol: O
    });
    for (var te = [ "hasInstance", "isConcatSpreadable", "iterator", "match", "replace", "search", "species", "split", "toPrimitive", "toStringTag", "unscopables" ], ne = 0; te.length > ne; ) h(te[ne++]);
    for (var te = C(h.store), ne = 0; te.length > ne; ) m(te[ne++]);
    s(s.S + s.F * !B, "Symbol", {
        for: function(e) {
            return r(N, e += "") ? N[e] : N[e] = O(e);
        },
        keyFor: function(e) {
            if (V(e)) return v(N, e);
            throw TypeError(e + " is not a symbol!");
        },
        useSetter: function() {
            K = !0;
        },
        useSimple: function() {
            K = !1;
        }
    }), s(s.S + s.F * !B, "Object", {
        create: function(e, t) {
            return void 0 === t ? T(e) : J(T(e), t);
        },
        defineProperty: W,
        defineProperties: J,
        getOwnPropertyDescriptor: X,
        getOwnPropertyNames: $,
        getOwnPropertySymbols: ee
    }), z && s(s.S + s.F * (!B || l(function() {
        var e = O();
        return "[null]" != M([ e ]) || "{}" != M({
            a: e
        }) || "{}" != M(Object(e));
    })), "JSON", {
        stringify: function(e) {
            if (void 0 !== e && !V(e)) {
                for (var t, n, a = [ e ], o = 1; arguments.length > o; ) a.push(arguments[o++]);
                return "function" == typeof (t = a[1]) && (n = t), (n || !_(t)) && (t = function(e, t) {
                    if (n && (t = n.call(this, e, t)), !V(t)) return t;
                }), a[1] = t, M.apply(z, a);
            }
        }
    }), O[E][j] || a(32)(O[E], j, O[E].valueOf), f(O, "Symbol"), f(Math, "Math", !0), 
    f(o.JSON, "JSON", !0);
}, function(t, n, a) {
    var o = a(58)("meta"), r = a(37), i = a(34), s = a(26).f, c = 0, u = Object.isExtensible || function() {
        return !0;
    }, l = !a(38)(function() {
        return u(Object.preventExtensions({}));
    }), d = function(e) {
        s(e, o, {
            value: {
                i: "O" + ++c,
                w: {}
            }
        });
    }, f = t.exports = {
        KEY: o,
        NEED: !1,
        fastKey: function(t, n) {
            if (!r(t)) return "symbol" == (void 0 === t ? "undefined" : e(t)) ? t : ("string" == typeof t ? "S" : "P") + t;
            if (!i(t, o)) {
                if (!u(t)) return "F";
                if (!n) return "E";
                d(t);
            }
            return t[o].i;
        },
        getWeak: function(e, t) {
            if (!i(e, o)) {
                if (!u(e)) return !0;
                if (!t) return !1;
                d(e);
            }
            return e[o].w;
        },
        onFreeze: function(e) {
            return l && f.NEED && u(e) && !i(e, o) && d(e), e;
        }
    };
}, function(e, t, n) {
    var a = n(39), o = n(35);
    e.exports = function(e, t) {
        for (var n, r = o(e), i = a(r), s = i.length, c = 0; s > c; ) if (r[n = i[c++]] === t) return n;
    };
}, function(e, t, n) {
    var a = n(39), o = n(90), r = n(59);
    e.exports = function(e) {
        var t = a(e), n = o.f;
        if (n) for (var i, s = n(e), c = r.f, u = 0; s.length > u; ) c.call(e, i = s[u++]) && t.push(i);
        return t;
    };
}, function(e, t, n) {
    var a = n(50);
    e.exports = Array.isArray || function(e) {
        return "Array" == a(e);
    };
}, function(t, n, a) {
    var o = a(35), r = a(144).f, i = {}.toString, s = "object" == ("undefined" == typeof window ? "undefined" : e(window)) && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], c = function(e) {
        try {
            return r(e);
        } catch (e) {
            return s.slice();
        }
    };
    t.exports.f = function(e) {
        return s && "[object Window]" == i.call(e) ? c(e) : r(o(e));
    };
}, function(e, t, n) {
    n(94)("asyncIterator");
}, function(e, t, n) {
    n(94)("observable");
}, function(e, t, n) {
    n(207), e.exports = n(9).Object.keys;
}, function(e, t, n) {
    var a = n(51), o = n(39);
    n(147)("keys", function() {
        return function(e) {
            return o(a(e));
        };
    });
}, function(e, t, n) {
    (function(e) {
        function t(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var a = t(n(10)), o = t(n(219)), r = t(n(223)), i = t(n(226)), s = t(n(27)), c = t(n(143));
        !function(t) {
            function n(e, t, n, a) {
                var o = t && t.prototype instanceof l ? t : l, r = (0, i.default)(o.prototype), s = new _(a || []);
                return r._invoke = g(e, n, s), r;
            }
            function u(e, t, n) {
                try {
                    return {
                        type: "normal",
                        arg: e.call(t, n)
                    };
                } catch (e) {
                    return {
                        type: "throw",
                        arg: e
                    };
                }
            }
            function l() {}
            function d() {}
            function f() {}
            function p(e) {
                [ "next", "throw", "return" ].forEach(function(t) {
                    e[t] = function(e) {
                        return this._invoke(t, e);
                    };
                });
            }
            function h(e) {
                function t(n, o, r, i) {
                    var c = u(e[n], e, o);
                    if ("throw" !== c.type) {
                        var l = c.arg, d = l.value;
                        return d && "object" === (void 0 === d ? "undefined" : (0, s.default)(d)) && S.call(d, "__await") ? a.default.resolve(d.__await).then(function(e) {
                            t("next", e, r, i);
                        }, function(e) {
                            t("throw", e, r, i);
                        }) : a.default.resolve(d).then(function(e) {
                            l.value = e, r(l);
                        }, i);
                    }
                    i(c.arg);
                }
                var n;
                this._invoke = function(e, o) {
                    function r() {
                        return new a.default(function(n, a) {
                            t(e, o, n, a);
                        });
                    }
                    return n = n ? n.then(r, r) : r();
                };
            }
            function g(e, t, n) {
                var a = P;
                return function(o, r) {
                    if (a === O) throw new Error("Generator is already running");
                    if (a === z) {
                        if ("throw" === o) throw r;
                        return {
                            value: void 0,
                            done: !0
                        };
                    }
                    for (n.method = o, n.arg = r; ;) {
                        var i = n.delegate;
                        if (i) {
                            var s = m(i, n);
                            if (s) {
                                if (s === M) continue;
                                return s;
                            }
                        }
                        if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                            if (a === P) throw a = z, n.arg;
                            n.dispatchException(n.arg);
                        } else "return" === n.method && n.abrupt("return", n.arg);
                        a = O;
                        var c = u(e, t, n);
                        if ("normal" === c.type) {
                            if (a = n.done ? z : A, c.arg === M) continue;
                            return {
                                value: c.arg,
                                done: n.done
                            };
                        }
                        "throw" === c.type && (a = z, n.method = "throw", n.arg = c.arg);
                    }
                };
            }
            function m(e, t) {
                var n = e.iterator[t.method];
                if (void 0 === n) {
                    if (t.delegate = null, "throw" === t.method) {
                        if (e.iterator.return && (t.method = "return", t.arg = void 0, m(e, t), "throw" === t.method)) return M;
                        t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method");
                    }
                    return M;
                }
                var a = u(n, e.iterator, t.arg);
                if ("throw" === a.type) return t.method = "throw", t.arg = a.arg, t.delegate = null, 
                M;
                var o = a.arg;
                return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", 
                t.arg = void 0), t.delegate = null, M) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), 
                t.delegate = null, M);
            }
            function v(e) {
                var t = {
                    tryLoc: e[0]
                };
                1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), 
                this.tryEntries.push(t);
            }
            function y(e) {
                var t = e.completion || {};
                t.type = "normal", delete t.arg, e.completion = t;
            }
            function _(e) {
                this.tryEntries = [ {
                    tryLoc: "root"
                } ], e.forEach(v, this), this.reset(!0);
            }
            function w(e) {
                if (e) {
                    var t = e[D];
                    if (t) return t.call(e);
                    if ("function" == typeof e.next) return e;
                    if (!isNaN(e.length)) {
                        var n = -1, a = function t() {
                            for (;++n < e.length; ) if (S.call(e, n)) return t.value = e[n], t.done = !1, t;
                            return t.value = void 0, t.done = !0, t;
                        };
                        return a.next = a;
                    }
                }
                return {
                    next: x
                };
            }
            function x() {
                return {
                    value: void 0,
                    done: !0
                };
            }
            var b = Object.prototype, S = b.hasOwnProperty, T = "function" == typeof c.default ? c.default : {}, D = T.iterator || "@@iterator", k = T.asyncIterator || "@@asyncIterator", I = T.toStringTag || "@@toStringTag", C = "object" === (0, 
            s.default)(e), F = t.regeneratorRuntime;
            if (F) C && (e.exports = F); else {
                (F = t.regeneratorRuntime = C ? e.exports : {}).wrap = n;
                var P = "suspendedStart", A = "suspendedYield", O = "executing", z = "completed", M = {}, E = {};
                E[D] = function() {
                    return this;
                };
                var L = r.default, j = L && L(L(w([])));
                j && j !== b && S.call(j, D) && (E = j);
                var U = f.prototype = l.prototype = (0, i.default)(E);
                d.prototype = U.constructor = f, f.constructor = d, f[I] = d.displayName = "GeneratorFunction", 
                F.isGeneratorFunction = function(e) {
                    var t = "function" == typeof e && e.constructor;
                    return !!t && (t === d || "GeneratorFunction" === (t.displayName || t.name));
                }, F.mark = function(e) {
                    return o.default ? (0, o.default)(e, f) : (e.__proto__ = f, !(I in e) && (e[I] = "GeneratorFunction")), 
                    e.prototype = (0, i.default)(U), e;
                }, F.awrap = function(e) {
                    return {
                        __await: e
                    };
                }, p(h.prototype), h.prototype[k] = function() {
                    return this;
                }, F.AsyncIterator = h, F.async = function(e, t, a, o) {
                    var r = new h(n(e, t, a, o));
                    return F.isGeneratorFunction(t) ? r : r.next().then(function(e) {
                        return e.done ? e.value : r.next();
                    });
                }, p(U), U[I] = "Generator", U[D] = function() {
                    return this;
                }, U.toString = function() {
                    return "[object Generator]";
                }, F.keys = function(e) {
                    var t = [];
                    for (var n in e) t.push(n);
                    return t.reverse(), function n() {
                        for (;t.length; ) {
                            var a = t.pop();
                            if (a in e) return n.value = a, n.done = !1, n;
                        }
                        return n.done = !0, n;
                    };
                }, F.values = w, _.prototype = {
                    constructor: _,
                    reset: function(e) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, 
                        this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(y), 
                        !e) for (var t in this) "t" === t.charAt(0) && S.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0);
                    },
                    stop: function() {
                        this.done = !0;
                        var e = this.tryEntries[0].completion;
                        if ("throw" === e.type) throw e.arg;
                        return this.rval;
                    },
                    dispatchException: function(e) {
                        function t(t, a) {
                            return r.type = "throw", r.arg = e, n.next = t, a && (n.method = "next", n.arg = void 0), 
                            !!a;
                        }
                        if (this.done) throw e;
                        for (var n = this, a = this.tryEntries.length - 1; 0 <= a; --a) {
                            var o = this.tryEntries[a], r = o.completion;
                            if ("root" === o.tryLoc) return t("end");
                            if (o.tryLoc <= this.prev) {
                                var i = S.call(o, "catchLoc"), s = S.call(o, "finallyLoc");
                                if (i && s) {
                                    if (this.prev < o.catchLoc) return t(o.catchLoc, !0);
                                    if (this.prev < o.finallyLoc) return t(o.finallyLoc);
                                } else if (i) {
                                    if (this.prev < o.catchLoc) return t(o.catchLoc, !0);
                                } else {
                                    if (!s) throw new Error("try statement without catch or finally");
                                    if (this.prev < o.finallyLoc) return t(o.finallyLoc);
                                }
                            }
                        }
                    },
                    abrupt: function(e, t) {
                        for (var n, a = this.tryEntries.length - 1; 0 <= a; --a) if ((n = this.tryEntries[a]).tryLoc <= this.prev && S.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                            var o = n;
                            break;
                        }
                        o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
                        var r = o ? o.completion : {};
                        return r.type = e, r.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, 
                        M) : this.complete(r);
                    },
                    complete: function(e, t) {
                        if ("throw" === e.type) throw e.arg;
                        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, 
                        this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), 
                        M;
                    },
                    finish: function(e) {
                        for (var t, n = this.tryEntries.length - 1; 0 <= n; --n) if ((t = this.tryEntries[n]).finallyLoc === e) return this.complete(t.completion, t.afterLoc), 
                        y(t), M;
                    },
                    catch: function(e) {
                        for (var t, n = this.tryEntries.length - 1; 0 <= n; --n) if ((t = this.tryEntries[n]).tryLoc === e) {
                            var a = t.completion;
                            if ("throw" === a.type) {
                                var o = a.arg;
                                y(t);
                            }
                            return o;
                        }
                        throw new Error("illegal catch attempt");
                    },
                    delegateYield: function(e, t, n) {
                        return this.delegate = {
                            iterator: w(e),
                            resultName: t,
                            nextLoc: n
                        }, "next" === this.method && (this.arg = void 0), M;
                    }
                };
            }
        }(function() {
            return this;
        }() || Function("return this")());
    }).call(t, n(209)(e));
}, function(e) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], !e.children && (e.children = []), 
        Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function() {
                return e.l;
            }
        }), Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function() {
                return e.i;
            }
        }), e.webpackPolyfill = 1), e;
    };
}, function(e, t, n) {
    n(146), n(60), n(92), n(211), e.exports = n(9).Promise;
}, function(e, t, n) {
    var a, o, r, i = n(61), s = n(16), c = n(36), u = n(148), l = n(25), d = n(37), f = n(81), p = n(212), h = n(213), g = n(214), m = n(151).set, v = n(216)(), y = "Promise", _ = s.TypeError, w = s.process, x = s[y], b = "process" == u(w = s.process), S = function() {}, T = !!function() {
        try {
            var e = x.resolve(1), t = (e.constructor = {})[n(13)("species")] = function(e) {
                e(S, S);
            };
            return (b || "function" == typeof PromiseRejectionEvent) && e.then(S) instanceof t;
        } catch (t) {}
    }(), D = function(e, t) {
        return e === t || e === x && t === r;
    }, k = function(e) {
        var t;
        return !(!d(e) || "function" != typeof (t = e.then)) && t;
    }, I = function(e) {
        return D(x, e) ? new C(e) : new o(e);
    }, C = o = function(e) {
        var t, n;
        this.promise = new e(function(e, a) {
            if (void 0 !== t || void 0 !== n) throw _("Bad Promise constructor");
            t = e, n = a;
        }), this.resolve = f(t), this.reject = f(n);
    }, F = function(e) {
        try {
            e();
        } catch (e) {
            return {
                error: e
            };
        }
    }, P = function(e, t) {
        if (!e._n) {
            e._n = !0;
            var n = e._c;
            v(function() {
                for (var a = e._v, o = 1 == e._s, r = 0; n.length > r; ) !function(t) {
                    var n, r, i = o ? t.ok : t.fail, s = t.resolve, c = t.reject, u = t.domain;
                    try {
                        i ? (!o && (2 == e._h && z(e), e._h = 1), !0 === i ? n = a : (u && u.enter(), n = i(a), 
                        u && u.exit()), n === t.promise ? c(_("Promise-chain cycle")) : (r = k(n)) ? r.call(n, s, c) : s(n)) : c(a);
                    } catch (t) {
                        c(t);
                    }
                }(n[r++]);
                e._c = [], e._n = !1, t && !e._h && A(e);
            });
        }
    }, A = function(e) {
        m.call(s, function() {
            var t, n, a, o = e._v;
            if (O(e) && (t = F(function() {
                b ? w.emit("unhandledRejection", o, e) : (n = s.onunhandledrejection) ? n({
                    promise: e,
                    reason: o
                }) : (a = s.console) && a.error && a.error("Unhandled promise rejection", o);
            }), e._h = b || O(e) ? 2 : 1), e._a = void 0, t) throw t.error;
        });
    }, O = function e(t) {
        if (1 == t._h) return !1;
        for (var n, a = t._a || t._c, o = 0; a.length > o; ) if ((n = a[o++]).fail || !e(n.promise)) return !1;
        return !0;
    }, z = function(e) {
        m.call(s, function() {
            var t;
            b ? w.emit("rejectionHandled", e) : (t = s.onrejectionhandled) && t({
                promise: e,
                reason: e._v
            });
        });
    }, M = function(e) {
        var t = this;
        t._d || (t._d = !0, t = t._w || t, t._v = e, t._s = 2, !t._a && (t._a = t._c.slice()), 
        P(t, !0));
    }, E = function e(t) {
        var n, a = this;
        if (!a._d) {
            a._d = !0, a = a._w || a;
            try {
                if (a === t) throw _("Promise can't be resolved itself");
                (n = k(t)) ? v(function() {
                    var o = {
                        _w: a,
                        _d: !1
                    };
                    try {
                        n.call(t, c(e, o, 1), c(M, o, 1));
                    } catch (e) {
                        M.call(o, e);
                    }
                }) : (a._v = t, a._s = 1, P(a, !1));
            } catch (n) {
                M.call({
                    _w: a,
                    _d: !1
                }, n);
            }
        }
    };
    T || (x = function(e) {
        p(this, x, y, "_h"), f(e), a.call(this);
        try {
            e(c(E, this, 1), c(M, this, 1));
        } catch (e) {
            M.call(this, e);
        }
    }, a = function() {
        this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, 
        this._n = !1;
    }, a.prototype = n(217)(x.prototype, {
        then: function(e, t) {
            var n = I(g(this, x));
            return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, 
            n.domain = b ? w.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && P(this, !1), 
            n.promise;
        },
        catch: function(e) {
            return this.then(void 0, e);
        }
    }), C = function() {
        var e = new a();
        this.promise = e, this.resolve = c(E, e, 1), this.reject = c(M, e, 1);
    }), l(l.G + l.W + l.F * !T, {
        Promise: x
    }), n(62)(x, y), n(218)(y), r = n(9)[y], l(l.S + l.F * !T, y, {
        reject: function(e) {
            var t = I(this);
            return (0, t.reject)(e), t.promise;
        }
    }), l(l.S + l.F * (i || !T), y, {
        resolve: function(e) {
            if (e instanceof x && D(e.constructor, this)) return e;
            var t = I(this);
            return (0, t.resolve)(e), t.promise;
        }
    }), l(l.S + l.F * !(T && n(152)(function(e) {
        x.all(e).catch(S);
    })), y, {
        all: function(e) {
            var t = this, n = I(t), a = n.resolve, o = n.reject, r = F(function() {
                var n = [], r = 0, i = 1;
                h(e, !1, function(e) {
                    var s = r++, c = !1;
                    n.push(void 0), i++, t.resolve(e).then(function(e) {
                        c || (c = !0, n[s] = e, --i || a(n));
                    }, o);
                }), --i || a(n);
            });
            return r && o(r.error), n.promise;
        },
        race: function(e) {
            var t = this, n = I(t), a = n.reject, o = F(function() {
                h(e, !1, function(e) {
                    t.resolve(e).then(n.resolve, a);
                });
            });
            return o && a(o.error), n.promise;
        }
    });
}, function(e) {
    e.exports = function(e, t, n, a) {
        if (!(e instanceof t) || void 0 !== a && a in e) throw TypeError(n + ": incorrect invocation!");
        return e;
    };
}, function(e, t, n) {
    var a = n(36), o = n(149), r = n(150), i = n(22), s = n(85), c = n(95), u = {}, l = {};
    (t = e.exports = function(e, t, n, d, f) {
        var p, h, g, m, v = f ? function() {
            return e;
        } : c(e), y = a(n, d, t ? 2 : 1), _ = 0;
        if ("function" != typeof v) throw TypeError(e + " is not iterable!");
        if (r(v)) {
            for (p = s(e.length); p > _; _++) if ((m = t ? y(i(h = e[_])[0], h[1]) : y(e[_])) === u || m === l) return m;
        } else for (g = v.call(e); !(h = g.next()).done; ) if ((m = o(g, y, h.value, t)) === u || m === l) return m;
    }).BREAK = u, t.RETURN = l;
}, function(e, t, n) {
    var a = n(22), o = n(81), r = n(13)("species");
    e.exports = function(e, t) {
        var n, i = a(e).constructor;
        return void 0 === i || void 0 == (n = a(i)[r]) ? t : o(n);
    };
}, function(e) {
    e.exports = function(e, t, n) {
        var a = void 0 === n;
        switch (t.length) {
          case 0:
            return a ? e() : e.call(n);

          case 1:
            return a ? e(t[0]) : e.call(n, t[0]);

          case 2:
            return a ? e(t[0], t[1]) : e.call(n, t[0], t[1]);

          case 3:
            return a ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);

          case 4:
            return a ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3]);
        }
        return e.apply(n, t);
    };
}, function(e, t, n) {
    var a = n(16), o = n(151).set, r = a.MutationObserver || a.WebKitMutationObserver, i = a.process, s = a.Promise, c = "process" == n(50)(i);
    e.exports = function() {
        var e, t, n, u = function() {
            var a, o;
            for (c && (a = i.domain) && a.exit(); e; ) {
                o = e.fn, e = e.next;
                try {
                    o();
                } catch (o) {
                    throw e ? n() : t = void 0, o;
                }
            }
            t = void 0, a && a.enter();
        };
        if (c) n = function() {
            i.nextTick(u);
        }; else if (r) {
            var l = !0, d = document.createTextNode("");
            new r(u).observe(d, {
                characterData: !0
            }), n = function() {
                d.data = l = !l;
            };
        } else if (s && s.resolve) {
            var f = s.resolve();
            n = function() {
                f.then(u);
            };
        } else n = function() {
            o.call(a, u);
        };
        return function(a) {
            var o = {
                fn: a,
                next: void 0
            };
            t && (t.next = o), e || (e = o, n()), t = o;
        };
    };
}, function(e, t, n) {
    var a = n(32);
    e.exports = function(e, t, n) {
        for (var o in t) n && e[o] ? e[o] = t[o] : a(e, o, t[o]);
        return e;
    };
}, function(e, t, n) {
    var a = n(16), o = n(9), r = n(26), i = n(33), s = n(13)("species");
    e.exports = function(e) {
        var t = "function" == typeof o[e] ? o[e] : a[e];
        i && t && !t[s] && r.f(t, s, {
            configurable: !0,
            get: function() {
                return this;
            }
        });
    };
}, function(e, t, n) {
    e.exports = {
        default: n(220),
        __esModule: !0
    };
}, function(e, t, n) {
    n(221), e.exports = n(9).Object.setPrototypeOf;
}, function(e, t, n) {
    var a = n(25);
    a(a.S, "Object", {
        setPrototypeOf: n(222).set
    });
}, function(e, t, n) {
    var a = n(37), o = n(22), r = function(e, t) {
        if (o(e), !a(t) && null !== t) throw TypeError(t + ": can't set as prototype!");
    };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, a) {
            try {
                (a = n(36)(Function.call, n(145).f(Object.prototype, "__proto__").set, 2))(e, []), 
                t = !(e instanceof Array);
            } catch (e) {
                t = !0;
            }
            return function(e, n) {
                return r(e, n), t ? e.__proto__ = n : a(e, n), e;
            };
        }({}, !1) : void 0),
        check: r
    };
}, function(e, t, n) {
    e.exports = {
        default: n(224),
        __esModule: !0
    };
}, function(e, t, n) {
    n(225), e.exports = n(9).Object.getPrototypeOf;
}, function(e, t, n) {
    var a = n(51), o = n(142);
    n(147)("getPrototypeOf", function() {
        return function(e) {
            return o(a(e));
        };
    });
}, function(e, t, n) {
    e.exports = {
        default: n(227),
        __esModule: !0
    };
}, function(e, t, n) {
    n(228);
    var a = n(9).Object;
    e.exports = function(e, t) {
        return a.create(e, t);
    };
}, function(e, t, n) {
    var a = n(25);
    a(a.S, "Object", {
        create: n(91)
    });
}, , function(e, t, n) {
    var a = n(9), o = a.JSON || (a.JSON = {
        stringify: JSON.stringify
    });
    e.exports = function() {
        return o.stringify.apply(o, arguments);
    };
}, function(e, t, n) {
    function a() {}
    var o = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(4)), r = n(3), i = n(97), s = n(12), c = {
        method: "GET",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: a,
        fail: a,
        complete: a
    };
    e.exports = function(e) {
        return function(t) {
            t = r({}, c, t);
            var n = function() {
                var n = function(e) {
                    console.info("[carmen:success]", t.api, e), t.success(e);
                }, a = function(e) {
                    console.error("[carmen:fail]", t.api, e);
                    var n = {
                        api: t.api,
                        request: t,
                        response: e
                    };
                    if (t.fail(e), "weapp.spotlight.weapp.log/1.0.0/get" !== t.api) try {
                        s("[carmen:fail]" + (0, o.default)(n)), console.error("正在上报错误日志", t.api);
                    } catch (e) {
                        console.error(e);
                    }
                }, c = {
                    url: i({
                        origin: "carmen",
                        pathname: "/gw/oauthentry/" + t.api,
                        query: r({
                            access_token: e.getToken()
                        }, t.query)
                    }),
                    method: t.method,
                    data: t.data,
                    header: t.header,
                    success: function(o) {
                        if (void 0 != o.data.response) n(o.data.response); else try {
                            if (40010 === o.data.error_response.code) return console.info("[carmen:40010] AccessToken不存在或已过期, 正在重新登录..."), 
                            e.globalData.hasToken = !1, e.carmen(t), void e.login();
                            a({
                                type: "yz:carmen",
                                msg: o.data.error_response.msg,
                                code: o.data.error_response.code
                            });
                        } catch (e) {
                            a({
                                type: "yz:carmen",
                                msg: "服务器错误",
                                code: -99999
                            });
                        }
                    },
                    fail: function(e) {
                        a({
                            type: "wx:request",
                            msg: e.errMsg,
                            code: -1
                        });
                    },
                    complete: function() {
                        t.complete();
                    }
                };
                return console.info("[carmen:request]", t.api), wx.request(c);
            };
            return e.getToken() ? n() : void e.once("app:token:success", n);
        };
    };
}, function(e) {
    function t() {
        return "db_" + a++;
    }
    var n = {}, a = 1;
    e.exports = {
        set: function(e) {
            var a = t();
            return n[a] = e, a;
        },
        get: function(e) {
            var t = n[e];
            return delete n[e], t;
        }
    };
}, function(e) {
    e.exports = function(e) {
        return {
            set: function(t, n, a) {
                var o = (a = a || {}).expire || 7;
                try {
                    wx.setStorageSync(t, {
                        value: n,
                        version: e.VERSION,
                        expire: Date.now() + 24 * o * 3600 * 1e3
                    });
                } catch (t) {
                    console.error(t);
                }
            },
            get: function(t) {
                try {
                    var n = wx.getStorageSync(t);
                    if (n.version === e.VERSION && n.expire > Date.now()) return n.value;
                } catch (t) {
                    console.error(t);
                }
            },
            remove: function(e) {
                try {
                    wx.removeStorageSync(e);
                } catch (e) {
                    console.error(e);
                }
            },
            clear: function() {
                try {
                    wx.clearStorageSync();
                } catch (e) {
                    console.error(e);
                }
            }
        };
    };
}, function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(2));
    e.exports = {
        setADids: function(e) {
            e && e.dc_ps && getApp().storage.set("__ZANAD__", (0, a.default)({}, getApp().storage.get("__ZANAD__") || {}, {
                dc_ps: e.dc_ps
            }), {
                expire: 1 / 12
            });
        },
        getADids: function() {
            return getApp().storage.get("__ZANAD__") || {};
        }
    };
}, function(e) {
    var t = {
        "pages/usercenter/dashboard/index": "uc",
        "pages/goods/detail/index": "g",
        "pages/order/detail": "od",
        "pages/order/orderList": "ol",
        "pages/goods/cart/index": "cart",
        "pages/venues/index/index": "ch",
        "pages/venues/otherIndex/index": "ch",
        "pages/venues/index2/index": "ch",
        "pages/venues/discount/index": "ch",
        "pages/usercenter/shopSelection/shopSelection": "h",
        "pages/trade/buy/index": "trade",
        "pages/order/list/index": "ol",
        "pages/trade/result/index": "od",
        "pages/ump/sharecut/detail/detail": "actd",
        "pages/venues/sharecut/index": "list"
    }, n = {
        prefix: "__SPM__",
        deep: 0,
        enterSpm: "",
        referSpm: "",
        currentSpm: ""
    };
    e.exports = {
        setCurrentSpm: function(e, a) {
            0 == n.deep ? (n.enterSpm = (t[e] || "fake") + (a || "0"), n.referSpm = "", n.currentSpm = "") : (n.referSpm = n.currentSpm, 
            n.currentSpm = (t[e] || "fake") + (a || "0")), n.deep++;
        },
        getSpm: function() {
            return 1 == n.deep ? n.enterSpm : 2 == n.deep ? n.enterSpm + "_" + n.currentSpm : n.enterSpm + "_" + n.referSpm + "_" + n.currentSpm;
        },
        removePageSpm: function() {
            n.deep = 0, n.enterSpm = "", n.referSpm = "", n.currentSpm = "";
        }
    };
}, function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(153)), o = n(11), r = function() {
        function e() {
            (0, a.default)(this, e);
        }
        return e.addParams = function(e, t) {
            var n = [];
            return o(t, function(e, t) {
                n.push(t + "=" + encodeURIComponent(e));
            }), e + (0 < n.length ? "?" : "") + n.join("&");
        }, e;
    }();
    r.add = r.addParams, e.exports = r;
}, function(e, t, n) {
    t.__esModule = !0, t.yzLogger = void 0;
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(238));
    t.yzLogger = a.default;
}, function(t) {
    !function(e, n) {
        t.exports = n();
    }(0, function() {
        return function(e) {
            function t(a) {
                if (n[a]) return n[a].exports;
                var o = n[a] = {
                    i: a,
                    l: !1,
                    exports: {}
                };
                return e[a].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
            }
            var n = {};
            return t.m = e, t.c = n, t.d = function(e, n, a) {
                t.o(e, n) || Object.defineProperty(e, n, {
                    configurable: !1,
                    enumerable: !0,
                    get: a
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
            }, t.p = "", t(t.s = 2);
        }([ function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            t.log_seqb = "logv3:yz_log_seqb", t.log_seqn = "logv3:yz_log_seqn", t.log_ftime = "logv3:yz_log_ftime", 
            t.log_uuid = "logv3:yz_log_uuid", t.yztj = "yz_tj_", t.log_rurl = "logv3:yz_log_rurl", 
            t.log_dc_ps = "logv3:dc_ps", t.log_last_session_time = "logv3:yz_log_last_session_time";
        }, function(e) {
            e.exports = function(e) {
                return {
                    set: function(t, n, a) {
                        var o = (a = a || {}).expire || 10080;
                        try {
                            wx.setStorageSync(t, {
                                value: n,
                                version: e.VERSION,
                                expire: Date.now() + 60 * o * 1e3
                            });
                        } catch (t) {
                            console.error(t);
                        }
                    },
                    get: function(e) {
                        try {
                            var t = wx.getStorageSync(e);
                            if (t.expire > Date.now()) return t.value;
                            console.log("==== remove ====", e, t.expire, Date.now()), wx.removeStorage({
                                key: e
                            });
                        } catch (t) {
                            console.error(t);
                        }
                    },
                    remove: function(e) {
                        try {
                            wx.removeStorageSync(e);
                        } catch (e) {
                            console.error(e);
                        }
                    },
                    clear: function() {
                        try {
                            wx.clearStorageSync();
                        } catch (e) {
                            console.error(e);
                        }
                    }
                };
            };
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var a = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }(n(3));
            t.default = a.default;
        }, function(e, t, n) {
            function a(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }
            var r = Object.assign || function(e) {
                for (var t, n = 1; n < arguments.length; n++) for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e;
            }, i = function() {
                function e(e, t) {
                    for (var n, a = 0; a < t.length; a++) (n = t[a]).enumerable = n.enumerable || !1, 
                    n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
                }
                return function(t, n, a) {
                    return n && e(t.prototype, n), a && e(t, a), t;
                };
            }(), s = n(0), c = a(n(4)), u = a(n(5)), l = n(6), d = n(1), f = n(7), p = n(8), h = n(9), g = d({}), m = {
                prefix: "__ZANLOG__",
                apiBase: "https://tj.youzan.com/v3/weapp/log",
                enterScene: "",
                enterPage: "",
                referPage: "",
                currentPage: "",
                bizInfo: "",
                appId: ""
            }, v = {
                getCurrentPageUrl: function() {
                    var e = getCurrentPages(), t = e[e.length - 1], n = "", a = t.options || {};
                    for (var o in a) {
                        var r = a[o];
                        n += "" == n ? "?" + o + "=" + r : "&" + o + "=" + r;
                    }
                    return t.route + n;
                },
                getReferer: function() {
                    return wx.getStorageSync(s.log_rurl) || "";
                },
                setReferer: function(e) {
                    wx.setStorageSync(s.log_rurl, e);
                },
                getUUID: function() {
                    var e = "";
                    try {
                        e = wx.getStorageSync(s.log_uuid);
                    } catch (t) {
                        console.log(t);
                    }
                    if (!e) {
                        var t = new Date().getTime();
                        e = l.makeRandomString(15) + Date.now(), wx.setStorageSync(s.log_uuid, e), wx.setStorageSync(s.log_ftime, t);
                    }
                    return e;
                }
            }, y = function() {
                function e(t) {
                    o(this, e), this.options = p(this.defaultOptions, t), this.rurl = "", this.durl = "", 
                    this.enterTime = "", this.leaveTime = "", this.eventFireTime = "", this.pageEvent = {}, 
                    this.sessionContext = {};
                }
                return i(e, [ {
                    key: "_init",
                    value: function() {
                        var e = new Date().getTime(), t = wx.getStorageSync(s.log_seqb), n = wx.getStorageSync(s.log_seqn);
                        wx.getStorageSync(s.log_last_session_time) || wx.setStorageSync(s.log_last_session_time, e), 
                        t || wx.setStorageSync(s.log_seqb, e), n || wx.setStorageSync(s.log_seqn, 1), this.pageEvent = h(this.options.event), 
                        this.sessionContext = h(this.options.context), c.default.add(this.sessionContext), 
                        this._installEnv(), this._installUser(), this._installContext();
                    }
                }, {
                    key: "setBizInfo",
                    value: function(e) {
                        this.setMoblie(e.mobile), this.setLoginSign(e.userId), this.setShopId(e.kdtId), 
                        m.bizInfo = e || {}, m.appid = e.appid;
                    }
                }, {
                    key: "_installUser",
                    value: function() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
                        if (this.options.user) if (e) this.options.user = r({}, this.options.user, e); else {
                            var t = "";
                            try {
                                this.options.user.uuid = v.getUUID(), t = wx.getStorageSync(s.log_ftime), this.options.user.ftime = t;
                            } catch (t) {
                                console.log(t);
                            }
                        }
                        return this;
                    }
                }, {
                    key: "_installEnv",
                    value: function() {
                        var e = this.options.env;
                        if (e) try {
                            var t = wx.getSystemInfoSync();
                            wx.getNetworkType({
                                success: function(t) {
                                    e.net = t.networkType;
                                }
                            });
                            var n = t.system || "", a = n.indexOf(" "), o = n.substr(0, a), r = n.substr(a + 1);
                            e.os = o, e.osv = r, e.mmv = t.version, e.dt = t.model, e.brand = t.brand;
                        } catch (t) {}
                        return this;
                    }
                }, {
                    key: "_installEvent",
                    value: function(e, t) {
                        var n = {
                            params: {}
                        }, a = new Date().getTime(), o = wx.getStorageSync(s.log_seqb) || "", r = parseInt(wx.getStorageSync(s.log_seqn)), i = wx.getStorageSync(s.log_last_session_time) || "";
                        return void 0 === (n = p(n, t, e)).ts && (n.ts = a), void 0 === n.durl && (n.durl = this.durl), 
                        void 0 === n.params.rurl && (n.params.rurl = this.rurl), 18e5 > a - i ? (n.seqb = o, 
                        n.seqn = r, wx.setStorageSync(s.log_seqn, r + 1)) : (n.seqb = a, n.seqn = 1, wx.setStorageSync(s.log_seqn, 1), 
                        this.sessionContext = c.default.clear(this.sessionContext)), wx.setStorageSync(s.log_last_session_time, a), 
                        n;
                    }
                }, {
                    key: "_installContext",
                    value: function() {
                        var e = this.sessionContext;
                        try {
                            for (var t, n = wx.getStorageInfoSync(), a = {}, o = 0; o < n.keys.length; o++) (t = n.keys[o]).substr(0, s.yztj.length) === s.yztj && (a[t] = g.get(t));
                            for (var r in e) a["" + s.yztj + r] = e[r];
                            for (var i in a) e[i.substr(s.yztj.length)] = a[i];
                        } catch (n) {}
                        return this;
                    }
                }, {
                    key: "_updateContext",
                    value: function() {
                        try {
                            for (var e = wx.getStorageInfoSync(), t = {}, n = 0; n < e.keys.length; n++) {
                                var a = e.keys[n], o = a.substr(s.yztj.length);
                                if (a.substr(0, s.yztj.length) === s.yztj) {
                                    var i = g.get(a);
                                    t[o] = i;
                                }
                            }
                            return this.sessionContext = r({}, this.sessionContext, t), this;
                        } catch (t) {}
                    }
                }, {
                    key: "appShow",
                    value: function() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                        1 < arguments.length && void 0 !== arguments[1] && arguments[1];
                        e.path && (m.enterPage = e.path), e.scene && (m.enterScene = e.scene), this._init(), 
                        this.enterAppTime = new Date().getTime();
                        var t = {
                            et: "app_display",
                            ei: "enterapp",
                            ts: this.enterAppTime
                        };
                        this.log(t);
                    }
                }, {
                    key: "appHide",
                    value: function() {
                        var e = new Date().getTime(), t = {
                            et: "app_display",
                            ei: "leaveapp",
                            params: {
                                enter_time: this.enterAppTime,
                                leave_time: e
                            }
                        };
                        this.log(t, function() {});
                    }
                }, {
                    key: "pageShow",
                    value: function(e) {
                        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                        this.rurl = v.getReferer(), this.durl = v.getCurrentPageUrl(), this.enterTime = new Date().getTime(), 
                        f.setADids(e), g.remove(s.log_rurl);
                        var n = {
                            et: "display",
                            ei: "enterpage",
                            ts: this.enterTime || "",
                            durl: this.durl,
                            params: r({
                                rurl: this.rurl
                            }, t)
                        };
                        this.options.event && this.options.event.params && (delete this.options.event.params.enter_time, 
                        delete this.options.event.params.leave_time), this.log(n);
                    }
                }, {
                    key: "pageHide",
                    value: function() {
                        this.leaveTime = new Date().getTime(), this.durl = v.getCurrentPageUrl(), v.setReferer(this.durl);
                        var e = {
                            et: "display",
                            ei: "leavepage",
                            params: {
                                rurl: this.rurl,
                                enter_time: this.enterTime,
                                leave_time: this.leaveTime
                            }
                        };
                        this.durl && (e.durl = this.durl), this.log(e);
                    }
                }, {
                    key: "log",
                    value: function(e, t) {
                        new Date().getTime(), this.onceEvent = this._installEvent(e, this.pageEvent), this._updateContext();
                        var n = {
                            plat: this.options.plat,
                            user: this.options.user,
                            context: this.sessionContext,
                            event: this.onceEvent,
                            env: this.options.env
                        };
                        this.options.event = {}, "leavepage" === this.options.event.ei && (this.pageEvent.params = {}), 
                        this.options.debug && console.log(JSON.stringify(n)), this._doLog(n, t);
                    }
                }, {
                    key: "_doLog",
                    value: function() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], n = m.apiBase;
                        wx.request({
                            url: n,
                            data: e,
                            method: "post",
                            header: {
                                "content-type": "text/plain;charset=utf-8"
                            },
                            success: function() {
                                "function" == typeof t && t();
                            }
                        });
                    }
                }, {
                    key: "setYouzanAppId",
                    value: function(e) {
                        this._installPlat({
                            yai: e
                        });
                    }
                }, {
                    key: "setLoginSign",
                    value: function(e) {
                        this._installUser({
                            li: e
                        });
                    }
                }, {
                    key: "setMoblie",
                    value: function(e) {
                        this._installUser({
                            m: e
                        });
                    }
                }, {
                    key: "addSessionParams",
                    value: function(e) {
                        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "";
                        if (t) for (var n in e) {
                            var a = "" + s.yztj + n;
                            g.set(a, e[n], {
                                expire: t
                            });
                        } else c.default.add(e);
                    }
                }, {
                    key: "setShopId",
                    value: function(e) {
                        this.pageEvent.si = e;
                    }
                }, {
                    key: "setPageName",
                    value: function(e) {
                        this.pageEvent.en = e;
                    }
                }, {
                    key: "setPageType",
                    value: function(e) {
                        this.pageEvent.pt = e;
                    }
                }, {
                    key: "setPageParams",
                    value: function(e) {
                        this.pageEvent.params = Object.assign({}, this.pageEvent.params, e);
                    }
                }, {
                    key: "getGlobal",
                    value: function() {
                        return {
                            plat: this.options.plat,
                            user: this.options.user,
                            context: this.sessionContext,
                            env: this.options.env
                        };
                    }
                }, {
                    key: "defaultOptions",
                    get: function() {
                        return u.default;
                    }
                } ]), e;
            }();
            e.exports = y;
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var a = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }(n(1)), o = n(0), r = (0, a.default)({}), i = "yztj_session_keys", s = {
                set: function(e) {
                    wx.setStorageSync(i, JSON.stringify(e));
                },
                get: function() {
                    var e = wx.getStorageSync(i) || "[]";
                    try {
                        e = JSON.parse(e);
                    } catch (e) {}
                    return e;
                },
                clear: function(e) {
                    var t = wx.getStorageSync(i) || "[]";
                    try {
                        t = JSON.parse(t);
                    } catch (e) {}
                    for (var n in t) {
                        var a = t[n], s = a.substr(o.yztj.length) || "";
                        s && delete e[s], r.remove(a);
                    }
                    return wx.setStorageSync(i, []), e;
                },
                add: function(e) {
                    var t = this.get();
                    for (var n in e) {
                        var a = "" + o.yztj + n;
                        t.includes(a) || (t.push(a), r.set(a, e[n], {
                            expire: 60
                        }));
                    }
                    s.set(t);
                }
            };
            t.default = s;
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = {
                rate: .1,
                baseUrl: "https://tj.youzanyun.com/v3/js/log",
                debug: !1,
                autoClick: !0,
                autoDisplay: !0,
                autoSpaDisplay: !0,
                pageTitle: "",
                autoSpm: !1,
                installNeeded: !0,
                plat: {
                    yai: "wsc_c",
                    st: "weapp",
                    sv: "0.1.5"
                },
                user: {
                    uuid: "",
                    ftime: "",
                    li: "",
                    m: ""
                },
                env: {},
                context: {},
                event: {}
            };
        }, function(e) {
            e.exports = {
                makeRandomString: function(e) {
                    var t = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    e = e || 10;
                    for (var a = 0; a < e; a++) t += n.charAt(Math.floor(Math.random() * n.length));
                    return t;
                }
            };
        }, function(e) {
            e.exports = {
                setADids: function(e) {
                    e && e.aid && e.traceid && getApp().storage.set("__ZANAD__", {
                        aid: e.aid,
                        traceid: e.traceid
                    }, {
                        expire: 30
                    });
                },
                getADids: function() {
                    return getApp().storage.get("__ZANAD__") || {};
                }
            };
        }, function(t) {
            function n(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e;
            }
            function a(e) {
                return e && "object" === (void 0 === e ? "undefined" : r(e)) && !Array.isArray(e);
            }
            function o(e) {
                for (var t = arguments.length, r = Array(1 < t ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
                if (!r.length) return e;
                var s = r.shift();
                if (a(e) && a(s)) for (var c in s) a(s[c]) ? (e[c] || Object.assign(e, n({}, c, {})), 
                o(e[c], s[c])) : Object.assign(e, n({}, c, s[c]));
                return o.apply(void 0, [ e ].concat(r));
            }
            var r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
                return void 0 === t ? "undefined" : e(t);
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
            };
            t.exports = o;
        }, function(e) {
            e.exports = function(e) {
                return JSON.parse(JSON.stringify(e));
            };
        } ]);
    });
}, , function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(14)), o = [ "onLaunch", "onLoad", "onReady", "onShow", "onHide", "onError", "onUnload", "onPullDownRefresh", "onReachBottom", "onPageScroll" ], r = function(e) {
        return "__$" + e;
    };
    e.exports = function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = e.life, n = void 0 === t ? o : t, i = e.exclude, s = void 0 === i ? [] : i, c = s.concat(o.map(r));
        if (!Array.isArray(n) || !Array.isArray(s)) throw new Error("Invalid Extend Config");
        var u = n.filter(function(e) {
            return 0 <= o.indexOf(e);
        });
        return function(e) {
            for (var t = arguments.length, n = Array(1 < t ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
            return n.forEach(function(t) {
                t && (0, a.default)(t).forEach(function(n) {
                    var a = t[n];
                    if (!(0 <= c.indexOf(n))) if (0 <= u.indexOf(n) && "function" == typeof a) {
                        var o = r(n);
                        if (e[o] || (e[o] = [], e[n] && e[o].push(e[n]), e[n] = function() {
                            for (var t = this, n = arguments.length, a = Array(n), r = 0; r < n; r++) a[r] = arguments[r];
                            e[o].forEach(function(e) {
                                return e.apply(t, a);
                            });
                        }), t[o]) {
                            var i;
                            (i = e[o]).push.apply(i, t[o]);
                        } else e[o].push(a);
                    } else e[n] = a;
                });
            }), e;
        };
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function o() {
        var e = getApp(), t = this.__query__;
        if (!s(t)) {
            var n;
            t.dc_ps && (n = Math.floor(Date.now() / 1e3));
            var a = {
                dc_ps: t.dc_ps,
                is_share: t.is_share,
                channel: t.collection_id,
                topic: t.topic_id,
                banner_id: t.banner_id,
                from_source: t.from_source,
                from_params: t.from_params,
                dc_ps_utime: n
            };
            (0, u.default)(a).forEach(function(e) {
                a[e] || delete a[e];
            }), "object" === (0, c.default)(e.logger) && "function" == typeof e.logger.addSessionParams && e.logger.addSessionParams(a, 120);
        }
    }
    function r() {
        var e = this, t = (getApp(), y()), n = this.__query__.kdtId || this.data.kdtId;
        -1 < p.indexOf(t) ? n ? m(n) : this.once("goodsDetail:loaded", function() {
            n = e.data.kdtId, m(n);
        }) : m("");
    }
    function i(e) {
        if (!this.__isPageHide) {
            console.log("[Log Page Hide]", e);
            var t = getApp();
            "object" === (0, c.default)(t.logger) && "function" == typeof t.logger.setPageParams && "function" == typeof t.logger.pageHide && (t.logger && t.logger.pageHide(), 
            this.__isPageHide = !0);
        }
    }
    function s(e) {
        return 0 === (0, u.default)(e).length;
    }
    t.__esModule = !0;
    var c = a(n(27)), u = a(n(14)), l = a(n(242)), d = [ "pages/goods/detail/index", "pages/ump/sharecut/detail/detail" ], f = [ "pages/ump/sharecut/detail/detail", "pages/venues/sharecut/index" ], p = [ "pages/goods/detail/index", "pages/usercenter/shopSelection/shopSelection", "pages/ump/sharecut/detail/detail" ], h = [ "pages/venue/home/index" ], g = [ "pages/venue/home/index", "pages/venue/search/index", "pages/venue/like/index" ];
    t.default = {
        onShow: function() {
            var e = this;
            console.log("[log page show]");
            var t = getApp(), n = y(), a = this.data.goods && this.data.goods.id;
            if (r.call(this), o.call(this), 0 <= d.indexOf(n) && !a) this.once("goodsDetail:loaded", function() {
                var t = e.data.isSharecut, n = e.data.goods && e.data.goods.id;
                v(t, n);
            }); else if (0 <= h.indexOf(n)) t.logger.addSessionParams({
                channel: ""
            }, -1), t.logger.addSessionParams({
                topic: ""
            }, -1), t.logger.addSessionParams({
                banner_id: ""
            }, -1), v(!1, ""); else if (0 <= g.indexOf(n)) console.log(1231), t.logger.addSessionParams({
                banner_id: ""
            }, -1); else if (a) {
                var i = this.data.isSharecut;
                v(i, a);
            } else "pages/venue/activity/index" === n ? v(!1, this.__query__.collection_id) : "pages/specialtopic/specialtopic" === n ? v(!1, this.__query__.topic_id) : 1 === p.indexOf(n) ? v(!1, this.__query__.kdtId) : v();
            this.__isPageHide = !1;
        },
        onHide: function() {
            i.call(this, "hide");
        },
        onUnload: function() {
            i.call(this, "unload");
        },
        doLogOnTabChange: function(e) {
            e = "all" === e ? 0 : e;
            var t = getApp(), n = y();
            l.default.setCurrentSpm(n, e), t.logger.setPageParams({
                spm: l.default.getSpm()
            });
        }
    };
    var m = function(e) {
        var t = getApp();
        "object" === (0, c.default)(t.logger) && "function" == typeof t.logger.setShopId && t.logger.setShopId(e);
    }, v = function(e, t) {
        var n = y(), a = !1;
        0 <= f.indexOf(n) && (a = !0), t = "all" === t ? 0 : t, l.default.setCurrentSpm(n, t);
        var o = getApp();
        "object" === (0, c.default)(o.logger) && "function" == typeof o.logger.setPageParams && "function" == typeof o.logger.pageShow && (o.logger.setPageParams({
            spm: l.default.getSpm(),
            buyerId: o.getBuyerId()
        }), (e || a) && o.logger.setPageParams({
            activity_sign: "share_cut"
        }), o.logger.pageShow());
    }, y = function() {
        var e = getCurrentPages();
        return e[e.length - 1].route;
    };
}, function(e) {
    var t = {
        "pages/usercenter/dashboard/index": "uc",
        "pages/goods/detail/index": "g",
        "pages/order/detail": "od",
        "pages/order/orderList": "ol",
        "pages/goods/cart/index": "cart",
        "pages/venues/index/index": "ch",
        "pages/venues/otherIndex/index": "ch",
        "pages/venues/index2/index": "ch",
        "pages/venues/discount/index": "ch",
        "pages/usercenter/shopSelection/shopSelection": "h",
        "pages/trade/buy/index": "trade",
        "pages/order/list/index": "ol",
        "pages/trade/result/index": "od",
        "pages/ump/sharecut/detail/detail": "actd",
        "pages/venues/sharecut/index": "list",
        "pages/venue/home/index": "home",
        "pages/venue/like/index": "like",
        "pages/venue/search/index": "search",
        "pages/venue/activity/index": "ch",
        "pages/venue/hotsale/index": "hot",
        "pages/specialtopic/specialtopic": "tp"
    }, n = {
        prefix: "__SPM__",
        deep: 0,
        enterSpm: "",
        referSpm: "",
        currentSpm: ""
    };
    e.exports = {
        setCurrentSpm: function(e, a) {
            0 == n.deep ? (n.enterSpm = (t[e] || "fake") + (a || "0"), n.referSpm = "", n.currentSpm = "") : (n.referSpm = n.currentSpm, 
            n.currentSpm = (t[e] || "fake") + (a || "0")), n.deep++;
        },
        getSpm: function() {
            return 1 == n.deep ? n.enterSpm : 2 == n.deep ? n.enterSpm + "_" + n.currentSpm : n.enterSpm + "_" + n.referSpm + "_" + n.currentSpm;
        },
        removePageSpm: function() {
            n.deep = 0, n.enterSpm = "", n.referSpm = "", n.currentSpm = "";
        }
    };
}, function(e) {
    e.exports = {
        1: {
            text: "圈儿里的食神",
            img: "https://img.yzcdn.cn/public_files/2017/10/31/d7924c242de0be5c57ffd8d9aeed10bd.png"
        },
        2: {
            text: "最美胖仙女",
            img: "https://img.yzcdn.cn/public_files/2017/10/31/69152fb89530555d3de1b378eb0dd065.png"
        },
        3: {
            text: "咱的大当家",
            img: "https://img.yzcdn.cn/public_files/2017/10/31/fbbb908259da782ca9d602b3cb427bf4.png"
        },
        4: {
            text: "傲娇的小公举",
            img: "https://img.yzcdn.cn/public_files/2017/10/31/3cc5fb6fd6441843f550258898f4a122.png"
        },
        5: {
            text: "圈儿里的晒娃狂魔",
            img: "https://img.yzcdn.cn/public_files/2017/10/31/f38d94ca5f3f798b0ff4aba2eaed42b3.png"
        },
        6: {
            text: "当代乔布斯",
            img: "https://img.yzcdn.cn/public_files/2017/10/31/05abf7c42135d9e1a1b1d63557dc540b.png"
        },
        9: {
            text: "推荐你看看",
            img: "https://img.yzcdn.cn/public_files/2017/10/31/f39df4317e8bb3fd99372cc038d0c4b0.png"
        },
        10: {
            text: "推荐你看看",
            img: "https://img.yzcdn.cn/public_files/2017/10/31/03d605b09ac1bb4aefbc0aa94e0a0d69.png"
        },
        11: {
            text: "推荐你看看",
            img: "https://img.yzcdn.cn/public_files/2017/10/31/b91e43558f277b41ba7943172abf893b.png"
        },
        12: {
            text: "推荐你看看",
            img: "https://img.yzcdn.cn/public_files/2017/10/31/af6f59ea4fb144c86074e63ab2535699.png"
        },
        13: {
            text: "推荐你看看",
            img: "https://img.yzcdn.cn/public_files/2017/10/31/d85d7591120190a1aaa497a579f4e91d.png"
        },
        14: {
            text: "推荐你看看",
            img: ""
        },
        25: {
            text: "推荐你看看",
            img: "https://img.yzcdn.cn/public_files/2017/10/31/9a3a41cbecb1f5162703a9c6fcbde95b.png"
        }
    };
}, function(e, t) {
    t.__esModule = !0, t.default = {
        COLLECTION: {
            groupon: "cheap_hot",
            timelimited: "timelimited_discount"
        }
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    t.__esModule = !0, t.checkShareCutStatus = t.getCategoryList = t.getGoodsByCategory = t.getRankSales = t.getActivityGoodsList = t.getAds = void 0;
    var o = a(n(7)), r = a(n(98)), i = a(n(3)), s = getApp();
    t.getAds = function(e) {
        var t = e.data, n = (0, r.default)(e, [ "data" ]);
        return s.carmen((0, o.default)({
            api: "weapp.spotlight.ad.unit.ad/1.0.0/list",
            data: (0, i.default)({
                category: 1
            }, t)
        }, n));
    }, t.getActivityGoodsList = function(e) {
        var t = e.data, n = (0, r.default)(e, [ "data" ]);
        return s.carmen((0, o.default)({
            api: "weapp.spotlight.home.app.goods/1.0.0/list",
            data: (0, i.default)({
                page: 1,
                size: 8
            }, t)
        }, n));
    }, t.getRankSales = function(e) {
        return s.carmen((0, o.default)({
            api: "weapp.spotlight.item.rank/1.0.0/main"
        }, e));
    }, t.getGoodsByCategory = function(e) {
        var t = e.data, n = (0, r.default)(e, [ "data" ]);
        return s.carmen((0, o.default)({
            api: "weapp.spotlight.category.item/1.0.0/list",
            data: (0, i.default)({
                page: 1,
                size: 10,
                source: "homepage"
            }, t)
        }, n));
    }, t.getCategoryList = function(e, t) {
        return s.carmen((0, o.default)({
            api: "weapp.spotlight.app.category/1.0.0/list",
            data: {
                source: t || "homepage"
            }
        }, e));
    }, t.checkShareCutStatus = function(e) {
        return s.carmen((0, o.default)({
            api: "weapp.spotlight.activity/1.0.0/check"
        }, e));
    };
}, , function(e, t, n) {
    t.__esModule = !0, t.removeStoreToFav = t.addStoreToFav = t.getCollectedStores = t.getBoughtStores = t.getViewedStores = t.getNewStores = t.getCollectedGoods = t.getBoughtGoods = t.getViewedGoods = void 0;
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(7)), o = getApp();
    t.getViewedGoods = function(e) {
        return o.carmen((0, a.default)({
            api: "mars.trade/1.0.0/getgoodsviewrecords"
        }, e));
    }, t.getBoughtGoods = function(e) {
        return o.carmen((0, a.default)({
            api: "mars.trade/1.0.0/getgoodsbuyrecords"
        }, e));
    }, t.getCollectedGoods = function(e) {
        return o.carmen((0, a.default)({
            api: "mars.collect/1.0.0/getcollectitemlist"
        }, e));
    }, t.getNewStores = function(e) {
        return o.carmen((0, a.default)({
            api: "mars.activityshop/1.0.0/getaggressiveteamlist"
        }, e));
    }, t.getViewedStores = function(e) {
        return o.carmen((0, a.default)({
            api: "mars.trade/1.0.0/getshopviewrecords"
        }, e));
    }, t.getBoughtStores = function(e) {
        return o.carmen((0, a.default)({
            api: "mars.trade/1.0.0/getshopbuyrecords"
        }, e));
    }, t.getCollectedStores = function(e) {
        return o.carmen((0, a.default)({
            api: "mars.collect/1.0.0/getcollectshoplist"
        }, e));
    }, t.addStoreToFav = function(e) {
        return o.carmen((0, a.default)({
            api: "weapp.spotlight.shop/1.0.0/collect",
            method: "POST"
        }, e));
    }, t.removeStoreToFav = function(e) {
        return o.carmen((0, a.default)({
            api: "weapp.spotlight.shop/1.0.0/uncollect",
            method: "POST"
        }, e));
    };
}, function(e, t) {
    t.__esModule = !0, t.config = {
        COLLECT_STATUS: {
            NOT_COLLECTED: 0,
            COLLECTED: 1
        },
        EMPTY_TIP: {
            storeView: "你还没有留下任何足迹赶紧去逛逛吧",
            storeBought: "你还没有宝贝入手哦～赶紧去逛逛吧",
            storeCollected: "你还没有任何收藏哦～赶紧去逛逛吧",
            goodsView: "你还没有留下任何足迹赶紧去逛逛吧",
            goodsBought: "你还没有宝贝入手哦～赶紧去逛逛吧",
            goodsCollected: "你还没有任何收藏哦～赶紧去逛逛吧"
        }
    };
}, , function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    t.__esModule = !0, t.getGoodsByCategoryApi = t.getCategoryListApi = t.getSearchResultApi = t.getHotSearchApi = void 0;
    var o = a(n(98)), r = a(n(7)), i = a(n(3)), s = getApp();
    t.getHotSearchApi = function(e) {
        return s.carmen((0, r.default)({
            api: "weapp.spotlight.hotword/1.0.0/search",
            data: {
                page: 1,
                size: 20
            }
        }, e));
    }, t.getSearchResultApi = function(e) {
        var t = e.data, n = (0, o.default)(e, [ "data" ]);
        return s.carmen((0, r.default)({
            api: "weapp.spotlight.app.search/1.0.0/list",
            data: (0, i.default)({
                size: 20
            }, t),
            method: "POST"
        }, n));
    }, t.getCategoryListApi = function(e) {
        return s.carmen((0, r.default)({
            api: "weapp.spotlight.app.category/1.0.0/list"
        }, e));
    }, t.getGoodsByCategoryApi = function(e) {
        var t = e.data, n = (0, o.default)(e, [ "data" ]);
        return s.carmen((0, r.default)({
            api: "weapp.spotlight.category.item/1.0.0/list",
            data: (0, i.default)({
                size: 20,
                source: "search"
            }, t),
            method: "POST"
        }, n));
    };
}, function(e, t, n) {
    function a(e) {
        var t = e.componentId;
        console.info("[zan:actionsheet:cancel]"), this.handleZanActionsheetCancel ? this.handleZanActionsheetCancel({
            componentId: t
        }) : console.warn("页面缺少 handleZanActionsheetCancel 回调函数");
    }
    var o = n(53).extractComponentId;
    e.exports = {
        _handleZanActionsheetMaskClick: function(e) {
            var t = e.currentTarget, n = (void 0 === t ? {} : t).dataset || {}, o = n.componentId;
            n.closeOnClickOverlay && a.call(this, {
                componentId: o
            });
        },
        _handleZanActionsheetCancelBtnClick: function(e) {
            var t = o(e);
            a.call(this, {
                componentId: t
            });
        },
        _handleZanActionsheetBtnClick: function(e) {
            var t = e.currentTarget, n = (void 0 === t ? {} : t).dataset || {}, a = n.componentId, o = n.index;
            this.handleZanActionsheetClick ? this.handleZanActionsheetClick({
                componentId: a,
                index: o
            }) : console.warn("页面缺少 handleZanActionsheetClick 回调函数");
        }
    };
}, function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(10)), o = function() {};
    e.exports = {
        showZanDialog: function() {
            var e = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, n = t.buttons, o = void 0 === n ? [] : n, r = t.title, i = void 0 === r ? "" : r, s = t.content, c = void 0 === s ? " " : s, u = t.buttonsShowVertical, l = void 0 !== u && u, d = t.showConfirm, f = !(void 0 !== d) || d, p = t.confirmText, h = void 0 === p ? "确定" : p, g = t.confirmColor, m = void 0 === g ? "#3CC51F" : g, v = t.showCancel, y = void 0 !== v && v, _ = t.cancelText, w = void 0 === _ ? "取消" : _, x = t.cancelColor, b = void 0 === x ? "#333" : x, S = !1;
            if (0 !== o.length) S = !0; else if (f && o.push({
                type: "confirm",
                text: h,
                color: m
            }), y) {
                var T = {
                    type: "cancel",
                    text: w,
                    color: b
                };
                l ? o.push(T) : o.unshift(T);
            }
            return new a.default(function(t, n) {
                e.setData({
                    zanDialog: {
                        show: !0,
                        showCustomBtns: S,
                        buttons: o,
                        title: i,
                        content: c,
                        buttonsShowVertical: l,
                        showConfirm: f,
                        confirmText: h,
                        confirmColor: m,
                        showCancel: y,
                        cancelText: w,
                        cancelColor: b,
                        resolve: t,
                        reject: n
                    }
                });
            });
        },
        _handleZanDialogButtonClick: function(e) {
            var t = e.currentTarget, n = (void 0 === t ? {} : t).dataset, a = void 0 === n ? {} : n, r = this.data.zanDialog || {}, i = r.resolve, s = void 0 === i ? o : i, c = r.reject, u = void 0 === c ? o : c;
            return this.setData({
                zanDialog: {
                    show: !1
                }
            }), r.showCustomBtns ? void s({
                type: a.type
            }) : void ("confirm" === a.type ? s({
                type: "confirm"
            }) : u({
                type: "cancel"
            }));
        }
    };
}, function(e, t, n) {
    var a = n(53).extractComponentId;
    e.exports = {
        _handleZanFieldChange: function(e) {
            var t = a(e);
            return e.componentId = t, console.info("[zan:field:change]", e), this.handleZanFieldChange ? this.handleZanFieldChange(e) : void console.warn("页面缺少 handleZanFieldChange 回调函数");
        },
        _handleZanFieldFocus: function(e) {
            var t = a(e);
            return e.componentId = t, console.info("[zan:field:focus]", e), this.handleZanFieldFocus ? this.handleZanFieldFocus(e) : void console.warn("页面缺少 handleZanFieldFocus 回调函数");
        },
        _handleZanFieldBlur: function(e) {
            var t = a(e);
            return e.componentId = t, console.info("[zan:field:blur]", e), this.handleZanFieldBlur ? this.handleZanFieldBlur(e) : void console.warn("页面缺少 handleZanFieldBlur 回调函数");
        }
    };
}, function(e) {
    e.exports = {
        initZanNoticeBarScroll: function(e) {
            var t = this;
            this.zanNoticeBarNode = this.zanNoticeBarNode || {}, this.zanNoticeBarNode["" + e] = {
                width: void 0,
                wrapWidth: void 0,
                animation: null,
                resetAnimation: null
            };
            var n = this.zanNoticeBarNode["" + e];
            wx.createSelectorQuery().select("#" + e + "__content").boundingClientRect(function(a) {
                a.width ? (n.width = a.width, wx.createSelectorQuery().select("#" + e + "__content-wrap").boundingClientRect(function(a) {
                    if (n.wrapWidth = a.width, n.wrapWidth < n.width) {
                        var o = n.width / 40 * 1e3;
                        n.animation = wx.createAnimation({
                            duration: o,
                            timingFunction: "linear"
                        }), n.resetAnimation = wx.createAnimation({
                            duration: 0,
                            timingFunction: "linear"
                        }), t.scrollZanNoticeBar(e, o);
                    }
                }).exec()) : console.warn("页面缺少 noticebar 元素");
            }).exec();
        },
        scrollZanNoticeBar: function(e, t) {
            var n, a = this, o = this.zanNoticeBarNode["" + e], r = o.resetAnimation.translateX(o.wrapWidth).step();
            this.setData((n = {}, n[e + ".animationData"] = r.export(), n));
            var i = o.animation.translateX(40 * -t / 1e3).step();
            setTimeout(function() {
                var t;
                a.setData((t = {}, t[e + ".animationData"] = i.export(), t));
            }, 100), setTimeout(function() {
                a.scrollZanNoticeBar(e, t);
            }, t);
        }
    };
}, function(e) {
    function t(e, t) {
        var a = e.currentTarget.dataset, o = a.componentId, r = a.disabled, i = +a.stepper;
        return r ? null : void n.call(this, o, i + t);
    }
    function n(e, t) {
        var n = {
            componentId: e,
            stepper: t = +t
        };
        console.info("[zan:stepper:change]", n), this.handleZanStepperChange ? this.handleZanStepperChange(n) : console.warn("页面缺少 handleZanStepperChange 回调函数");
    }
    e.exports = {
        _handleZanStepperMinus: function(e) {
            t.call(this, e, -1);
        },
        _handleZanStepperPlus: function(e) {
            t.call(this, e, 1);
        },
        _handleZanStepperBlur: function(e) {
            var t = this, a = e.currentTarget.dataset, o = a.componentId, r = +a.max, i = +a.min, s = e.detail.value;
            return s ? ((s = +s) > r ? s = r : s < i && (s = i), n.call(this, o, s), "" + s) : (setTimeout(function() {
                n.call(t, o, i);
            }, 16), n.call(this, o, s), "" + s);
        }
    };
}, function(e) {
    e.exports = {
        _handleZanSwitchChange: function(e) {
            var t = e.currentTarget.dataset, n = !t.checked, a = t.loading, o = t.disabled, r = t.componentId;
            a || o || (console.info("[zan:switch:change]", {
                checked: n,
                componentId: r
            }), this.handleZanSwitchChange ? this.handleZanSwitchChange({
                checked: n,
                componentId: r
            }) : console.warn("页面缺少 handleZanSwitchChange 回调函数"));
        }
    };
}, function(e, t, n) {
    var a = n(53).extractComponentId;
    e.exports = {
        _handleZanTabChange: function(e) {
            var t = {
                componentId: a(e),
                selectedId: e.currentTarget.dataset.itemId
            };
            console.info("[zan:tab:change]", t), this.handleZanTabChange ? this.handleZanTabChange(t) : console.warn("页面缺少 handleZanTabChange 回调函数");
        }
    };
}, function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(2));
    e.exports = {
        showZanTopTips: function() {
            var e = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, o = this.data.zanTopTips || {};
            o.timer && (clearTimeout(o.timer), o.timer = void 0), "number" == typeof n && (n = {
                duration: n
            }), n = (0, a.default)({
                duration: 3e3
            }, n);
            var r = setTimeout(function() {
                e.setData({
                    "zanTopTips.show": !1,
                    "zanTopTips.timer": void 0
                });
            }, n.duration);
            this.setData({
                zanTopTips: {
                    show: !0,
                    content: t,
                    options: n,
                    timer: r
                }
            });
        }
    };
}, , function(e, t, n) {
    t.__esModule = !0, t.getTopStoreApi = t.getHotSaleGoodsApi = void 0;
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(7)), o = getApp();
    t.getHotSaleGoodsApi = function(e) {
        return o.carmen((0, a.default)({
            api: "weapp.spotlight.rank.item/1.0.0/list",
            data: {
                page: 1,
                size: 50
            }
        }, e));
    }, t.getTopStoreApi = function(e) {
        return o.carmen((0, a.default)({
            api: "weapp.spotlight.rank.shop/1.0.0/list",
            data: {
                page: 1,
                size: 50
            }
        }, e));
    };
}, , function(e, t) {
    t.__esModule = !0, t.default = {
        CHEAP_HOT: {
            channel: "12",
            topic: "低价火拼"
        },
        TIMELIMITED_DISCOUNT: {
            channel: "13",
            topic: "限时抢购"
        }
    };
}, function(e, t, n) {
    n(92), n(60), e.exports = n(264);
}, function(e, t, n) {
    var a = n(22), o = n(95);
    e.exports = n(9).getIterator = function(e) {
        var t = o(e);
        if ("function" != typeof t) throw TypeError(e + " is not iterable!");
        return a(t.call(e));
    };
}, function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(27)), o = n(0), r = getApp();
    e.exports = {
        _handleZanTabChange: function(e) {
            var t = e.currentTarget.dataset, n = t.componentId, a = t.itemId, i = t.type, s = t.name, c = t.alias;
            o.setGlobalData({
                channel: a,
                name: s
            }), console.log(e);
            var u = "all" === a ? 0 : a;
            o.page.show({
                id: u
            }), r.logger.pageHide(), this.doLog(a), this.handleZanTabChange ? this.handleZanTabChange({
                componentId: n,
                selectedId: a,
                name: s,
                type: i,
                alias: c
            }, e) : console.warn("页面缺少 handleZanTabChange 回调函数");
        },
        doLog: function(e) {
            "object" === (0, a.default)(r.logger) && "function" == typeof r.logger.addSessionParams && "function" == typeof r.logger.pageShow && (r.logger.addSessionParams({
                channel: e
            }, 525600), this.doLogOnTabChange(e), r.logger.pageShow());
        }
    };
}, function(e) {
    e.exports = {
        onSubTabChange: function(e) {
            var t = e.currentTarget.dataset, n = t.itemId;
            t.componentId;
            this.handleSubTabChange ? this.handleSubTabChange(n) : console.warn("页面缺少 handleSubTabChange 回调函数");
        }
    };
}, , , , , function(e, t, n) {
    var a;
    !function(e) {
        e && e.__esModule;
    }(n(27));
    !function(o) {
        function r(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n;
        }
        function i(e, t) {
            return e << t | e >>> 32 - t;
        }
        function s(e, t, n, a, o, s) {
            return r(i(r(r(t, e), r(a, s)), o), n);
        }
        function c(e, t, n, a, o, r, i) {
            return s(t & n | ~t & a, e, t, o, r, i);
        }
        function u(e, t, n, a, o, r, i) {
            return s(t & a | n & ~a, e, t, o, r, i);
        }
        function l(e, t, n, a, o, r, i) {
            return s(t ^ n ^ a, e, t, o, r, i);
        }
        function d(e, t, n, a, o, r, i) {
            return s(n ^ (t | ~a), e, t, o, r, i);
        }
        function f(e, t) {
            e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;
            var n, a, o, i, s, f = 1732584193, p = -271733879, h = -1732584194, g = 271733878;
            for (n = 0; n < e.length; n += 16) a = f, o = p, i = h, s = g, p = d(p = d(p = d(p = d(p = l(p = l(p = l(p = l(p = u(p = u(p = u(p = u(p = c(p = c(p = c(p = c(p, h = c(h, g = c(g, f = c(f, p, h, g, e[n], 7, -680876936), p, h, e[n + 1], 12, -389564586), f, p, e[n + 2], 17, 606105819), g, f, e[n + 3], 22, -1044525330), h = c(h, g = c(g, f = c(f, p, h, g, e[n + 4], 7, -176418897), p, h, e[n + 5], 12, 1200080426), f, p, e[n + 6], 17, -1473231341), g, f, e[n + 7], 22, -45705983), h = c(h, g = c(g, f = c(f, p, h, g, e[n + 8], 7, 1770035416), p, h, e[n + 9], 12, -1958414417), f, p, e[n + 10], 17, -42063), g, f, e[n + 11], 22, -1990404162), h = c(h, g = c(g, f = c(f, p, h, g, e[n + 12], 7, 1804603682), p, h, e[n + 13], 12, -40341101), f, p, e[n + 14], 17, -1502002290), g, f, e[n + 15], 22, 1236535329), h = u(h, g = u(g, f = u(f, p, h, g, e[n + 1], 5, -165796510), p, h, e[n + 6], 9, -1069501632), f, p, e[n + 11], 14, 643717713), g, f, e[n], 20, -373897302), h = u(h, g = u(g, f = u(f, p, h, g, e[n + 5], 5, -701558691), p, h, e[n + 10], 9, 38016083), f, p, e[n + 15], 14, -660478335), g, f, e[n + 4], 20, -405537848), h = u(h, g = u(g, f = u(f, p, h, g, e[n + 9], 5, 568446438), p, h, e[n + 14], 9, -1019803690), f, p, e[n + 3], 14, -187363961), g, f, e[n + 8], 20, 1163531501), h = u(h, g = u(g, f = u(f, p, h, g, e[n + 13], 5, -1444681467), p, h, e[n + 2], 9, -51403784), f, p, e[n + 7], 14, 1735328473), g, f, e[n + 12], 20, -1926607734), h = l(h, g = l(g, f = l(f, p, h, g, e[n + 5], 4, -378558), p, h, e[n + 8], 11, -2022574463), f, p, e[n + 11], 16, 1839030562), g, f, e[n + 14], 23, -35309556), h = l(h, g = l(g, f = l(f, p, h, g, e[n + 1], 4, -1530992060), p, h, e[n + 4], 11, 1272893353), f, p, e[n + 7], 16, -155497632), g, f, e[n + 10], 23, -1094730640), h = l(h, g = l(g, f = l(f, p, h, g, e[n + 13], 4, 681279174), p, h, e[n], 11, -358537222), f, p, e[n + 3], 16, -722521979), g, f, e[n + 6], 23, 76029189), h = l(h, g = l(g, f = l(f, p, h, g, e[n + 9], 4, -640364487), p, h, e[n + 12], 11, -421815835), f, p, e[n + 15], 16, 530742520), g, f, e[n + 2], 23, -995338651), h = d(h, g = d(g, f = d(f, p, h, g, e[n], 6, -198630844), p, h, e[n + 7], 10, 1126891415), f, p, e[n + 14], 15, -1416354905), g, f, e[n + 5], 21, -57434055), h = d(h, g = d(g, f = d(f, p, h, g, e[n + 12], 6, 1700485571), p, h, e[n + 3], 10, -1894986606), f, p, e[n + 10], 15, -1051523), g, f, e[n + 1], 21, -2054922799), h = d(h, g = d(g, f = d(f, p, h, g, e[n + 8], 6, 1873313359), p, h, e[n + 15], 10, -30611744), f, p, e[n + 6], 15, -1560198380), g, f, e[n + 13], 21, 1309151649), h = d(h, g = d(g, f = d(f, p, h, g, e[n + 4], 6, -145523070), p, h, e[n + 11], 10, -1120210379), f, p, e[n + 2], 15, 718787259), g, f, e[n + 9], 21, -343485551), 
            f = r(f, a), p = r(p, o), h = r(h, i), g = r(g, s);
            return [ f, p, h, g ];
        }
        function p(e) {
            var t, n = "", a = 32 * e.length;
            for (t = 0; t < a; t += 8) n += String.fromCharCode(255 & e[t >> 5] >>> t % 32);
            return n;
        }
        function h(e) {
            var t, n = [];
            for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
            var a = 8 * e.length;
            for (t = 0; t < a; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
            return n;
        }
        function g(e) {
            return p(f(h(e), 8 * e.length));
        }
        function m(e, t) {
            var n, a, o = h(e), r = [], i = [];
            for (r[15] = i[15] = void 0, 16 < o.length && (o = f(o, 8 * e.length)), n = 0; 16 > n; n += 1) r[n] = 909522486 ^ o[n], 
            i[n] = 1549556828 ^ o[n];
            return a = f(r.concat(h(t)), 512 + 8 * t.length), p(f(i.concat(a), 640));
        }
        function v(e) {
            var t, n, a = "0123456789abcdef", o = "";
            for (n = 0; n < e.length; n += 1) t = e.charCodeAt(n), o += a.charAt(15 & t >>> 4) + a.charAt(15 & t);
            return o;
        }
        function y(e) {
            return unescape(encodeURIComponent(e));
        }
        function _(e) {
            return g(y(e));
        }
        function w(e) {
            return v(_(e));
        }
        function x(e, t) {
            return m(y(e), y(t));
        }
        function b(e, t) {
            return v(x(e, t));
        }
        function S(e, t, n) {
            return t ? n ? x(t, e) : b(t, e) : n ? _(e) : w(e);
        }
        void 0 !== (a = function() {
            return S;
        }.call(t, n, t, e)) && (e.exports = a);
    }();
}, , , function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var o = a(n(4)), r = a(n(2));
    getApp();
    e.exports = (0, r.default)({}, {
        onQrCodeTapped: function(e) {
            this._onQrCodeTapped && this._onQrCodeTapped(e.currentTarget.dataset.verifycode);
        },
        onShareButtonTapped: function() {},
        onUseButtonTapped: function(e) {
            var t = e.currentTarget.dataset.group;
            t && "all" != t.range_type ? (wx.setStorage({
                key: "coupon_range_value",
                data: (0, o.default)(t.range_value)
            }), wx.navigateTo({
                url: "/pages/goods/group/index?pageType=coupon"
            })) : wx.navigateTo({
                url: "/pages/home/feature/index"
            });
        }
    }, {
        handleCouponDetailData: function(e) {
            if (e) {
                var t = e, n = e.value + "", a = null == e.at_least ? e.group.at_least + "" : e.at_least + "", o = this.splitNumber(n, a);
                (0, r.default)(t, {
                    roundNumber: o.round,
                    decimal: o.decimal,
                    atLeastString: o.atLeastString
                });
                var i, s;
                if (i = e.valid_start_at, s = e.expire_at, i && s || (i = e.start_at, s = e.end_at), 
                i && 0 < i.length && s && 0 < s.length) {
                    var c = i.split(" "), u = s.split(" "), l = c[0], d = u[0], f = c[1], p = u[1], h = "", g = "", m = l.split("-"), v = d.split("-"), y = m.length - 1;
                    m.forEach(function(e, t) {
                        h += e, t != y && (h += ".");
                    }), v.forEach(function(e, t) {
                        g += e, t != y && (g += ".");
                    }), (0, r.default)(t, {
                        start_time: h + " " + f.substring(0, f.lastIndexOf(":")),
                        end_time: g + " " + p.substring(0, p.lastIndexOf(":"))
                    });
                }
                return t;
            }
        },
        splitNumber: function(e, t) {
            var n = e.split("."), a = t.split("."), o = n[0], r = 2 == n.length ? 0 == +n[1] ? "" : "." + n[1] : "", i = "", s = 2 == a.length ? 0 == +a[1] ? "" : "." + a[1] : "";
            return (s || 0 < +a[0]) && (i = a[0]), {
                round: o,
                decimal: r,
                atLeastString: i + s
            };
        }
    });
}, , , function(e, t) {
    t.__esModule = !0, t.default = {
        data: {
            goTopThreshold: 0,
            goTopVisiable: !1
        },
        component: {
            setThreshold: function() {
                var e = this;
                wx.getSystemInfo({
                    success: function(t) {
                        e.setData({
                            goTopThreshold: t.windowHeight
                        });
                    }
                });
            },
            handleGoTop: function() {
                wx.pageScrollTo({
                    scrollTop: 0
                }), this.setData({
                    goTopVisiable: !1
                });
            },
            onPageScroll: function(e) {
                e.scrollTop >= 2 * this.data.goTopThreshold ? !this.data.goTopVisiable && this.setData({
                    goTopVisiable: !0
                }) : this.data.goTopVisiable && this.setData({
                    goTopVisiable: !1
                });
            }
        }
    };
}, , , , function(e, t, n) {
    function a(e) {
        return e.replace(/[A-Z]/g, function(e) {
            return "_" + e.toLowerCase();
        });
    }
    var o = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(27)), r = n(11);
    e.exports = function(e) {
        if ("string" == typeof e) return a(e);
        if ("object" === (void 0 === e ? "undefined" : (0, o.default)(e))) {
            var t = {};
            return r(e, function(e, n) {
                t[a(n)] = e;
            }), t;
        }
    };
}, function(e, t, n) {
    var a = n(6), o = n(99);
    e.exports = {
        handleComponentSKUMessageValueChange: function(e) {
            var t = e.currentTarget.dataset.index, n = e.detail.value, a = this.data.componentSKU.goods.messages;
            a[t].value = n, this.setData({
                "componentSKU.goods.messages": a
            });
        },
        handleComponentSKUMessageUploadImageTap: function(e) {
            var t = this, n = e.currentTarget.dataset.index;
            wx.chooseImage({
                count: 1,
                sizeType: [ "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(e) {
                    var r;
                    t.setData((r = {}, r["componentSKU.goods.messages[" + n + "].uploading"] = !0, r));
                    var i = getCurrentPages()[getCurrentPages().length - 1].data.kdtId;
                    o({
                        kdt_id: i,
                        file: e.tempFilePaths[0],
                        success: function(e) {
                            var o, r = e.attachment_url;
                            t.setData((o = {}, o["componentSKU.goods.messages[" + n + "].value"] = a(r), o["componentSKU.goods.messages[" + n + "].formatedValue"] = a(r, "!120x120.jpg"), 
                            o["componentSKU.goods.messages[" + n + "].uploading"] = !1, o));
                        },
                        fail: function(e) {
                            var a;
                            t.showZanToast(e.msg), t.setData((a = {}, a["componentSKU.goods.messages[" + n + "].uploading"] = !1, 
                            a));
                        }
                    });
                },
                fail: function() {
                    t.showZanToast("选择图片失败");
                }
            });
        }
    };
}, function(e, t, n) {
    function a(e, t, n, a) {
        var o = e[n.s1] || t.originPicture[0];
        return p(o, a ? "!730x0.jpg" : "!160x160.jpg");
    }
    function o(e) {
        var t = e;
        return [ t.s1, t.s2, t.s3 ].join("-");
    }
    function r(e) {
        var t = e.sku, n = e.quota, a = e.quotaUsed, r = e.stepper, i = 1 / 0, s = 0;
        n = 0 == n ? 1 / 0 : Math.max(0, n - a);
        var c = t.mapList[o(e.selectedSKU)];
        return s = c ? +c.stock_num : +t.stock_num, i = Math.min(s, n), r > i && (r = i), 
        {
            stepper: r,
            maxQuantity: i
        };
    }
    function i(e) {
        var t = {};
        return e.none_sku || f(e.tree[0].v, function(e) {
            t[e.id] = e.imgUrl;
        }), t;
    }
    function s(e) {
        for (var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n = e.tree, a = e.list, o = {}, r = 1; r <= n.length; r++) {
            var i = "s" + r;
            a.filter(function(e) {
                return !("s1" != i && t.s1 && e.s1 != t.s1 || "s2" != i && t.s2 && e.s2 != t.s2 || "s3" != i && t.s3 && e.s3 != t.s3);
            }).forEach(function(e) {
                var t = o[e[i]] || 0;
                o[e[i]] = +e.stock_num + t;
            });
        }
        return o;
    }
    function c(e) {
        return e.none_sku || e.min_price == e.max_price ? {
            desc: e.price,
            yuan: e.price.split(".")[0],
            fen: e.price.split(".")[1],
            isRange: !1
        } : {
            desc: e.price,
            isRange: !0,
            min: {
                desc: e.min_price,
                yuan: e.min_price.split(".")[0],
                fen: e.min_price.split(".")[1]
            },
            max: {
                desc: e.max_price,
                yuan: e.max_price.split(".")[0],
                fen: e.max_price.split(".")[1]
            }
        };
    }
    function u(e, t, n) {
        var a = t.goods_preference;
        return a && a.is_started && n && (e.origin = e.price, e.price = a.show_price, e.min_price = a.price_range.min, 
        e.max_price = a.price_range.max, f(e.list, function(e) {
            e.price = a.skus[e.id].price;
        })), e.mapList = {}, f(e.list, function(t) {
            t.price = h(100 * t.price).toYuan(), e.mapList[[ t.s1, t.s2, t.s3 ].join("-")] = t;
        }), e.mapTree = {}, f(e.tree, function(t) {
            f(t.v, function(t) {
                e.mapTree[t.id] = t;
            });
        }), e;
    }
    function l(e, t) {
        var n = t.mapList[o(e)] || {};
        return e.price = n.price || null, e.points = n.points || null, e.stockNum = n.stock_num || 0 == n.stock_num ? n.stock_num : null, 
        e.skuId = n.id || null, e;
    }
    function d(e) {
        var t = {
            s1: 0,
            s2: 0,
            s3: 0,
            price: e.price || e.origin,
            points: e.points_price,
            stockNum: null,
            skuId: null
        };
        return f(e.tree, function(e) {
            e.v && 1 === e.v.length && (t[e.ks] = e.v[0].id);
        }), t = l(t, e);
    }
    var f = n(11), p = n(6), h = n(15);
    getApp();
    e.exports = {
        getDialogGoodsImage: a,
        recordSelectedSku: function(e, t) {
            if (!e) return null;
            var n = t.selectedSKU, a = t.goods.sku;
            n[e.skuKey] = n[e.skuKey] == e.skuValueId ? 0 : e.skuValueId;
            var i = a.mapList[o(n)] || {};
            return n.price = i.price, n.stockNum = i.stock_num || 0 == i.stock_num ? i.stock_num : null, 
            n.skuId = i.id || null, {
                selectedSKU: n,
                skuValueMap: s(a),
                stepperData: r({
                    selectedSKU: n,
                    sku: a,
                    quota: t.goods.goods.quota,
                    quotaUsed: t.goods.goods.quotaUsed,
                    stepper: 1
                })
            };
        },
        getOrderData: function(e) {
            var t = e.goods, n = e.stepperData, a = t.goods, r = t.sku, i = {};
            if (f(t.messages, function(e) {
                i[e.name] = e.value;
            }), e.use_ump) {
                var s = e.activity.activity_id || 0, c = e.activity.type || 0;
                "groupOn" == e.activity.type ? (s = parseInt(s), c = 4) : "timelimitedDiscount" == e.activity.type ? (s = parseInt(s), 
                c = 11) : "customerDiscount" == e.activity.type ? (s = parseInt(s), c = 10) : "shareCut" == e.activity.type && (s = parseInt(s), 
                c = 19);
            }
            var u = {
                message: i,
                activityAlias: "",
                activityId: s || 0,
                activityType: c || 0,
                num: n.stepper,
                price: 0,
                skuId: null,
                goodsId: a.id,
                kdtId: e.kdtId
            };
            if (r.none_sku) u.skuId = r.collection_id, u.price = a.price.desc; else {
                var l = r.mapList[o(e.selectedSKU)] || {};
                u.skuId = l.id, u.price = l.price;
            }
            return u.price = h(u.price).toCent(), u;
        },
        getSelectedSKUKey: o,
        parse: function(e) {
            var t = {}, n = e.brief, o = u(e.sku, e.activity, e.use_ump), l = e.originData.messages || [];
            t.id = n.item_id, t.title = n.title, t.price = c(o), t.quota = e.use_ump && e.activity && e.activity.goods_preference ? e.activity.goods_preference.quota : +n.quota, 
            t.quotaUsed = +n.quota_used, t.origin = !o.none_sku && o.origin ? o.origin : n.origin, 
            t.originPicture = [], f(n.picture, function(e) {
                t.originPicture.push(e.url);
            }), l = l.map(function(e) {
                return "image" === e.type && (e.uploading = !1, e.formatedUrl = ""), e.value = "", 
                e;
            });
            var p = d(o), h = i(o), g = e.activity.goods_preference || {}, m = e.use_ump;
            return {
                goods: {
                    sku: o,
                    goods: t,
                    messages: l,
                    supportShoppingCart: 0 == n.is_virtual
                },
                use_ump: m,
                activity: g,
                selectedSKU: p,
                skuValueMap: s(o),
                skuImages: h,
                stepperData: r({
                    selectedSKU: p,
                    sku: o,
                    quota: t.quota,
                    quotaUsed: t.quotaUsed,
                    stepper: 1
                }),
                dialogGoodsImage: a(h, t, p),
                show_stock: !0
            };
        },
        getOrderDataforCart: function(e) {
            var t = e.goods, n = e.stepperData, a = t.goods, r = t.sku, i = {};
            if (f(t.messages, function(e) {
                i[e.name] = e.value;
            }), e.use_ump) {
                var s = e.activity.activity_id || 0, c = e.activity.type || 0;
                "groupOn" == e.activity.type ? (s = parseInt(s), c = 4) : ("timelimitedDiscount" == e.activity.type || "customerDiscount" == e.activity.type) && (s = 0, 
                c = 0);
            }
            var u = {
                message: i,
                activity_alias: "",
                activity_id: s || 0,
                activity_type: c || 0,
                num: n.stepper,
                price: 0,
                sku_id: null,
                goods_id: a.id,
                kdt_id: e.kdtId
            };
            if (r.none_sku) u.skuId = r.collection_id, u.price = a.price.desc; else {
                var l = r.mapList[o(e.selectedSKU)] || {};
                u.skuId = l.id, u.price = l.price;
            }
            return u.price = h(u.price).toCent(), u;
        }
    };
}, function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(2)), o = {
        _gotop_show: !1,
        _navigation_show: !0,
        scrollTop: 0,
        _mask_is_show: !1
    }, r = {
        homeBtn_click: function() {
            console.log("请定义homeBtn点击事件");
        },
        trackBtn_click: function() {
            console.log("请定义trackBtn点击事件");
        },
        meBtn_click: function() {
            console.log("请定义meBtn点击事件");
        },
        shareBtn_click: function() {
            console.log("请定义share点击事件");
        }
    };
    e.exports = {
        btns_click_define: function(e) {
            var t = getCurrentPages();
            t[t.length - 1].setData(o), (0, a.default)(r, e);
        },
        func_container: {
            goTop: function() {
                this.setData({
                    scrollTop: 0
                });
            },
            scroll: function(e) {
                var t = this;
                1e3 < e.detail.scrollTop ? (this.setData({
                    _gotop_show: !0,
                    _navigation_show: !1
                }), t.topPopp()) : (this.toptakeback(), this.setData({
                    _gotop_show: !1,
                    _navigation_show: !0
                }));
            },
            topPopp: function() {
                var e = wx.createAnimation({
                    duration: 200,
                    timingFunction: "linear"
                });
                e.scale(1, 1).step(), this.setData({
                    animation: {
                        aniTop: e.export()
                    }
                });
            },
            toptakeback: function() {
                var e = wx.createAnimation({
                    duration: 200,
                    timingFunction: "linear"
                });
                e.scale(.5, .1).step(), this.setData({
                    animation: {
                        aniTop: e.export()
                    }
                });
            },
            showMask: function() {
                var e = this;
                this.setData({
                    _mask_is_show: !0
                }), setTimeout(function() {
                    e.popp();
                }, 100);
            },
            dismiss: function() {
                var e = this;
                this.takeback(), setTimeout(function() {
                    e.setData({
                        _mask_is_show: !1
                    });
                }, 600);
            },
            popp: function() {
                var e = wx.createAnimation({
                    duration: 400,
                    timingFunction: "ease-out"
                }), t = wx.createAnimation({
                    duration: 400,
                    timingFunction: "ease-out"
                }), n = wx.createAnimation({
                    duration: 100,
                    timingFunction: "ease-out",
                    delay: 300
                }), a = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out",
                    delay: 200
                }), o = wx.createAnimation({
                    duration: 300,
                    timingFunction: "ease-out",
                    delay: 100
                }), r = wx.createAnimation({
                    duration: 400,
                    timingFunction: "ease-out"
                });
                t.opacity(1).step(), n.translate(0, -50).opacity(1).step(), a.translate(0, -100).opacity(1).step(), 
                o.translate(0, -150).opacity(1).step(), r.translate(0, -200).opacity(1).step(), 
                e.opacity(.5).step(), this.setData({
                    animation: {
                        aniFix: e.export(),
                        animCancel: t.export(),
                        animShare: n.export(),
                        animMe: a.export(),
                        aniTrack: o.export(),
                        aniHome: r.export()
                    }
                });
            },
            takeback: function() {
                var e = wx.createAnimation({
                    duration: 400,
                    timingFunction: "ease-out"
                }), t = wx.createAnimation({
                    duration: 400,
                    timingFunction: "ease-out"
                }), n = wx.createAnimation({
                    duration: 100,
                    timingFunction: "ease-out"
                }), a = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                }), o = wx.createAnimation({
                    duration: 300,
                    timingFunction: "ease-out"
                }), r = wx.createAnimation({
                    duration: 300,
                    timingFunction: "ease-out"
                });
                t.opacity(0).step(), n.opacity(0).step(), a.translate(0, 0).opacity(0).step(), o.translate(0, 0).opacity(0).step(), 
                r.translate(0, 0).opacity(0).step(), e.opacity(0).step(), this.setData({
                    animation: {
                        animCancel: t.export(),
                        animShare: n.export(),
                        animMe: a.export(),
                        aniTrack: o.export(),
                        aniHome: r.export(),
                        aniFix: e.export()
                    }
                });
            },
            btnclick: function(e) {
                var t = this;
                this.takeback(), "0" === e.currentTarget.dataset.index ? r.homeBtn_click() : "1" === e.currentTarget.dataset.index ? r.trackBtn_click() : "2" === e.currentTarget.dataset.index ? r.meBtn_click() : "3" == e.currentTarget.dataset.index && r.shareBtn_click(), 
                setTimeout(function() {
                    t.setData({
                        _mask_is_show: !1
                    });
                }, 400);
            }
        }
    };
}, , , , , , function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(2)), o = getApp();
    e.exports = {
        save: function(e, t, n) {
            o.carmen({
                api: "account.address/1.0.0/modifyById",
                data: (0, a.default)({
                    lon: "",
                    lat: "",
                    community: ""
                }, e),
                success: function(e) {
                    t(e);
                },
                fail: function(e) {
                    n && n(e);
                }
            });
        },
        add: function(e, t, n) {
            o.carmen({
                api: "account.address/1.0.0/add",
                data: (0, a.default)({
                    lon: "",
                    lat: "",
                    id: "",
                    community: ""
                }, e),
                success: function(e) {
                    t(e);
                },
                fail: function(e) {
                    n && n(e);
                }
            });
        },
        getAddressList: function(e, t) {
            o.carmen({
                api: "account.address/1.0.0/get",
                data: {
                    type: 1
                },
                success: function(t) {
                    e(t);
                },
                fail: function(e) {
                    t && t(e);
                }
            });
        },
        removeAddress: function(e, t, n) {
            o.carmen({
                api: "account.address/1.0.0/removeById",
                data: {
                    id: e
                },
                success: function(e) {
                    t(e);
                },
                fail: function() {
                    n && n();
                }
            });
        }
    };
}, function(e, t, n) {
    var a = n(11), o = function(e, t, n) {
        var o = [];
        return n && o.push({
            text: n,
            code: e
        }), a(t, function(t, n) {
            e && 0 !== n.indexOf(e) || o.push({
                text: t,
                code: n
            });
        }), o;
    };
    e.exports = {
        formatAreaData: function(e, t) {
            var n = {}, a = e.toString().slice(0, 2) || -1, r = e.toString().slice(0, 4) || -1;
            return n.province = o(0, t.province, "省份"), n.city = o(a, t.city, "城市"), n.county = o(r, t.county, "区县"), 
            n;
        }
    };
}, , , function(e, t, n) {
    function a(e, t, n, a) {
        switch (e) {
          case 1:
            o(e, t, a);
            break;

          case 16:
            r(e, t, a);
        }
    }
    function o(e, t, n) {
        wx.requestPayment({
            timeStamp: t.timeStamp,
            nonceStr: t.nonceStr,
            package: t.package,
            signType: t.signType,
            paySign: t.paySign,
            success: function(t) {
                n.success && n.success(e, t);
            },
            fail: function(e) {
                n.fail && n.fail(e.errMsg);
            }
        });
    }
    function r(e, t, n) {
        n.success && n.success(e, t);
    }
    getApp();
    var i = n(110), s = n(109);
    e.exports = function(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n = i.formatOrderPaymentData(e), o = n.buyWay;
        delete n.buyWay, s.payOrder(n, function(e) {
            t.afterSync && t.afterSync(), a(o, e, 0, t);
        }, function(e) {
            t.fail && t.fail(e);
        });
    };
}, function(e, t, n) {
    var a = getApp(), o = n(0);
    e.exports = {
        onAddressTap: function() {
            var e = this;
            this.data.order_no || (o.track({
                act_name: "address_change",
                address: "express"
            }), wx.chooseAddress({
                success: function(e) {
                    var t = {
                        address_detail: e.detailInfo,
                        id: 0,
                        area_code: e.nationalCode,
                        city: e.cityName,
                        county: e.countyName,
                        postal_code: e.postalCode,
                        province: e.provinceName,
                        tel: e.telNumber,
                        user_name: e.userName
                    };
                    a.trigger("order-address-change", t);
                },
                fail: function(t) {
                    var n = a.db.set(e.data.address);
                    console.log("res.errMsg " + t.errMsg), 0 < t.errMsg.indexOf("auth") && wx.navigateTo({
                        url: "../address/index?address=" + n
                    });
                }
            }));
        }
    };
}, function(e) {
    var t = getApp();
    e.exports = {
        onMessageBlur: function(e) {
            var t = e.detail.value, n = this.data.shop;
            n.buyer_msg = t, this.setData({
                shop: n
            });
        },
        showShopActivity: function() {
            var e = this.data.shop;
            e.showActivityDetail = !0, this.setData({
                shop: e
            }), console.log(this.data.goods_list);
        },
        hideShopActivity: function() {
            var e = this.data.shop;
            e.showActivityDetail = !1, this.setData({
                shop: e
            });
        },
        showGoodsMessage: function(e) {
            var n = e.currentTarget.dataset.goodsid, a = e.currentTarget.dataset.skuid, o = this.data.goods_list.find(function(e) {
                return e.goodsId == n && e.skuId == a;
            });
            if (o) {
                var r = t.db.set(o);
                wx.navigateTo({
                    url: "../goods_message/index?goods=" + r
                });
            }
        },
        doReselectGoods: function() {
            wx.navigateBack();
        }
    };
}, function(e) {
    e.exports = {
        onSmsChange: function(e) {
            var t = +e.detail.value;
            this.data.order_no || this.setData({
                sms: t
            });
        }
    };
}, function(e) {
    e.exports = {
        showUnavailableDetail: function() {
            var e = this.data.unavailable_goods;
            e.showDetail = !0, this.setData({
                unavailable_goods: e
            });
        },
        hideUnavailableDetail: function() {
            var e = this.data.unavailable_goods;
            e.showDetail = !1, this.setData({
                unavailable_goods: e
            });
        }
    };
}, function(e) {
    e.exports = {
        data: {
            formId: ""
        },
        onPayClick: function(e) {
            var t = this;
            console.log("form id " + e.detail.formId);
            var n = e.detail.formId;
            this.setData({
                formId: n
            }), this.validateOrder() || !this.validateDeliveryStyle() || this.isPaying || (this.isPaying = !0, 
            wx.showToast({
                title: "支付数据提交中",
                icon: "loading",
                duration: 1e4
            }), this.data.order_no ? this.doPayOrder() : this.createOrder(function() {
                t.doPayOrder();
            }, function() {
                wx.hideToast(), t.isPaying = !1;
            }));
        },
        doPayOrder: function() {
            var e = this;
            this.payOrder({
                success: function() {
                    wx.hideToast(), e.isPaying = !1;
                },
                afterSync: function() {
                    wx.hideToast(), e.isPaying = !1;
                },
                fail: function() {
                    wx.hideToast(), e.isPaying = !1;
                }
            });
        }
    };
}, function(e, t, n) {
    var a = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(n(2)), o = {
        DAY_TIME: 1,
        MONTH_DAY: 2
    }, r = {
        FEATURE: "feature",
        CURRENT: "current",
        EXPIRED: "expired"
    }, i = {
        datepicker: {
            title: "请选择到店时刻",
            confirmText: "确定",
            show: !1,
            weekDay: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ],
            nowWeekDay: 0,
            view: o.DAY_TIME,
            currentTime: "",
            currentWeek: "",
            currentMonthDay: "",
            currentYear: "",
            navs: [],
            timeboxs: [],
            monthList: [],
            businessStartTime: {},
            businessEndTime: {},
            weekdaysBusinessTime: {},
            startMonthDay: ""
        }
    };
    e.exports = (0, a.default)({}, {
        onDatePickerToggle: function() {
            this.setData({
                "datepicker.show": !this.data.datepicker.show
            });
        },
        onDateTimeChange: function() {},
        onInvalidNavClick: function() {},
        onInvalidTimeClick: function() {},
        onCalClick: function() {
            this.setData({
                "datepicker.view": o.MONTH_DAY
            });
        },
        onTimeBoxClick: function(e) {
            var t, n = this, a = e.currentTarget.dataset.timeboxIndex, o = n.data.datepicker.timeboxs[a];
            o.stateClass !== r.CURRENT && n.data.datepicker.timeboxs.forEach(function(e, t) {
                if (e.stateClass === r.CURRENT && e.stateClass !== r.EXPIRED) {
                    var a;
                    n.setData((a = {}, a["datepicker.timeboxs[" + t + "].stateClass"] = r.FEATURE, a));
                }
            }), n.setData((t = {}, t["datepicker.timeboxs[" + a + "].stateClass"] = r.CURRENT, 
            t["datepicker.currentTime"] = o.value, t));
        },
        onConfirmBtnClick: function() {
            var e = this.getDatetime().date;
            this.onDateTimeChange(e), this.onDatePickerToggle();
        },
        onDayTimeNavClick: function(e) {
            var t = this, n = e.currentTarget.dataset.navIndex, a = t.data.datepicker.navs[n], o = a.week, r = a.monthDay, i = a.year, s = r.split("-"), c = s[0], u = s[1], l = t.getTimeboxs(c, u);
            t.setData({
                "datepicker.nowWeekDay": n,
                "datepicker.currentWeek": o,
                "datepicker.currentMonthDay": r,
                "datepicker.currentYear": i,
                "datepicker.timeboxs": l
            });
        },
        onDayboxClick: function(e) {
            var t = this, n = e.currentTarget.dataset.year, a = e.currentTarget.dataset.month, r = e.currentTarget.dataset.day, i = new Date(), s = i.getDate(), c = i.getMonth() + 1;
            if (n >= i.getFullYear() && (a >= c || r >= s)) {
                var u = t.getNavs(n + "/" + a + "/" + r);
                t.setData({
                    "datepicker.navs": u
                });
                var l = t.formatMonthDay(a - 1, r).split("-"), d = l[0], f = l[1], p = t.getTimeboxs(d, f), h = o.DAY_TIME;
                t.setData({
                    "datepicker.timeboxs": p,
                    "datepicker.view": h,
                    "datepicker.nowWeekDay": 0,
                    "datepicker.currentWeek": t.data.datepicker.currentWeek,
                    "datepicker.currentMonthDay": t.data.datepicker.currentMonthDay,
                    "datepicker.currentYear": t.data.datepicker.currentYear
                });
            }
        }
    }, {
        getNavs: function(e) {
            var t = this, n = i.datepicker, a = function(e) {
                var a = e.getFullYear(), o = n.weekDay[e.getDay()], r = e.getTime(), i = n.weekdaysBusinessTime.hasOwnProperty(o), s = t.formatMonthDay(e.getMonth(), e.getDate()), c = new Date(), u = o;
                if (a === c.getFullYear() && e.getMonth() === c.getMonth()) {
                    var l = e.getDate() - c.getDate();
                    -1 < l && 3 > l && (u = [ "今天", "明天", "后天" ][l]);
                }
                return {
                    year: a,
                    week: u,
                    monthDay: s,
                    time: r,
                    real_week: o,
                    canSelect: i
                };
            }, o = a(e ? new Date(e) : new Date());
            if (!o.canSelect) for (var r, s = 0; 7 > s; s++) if ((r = a(new Date(o.time + 864e5 * (s + 1)))).canSelect) {
                o = r;
                break;
            }
            n.currentYear = o.year, n.currentWeek = o.week, n.currentMonthDay = o.monthDay, 
            t.setData({
                "datepicker.currentWeek": n.currentWeek,
                "datepicker.currentMonthDay": n.currentMonthDay,
                "datepicker.currentYear": n.currentYear
            });
            for (var c, u = [], l = 1 == a(new Date(o.time)).canSelect ? 0 : 1, d = 0 + l; d < 5 + l; d++) c = a(new Date(o.time + 864e5 * d)), 
            u.push({
                year: c.year,
                real_week: c.real_week,
                week: c.week,
                monthDay: c.monthDay,
                canSelect: c.canSelect
            });
            return u;
        },
        getBusinessTime: function(e) {
            if (void 0 != e && 0 != e.length) {
                var t = {};
                return e.forEach(function(e) {
                    var n = {
                        startHour: e.open_time.split(":")[0],
                        startMinute: e.open_time.split(":")[1]
                    }, a = {
                        endHour: e.close_time.split(":")[0],
                        endMinute: e.close_time.split(":")[1]
                    };
                    e.weekdays.forEach(function(e) {
                        t[e] = {
                            open_time: n,
                            end_time: a
                        };
                    });
                }), t;
            }
        },
        getTimeboxs: function(e, t) {
            var n = i.datepicker, a = [], o = 0;
            if (e && t) for (var r = 0; r < n.navs.length; r++) if (n.navs[r].monthDay == e + "-" + t) {
                o = r;
                break;
            }
            for (var s, c = n.navs[o], u = n.weekdaysBusinessTime[c.real_week], l = u.open_time, d = l.startHour, f = l.startMinute, p = parseInt(d), h = new Date(), g = h.getDate(), m = h.getHours(), v = h.getMinutes(), y = parseInt(f) || 0, _ = u.end_time, w = _.endHour, x = _.endMinute, b = function(e, t, n, a) {
                var o = 2 * e;
                30 <= t && (o += 1);
                var r = 2 * n;
                return 30 <= a && (r += 1), r - o;
            }(p, y, parseInt(w), parseInt(x)), S = 0; S < b; S++) {
                s = p + ":" + (0 === y ? "00" : y), 60 <= (y += 30) && (p++, y -= 60);
                var T = p + ":" + (0 === y ? "00" : y), D = "feature";
                "今天" == c.week && (m > p || m === p && v > y) && (D = "expired"), (e > h.getMonth() + 1 || t > g) && (D = "feature"), 
                a.push({
                    value: s + "-" + T,
                    stateClass: D
                });
            }
            for (var k, I = 0, C = a.length; I < C; I++) if ("expired" != (k = a[I]).stateClass) {
                k.stateClass = "current", n.currentTime = k.value;
                break;
            }
            return a;
        },
        formatMonthDay: function(e, t) {
            return e = 10 > e + 1 ? "0" + (e + 1) : e + 1, t = 10 > t ? "0" + t : t, e + "-" + t;
        },
        getMonthList: function(e) {
            for (var t = this, n = [], a = e && 0 < e.length ? new Date(e) : new Date(), o = a.getFullYear(), r = a.getMonth(), i = 0; i < 3; i++) {
                var s = r + i + 1, c = t.getDaysInOneMonth(o, s);
                n.push({
                    y: o,
                    m: s,
                    ds: c
                });
            }
            return n;
        },
        getDaysInOneMonth: function(e, t) {
            var n = this, a = [], o = new Date(), r = o.getDate(), s = o.getMonth() + 1, c = o.getFullYear();
            o.setMonth(t), o.setDate(0);
            for (var u = new Date(e + "/" + t + "/1").getDay(), l = 0; l < u; l++) a.push({
                day: ""
            });
            for (var d = 1; d <= o.getDate(); d++) {
                var f = d, p = !(e > c || t > s || t === s && r <= f);
                if (!p) {
                    var h = new Date(e, t - 1, f), g = i.datepicker.weekDay[h.getDay()];
                    p = !i.datepicker.weekdaysBusinessTime.hasOwnProperty(g);
                }
                var m = n.formatMonthDay(t - 1, f);
                a.push({
                    day: f,
                    isExpired: p,
                    isToday: t === s && f === r,
                    monthDayStr: m
                });
            }
            return a;
        },
        showDatePicker: function(e, t) {
            var n = this;
            return e ? (i.datepicker.weekdaysBusinessTime = {}, (0, a.default)(i.datepicker.weekdaysBusinessTime, n.getBusinessTime(e)), 
            (0, a.default)(i.datepicker, {
                navs: n.getNavs(t && 0 < t.length ? t : void 0)
            }), (0, a.default)(i.datepicker, {
                timeboxs: n.getTimeboxs(),
                monthList: n.getMonthList(t)
            }), n.setData({
                datepicker: i.datepicker
            }), void n.setData({
                "datepicker.show": !this.data.datepicker.show
            })) : void n.setData({
                "datepicker.show": !this.data.datepicker.show
            });
        },
        getDatetime: function() {
            var e = this.data.datepicker.currentMonthDay.split("-"), t = e[0], n = e[1], a = this.data.datepicker.currentTime;
            return {
                date: this.data.datepicker.currentYear + "-" + t + "-" + n + " " + a
            };
        }
    });
}, , , , function(e) {
    var t = getApp();
    e.exports = {
        fetchOrder: function(e, n, a, o) {
            t.carmen({
                api: "kdt.trade.buyer.search/1.0.0/get",
                data: {
                    order_no: e,
                    kdt_id: n
                },
                success: function(e) {
                    a && a(e);
                },
                fail: function(e) {
                    console.log("fail", e), o && o();
                }
            });
        },
        fetchExpress: function(e, n, a, o) {
            t.carmen({
                api: "youzan.trade.dc.query/1.0.0/querybyorderno",
                data: {
                    order_no: e,
                    include_dist_order_and_detail: !0,
                    kdt_id: n
                },
                success: function(e) {
                    a && a(e);
                },
                fail: function(e) {
                    console.log("fail", e), o && o();
                }
            });
        },
        fetchSafe: function(e, n, a, o) {
            t.carmen({
                api: "trade.safe.detail/1.0.0/getStateShowList",
                data: {
                    order_no: e,
                    kdt_id: n
                },
                success: function(e) {
                    return a && a(e);
                },
                fail: function(e) {
                    console.log("fail", e), o && o();
                }
            });
        },
        fetchVirtualCode: function(e, n, a) {
            t.carmen({
                api: "kdt.trade.virtualcode/1.0.0/getqrcode",
                data: {
                    order_no: e
                },
                success: function(e) {
                    n && n(e);
                },
                fail: function(e) {
                    console.log("fail", e), a && a();
                }
            });
        }
    };
}, function(e, t, n) {
    var a = n(161), o = n(11), r = n(15), i = n(6);
    e.exports = {
        getOrderData: function(e) {
            var t = !1;
            e.items.forEach(function(e) {
                var n = e.goods_info || {};
                t = t || 0 < n.is_virtual;
            }), e.isVirtual = t;
            var n = e.state, s = a.getSteps(n, "" != e.self_fetch, 4 == e.activity_type);
            e.steps = s;
            var c = 0;
            if (e.items.forEach(function(e) {
                e.image_url = i(e.image_url, "!200x200.jpg");
                var t = "";
                e.sku.forEach(function(e) {
                    t += e.v + " ";
                }), e.skuStr = t, "string" == typeof e.message && 0 < e.message.length && (e.is_present ? e.message = [] : e.message = JSON.parse(e.message));
                var n = [];
                o(e.message, function(e, t) {
                    n.push({
                        name: t,
                        value: e
                    });
                }), e.message = n, c += 100 * e.item_total_price;
            }), e.totalPriceStr = r(c).toYuan(), e.isFreePostage = 0 == parseFloat(e.postage), 
            void 0 != e.preferences && null != e.preferences) {
                var u = e.preferences.order.coupons.money || {}, l = u.card || u.code || {};
                l.discountFee = r(l.used_value).toYuan(), e.couponData = l;
                var d = (e.preferences.order.reduce || [])[0] || {};
                d.discountFee = r(d.discount_fee).toYuan(), e.reduceData = d;
            }
            return e;
        },
        parseSafeData: function(e, t) {
            return (t.items || []).forEach(function(t) {
                o(e, function(e, n) {
                    n == t.item_id && (t.safe = {
                        show: 1 == e.showType,
                        text: e.showText,
                        safe_no: e.safeNo
                    });
                });
            }), t;
        },
        getMessagePageData: function(e) {
            return e.payPriceStr = e.pay_price, e.imgUrl = e.image_url, e;
        }
    };
}, , , , , function(e) {
    var t = getApp();
    e.exports = {
        getApplyBasicData: function(e, n, a) {
            t.carmen({
                api: "kdt.trade.safe.detail/1.0.0/getSafeApplyBasicInfo",
                data: e,
                success: function(e) {
                    n && n(e);
                },
                fail: function(e) {
                    a && a(e.msg);
                }
            });
        },
        submit: function(e, n, a) {
            var o = {
                safe_no: e.safe_no,
                order_no: e.order_no,
                kdt_id: e.kdt_id,
                phone: e.phone,
                photos: e.photos,
                refund_fee: e.money,
                remark: e.message,
                safe_reason: e.reason,
                safe_type: e.method
            };
            e.item_id && (o.item_id = e.item_id), t.carmen({
                api: "kdt.trade.safe.creator/1.0.0/safeCreateOrUpdate",
                data: o,
                method: "POST",
                success: function(e) {
                    n && n(e);
                },
                fail: function(e) {
                    a && a(e.msg, e);
                }
            });
        }
    };
}, function(e, t, n) {
    function a() {
        return i.makeRandomString(8) + new Date().getTime();
    }
    function o(e) {
        var t = {
            refund: e.refund.map(function(e) {
                var t = [];
                return r(e, function(e, n) {
                    t.push({
                        code: n,
                        text: e
                    });
                }), t;
            })
        }, n = [];
        return r(e.refund_and_return, function(e, t) {
            n.push({
                code: t,
                text: e
            });
        }), t.refund_and_return = n, t;
    }
    var r = n(11), i = n(56), s = n(6);
    e.exports = {
        parseSafeBasicData: function(e, t) {
            var n = {}, i = {}, c = [ {
                text: "请选择处理方式",
                code: 0
            } ];
            if (r(e.type, function(e, t) {
                c.push({
                    text: e,
                    code: t
                });
            }), n.methods = c, n.pay_time = e.pay_time, n.goods_title = e.goods_title, t) {
                var u = e.safe_info || {};
                n.moneyStr = u.refund_fee, n.phone = u.phone || "", n.message = u.remark || "", 
                n.method = u.safe_type || 0, n.express = 0, n.reason = u.safe_reason || 0, n.imgs = (u.ext_info || []).map(function(e) {
                    return {
                        uploading: !1,
                        src: e,
                        key: a(),
                        srcPreview: s(e, "!200x200.jpg")
                    };
                });
            }
            return n.real_pay = e.real_pay, n.is_full_refund = e.is_full_refund, i.reason_relation = o(e.reason_relation), 
            n.originData = i, n;
        },
        getReasons: function(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0, a = [ {
                code: 0,
                text: "请选择退款原因"
            } ];
            return t ? a = 1 == t ? a.concat(e.refund[n] || []) : a.concat(e.refund_and_return) : a;
        }
    };
}, , function(e, t, n) {
    var a = n(314), o = n(15), r = n(6);
    e.exports = {
        parseSafeData: function(e) {
            var t = {
                safe: e,
                type: a.stateMap[e.state] || "safe-ing",
                btns: a.btnsMap[e.state] || [],
                item_id: e.item_id
            }, n = e.log;
            n.forEach(function(e) {
                e.ext_info = e.ext_info || [], e.ext_info = e.ext_info.map(function(e) {
                    return {
                        src: e,
                        srcPreview: r(e, "!200x200.jpg")
                    };
                });
            }), t.log = n;
            var i = e.item || {}, s = "";
            return e.item.sku.forEach(function(e) {
                s += e.v + " ";
            }), i.skuStr = s, i.payPriceStr = o(e.item.pay_price).toYuan(), i.imgPreview = r(i.img_url, "!200x200.jpg"), 
            i.orderStateStr = e.order_state.status_str, t.goods = i, t.timeout = 1e3 * e.timeout || 0, 
            t;
        },
        parseRefundProcessData: function(e) {
            var t = {
                pay_method_str: (e = e[0] || {}).pay_method_str || "",
                add_time: e.add_time
            }, n = [];
            n.push({
                text: "卖家退款(" + e.add_time + ")",
                done: !0
            }), n.push({
                text: e.pay_method_str + "(" + e.update_time + ")",
                done: !0
            });
            var a = {
                text: "确认到账",
                done: !1
            };
            return 2 == e.refund_state && (a.text = "确认到账(" + e.update_time + ")", a.done = !0), 
            n.push(a), t.steps = n, t;
        }
    };
}, function(e) {
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
}, function(e, t, n) {
    var a = n(70), o = n(111), r = n(6);
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
            var e = this, t = this.data.messageDialog;
            return t.message ? this.validateImages(t.imgs) ? void (this.isSubmitingMessage || (this.isSubmitingMessage = !0, 
            o.submitMessage(this.data, function(t) {
                e.isSubmitingMessage = !1;
                var n = e.data.messageDialog || {};
                n.message = "", n.imgs = [], n.show = !1;
                var a = t;
                a.ext_info = a.ext_info.map(function(e) {
                    return {
                        src: e,
                        srcPreview: r(e, "!200x200.jpg")
                    };
                });
                var o = e.data.log || [];
                o.unshift(a), e.setData({
                    log: o,
                    messageDialog: n
                });
            }, function(t) {
                e.isSubmitingMessage = !1, e.showZanToast(t || "网络抖了下，请稍候再试~");
            }))) : void this.showZanToast("还有部分图片还没有上传完成，请稍候再试~") : void this.showZanToast("请填写留言信息");
        },
        chooseMessageImages: function() {
            var e = this, t = this.data, n = t.MAX_PICTURES - t.messageDialog.imgs.length;
            n = 0 < n ? n : 0, wx.chooseImage({
                count: n,
                sizeType: [ "compressed" ],
                success: function(n) {
                    var a = n.tempFilePaths || [], o = e.data.messageDialog.imgs || [], r = [];
                    return o.length + a.length > t.MAX_PICTURES ? void e.showZanToast("最多一共只能上传" + t.MAX_PICTURES + "张图片~") : (a.forEach(function(t) {
                        r.push({
                            uploading: !0,
                            src: t,
                            srcPreview: t,
                            key: e.generateKey()
                        });
                    }), e.uploadMessageImgs(r), o = o.concat(r), void e.setData({
                        "messageDialog.imgs": o
                    }));
                }
            });
        },
        onMessageImageDelete: function(e) {
            var t = (e.currentTarget.dataset || {}).key || "", n = this.data.messageDialog.imgs || [], a = n.findIndex(function(e) {
                return e.key == t;
            });
            0 > a || (n.splice(a, 1), this.setData({
                "messageDialog.imgs": n
            }));
        },
        uploadMessageImgs: function() {
            var e = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [];
            a(t, {
                kdt_id: this.data.kdt_id,
                afterUploadSuccess: function(t, n) {
                    var a = e.data.messageDialog.imgs, o = a.findIndex(function(e) {
                        return n.key == e.key;
                    });
                    if (!(0 > o)) {
                        var i = a[o];
                        i.src = t, i.srcPreview = r(t, "!100x100.jpg"), i.uploading = !1, e.setData({
                            "messageDialog.imgs": a
                        });
                    }
                },
                afterUploadFail: function(t) {
                    var n = e.data.messageDialog.imgs, a = n.findIndex(function(e) {
                        return t.key == e.key;
                    });
                    0 > a || (n.splice(a, 1), e.setData({
                        "messageDialog.imgs": n
                    }), e.showZanToast("部分图片上传出错，已经自动剔除"));
                }
            });
        }
    };
}, function(e, t, n) {
    var a = n(70), o = n(111), r = n(6);
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
            var e = this, t = this.data.youzanDialog;
            return t.message ? this.validateImages(t.imgs) ? void (this.isSubmitingYouzan || (this.isSubmitingYouzan = !0, 
            o.submitYouzan(this.data, function() {
                e.isSubmitingYouzan = !1, e.setData({
                    "youzanDialog.message": "",
                    "youzanDialog.show": !1,
                    "youzanDialog.imgs": []
                }), e.fetchSafeData();
            }, function(t) {
                e.isSubmitingYouzan = !1, e.showZanToast(t || "网络抖了下，请稍候再试~");
            }))) : void this.showZanToast("还有部分图片还没有上传完成，请稍候再试~") : void this.showZanToast("请填写维权理由");
        },
        chooseYouzanImages: function() {
            var e = this, t = this.data, n = t.MAX_PICTURES - t.youzanDialog.imgs.length;
            n = 0 < n ? n : 0, wx.chooseImage({
                count: n,
                sizeType: [ "compressed" ],
                success: function(n) {
                    var a = n.tempFilePaths || [], o = e.data.youzanDialog.imgs || [], r = [];
                    return o.length + a.length > t.MAX_PICTURES ? void e.showZanToast("最多一共只能上传" + t.MAX_PICTURES + "张图片~") : (a.forEach(function(t) {
                        r.push({
                            uploading: !0,
                            src: t,
                            srcPreview: t,
                            key: e.generateKey()
                        });
                    }), e.uploadYouzanImgs(r), o = o.concat(r), void e.setData({
                        "youzanDialog.imgs": o
                    }));
                }
            });
        },
        onYouzanImageDelete: function(e) {
            var t = (e.currentTarget.dataset || {}).key || "", n = this.data.youzanDialog.imgs || [], a = n.findIndex(function(e) {
                return e.key == t;
            });
            0 > a || (n.splice(a, 1), this.setData({
                "youzanDialog.imgs": n
            }));
        },
        uploadYouzanImgs: function() {
            var e = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [];
            a(t, {
                kdt_id: this.data.kdt_id,
                afterUploadSuccess: function(t, n) {
                    var a = e.data.youzanDialog.imgs, o = a.findIndex(function(e) {
                        return n.key == e.key;
                    });
                    if (!(0 > o)) {
                        var i = a[o];
                        i.src = t, i.srcPreview = r(t, "!100x100.jpg"), i.uploading = !1, e.setData({
                            "youzanDialog.imgs": a
                        });
                    }
                },
                afterUploadFail: function(t) {
                    var n = e.data.youzanDialog.imgs, a = n.findIndex(function(e) {
                        return t.key == e.key;
                    });
                    0 > a || (n.splice(a, 1), e.setData({
                        "youzanDialog.imgs": n
                    }), e.showZanToast("部分图片上传出错，已经自动剔除"));
                }
            });
        }
    };
}, , , function(e) {
    e.exports = {
        status: {
            all: "ALL",
            topay: "WAIT_BUYER_PAY",
            togroup: "WAIT_GROUP",
            tosend: "WAIT_SELLER_SEND_GOODS",
            send: "WAIT_BUYER_CONFIRM_GOODS",
            sign: "TRADE_BUYER_SIGNED"
        },
        btns: {
            topay: [ "cancel", "topay" ],
            tosend: [],
            togroup: [],
            send: [],
            sign: [],
            cancel: []
        },
        tab: {
            list: [ {
                id: "all",
                title: "全部"
            }, {
                id: "topay",
                title: "待付款"
            }, {
                id: "togroup",
                title: "待成团"
            }, {
                id: "tosend",
                title: "待发货"
            }, {
                id: "send",
                title: "待收货"
            } ],
            selectedId: "all",
            scroll: !1
        },
        list: {
            all: {
                list: [],
                page: 1,
                finished: !1
            },
            topay: {
                list: [],
                page: 1,
                finished: !1
            },
            togroup: {
                list: [],
                page: 1,
                finished: !1
            },
            tosend: {
                list: [],
                page: 1,
                finished: !1
            },
            send: {
                list: [],
                page: 1,
                finished: !1
            },
            sign: {
                list: [],
                page: 1,
                finished: !1
            },
            rights: {
                list: [],
                page: 1,
                finished: !1
            }
        }
    };
}, function(e) {
    var t = getApp();
    e.exports = {
        cancel: function(e, n, a, o) {
            t.carmen({
                api: "kdt.trade.bill.cancel/1.0.0/get",
                data: {
                    order_no: e,
                    kdt_id: n
                },
                success: function(e) {
                    e.is_success && a && a(e);
                },
                fail: function(e) {
                    o && o(e);
                }
            });
        },
        fetchOrderList: function(e, n, a) {
            t.carmen({
                api: "kdt.trade.buyer.search/1.0.0/get",
                data: e,
                success: function(e) {
                    n && n(e);
                },
                fail: function(e) {
                    a && a(e);
                }
            });
        },
        fetchOrder: function(e, n) {
            t.carmen({
                api: "kdt.trade.buyer.search/1.0.0/get",
                data: {
                    order_no: e
                },
                success: function(e) {
                    n && n(e);
                }
            });
        },
        fetchSafe: function(e, n, a, o) {
            t.carmen({
                api: "trade.safe.detail/1.0.0/getStateShowList",
                data: {
                    order_no: e,
                    kdt_id: n
                },
                success: function(e) {
                    return a && a(e);
                },
                fail: function(e) {
                    console.log("fail", e), o && o();
                }
            });
        }
    };
}, , function(e) {
    e.exports = {
        _handleZanTabChange: function(e) {
            var t = e.currentTarget.dataset, n = {
                selectedId: t.itemId,
                index: t.index
            };
            console.info("[zan:tab:change]", n), this.handleZanTabChange ? this.handleZanTabChange(n, e) : console.warn("页面缺少 handleZanTabChange 回调函数");
        }
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var o = Math.ceil, r = a(n(324)), i = a(n(10)), s = a(n(7)), c = n(328), u = (c.debounce, 
    c.chunk), l = getApp(), d = function(e) {
        return "topic-" + e;
    };
    e.exports = {
        data: {
            tabScrollLeft: 0,
            banner: {
                topic: 160
            },
            selectedId: null,
            scrollViewId: "",
            isTabFixed: !1,
            tab: {},
            sections: [],
            scrollRange: [],
            loader: {}
        },
        component: {
            loadFlTopic: function() {
                var e = this;
                this.setData({
                    loading: !0
                }), l.carmen({
                    api: "weapp.spotlight.topic/1.0.0/gettopicbyidfront",
                    data: {
                        topic_id: this.data.topicId,
                        with_recommend: !1
                    },
                    success: function(t) {
                        if (t) {
                            var n = e.parseSections(t);
                            e.setData((0, s.default)({}, n, {
                                loadFail: !1
                            })), wx.setNavigationBarTitle({
                                title: t.title
                            });
                        }
                        e.loadFlGoodsBySection();
                    },
                    fail: function() {
                        0 == e.data.goods.length && e.setData({
                            loadFail: !0
                        });
                    },
                    complete: function() {
                        e.setData({
                            loading: !1
                        });
                    }
                });
            },
            loadFlGoods: function(e) {
                return new i.default(function(t) {
                    l.carmen({
                        api: "weapp.spotlight.topicgoods/1.0.0/getgoodsbytopicid",
                        data: e,
                        success: function(e) {
                            t(e);
                        },
                        fail: function(e) {
                            t(e);
                        },
                        complete: function() {
                            t();
                        }
                    });
                });
            },
            loadFlGoodsBySection: function(e) {
                var t, n = this, a = this.data, r = a.topicId, c = a.selectedId, u = a.loader, l = a.perpage, d = a.sections, f = (a.sectionRange, 
                a.scrollRange), p = a.itemSize, h = u[e = e || c], g = h.loaded, m = h.loading, v = h.queue, y = h.index, _ = this.loadFlGoods;
                return !(g || m) && (this.setData({
                    loader: (0, s.default)({}, u, (t = {}, t[e] = (0, s.default)({}, h, {
                        loading: !0
                    }), t))
                }), void i.default.all(v.map(function(t, n) {
                    return _({
                        topic_id: r,
                        topic_section_id: e,
                        page: n + 1,
                        page_size: l
                    });
                })).then(function(t) {
                    var a, r = d[y], i = r.count, c = t.reduce(function(e, t) {
                        return e + t.length;
                    }, 0), l = (o(i / 2) - o(c / 2)) * (78 + p), g = f.map(function(e, t) {
                        return t > y ? e - l : e;
                    });
                    d.splice(y, 1, (0, s.default)({}, r, {
                        goodsList: t
                    })), n.setData({
                        sections: d,
                        scrollRange: g,
                        loader: (0, s.default)({}, u, (a = {}, a[e] = (0, s.default)({}, h, {
                            loading: !1,
                            loaded: !0
                        }), a))
                    });
                }).catch(function() {
                    var e;
                    n.setData({
                        loader: (0, s.default)({}, u, (e = {}, e[c] = (0, s.default)({}, h, {
                            loading: !1,
                            loaded: !1
                        }), e))
                    });
                }));
            },
            handleZanTabChange: function(e, t) {
                var n = e.selectedId, a = (e.index, this.data.tab), o = t.target.offsetLeft - 10;
                this.setData({
                    selectedId: n,
                    tabScrollLeft: o,
                    scrollViewId: d(n),
                    tab: (0, s.default)({}, a, {
                        selectedId: n
                    })
                }), this.loadFlGoodsBySection(n);
            },
            onBannerLoad: function(e) {
                var t, n = this.data, a = n.banner, o = n.scrollRange, r = e.detail.height, i = e.target.dataset.bannerId, c = o.map(function(e, t) {
                    return t - 2 > i ? e + r : e;
                });
                this.setData({
                    banner: (0, s.default)({}, a, (t = {}, t[i] = r, t)),
                    scrollRange: c
                });
            },
            onScroll: function(e) {
                var t, n = this.data, a = (n.isTabFixed, n.loader), o = n.selectedId, r = n.tab, i = n.sections, c = n.scrollRange, u = n.itemSize, l = a[o].index, d = 0 < l ? l - 1 : 0, f = l < r.list.length - 1 ? l + 1 : l, p = e.detail.scrollTop, h = [ c[l], c[l + 1] ], g = (this.compareTabPos(p), 
                p <= h[0] + 10), m = p >= h[1] - 10, v = p <= h[0] + 10 - 2 * (78 + u), y = p >= h[1] - 10 - 2 * (78 + u), _ = i[d].id, w = i[f].id;
                (v || y) && (v ? o = _ : y && (o = w), this.loadFlGoodsBySection(o)), (g || m) && (g ? (o = _, 
                t = d) : m && (o = w, t = f), this.setData({
                    selectedId: o,
                    tab: (0, s.default)({}, r, {
                        selectedId: o
                    }),
                    tabScrollLeft: r.list.reduce(function(e, n, a) {
                        return a < t ? e + n.titleWidth : e;
                    }, 0)
                }));
            },
            compareTabPos: function(e) {
                return e >= this.data.banner.topic;
            },
            parseSections: function(e) {
                var t, n = this.data, a = n.image_url, i = n.perpage, s = n.windowWidth, c = n.itemSize, l = (e.title, 
                e.sections), f = l[0].id, p = [], h = {}, g = [ 0 ], m = a ? 45 + ~~(s / 375 * 160) : 0;
                return l = l.map(function(e, t) {
                    var n = e.id, a = e.name, l = e.title, f = e.count, v = e.description, y = e.image_url, _ = 21 * o(v.length / (s / 12)) + 44;
                    return p.push({
                        id: n,
                        title: a,
                        titleWidth: 14 * l.length + 10
                    }), g.push((g[t] || m) + _ + o(+f / 2) * (78 + c)), h[n] = {
                        index: t,
                        queue: (0, r.default)({
                            length: o(+f / i)
                        }, function() {
                            return {
                                loaded: !1,
                                loading: !1
                            };
                        })
                    }, {
                        id: n,
                        count: f,
                        title: l,
                        description: v,
                        image_url: y,
                        topicViewId: d(n),
                        goodsList: u((0, r.default)({
                            length: +f
                        }, function() {
                            return {};
                        }), 6)
                    };
                }), t = {
                    scroll: !0,
                    height: 44,
                    selectedId: f,
                    list: p
                }, g.splice(g.length - 1, 1), {
                    tab: t,
                    selectedId: f,
                    scrollRange: g,
                    sections: l,
                    loader: h,
                    goodsInfo: e
                };
            }
        }
    };
}, function(e, t, n) {
    e.exports = {
        default: n(325),
        __esModule: !0
    };
}, function(e, t, n) {
    n(60), n(326), e.exports = n(9).Array.from;
}, function(e, t, n) {
    var a = n(36), o = n(25), r = n(51), i = n(149), s = n(150), c = n(85), u = n(327), l = n(95);
    o(o.S + o.F * !n(152)(function(e) {
        Array.from(e);
    }), "Array", {
        from: function(e) {
            var t, n, o, d, f = r(e), p = "function" == typeof this ? this : Array, h = arguments.length, g = 1 < h ? arguments[1] : void 0, m = void 0 !== g, v = 0, y = l(f);
            if (m && (g = a(g, 2 < h ? arguments[2] : void 0, 2)), void 0 == y || p == Array && s(y)) for (t = c(f.length), 
            n = new p(t); t > v; v++) u(n, v, m ? g(f[v], v) : f[v]); else for (d = y.call(f), 
            n = new p(); !(o = d.next()).done; v++) u(n, v, m ? i(d, g, [ o.value, v ], !0) : o.value);
            return n.length = v, n;
        }
    });
}, function(e, t, n) {
    var a = n(26), o = n(49);
    e.exports = function(e, t, n) {
        t in e ? a.f(e, t, o(0, n)) : e[t] = n;
    };
}, function(e) {
    e.exports = {
        chunk: function(e, t) {
            var n = e.length;
            if (!n || !t || 1 > t) return [];
            for (var a = 0, o = 0, r = Array(Math.ceil(n / t)); a < n; ) r[o++] = e.slice(a, a += t);
            return r;
        },
        debounce: function(e, t) {
            var n;
            return function() {
                var a = this, o = arguments;
                n && clearTimeout(n), n = setTimeout(function() {
                    e.apply(a, o);
                }, t);
            };
        }
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var o = a(n(7)), r = a(n(3)), i = getApp();
    e.exports = {
        data: {
            goods: [],
            page: 1,
            perpage: 6,
            loading: !0,
            nomore: !1,
            nodata: !1,
            clickInterface: {
                clickInterface: "refreshData"
            }
        },
        component: {
            _loadStatus: function(e) {
                var t = !0, n = !1, a = !1, o = this.data, r = o.page, i = o.perpage;
                return 1 !== r || e.length || (t = !1, a = !0), e.length < i && (t = !1, n = !0), 
                {
                    loading: t,
                    nomore: n,
                    nodata: a
                };
            },
            loadWfTopic: function() {
                var e = this;
                i.carmen({
                    api: "weapp.topic/1.0.0/gettopicwithgoodsbyid",
                    method: "GET",
                    data: {
                        topic_id: this.data.topicId
                    },
                    success: function(t) {
                        if (t) {
                            var n = e.data, a = n.page, i = (n.perpage, t.goods_list || []);
                            e.setData((0, r.default)((0, o.default)({}, e._loadStatus(i)), {
                                page: a + 1,
                                goodsInfo: t,
                                goods: i
                            })), wx.setNavigationBarTitle({
                                title: t.title
                            });
                        }
                    },
                    fail: function() {
                        0 === e.data.goods.length && e.setData({
                            loadFail: !0
                        });
                    }
                });
            },
            loadWfGoods: function() {
                var e = this, t = this.data, n = t.topicId, a = t.page, s = t.perpage, c = t.goods;
                i.carmen({
                    api: "weapp.topic/1.0.0/getgoodsbytopicid",
                    method: "GET",
                    data: {
                        page: a,
                        perpage: s,
                        section_id: 0,
                        topic_id: n
                    },
                    success: function(t) {
                        var n = t || [];
                        c = c.concat(n), e.setData((0, r.default)((0, o.default)({}, e._loadStatus(n)), {
                            page: a + 1,
                            goods: c
                        }));
                    },
                    fail: function() {
                        0 === c.length && e.setData({
                            loadFail: !0
                        });
                    }
                });
            },
            onWfPageScrollToLower: function() {
                var e = this.data, t = e.nomore, n = e.nodata;
                t || n || this.loadWfGoods();
            },
            refreshData: function() {
                this.setData({
                    page: 1,
                    loading: !0,
                    nomore: !1,
                    nodata: !1,
                    loadFail: !1
                }), this.loadWfTopic();
            }
        }
    };
} ]);