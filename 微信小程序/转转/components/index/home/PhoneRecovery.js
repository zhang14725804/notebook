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
            var o = t[i];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, i, o) {
        return i && e(t.prototype, i), o && e(t, o), t;
    };
}(), _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _Title = require("./Title.js"), _Title2 = _interopRequireDefault(_Title), _webviewNavigateBackData = require("./../../../store/webviewNavigateBackData.js"), _webviewNavigateBackData2 = _interopRequireDefault(_webviewNavigateBackData), _util = require("./../../../lib/util.js"), _util2 = _interopRequireDefault(_util), correctWebUrl = function(e) {
    return _util2.default.isWaPage(e) ? ("/" !== e[0] && (e = "/" + e), e) : (0 === e.indexOf("//") && (e = "https:" + e), 
    e = "/pages/webview/webview?url=" + encodeURIComponent(e));
}, _default = function(e) {
    function t() {
        var e, i, o, n;
        _classCallCheck(this, t);
        for (var r = arguments.length, a = Array(r), l = 0; l < r; l++) a[l] = arguments[l];
        return i = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        o.props = {
            phoneRecoveryData: {
                type: Object
            },
            correctLinkHandler: {
                type: Function
            }
        }, o.data = {
            title: "",
            key1: "",
            val1: "",
            key2: "",
            val2: "",
            historyLink: "",
            btnLink: "",
            rpShowModelList: "",
            deviceModel: ""
        }, o.watch = {
            phoneRecoveryData: function(e) {
                this.formatPhoneRecoveryData(e), this.$apply();
            }
        }, o.$repeat = {}, o.$props = {
            Title: {
                "xmlns:v-bind": "",
                "v-bind:title.sync": "title"
            }
        }, o.$events = {}, o.components = {
            Title: _Title2.default
        }, o.methods = {
            selectPhone: function() {
                var e = _util2.default.addQuery(this.rpShowModelList, {
                    channel: "zzwamain"
                });
                console.log(e, "selectPhone"), this.navigateTo(e), this.$log("PHONETYPECLK");
            },
            goHistoryList: function() {
                this.navigateTo(this.historyLink), this.$log("TRADERECORDCLK");
            },
            onBtnClick: function() {
                this.navigateTo(this.btnLink), this.$log("OLDPHONESELLCLK");
            }
        }, o.events = {
            pageShow: function() {
                console.log("pageShow");
                var e = _webviewNavigateBackData2.default["/pages/index/index"];
                if (e && e.length) {
                    var t = e[e.length - 1];
                    t.deviceModel && this.queryPhoneData(t.deviceModel), _webviewNavigateBackData2.default["/pages/index/index"] = [];
                }
            }
        }, n = i, _possibleConstructorReturn(o, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "formatPhoneRecoveryData",
        value: function(e) {
            this.title = e.commonHeadText, this.key1 = e.rpModelText, this.val1 = e.rpIsExist ? e.phoneModel : "选择机型", 
            this.key2 = e.rpMaxPrice ? e.rpMaxPriceText : e.rpOverFlowPriceText, this.val2 = e.rpMaxPrice ? "￥" + e.rpMaxPrice : e.rpOverFlowPrice, 
            this.rpShowModelList = e.rpShowModelList, this.historyLink = e.rpShowHistoryUrl, 
            this.btnLink = e.commonBtnClickUrl, this.deviceModel = e.phoneModel || "";
        }
    }, {
        key: "navigateTo",
        value: function(e) {
            e = correctWebUrl(e), e = "function" == typeof this.correctLinkHandler ? this.correctLinkHandler(e) : e, 
            console.log("webUrl", this.correctLinkHandler, e), this.$wxPromise.navigateTo({
                url: e
            });
        }
    }, {
        key: "queryPhoneData",
        value: function(e) {
            var t = this, i = "?deviceModel=" + e;
            this.$http({
                url: "https://app.zhuanzhuan.com/zzopen/mainminiapp/weixinIndexPhonePrice" + i,
                success: function(i) {
                    var o = i.data;
                    if (0 != o.respCode) return void t.$toast({
                        title: o.errMsg || "服务异常，请稍后重试",
                        type: "fail",
                        duration: 2e3
                    });
                    o.respData.phoneModel = e, t.formatPhoneRecoveryData(o.respData), t.$apply();
                },
                fail: function(e) {
                    t.$toast({
                        title: "网络异常，请稍后重试",
                        type: "fail",
                        duration: 2e3
                    });
                }
            });
        }
    }, {
        key: "getModel",
        value: function() {
            return this.deviceModel;
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = _default;