var o = require("../../../config.js"), e = {
    defaults: function(o) {
        wx.redirectTo({
            url: "/mt/pages/poi/poi?id=" + o
        });
    },
    hotel: function(o) {
        wx.redirectTo({
            url: "/hotel/pages/poi/poi?poiId=" + o
        });
    },
    cinema: function(o) {
        wx.redirectTo({
            url: "/movie/pages/cinema/cinema?poiId=" + o
        });
    },
    zhenguo: function(e) {
        try {
            wx.canIUse("navigateToMiniProgram") && wx.navigateToMiniProgram({
                appId: o.ZHENGGUO_APPID,
                path: "/pages/product/product?productId=" + e + "&idPlat=mt",
                extraData: {
                    from: "mt",
                    phx_wake_up_type: "xiaochengxu_channel",
                    phx_wake_up_source: "mtsh"
                },
                success: function(o) {
                    console.log("跳转至榛果小程序poi成功===>", o);
                },
                fail: function(o) {
                    console.log("跳转至榛果小程序poi失败===>", o), wx.navigateTo({
                        url: "/mt/pages/poi/poi?id=" + e
                    });
                }
            });
        } catch (o) {
            wx.showModal({
                title: "提示信息",
                content: "微信版本太低，请下载最新版查看该服务。",
                showCancel: !1
            });
        }
    },
    travel: function(o) {
        wx.navigateTo({
            url: "/ticket/pages/poi/poi?poiid=" + o
        });
    }
}, i = {
    20: e.hotel,
    99: e.cinema,
    20966: e.zhenguo,
    78: e.travel,
    195: e.travel
};

Page({
    onLoad: function(o) {
        o.id ? i[o.cate] ? i[o.cate](o.id) : e.defaults(o.id) : wx.switchTab({
            url: "/index/pages/mt/mt"
        });
    }
});