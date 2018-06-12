(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b, c = require("../../utils/ppdog"), d = a(c), e = require("../../utils/regenerator-runtime"), f = a(e), g = require("../../utils/RequestApi"), h = require("../../filter/hqFilter"), i = a(h), j = require("../../filter/response"), k = a(j), l = 0, m = !0, n = !0, o = {
        hs: [ "hszsData", "averatio", "chr0", "chr1", "dtzf", "trunrl" ],
        hk: [ "hkzsData", "hk_industry_list", "main_all_desc", "main_all_asc", "main_all_amount_desc", "gem_all_desc", "gem_all_asc", "gem_all_amount_desc" ],
        us: [ "uszsData", "zgg", "ustec" ]
    };
    Page({
        components: {
            failureTip: {}
        },
        data: {
            selected: [ "selected", "", "", "" ],
            hscur: [ "selected", "" ],
            hkcur: [ "selected", "" ],
            uscur: [ "selected", "" ],
            curTab: 0,
            scrollHeight: "647px",
            hsnodata: !0,
            hknodata: !0,
            usnodata: !0,
            showNodata: !1,
            toggleClasses: [ "down", "down", "down", "down", "down", "down", "down", "down", "down", "down", "down", "down", "down", "down" ],
            qq: "",
            colorType: ""
        },
        onLoad: function() {
            console.log("[hq] > load");
            var a = getApp().SystemInfo, b = a.screenHeight, c = a.pixelRatio, d = a.windowHeight, e = b || d;
            this.setData({
                scrollHeight: e - 78 / c + "px",
                nodataTop: e / 2 - 50 + "px"
            }), n = !0, this.getCache(!0);
        },
        onShow: function() {
            var a = getApp(), b = a.Event;
            console.log("[hq] > show"), b.emit("tapTab", "hq"), this.startUpdating();
            var c = getApp().settings.colorType;
            this.data.colorType != c && this.setData({
                colorType: c
            });
        },
        onReady: function() {
            console.log("[hq] > onready");
        },
        onHide: function() {
            console.log("[hq] > hide"), b && clearTimeout(b), this.cacheHangqing();
        },
        onUnload: function() {
            this.cacheHangqing(), b && clearTimeout(b);
        },
        onPullDownRefresh: function() {
            this.startUpdating(), wx.stopPullDownRefresh();
        },
        onHqUpdate: function() {
            var a = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : {}, b = arguments[1], c = b.toLowerCase();
            a[c + "nodata"] = !1, a.showNodata = !1, this.setData(a);
        },
        onHqUpdateFail: function() {
            this._currentNodata() && !n ? this.setData({
                showNodata: !0
            }) : this.showTimeoutTip();
        },
        startUpdating: function() {
            var a = this;
            b && clearTimeout(b);
            var c, d = getApp(), e = d.Event, f = function c(d) {
                var e = 1 < arguments.length && arguments[1] !== void 0 && arguments[1];
                console.log("updating", d), g.Request.getHqList(d).then(function(a) {
                    return {
                        data: a,
                        mkt: d,
                        fnName: "hq"
                    };
                }).filter(i.default).then(function(f) {
                    a.onHqUpdate(f, d);
                    e && (f.close ? b && clearTimeout(b) : b = setTimeout(function() {
                        c(d);
                    }, 5e3));
                }).catch(function(b) {
                    a.onHqUpdateFail(), console.log(234234, b);
                });
            };
            m ? (m = !1, f("Hs", !0), f("Hk"), f("Us")) : (c = [ "Hs", "Hk", "Us" ][l], f(c, !0));
        },
        _currentNodata: function() {
            var a = [ this.data.hsnodata, this.data.hknodata, this.data.usnodata ];
            return a[l];
        },
        isEmptyObject: function(a) {
            for (var b in a) return !1;
            return !0;
        },
        getCache: function() {
            var a = this, b = function(b) {
                d.default.wx.getStorage({
                    key: "hangqing"
                }).then(function(c) {
                    if (c && c.data[b]) {
                        var d = c.data[b], e = {};
                        o[b].forEach(function(a) {
                            d && (e[a] = d[a]);
                        }), a.isEmptyObject(e) || (a.onHqUpdate(e, b), n = !1);
                    }
                }).catch(function(a) {
                    console.log(a);
                });
            };
            [ "hs", "hk", "us" ].forEach(function(a) {
                b(a);
            });
        },
        cacheHangqing: function() {
            var a = this, b = getApp(), c = {}, d = this.data, e = d.hsnodata, f = d.hknodata, g = d.usnodata;
            [ "hs", "hk", "us" ].forEach(function(b) {
                c[b] = {}, o[b].forEach(function(d) {
                    c[b][d] = a.data[d];
                });
            }), wx.setStorage({
                key: "hangqing",
                data: c,
                success: function() {
                    console.log("setdata", c);
                }
            });
        },
        bindTapTab: function(a) {
            l = +a.target.dataset.tab;
            var b = this.data.selected, c = {};
            b.forEach(function(a, b) {
                c["selected[" + b + "]"] = b === l ? "selected" : "", c.curTab = l;
            }), this.setData(c);
        },
        bindChangeTab: function(a) {
            console.log("changtabb"), l = +a.detail.current;
            var b = this.data.selected, c = {};
            b.forEach(function(a, b) {
                c["selected[" + b + "]"] = b === l ? "selected" : "", c.curTab = l;
            }), this.setData(c), this.startUpdating();
        },
        showTimeoutTip: function() {
            var a = this.childrens.failureTip;
            a.showTip();
        },
        bindToggle: function(a) {
            var b = +a.currentTarget.dataset.itemid, c = "down" == this.data.toggleClasses[b] ? "up" : "down", d = this.data.toggleClasses;
            d[b] = c, this.setData({
                toggleClasses: d
            });
        },
        bindGoToRanking: function(a) {
            var b = a.currentTarget.dataset, c = b.itemid, d = b.type, e = b.order;
            0 == c || 5 == c ? wx.navigateTo({
                url: "../hqRemen/hqRemen?type=" + d
            }) : wx.navigateTo({
                url: "../hqRanking/hqRanking?type=" + d
            });
        },
        bindChangeCur: function(a) {
            var b = a.currentTarget.dataset.mkt, c = a.detail.current, d = {};
            d[b + "cur"] = c ? [ "", "selected" ] : [ "selected", "" ], this.setData(d);
        }
    });
})();