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
}), exports.default = void 0;

var _createClass = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var n = t[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _navigate = require("./../logic/navigate.js"), _DialogCommon = require("./DialogCommon.js"), _DialogCommon2 = _interopRequireDefault(_DialogCommon), OrderDetailUserButton = function(e) {
    function t() {
        var e, o, n, r;
        _classCallCheck(this, t);
        for (var i = arguments.length, a = Array(i), s = 0; s < i; s++) a[s] = arguments[s];
        return o = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        _initialiseProps.call(n), r = o, _possibleConstructorReturn(n, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {
            console.log(this.$cookie.get("uid"));
        }
    }, {
        key: "getKuaiDiPhone",
        value: function() {
            (0, _navigate.gotoDeliverCallList)();
        }
    }, {
        key: "tipApp",
        value: function() {
            wx.showModal({
                content: "小程序暂不支持此功能，请登录转转APP操作",
                showCancel: !1,
                confirmText: "知道了"
            });
        }
    }, {
        key: "contactServicer",
        value: function(e) {
            var t = this.args[e.target.dataset.index].uid, o = this.goodInfo.infoId;
            (0, _navigate.gotoConnect)(t, o);
        }
    } ]), t;
}(_wepy2.default.component), _initialiseProps = function() {
    this.props = {
        userId: {
            default: ""
        },
        middleButton: {
            type: Array,
            default: []
        },
        goodInfo: {
            type: Object,
            default: {}
        }
    }, this.components = {
        DialogCommon: _DialogCommon2.default
    }, this.computed = {
        args: function() {
            var e = [];
            return this.middleButton.forEach(function(t, o) {
                e[o] = t.arg;
            }), e;
        }
    }, this.watch = {
        goodInfo: function(e, t) {
            "31292542536442112" !== e.userId && "26467085526790" !== e.userId || (this.show = !1, 
            this.$apply());
        }
    }, this.data = {
        show: !0
    }, this.methods = {
        operate: function(e) {
            switch (e.target.dataset.operationid) {
              case "contactServicer":
                this.contactServicer(e);
                break;

              default:
                this.tipApp();
            }
        }
    };
};

exports.default = OrderDetailUserButton;