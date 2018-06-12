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
        for (var i = 0; i < t.length; i++) {
            var s = t[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, i, s) {
        return i && e(t.prototype, i), s && e(t, s), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _Toast = require("./Toast.js"), _Toast2 = _interopRequireDefault(_Toast), BaseBoard = function(e) {
    function t() {
        var e, i, s, n;
        _classCallCheck(this, t);
        for (var r = arguments.length, o = Array(r), h = 0; h < r; h++) o[h] = arguments[h];
        return i = s = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(o))), 
        s.props = {
            show: {
                type: Boolean,
                default: !0,
                twoWay: !0
            },
            wishTitle: {
                type: String,
                default: "想卖多少钱?"
            },
            zIndex: {
                type: Number,
                default: 1e3
            },
            wishPrice: {
                type: String,
                default: ""
            },
            originTitle: {
                type: String,
                default: "原价"
            },
            originPrice: {
                type: String,
                default: ""
            },
            freightPrice: {
                type: String,
                default: ""
            },
            keysHoverClass: {
                type: String,
                default: "btn-hover"
            },
            confirmText: {
                type: String,
                default: "下一项"
            },
            maskColor: {
                type: String,
                default: "#333"
            },
            maskOpacity: {
                type: Number,
                default: .8
            },
            onHide: {
                type: Function,
                default: function() {}
            },
            onType: {
                type: Function,
                default: function() {}
            },
            onBack: {
                type: Function,
                default: function() {}
            },
            onConfirm: {
                type: Function,
                default: function() {}
            },
            onHint: {
                type: Function,
                default: function() {}
            },
            onFree: {
                type: Function,
                default: function() {}
            },
            onClose: {
                type: Function,
                default: function() {}
            }
        }, s.data = {
            isFree: !1,
            wishPrice: "",
            originPrice: "",
            freightPrice: "",
            selectText: "wish"
        }, s.events = {}, s.components = {
            toast: _Toast2.default
        }, s.methods = {
            hideTap: function() {
                this.show = !1, this.onClose(), this.onHide && this.onHide(this.getValues());
            },
            hideTap1: function() {
                this.show = !1, this.onClose(), this.onConfirm(this.getValues());
            },
            typeTap: function(e) {
                var t = e.target.dataset.index, i = "", s = "", n = "";
                switch (this.selectText) {
                  case "wish":
                    i = this.wishPrice || 0 !== parseInt(t) ? this.wishPrice + t : "", i.length > 6 && this.$invoke("toast", "show", {
                        title: "价格不能超过999999哦",
                        duration: 1e3
                    }), i = i.length > 6 ? i.slice(0, 6) : i, this.wishPrice = i;
                    break;

                  case "origin":
                    s = this.originPrice || 0 !== parseInt(t) ? this.originPrice + t : "", s.length > 6 && this.$invoke("toast", "show", {
                        title: "价格不能超过999999哦",
                        duration: 1e3
                    }), s = s.length > 6 ? s.slice(0, 6) : s, this.originPrice = s;
                    break;

                  case "freight":
                    this.freightPrice || (this.freightPrice = ""), n = this.freightPrice || 0 !== parseInt(t) ? this.freightPrice + t : "", 
                    n.length > 3 && this.$invoke("toast", "show", {
                        title: "运费不能超过999哦",
                        duration: 1e3
                    }), n = n.length > 3 ? n.slice(0, 3) : n, this.freightPrice = n;
                }
                this.onType && this.onType(this.getValues());
            },
            backTap: function() {
                switch (this.selectText) {
                  case "wish":
                    this.wishPrice = this.wishPrice.substring(0, this.wishPrice.length - 1);
                    break;

                  case "origin":
                    this.originPrice = this.originPrice.substring(0, this.originPrice.length - 1);
                    break;

                  case "freight":
                    this.freightPrice = this.freightPrice.substring(0, this.freightPrice.length - 1);
                }
                this.onBack && this.onBack(this.getValues());
            },
            confirmTap: function() {
                if ("wish" == this.selectText) return this.confirmText = "下一项", this.selectText = "origin", 
                void (this.isFree && (this.confirmText = "完成"));
                if ("origin" == this.selectText) {
                    if (!this.isFree) return this.confirmText = "完成", void (this.selectText = "freight");
                    this.confirmText = "完成", this.onConfirm && this.onConfirm(this.getValues());
                } else this.onConfirm && (this.onConfirm(this.getValues()), this.confirmText = "下一项");
                this.selectText = "wish", this.show = !1, this.onClose(), this.confirmText = "下一项";
            },
            hintTap: function() {
                this.onHint && this.onHint(this.getValues());
            },
            freeHandle: function() {
                this.isFree = !this.isFree, this.freightPrice = "", this.onFree && this.onFree(this.getValues());
            },
            textHandle: function(e) {
                this.selectText = e.target.dataset.key, "freight" == this.selectText && (this.confirmText = "完成"), 
                "origin" == this.selectText && this.isFree && (this.confirmText = "完成"), console.log(this.selectText);
            }
        }, n = i, _possibleConstructorReturn(s, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "getValues",
        value: function() {
            return {
                wish: this.wishPrice || "",
                origin: this.originPrice || "",
                freight: this.freightPrice || "",
                isFree: this.isFree
            };
        }
    }, {
        key: "resetValues",
        value: function(e) {
            for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = BaseBoard;