function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function n(t, e) {
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

function o() {
    return {
        icon: "",
        title: "",
        titleAlign: "",
        content: "",
        wrapCls: "",
        tpl: a.SHOW,
        closable: !0,
        modal: !0,
        show: !1,
        scope: null,
        buttons: []
    };
}

function r(t) {
    f.hide();
}

function s(t) {
    var e = this;
    t.forEach(function(t) {
        t.name = "msgbox:press" + e.__getRandomID(), e[t.name] = t.handler.bind(e);
    }), this["msgbox:close"] = r.bind(this);
}

function i(t) {
    if (1 === t.length) {
        var e = t[0].cls || "";
        t[0].cls += e + " btn_red";
    }
}

var u = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}(), c = (require("../../../libs/promise.min.js"), require("../../component.js")), l = (new (require("../../../common/logger.js"))("消息弹窗组件"), 
{
    NONE: "",
    INFO: "icon_success",
    WARNING: "icon",
    ERROR: ""
}), a = {
    SHOW: "tplShow",
    INFO: "tplInfo"
}, f = function(r) {
    function f() {
        return t(this, f), e(this, (f.__proto__ || Object.getPrototypeOf(f)).apply(this, arguments));
    }
    return n(f, c), u(f, [ {
        key: "defaultData",
        value: function() {
            return o();
        }
    } ], [ {
        key: "alert",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o(), e = t.buttons && t.buttons.length >= 1 ? t.buttons.splice(0, 1) : [ {
                cls: "btn_red",
                text: "确认",
                handler: function() {
                    f.hide();
                }
            } ];
            return Object.assign(t, {
                icon: l.WARNING,
                tpl: a.SHOW,
                content: "",
                buttons: e
            }), f.show(t);
        }
    }, {
        key: "confirm",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o();
            if (0 === t.buttons.length) throw new Error("至少需要提供一个按钮");
            var e = [];
            1 === t.buttons.length ? (e.push({
                text: "取消",
                handler: function() {
                    f.hide();
                }
            }), e.push(Object.assign({
                cls: "btn_red"
            }, t.buttons.pop()))) : e = t.buttons, Object.assign(t, {
                icon: l.WARNING,
                tpl: a.SHOW,
                content: "",
                closable: !1,
                buttons: e
            }), f.show(t);
        }
    }, {
        key: "info",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o(), e = [];
            t.buttons && 0 !== t.buttons.length || e.push({
                text: "知道了",
                handler: function() {
                    f.hide();
                }
            }), Object.assign(t, {
                wrapCls: t.content ? "info" : "",
                icon: l.NONE,
                tpl: a.INFO,
                closable: !1,
                buttons: e
            }), f.show(t);
        }
    }, {
        key: "hide",
        value: function() {
            var t = getCurrentPages().slice(0).pop(), e = {};
            e["msgbox.show"] = !1, t.setData(e);
        }
    }, {
        key: "show",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o(), e = t.scope ? t.scope : getCurrentPages().slice(0).pop();
            i((t = Object.assign(o(), t, {
                show: !0
            })).buttons), s.apply(e, [ t.buttons ]), e.setData({
                msgbox: t
            });
        }
    }, {
        key: "ICONS",
        get: function() {
            return l;
        }
    } ]), f;
}();

module.exports = f;