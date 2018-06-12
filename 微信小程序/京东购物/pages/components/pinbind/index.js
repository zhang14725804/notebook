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

function r() {
    var e = {
        enable: 1
    };
    return f.get({
        url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33196.jsonp",
        data: {
            t: Date.now()
        }
    }).then(function(t) {
        var n = t.body.data || [], r = n.length, o = i();
        return r && (e = n.find(function(e) {
            return e.page == o;
        }) || e), s.resolve(e);
    }, function(e) {
        return s.reject(e);
    });
}

function o() {
    var e = {
        source: b.WE_CHAT
    };
    return f.get({
        url: "https://wq.jd.com/pinbind/QueryPinStatus",
        data: e
    }).then(function(e) {
        var t = e.body, n = 0 == t.errcode;
        return 13 == t.errcode ? d.doLogin().then(o) : n ? s.resolve(t) : s.reject(new Error("code:" + t.errcode + "，message:" + t.errmsg));
    }, function(e) {
        return s.reject(e);
    });
}

function a(e) {
    return !(e == y.NEED_UPDATE_PROFILE || e == y.NO_ASSET_HAS_ACCOUNT);
}

function i() {
    var e = getCurrentPages().slice(0).pop();
    return e.route || e.__route__ || "";
}

var u = function() {
    function e(e, t) {
        var n = [], r = !0, o = !1, a = void 0;
        try {
            for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), 
            !t || n.length !== t); r = !0) ;
        } catch (e) {
            o = !0, a = e;
        } finally {
            try {
                !r && u.return && u.return();
            } finally {
                if (o) throw a;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), c = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), s = require("../../../libs/promise.min.js"), l = require("../../component.js"), f = require("../../../common/request/request"), p = require("../../../common/logger.js"), d = require("../../../common/login/login.js"), v = new p("pinbind组件"), b = {
    WE_CHAT: 2
}, y = {
    NEED_UPDATE_PROFILE: 1,
    NO_ASSET_HAS_ACCOUNT: 2,
    SWITHCHABLE: 3,
    UNBINED: 4
}, h = function(f) {
    function p() {
        e(this, p);
        var n = t(this, (p.__proto__ || Object.getPrototypeOf(p)).apply(this, arguments));
        return n.addFunc("gotoAccountPage", n._gotoAccountPage), n;
    }
    return n(p, l), c(p, [ {
        key: "defaultData",
        value: function() {
            return {
                show: !1
            };
        }
    } ]), c(p, [ {
        key: "onLoad",
        value: function() {}
    }, {
        key: "onShow",
        value: function() {
            var e = this;
            s.all([ r(), o() ]).then(function(t) {
                var n = u(t, 2), r = n[0], o = a(n[1].state);
                1 == r.enable && (Object.assign(e.data, {
                    show: !o,
                    activeId: r.activeId,
                    level: r.level,
                    scene: r.scene,
                    title: r.title,
                    text: r.desc,
                    btnText: r.btnBindText
                }), e.setData(e.data));
            }).catch(function(e) {
                v.error(e);
            });
        }
    }, {
        key: "_gotoAccountPage",
        value: function(e) {
            var t = i(), n = {
                sceneid: this.data.scene,
                rurl: "/" + t,
                bindactiveid: this.data.activeId,
                bindlevel: this.data.level
            };
            this.$goto("/pages/my_pages/account/account", n);
        }
    } ]), p;
}();

module.exports = h;