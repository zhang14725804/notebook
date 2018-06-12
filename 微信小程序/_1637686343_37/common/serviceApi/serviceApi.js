function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.commonGetRequest = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return new t.default(function(t, a) {
        var r = e.reqParams, d = Object.keys(r).map(function(e) {
            return e + "=" + encodeURIComponent(r[e]);
        }).join("&");
        wx.request({
            url: e.url + "?" + d,
            method: "GET",
            success: function(e) {
                200 == e.statusCode ? o.default.isObject(e.data) ? "A00000" == e.data.code ? t(e.data.data) : a(e.data) : a({
                    code: "FEC002",
                    msg: "data eror",
                    data: e.data
                }) : a({
                    code: "FEC001",
                    msg: "server eror",
                    data: e.statusCode
                });
            },
            fail: function(e) {
                a({
                    code: "FEC000",
                    msg: "network eror"
                });
            }
        });
    });
}, exports.commonPostRequest = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "form";
    return new t.default(function(t, r) {
        wx.request({
            url: "" + e.url,
            method: "POST",
            data: "form" == a ? e.reqParams : JSON.stringify(e.reqParams),
            header: {
                "content-type": "form" == a ? "application/x-www-form-urlencoded" : "application/json"
            },
            success: function(e) {
                200 == e.statusCode ? o.default.isObject(e.data) ? "A00000" == e.data.code ? (e.data.miniCookie = e.header["Set-Cookie"] ? e.header["Set-Cookie"] : "", 
                t(e.data.data)) : r(e.data) : r({
                    code: "FEC002",
                    msg: "data eror",
                    data: e.data
                }) : r({
                    code: "FEC001",
                    msg: "server eror",
                    data: e.statusCode
                });
            },
            fail: function(e) {
                r({
                    code: "FEC000",
                    msg: "network eror"
                });
            }
        });
    });
};

var t = e(require("../../common/polyfill/promise")), o = e(require("../../common/utils/util"));