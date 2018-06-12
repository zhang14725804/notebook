var t = require("../../utils/util.js"), a = require("../../utils/onLaunch.js"), e = require("../../utils/Mmd5.js"), o = require("../../utils/shop_util.js"), s = getApp();

Page({
    data: {
        pDir: "/kwxp",
        systemInfo: {},
        returnpage: "/pages/jshopHtml/jshopHtml?appId=",
        toView: "inToView3",
        html: {},
        actName: "",
        pageIdx: 1,
        errorText: "",
        isShowBackTop: !1,
        wareInfo: []
    },
    addCartFn: function(a) {
        var e = this, o = a.target.dataset.wareid, i = wx.getStorageSync("sid"), d = wx.getStorageSync("USER_FLAG_CHECK");
        t.request({
            url: s.globalRequestUrl + e.data.pDir + "/cart/add.json?wareId=" + o + "&num=1&sid=" + i + "&USER_FLAG_CHECK=" + d,
            success: function(t) {
                var a = 0;
                t && t.cartJson && (t.cartJson.resultCode && (a = t.cartJson.resultCode), t.cartJson.resultMsg ? t.cartJson.resultMsg : wx.showToast({
                    title: "抱歉，加入购物车失败，请再试一下"
                }), 0 == a && wx.showToast({
                    title: "加入购物车成功"
                }));
            },
            fail: function(a) {
                t.reportErr("item add.json: " + a.errMsg);
            }
        });
    },
    scrollLower: function() {
        if (-1 != this.data.pageIdx) {
            var t = this.data.pageIdx + 1;
            this.setData({
                pageIdx: t
            }), this.ajaxShopGoods();
        }
    },
    ajaxShopGoods: function() {
        var t = this, a = o.getShopConfigure().configure.shopID;
        wx.setNavigationBarTitle({
            title: "为你推荐"
        }), a ? wx.request({
            url: "https://wxapp.m.jd.com/shopwechat/shophomesoa/searchWare",
            data: {
                body: {
                    searchType: 3,
                    shopId: a,
                    pageIdx: t.data.pageIdx,
                    pageSize: 10,
                    sort: 0
                },
                screen: this.data.systemInfo.windowWidth + "*" + this.data.systemInfo.windowHeight
            },
            dataType: "json",
            success: function(a) {
                if (1 == a.data.isSuccess) {
                    var e = a.data.result.wareInfo, o = t.data.wareInfo;
                    o = o.concat(e), t.setData({
                        wareInfo: o
                    });
                }
            },
            fail: function(t) {},
            complete: function(t) {}
        }) : t.setData({
            errorText: "哎呀出错了，请返回首页..."
        });
    },
    checkImg: function() {
        if (this.data.systemInfo.SDKVersion.split(".")[1] < 4) ; else if (this.data.systemInfo.SDKVersion.split(".")[1] >= 4 && this.data.systemInfo.SDKVersion.split(".")[0] >= 1) {
            var t = this;
            wx.createSelectorQuery().selectAll(".J-imageLazy").boundingClientRect(function(a) {
                var e = t.data.html, o = e.wxml;
                a.forEach(function(a) {
                    if (a.top > 0 && a.top < t.data.systemInfo.windowHeight || 0 == a.top && 0 != a.bottom) {
                        var e = a.dataset.imgindex.split("-"), s = t.data.html.wxml[e[0]].module;
                        t.data.html.wxml[e[0]].data;
                        "goodsRecommend" == s && (o[e[0]].data.goodsRecList[e[1]].defaultImgUrl = o[e[0]].data.goodsRecList[e[1]].imageurl), 
                        "couponModule" == s && (o[e[0]].data.couponRecList[e[1]].defaultImgUrl = o[e[0]].data.couponRecList[e[1]].promImgUrl), 
                        "goodsSortRecommend" == s && (o[e[0]].data.categoryRecList[e[1]].goodsList[e[2]].defaultImgUrl = o[e[0]].data.categoryRecList[e[1]].goodsList[e[2]].imageurl), 
                        "picMapArea" == s && (o[e[0]].data.defaultImgUrl[e[1]].imgs = o[e[0]].data.imgUrl[e[1]]);
                    }
                }), t.setData({
                    html: e
                });
            }).exec();
        }
    },
    checkPrice: function() {
        if (this.data.systemInfo.SDKVersion.split(".")[1] < 4) ; else if (this.data.systemInfo.SDKVersion.split(".")[1] >= 4 && this.data.systemInfo.SDKVersion.split(".")[0] >= 1) {
            var t = this, a = [];
            wx.createSelectorQuery().selectAll(".J-lazy").boundingClientRect(function(e) {
                e.forEach(function(e) {
                    if (e.top > 0 && e.top < t.data.systemInfo.windowHeight) {
                        var o = e.dataset.skuindex.split("-"), s = t.data.html.wxml[o[0]].module, i = t.data.html.wxml[o[0]].data;
                        if ("goodsRecommend" == s && 1 == (d = i.goodsRecList[o[1]].lazy) && a.push(e.dataset.sku), 
                        "goodsSortRecommend" == s) {
                            var d = i.categoryRecList[o[1]].goodsList[o[2]].lazy;
                            1 == d && a.push(e.dataset.sku);
                        }
                    }
                }), a.length > 0 && t.jsonpPrice(a);
            }).exec();
        }
    },
    jsonpPrice: function(t) {
        for (var a = this, e = a.data.html, o = e.wxml, s = {
            skuids: t.join(","),
            origin: 2
        }, i = 0; i < t.length; i++) for (var d = 0; d < o.length; d++) {
            if ("goodsSortRecommend" == o[d].module) for (var r = o[d].data.categoryRecList, n = 0; n < r.length; n++) for (var l = r[n].goodsList, c = 0; c < l.length; c++) (g = l[c]).goodsId == t[i] && (g.lazy = 0);
            if ("goodsRecommend" == o[d].module) for (var m = o[d].data.goodsRecList, n = 0; n < m.length; n++) {
                var g = m[n];
                g.goodsId == t[i] && (g.lazy = 0);
            }
        }
        a.setData({
            html: e
        }), wx.request({
            url: "https://pm.3.cn/prices/mgets",
            data: s,
            success: function(t) {
                var e = t.data, o = a.data.html, s = o.wxml;
                if (e && e.constructor === Array) {
                    for (var i = 0; i < e.length; i++) for (var d = e[i], r = d.id, n = -1 == ~~d.p ? "暂无价格" : d.p, l = 0; l < s.length; l++) {
                        if ("goodsSortRecommend" == s[l].module) for (var c = s[l].data.categoryRecList, m = 0; m < c.length; m++) for (var g = c[m].goodsList, h = 0; h < g.length; h++) (u = g[h]).goodsId == r && (u.jdPrice = n, 
                        u.lazy = 0);
                        if ("goodsRecommend" == s[l].module) for (var p = s[l].data.goodsRecList, m = 0; m < p.length; m++) {
                            var u = p[m];
                            u.goodsId == r && (u.jdPrice = n, u.lazy = 0);
                        }
                    }
                    a.setData({
                        html: o
                    });
                }
            },
            fail: function() {
                for (var a = 0; a < t.length; a++) for (var e = 0; e < o.length; e++) {
                    if ("goodsSortRecommend" == o[e].module) for (var s = o[e].data.categoryRecList, i = 0; i < s.length; i++) for (var d = s[i].goodsList, r = 0; r < d.length; r++) (l = d[r]).goodsId == t[a] && (l.lazy = 1);
                    if ("goodsRecommend" == o[e].module) for (var n = o[e].data.goodsRecList, i = 0; i < n.length; i++) {
                        var l = n[i];
                        l.goodsId == t[a] && (l.lazy = 1);
                    }
                }
            }
        });
    },
    scroll: function(t) {
        var a = this;
        t.detail.scrollTop > 0 ? this.setData({
            isShowBackTop: !0
        }) : this.setData({
            isShowBackTop: !1
        }), a.checkPrice(), a.checkImg();
    },
    tab: function(t) {
        for (var a = this, e = t.target.dataset.id, o = t.target.dataset.index, s = this.data.html, i = s.wxml, d = 0; d < i.length; d++) if ("goodsSortRecommend" == i[d].module && i[d].data.moduleIndex == o) {
            var r = {};
            r.curHdIndex = e, r.curBdIndex = e, i[d].data.tabArr = r;
        }
        this.setData({
            html: s
        }), setTimeout(function() {
            a.checkPrice(), a.checkImg();
        }, 1e3);
    },
    reciveCouponsUrl: function(a) {
        var o = this, s = a.target.dataset.key.split("?")[1].split("&");
        s.splice(2, 1), wx.request({
            url: "https://act-jshop.jd.com/couponSend.html",
            data: {
                from_s: "Wxma",
                sid: wx.getStorageSync("sid"),
                roleId: s[1].split("=")[1],
                key: s[0].split("=")[1],
                pt_key: wx.getStorageSync("jdlogin_pt_key"),
                pt_pin: wx.getStorageSync("jdlogin_pt_pin"),
                timestamp: Date.parse(new Date()),
                sign: e.Mmd5().hex_md5(Date.parse(new Date()) + "|ASDFSDFXWESDEPOMI1DDXED")
            },
            success: function(a) {
                var e = a.data;
                if (-1 == (e = JSON.parse(e.substring(9, e.length - 3))).code) {
                    wx.getStorageSync("jdlogin_pt_pin");
                    t.globalLoginShow(o);
                } else wx.showToast({
                    title: e.desc
                });
            },
            fail: function() {}
        });
    },
    onLoad: function(t) {
        console.log("load");
        s = this;
        wx.getSystemInfo({
            success: function(t) {
                s.setData({
                    systemInfo: t
                });
            }
        });
        var e, o = {};
        (e = t.appId ? t.appId : a.getActivityId().toString()) && e.match(/^\d+$/) ? o.mobAppId = e : o.urlStr = e, 
        s.setData({
            returnpage: "/pages/jshopHtml/jshopHtml?appId=" + e
        });
        var s = this;
        o.callback = "jq", wx.request({
            url: "https://act-jshop.jd.com/wxma.html",
            data: o,
            success: function(t) {
                t.data = t.data.substring(3, t.data.length - 1), t.data = JSON.parse(t.data);
                var a = t.data.wxml, e = t.data.actName;
                if (a && 0 != a.length) {
                    for (R = 0; R < a.length; R++) {
                        if (a[R].data.moduleIndex = R, "goodsRecommend" == a[R].module) {
                            (D = a[R].data.goodsRecList).length % 2 == 1 && (D.length = D.length - 1);
                            for (i = 0; i < D.length; i++) D[i].lazy = 1, D[i].defaultImgUrl = "//m.360buyimg.com/cms/g10/M00/13/04/rBEQWFFj4PUIAAAAAAAESxyqJLUAADvdAIHC9oAAARj186.gif", 
                            D[i].imageurl = "http://img10.360buyimg.com/n1/" + D[i].imageurl;
                        }
                        if ("goodsSortRecommend" == a[R].module) {
                            a[R].data.tabArr = {
                                curHdIndex: 0,
                                curBdIndex: 0
                            };
                            for (var o = a[R].data.categoryRecList, i = 0; i < o.length; i++) {
                                (L = o[i].goodsList).length % 2 == 1 && (L.length = L.length - 1);
                                for (k = 0; k < L.length; k++) (U = L[k]).lazy = 1, U.defaultImgUrl = "//m.360buyimg.com/cms/g10/M00/13/04/rBEQWFFj4PUIAAAAAAAESxyqJLUAADvdAIHC9oAAARj186.gif", 
                                U.imageurl = "http://img10.360buyimg.com/n1/" + U.imageurl;
                            }
                        }
                        if ("picMapArea" == a[R].module) {
                            var d = a[R].data.htmlContent, r = new RegExp("(//)(([a-zA-Z0-9._-]+.[a-zA-Z]{2,6})|([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}))(/[a-zA-Z0-9&%_./-~-]*)?(.(jpg|gif|bmp|bnp|png))", "g"), n = d.match(r), l = d.match(/href\S+/g), c = d.match(/style="[\S\s]+?"/g), m = d.match(/data\-size="\S+?"/g);
                            d.match(/d-pic-adjust/) && c.splice(0, n.length), a[R].data.hotLink = [];
                            for (i = 0; i < m.length; i++) m[i] = m[i].split("=")[1].replace(/\"/g, "");
                            if (l) for (i = 0; i < l.length; i++) {
                                l[i] = l[i].split("f=")[1].replace(/\"/g, "");
                                var g = /\/\/sale\.jd\.com\/[m|wq|app]\/act\/(\w+)\.html/, h = /\/\/shop\.m\.jd\.com\/?\?shopId=(\w+)/, p = /\/\/coupon\.m\.jd\.com\/coupons\/show\.action\?key=(\w+)&roleId=(\d+)&/, u = "../../pages/product/product";
                                if (l[i].match(g)) l[i] = l[i].replace(g, "../../pages/jshopHtml/jshopHtml?appId=$1"); else if (l[i].match(/\/\/((item\.)?m\.jd\.com|(mite)?m\.jd\.hk)\/product/)) {
                                    var f = "";
                                    -1 !== l[i].indexOf("?") && (f = "\\?", "&");
                                    var w = new RegExp("//((item.)?m.jd.com|(mite)?m.jd.hk)/product/(\\d+).html" + f, "i"), I = l[i].match(w);
                                    l[i] = u + "?wareId=" + RegExp.$4;
                                } else -1 != l[i].indexOf("//item.m.jd.com/ware/view.action?wareId=") ? l[i] = l[i].replace("//item.m.jd.com/ware/view.action", u) : l[i].match(/\/\/(mitem\.jd\.hk|m\.jd\.hk)\/ware\/view\.action\?wareId=/) ? l[i] = l[i].replace(/\/\/(mitem\.jd\.hk|m\.jd\.hk)\/ware\/view\.action/, u) : l[i].match(/\/\/wqitem\.jd\.com\/item\/view\?sku=(\d+)/) ? l[i] = u + "?wareId=" + RegExp.$1 : l[i].match(h) ? l[i] = l[i].replace(h, "../../pages/shop/shop?shopId=$1") : l[i].match(p) || (l[i] = "");
                                c[i] = c[i].split("=")[1].replace(/\"/g, ""), "" == (U = {
                                    link: l[i],
                                    style: c[i]
                                }).link && (U.style = ""), a[R].data.hotLink.push(U);
                            }
                            a[R].data.imgUrl = n, a[R].data.defaultImgUrl = [], a[R].data.size = [];
                            for (b = 0; b < n.length; b++) {
                                var x = {};
                                x.imgs = "//m.360buyimg.com/cms/g10/M00/13/04/rBEQWFFj4PUIAAAAAAAESxyqJLUAADvdAIHC9oAAARj186.gif";
                                var I = m[b].split(","), v = Math.round(s.data.systemInfo.windowWidth * I[1] / I[0]);
                                x.height = v, a[R].data.defaultImgUrl.push(x);
                            }
                        }
                        if ("couponModule" == a[R].module) for (var y = a[R].data.couponRecList, i = 0; i < y.length; i++) y[i].imgWidth = 0, 
                        y[i].imgHeight = 0, y[i].defaultImgUrl = "//m.360buyimg.com/cms/g10/M00/13/04/rBEQWFFj4PUIAAAAAAAESxyqJLUAADvdAIHC9oAAARj186.gif";
                    }
                    var A = s.data.html;
                    if (A.wxml = a, s.data.systemInfo.SDKVersion.split(".")[1] < 4 || s.data.systemInfo.SDKVersion.split(".")[0] <= 0) {
                        for (var S = [], j = [], R = 0; R < a.length; R++) {
                            if (a[R].data.moduleIndex = R, "goodsRecommend" == a[R].module) for (var D = a[R].data.goodsRecList, i = 0; i < D.length; i++) D[i].lazy = 0, 
                            D[i].defaultImgUrl = D[i].imageurl, S.push(D[i].goodsId);
                            if ("goodsSortRecommend" == a[R].module) for (var o = a[R].data.categoryRecList, i = 0; i < o.length; i++) {
                                var L = o[i].goodsList;
                                L.length % 2 == 1 && (L.length = L.length - 1);
                                for (var k = 0; k < L.length; k++) {
                                    var U = L[k];
                                    U.lazy = 0, U.defaultImgUrl = U.imageurl, S.push(U.goodsId);
                                }
                            }
                            if ("picMapArea" == a[R].module) for (var n = (d = a[R].data.htmlContent).match(r), r = new RegExp("(//)(([a-zA-Z0-9._-]+.[a-zA-Z]{2,6})|([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}))(/[a-zA-Z0-9&%_./-~-]*)?(.(jpg|gif|bmp|bnp|png))", "g"), b = 0; b < n.length; b++) {
                                var _ = {};
                                _.imgs = n[b], a[R].data.defaultImgUrl.push(_);
                            }
                            if ("couponModule" == a[R].module) for (var y = a[R].data.couponRecList, i = 0; i < y.length; i++) y[i].imgWidth = 0, 
                            y[i].imgHeight = 0, y[i].defaultImgUrl = y[i].promImgUrl;
                        }
                        S.length > 0 && wx.request({
                            url: "https://pm.3.cn/prices/mgets",
                            data: {
                                skuids: S.join(","),
                                origin: 2
                            },
                            success: function(t) {
                                if (S = [], t.data && t.data.constructor === Array) for (r = 0; r < t.data.length; r++) {
                                    var o = t.data[r], i = -1 == ~~o.p ? "暂无价格" : o.p, d = {
                                        id: o.id,
                                        price: i
                                    };
                                    j.push(d);
                                }
                                for (var r = 0; r < a.length; r++) if ("goodsRecommend" == a[r].module) {
                                    for (var n = a[r].data.goodsRecList, l = 0; l < n.length; l++) for (h = 0; h < j.length; h++) if (j[h].id == n[l].goodsId) {
                                        n[l].jdPrice = j[h].price;
                                        break;
                                    }
                                } else if ("goodsSortRecommend" == a[r].module) for (var c = a[r].data.categoryRecList, l = 0; l < c.length; l++) for (var m = c[l].goodsList, g = 0; g < m.length; g++) for (var h = 0; h < j.length; h++) if (j[h].id == m[l].goodsId) {
                                    m[l].goodsId.jdPrice = j[h].price;
                                    break;
                                }
                                j = [], A.wxml = a, s.setData({
                                    html: A,
                                    pageIdx: -1,
                                    actName: e
                                }), wx.setNavigationBarTitle({
                                    title: s.data.actName ? s.data.actName : "为你推荐"
                                });
                            }
                        });
                    } else s.setData({
                        html: A,
                        pageIdx: -1,
                        actName: t.data.actName
                    }), setTimeout(function() {
                        s.checkPrice(), s.checkImg();
                    }, 1e3);
                } else s.setData({
                    actName: t.data.actName
                }), s.ajaxShopGoods();
                wx.setNavigationBarTitle({
                    title: s.data.actName ? s.data.actName : "为你推荐"
                });
            },
            fail: function() {
                s.ajaxShopGoods();
            },
            complete: function() {}
        });
    },
    couponUrl: function(a) {
        var o = this, s = a.target.dataset.url, i = /\/\/coupon\.m\.jd\.com\/coupons\/show\.action\?key=(\w+)&roleId=(\d+)&/;
        if (s.match(i)) {
            var d = s.match(i);
            wx.request({
                url: "https://act-jshop.jd.com/couponSend.html",
                data: {
                    from_s: "Wxma",
                    roleId: d[2],
                    key: d[1],
                    pt_key: wx.getStorageSync("jdlogin_pt_key"),
                    pt_pin: wx.getStorageSync("jdlogin_pt_pin"),
                    timestamp: Date.parse(new Date()),
                    sign: e.Mmd5().hex_md5(Date.parse(new Date()) + "|ASDFSDFXWESDEPOMI1DDXED")
                },
                success: function(a) {
                    var e = a.data;
                    if (-1 == (e = JSON.parse(e.substring(9, e.length - 3))).code) {
                        wx.getStorageSync("jdlogin_pt_pin");
                        t.globalLoginShow(o);
                    } else wx.showToast({
                        title: e.desc
                    });
                },
                fail: function() {}
            });
        } else s.match(/shop/) && wx.switchTab({
            url: s
        });
    },
    imageLoad: function(t) {
        var a = t.detail.width > this.data.systemInfo.windowWidth ? this.data.systemInfo.windowWidth : t.detail.width, e = t.detail.height, o = t.target.dataset.id.split("-")[0], s = t.target.dataset.id.split("-")[1], i = this.data.html, d = i.wxml;
        d[o].data.couponRecList[s].imgWidth = a, d[o].data.couponRecList[s].imgHeight = e, 
        this.setData({
            html: i
        });
    },
    onShareAppMessage: function() {},
    bottomToTop: function() {
        this.setData({
            scrollTop: 0
        });
    }
});