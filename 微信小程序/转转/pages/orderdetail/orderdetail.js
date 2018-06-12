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
}(), _get = function e(t, r, o) {
    null === t && (t = Function.prototype);
    var n = Object.getOwnPropertyDescriptor(t, r);
    if (void 0 === n) {
        var a = Object.getPrototypeOf(t);
        return null === a ? void 0 : e(a, r, o);
    }
    if ("value" in n) return n.value;
    var i = n.get;
    if (void 0 !== i) return i.call(o);
}, _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _OrderDetail = require("./../../components/OrderDetail.js"), _OrderDetail2 = _interopRequireDefault(_OrderDetail), _PageFrame = require("./../../components/common/PageFrame.js"), _PageFrame2 = _interopRequireDefault(_PageFrame), OrderDetail = function(e) {
    function t() {
        var e, r, o, n;
        _classCallCheck(this, t);
        for (var a = arguments.length, i = Array(a), u = 0; u < a; u++) i[u] = arguments[u];
        return r = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        o.config = {
            navigationBarTitleText: "订单详情",
            backgroundColor: "#f3f5f9"
        }, o.computed = {}, o.components = {
            PageFrame: _PageFrame2.default,
            orderDetail: _OrderDetail2.default
        }, o.data = {}, o.events = {
            updata: function() {
                this.$invoke("orderDetail", "getOrderDetailData");
            }
        }, n = r, _possibleConstructorReturn(o, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function(e) {
            this.$broadcast("pageLoad", e);
        }
    }, {
        key: "onShow",
        value: function() {
            var e = [ "updatePriceSuccess", "deliverGoodsSuccess", "paySuccess" ];
            e.some(function(e) {
                return 0 === wx.getStorageSync(e);
            }) && (this.$invoke("orderDetail", "getOrderDetailData"), e.forEach(function(e) {
                wx.removeStorage({
                    key: e
                });
            }));
        }
    }, {
        key: "onUnload",
        value: function() {
            this.$invoke("orderDetail", "resetData"), _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "onUnload", this) && _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "onUnload", this).call(this);
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(OrderDetail, "pages/orderdetail/orderdetail"));