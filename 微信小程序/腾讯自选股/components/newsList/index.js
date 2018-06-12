(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, c = require("../../utils/ppdog"), d = a(c), e = require("../../utils/regenerator-runtime"), f = a(e), g = require("../../utils/RequestApi"), h = require("../../filter/newsFilter"), i = a(h), j = require("../../filter/navigateFilter"), k = a(j), l = 1, m = [];
    module.exports = {
        data: {
            nList: [],
            showMore: !1,
            showLoading: !1,
            moreNewsBtn: "点击查看更多"
        },
        onLoad: function() {
            l = 1, m = [];
        },
        methods: {
            bindNewsMore: function() {
                this.getRelatedNews(this.data.symbol, !0);
            },
            getRelatedNews: function(a) {
                var c = this, d = 1 < arguments.length && arguments[1] !== void 0 && arguments[1], e = this.parent.data.name;
                this.setData({
                    symbol: a,
                    name: e
                });
                var f = {};
                if (0 == a.indexOf("us")) if (function(a) {
                    return a.match(/sh000|sz399|nq899|hkHSI$|hkHSCEI$|hkHSCCI$|hkCES100$|hkCES300$|usDJI$|usIXIC$|usINX$/);
                }(a)) a = a.slice(0, 2) + "." + a.slice(2); else {
                    var h = a.split(".");
                    a = 2 < h.length ? h[0] + h[1] : h[0];
                }
                d && (f = this.changeLoadingAnimation("rotate"), this.setData(b({}, f)));
                var j = 20;
                g.Request.getRelatedNews(a, l, j + 1).then(function(a) {
                    return {
                        data: a,
                        keyword: "getRelatedNews"
                    };
                }).filter(i.default).then(function(a) {
                    var d = c.data.nList;
                    d = [].concat.call(d, m, a), f = d.length > j * l && 3 > l ? c.changeLoadingAnimation("more") : c.changeLoadingAnimation("hide"), 
                    m = d.splice(j * l, a), l++, c.setData(b({}, f, {
                        nList: d
                    }));
                }).catch(function() {
                    f = c.changeLoadingAnimation("fail"), c.setData(b({}, f));
                });
            },
            bindTapNews: function(a) {
                var b = this.parent.data.name || "", c = a.currentTarget.dataset, e = c.nid, f = c.idx, g = c.articletype, h = this.data.symbol;
                d.default.resolve({
                    url: "../newsCon/newsCon?id=" + e + "&symbol=" + h + "&name=" + b + "&articletype=" + g
                }).filter(k.default).then(function() {});
            },
            changeLoadingAnimation: function(a) {
                var c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, d = "", e = "", f = !1, g = !1;
                return "rotate" === a ? (d = "rotate", f = !0, g = !0) : "more" === a ? (e = "点击查看更多", 
                f = !0) : "fail" === a ? (e = "加载失败，请稍后重试", f = !0) : "hide" === a ? (f = !1, g = !1) : void 0, 
                c = b(c, {
                    rotate: d,
                    moreNewsBtn: e,
                    showMore: f,
                    showLoading: g
                }), c;
            }
        }
    };
})();