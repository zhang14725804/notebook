function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function semanticTime(e) {
    for (var n = parseInt(e), r = Date.now() - n, t = [ {
        gap: 36e5,
        func: function() {
            var e = Math.floor(r / 60 / 1e3);
            return e > 0 ? e + "分钟前" : "刚刚";
        }
    }, {
        gap: 864e5,
        func: function() {
            return Math.floor(r / 60 / 60 / 1e3) + "小时前";
        }
    }, {
        gap: 6048e5,
        func: function() {
            return Math.floor(r / 24 / 60 / 60 / 1e3) + "天前";
        }
    }, {
        gap: 1 / 0,
        func: function() {
            var e = new Date(n);
            return e.getFullYear() + "年" + (e.getMonth() + 1) + "月" + e.getDate() + "日";
        }
    } ], o = 0; o < t.length; o++) if (r < t[o].gap) return t[o].func.call();
}

function semanticUserLabels(e) {
    if (e) {
        var n = {
            "788281141730738178": "v",
            "788281283250749442": "star",
            "778899970827747330": "wechat",
            "791269618537725954": "auth"
        }, r = e.map(function(e) {
            return n[e.labelId];
        }), t = {}, o = !0, a = !1, i = void 0;
        try {
            for (var l, u = r[Symbol.iterator](); !(o = (l = u.next()).done); o = !0) {
                t[l.value] = !0;
            }
        } catch (e) {
            a = !0, i = e;
        } finally {
            try {
                !o && u.return && u.return();
            } finally {
                if (a) throw i;
            }
        }
        return t;
    }
}

function fulfillInfoLabels(e) {
    return e.map(function(e) {
        return _infoLabels2.default.find(function(n) {
            return n.labelId == e.labelId && n.showStyle == e.showStyle;
        });
    }).filter(function(e) {
        return !!e;
    });
}

function robustOpen(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
    return n && -1 != n ? void (_wxPromise.wxPromise.navigateToMiniProgram ? _wxPromise.wxPromise.navigateToMiniProgram({
        appId: n,
        path: e
    }) : wx.showModal({
        content: "请将微信升级到最新版本",
        showCancel: !1,
        confirmText: "知道了"
    })) : e ? (e = (0, _operationKit.fulfillURL)(e), void _wxPromise.wxPromise.navigateTo({
        url: e
    })) : void console.warn("[robustOpen] open failed, invalid path:", e, "appId:", n);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.semanticTime = semanticTime, exports.semanticUserLabels = semanticUserLabels, 
exports.fulfillInfoLabels = fulfillInfoLabels, exports.robustOpen = robustOpen;

var _wxPromise = require("./wxPromise.js"), _operationKit = require("./operationKit.js"), _infoLabels = require("./../data/infoLabels.js"), _infoLabels2 = _interopRequireDefault(_infoLabels);