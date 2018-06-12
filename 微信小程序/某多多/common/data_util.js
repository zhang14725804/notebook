function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../configs/app_config")), r = t(require("../constants/grade")), n = t(require("../libs/anti_robot")), o = {
    isArray: function(t) {
        return "[object Array]" === Object.prototype.toString.call(t);
    },
    transToCamel: function(t) {
        if (t) return t.replace(/_(\w)/g, function(t, e) {
            return e.toUpperCase();
        });
    },
    formatByPos: function(t) {
        for (var e = [], r = 1; r < arguments.length; ++r) e.push(arguments[r]);
        return t.replace(/{(\d+)}/g, function(t, r) {
            return null == e[r] ? t : e[r];
        });
    },
    getLogId: function() {
        return [ Date.now(), this.getRandomString(16) ].join("");
    },
    getRandomString: function(t) {
        t = t || 32;
        for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = e.length, n = "", o = 0; o < t; o++) n += e.charAt(Math.floor(Math.random() * r));
        return n;
    },
    getStringCharLength: function(t) {
        for (var e = 0, r = 0; r < t.length; r++) t.charCodeAt(r) < 0 || t.charCodeAt(r) > 255 ? e += 2 : e += 1;
        return e;
    },
    formatMobile: function(t) {
        for (var e = "", r = t.length, n = 0; n < r; n++) t.charCodeAt(n) < 255 && (e += t.substr(n, 1));
        return e.replace(/\s|-/g, "").replace(/^\+86/, "");
    },
    dealWithAvatarURL: function(t) {
        return null == t || "" == t ? e.default.logo : "/0" == t.substr(-2) ? t.slice(0, -1) + "132" : t;
    },
    getLotteryRule: function(t) {
        var e = this.getResultByScene(r.default.Scene.LotteryRule);
        return 0 === e ? t && t.isFreeTrial ? "免费试用规则" : "抽奖规则" : 1 === e ? "规则" : "";
    },
    trans36To10: function(t) {
        t = t || "";
        var e = "0123456789abcdefghijklmnopqrstuvwxyz", r = e.length, n = 0, o = 1;
        if (t.length > 0) for (var a = t.length - 1; a >= 0; a--) n += e.indexOf(t[a]) * o, 
        o *= r;
        return n;
    },
    formatSpecs: function(t) {
        var e = null;
        try {
            e = JSON.parse(t);
        } catch (t) {
            e = [];
        }
        return e && Array.isArray(e) ? e.map(function(t) {
            return t.spec_key && t.spec_value ? t.spec_key + ":" + t.spec_value : "";
        }) : [];
    },
    detectReqDataIsError: function(t, e) {
        return !!t.error_code && ("function" == typeof e && e(t.error_msg), !0);
    },
    objectArrayDuplicateRemove: function(t, e, r, n) {
        var o = [], a = {};
        n || (n = Math.min(t.length, 10)), n > t.length && (n = t.length), o = t.slice(0, t.length - n) || [];
        for (var i = t.length - n; i < t.length; i++) {
            var c = t[i];
            (e ? a[c[e]] : a[c]) || ("function" == typeof r && r(c) || (o.push(c), e ? a[c[e]] = !0 : a[c] = !0));
        }
        return o;
    },
    removeItemByKey: function(t, e, r) {
        return !Array.isArray(t) && (t = []), t.filter(function(t) {
            return t[e] != r;
        });
    },
    ObjectArrToStringArr: function(t, e, r) {
        return t.map(function(t) {
            return t[r];
        });
    },
    checkByKey: function(t, e, r) {
        if (!Array.isArray(t)) return {};
        var n = !0, o = !1, a = void 0;
        try {
            for (var i, c = t[Symbol.iterator](); !(n = (i = c.next()).done); n = !0) {
                var u = i.value;
                if (u[r] == e) return u;
            }
        } catch (t) {
            o = !0, a = t;
        } finally {
            try {
                !n && c.return && c.return();
            } finally {
                if (o) throw a;
            }
        }
        return {};
    },
    checkIndexByKey: function(t, e, r) {
        if (Array.isArray(t)) {
            var n = void 0;
            return t.forEach(function(t, o) {
                t[r] == e && (n = o);
            }), n;
        }
    },
    accAdd: function(t, e) {
        var r = void 0, n = void 0, o = void 0, a = void 0;
        try {
            r = t.toString().split(".")[1].length;
        } catch (t) {
            r = 0;
        }
        try {
            n = e.toString().split(".")[1].length;
        } catch (t) {
            n = 0;
        }
        if (a = Math.abs(r - n), o = Math.pow(10, Math.max(r, n)), a > 0) {
            var i = Math.pow(10, a);
            r > n ? (t = Number(t.toString().replace(".", "")), e = Number(e.toString().replace(".", "")) * i) : (t = Number(t.toString().replace(".", "")) * i, 
            e = Number(e.toString().replace(".", "")));
        } else t = Number(t.toString().replace(".", "")), e = Number(e.toString().replace(".", ""));
        return (t + e) / o;
    },
    accSub: function(t, e) {
        var r = void 0, n = void 0, o = void 0, a = void 0;
        try {
            r = t.toString().split(".")[1].length;
        } catch (t) {
            r = 0;
        }
        try {
            n = e.toString().split(".")[1].length;
        } catch (t) {
            n = 0;
        }
        return o = Math.pow(10, Math.max(r, n)), a = r >= n ? r : n, ((t * o - e * o) / o).toFixed(a);
    },
    accMul: function(t, e) {
        var r = 0, n = t.toString(), o = e.toString();
        try {
            -1 !== n.indexOf(".") && (r += n.split(".")[1].length);
        } catch (t) {
            console.log(t);
        }
        try {
            -1 !== o.indexOf(".") && (r += o.split(".")[1].length);
        } catch (t) {
            console.log(t);
        }
        return Number(n.replace(".", "")) * Number(o.replace(".", "")) / Math.pow(10, r);
    },
    accDiv: function(t, e) {
        var r = 0, n = 0, o = void 0, a = void 0;
        try {
            r = t.toString().split(".")[1] ? t.toString().split(".")[1].length : 0;
        } catch (t) {
            console.log(t);
        }
        try {
            n = e.toString().split(".")[1] ? e.toString().split(".")[1].length : 0;
        } catch (t) {
            console.log(t);
        }
        return o = Number(t.toString().replace(".", "")), a = Number(e.toString().replace(".", "")), 
        o / a * Math.pow(10, n - r);
    },
    isObject: function(t) {
        return t && "[object Object]" === t.toString() && Object.keys(t).length > 0;
    },
    generateAntiContent: function(t, e) {
        return t || (t = new n.default({
            serverTime: Date.parse(new Date())
        })), e || (e = t.messageDepacketize({
            changeEvent: !0,
            tapEvent: !0,
            inputEvent: !0,
            touchmoveEvent: !0,
            longpressEvent: !0,
            token: !0,
            innerTimeStamp: !0,
            scene: !0,
            shareTicket: !0
        })), encodeURIComponent(e);
    }
};

exports.default = o;