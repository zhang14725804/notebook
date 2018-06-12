function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function a(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

function r(t, e) {
    return !!t[e];
}

var n = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var r = e[a];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, a, r) {
        return a && t(e.prototype, a), r && t(e, r), e;
    };
}(), o = require("../../../component"), i = function(i) {
    function u() {
        var a;
        t(this, u);
        for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
        var i = e(this, (a = u.__proto__ || Object.getPrototypeOf(u)).call.apply(a, [ this ].concat(n))), s = n[0];
        return i.addFunc("__slideStart", i.slideStart, 100), i.addFunc("__slideEnd", i.slideEnd, 100), 
        i.addFunc("__recover", i.recover, 100), s.__recover = i.recover, i;
    }
    return a(u, o), n(u, [ {
        key: "defaultData",
        value: function() {
            return {
                isSupportMovable: !0,
                slideMoveXs: {},
                startPageX: null,
                startPageY: null,
                lastId: null,
                curId: null,
                curMovePageX: null,
                lastMovingX: null
            };
        }
    } ]), n(u, [ {
        key: "onLoad",
        value: function() {
            wx.getSystemInfoSync().SDKVersion < "1.2.0" && (this.data.isSupportMovable = !1);
        }
    }, {
        key: "slideStart",
        value: function(t) {
            var e = t.changedTouches;
            if (1 === e.length) {
                var a = e[0];
                this.data.startPageX = a.pageX, this.data.startPageY = a.pageY;
                var r = t.currentTarget.id;
                this.data.curId = r;
            }
        }
    }, {
        key: "slideEnd",
        value: function(t) {
            var e = t.changedTouches, a = t.currentTarget.id;
            if (1 === e.length && a === this.data.curId) {
                var n = r(this.data.slideMoveXs, a), o = e[0], i = o.pageX - this.data.startPageX, u = o.pageY - this.data.startPageY, s = Math.abs(u) / Math.abs(i), l = void 0, c = void 0, d = void 0;
                this.data.isSupportMovable ? (c = !n && i <= -30 && s < .57, d = !n && (i > -30 && i < 0 || s >= .57) || n && i > 0) : (c = !n && i < 0 && s < .57, 
                d = n && (i > 0 || s >= .57)), c ? l = -60 : d && (l = 0), this.data.curMovePageX = l;
            }
        }
    }, {
        key: "recover",
        value: function() {
            var t = this.data.curId, e = !1, a = this.data.slideMoveXs, n = this.data.lastId;
            if (n && n !== t && r(a, n) && (e = !0, a[n] = 0), t) {
                var o = this.data.curMovePageX;
                -60 !== o && 0 !== o || (e = !0, a[t] = o), this.data.curId = null, this.data.curMovePageX = null, 
                this.data.lastId = t;
            }
            e && this.setData({
                slideMoveXs: a
            });
        }
    } ]), u;
}();

module.exports = i;