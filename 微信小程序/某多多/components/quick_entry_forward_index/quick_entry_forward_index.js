function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function r(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
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
}(), o = e(require("../component.js")), i = require("../../common/index"), u = e(require("../../storage/ram_manager")), c = (e(require("../../libs/es6-promise.min")), 
e(require("../../libs/co/we-index")), e(require("../../libs/regenerator-runtime/runtime")), 
function(e) {
    function c(e) {
        var n = e.page, a = e.ns;
        t(this, c);
        var o = r(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, n, a));
        return n && (o.page = n), o.addFunc("_fowardIndex", o.fowardIndex), u.default.currentLandPagePath && u.default.currentLandPagePath.indexOf(o.page.$pageName) >= 0 && o.setData({
            showQuickEntry: !0
        }), o;
    }
    return n(c, o.default), a(c, [ {
        key: "fowardIndex",
        value: function() {
            var e = this;
            u.default.currentLandPagePath = null, e.data.isShowQuickEntry && e.setData({
                isShowQuickEntry: !1
            }), (0, i.TrackingRecord)({
                op: "click",
                page_name: e.page.$pageName,
                page_section: "bubble_list",
                page_element: "index"
            }), e.page.$forward("index");
        }
    }, {
        key: "onPageScroll",
        value: function(e) {
            if (u.default.currentLandPagePath) {
                var t = this;
                e.scrollTop > 200 ? t.data.isShowQuickEntry || t.setData({
                    isShowQuickEntry: !0
                }) : t.data.isShowQuickEntry && t.setData({
                    isShowQuickEntry: !1
                });
            }
        }
    } ]), c;
}());

exports.default = c;