Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.authrize = exports.state = exports.config = void 0;

var e = require("./types"), t = exports.config = {
    dirname: "/",
    pageConfig: {
        text: "必须完成微信授权才能继续使用",
        image: {
            src: "https://p0.meituan.net/codeman/1d662d64d96895705a1d0b9433fd0fa8175649.png",
            mode: "aspectFit"
        }
    }
}, a = exports.state = {
    cache: null
};

exports.authrize = function(i, n) {
    return new Promise(function(r, o) {
        e.AUTH_TYPE[i] ? !1 === n.withCredentials && a.cache ? r(a.cache) : (a.resolve = function(e) {
            wx.navigateBack(), setTimeout(function() {
                a.cache = e, r(e);
            }, 200);
        }, a.reject = o, wx.navigateTo({
            url: t.dirname + "/page/index?type=" + i
        })) : o("API " + i + " is not supported");
    });
};