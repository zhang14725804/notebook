function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _createClass = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var o = e[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, a, o) {
        return a && t(e.prototype, a), o && t(e, o), e;
    };
}(), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _adjustPic = require("./../../../lib/adjustPic.js"), _adjustPic2 = _interopRequireDefault(_adjustPic), _routeParams = require("./../../../store/routeParams.js"), _routeParams2 = _interopRequireDefault(_routeParams), _getLocationWithoutDisturb = require("./../../../lib/getLocationWithoutDisturb.js"), _getLocationWithoutDisturb2 = _interopRequireDefault(_getLocationWithoutDisturb), isArray = function(t) {
    return "object" === (void 0 === t ? "undefined" : _typeof(t)) && "[object Array]" === Object.prototype.toString.call(t);
}, _default = function(t) {
    function e() {
        var t, a, o, r;
        _classCallCheck(this, e);
        for (var n = arguments.length, i = Array(n), u = 0; u < n; u++) i[u] = arguments[u];
        return a = o = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(i))), 
        o.props = {
            nearbyData: {
                type: Object
            }
        }, o.data = {
            _nearbyData: {}
        }, o.methods = {
            onClick: function() {
                this.goNearbyList(), this.$log("NEARBYCARDCLK");
            }
        }, o.watch = {
            nearbyData: function(t) {
                this._nearbyData = this.formatNearbyData(t), this.$apply();
            }
        }, o.events = {
            pageShow: function() {
                var t = _routeParams2.default.getBackFromData();
                t.nearbyListLocation ? (this._nearbyData = this.formatNearbyData(t.nearbyListLocation), 
                _routeParams2.default.clearBackFrom(), this.$apply()) : "附近" === this._nearbyData.location && this.initData();
            }
        }, r = a, _possibleConstructorReturn(o, r);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "onLoad",
        value: function() {
            this.initData();
        }
    }, {
        key: "initData",
        value: function() {
            var t = this;
            (0, _getLocationWithoutDisturb2.default)().then(function(e) {
                e && t.getNearbyData(e.longitude + "|" + e.latitude);
            });
        }
    }, {
        key: "goNearbyList",
        value: function() {
            var t = "/subPages/nearbylist/nearbylist";
            this._nearbyData.location && (t += "?address=" + encodeURIComponent(this._nearbyData.location)), 
            this.$wxPromise.navigateTo({
                url: t
            });
        }
    }, {
        key: "getNearbyData",
        value: function(t) {
            var e = this, a = "?position=" + t;
            this.$http({
                url: "https://app.zhuanzhuan.com/zzopen/mainminiapp/weixinIndexNearUserInfo" + a,
                success: function(t) {
                    var a = t.data;
                    if (0 != a.respCode) return void e.$toast({
                        title: a.errMsg || "服务异常，请稍后重试",
                        type: "fail",
                        duration: 2e3
                    });
                    e._nearbyData = e.formatNearbyData(a.respData), e.$apply();
                },
                fail: function(t) {
                    e.$toast({
                        title: "网络异常，请稍后重试",
                        type: "fail",
                        duration: 2e3
                    });
                }
            });
        }
    }, {
        key: "formatNearbyData",
        value: function(t) {
            var e = t.commonPriceShowText.indexOf("$"), a = void 0;
            return a = e > -1 ? [ t.commonPriceShowText.substring(0, e), t.commonPriceShowText.substring(e + 1) ] : [ t.commonPriceShowText ], 
            {
                location: t.pAddess,
                number: t.pSellerNum,
                memberList: isArray(t.pPortraits) ? t.pPortraits.map(function(t) {
                    return _adjustPic2.default.handleSingle(t);
                }) : [],
                desc: a
            };
        }
    } ]), e;
}(_wepy2.default.component);

exports.default = _default;