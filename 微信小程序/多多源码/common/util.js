function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("./system_info")), t = e(require("./object_util")), n = e(require("../libs/es6-promise.min")), i = (e(require("../libs/co/we-index")), 
{
    bind: function(e, r) {
        var t = Function.prototype.bind;
        if (t) return t.apply(e, [].slice.call(arguments, 1));
        var n = [].slice.call(arguments, 2);
        return function() {
            var t = n.concat([].slice.call(arguments));
            return e.apply(r, t);
        };
    },
    pxToRpx: function(e) {
        var t = r.default.getWindowWidthSync();
        return Math.round(750 / t * e);
    },
    rpxToPx: function(e) {
        var t = r.default.getWindowWidthSync();
        return Math.round(t / 750 * e);
    },
    wrapFunc: function(e, r) {
        return function() {
            try {
                r && r.apply(this, arguments);
            } finally {
                e && e.apply(this, arguments);
            }
        };
    },
    promisifyAPI: function(e) {
        return function(r) {
            return new n.default(function(n, i) {
                e(t.default.assign({}, r, {
                    success: n,
                    fail: i
                }));
            });
        };
    },
    downloadFile: function(e) {
        return new n.default(function(r, t) {
            e && 0 != e.length || t(), wx.downloadFile ? wx.downloadFile({
                url: e,
                success: function(e) {
                    e && e.tempFilePath ? r(e.tempFilePath) : t();
                },
                fail: t
            }) : t();
        });
    },
    checkTel: function(e, r) {
        var t = /^1\d{10}$/, n = /^(([0|4|8]\d{2,3})(-)*)(\d{7,8})((-)*(\d{3,}))?$/;
        return r ? t.test(e) || n.test(e) : t.test(e);
    },
    sleep: function(e) {
        for (var r = Date.now(); Date.now() - r <= e; ) ;
    },
    toWeb: function(e, r) {
        wx.canIUse && wx.canIUse("web-view") ? r.$forward("web", e) : r.$showToast("您的微信版本较低，如有问题请在个人中心联系官方客服", {
            showDuration: 3e3
        });
    },
    isLowercase: function(e) {
        return /^[a-z]+$/.test(e);
    },
    isUppercase: function(e) {
        return /^[A-Z]+$/.test(e);
    },
    isLetter: function(e) {
        return /^[A-Za-z]+$/.test(e);
    },
    isNum: function(e) {
        return /^\d+$/.test(e);
    },
    isChinese: function(e) {
        return new RegExp("[\\u4E00-\\u9FFF]+$", "g").test(e);
    },
    isContainEmojiCharacter: function(e) {
        for (var r = 0; r < e.length; r++) {
            var t = e.charCodeAt(r);
            if (55296 <= t && t <= 56319) {
                if (e.length > 1) {
                    var n = 1024 * (t - 55296) + (e.charCodeAt(r + 1) - 56320) + 65536;
                    if (118784 <= n && n <= 128895) return !0;
                }
            } else if (e.length > 1) {
                if (8419 == e.charCodeAt(r + 1)) return !0;
            } else {
                if (8448 <= t && t <= 10239) return !0;
                if (11013 <= t && t <= 11015) return !0;
                if (10548 <= t && t <= 10549) return !0;
                if (12951 <= t && t <= 12953) return !0;
                if (169 == t || 174 == t || 12349 == t || 12336 == t || 11093 == t || 11036 == t || 11035 == t || 11088 == t) return !0;
            }
        }
    },
    formatNumber: function(e) {
        if (isNaN(e)) throw new TypeError("num is not a number");
        return ("" + e).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
    },
    formatUserName: function(e) {
        var r = "";
        if (e) {
            var t = e.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/gi, "*"), n = parseInt(t.length, 10);
            1 === n ? r = "**" : 2 === n ? r = t.substr(0, 1) + "**" : n >= 3 && (r = t.substr(0, 1) + "**" + t.substr(-1, 1));
        } else r = "**";
        return r;
    },
    sliceSymbols: function(e, r) {
        if (e.length <= r) return e;
        if (r < 1) return "";
        var t = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, n = e.slice(r - 1, r + 1);
        return t.test(n) || (n = n.slice(0, 1)), e.slice(0, r - 1) + n;
    },
    removeItemFromArr: function(e, r) {
        if (!(e instanceof Array)) throw new TypeError("arr is not a array");
        var t = e.indexOf(r);
        t > -1 && e.splice(t, 1);
    }
});

exports.default = i;