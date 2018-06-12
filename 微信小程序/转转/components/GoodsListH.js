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

var _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _serviceConfig = require("./../data/serviceConfig.js"), _serviceConfig2 = _interopRequireDefault(_serviceConfig), _webviewCategorys = require("./../data/webviewCategorys.js"), _webviewCategorys2 = _interopRequireDefault(_webviewCategorys), _wxPromise = require("./../lib/wxPromise.js"), GoodsList = function(e) {
    function t() {
        var e, r, o, i;
        _classCallCheck(this, t);
        for (var n = arguments.length, s = Array(n), a = 0; a < n; a++) s[a] = arguments[a];
        return r = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(s))), 
        o.props = [ "goodsList", "clickItemHandler", "redirect", "pageUrl" ], o.data = {
            formId: ""
        }, o.computed = {}, o.methods = {
            sendFromId: function(e) {
                this.formId = e.detail.formId, this.$apply();
                var t = e.currentTarget.dataset.index, r = this.goodsList[t], o = (this.pageUrl ? this.pageUrl : "/subPages/trade/detail/detail") + "?infoId=" + r.strInfoId + "&formId=" + this.formId + "&metric=" + r.metric, i = _webviewCategorys2.default.find(function(e) {
                    return e.cateId.indexOf(r.cateId) > -1 || e.uid.indexOf(r.uid) > -1;
                });
                i && i.target && wx.canIUse("web-view") && (o = i.target.replace("${infoId}", r.strInfoId), 
                o = o.replace("${metric}", r.metric), o = "/pages/webview/webview?url=" + encodeURIComponent(o)), 
                this.redirect ? _wxPromise.wxPromise.redirectTo({
                    url: o
                }) : _wxPromise.wxPromise.navigateTo({
                    url: o
                }), "function" == typeof this.clickItemHandler && this.clickItemHandler.call(this.$root, t);
            },
            clickHandler: function(e) {}
        }, i = r, _possibleConstructorReturn(o, i);
    }
    return _inherits(t, e), t;
}(_wepy2.default.component);

exports.default = GoodsList;