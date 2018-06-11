function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function a(t, e, a) {
    for (var n = (e = (e = e.replace(/\[(\w+)\]/g, ".$1")).replace(/^\./, "")).split("."), r = 0, i = n.length; r < i; ++r) {
        var o = n[r];
        if (!(o in t)) return t[o] = a;
        t = t[o];
    }
    return t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var n = e[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, a, n) {
        return a && t(e.prototype, a), n && t(e, n), e;
    };
}(), r = require("../common/index"), i = function() {
    function i(t, a) {
        e(this, i), this.target = t, this.ns = a, "function" == typeof t.setData && (this.page = t), 
        this._mergeLifeCircle();
    }
    return n(i, [ {
        key: "_mergeLifeCircle",
        value: function() {
            var t = this, e = this, a = [ "onLoad", "onReady", "onShow", "onHide", "onUnload", "onPageScroll", "onShareAppMessage", "onReachBottom" ], n = !0, r = !1, i = void 0;
            try {
                for (var o, s = a[Symbol.iterator](); !(n = (o = s.next()).done); n = !0) {
                    (function() {
                        var a = o.value;
                        if (!t[a]) return "continue";
                        var n = t.target[a];
                        t.target[a] = function() {
                            return e.page || (e.page = this), n && n.apply(this, arguments), e[a].apply(e, arguments);
                        };
                    })();
                }
            } catch (t) {
                r = !0, i = t;
            } finally {
                try {
                    !n && s.return && s.return();
                } finally {
                    if (r) throw i;
                }
            }
        }
    }, {
        key: "_getFuncName",
        value: function(t) {
            return "" + t;
        }
    }, {
        key: "setData",
        value: function(t, e) {
            if (!this.page) throw Error("no page object~ ");
            var a = this.ns, n = {};
            if (e) n = t; else for (var r in t) n[a + "." + r] = t[r];
            this.page.setData(n);
        }
    }, {
        key: "setDataObj",
        value: function(t, e) {
            if (!this.page) throw Error("no page object~ ");
            var a = this.ns, n = {};
            if (e) n = t; else for (var i in t) n[a + "." + i] = t[i];
            this.page.dataObj || (this.page.dataObj = {}), this.page.dataObj = r.ObjectUtil.assign(this.page.dataObj, n);
        }
    }, {
        key: "addFunc",
        value: function(e, a) {
            if (this.data[e]) throw new Error("function name " + e + " is already exists~ ");
            var n = this._getFuncName(e);
            this.page ? this.setData(t({}, "" + e, n)) : this.data[e] = n, this.target[n] = a.bind(this);
        }
    }, {
        key: "data",
        get: function() {
            return a((this.page || this.target).data, this.ns, {});
        },
        set: function(t) {
            throw console.log("~~~~~~~~~ set: ", t), Error("cannot set data yet!");
        }
    } ]), i;
}();

exports.default = i;