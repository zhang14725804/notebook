!function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var o = global.installedModules[r] = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
    }
    var n = {};
    n = global.installedModules = global.installedModules || {}, t.m = e, t.c = n, t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(n, "a", n), n;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 105);
}({
    105: function(e, t, n) {
        Component({
            properties: {
                themeClass: String,
                alias: {
                    type: String,
                    value: ""
                },
                cover: {
                    type: String,
                    value: ""
                },
                type: {
                    type: Number,
                    value: 1
                },
                count: {
                    type: Number,
                    value: 0
                },
                subCount: {
                    type: Number,
                    value: 0
                },
                summary: {
                    type: String,
                    value: ""
                },
                title: {
                    type: String,
                    value: ""
                },
                price: {
                    type: String,
                    value: ""
                },
                showPrice: {
                    type: Boolean,
                    value: !1
                },
                time: {
                    type: String,
                    value: ""
                },
                buyTime: {
                    type: String,
                    value: ""
                },
                columnTitle: {
                    type: String,
                    value: ""
                },
                noBorder: {
                    type: Boolean,
                    value: !1
                },
                isFree: {
                    type: Boolean,
                    value: !1
                }
            },
            data: {},
            methods: {
                goToContent: function(e) {
                    var t = e.currentTarget.dataset.alias;
                    t && wx.navigateTo({
                        url: "/packages/paidcontent/content/index?alias=" + t
                    });
                }
            }
        });
    }
});