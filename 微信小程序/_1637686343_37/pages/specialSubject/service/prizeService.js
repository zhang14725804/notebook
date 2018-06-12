function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.productApi = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = {
        vertical_code: o.default.verticalCcode,
        platform: "2_20_201"
    };
    return new t.default(function(t, o) {
        wx.request({
            url: n + "/v1/product/list.json",
            data: Object.assign({}, i, e),
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var n = e.data;
                n && "A00000" == n.code ? t(n) : o(n);
            },
            fail: function(e) {
                o(e);
            }
        });
    });
}, exports.productInfoApi = function(e) {
    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return new t.default(function(t, n) {
        wx.request({
            url: "" + i + e,
            data: o,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var o = e.data;
                o && "A00000" == o.code ? t(o) : n(o);
            },
            fail: function(e) {
                n(e);
            }
        });
    });
};

var t = e(require("../../../common/polyfill/promise")), o = e(require("../../../common/login/constant")), n = (e(require("../../../common/utils/util")), 
"https://api-vienx.iqiyi.com"), i = "https://buy-vienx.iqiyi.com";