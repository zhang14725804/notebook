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
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t;
    };
}(), o = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../api/Ptag/Ptag_constants")), n = e(require("../api/Ptag/Ptag_utils")), a = e(require("../api/Ptag/report_manager")), i = require("../common/navigator.js"), s = require("../common/biz.js"), u = require("../common/toast/toast.js"), p = require("../common/fe_report/speed.js"), c = require("../common/fe_report/usability.js"), l = require("../common/utils.js"), d = require("../common/pretreatment"), f = function() {
    function e() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        t(this, e), this.object = r;
    }
    return r(e, [ {
        key: "plugins",
        value: function() {
            return {
                utils: l,
                helper: l,
                biz: s,
                toast: u,
                us: c,
                Speed: p
            };
        }
    }, {
        key: "methods",
        value: function() {
            return {
                $goto: i.goto,
                $gotoItem: i.gotoItem,
                $report: this.$report,
                $setReportPage: this.$setReportPage,
                $preload: d.preload,
                speedMark: this.speedMark,
                speedInit: this.speedInit,
                speedReport: this.speedReport
            };
        }
    }, {
        key: "$report",
        value: function(e, t, r) {
            r = r || {}, 2 == arguments.length && "[object Object]" == Object.prototype.toString.call(t) && (r = t, 
            t = !1), t && (e = /[?&]?ptag=([\d.]+)&?/i.exec(t)[1] || e), /^[\d.]+$/.test(e) || (this.PtagMap && (e = this.PtagMap[e]), 
            e = o[e]), e && n.default.addPtag(e, r);
        }
    }, {
        key: "$setReportPage",
        value: function(e, t) {
            var r = o[e];
            r && a.default.setCurrentPageAndAddPv(r, t);
        }
    }, {
        key: "__getRandomID",
        value: function() {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + Math.random().toString(36).substring(2, 15);
        }
    }, {
        key: "speedInit",
        value: function(e, t) {
            this._speed = new p(e, t), t && this._speed.mark(1, t);
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

module.exports = f;