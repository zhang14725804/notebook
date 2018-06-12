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
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _FormId = require("./../common/FormId.js"), _FormId2 = _interopRequireDefault(_FormId), Rule = function(t) {
    function e() {
        var t, n, o, r;
        _classCallCheck(this, e);
        for (var s = arguments.length, i = Array(s), l = 0; l < s; l++) i[l] = arguments[l];
        return n = o = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(i))), 
        o.props = {}, o.data = {
            ruleTitle: "",
            rulelist: [],
            contentExtraStyle: "",
            contentHeight: "",
            type: "",
            showClose: !1,
            show: !1,
            btnTxt: "",
            btnHandler: null
        }, o.components = {
            FormId: _FormId2.default
        }, o.methods = {
            onBtn: function() {
                "function" == typeof this.btnHandler && this.btnHandler(), this.close();
            },
            closeRule: function() {
                this.close();
            },
            moveStop: function() {},
            moveMaskStop: function(t) {
                return !1;
            }
        }, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "open",
        value: function(t) {
            var e = {
                title: "活动规则",
                content: "",
                contentExtraStyle: "",
                contentHeight: "512rpx",
                type: "success",
                showClose: !1,
                buttons: [ {
                    text: "知道了",
                    clickHandler: null
                } ]
            };
            t = Object.assign({}, e, t), this.ruleTitle = t.title, this.rulelist = t.content.split(/\n|\r\n/);
            var n = [ t.buttons[0].text, t.buttons[0].clickHandler ];
            this.btnTxt = n[0], this.btnHandler = n[1], this.showClose = t.showClose, this.contentHeight = t.contentHeight, 
            this.contentExtraStyle = t.contentExtraStyle, this.type = t.type, this.show = !0, 
            this.$apply();
        }
    }, {
        key: "close",
        value: function() {
            this.show = !1, this.$apply();
        }
    } ]), e;
}(_wepy2.default.component);

exports.default = Rule;