function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

function r(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var a = t[r];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, r, a) {
        return r && e(t.prototype, r), a && e(t, a), t;
    };
}(), u = e(require("../../common/localStorage")), l = e(require("./Pv_utils")), o = e(require("./report")), i = e(require("../../common/utils.js")), s = e(require("../../common/cookie-v2/cookie")), g = e(require("../../libs/md5")), f = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../../common/url_utils")), c = function() {
    function e(t) {
        r(this, e), this.url = t;
    }
    return n(e, [ {
        key: "setUrl",
        value: function(e) {
            this.url = e;
        }
    }, {
        key: "getUrl",
        value: function() {
            return this.url ? this.url : "";
        }
    }, {
        key: "cleanUp",
        value: function() {
            for (var e in this) this.hasOwnProperty(e) && (this[e] = null);
        }
    } ]), e;
}(), d = function() {
    function e() {
        r(this, e), this.lastPage = new c(), this.currentPage = new c(), this.referrerPage = new c(), 
        this.changeRef = !1, this.pps = "";
    }
    return n(e, null, [ {
        key: "getCurrentPageUrl",
        value: function() {
            return this.currentPage ? this.currentPage.getUrl() : "";
        }
    }, {
        key: "setCurrentPageUrl",
        value: function(e) {
            this.currentPage = new c(e);
        }
    }, {
        key: "getLastPageUrl",
        value: function() {
            return this.lastPage ? this.lastPage.getUrl() : "";
        }
    }, {
        key: "getRerrerUrl",
        value: function() {
            return this.referrerPage ? this.referrerPage.getUrl() : e.getLastPageUrl();
        }
    }, {
        key: "cleanUpLastPageInfo",
        value: function() {
            this.lastPage ? this.lastPage.cleanUp() : this.lastPage = new c();
        }
    }, {
        key: "swapLastAndCurrentPageInfo",
        value: function() {
            var e = this.lastPage;
            this.lastPage = this.currentPage, this.currentPage = e, this.referrerPage = null;
        }
    }, {
        key: "setChangeRef",
        value: function(e) {
            this.changeRef = e;
        }
    }, {
        key: "setPPS",
        value: function(e) {
            this.pps = e;
        }
    }, {
        key: "clearPPS",
        value: function() {
            this.pps = "";
        }
    }, {
        key: "isItemView",
        value: function(e) {
            return e && 1 == e.isItem;
        }
    }, {
        key: "setReportArgs",
        value: function() {
            o.default.setReportCookies(e.getCurrentPageUrl(), e.getRerrerUrl());
        }
    }, {
        key: "setJda",
        value: function(e) {
            var t = s.default.getCookie("__jda");
            if (!t) {
                var r = Date.now(), a = s.default.getCookie("visitkey") || "", n = e;
                t = [ "122270672", g.default.hexMD5(a + r + n), r, r, r, 1 ].join("."), s.default.setCookie({
                    data: {
                        __jda: {
                            value: t,
                            maxAge: 259200
                        }
                    }
                });
            }
        }
    }, {
        key: "setCurrentPageAndAddPv",
        value: function(r, n) {
            "object" == (void 0 === r ? "undefined" : a(r)) && (n = r, r = "");
            var o = getCurrentPages().length, s = i.default.getPageUrl().vurl, g = getApp().pr, d = getCurrentPages()[o - 1].data.ptag, p = getApp().utmProps || {}, P = this;
            r = r || s, g && (r = f.addUrlParam(r, {
                pr: g
            }), delete getApp().pr), d && (r = f.addUrlParam(r, {
                ptag: d
            })), this.pps && !f.getUrlParam("pps", r) && (r = f.addUrlParam(r, {
                pps: this.pps
            }), this.clearPPS());
            for (var h in p) p[h] && (r = f.addUrlParam(r, t({}, h, p[h])));
            return /http(s)?:\/\/wq\.jd\.com\/wxapp/.test(r) || (n && n.ignoreUrlFormat ? delete n.ignoreUrlFormat : console.error("pv上报url参数有误，请尽快改为新参数格式-http://wq.jd.com/wxapp/youRouter")), 
            P.currentPage ? (P.currentPage.getUrl() != r || P.changeRef) && (e.cleanUpLastPageInfo(), 
            e.swapLastAndCurrentPageInfo(), P.currentPage.setUrl(r), P.changeRef = !1) : P.currentPage = new c(r), 
            u.default.get("wdref", e.getLastPageUrl()).then(function(t) {
                P.referrerPage = new c(t), e.setReportArgs(), l.default.addPv(e.getCurrentPageUrl(), e.getRerrerUrl(), n), 
                u.default.remove("wdref").then(function(e) {
                    console.log("删除wdref成功" + e);
                });
            }), e.setJda(r), this.currentPage;
        }
    }, {
        key: "addSearchPagePv",
        value: function(t, r, a, n) {
            var u = {
                kwd: r,
                kwd_result: a
            };
            n && (u.sf = n), t = t + "?key=" + r, e.setCurrentPageAndAddPv(t, u);
        }
    }, {
        key: "addDetailPagePv",
        value: function(t, r, a, n) {
            var u = {
                isItem: 1,
                sku_id: r,
                vender_id: a,
                ptag: n
            };
            e.setCurrentPageAndAddPv(t, u);
        }
    }, {
        key: "addOfflinePagePv",
        value: function(t, r) {
            var a = {
                shopId: r
            };
            e.setCurrentPageAndAddPv(t, a);
        }
    }, {
        key: "addSearchPageExposure",
        value: function(t) {
            t && (e.setReportArgs(), l.default.addSearchExposure(e.getCurrentPageUrl(), e.getRerrerUrl(), t));
        }
    }, {
        key: "getSearchExposureArgs",
        value: function(e, t, r) {
            if (!t || !t[0]) return null;
            for (var a = t[0].wareid, n = 1; n < t.length; n++) a = a + "_" + t[n].wareid;
            return {
                exp_sku_qtty: t.length,
                search_kwd: r,
                intenid: t[0].catid,
                ss_page: e,
                exp_sku_list: a || "",
                actid: 1
            };
        }
    }, {
        key: "addPtagExposure",
        value: function(t, r) {
            l.default.addPtagExposure(e.getCurrentPageUrl(), e.getRerrerUrl(), t, r);
        }
    }, {
        key: "guessyouLikeReport",
        value: function(t) {
            l.default.addGuessyouLikeReport(e.getCurrentPageUrl(), e.getRerrerUrl(), t);
        }
    }, {
        key: "userShareReport",
        value: function(t) {
            l.default.addUserShareReport(e.getCurrentPageUrl(), e.getRerrerUrl(), t);
        }
    }, {
        key: "exitAppReport",
        value: function() {
            u.default.set("lastSplash", Date.now());
        }
    } ]), e;
}();

module.exports = d;