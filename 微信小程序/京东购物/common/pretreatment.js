function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var r = 0; r < n.length; r++) {
            var t = n[r];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(n, r, t) {
        return r && e(n.prototype, r), t && e(n, t), n;
    };
}(), r = require("../libs/emitter.js"), t = require("../common/url_utils").getQueryArray, a = new r(), u = {}, o = function() {
    function r() {
        e(this, r);
    }
    return n(r, null, [ {
        key: "getAllPages",
        value: function() {
            return getCurrentPages();
        }
    }, {
        key: "isExist",
        value: function(e) {
            return -1 !== this.getAllPages().findIndex(function(n) {
                return n.route === e;
            });
        }
    }, {
        key: "prev",
        value: function() {
            var e = this.getAllPages();
            return e[e.length - 1];
        }
    } ]), r;
}(), i = function() {
    function r() {
        e(this, r);
    }
    return n(r, null, [ {
        key: "register",
        value: function(e) {
            var n = __wxRoute || "";
            n && (e.onNavigate || e.onPreLoad) && (e.onPreLoad && a.on("preload:" + n, function(e, n) {
                u[e].onPreLoad({
                    page: o.prev(),
                    url: e,
                    params: n
                });
            }), u[n] = e);
        }
    }, {
        key: "onNavigate",
        value: function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = e.replace(/^\//, ""), t = u[r];
            t && t.onNavigate && t.onNavigate({
                page: o.prev(),
                url: e,
                params: n
            });
        }
    }, {
        key: "preload",
        value: function(e) {
            var n = e.replace(/^\/|\?.*/g, "");
            n && a.emit("preload:" + n, n, t(e));
        }
    } ]), r;
}();

module.exports = i;