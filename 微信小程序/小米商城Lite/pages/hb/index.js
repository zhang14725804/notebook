var i = getApp(), t = require("../../util/util.js");

require("../../util/tracker.js");

Page({
    data: {
        activity_id: 0,
        activity_type: 0,
        coupon_list: [],
        result: !1,
        desc: "",
        award_list: [],
        img: "",
        avatar: "",
        loaded: !1
    },
    id: 0,
    onLoad: function(i) {
        var t = this;
        i.id && (t.setData({
            activity_id: i.id
        }), wx.reportAnalytics("api_enter_page__hb", {
            activity_id: i.id
        }), t.id = i.id, 4 == t.id && wx.setNavigationBarTitle({
            title: "小米MIX 2 新品发布会"
        }));
    },
    onShow: function(t) {
        var a = this;
        a.id && !a.data.loaded && i.doLogin().then(function(i) {
            1 == a.id ? a.inmihome(a.id) : a.getactivity(a.id);
        });
    },
    draw: function(a) {
        var e = this, o = a.currentTarget.dataset.id;
        i.request("wxcoupon/draw", {
            activity_id: e.data.activity_id,
            coupon_id: o
        }, function(i, a) {
            if (a) t.showError("服务异常请稍后再试,或下载小米商城APP"); else {
                var r = i.data || {};
                for (var d in e.data.coupon_list) if (e.data.coupon_list[d].id == o) {
                    var n = e.data.coupon_list[d];
                    n.has_draw = !0, n.result = r.result, n.award = r.award_list[0], e.data.coupon_list[d] = n;
                    break;
                }
            }
        });
    },
    inmihome: function(a) {
        var e = this;
        wx.getLocation({
            type: "gcj02",
            success: function(o) {
                var r = o.latitude, d = o.longitude, n = t.gcjTobd(r, d);
                i.request("mihome/inmihome", {
                    lat: n.lat,
                    lng: n.lng
                }, function(i, o) {
                    o ? t.showError("服务异常请稍后再试,或下载小米商城APP") : (i.data || {}).in_mihome ? e.getactivity(a) : wx.redirectTo({
                        url: "/pages/page/s/index?page=project-hb-no-mihome"
                    });
                });
            },
            fail: function(i) {
                wx.navigateTo({
                    url: "/pages/common/authorize/index"
                });
            }
        });
    },
    getactivity: function(a) {
        var e = this;
        i.request("wxcoupon/getactivity", {
            activity_id: a
        }, function(i, o) {
            if (o) return 10112001 == o.code || 10112002 == o.code ? void t.showTipsSwitchTab("活动未生效", "/pages/index/index") : void wx.redirectTo({
                url: "fail/index?page=project-hb-fail-" + a
            });
            var r = i.data || {}, d = r.activity_type || 0, n = r.coupon_list || [], c = r.result || !1, s = r.desc || "", u = r.award_list || [];
            1 != d || 0 != c ? e.setData({
                activity_name: r.activity_name || "",
                activity_type: d,
                img: r.img || "",
                avatar: r.avatar || "",
                coupon_list: n,
                result: c,
                desc: s,
                award_list: u,
                loaded: !0
            }) : wx.redirectTo({
                url: "fail/index?page=project-hb-fail-" + a
            });
        });
    }
});