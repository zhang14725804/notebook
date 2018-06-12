function calcuPrefix(t) {
    for (var e = "https://picx.58cdn.com.cn/zhuanzh/", n = t.length, i = 0, r = void 0, c = 0; c < n; c++) i += t.charCodeAt(c);
    return r = i % 8 + 1, e.replace("x", r);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _operationKit = require("./operationKit.js"), wxReg = /^https?\:\/\/wx.qlogo.cn/, imgReg = /^https?\:\/\/img\.58cdn\.com.\.cn/, prefixReg = /^https?:\/\/pic[1-8]\.58cdn\.com\.cn\/zhuanzh\//, prefixPic = /^https?:\/\/pic\.58\.com\//, ypfixPic = /^https?:\/\/pic\d.58cdn.com.cn\//, suffix = /(\.(png|jpg|gif))/, hasPrefix = /^https?\:\/\//;

exports.default = {
    handleSingle: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 200, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 200, i = "";
        if (/^\/\//.test(t) && (t = "https:" + t), t && "" !== t) if (wxReg.test(t)) {
            var r = t.lastIndexOf("/");
            t = t.substr(0, r), i = t + "/96";
        } else i = imgReg.test(t) ? t : prefixPic.test(t) || ypfixPic.test(t) || prefixReg.test(t) ? (0, 
        _operationKit.appendUrlParam)(t, {
            w: e,
            h: n
        }) : hasPrefix.test(t) ? t : (0, _operationKit.appendUrlParam)(calcuPrefix(t) + t, {
            w: e,
            h: n
        }); else i = "";
        return i = i.replace("http://", "https://"), i = i.replace(/^(https:\/\/zzpic[1-6]\.58cdn\.com\.cn)(.+)/, "https://zzpic3.58cdn.com.cn$2");
    },
    handleBundle: function(t) {
        var e = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 200, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 200, r = t ? t.split("|") : [];
        if (!r.length) return [];
        var c = [];
        return r.map(function(t) {
            c.push(e.handleSingle(t, n, i));
        }), c;
    },
    handleArray: function(t) {
        var e = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 200, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 200;
        return t instanceof Array ? t.map(function(t) {
            return e.handleSingle(t, n, i);
        }) : [];
    }
};