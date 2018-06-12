function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = e(require("../constants/image")), o = e(require("../storage/webp_test_storage")), n = e(require("../configs/app_config")), t = {
    getCDNImgURL: function(e, i) {
        var o = "http://pinduoduoimg.yangkeduo.com/" + e;
        return (i = i || {}).doCompress && (o = this.cdnCompress(o, i.watermark, i.type, i.webpEnable)), 
        o;
    },
    cdnCompress: function(e, n, t, r) {
        var a = o.default.isWebpEnable();
        if ((e = e || "").indexOf("!") >= 0 || e.indexOf("@") >= 0) return e;
        if (e.indexOf("upaiyun.com") > 0) t = t || "750", e.indexOf("weishoptest") > 0 ? e += "!640" : e += "!" + t; else if (e.indexOf("img-cn-shanghai.aliyuncs.com") > 0 || e.indexOf("omsproductionimg.yangkeduo.com") >= 0 || e.indexOf("pinduoduoimg.yangkeduo.com") >= 0) t = t || i.default.CompressPipe.Default, 
        e += "@" + (t += r || a ? ".webp" : ".src"); else if (e.match("t[0-9]*img.yangkeduo.com") && e.indexOf("watermark") < 0) {
            n ? e = e + "?" + n + "|imageMogr2/q/50/2/w/750" : e += "?imageView2/q/50/2/w/750", 
            (r || a) && (e += "/format/webp");
        }
        return e;
    },
    getAvatarURL: function(e, i) {
        return i = i || 100, null == e || "" == e ? n.default.logo : e.indexOf("avatar.yangkeduo.com") >= 0 ? [ e.split("?")[0], "x-oss-process=image/resize,w_" + i ].join("?") : "/0" == e.substr(-2) ? e.slice(0, -1) + "132" : e;
    }
};

exports.default = t;