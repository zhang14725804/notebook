function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function n(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function a(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t;
    };
}(), o = e(require("../index_component.js")), i = (e(require("../../../libs/co/we-index")), 
e(require("../../../libs/regenerator-runtime/runtime")), e(require("../../../common/request.js"))), l = e(require("../../../common/url_util.js")), u = e(require("../../../common/image_util.js")), s = e(require("../../../common/system_info.js")), c = e(require("../../../common/storage_util.js")), d = e(require("../../../constants/storage_keys")), p = e(require("../../../common/util.js")), _ = require("../../../common/index"), f = {
    bannerIndex: "10228"
}, m = function(e) {
    function m(e) {
        t(this, m);
        var a = n(this, (m.__proto__ || Object.getPrototypeOf(m)).call(this, e));
        return a.page.topBannerChange = p.default.bind(a.topBannerChange, a), a.page.clickTopBanner = p.default.bind(a.clickTopBanner, a), 
        a.windowWidth = s.default.getWindowWidthSync(), a.loadComponentData(), a.imprList = {}, 
        a.shouldImpr = !0, a;
    }
    return a(m, o.default), r(m, [ {
        key: "onPageScroll",
        value: function(e) {
            var t = e.scrollTop || 0;
            this.shouldImpr = t <= 100;
        }
    }, {
        key: "loadComponentData",
        value: function() {
            this.loadCacheBannerData(), this.getTopBannerDetail();
        }
    }, {
        key: "loadCacheBannerData",
        value: function() {
            var e = this;
            c.default.getStorage(d.default.TOP_BANNER).then(function(t) {
                t && (e.topBannerData = t.topBannerData, e.setData({
                    topBannerData: t.topBannerData,
                    visible: !0
                }));
            }).catch(function(e) {
                console.log("TOP_BANNER 缓存读取失败"), console.error(e);
            });
        }
    }, {
        key: "getTopBannerDetail",
        value: function() {
            var e = this, t = i.default.requestDataWithCmd(f.bannerIndex, {
                params: {
                    platform: 5,
                    version: 2
                }
            });
            i.default.runMainRequestForPage(t, this.page).then(function(t) {
                var n = e.processBannerData(t) || {};
                if (e.setData({
                    scrollContainerWidth: e.windowWidth,
                    topBannerData: n.topBannerData,
                    visible: !0
                }), wx.setStorage({
                    key: d.default.TOP_BANNER,
                    data: n
                }), e.topBannerData = n.topBannerData, e.topBannerData.length > 0) {
                    var a = e.getTopbannerTrackingParams("impr", e.data.curBannerIndex);
                    (0, _.TrackingRecord)(a);
                }
            }).catch(function(e) {
                console.error(e), console.log("TOP_BANNER 接口失败");
            });
        }
    }, {
        key: "processBannerData",
        value: function(e) {
            var t = [];
            return e.result.forEach(function(e) {
                var n = l.default.filterLink(e.link_url);
                if (n) {
                    var a = {
                        bannerUrl: u.default.cdnCompress(e.img_url),
                        name: n,
                        linkUrl: e.link_url
                    };
                    e.ad && (a.ad = e.ad, a.ad_id = e.ad_id), t.push(a);
                }
            }), {
                topBannerData: t
            };
        }
    }, {
        key: "getTopbannerTrackingParams",
        value: function(e, t) {
            if (!(t >= (this.topBannerData || []).length)) {
                var n = this.topBannerData[t] || {}, a = {};
                return n.linkUrl && (a = l.default.urlDraw(n.linkUrl)), {
                    op: e,
                    page_name: "index",
                    page_section: "top_banner",
                    page_element: n.name,
                    element_id: a.subject_id || a.subjects_id,
                    banner_id: a.subject_id || a.subjects_id,
                    page_el_sn: 99299,
                    url: n.linkUrl && encodeURIComponent(n.linkUrl) || "",
                    idx: t,
                    ad: JSON.stringify(n.ad),
                    ad_id: n.ad_id
                };
            }
        }
    }, {
        key: "topBannerChange",
        value: function(e) {
            if (e && e.detail) {
                var t = e.detail.current;
                if (this.setData({
                    curBannerIndex: t
                }), this.shouldImpr && !this.imprList[t]) {
                    var n = this.getTopbannerTrackingParams("impr", t);
                    (0, _.TrackingRecord)(n), this.imprList[t] = !0;
                }
            }
        }
    }, {
        key: "clickTopBanner",
        value: function(e) {
            var t = e.currentTarget.dataset.linkUrl, n = e.currentTarget.dataset.index, a = e.currentTarget.dataset.pageName, r = this.topBannerData[n] || {};
            if (t) {
                var o = l.default.urlDraw(t);
                o.refer_page_el_sn = 99299, o.page_el_sn = 99299, o.refer_idx = n, o.idx = n;
                var i = {
                    op: "click",
                    page_name: "index",
                    page_section: "top_banner",
                    event: "top_banner_clk",
                    element_id: o.subject_id || o.subjects_id,
                    url: encodeURIComponent(t),
                    banner_id: o.subject_id || o.subjects_id,
                    page_el_sn: 99299,
                    idx: n,
                    ad: JSON.stringify(r.ad),
                    ad_id: r.ad_id
                };
                i = this.urlMapped(a, o, i, this.page), (0, _.TrackingRecord)(i);
            }
        }
    }, {
        key: "urlMapped",
        value: function(e, t, n, a) {
            return "subject" == e ? (a.$forward(e, t), n.page_element = "subject", n.element_id = t.subject_id) : "subjects" == e ? (a.$forward(e, t), 
            n.page_element = "subjects", n.element_id = t.subjects_id) : "goods" == e ? (a.$forward(e, t), 
            n.page_element = "goods", n.element_id = t.goods_id) : "mall_page" == e ? (a.$forward(e, t), 
            n.page_element = "mall_page", n.element_id = t.mall_id) : "promotion" == e ? (t.activity = 618, 
            p.default.toWeb(t, a), n.page_element = "promotion") : "promotion_subject" == e ? (t.activity = 618, 
            t.isbranch = 1, p.default.toWeb(t, a), n.page_element = "promotion_subject") : (a.$forward(e, t), 
            n.page_element = "spike"), n;
        }
    } ]), m;
}();

exports.default = m;