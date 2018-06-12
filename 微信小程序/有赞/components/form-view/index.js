!function(e) {
    function t(o) {
        if (r[o]) return r[o].exports;
        var n = global.installedModules[o] = r[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
    }
    var r = {};
    r = global.installedModules = global.installedModules || {}, t.m = e, t.c = r, t.d = function(e, r, o) {
        t.o(e, r) || Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(r, "a", r), r;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 94);
}({
    94: function(e, t, r) {
        var o = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
            }
            return e;
        };
        Component({
            properties: {
                type: String,
                disabled: Boolean
            },
            methods: {
                submit: function(e) {
                    var t = e.detail, r = t.formId, n = getApp();
                    if (r) {
                        this.triggerEvent("report", t);
                        var a = this.data, l = a.disabled, i = a.type;
                        if (!l) {
                            var s = {
                                weapp_type: n.globalData.isYouzanApp ? "yz_public" : "custom",
                                form_id: r
                            };
                            n.carmen({
                                api: "wsc.weapp.formid/1.0.0/add",
                                data: i ? o({}, s, {
                                    business_module: i
                                }) : s,
                                success: function(e) {
                                    return console.log("add formId success", e, r);
                                },
                                fail: function(e) {
                                    return console.log("add formId fail", e, r);
                                }
                            });
                        }
                    }
                }
            }
        });
    }
});