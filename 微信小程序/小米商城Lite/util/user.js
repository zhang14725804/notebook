var e = null, o = require("./tracker.js"), a = {
    getCoordinateFromWXMap: function() {
        return new Promise(function(e, o) {
            wx.chooseLocation({
                success: function(o) {
                    console.log(o.address), console.log(o.latitude + "," + o.longitude), e({
                        latitude: o.latitude - 0,
                        longitude: o.longitude - 0,
                        detail: o.address.replace(/[^区]*区/, "")
                    });
                },
                cancel: function() {
                    o({
                        isCanceledByUser: !0
                    });
                },
                fail: function(e) {
                    if (e) {
                        if ("chooseLocation:fail cancel" === e.errMsg) return void o({
                            isCanceledByUser: !0
                        });
                        if ("chooseLocation:fail auth deny" === e.errMsg || "chooseAddress:fail:auth denied" === e.errMsg) return void wx.navigateTo({
                            url: "/pages/common/authorize/index"
                        });
                    }
                    o();
                }
            });
        });
    },
    convertCoordinateForAMAP: function(e) {
        return new Promise(function(a, t) {
            wx.request({
                url: "https://restapi.amap.com/v3/assistant/coordinate/convert",
                data: {
                    locations: e.longitude + "," + e.latitude,
                    key: "442c9a5e35fc0a0fa7f405a62b3b0057"
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(s) {
                    if ("1" !== s.data.status) return o.push({
                        logCode: "wx#bid=3039099.3&page=address",
                        clue: "assistant_coordinate_convert|status:" + s.data.status,
                        analyse: "tap"
                    }), void t();
                    var d = s.data.infocode, n = s.data.locations.split(",");
                    a({
                        adcode: d,
                        latitude: n[1],
                        longitude: n[0],
                        detail: e.detail
                    });
                },
                fail: function(a) {
                    o.push({
                        logCode: "wx#bid=3039099.3&page=address",
                        clue: "assistant_coordinate_convert|err:" + JSON.stringify(a) + ",coordinate:" + e.longitude + "," + e.latitude,
                        analyse: "tap"
                    }), t();
                }
            });
        });
    },
    getFourLevelsOfAddresses: function(a) {
        return console.log(a.latitude + "," + a.longitude), new Promise(function(t, s) {
            e.request("address/areasearch", {
                adcode: a.adcode,
                latitude: a.latitude,
                longitude: a.longitude
            }, function(e, d) {
                d && (o.push({
                    logCode: "wx#bid=3039099.4&page=address",
                    clue: "address_areasearch|err:" + JSON.stringify(d) + ",coordinate:" + a.longitude + "," + a.latitude,
                    analyse: "tap"
                }), s(d)), e.data.detail = a.detail, console.log(JSON.stringify(e.data)), t(e.data);
            }, !1, !0);
        });
    },
    getCoordinateByAddressFromAMAP: function(e) {
        return new Promise(function(a, t) {
            wx.request({
                url: "https://restapi.amap.com/v3/geocode/geo",
                data: {
                    address: e,
                    key: "442c9a5e35fc0a0fa7f405a62b3b0057"
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(e) {
                    if ("1" !== e.data.status) return o.push({
                        logCode: "wx#bid=3039099.5&page=address",
                        clue: "geocode_geo|status:" + e.data.status,
                        analyse: "tap"
                    }), void t();
                    var s = "", d = e.data.geocodes, n = [];
                    if (!d || !d.length) return o.push({
                        logCode: "wx#bid=3039099.5&page=address",
                        clue: "geocode_geo|geocodes:none",
                        analyse: "tap"
                    }), void t();
                    n = d[0].location.split(","), s = d[0].adcode, a({
                        adcode: s,
                        latitude: n[1],
                        longitude: n[0]
                    });
                },
                fail: function(a) {
                    o.push({
                        logCode: "wx#bid=3039099.5&page=address",
                        clue: "geocode_geo|err:" + JSON.stringify(a) + ",address:" + e,
                        analyse: "tap"
                    }), t();
                }
            });
        });
    },
    getInfoFormWXAddressBook: function() {
        return new Promise(function(e, o) {
            wx.chooseAddress ? wx.chooseAddress({
                success: function(o) {
                    e(o);
                },
                fail: function(e) {
                    if (e) {
                        if ("chooseAddress:cancel" === e.errMsg) return void o({
                            isCanceledByUser: !0
                        });
                        if ("chooseAddress:fail auth deny" === e.errMsg || "chooseAddress:fail:auth denied" === e.errMsg) return void wx.navigateTo({
                            url: "/pages/common/authorize/index"
                        });
                    }
                    o();
                }
            }) : o();
        });
    }
};

module.exports = function(o) {
    return e = o, a;
};