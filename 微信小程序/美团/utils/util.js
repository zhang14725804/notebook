function t(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

function e(t, e) {
    var n, r, o, i;
    try {
        n = t.toString().split(".")[1].length;
    } catch (t) {
        n = 0;
    }
    try {
        r = e.toString().split(".")[1].length;
    } catch (t) {
        r = 0;
    }
    return i = Math.max(n, r), o = Math.pow(10, i), Number(((t * o - e * o) / o).toFixed(i));
}

function n(t, e) {
    if (e = e || null) {
        var n = Object.keys(e).map(function(t) {
            return t + "=" + e[t];
        });
        t += "?" + (n = n.join("&"));
    }
    return t;
}

function r(t) {
    t && (0, c.request)(t);
}

function o(t) {
    this.visibleHeight = t.visibleHeight, this.percent = t.percent || .7, this.bid = t.bid, 
    this.viewDots = [], this.val_lab = t.val_lab, this.lx = t.lx;
}

var i = function() {
    function t(t, e) {
        var n = [], r = !0, o = !1, i = void 0;
        try {
            for (var a, c = t[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), 
            !e || n.length !== e); r = !0) ;
        } catch (t) {
            o = !0, i = t;
        } finally {
            try {
                !r && c.return && c.return();
            } finally {
                if (o) throw i;
            }
        }
        return n;
    }
    return function(e, n) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, c = require("../npm/@mtfe/mt-weapp-api/dist/index.js"), s = require("../config.js"), u = (require("./cat.js"), 
require("../login/index.js")), l = {
    "index/pages/mt/mt": "c_qan50600",
    "index/pages/h5/h5": "c_gya2akq1",
    "mt/pages/deal/deal": "c_oiyv8tl2",
    "mt/pages/order/order-detail": "c_is2pkyrx",
    "mt/pages/order/order-detail-daozong": "c_x9czc210",
    "index/pages/order/order-list": "c_s57hl3r2",
    "mt/pages/order/post-order": "c_n4bkas2v",
    "mt/pages/poi/poi-list": "c_sqmfco4b",
    "mt/pages/poi/poi": "c_doyuzb5v",
    "index/pages/nodata/nodata": "c_kjely8ps",
    "search/pages/search/search": "c_v08khz16",
    "mt/pages/list/list": "c_9ffftlmu",
    "index/pages/mine/mine": "c_a3br2oqo",
    "mt/pages/comment/comment": "c_tvhkll6w",
    "mt/pages/poi/album": "c_3ubromfr",
    "search/pages/city/city": "c_369augie"
}, f = {
    mtOrder: "b_3wzoszrv",
    mtPay: "b_b1w4ccta"
};

"function" != typeof Object.assign && (Object.assign = function(t) {
    if (t) return ([].slice.call(arguments, 1) || []).forEach(function(e) {
        e && Object.keys(e).forEach(function(n) {
            t[n] = e[n];
        });
    }), t;
}), String.prototype.startsWith || (String.prototype.startsWith = function(t, e) {
    return this.substr(!e || e < 0 ? 0 : +e, t.length) === t;
}), o.prototype = {
    constructor: o,
    setValLab: function(t) {
        this.val_lab = t;
    },
    addDots: function(t) {
        t instanceof Array ? this.viewDots = [].concat(t) : t && "object" === (void 0 === t ? "undefined" : a(t)) && this.viewDots.push(t);
    },
    check: function(t) {
        var e = this, n = (t = t || 0) + this.visibleHeight;
        this.viewDots.forEach(function(o) {
            var i = (o.bottom - o.top) * e.percent;
            if (!o.report && o.bottom - t > i && n - o.top > i && (o.dataset.hasads && r(o.dataset.adsshowurl), 
            e.lx)) {
                var a = {};
                if (o.dataset.vallab) try {
                    a = JSON.parse(o.dataset.vallab);
                } catch (t) {
                    console.error(t);
                }
                e.lx.moduleView(e.bid, Object.assign(a, e.val_lab)), o.report = !0;
            }
        }), this.removeReported();
    },
    clearList: function() {
        this.viewDots.length = 0;
    },
    removeReported: function() {
        var t = this;
        clearTimeout(this.removeFlag), this.removeFlag = setTimeout(function() {
            t.viewDots = t.viewDots.filter(function(t) {
                return !t.report;
            });
        }, 1e3);
    },
    init: function() {
        this.check();
    }
};

var p = function() {
    wx.showModal({
        title: "提示信息",
        content: "微信版本太低，请下载最新版查看该服务。",
        showCancel: !1
    });
}, g = wx.canIUse ? function(t) {
    var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = wx.canIUse(t);
    return !n && e && p(), n;
} : function(t) {
    return (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) && p(), 
    !1;
};

wx.reLaunch || (wx.reLaunch = function(t) {
    wx.navigateBack(getCurrentPages().length), wx.redirectTo(t);
}), wx.showLoading || (wx.showLoading = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    t.icon = "loading", wx.showToast(t);
}, wx.hideLoading = wx.hideToast);

