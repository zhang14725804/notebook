var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = require("../../module/page"), o = require("../../module/login"), n = require("../../module/request/request"), a = require("../../module/es6-promise"), i = require("../../module/globalData"), u = function t(o) {
    var n = [];
    for (var a in o) "object" == e(o[a]) ? n = n.concat(t(o[a])) : "function" != typeof o[a] && n.push({
        name: a,
        value: o[a]
    });
    return n;
}, r = [ {
    key: "useDanmuBeta",
    type: "boolean",
    text: "弹幕（实验性功能）",
    defaults: !1
} ];

t("egg", {
    data: {
        openid: "",
        uin: "",
        info: [],
        isTest: !1
    },
    onLoad: function() {
        var e = this;
        this.setData({
            isTest: getApp().global.env_type
        });
        var t = r;
        t.forEach(function(e) {
            switch (e.type) {
              case "boolean":
                e.value = !!i.get(e.key);
            }
        }), this.setData({
            configs: t
        }), a.all([ new a(function(e, t) {
            o.getUserInfo(function(t, o) {
                e(t ? t : o);
            });
        }), new a(function(e, t) {
            wx.getUserInfo({
                complete: function(t) {
                    e(t);
                }
            });
        }) ]).then(function(t) {
            var o = t[0], n = t[1], a = u(o);
            a = a.concat(u(n).concat(u(o.qquser || {})));
            var i = "", r = "";
            console.log(o), o.wxuser && (i = o.wxuser.wxOpenId), o.qquser && (r = o.qquser.qqUin), 
            e.setData({
                openid: i,
                uin: r,
                info: a
            });
        });
    },
    switchChange: function(e) {
        var t = n.switchHost(e.detail.value ? "dev" : "product");
        o.clearCache(), "dev" == t ? i.set("env_type", "dev") : i.set("env_type", ""), wx.showToast({
            title: "dev" == t ? "已切到测试环境" : "已切到正式环境"
        });
    },
    switchBooleanConfig: function(e) {
        var t = e.currentTarget.dataset.key, o = null;
        this.data.configs.forEach(function(e) {
            e.key == t && (e.value = !e.value, o = e.value);
        }), null !== o && (this.setData({
            configs: this.data.configs
        }), i.set(t, o));
    },
    golive: function(e) {
        var t = e.detail.value;
        this.$route("live?pid=" + t);
    }
});