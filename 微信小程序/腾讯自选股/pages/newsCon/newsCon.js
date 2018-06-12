(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b, c = require("../../utils/ppdog"), d = a(c), e = require("../../utils/regenerator-runtime"), f = a(e), g = require("../../utils/RequestApi"), h = require("../../filter/newsFilter"), i = a(h);
    Page({
        data: {
            newsData: {
                text: "",
                src: "",
                date: "",
                info: "",
                abstract: "",
                symbol: ""
            },
            nodata: !1,
            qq: "",
            showLoading: !0
        },
        onShareAppMessage: function() {
            var a = this.data.newsData, b = this.data, c = {
                id: b.id,
                symbol: b.symbol,
                name: b.name,
                articletype: b.articletype,
                title: a.title,
                source: a.src,
                date: a.date
            }, d = [];
            for (var e in c) d.push(e + "=" + c[e]);
            return console.log("share query", d.join("&")), {
                title: a.title,
                desc: a.src + "  " + a.date,
                path: "pages/newsCon/newsCon?" + d.join("&")
            };
        },
        onLoad: function(a) {
            var b = this, c = getApp();
            this.setData({
                id: a.id,
                symbol: a.symbol,
                name: a.name || "",
                articletype: a.articletype
            });
        },
        onReady: function() {
            console.log("[newsCon] > 页面渲染完成"), console.log("渲染完成"), this.updateNewsCon();
        },
        onShow: function() {
            console.log("onShow>>>>>>", this.data);
        },
        onHide: function() {
            console.log("页面隐藏");
        },
        onPullDownRefresh: function() {
            this.getData();
            getApp();
            this.updateNewsCon(), this.forcePullDown = !0, wx.stopPullDownRefresh();
        },
        onUnload: function() {
            console.log("页面关闭");
            var a = this, b = getApp();
        },
        checkStocksClick: function() {
            var a = this, b = [];
            this.data.newsData.stockcode && this.data.newsData.stockcode.forEach(function(a) {
                b.push(a.symbol);
            });
            var c = wx.getStorageSync("clickStocks");
            c = c || {}, this.setData({
                stocksStorage: c
            }), b.length && g.Request.getClickStatus(b, c).then(function(b) {
                var c = wx.getStorageSync("clickStocks");
                a.setData({
                    stocksStorage: c || {}
                }), console.log("处理完成", b, a.data.stocksStorage);
            });
        },
        updateNewsCon: function() {
            var a = getApp(), c = this;
            g.Request.getNewsCon(c.data.id, c.data.articletype).then(function(a) {
                a.newsId = c.data.id;
                var b = "6" == c.data.articletype ? "getKuaiXun" : "getNewsCon";
                return {
                    data: a,
                    keyword: b
                };
            }).filter(i.default).then(function(a) {
                var d = a;
                if (console.log(d), d.pdf && ".HTM" != d.pdf.substr(-4)) {
                    b = d.pdf, c.setData({
                        pdf: {
                            show: !0,
                            btn: "查看全文",
                            icon: !0
                        }
                    });
                }
                var e = c.data.symbol, f = e.substr(2);
                c.data.name && (f = c.data.name), wx.setNavigationBarTitle({
                    title: "" + f
                });
                var g = function(a) {
                    return a = a.replace(/<\/?[^>]*>/g, ""), a = a.replace(/[ | ]*\n/g, "\n"), a = a.replace(/&nbsp; /gi, ""), 
                    a;
                };
                for (var h in d.content) "text" == d.content[h].type && (d.content[h].info = g(d.content[h].info)), 
                d.content[h].key = h;
                c.setData({
                    newsData: d,
                    nodata: !1,
                    showLoading: !1
                }), "6" == c.data.articletype && c.checkStocksClick();
            }).catch(function() {
                c.setData({
                    nodata: !0,
                    showLoading: !1
                });
            });
        },
        tapStock: function(a) {
            var b = a.currentTarget.dataset, c = b.symbol, d = b.name;
            wx.navigateTo({
                url: "../quote/quote?symbol=" + c + "&name=" + d
            });
        },
        openPDF: function() {
            var a = this;
            console.log("trying to open document!!!");
            var c = {
                show: !0,
                btn: "下载中...",
                icon: !1
            };
            this.setData({
                pdf: c
            });
            var d = function() {
                c = {
                    show: !0,
                    btn: "查看全文",
                    icon: !0
                }, a.setData({
                    pdf: c
                });
            };
            wx.downloadFile({
                url: b.replace(/^http:\/\//, "https://"),
                success: function(b) {
                    var c = b.tempFilePath;
                    wx.openDocument({
                        filePath: c,
                        success: function() {
                            d();
                        },
                        fail: function() {
                            a.setData({
                                loading: !1,
                                showBanner: !0
                            }), setTimeout(function() {
                                a.setData({
                                    showBanner: !1
                                });
                            }, 3e3), d();
                        }
                    });
                },
                fail: function() {
                    a.setData({
                        loading: !1,
                        showBanner: !0
                    }), setTimeout(function() {
                        a.setData({
                            showBanner: !1
                        });
                    }, 3e3), d();
                }
            });
        }
    });
})();