var d = function(t, e) {
    return (0, c.request)({
        url: "https://web.meituan.com/web/miniprogram/formid/report",
        method: "POST",
        data: t,
        success: function(t) {
            e && e.call(void 0, t);
        },
        fail: function(t) {
            console.error("fail to post formId:" + t.message);
        }
    });
}, m = function(t, e) {
    return function() {
        return t.apply(this, arguments).catch(function(t) {
            e && console.error("mt-group: ", t);
        });
    };
}, h = u.utils, v = h.getLoginCode, y = h.setStorage, w = h.getStorage, b = h.stringify, x = function(t) {
    getApp().getSysInfo && getApp().getSysInfo(function(e) {
        var n = [ {
            category: t.category || "resourceError",
            content: t.content || "自定义错误",
            level: t.level || "error",
            network: t.network || "unknow",
            os: e.os || "unknow",
            pageUrl: t.pageUrl || "index/pages/mt/mt",
            project: "mt-weapp",
            sec_category: t.sec_category || "自定义错误",
            timestamp: parseInt(+new Date() / 1e3),
            unionId: t.unionId || ""
        } ];
        (0, c.request)({
            url: "https://catfront.dianping.com/api/log?v=1",
            data: "c=" + encodeURIComponent(JSON.stringify(n)),
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded;"
            }
        });
    });
};

