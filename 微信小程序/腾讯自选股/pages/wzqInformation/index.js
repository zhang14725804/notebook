(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b, c, d = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, e = require("../../utils/ppdog"), f = a(e), g = require("../../utils/regenerator-runtime"), h = a(g), i = require("../../filter/informationFilter"), j = a(i), k = require("../../utils/RequestApi"), l = require("../../libs/sqtRequest"), m = a(l), n = {
        D: "退市",
        S: "停牌",
        U: "未上市",
        Z: "停牌"
    }, o = getApp(), p = require("./config"), q = require("../../module/base/date"), r = [], s = {
        Sun: "日",
        Mon: "一",
        Tue: "二",
        Wed: "三",
        Thu: "四",
        Fri: "五",
        Sat: "六"
    }, t = 0, u = !1, v = "", w = !1, x = 1, y = !1, z = 20, A = "上拉查看下20条", B = "已无更多数据", C = !0, D = {};
    Page({
        data: {
            duration: 300,
            currentTab: 0,
            swiperHeigth: "1000",
            boxHeight: 1700,
            importantList: [],
            flashList: [],
            chooseList: [],
            pullBottomText: A,
            currentTime: "",
            showFixed: !1
        },
        onLoad: function() {
            var a = this;
            a.queryImportantNews();
        },
        onHide: function() {
            clearTimeout(c);
        },
        onShow: function() {
            switch (this.data.currentTab) {
              case 0:
                this.setSwiperHeight("focus-news");
                break;

              case 1:
                this.setSwiperHeight("current-day");
                break;

              case 2:
                this.setSwiperHeight("my-choose");
                break;

              default:
            }
        },
        onPullDownRefresh: function() {
            var a = this.data.currentTab;
            switch (+a) {
              case 0:
                t = 0, u = !1, this.queryImportantNews();
                break;

              case 1:
                v = "", w = !1, this.queryFlashNews();
                break;

              case 2:
                x = 1, y = !1, this.queryUserStockNews();
                break;

              default:
            }
            b = Date.now();
        },
        onReachBottom: function() {
            var a = this.data.currentTab;
            switch (+a) {
              case 0:
                this.loadMoreImportant();
                break;

              case 1:
                this.loadMoreFlash();
                break;

              case 2:
                this.loadMoreChoose();
                break;

              default:
            }
        },
        onPageScroll: function(a) {
            var b = this.data.showFixed;
            b && 10 > a.scrollTop && this.setData({
                showFixed: !1
            }), !b && 10 <= a.scrollTop && this.setData({
                showFixed: !0
            });
        },
        stopRefresh: function() {
            var a = this;
            1500 > Date.now() - b ? setTimeout(function() {
                a.stopRefresh();
            }, 50) : wx.stopPullDownRefresh();
        },
        setSwiperHeight: function(a) {
            var b = this;
            clearTimeout(c), c = setTimeout(function() {
                wx.createSelectorQuery().select("#" + a).boundingClientRect().exec(function(a) {
                    b.setData({
                        swiperHeigth: a[0].height
                    });
                });
            }, 500);
        },
        queryImportantNews: function() {
            var a = this, b = t ? r.slice(t, t + z) : [], c = {};
            t ? (c.nkey = "getQQNewsListItemsVerify", c.returnType = "0,1,100", c.ids = b.join(",")) : (c.nkey = "getQQNewsIndexAndItemsVerify", 
            c.returnType = "0,100", c._columnId = "stock_yaowen_v2_new"), o.wx.request({
                url: "https://proxy.finance.qq.com/ifzqgtimg/appstock/news/yaowen/get",
                data: c,
                method: "GET",
                success: function(b) {
                    f.default.resolve({
                        data: b,
                        key: 1
                    }).filter(j.default).then(function(b) {
                        var c = parseInt(b.retcode, 10), d = a.data.importantList, e = a.data.currentTab, f = b.headline || [];
                        0 === c && (b.ids && b.ids.length && (r = b.ids || []), t >= r.length - z && (u = !0), 
                        f && f.length && (f = a.processImportant(f), d = t ? d.concat(f) : f, t += f.length), 
                        a.setData({
                            importantList: d,
                            pullBottomText: u ? B : A
                        }), C && (a.queryFlashNews(), a.queryUserStockNews(), C = !1), 0 == e && a.setSwiperHeight("focus-news")), 
                        a.stopRefresh();
                    });
                }
            });
        },
        loadMoreImportant: function() {
            u || this.queryImportantNews();
        },
        queryFlashNews: function() {
            var a = this;
            o.wx.request({
                method: "GET",
                url: "https://proxyplus.finance.qq.com/group/newstockgroup/Live/getLiveList",
                data: {
                    id: v,
                    openid: "anyone",
                    live_id: "201607221458220037006617",
                    begin: v
                },
                success: function(b) {
                    f.default.resolve({
                        data: b,
                        key: 2,
                        cachedQtData: D
                    }).filter(j.default).then(function(b) {
                        var c = parseInt(b.retcode, 10), e = a.data.flashList, f = a.data.currentTab, g = b.news || [], h = b.stocklist;
                        if (0 === c) {
                            if (!g || 0 >= g.length) w = !0, a.setData({
                                pullBottomText: B
                            }); else {
                                g = a.processFlash(g), e = v ? e.concat(g) : g;
                                var i = {
                                    flashList: e,
                                    pullBottomText: A
                                };
                                if (!a.data.currentTime && e.length) {
                                    var j = e[0].rawTime;
                                    i.currentTime = a.formatFixedDate(1e3 * j);
                                }
                                a.setData(i), v = g.pop().id, 1 == f && a.setSwiperHeight("current-day");
                            }
                            m.default.get({
                                symbol: h,
                                key: [ "Name", "Mkt", "Status", "Code", "Price", "Chg", "ChgRatio" ]
                            }).then(function(b) {
                                var c = a.data.flashList;
                                D = d(D, b), c.forEach(function(a) {
                                    a.stocks.forEach(function(a) {
                                        var c = a, e = c.symbol, f = b[e];
                                        f && (a.zdf = 0 < f.ChgRatio ? "+" + f.ChgRatio : f.ChgRatio, a.state = n[f.Status] || "", 
                                        a = d(a, f));
                                    });
                                }), a.setData({
                                    flashList: c
                                });
                            });
                        }
                        a.stopRefresh();
                    });
                }
            });
        },
        loadMoreFlash: function() {
            w || this.queryFlashNews();
        },
        queryUserStockNews: function() {
            var a = this;
            k.Request.getList().then(function(b) {
                var c = b.toJS(), e = b.toJS().stockListMap[c.onGid].listData, g = e.map(function(a) {
                    return a.Symbol;
                });
                o.wx.request({
                    url: "https://proxyplus.finance.qq.com/ifzqgtimg/appstock/news/info/search",
                    data: {
                        symbol: g.join(","),
                        page: x,
                        n: z,
                        type: 3
                    },
                    success: function(b) {
                        f.default.resolve({
                            data: b,
                            key: 3,
                            cachedQtData: D
                        }).filter(j.default).then(function(b) {
                            var c = parseInt(b.retcode, 10), e = b.optional, f = a.data.currentTab, g = a.data.chooseList, h = b.stocklist;
                            0 === c && (!e || 0 >= e.length ? y = !0 : (e = a.processChoose(e), g = 1 < x ? g.concat(e) : e, 
                            x++, a.setData({
                                chooseList: g
                            }), m.default.get({
                                symbol: h,
                                key: [ "Name", "Mkt", "Status", "Code", "Price", "Chg", "ChgRatio" ]
                            }).then(function(b) {
                                var c = a.data.chooseList;
                                D = d(D, b), c.forEach(function(a) {
                                    a.stocks.forEach(function(a) {
                                        var c = a, e = c.symbol, f = b[e];
                                        f && (a.zdf = 0 < f.ChgRatio ? "+" + f.ChgRatio : f.ChgRatio, a.state = n[f.Status] || "", 
                                        a = d(a, f));
                                    });
                                }), a.setData({
                                    chooseList: c
                                });
                            }), 2 == f && a.setSwiperHeight("my-choose"))), a.stopRefresh();
                        });
                    },
                    fail: function() {}
                });
            });
        },
        loadMoreChoose: function() {
            y || this.queryUserStockNews();
        },
        processChoose: function(a) {
            var b = this.getReadRecord();
            return a && a.map(function(a) {
                return a.time = a.time.substr(5, 11), a.stocks = a.stocks && a.stocks.length ? a.stocks : [ {} ], 
                0 <= b.indexOf(a.id) && (a.readed = !0), a;
            });
        },
        processImportant: function(a) {
            var b = this.getReadRecord();
            return a && a.map(function(a) {
                return a.time = a.time.substr(5, 11), 0 <= b.indexOf(a.id) && (a.readed = !0), a;
            });
        },
        processFlash: function(a) {
            return a && a.map(function(a) {
                var b = a.stocks || [];
                return a.rawTime = a.time, a.time = q.date2Str(new Date(1e3 * a.time), "hh:mm", !0), 
                a.stocks = b.map(function(a) {
                    return a.state = p.state[a.state] || null, a;
                }), a;
            });
        },
        openNotice: function(a) {
            wx.showLoading({
                title: "公告加载中"
            }), o.wx.request({
                url: o.CGI_PREFIX + "informationbody.fcgi",
                data: {
                    zxtype: a.type,
                    id: a.id
                },
                success: function(a) {
                    var b = parseInt(a.retcode, 10);
                    return b || !a.url ? (wx.hideLoading(), void o.showMsg("公告下载失败")) : void wx.downloadFile({
                        url: a.url.replace("http://", "https://"),
                        success: function(a) {
                            wx.hideLoading();
                            var b = a.tempFilePath;
                            wx.openDocument({
                                filePath: b
                            });
                        },
                        fail: function() {
                            wx.hideLoading(), o.showMsg("公告下载失败");
                        }
                    });
                }
            });
        },
        viewImportant: function(a) {
            var b = a.currentTarget.dataset.index, c = this.data.importantList, d = c[b];
            this.saveReadRecord(d), d.readed = !0, c[b] = d, this.setData({
                importantList: c
            }), 100 == d.articletype ? wx.navigateTo({
                url: "../information/topic/topic?id=" + d.id
            }) : wx.navigateTo({
                url: "../information/newsDetail/newsDetail?id=" + d.id + "&source=" + d.source + "&time=" + d.time + "&timestamp=" + d.timestamp
            });
        },
        viewChoose: function(a) {
            var b = a.currentTarget.dataset.index, c = this.data.chooseList, d = c[b];
            this.saveReadRecord(d), d.readed = !0, c[b] = d, this.setData({
                chooseList: c
            });
            var e = "", f = "";
            try {
                e = d.stocks[0].symbol, f = d.stocks[0].Name;
            } catch (a) {}
            wx.navigateTo({
                url: "../newsCon/newsCon?id=" + d.id + "&symbol=" + e + "&name=" + f + " "
            });
        },
        getReadRecord: function() {
            var a = wx.getStorageSync("imformation_read_record") || "[]";
            return JSON.parse(a);
        },
        saveReadRecord: function(a) {
            var b = wx.getStorageSync("imformation_read_record") || "[]";
            b = JSON.parse(b), 0 > b.indexOf(a.id) && b.push(a.id), 500 < b.length && (b = b.slice(-500)), 
            wx.setStorageSync("imformation_read_record", JSON.stringify(b));
        },
        switchNav: function(a) {
            var b = this, c = a.currentTarget.dataset.current, d = this.data.currentTab;
            return d !== c && void b.setData({
                currentTab: c
            });
        },
        bindchange: function(a) {
            var b = a.detail.current, d = 1 == b ? o.rpxToPx(144) + 2 : o.rpxToPx(80) + 2;
            switch (clearTimeout(c), this.setData({
                currentTab: b,
                swiperHeigth: o.device.windowHeight - d
            }), +a.detail.current) {
              case 0:
                t = 0, u = !1, this.queryImportantNews();
                break;

              case 1:
                v = "", w = !1, this.queryFlashNews();
                break;

              case 2:
                x = 1, y = !1, this.queryUserStockNews();
                break;

              default:
            }
        },
        formatFixedDate: function(a) {
            var b = new Date(a), c = b.toDateString(), d = b.getFullYear(), e = (b.getMonth() + 1).toString().replace(/^[0-9]$/, function(a) {
                return "0" + a;
            }), f = b.getDate().toString().replace(/^[0-9]$/, function(a) {
                return "0" + a;
            }), g = s[c.split(" ")[0]];
            return d + "年" + e + "月" + f + "日 周" + g;
        },
        openStock: function(a) {
            var b = a.currentTarget.dataset, c = b.findex, d = b.index, e = this.data.flashList[c].stocks[d], f = e.n, g = e.symbol;
            wx.navigateTo({
                url: "../quote/quote?symbol=" + g + "&name=" + f
            });
        },
        openChooseStock: function(a) {
            var b = a.currentTarget.dataset.index, c = this.data.chooseList[b].stocks[0];
            wx.navigateTo({
                url: "../quote/quote?symbol=" + c.symbol + "&name=" + c.n
            });
        }
    });
})();