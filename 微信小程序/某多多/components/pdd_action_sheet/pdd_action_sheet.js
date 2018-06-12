function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
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

var i = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../component.js")), a = function(a) {
    function r(n) {
        var i = n.page, o = n.ns, a = n.itemList, c = n.success, s = n.fail, u = n.complete;
        e(this, r);
        var l = t(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, i, o));
        return i && (l.page = i, l.success = c, l.fail = s, l.complete = u), l.addFunc("_actionSheetTap", l.tap), 
        l.addFunc("_actionSheetCancel", l.cancel), l.setData({
            itemList: a
        }), l;
    }
    return n(r, o.default), i(r, [ {
        key: "show",
        value: function() {
            this.setData({
                visible: !0
            });
            var e = this;
            setTimeout(function() {
                e.setData({
                    animationVisible: !0
                });
            }, 50);
        }
    }, {
        key: "hide",
        value: function() {
            this.setData({
                visible: !1,
                animationVisible: !1
            });
        }
    }, {
        key: "tap",
        value: function(e) {
            this.hide();
            var t = e.currentTarget.dataset.index;
            "function" == typeof this.complete && this.complete(t);
        }
    }, {
        key: "cancel",
        value: function() {
            this.data.visible && ("function" == typeof this.fail && this.fail(), "function" == typeof this.complete && this.complete(this.data.itemList.length), 
            this.hide());
        }
    } ]), r;
}();

exports.default = a;