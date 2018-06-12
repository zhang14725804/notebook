function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var r = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), n = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../api/Ptag/Ptag_constants")), o = e(require("../api/Ptag/Ptag_utils")), a = e(require("../api/Ptag/report_manager")), i = require("../common/fe_helper.js"), s = require("../common/biz.js"), u = require("../common/toast/toast.js"), c = require("../common/fe_report/speed.js"), p = require("../common/fe_report/usability.js"), l = require("../common/request/request.js"), f = require("../common/navigator.js"), d = function() {
    function e() {
        t(this, e), this.helper = i, this.biz = s, this.toast = u, this.us = p, this.$request = l, 
        this.$goto = f.goto;
    }
    return r(e, [ {
        key: "$report",
        value: function(e, t, r) {
            r = r || {}, 2 == arguments.length && "[object Object]" == Object.prototype.toString.call(t) && (r = t, 
            t = !1), t && (e = /[?&]?ptag=([\d.]+)&?/i.exec(t)[1] || e), /^[\d.]+$/.test(e) || (this.PtagMap && (e = this.PtagMap[e]), 
            e = n[e]), e && o.default.addPtag(e, r);
        }
    }, {
        key: "$setReportPage",
        value: function(e, t) {
            var r = n[e];
            r && a.default.setCurrentPageAndAddPv(r, t);
        }
    }, {
        key: "__getRandomID",
        value: function() {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + Math.random().toString(36).substring(2, 15);
        }
    }, {
        key: "$gotoCart",
        value: function() {
            this.$goto("/pages/cart/cart/cart", "switchTab");
        }
    }, {
        key: "speedInit",
        value: function(e, t) {
            this._speed = new c(e, t), t && this._speed.mark(1, t);
        }
    }, {
        key: "speedMark",
        value: function(e, t) {
            return this._speed && this._speed.mark(e, t), this;
        }
    }, {
        key: "speedReport",
        value: function() {
            var e = this;
            setTimeout(function() {
                try {
                    e._speed && (e._speed.report(), delete e._speed);
                } catch (e) {
                    console.warn("speedReport", e);
                }
            }, 0);
        }
    } ]), e;
}();

module.exports = d;