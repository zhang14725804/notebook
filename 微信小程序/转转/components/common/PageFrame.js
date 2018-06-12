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

function _applyDecoratedDescriptor(e, t, r, o, a) {
    var n = {};
    return Object.keys(o).forEach(function(e) {
        n[e] = o[e];
    }), n.enumerable = !!n.enumerable, n.configurable = !!n.configurable, ("value" in n || n.initializer) && (n.writable = !0), 
    n = r.slice().reverse().reduce(function(r, o) {
        return o(e, t, r) || r;
    }, n), a && void 0 !== n.initializer && (n.value = n.initializer ? n.initializer.call(a) : void 0, 
    n.initializer = void 0), void 0 === n.initializer && (Object.defineProperty(e, t, n), 
    n = null), n;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

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
}(), _desc, _value, _class, _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _BackHome = require("./pageFrame/BackHome.js"), _BackHome2 = _interopRequireDefault(_BackHome), _ErrorTip = require("./pageFrame/ErrorTip.js"), _ErrorTip2 = _interopRequireDefault(_ErrorTip), _operationKit = require("./../../lib/operationKit.js"), _decorators = require("./../../lib/decorators.js"), _default = (_class = function(e) {
    function t() {
        var e, r, o, a;
        _classCallCheck(this, t);
        for (var n = arguments.length, i = Array(n), u = 0; u < n; u++) i[u] = arguments[u];
        return r = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        o.props = {
            defaultPageBodyReady: {
                type: Boolean,
                default: !0
            }
        }, o.data = {
            navigationBar: {
                show: !1,
                navigationBarBackgroundColor: "",
                navigationBarTextStyle: "",
                navigationBarTitleText: ""
            },
            backHome: {
                show: !1,
                icon: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/common/backHome.png",
                extraStyle: ""
            },
            pageBodyReady: !1
        }, o.computed = {
            _pageBodyReady: function() {
                return this.defaultPageBodyReady || this.pageBodyReady;
            }
        }, o.methods = {}, o.$repeat = {}, o.$props = {
            BackHome: {
                "xmlns:v-bind": "",
                "v-bind:backHome.sync": "backHome",
                "v-bind:pageBodyReady.sync": "_pageBodyReady"
            },
            ErrorTip: {
                class: ""
            }
        }, o.$events = {}, o.components = {
            BackHome: _BackHome2.default,
            ErrorTip: _ErrorTip2.default
        }, a = r, _possibleConstructorReturn(o, a);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "_updateConfig",
        value: function(e) {
            (0, _operationKit.deepAssign)(this, e), this.$apply();
        }
    }, {
        key: "updateConfig",
        value: function(e) {
            this._updateConfig(e);
        }
    }, {
        key: "getCurLayout",
        value: function() {
            return {
                navigationBar: this.navigationBar.show,
                backHome: this.backHome.show
            };
        }
    }, {
        key: "onLoad",
        value: function() {
            this._updateConfig({
                backHome: {
                    show: this.defaultBackHomeStrategy()
                }
            });
        }
    }, {
        key: "defaultBackHomeStrategy",
        value: function() {
            var e = [ "pages/index/index" ], t = getCurrentPages(), r = t[t.length - 1].route || "";
            return !e.includes(r.split("?")[0]) && 1 == t.length;
        }
    } ]), t;
}(_wepy2.default.component), _applyDecoratedDescriptor(_class.prototype, "defaultBackHomeStrategy", [ _decorators.errSafe ], Object.getOwnPropertyDescriptor(_class.prototype, "defaultBackHomeStrategy"), _class.prototype), 
_class);

exports.default = _default;