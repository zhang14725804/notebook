var a = Object.assign || function(a) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var g in t) Object.prototype.hasOwnProperty.call(t, g) && (a[g] = t[g]);
    }
    return a;
}, e = require("./referrer_wx");

module.exports = {
    _doLog: function(a, t, g, r) {
        var l = this;
        a.scene = this.globalData.scene, a.refAppId = this.globalData.refAppId, setTimeout(function() {
            if (l.getThirdKey()) if (Object.assign(a, {
                thirdKey: l.getThirdKey(),
                area: l.globalData.gpsCityId || "",
                openId: l.globalData.openId || "",
                unionId: l.globalData.unionId || "",
                pagetype: a.pageType,
                page: "",
                qudao: "weixin",
                url: a.url ? encodeURIComponent(a.url) : a.pagePath,
                referrer: a.refPagePath,
                version: "1.4.0"
            }), g) {
                if (0 === r) e.sendTrackLog(l.constData.AppID, l.globalData.openId, JSON.stringify(a)); else if (1 === r) {
                    var o = "tongcheng_" + a.pageType + "_" + a.pageName + "_" + a.clickType + "_" + a.clickName;
                    console.log("clickTag=" + o), e.sendClickLog(l.constData.AppID, l.globalData.openId, JSON.stringify(a), o);
                }
            } else l.request(t || l.pathData.WX_LOGIN, a);
        }, 200);
    },
    doLogTrack: function(e) {
        e = e || {}, this._doLog(a({
            pagePath: this.globalData.currentPageUrl,
            refPagePath: this.globalData.currentPageUrl === this.globalData.prePageUrl ? "" : this.globalData.prePageUrl || "",
            pageParam: "",
            pageType: "",
            pageName: "",
            pageInfo: "",
            loadTime: 0
        }, e), this.pathData.log.track), this._doLog(a({
            pagePath: this.globalData.currentPageUrl,
            refPagePath: this.globalData.currentPageUrl === this.globalData.prePageUrl ? "" : this.globalData.prePageUrl || "",
            pageParam: "",
            pageType: "",
            pageName: "",
            pageInfo: "",
            loadTime: 0
        }, e), "", !0, 0);
    },
    doLogClick: function(e) {
        e = e || {}, this._doLog(a({
            pagePath: this.globalData.currentPageUrl,
            refPagePath: this.globalData.prePageUrl || "",
            pageParam: "",
            pageType: "",
            pageName: "",
            clickType: "",
            clickName: "",
            clickInfo: "",
            cateCode: ""
        }, e), this.pathData.log.click), this._doLog(a({
            pagePath: this.globalData.currentPageUrl,
            refPagePath: this.globalData.currentPageUrl === this.globalData.prePageUrl ? "" : this.globalData.prePageUrl || "",
            pageParam: "",
            pageType: "",
            pageName: "",
            pageInfo: "",
            loadTime: 0
        }, e), "", !0, 1);
    },
    doCommonClickLog: function(t, g) {
        var r = this;
        console.log(g);
        var l = a({
            pagePath: this.globalData.currentPageUrl,
            refPagePath: this.globalData.prePageUrl || "",
            pageParam: "",
            pageType: "",
            pageName: "",
            clickType: "",
            clickName: "",
            clickInfo: "",
            cateCode: ""
        }, t);
        console.log(l.cate), l.scene = this.globalData.scene, setTimeout(function() {
            r.getThirdKey() && (Object.assign(l, {
                thirdKey: r.getThirdKey(),
                area: r.globalData.cityId,
                pagetype: l.pageType,
                page: "",
                qudao: "weixin",
                url: l.pagePath,
                referrer: l.refPagePath
            }), e.sendClickLog(r.constData.AppID, r.globalData.thirdKey, JSON.stringify(l), g));
        }, 200);
    }
};