!function(e) {
    function t(n) {
        if (o[n]) return o[n].exports;
        var r = global.installedModules[n] = o[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
    }
    var o = {};
    o = global.installedModules = global.installedModules || {}, t.m = e, t.c = o, t.d = function(e, o, n) {
        t.o(e, o) || Object.defineProperty(e, o, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var o = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(o, "a", o), o;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 99);
}({
    99: function(e, t, o) {
        Component({
            properties: {
                showTakeoutCart: {
                    type: Boolean
                },
                takeoutCartData: {
                    type: Array,
                    observer: function(e) {
                        e && 0 === e.length && this.toggleTakeoutCart(!1);
                    }
                }
            },
            externalClasses: [ "iphonex-class" ],
            methods: {
                toggleTakeoutCart: function(e) {
                    this.triggerEvent("toggleCart", e);
                },
                onTakeoutCartMaskClick: function() {
                    this.toggleTakeoutCart();
                },
                onClearCart: function() {
                    this.triggerEvent("clearCart");
                },
                handleGoodsNumChange: function(e) {
                    var t = e.detail, o = t.value, n = t.type, r = e.currentTarget.dataset.key;
                    console.log("num, key", o, r, n), this.triggerEvent("goodsNumChange", {
                        num: o,
                        type: n,
                        key: r
                    });
                }
            }
        });
    }
});