function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../../../libs/lodash.core.min.js"));

var r = e(require("../../../../utils/api.js")), t = e(require("../../../../libs/es6-promise.min")), i = (e(require("../../../../utils/md5.min")), 
getApp()), n = {
    checkUserLogin: function(e) {
        var t = !1;
        i.fetch(r.default.fetchUser, {}, function(r, i, n) {
            try {
                if (null == i.data) {
                    t = !1;
                    var a = "/pages/activity/springfestival/index/index";
                    e.gameId && e.from && ("mycardcollect" == e.from ? a = a + "?from=mycardcollect&gameId=" + e.gameId + "&isUnLogin=true" : "friendcardcollect" == e.from && (a = a + "?from=friendcardcollect&gameId=" + e.gameId + "&isUnLogin=true")), 
                    wx.redirectTo({
                        url: a
                    });
                }
            } catch (e) {}
        });
    },
    getUserInfo: function() {
        wx.getStorageSync("userInfo");
        wx.getUserInfo({
            success: function(e) {
                var r = e.userInfo;
                i.saveCache("userInfo", r);
            },
            fail: function() {
                wx.redirectTo({
                    url: "/pages/index/index"
                });
            }
        });
    },
    getUserProductType: function() {
        return new t.default(function(e, t) {
            try {
                wx.removeStorageSync("mobileInfo");
                var n = wx.getStorageSync("mobileInfo");
                "" == n || void 0 === n.idProduct && void 0 === n.brandId ? wx.getSystemInfo({
                    success: function(n) {
                        if (n.model) {
                            var a = n.model;
                            /^.*<.*iphone.*>/i.test(a) && (a = a.split("<")[1].split(">")[0]), i.fetch(r.default.fetchMobileType, {
                                model: a
                            }, function(n, a, o) {
                                if ("success" === o && a.data) {
                                    var c = {
                                        idBrand: a.data.idBrand,
                                        idProduct: a.data.idProduct,
                                        name: a.data.productName
                                    };
                                    i.fetch(r.default.fetchBrand, {
                                        brandId: a.data.idBrand
                                    }, function(r, n, a) {
                                        if (0 == n.code && "success" == a) {
                                            var o = n.data.imgUrl;
                                            c.imgUrl = o, i.saveCache("mobileInfo", c), e(c);
                                        } else t();
                                    });
                                } else t();
                            });
                        }
                    },
                    fail: function() {
                        t(), wx.redirectTo({
                            url: "/pages/index/index"
                        });
                    }
                }) : e(n);
            } catch (e) {
                t(e);
            }
        });
    }
};

module.exports = n;