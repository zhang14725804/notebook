function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _wxPromise = require("./../../lib/wxPromise.js"), _util = require("./../../lib/util.js"), _util2 = _interopRequireDefault(_util), _routeParams = require("./../../store/routeParams.js"), _routeParams2 = _interopRequireDefault(_routeParams), _PageFrame = require("./../../components/common/PageFrame.js"), _PageFrame2 = _interopRequireDefault(_PageFrame), pay = function(e) {
    function t() {
        var e, r, o, a;
        _classCallCheck(this, t);
        for (var n = arguments.length, i = Array(n), u = 0; u < n; u++) i[u] = arguments[u];
        return r = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        o.config = {
            navigationBarTitleText: "支付"
        }, o.components = {
            PageFrame: _PageFrame2.default
        }, o.data = {
            urlReg: /^(https?\:\/\/[^?#]+)(\?[^#]*)?(#[^\?&]+)?(.+)?$/
        }, a = r, _possibleConstructorReturn(o, a);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function(e) {
            var t = e;
            new Promise(function(e, r) {
                wx.requestPayment({
                    timeStamp: t.timeStamp,
                    nonceStr: t.nonceStr,
                    package: "prepay_id=" + t.package,
                    signType: t.signType,
                    paySign: t.paySign,
                    complete: function(t) {
                        e(t);
                    }
                });
            }).then(function(e) {
                var r = e.errMsg, o = r.indexOf("ok") > -1 ? 0 : r.indexOf("cancel") > -1 ? -2 : -1, a = decodeURIComponent(t.redirectUrl);
                console.log("redirectUrl解码一次", a), console.log("redirectUrl解码两次", decodeURIComponent(a));
                var n = _util2.default.addQuery(a, {
                    payRespCode: o,
                    payId: t.payId,
                    time: t.time
                });
                console.log("url", n), _util2.default.isWaPage(n) ? _wxPromise.wxPromise.redirectTo({
                    url: n
                }) : (_routeParams2.default.setBackFromData({
                    webviewRedirectUrl: n
                }), _wxPromise.wxPromise.navigateBack());
            });
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(pay, "pages/pay/pay"));