var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, a = function() {
    function t(t, a) {
        var e = [], o = !0, i = !1, n = void 0;
        try {
            for (var r, l = t[Symbol.iterator](); !(o = (r = l.next()).done) && (e.push(r.value), 
            !a || e.length !== a); o = !0) ;
        } catch (t) {
            i = !0, n = t;
        } finally {
            try {
                !o && l.return && l.return();
            } finally {
                if (i) throw n;
            }
        }
        return e;
    }
    return function(a, e) {
        if (Array.isArray(a)) return a;
        if (Symbol.iterator in Object(a)) return t(a, e);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = require("../../../utils/cat.js"), o = require("../../../utils/lx.js"), i = require("../../../utils/util.js"), n = getApp(), r = require("../../../config.js"), l = null, s = null, c = 0, d = (r.TICKET_APPID, 
r.WAIMAI_APPID), u = (r.TRAIN_APPID, [ {
    name: "美食",
    defaultId: 20639,
    tag: "food"
}, {
    name: "猫眼电影",
    tag: "movie",
    defaultId: 99,
    url: "/movie/pages/home/index"
}, {
    name: "酒店住宿",
    defaultId: 20641,
    tag: "hotel",
    url: "/hotel/pages/list/index?defaultId=20641&tag=hotel&name=酒店住宿"
}, {
    name: "门票",
    defaultId: 296,
    tag: "ticket",
    url: "/ticket/pages/index/index"
} ]), f = i.canIUse;

(0, e.page)({
    data: {
        placeholder: "请输入商家名、品类或者商圈...",
        guessUrl: "https://api.mobile.meituan.com/group/v2/recommend/homepage/city/",
        loadingTxt: "加载中...",
        sysInfo: n.globalData.sysInfo,
        nav: [],
        layout: {
            col: 5,
            row: 2
        },
        guessData: [],
        cityInfo: {},
        bannerList: [],
        emitLx: 0,
        resourceStateData: {},
        asideHalf: !1
    },
    scrollTop: 0,
    globalId: "",
    offset: 0,
    displayed: [],
    bottom: !1,
    searchClick: function() {
        o.moduleClick("b_r48jj85q");
    },
    bannerClick: function(t) {
        i.postFormId(t.detail.formId);
        var a = t.currentTarget || t.target;
        if (a && a.dataset) {
            var e = a.dataset, n = e.bid, l = e.vallab, s = e.type, c = e.url, d = e.miniapp, u = void 0 === d ? {} : d;
            if ((n || l) && o.moduleClick(n || "", l), "miniapp" === s) try {
                wx.canIUse("navigateToMiniProgram") && wx.navigateToMiniProgram({
                    appId: r[u.id] || u.appid,
                    path: u.path,
                    extraData: u.extraData || {},
                    success: function(t) {
                        console.log("跳转至小程序成功===>", t);
                    },
                    fail: function(t) {
                        console.log("跳转至小程序失败===>", t);
                    }
                });
            } catch (t) {
                console.log(t), wx.showModal({
                    title: "提示信息",
                    content: "微信版本太低，请下载最新版查看该服务。",
                    showCancel: !1
                });
            } else wx.navigateTo({
                url: c
            });
        }
    },
    showDot: function(t, a) {
        if (f("createSelectorQuery", !1)) {
            var e = wx.createSelectorQuery();
            e.select(".nav-view").boundingClientRect(), e.exec(function(e) {
                l || (l = new i.ViewGA({
                    visibleHeight: n.globalData.sysInfo.windowHeight,
                    val_lab: a,
                    lx: o,
                    bid: t
                })), l.addDots(e[0]), l.init();
            });
        }
    },
    showPoiDot: function(t) {
        if (f("createSelectorQuery")) {
            var a = this, e = wx.createSelectorQuery();
            e.selectAll(".newcard").boundingClientRect(), e.exec(function(e) {
                e[0].forEach(function(t) {
                    t.bottom += a.scrollTop, t.top += a.scrollTop;
                }), s ? s.val_lab = {
                    global_id: a.globalId
                } : s = new i.ViewGA({
                    visibleHeight: n.globalData.sysInfo.windowHeight,
                    val_lab: {
                        global_id: a.globalId
                    },
                    lx: o,
                    bid: t
                }), s.addDots(e[0]), s.init();
                var r = a.data.guessData.map(function(t, a) {
                    return t.isInExposureQueue ? t : Object.assign({}, t, {
                        isInExposureQueue: !0
                    });
                });
                a.setData({
                    guessData: r
                });
            });
        }
    },
    onPageScroll: function(t) {
        var a = t.scrollTop;
        this.data.asideHalf !== a > c && this.setData({
            asideHalf: a > c
        }), c = this.scrollTop = a || 0, l && l.check(a), s && s.check(a);
    },
    jumpToApp: function(t) {
        var a = void 0;
        switch (t) {
          case "waimai":
            a = d;
        }
        f("navigateToMiniProgram") && wx.navigateToMiniProgram({
            appId: a,
            path: "",
            extraData: {
                fromMTApp: 1,
                from: "mt"
            },
            success: function(t) {
                console.log("+++ res +++", t);
            },
            fail: function(t) {
                wx.showModal({
                    title: "提示信息",
                    content: "暂时无法提供服务，请稍后再试",
                    showCancel: !1,
                    success: function() {}
                });
            }
        });
    },
    jumpToList: function(t) {
        var a = "";
        a = t.url ? t.url : "/mt/pages/list/list?defaultId=" + t.defaultId + "&tag=" + t.tag + "&name=" + t.name, 
        wx.navigateTo({
            url: a
        });
    },
    jumpToSearch: function(t) {
        var a = "/index/pages/search/search?";
        switch (t) {
          case "food":
            a += "cateId=1";
            break;

          case "liren":
            a += "cateId=22";
            break;

          case "ktv":
            a += "cateId=2&subCate=10";
        }
        wx.navigateTo({
            url: a
        });
    },
    navTapHandler: function(t) {
        i.postFormId(t.detail.formId);
        var a = t.currentTarget.dataset.index, e = this, n = {
            custom: {
                title: e.data.nav[a].name,
                index: a,
                icon_id: e.data.nav[a].defaultId
            }
        };
        o.moduleClick("b_ws82nw3u", n);
        var r = this.data.nav[a], l = r.tag;
        "waimai" === l ? this.jumpToApp(l) : "liren" === l || "ktv" === l || "food" === l ? this.jumpToSearch(l) : this.jumpToList(r);
    },
    filterTransaction: function(t) {
        return /^20[1-9][0-9]/.test(t);
    },
    onLoad: function(t) {
        var a = this;
        if (1034 === getApp().globalData.scene) {
            var e = t.env || "prod", o = getApp().globalData.out_trade_no ? getApp().globalData.out_trade_no : t.out_trade_no, i = getApp().globalData.transaction_id ? getApp().globalData.transaction_id : t.transaction_id;
            return o && i || wx.reportAnalytics("finance_wmq_param"), void wx.redirectTo({
                url: "/finance-ext/pages/sendWMCoupon/index?out_trade_no=" + o + "&transaction_id=" + i + "&env=" + e
            });
        }
        t && t.transaction_id && this.filterTransaction(t.out_trade_no) ? wx.redirectTo({
            url: "/finance-ext/pages/distribute/index?out_trade_no=" + t.out_trade_no + "&transaction_id=" + t.transaction_id
        }) : (n.getWxUserInfo(), n.getCityInfo().then(function(t) {
            var e = wx.getStorageSync("mt_cityInfo"), o = new Date(new Date().toLocaleDateString()).getTime();
            n.globalData.coldBoot && e.timestamp < o && (n.getLocalCity().then(function(e) {
                e.id != t.id && a.showCityCheck(t, e, function(t) {
                    a.setData({
                        cityInfo: t,
                        guessData: []
                    }), a.loadPortmConfig(), a.getGuessData(function() {
                        n.hideLoading();
                    }, function() {
                        n.showErrTip("数据读取失败");
                    });
                });
            }), n.globalData.coldBoot = !1), a.setData({
                cityInfo: t
            }), a.loadPortmConfig(), a.getGuessData(function() {
                n.hideLoading();
            }, function() {
                n.showErrTip("数据读取失败");
            });
        }).catch(function(t) {
            console.log(t);
        }));
    },
    loadPortmConfig: function() {
        var t = this;
        i.request("https://portal-portm.meituan.com/weapp/group/page/index/v5").then(function(a) {
            if (a) {
                var e = a.data;
                if (e) {
                    var o = e.banner, i = e.flash, r = e.nav, l = e.scenes;
                    t.setData({
                        bannerList: o.data,
                        flash: i,
                        nav: r.data,
                        scenes: l,
                        layout: r.layout
                    }), n.delayCallbackEmit();
                }
            }
        });
    },
    formatURI: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        e = Object.assign({}, e), t = (t = decodeURIComponent(t)).replace("img.meituan.net", "p0.meituan.net");
        var o = /p([0-1]{1})\.meituan\.net(\/[^@]+)@?(.*)?/;
        if (o.test(t)) {
            var i = o.exec(t), n = a(i, 4), r = (n[0], n[1], n[2]), l = n[3];
            r = r.replace("/w.h/", "/");
            var s = Object.keys(e).map(function(t) {
                return "" + e[t] + t;
            }).join("_");
            return s && (l = (l ? l + "|" : "") + s), "http://p" + [].reduce.call(r, function(t, a) {
                return t + a.charCodeAt(0) | 0;
            }, 0) % 2 + ".meituan.net" + r + (l ? "@" + l : "");
        }
        return t;
    },
    jumpTogo: function(t) {
        var a = t.currentTarget.dataset, e = a.type, n = a.id, r = a.from, l = a.index, s = a.source, c = t.detail.formId;
        i.postFormId(c, s);
        var d = "", u = {
            custom: {
                type: e,
                index: l,
                id: n,
                global_id: this.globalId
            }
        };
        switch (o.moduleClick("b_gzc047ln", u), e) {
          case "deal":
            d = "/mt/pages/deal/deal?id=" + n;
            break;

          case "poi":
            d = "MPOI_MOVIE" === r ? "/movie/pages/cinema/cinema?poiId=" + n : "POI_HOTEL" === r || "POI_HOTEL2" === r ? "/hotel/pages/poi/poi?poiId=" + n : "POI_LVYOU" === r ? "/ticket/pages/poi/poi?poiid=" + n : "/mt/pages/poi/poi?id=" + n;
            break;

          case "film":
            d = "/movie/pages/cinema/movie?movieId=" + n;
        }
        wx.navigateTo({
            url: d
        });
    },
    getGuessData: function(t, a) {
        var e = this, o = this.data.cityInfo;
        if (!0 !== this.bottom) {
            var l = r.guessApi;
            n.getLocation(function(r) {
                var s = {
                    token: n.globalData.token,
                    userid: n.globalData.userId,
                    uuid: wx.getStorageSync("uuid"),
                    scene: "wx_guess",
                    position: r.latitude + "," + r.longitude,
                    client: "xiaochengxu",
                    globalId: e.globalId,
                    displayed: e.displayed.toString().toLocaleUpperCase()
                };
                i.request("" + l + o.id + "?" + i.json2Form(s), {
                    data: i.json2Form({
                        offset: e.offset
                    }),
                    method: "POST",
                    header: {
                        "content-type": "application/json"
                    },
                    complete: function(t) {
                        ~t.errMsg.indexOf("request:fail") && wx.redirectTo({
                            url: "/index/pages/nodata/nodata?type=network"
                        });
                    }
                }).then(function(o) {
                    if ("200" == o.statusCode) {
                        if (o && o.data.data) {
                            var i = e.data.guessData;
                            e.bottom = o.data.bottom;
                            try {
                                var n = o.data.data.filter(function(t) {
                                    return e.filterTicketDeal(t);
                                });
                                n = n.map(function(t) {
                                    var a = e.formatURI(t.imageUrl, {
                                        w: 200,
                                        h: 200,
                                        e: 1,
                                        c: 1
                                    }), o = "";
                                    switch (t._type) {
                                      case "deal":
                                        o = "/mt/pages/deal/deal?id=" + t._id;
                                        break;

                                      case "poi":
                                        o = "MPOI_MOVIE" === t._from ? "/movie/pages/cinema/cinema?poiId=" + t._id : "POI_HOTEL" === t._from || "POI_HOTEL2" === t._from ? "/hotel/pages/poi/poi?poiId=" + t._id : "/mt/pages/poi/poi?id=" + t._id;
                                        break;

                                      case "film":
                                        o = "/movie/pages/cinema/movie?movieId=" + t._id;
                                    }
                                    return t.imageUrl = a, t.jumperUrl = o, e.displayed.push(t._id + ":" + t._from), 
                                    i.push(t), t;
                                });
                            } catch (t) {
                                console.log(t);
                            }
                            var r = i.filter(function(t) {
                                return "POI_HOTEL" !== t._from && "POI_HOTEL2" !== t._from;
                            });
                            e.setData({
                                guessData: r
                            }, function() {
                                e.showPoiDot.call(e, "b_xe6rhodt");
                            }), t && "function" == typeof t && t.bind(e).call(o), e.globalId = o.data.globalId, 
                            e.offset = i.length;
                        }
                    } else a && "function" == typeof a && a.bind(e)();
                }).catch(function() {
                    wx.hideNavigationBarLoading();
                });
            });
        } else this.setData({
            loadingTxt: "没有更多了"
        });
    },
    filterTicketDeal: function(t) {
        var a = [ "travel", "trip", "gty", "mp", "jiujing" ], e = t._jumpNeed;
        return !("deal" === t._type && e && a.indexOf(e.channel) > -1);
    },
    showCityCheck: function(t, a, e) {
        var i = t;
        wx.showModal({
            title: "定位到您在 " + a.name,
            content: "是否切换至该城市进行探索",
            success: function(t) {
                t.confirm && (getApp().globalData.cityInfo = a, o.set("cityid", a.id), i = a, e(a));
                try {
                    wx.setStorageSync("mt_cityInfo", {
                        value: i,
                        timestamp: new Date(new Date().toLocaleDateString()).getTime()
                    });
                } catch (t) {
                    console.log("mt_cityInfo setStorage fail");
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        wx.setNavigationBarTitle({
            title: "美团"
        });
        var e = n.globalData.cityInfo;
        if (e && e.id !== this.data.cityInfo.id) {
            var o = t({}, this.data.scenes);
            this.bottom = !1, this.offset = 0, this.setData({
                cityInfo: n.globalData.cityInfo,
                guessData: [],
                scenes: o,
                loadingTxt: "加载中..."
            }), this.getGuessData(function() {
                n.hideLoading();
            }, function() {
                n.showErrTip("数据读取失败");
            });
        }
        if (n.lxPvReport(i.getCid(), null), 1038 === n.globalData.scene || 1037 === n.globalData.scene) {
            var r = n.globalData.tab;
            if (r) {
                if (n.globalData.tab = null, "waimai" === r) this.jumpToApp(r); else {
                    var l = u.filter(function(t) {
                        return t.tag === r;
                    })[0];
                    l && this.jumpToList(l);
                }
                return;
            }
        }
        n.delayCallback(function() {
            return Boolean(a.data.scenes);
        }, function() {
            var t = a.data.emitLx + 1;
            a.setData({
                emitLx: t
            });
        }), n.delayCallback(function() {
            return Boolean(a.data.nav && a.data.nav.length);
        }, function() {
            var t = a.data.nav.map(function(t, a) {
                return {
                    index: a,
                    title: t.name,
                    icon_id: t.defaultId
                };
            });
            a.showDot("b_2a0b8hxu", {
                view_items: t
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.getGuessData();
    },
    onShareAppMessage: function() {
        return {
            title: "美团",
            desc: "享美食，爱玩乐，看电影",
            path: "/index/pages/mt/mt"
        };
    }
});