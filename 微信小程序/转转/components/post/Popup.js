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
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), Popup = function(t) {
    function e() {
        var t, n, i, o;
        _classCallCheck(this, e);
        for (var s = arguments.length, a = Array(s), r = 0; r < s; r++) a[r] = arguments[r];
        return n = i = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(a))), 
        i.props = {
            tipConfig: {
                type: Object,
                default: {
                    text: "这里是提示文案这里是提示文案这里是提示文案这里是提示文案这里是提示文案这里是提示文案",
                    duration: 1e3
                }
            },
            position: {
                type: String,
                default: "bottom"
            },
            animation: {
                type: String,
                default: "0.2s ease-out"
            },
            hasMask: {
                type: Boolean,
                default: !0
            },
            groupid: {
                type: String,
                default: []
            },
            groupsectionid: {
                type: String,
                default: ""
            },
            onConfirm: {
                type: Function,
                default: function() {}
            },
            onClose: {
                type: Function,
                default: function() {}
            }
        }, i.data = {
            isHidden: !0,
            hasAnimation: !1,
            sectionList: [],
            pubSelectTips: ""
        }, i.methods = {
            onHide: function() {
                this.isHidden = !0, this.onClose();
            },
            onclick: function(t) {
                this.groupsectionid = t.currentTarget.dataset.id;
                var e = {
                    groupsectionid: this.groupsectionid,
                    value: t.currentTarget.dataset.name
                };
                this.hide(), this.onConfirm(e);
            }
        }, i.watch = {
            groupid: function(t, e) {
                this.ajaxData(t);
            }
        }, i.computed = {
            animationStyle: function(t) {
                if (this.isHidden) {
                    if ("top" === this.position) return (this.hasAnimation ? "transition: transform " + this.animation + ";" : "") + "transform: translateY(-100%);";
                    if ("bottom" === this.position) return (this.hasAnimation ? "transition: transform " + this.animation + ";" : "") + "transform: translateY(100%);";
                    this.$apply();
                } else if (!this.isHidden) return (this.hasAnimation ? "transition: transform " + this.animation + ";" : "") + "transform: translateY(0);";
            }
        }, i.events = {
            popupshow: function(t) {
                this.$apply(), this.show();
            },
            popuphide: function() {
                this.$apply(), this.hide(), this.onClose();
            }
        }, o = n, _possibleConstructorReturn(i, o);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "show",
        value: function() {
            this.hasAnimation = !0, this.isHidden = !1;
        }
    }, {
        key: "hide",
        value: function() {
            this.isHidden = !0, this.onClose();
        }
    }, {
        key: "addname",
        value: function(t, e) {
            for (var n = 0, i = t.length; n < i; n++) if (t[n].sectionId == e) {
                var o = {
                    value: t[n].sectionName
                };
                this.onConfirm(o);
            }
        }
    }, {
        key: "ajaxData",
        value: function(t) {
            var e = this;
            this.$http({
                url: "https://app.zhuanzhuan.com/zz/transfer/getgroupsectionlist",
                data: {
                    groupid: t,
                    from: "2"
                },
                method: "get",
                success: function(t) {
                    0 == t.data.respCode && (e.pubSelectTips = t.data.respData.pubSelectTips, e.sectionList = t.data.respData.sectionModule.priceModule.sectionList, 
                    e.groupsectionid && e.addname(e.sectionList, e.groupsectionid));
                }
            });
        }
    } ]), e;
}(_wepy2.default.component);

exports.default = Popup;