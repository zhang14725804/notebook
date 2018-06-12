(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b, c = require("../../../utils/ppdog"), d = a(c), e = require("../../../utils/regenerator-runtime"), f = a(e), g = require("../../../utils/RequestApi"), h = require("../../../filter/zxNewsFilter"), i = a(h), j = require("../../../filter/zixunTimeFilter"), k = a(j);
    Page({
        data: {
            nodata: !1,
            loading: !0
        },
        onShareAppMessage: function() {
            var a = this.data, b = a.id, c = a.source, d = a.title, e = a.time, f = a.timestamp, g = a.newsData, h = "pages/information/newsDetail/newsDetail?id=" + b + "&source=" + c + "&time=" + e + "&timestamp=" + f + "&title=" + g.title;
            return {
                title: "" + g.title,
                path: h
            };
        },
        onLoad: function(a) {
            wx.setNavigationBarTitle({
                title: "新闻"
            });
            getApp();
            this.setData({
                id: a.id,
                source: a.source || "",
                time: a.time || "",
                timestamp: a.timestamp || ""
            });
        },
        onReady: function() {
            this.updateNewsCon();
        },
        onShow: function() {
            g.Request.reportData({
                sop: "xcx_news_content_click"
            });
        },
        onHide: function() {},
        onPullDownRefresh: function() {
            this.getData();
            getApp();
            this.updateNewsCon(), this.forcePullDown = !0, wx.stopPullDownRefresh();
        },
        onUnload: function() {},
        checkStocksClick: function() {
            var a = this, b = this.data.newsData.stocks;
            this.data.newsData.stockInfo && this.data.newsData.stockInfo.forEach(function(a) {
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
            var a = this, b = getApp();
            g.Request.getNewsContent(this.data.id).filter(i.default).filter(k.default).then(function(b) {
                a.setData({
                    loading: !1,
                    newsData: b
                }), a.checkStocksClick();
            }).catch(function() {
                a.setData({
                    nodata: !0,
                    loading: !1
                });
            });
        },
        tapStock: function(a) {
            var b = a.currentTarget.dataset, c = b.symbol, d = b.name;
            wx.navigateTo({
                url: "../../quote/quote?symbol=" + c + "&name=" + d
            });
        },
        goNews: function(a) {
            var b = a.currentTarget.dataset, c = b.id, d = b.source, e = b.time, f = b.timestamp, g = b.articletype;
            wx.redirectTo({
                url: "../newsDetail/newsDetail?id=" + c + "&source=" + d + "&time=" + e + "&timestamp=" + f
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
        },
        previewImage: function(a) {
            var b = a.target.dataset, c = b.src, d = b.images;
            wx.previewImage({
                current: c,
                urls: d
            });
        }
    });
})();