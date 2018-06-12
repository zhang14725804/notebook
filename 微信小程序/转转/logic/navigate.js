function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function enterOrderDetail(e, t) {
    console.log("enterOrderDetail", e);
    var o = e.url, i = e.userId, r = e.uid, a = e.jumpType, n = e.orderId, l = Object.assign({}, e);
    if (delete l.uid, delete l.userId, delete l.jumpType, "34857644331526" === (i = i || r)) {
        var u = "https://m.zhuanzhuan.58.com/youpin/website/order/detail.html?oid=" + n;
        o = "/pages/webview/webview?url=" + encodeURIComponent(u);
    } else o = "/pages/orderdetail/orderdetail", o = _util2.default.addQuery(o, l);
    a = a || "navigateTo", _wxPromise.wxPromise[a]({
        url: o,
        complete: function() {
            "function" == typeof t && t(!0);
        }
    });
}

function enterDetail(e, t) {
    var o = e.url, i = e.userId, r = e.uid, a = e.jumpType, n = Object.assign({}, e);
    if (delete n.uid, delete n.userId, delete n.jumpType, "34857644331526" === (i = i || r)) {
        var l = "https://m.zhuanzhuan.com/youpin/website/details.html";
        l = _util2.default.addQuery(l, n), o = "/pages/webview/webview?url=" + encodeURIComponent(l);
    } else if ("31292542536442112" === i || "26467085526790" === i) {
        var u = "https://wx.zhuanzhuan.com/Mzhuanzhuan/ZZBook/?tmp=" + Date.now();
        u = _util2.default.addQuery(u, n), u += "#/Book/Detail", o = "/pages/webview/webview?url=" + encodeURIComponent(u);
    } else o = "/subPages/trade/detail/detail", o = _util2.default.addQuery(o, n);
    a = a || "navigateTo", _wxPromise.wxPromise[a]({
        url: o,
        complete: function() {
            "function" == typeof t && t(!0);
        }
    });
}

function navigateTo(e, t) {
    _wxPromise.wxPromise.navigateTo({
        url: e,
        success: function(e) {
            t && t(e);
        }
    });
}

function redirectTo(e, t) {
    _wxPromise.wxPromise.redirectTo({
        url: e,
        success: function(e) {
            t && t(e);
        }
    });
}

function gotoMine() {
    _wxPromise.wxPromise.navigateTo({
        url: "/pages/mine/mine"
    });
}

function gotoConnect(e, t) {
    navigateTo("/subPages/message/chat/chat?userId=" + e + "&infoId=" + t);
}

function gotoDetail(e) {
    navigateTo("/subPages/trade/detail/detail?infoId=" + e);
}

function gotoDeliverCallList() {
    navigateTo("/subPages/order/deliver/deliverCallList");
}

function gotoDeliverDetail(e, t, o) {
    navigateTo("/subPages/order/deliver/deliverDetail?logisticsCompany=" + e + "&logisticsNum=" + t + "&orderId=" + o);
}

function gotoDeliver(e) {
    navigateTo("/pages/deliver/deliver?orderid=" + e);
}

function gotoPaymenttip() {
    navigateTo("/pages/paymenttip/paymenttip");
}

function gotoRefundtip() {
    navigateTo("/pages/paymenttip/paymentRefund");
}

function gotoUpdatePrice(e, t, o) {
    navigateTo("/pages/updateprice/updateprice?price=" + e + "&freight=" + t + "&orderid=" + o);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.enterOrderDetail = enterOrderDetail, exports.enterDetail = enterDetail, 
exports.gotoMine = gotoMine, exports.gotoConnect = gotoConnect, exports.gotoDetail = gotoDetail, 
exports.gotoDeliverCallList = gotoDeliverCallList, exports.gotoDeliverDetail = gotoDeliverDetail, 
exports.gotoDeliver = gotoDeliver, exports.gotoPaymenttip = gotoPaymenttip, exports.gotoRefundtip = gotoRefundtip, 
exports.gotoUpdatePrice = gotoUpdatePrice;

var _wxPromise = require("./../lib/wxPromise.js"), _util = require("./../lib/util.js"), _util2 = _interopRequireDefault(_util);

exports.default = {
    enterOrderDetail: enterOrderDetail,
    enterDetail: enterDetail
};