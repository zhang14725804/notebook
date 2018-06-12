var e = require("../../bases/page.js"), t = require("../../common/h5jump.js"), i = getApp();

new e({
    data: {
        url: "",
        pageTitle: "",
        shareTitle: "",
        shareSetting: {
            isset: !1,
            url: "",
            rurl: "",
            title: "",
            imgurl: ""
        },
        showErrorTips: !1
    },
    onLoad: function(e) {
        console.log("webview, option: ", e, "url: ", e.url);
        var t = e.url;
        t && (i.systemInfo && i.systemInfo.SDKVersion && (t = this.addUrlParam(t, {
            wxappver: i.systemInfo.SDKVersion
        })), this.setData({
            url: t,
            shareTitle: this.helper.decode(e.shareTitle || "")
        }), e.pageTitle && wx.setNavigationBarTitle({
            title: this.helper.decode(e.pageTitle)
        }), console.log("webview url: " + this.data.url));
    },
    onShow: function() {
        this.data.url || this.setData({
            showErrorTips: !0
        });
    },
    onMessage: function(e) {
        for (var i = e.detail.data || [], a = null, s = i.length; s >= 0; s--) if (i[s] && i[s].snsset) {
            a = i[s];
            break;
        }
        a && (this.data.shareSetting.isset = !0, this.data.shareSetting.url = a.url || "", 
        this.data.shareSetting.title = a.title || "", this.data.shareSetting.imgurl = a.imgurl || "", 
        this.data.shareSetting.rurl = a.rurl || "");
        var r = {}, n = void 0;
        i.forEach(function(e) {
            for (var t in e) "cookie" == t && (Object.assign(r, e[t]), n = !0);
        }), n && t.updateCookie({
            cookie: r
        }, {
            dataType: "json"
        });
    },
    onShareAppMessage: function(e) {
        var t = this.judgeUrlIsRight(e.webViewUrl);
        if (this.data.shareSetting.isset && t) {
            var i = this, a = this.data.shareSetting.rurl, s = {
                title: this.data.shareSetting.title || this.data.shareTitle || "京东购物·多快好省",
                path: "/pages/h5/index?encode_url=" + encodeURIComponent(this.data.shareSetting.url || e.webViewUrl),
                success: function(e) {
                    a ? i.$goto("/pages/h5/index", {
                        encode_url: encodeURIComponent(a)
                    }, "redirectTo") : wx.showToast({
                        title: "转发成功",
                        icon: "success"
                    });
                },
                fail: function() {}
            };
            return this.data.shareSetting.imgurl && (s.imageUrl = this.data.shareSetting.imgurl), 
            s;
        }
        return {
            title: this.data.shareTitle || "京东购物·多快好省",
            path: "/pages/h5/index?encode_url=" + encodeURIComponent(e.webViewUrl),
            success: function(e) {
                wx.showToast({
                    title: "转发成功",
                    icon: "success"
                });
            },
            fail: function() {}
        };
    },
    addUrlParam: function(e, t) {
        var i = e.split("#"), a = i[1];
        e = i[0];
        for (var s in t) {
            var r = new RegExp("([?&])" + s + "=[^&]*(&|$)", "i");
            r.test(e) ? e = e.replace(r, "$1" + s + "=" + t[s] + "$2") : e += (e.indexOf("?") > -1 ? "&" : "?") + s + "=" + t[s];
        }
        return a && (e = e + "#" + a), e;
    },
    judgeUrlIsRight: function(e) {
        var t = this.data.shareSetting.url;
        return !!e && (!!t && (e.indexOf("?") > -1 && (e = e.split("?")[0]), e.indexOf("#") > -1 && (e = e.split("#")[0]), 
        t.indexOf("?") > -1 && (t = t.split("?")[0]), t.indexOf("#") > -1 && (t = t.split("#")[0]), 
        e === t));
    },
    goBack: function() {
        wx.navigateBack();
    }
});