!function(e) {
    function t(u) {
        if (n[u]) return n[u].exports;
        var a = global.installedModules[u] = n[u] = {
            i: u,
            l: !1,
            exports: {}
        };
        return e[u].call(a.exports, a, a.exports, t), a.l = !0, a.exports;
    }
    var n = {};
    n = global.installedModules = global.installedModules || {}, t.m = e, t.c = n, t.d = function(e, n, u) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: u
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
    }, t.p = "", t(t.s = 101);
}({
    101: function(e, t, n) {
        Component({
            properties: {
                step: {
                    type: Number,
                    value: 1
                },
                min: {
                    type: Number,
                    value: 1,
                    observer: function(e) {
                        console.log("change min ==============", e);
                    }
                },
                max: {
                    type: Number,
                    value: Number.MAX_VALUE
                },
                value: {
                    type: Number,
                    value: 1
                },
                isValueShow: {
                    type: Boolean,
                    value: !0
                },
                isAddShow: {
                    type: Boolean,
                    value: !0
                },
                isMinusShow: {
                    type: Boolean,
                    value: !0
                },
                disabled: {
                    type: Boolean,
                    value: !1
                }
            },
            methods: {
                handleNumChange: function(e, t) {
                    var n = this.data, u = n.step, a = n.min, l = n.max, o = this.data.value;
                    "minus" === t ? o -= u : "plus" === t && (o += u), o < a || o > l ? this.triggerEvent("overlimit", {
                        value: o,
                        type: t
                    }) : this.triggerEvent("change", {
                        value: o,
                        type: t
                    });
                },
                minusNum: function(e) {
                    this.handleNumChange(e, "minus");
                },
                addNum: function(e) {
                    this.data.disabled || this.handleNumChange(e, "plus");
                }
            }
        });
    }
});