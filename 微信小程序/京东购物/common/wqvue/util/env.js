Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.hasProto = "__proto__" in {};

var e = exports.inBrowser = "undefined" != typeof window, s = exports.UA = e && window.navigator.userAgent.toLowerCase(), o = (exports.isIE = s && /msie|trident/.test(s), 
exports.isIE9 = s && s.indexOf("msie 9.0") > 0, exports.isEdge = s && s.indexOf("edge/") > 0), t = (exports.isAndroid = s && s.indexOf("android") > 0, 
exports.isIOS = s && /iphone|ipad|ipod|ios/.test(s), exports.isChrome = s && /chrome\/\d+/.test(s) && !o, 
exports.isXcx = !e), i = exports.isJDApp = s && /jdapp;/.test(s), r = exports.isQQ = s && /qq\/([\d\.]+)*/.test(s), p = exports.isWeixin = s && s.indexOf("micromessenger") > -1;

exports.isMobile = !(t || i || r || p);