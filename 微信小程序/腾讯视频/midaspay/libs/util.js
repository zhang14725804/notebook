var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : _typeof2(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e);
};

String.format = function() {
    var e = arguments[0];
    if (arguments.length > 1) if (2 == arguments.length && "object" == _typeof(arguments[1])) {
        var t = arguments[1];
        for (var r in t) if (void 0 != t[r]) {
            o = new RegExp("({" + r + "})", "g");
            e = e.replace(o, t[r]);
        }
    } else for (var n = 1; n < arguments.length; n++) if (void 0 != arguments[n]) {
        var o = new RegExp("({[" + (n - 1) + "]})", "g");
        e = e.replace(o, arguments[n]);
    }
    return e;
}, Date.convertToDate = function(e) {
    var t = e;
    return "string" == typeof e && (t = new Date(Date.parse(e))), t;
}, Date.diff = function(e, t, r) {
    var n;
    e = Date.convertToDate(e);
    var o = (t = Date.convertToDate(t)).getTime() - e.getTime();
    switch (r) {
      case "ms":
        n = 1;
        break;

      case "s":
        n = 1e3;
        break;

      case "m":
        n = 6e4;
        break;

      case "h":
        n = 36e5;
        break;

      case "d":
        n = 864e5;
        break;

      default:
        n = 864e5;
    }
    return Math.floor(o / n);
}, Date.format = function(e, t) {
    e = Date.convertToDate(e);
    var r = function(e, t) {
        t || (t = 2), e = new String(e);
        for (var r = 0, n = ""; r < t - e.length; r++) n += "0";
        return n + e;
    };
    return t.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function(t) {
        switch (t) {
          case "d":
            return e.getDate();

          case "dd":
            return r(e.getDate());

          case "ddd":
            return [ "Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat" ][e.getDay()];

          case "dddd":
            return [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ][e.getDay()];

          case "M":
            return e.getMonth() + 1;

          case "MM":
            return r(e.getMonth() + 1);

          case "MMM":
            return [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ][e.getMonth()];

          case "MMMM":
            return [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ][e.getMonth()];

          case "yy":
            return new String(e.getFullYear()).substr(2);

          case "yyyy":
            return e.getFullYear();

          case "h":
            return e.getHours() % 12 || 12;

          case "hh":
            return r(e.getHours() % 12 || 12);

          case "H":
            return e.getHours();

          case "HH":
            return r(e.getHours());

          case "m":
            return e.getMinutes();

          case "mm":
            return r(e.getMinutes());

          case "s":
            return e.getSeconds();

          case "ss":
            return r(e.getSeconds());

          case "l":
            return e.getMilliseconds();

          case "ll":
            return r(e.getMilliseconds());

          case "tt":
            return e.getHours() < 12 ? "am" : "pm";

          case "TT":
            return e.getHours() < 12 ? "AM" : "PM";
        }
    });
};

var U = module.exports;

