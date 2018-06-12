function t(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

var i = function() {
    function t(t, i) {
        for (var e = 0; e < i.length; e++) {
            var r = i[e];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(i, e, r) {
        return e && t(i.prototype, e), r && t(i, r), i;
    };
}(), e = require("./util"), r = function() {
    function r(i, e) {
        if (t(this, r), "string" != typeof i) throw "The path's data type is String.";
        if (this.path = i, {}.toString() !== {}.toString.call(e)) throw "The params's data type is Object.";
        this.params = Object.assign({}, e), this.isop = this.params.isop || "", this.from = this.params.from || "", 
        this.gdt_vid = this.params.gdt_vid || "", this.platform = this.params.platform || "", 
        this.params.utm_source = "jdzt_wxsq_refer_null", this.params.utm_medium = "weixin_shouq", 
        this.params.utm_campaign = 1 == this.platform ? "t_256716187_1" : 2 == this.platform ? "t_1000072653_1" : "", 
        this.params.utm_term = this.gdt_vid, this.turl = this.path.length > 0 ? encodeURI(this.path + "?" + Object.entries(this.params).map(function(t) {
            return t.join("=");
        }).join("&")) : "", this.jda = wx.getStorageSync("__jda"), this.main();
    }
    return i(r, [ {
        key: "main",
        value: function() {
            r.__isAdsURL(this.gdt_vid, this.platform) && this.report();
        }
    }, {
        key: "report",
        value: function() {
            var t = this;
            wx.login({
                success: function(i) {
                    i.code ? e.request({
                        url: getApp().globalRequestUrl + "/kwxitem/report/zhitou.json",
                        data: {
                            code: i.code,
                            wxVersion: wx.getStorageSync(wx.getStorageSync("wxappStorageName")).wxversion,
                            isop: t.isop,
                            from: t.from,
                            turl: t.turl,
                            gdt_vid: t.gdt_vid,
                            platform: t.platform,
                            jda: t.jda
                        }
                    }) : console.log(i.errMsg);
                }
            });
        }
    }, {
        key: "getJDV",
        value: function() {
            var t = wx.getStorageSync("__jdv").split("|"), i = [ void 0, this.params.utm_source, this.params.utm_campaign, this.params.utm_medium, this.params.utm_term, void 0 ];
            if (t.length === i.length) for (var e = 0, r = i.length; e < r; e += 1) i[e] || (t[e] ? i[e] = t[e] : i[e] = "-"); else console.log("jdv异常");
            return i.join("|");
        }
    } ], [ {
        key: "__isAdsURL",
        value: function(t, i) {
            return Boolean(t && i);
        }
    } ]), r;
}();

module.exports = r;