module.exports = {
    stringify: b,
    getLoginCode: v,
    getStorage: m(w),
    setStorage: m(y, !0),
    postFormId: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "pingtai", n = arguments[2], r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "common";
        console.log("posting", "formid is :", t);
        var o = getApp(), i = {
            formId: t,
            source: e,
            appId: "wxde8ac0a21135c07d",
            formIdType: r
        }, a = o.globalData, c = a.openId, s = a.userId;
        s && (i.userId = s), c ? (i.openId = c, d(i, n)) : o.getOpenId(function(t) {
            i.openId = t, d(i, n);
        });
    },
    showLowVersionTip: p,
    canIUse: g,
    getUserInfo: function() {
        return h.getUserInfo({
            withCredentials: !1
        }, !0).then(function(t) {
            return t.userInfo;
        });
    },
    formatTime: function(e) {
        var n = e.getFullYear(), r = e.getMonth() + 1, o = e.getDate(), i = e.getHours(), a = e.getMinutes(), c = e.getSeconds();
        return [ n, r, o ].map(t).join("/") + " " + [ i, a, c ].map(t).join(":");
    },
    formatDate: function(e) {
        return [ e.getFullYear(), e.getMonth() + 1, e.getDate() ].map(t).join("/");
    },
    formatDateWithEmptyStr: function(e) {
        return [ e.getFullYear(), e.getMonth() + 1, e.getDate() ].map(t).join("");
    },
    getScoreArr: function(t) {
        for (var n = [ 0, 0, 0, 0, 0 ], r = 0; r < 5; r++) {
            var o = e(t, r);
            if (o >= .8) n[r] = 1; else {
                if (!(o <= .2)) {
                    n[r] = 2;
                    break;
                }
                n[r] = 0;
            }
        }
        return n;
    },
    formatUrl: n,
    genCaptchaUrl: function(t) {
        return n(s.captchaApi, {
            uuid: t,
            n: Math.random()
        });
    },
    callShopPhone: function(t) {
        var e = t.currentTarget.dataset.phone;
        if (e) {
            var n = (e = e.split("/")).map(function(t) {
                return "联系商家:" + t;
            });
            wx.showActionSheet({
                itemList: n,
                success: function(t) {
                    t.cancel || wx.makePhoneCall({
                        phoneNumber: e[t.tapIndex]
                    });
                }
            });
        }
    },
    hideLoading: function(t) {
        t.setData({
            loading: {
                hidden: !0
            }
        });
    },
    getCid: function() {
        var t = getCurrentPages(), e = t[t.length - 1].route;
        return l[e];
    },
    mtBids: f,
    formatImageUrl: function(t, e, n, r) {
        t = t || "";
        try {
            t = decodeURIComponent(t);
        } catch (e) {
            console.error(e), console.error("==================" + t);
        }
        n += "", r = r ? r + ":" : "";
        var o = {
            "2g": "10Q",
            "3g": "30Q",
            "4g": "50Q",
            wifi: "50Q"
        }, i = "50Q";
        return o[n.toLowerCase()] && (i = o[n.toLowerCase()]), e = (e = e || "192w_192h_1e_1c") + "_" + i, 
        e = t.indexOf("@") > 0 ? "|" + e : /mss\.sankuai\.com/.test(t) ? "" : "@" + e, t.replace("/w.h/", "/").replace("http:", r || "") + e;
    },
    getCurrentPagePath: function() {
        var t = getCurrentPages();
        return t[t.length - 1].route;
    },
    mtSetStorageSync: function(t, e, n) {
        try {
            wx.setStorageSync(t, {
                value: e,
                timestamp: +new Date(),
                expires: n
            });
        } catch (t) {
            console.log(t);
        }
    },
    mtGetStorageSync: function(t) {
        try {
            var e = wx.getStorageSync(t);
            return e.expires && +new Date() - e.timestamp > e.expires ? (wx.removeStorageSync(t), 
            null) : e.value;
        } catch (t) {
            return console.log(t), null;
        }
    },
    ViewGA: o,
    sendAdsLog: r,
    json2Form: function(t) {
        var e = [];
        for (var n in t) void 0 !== t[n] && e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
        return e.join("&");
    },
    formatTimestamp: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(), e = new Date(t).getDate();
        return new Date(t).getMonth() + 1 + "月" + e + "日";
    },
    computerDays: function(t, e) {
        if (t && e) return Number(t) !== Number(e) ? Math.ceil((e - t) / 1e3 / 3600 / 24) : 0;
    },
    valuesPolyfill: function() {
        var t = Function.bind.call(Function.call, Array.prototype.reduce), e = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable), n = Function.bind.call(Function.call, Array.prototype.concat), r = "object" === ("undefined" == typeof Reflect ? "undefined" : a(Reflect)) && Reflect.ownKeys || Object.keys;
        Object.values || (Object.values = function(o) {
            return t(r(o), function(t, r) {
                return n(t, "string" == typeof r && e(o, r) ? [ o[r] ] : []);
            }, []);
        }), Object.entries || (Object.entries = function(o) {
            return t(r(o), function(t, r) {
                return n(t, "string" == typeof r && e(o, r) ? [ [ r, o[r] ] ] : []);
            }, []);
        });
    },
    filterPramas: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return Object.keys(t).reduce(function(e, n) {
            return null != t[n] && (e[n] = t[n]), e;
        }, {});
    },
    formatImgURI: function(t, e) {
        e = Object.assign({}, e), t = (t = decodeURIComponent(t)).replace("img.meituan.net", "p0.meituan.net");
        var n = /p([0-1]{1})\.meituan\.net(\/[^@]+)@?(.*)?/;
        if (n.test(t)) {
            var r = n.exec(t), o = i(r, 4), a = (o[0], o[1], o[2]), c = o[3];
            a = a.replace("/w.h/", "/");
            var s = Object.keys(e).map(function(t) {
                return "" + e[t] + t;
            }).join("_");
            return s && (c = (c ? c + "|" : "") + s), "http://p" + [].reduce.call(a, function(t, e) {
                return t + e.charCodeAt(0) | 0;
            }, 0) % 2 + ".meituan.net" + a + (c ? "@" + c : "");
        }
        return t;
    },
    strToArrWithSize: function(t, e) {
        for (var n = [], r = 0; r < t.length / e; r++) n.push(t.slice(r * e, (r + 1) * e));
        return n;
    },
    promisify: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : wx;
        return function() {
            for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
            var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise(function(n, o) {
                var a = Object.assign({}, i, {
                    success: function(t) {
                        i.success && i.success(t), n(t);
                    },
                    fail: function(t) {
                        i.fail && i.fail(t), o(new Error("No data:" + i.url + "++" + JSON.stringify(t)));
                    }
                });
                t.call.apply(t, [ e, a ].concat(r));
            });
        };
    },
    request: c.request,
    getLocation: c.getLocation,
    reportFormId: d,
    isIphoneX: function() {
        try {
            var t = wx.getSystemInfoSync();
            return /iPhone X/i.test(t.model);
        } catch (t) {
            return console.error(t), !1;
        }
    },
    owlErrorReport: function(t) {
        var e = t.key, n = t.tag, r = t.value, o = t.isWatch, i = void 0 === o || o;
        try {
            if (!e) return;
            var a = getApp().owl.newMetric();
            if (a.setTags(n || {}), a.setMetric(e, r || 1), a.report(), i) {
                var c = " " + JSON.stringify(n || {});
                x({
                    content: c,
                    sec_category: e
                });
            }
        } catch (t) {
            return void console.warn(t);
        }
    },
    owlErrorWatch: x
};