U.fn = {
    getParam: function(e, t) {
        var r = t || window.location.href;
        if (e && r) {
            var n = new RegExp("(\\?|#|&|^)" + e + "=([^&^#]*)(#|&|$)"), o = r.match(n);
            return o ? o[2] : "";
        }
        return "";
    },
    delParam: function(e, t) {
        return !e instanceof Array && (e = [ e ]), U.fn.each(e, function(e) {
            t = t.replace(new RegExp("(?:&" + e + "=[^&]*)", "g"), ""), t = t.replace(new RegExp("(?:\\?" + e + "=[^&]*&?)", "g"), "?");
        }), t;
    },
    addParam: function(e, t) {
        var r = [];
        U.fn.each(e, function(e, t) {
            r.push(t);
        }), t = U.fn.delParam(r, t);
        var n = U.req.serializeParam(e);
        return t += /(\?|&)$/.test(t) ? "" + n : /\?/.test(t) ? "&" + n : "?" + n;
    },
    getParams: function(e) {
        var t = (e = e || location.href).replace(/.+?\?/, "").replace(/#.*/, "").split("&"), r = {};
        for (var n in t) {
            var o = t[n].split("=");
            2 === o.length && (r[o[0]] = o[1]);
        }
        return r;
    },
    each: function(e, t) {
        var r, n = 0, o = e.length;
        if (void 0 === o && U.lang.isObject(e)) {
            for (var a in e) if (!1 === t.call(e[a], e[a], a, e)) break;
        } else for (r = e[0]; n < o && !1 !== t.call(r, r, n, e); r = e[++n]) ;
        return e;
    },
    extend: function(e) {
        for (var t = 1; t <= arguments.length; t++) for (var r in arguments[t]) e[r] = arguments[t][r];
        return e;
    },
    formatFloat: function(e, t, r, n) {
        return n = ~~n ? ~~n : t + 1, intNumber = Math.round(e * Math.pow(10, n)), Math[r](intNumber / Math.pow(10, n - t)) / Math.pow(10, t);
    },
    uuid: function(e, t) {
        var r, n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), o = [];
        if (t = t || n.length, e) for (r = 0; r < e; r++) o[r] = n[0 | Math.random() * t]; else {
            var a;
            for (o[8] = o[13] = o[18] = o[23] = "-", o[14] = "4", r = 0; r < 36; r++) o[r] || (a = 0 | 16 * Math.random(), 
            o[r] = n[19 == r ? 3 & a | 8 : a]);
        }
        return o.join("");
    },
    emptyFun: function() {},
    keys: function() {
        var e = Object.prototype.hasOwnProperty, t = !{
            toString: null
        }.propertyIsEnumerable("toString"), r = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ], n = r.length;
        return function(o) {
            if ("object" !== (void 0 === o ? "undefined" : _typeof(o)) && ("function" != typeof o || null === o)) throw new TypeError("Object.keys called on non-object");
            var a, i, u = [];
            for (a in o) e.call(o, a) && u.push(a);
            if (t) for (i = 0; i < n; i++) e.call(o, r[i]) && u.push(r[i]);
            return u;
        };
    }(),
    numberInputFix: function(e, t) {
        var r = e.value, n = r.replace(/[^\d]/g, "");
        return r === n || t || (e.value = n), n;
    }
}, U.getParam = U.fn.getParam, U.lang = {
    is: function(e, t) {
        var r = Object.prototype.toString.call(t).slice(8, -1);
        return void 0 !== t && null !== t && r === e;
    },
    isNumber: function(e) {
        return this.is("Number", e);
    },
    isString: function(e) {
        return this.is("String", e);
    },
    isFunction: function(e) {
        return this.is("Function", e);
    },
    isObject: function(e) {
        return this.is("Object", e);
    },
    isDocument: function(e) {
        return null != e && e.nodeType == e.DOCUMENT_NODE;
    },
    isWindow: function(e) {
        return null != e && e == e.window;
    },
    isPlainObject: function(e) {
        return U.lang.isObject(e) && !U.lang.isWindow(e) && Object.getPrototypeOf(e) == Object.prototype;
    },
    isArray: function(e) {
        return this.is("Array", e);
    }
}, U.string = {
    escHTML: function(e, t) {
        var r = [ "&", "&amp;", "<", "&lt;", ">", "&gt;", " ", "&nbsp;", '"', "&quot;", "'", "&#39;", "\\r", "<br>", "\\n", "<br>" ];
        t && r.reverse();
        for (var n = 0, o = e; n < r.length; n += 2) o = o.replace(new RegExp(r[n], "g"), r[1 + n]);
        return o;
    },
    tmpl: function(e, t) {
        return "string" == typeof e ? e.replace(/\$([a-zA-Z0-9_\.]*)\$/g, function(e, r) {
            if (-1 !== r.indexOf(".")) {
                r = r.split(/\./g);
                var n = t;
                return U.fn.each(r, function(e) {
                    n = n[e];
                }), n || "";
            }
            return void 0 !== t[r] ? t[r] : "";
        }) : e;
    }
}, U.tmpl = U.string.tmpl, U.req = {
    log: function() {
        var e = [];
        return function(t) {
            var r = new Image();
            e.push(r), r.onload = r.onerror = r.onabort = function() {
                r = r.onload = r.onerror = r.onabort = null;
                for (var t = 0, n = e.length; t < n; ++t) e[t] === r && e.splice(t, 1);
            }, r.src = t;
        };
    }(),
    serializeParam: function(e) {
        if (!e) return "";
        var t = [];
        for (var r in e) void 0 === e[r] && null == e[r] || t.push(r + "=" + e[r]);
        return t.join("&");
    },
    getJsonp: function(e, t, r) {
        r = U.fn.extend({
            onSucess: U.fn.emptyFun,
            onFailed: U.fn.emptyFun
        }, r);
        var n = null, o = String.format("c{0}{1}", U.fn.uuid(4, 10), +new Date());
        window[t.fixedCB ? t.fixedCB : o] = function(e) {
            n = e, delete window[o];
        };
        var a = U.fn.extend({
            format: String.format("jsonp_{0}", o)
        }, t), i = this.serializeParam(a);
        e += (e.indexOf("?") > -1 ? "&" : "?") + i, this.loadScript(e, function(e, t) {
            n && t ? r.onSucess && r.onSucess.apply(window, [ n ]) : (n = {
                ret: -9999,
                path: e,
                msg: "系统繁忙，请稍后再试！"
            }, r.onFailed && r.onFailed.apply(window, [ n ]));
        }, e);
    },
    ajax: function ajax(option) {
        var o = option, m = o.method.toLocaleUpperCase(), isPost = "POST" == m, xhr = !!window.XMLHttpRequest && new XMLHttpRequest();
        if (!xhr) return o.error && o.error.call(null, {
            ret: 999,
            msg: "Create XHR Error!"
        }), !1;
        var qstr = this.serializeParam(o.param);
        return qstr && !isPost && (o.url += (o.url.indexOf("?") > -1 ? "&" : "?") + qstr), 
        xhr.open(m, o.url, !0), isPost && xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), 
        xhr.onreadystatechange = function() {
            if (4 == xhr.readyState) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    var response = xhr.responseText.replace(/(\r|\n|\t)/gi, ""), m = /(?:callback\()?(.+)(?:\))?/gi.exec(response), result = {
                        ret: 998,
                        msg: "解析数据出错，请稍后再试",
                        status: status
                    };
                    try {
                        result = eval("(" + m[1] + ")");
                    } catch (e) {}
                    o.success && o.success.call(xhr, result);
                } else o.error && o.error.call(xhr, {
                    ret: 997,
                    msg: "连接错误，请稍后再试",
                    status: status
                });
            }
        }, xhr.send(isPost ? qstr : void 0), xhr;
    },
    loadScript: function(e, t, r, n) {
        var o = document.getElementsByTagName("head")[0], a = document.createElement("script");
        a.addEventListener("load", function e() {
            if (a) {
                try {
                    a.src = "";
                } catch (e) {}
                a.removeEventListener("load", e), o.removeChild(a), a = null, "function" == typeof t && t(r, !0);
            }
        }), a.addEventListener("error", function e() {
            if (a) {
                try {
                    a.src = "";
                } catch (e) {}
                a.removeEventListener("error", e), o.removeChild(a), a = null, "function" == typeof t && t(r, !1);
            }
        }), a.charset = n || "utf-8", a.src = e, o.insertBefore(a, o.firstChild);
    },
    report: function(e, t) {
        t = t || {};
        var r = [];
        e[6] = 10, e[7] = 0, U.fn.each(e, function(e, t) {
            r.push(t + "=" + encodeURIComponent(e));
        });
        var n = [];
        U.fn.each(t, function(e, t) {
            n.push("&" + t + "=" + encodeURIComponent(e));
        }), new Image().src = "//api.unipay.qq.com/v1/900/15499/log_data?num=1&record0=" + r.join("|") + n.join("") + "&rr=" + Math.random();
    },
    isdR: function(e, t, r, n) {},
    isdV: function(e, t, r, n, o, a) {}
}, U.inherits = function(e, t) {
    var r = function() {};
    r.prototype = t.prototype, e.prototype = new r(), e.prototype.constructor = e, e._super = t;
};