function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var r = 0, t = Array(e.length); r < e.length; r++) t[r] = e[r];
        return t;
    }
    return Array.from(e);
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
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _serviceConfig = require("./../data/serviceConfig.js"), _serviceConfig2 = _interopRequireDefault(_serviceConfig), _webviewCategorys = require("./../data/webviewCategorys.js"), _webviewCategorys2 = _interopRequireDefault(_webviewCategorys), _wxPromise = require("./../lib/wxPromise.js"), GoodsList = function(e) {
    function r() {
        var e, t, o, i;
        _classCallCheck(this, r);
        for (var n = arguments.length, a = Array(n), s = 0; s < n; s++) a[s] = arguments[s];
        return t = o = _possibleConstructorReturn(this, (e = r.__proto__ || Object.getPrototypeOf(r)).call.apply(e, [ this ].concat(a))), 
        o.props = [ "goodsList", "clickItemHandler", "redirect", "pageUrl" ], o.data = {
            formId: ""
        }, o.computed = {}, o.methods = {
            sendFromId: function(e) {
                this.formId = e.detail.formId, this.$apply();
                var r = e.currentTarget.dataset.index, t = this.goodsList[r], o = (this.pageUrl ? this.pageUrl : "/subPages/trade/detail/detail") + "?infoId=" + t.strInfoId + "&formId=" + this.formId + "&metric=" + t.metric, i = _webviewCategorys2.default.find(function(e) {
                    return e.cateId.indexOf(t.cateId) > -1 || e.uid.indexOf(t.uid) > -1;
                });
                i && i.target && wx.canIUse("web-view") && (o = i.target.replace("${infoId}", t.strInfoId), 
                o = o.replace("${metric}", t.metric), o = "/pages/webview/webview?url=" + encodeURIComponent(o)), 
                this.redirect ? _wxPromise.wxPromise.redirectTo({
                    url: o
                }) : _wxPromise.wxPromise.navigateTo({
                    url: o
                }), "function" == typeof this.clickItemHandler && this.clickItemHandler.call(this.$root, r);
            },
            clickHandler: function(e) {}
        }, i = t, _possibleConstructorReturn(o, i);
    }
    return _inherits(r, e), _createClass(r, [ {
        key: "determineInfoLabels",
        value: function(e) {
            var r = e.isNew ? {
                icon: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/common/infoLabels/brandNew.png",
                w: 60,
                h: 30
            } : "";
            return [].concat(_toConsumableArray(e.serviceIds && e.serviceIds.map(function(e) {
                return _serviceConfig2.default.serviceLabel(e);
            }) || []), [ r ]).filter(function(e) {
                return e && e.icon;
            }).slice(0, 1);
        }
    } ]), r;
}(_wepy2.default.component);

exports.default = GoodsList;