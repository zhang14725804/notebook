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
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _Rule = require("./../operateactivity/Rule.js"), _Rule2 = _interopRequireDefault(_Rule), _default = function(e) {
    function t() {
        var e, o, n, r;
        _classCallCheck(this, t);
        for (var i = arguments.length, l = Array(i), s = 0; s < i; s++) l[s] = arguments[s];
        return o = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(l))), 
        n.props = {
            privileges: {
                type: Array,
                twoWay: !0
            },
            onPrivilegeChange: {
                type: Function
            },
            onClose: {
                type: Function,
                default: null
            }
        }, n.data = {
            showModal: !1
        }, n.computed = {}, n.methods = {
            onRule: function(e) {
                this.privileges[e].expanding = !this.privileges[e].expanding;
            },
            onClose: function() {
                this.close();
            },
            onPrivilege: function(e) {
                this.privileges.forEach(function(e) {
                    return e.selected = !1;
                }), this.privileges[e].selected = !0, this.$apply(), this.onPrivilegeChange && this.onPrivilegeChange(), 
                this.close();
            },
            onModalTouchMove: function(e) {
                return !1;
            },
            onModalTap: function(e) {
                "modalBg" == e.target.dataset.ele && this.close();
            }
        }, n.components = {
            Rule: _Rule2.default
        }, r = o, _possibleConstructorReturn(n, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "open",
        value: function() {
            this.showModal = !0, this.$apply();
        }
    }, {
        key: "close",
        value: function() {
            this.showModal = !1, this.$apply(), this.onClose && this.onClose();
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = _default;