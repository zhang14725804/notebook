function setShareInfo(e, t) {
    var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "ZZWechatAPP", s = "";
    if (t) s = t; else {
        var r = [], a = Object.assign(this.$wxpage.options, {
            zzfrom: o,
            zzpage: o
        });
        for (var i in a) r.push(i + "=" + encodeURIComponent(a[i]));
        s = r.join("&");
    }
    this.$root.shareTitle = e, this.$root.sharePath = s;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = setShareInfo;