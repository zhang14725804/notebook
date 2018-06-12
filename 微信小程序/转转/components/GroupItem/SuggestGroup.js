function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _classCallCheck(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, r) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !r || "object" != typeof r && "function" != typeof r ? e : r;
}

function _inherits(e, r) {
    if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function, not " + typeof r);
    e.prototype = Object.create(r && r.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _createClass = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(r, t, o) {
        return t && e(r.prototype, t), o && e(r, o), r;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _handleImg = require("./../../lib/handleImg.js"), _handleImg2 = _interopRequireDefault(_handleImg), _wxPromise = require("./../../lib/wxPromise.js"), SuggestGroup = function(e) {
    function r() {
        var e, t, o, n;
        _classCallCheck(this, r);
        for (var u = arguments.length, a = Array(u), s = 0; s < u; s++) a[s] = arguments[s];
        return t = o = _possibleConstructorReturn(this, (e = r.__proto__ || Object.getPrototypeOf(r)).call.apply(e, [ this ].concat(a))), 
        o.data = {
            suggestGroup: {},
            groups: [],
            header: {}
        }, o.methods = {
            goGroup: function(e) {
                this.$log("GROUP-CLICK");
                var r = e.currentTarget.dataset.id;
                _wxPromise.wxPromise.navigateTo({
                    url: "/subPages/other/group/group?groupId=" + r
                });
            },
            goMoreGroup: function() {
                this.$log("MORE-CLICK"), _wxPromise.wxPromise.navigateTo({
                    url: "/subPages/other/group/grouplist"
                });
            }
        }, n = t, _possibleConstructorReturn(o, n);
    }
    return _inherits(r, e), _createClass(r, [ {
        key: "getSuggestGroup",
        value: function() {
            var e = this;
            this.$httpWithLogin({
                url: "https://app.zhuanzhuan.com/zz/transfer/getinfoindex?indexab=0&params=newgroup",
                type: "GET",
                success: function(r) {
                    var t = r.data;
                    "0" == t.respCode ? (e.suggestGroup = t.respData && t.respData.newgroup, e.header = e.suggestGroup.header, 
                    e.groups = e.formatGroup(e.suggestGroup.groups), e.$apply()) : e.$toast({
                        title: t.errMsg,
                        type: "fail"
                    }), e.$apply();
                }
            });
        }
    }, {
        key: "formatGroup",
        value: function(e) {
            for (var r = [], t = 0, o = e.length; t < o; t++) {
                var n = e[t];
                n.groupBackGround = _handleImg2.default.handleSingle(n.groupBackGround, 320, 320), 
                n.userPics = _handleImg2.default.handleArray(n.userPics, 50, 50), r.push(n);
            }
            return r;
        }
    } ]), r;
}(_wepy2.default.component);

exports.default = SuggestGroup;