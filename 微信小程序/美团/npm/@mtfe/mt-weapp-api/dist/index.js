function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.config = exports.request = exports.catRequest = exports.baseRequest = exports.mq = exports.redirectTo = exports.navigateTo = exports.showModal = exports.removeStorage = exports.getUserInfo = exports.setStorage = exports.getStorage = exports.getLocation = exports.openSetting = exports.login = exports.checkSession = void 0;

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = require("../../mt-weapp-utils/lib/wx-promisify.js"), o = {
    throwError: !1,
    forceProxy: !1,
    proxyUrl: "https://portal-portm.meituan.com/weapp/proxy-direct",
    proxyHeader: "proxyurl"
}, n = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : wx, n = (0, 
    r.wxPromisify)(e, t);
    return function() {
        for (var t = arguments.length, r = Array(t), s = 0; s < t; s++) r[s] = arguments[s];
        return n.apply(void 0, r).catch(function(t) {
            var n = "wx." + e + " failed: " + (t && t.message) + ", arguments: " + JSON.stringify(r);
            if (o.throwError) throw new Error(n);
            console.error(n);
        });
    };
}, s = {
    map: {},
    mq: [],
    running: [],
    MAX_REQUEST: 4,
    push: function(e) {
        for (e.t = +new Date(); this.mq.indexOf(e.t) > -1 || this.running.indexOf(e.t) > -1; ) e.t += 10 * Math.random() >> 0;
        this.mq.push(e.t), this.map[e.t] = e;
    },
    next: function() {
        var t = this;
        if (0 !== this.mq.length && this.running.length < this.MAX_REQUEST) {
            var r = this.mq.shift(), o = this.map[r];
            return this.running.push(o.t), o.fn.apply(o, e(o.args)).then(function(e) {
                return t.running.splice(t.running.indexOf(o.t), 1), delete t.map[o.t], t.next(), 
                o.handle.resolve(e);
            }).catch(function(e) {
                return t.running.splice(t.running.indexOf(o.t), 1), delete t.map[o.t], t.next(), 
                o.handle.reject(e);
            });
        }
    },
    add: function(e) {
        for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) r[o - 1] = arguments[o];
        r = r || [];
        var n = void 0, s = new Promise(function(e, t) {
            n = {
                resolve: e,
                reject: t
            };
        });
        return this.push({
            fn: e,
            args: r,
            handle: n
        }), this.next(), s;
    }
}, i = n("request"), a = n("request", require("../../../@hfe/mp-owl/lib/index.js")), p = n("checkSession"), c = n("login"), u = n("openSetting"), f = n("getLocation", wx), x = n("getStorage"), l = n("setStorage"), g = n("getUserInfo"), h = n("removeStorage"), d = n("showModal"), m = n("navigateTo"), y = n("redirectTo");

exports.checkSession = p, exports.login = c, exports.openSetting = u, exports.getLocation = f, 
exports.getStorage = x, exports.setStorage = l, exports.getUserInfo = g, exports.removeStorage = h, 
exports.showModal = d, exports.navigateTo = m, exports.redirectTo = y, exports.mq = s, 
exports.baseRequest = i, exports.catRequest = a, exports.request = function(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    "object" === (void 0 === e ? "undefined" : t(e)) && (e = (r = e).url || e);
    var n = r, p = n.data, c = n.header, u = void 0 === c ? {} : c, f = n.method, x = n.query, l = n.type, g = n.success, h = n.fail, d = n.complete, m = n.noCat, y = n.proxy;
    if (l && "form" === l.toLocaleLowerCase() && (u["content-type"] = "application/x-www-form-urlencoded"), 
    x) switch (e += ~e.indexOf("?") ? "&" : "?", void 0 === x ? "undefined" : t(x)) {
      case "string":
        e += x;
        break;

      case "object":
        e += Object.keys(x).map(function(e) {
            return encodeURIComponent(e) + "=" + encodeURIComponent(x[e]);
        }).join("&");
    }
    return (y || o.forceProxy) && (u[o.proxyHeader] = e, e = o.proxyUrl), s.add(m ? i : a, {
        url: e,
        data: p,
        header: u,
        method: f,
        success: g,
        fail: h,
        complete: d
    }).then(function(t) {
        if ("request:ok" == t.errMsg) return t;
        var r = "请求失败: " + e + ", " + JSON.stringify(t);
        if (o.throwError) throw new Error(r);
        console.error(r);
    });
}, exports.config = o;