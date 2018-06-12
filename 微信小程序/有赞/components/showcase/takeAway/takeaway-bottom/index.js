!function(t) {
    function e(r) {
        if (a[r]) return a[r].exports;
        var o = global.installedModules[r] = a[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
    }
    var a = {};
    a = global.installedModules = global.installedModules || {}, e.m = t, e.c = a, e.d = function(t, a, r) {
        e.o(t, a) || Object.defineProperty(t, a, {
            configurable: !1,
            enumerable: !0,
            get: r
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var a = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(a, "a", a), a;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 100);
}({
    100: function(t, e, a) {
        var r = getApp();
        Component({
            properties: {
                startFee: {
                    type: Number,
                    value: 0
                },
                allChoosedNum: {
                    type: Number,
                    value: 0
                },
                allChoosedPrice: {
                    type: Number,
                    value: 0
                },
                takeoutCartData: {
                    type: Array,
                    value: []
                }
            },
            externalClasses: [ "iphonex-class" ],
            methods: {
                showTakeoutCartAction: function() {
                    this.data.takeoutCartData.length && this.triggerEvent("toggleCart");
                },
                goToPay: function() {
                    var t = this.data.takeoutCartData.map(function(t) {
                        var e = "";
                        try {
                            e = (JSON.parse(t.extra_attribute) || {}).bizData || "";
                        } catch (t) {
                            console.warn(t);
                        }
                        return {
                            activityAlias: "",
                            activityId: 0,
                            activityType: 0,
                            message: t.message,
                            num: t.num,
                            price: t.price,
                            skuId: t.skuId,
                            goodsId: t.goodsId,
                            kdtId: r.getKdtId(),
                            bizTracePointExt: e
                        };
                    }), e = r.db.set({
                        type: "goods",
                        goods_list: t
                    });
                    wx.navigateTo({
                        url: "/pages/trade/buy/index?orderFrom=cart&dbid=" + e
                    });
                }
            }
        });
    }
});