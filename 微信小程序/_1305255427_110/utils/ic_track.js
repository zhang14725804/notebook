function r(r) {
    for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) n[a - 1] = arguments[a];
    return function() {
        for (var t = this, a = arguments.length, u = Array(a), e = 0; e < a; e++) u[e] = arguments[e];
        r.call.apply(r, [ this ].concat(u)), n.forEach(function(r) {
            return r.call.apply(r, [ t ].concat(u));
        });
    };
}

function t(t, n) {
    for (var a = arguments.length, u = Array(a > 2 ? a - 2 : 0), e = 2; e < a; e++) u[e - 2] = arguments[e];
    t[n] = r.apply(void 0, [ t[n] ].concat(u));
}

function n() {
    wx.request({
        url: a + "mp_pv"
    });
    var r = this.__route__;
    "pages/detail/detail" === r && wx.request({
        url: a + "mp_inquiry_start"
    }), "pages/inquiry/inquiry" === r && wx.request({
        url: a + "mp_inquiry_end"
    }), "pages/order/order" === r && wx.request({
        url: a + "mp_checkout"
    });
}

var a = "https://xin.aihuishou.com/status/";

!function() {
    var r = Page;
    Page = function(a) {
        t(a, "onShow", n), r(a);
    };
}();