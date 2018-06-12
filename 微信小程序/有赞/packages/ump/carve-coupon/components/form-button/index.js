!function(e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var r = global.installedModules[o] = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
    }
    var n = {};
    n = global.installedModules = global.installedModules || {}, t.m = e, t.c = n, t.d = function(e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: o
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
    }, t.p = "", t(t.s = 92);
}({
    92: function(e, t, n) {
        var o = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
            }
            return e;
        };
        Component({
            externalClasses: [ "btn-class" ],
            properties: {
                type: String,
                openType: String
            },
            methods: {
                submit: function(e) {
                    var t = e.detail.formId, n = getApp();
                    if (t) {
                        var r = this.data.type, a = {
                            weapp_type: n.globalData.isYouzanApp ? "yz_public" : "custom",
                            form_id: t
                        };
                        n.carmen({
                            api: "wsc.weapp.formid/1.0.0/add",
                            data: r ? o({}, a, {
                                business_module: r
                            }) : a,
                            success: function(e) {
                                return console.log("add formId success", e, t);
                            },
                            fail: function(e) {
                                return console.log("add formId fail", e, t);
                            }
                        });
                    }
                }
            }
        });
    }
});