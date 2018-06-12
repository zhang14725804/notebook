function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = require("../constants/page"), u = e(require("./data_util")), n = e(require("./url_util")), a = e(require("./object_util")), o = {};

exports.default = {
    getCurPage: function() {
        var e = getCurrentPages(), t = {};
        return e.length > 0 && (t = e[e.length - 1] || {}), t;
    },
    getKeyParamsFromQuery: function(e) {
        e || (e = this.getCurPage());
        var u = e.$urlQueryObj || {}, n = this.getCurPageKey(), a = {};
        return (((r.PageInfo[n] || {}).pv || {}).keys || []).forEach(function(e) {
            var r = void 0, n = void 0;
            "string" == typeof e ? n = u[r = e] : "object" === (void 0 === e ? "undefined" : t(e)) && (r = e.key, 
            null == (n = u[r]) && null != e.default && (n = e.default)), null != r && null != n && (a[r] = n);
        }), a;
    },
    getKeyParams: function() {
        var e = this.getCurPage(), t = e.$trackingKeyParams || {}, r = this.getKeyParamsFromQuery(e) || {};
        return a.default.assign(r, t);
    },
    getCurPageName: function() {
        var e = this.getCurPageKey() || "";
        return (r.PageInfo[e] || {}).pageName || e;
    },
    getCurPageKey: function() {
        var e = "", t = this.getCurPageRoute().split("/");
        return t.length > 0 && (e = t[t.length - 1]), e;
    },
    getCurPageFullPath: function() {
        var e = this.getCurPage();
        return (e.__route__ || "") + "?" + n.default.buildQuery(e.$urlQueryObj || {});
    },
    getCurPageQueryObj: function() {
        return this.getCurPage().$urlQueryObj || {};
    },
    getCurPageRoute: function() {
        return (this.getCurPage() || {}).__route__ || "";
    },
    getPageInfo: function(e) {
        return o[e] || (o[e] = {}), o[e];
    },
    getPageId: function(e) {
        var t = this.getCurPageName();
        "goods" == t && (t = "goods_detail"), e = e || this.getCurPageFullPath();
        var r = this.getPageInfo(e);
        return r.pageId || (r.pageId = [ t || "", Date.now(), u.default.getRandomString(10) ].join("_")), 
        r.pageId;
    },
    removePageInfo: function(e) {
        delete o[e];
    }
};