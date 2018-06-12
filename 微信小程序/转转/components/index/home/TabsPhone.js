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
}(), _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _Tabs = require("./Tabs.js"), _Tabs2 = _interopRequireDefault(_Tabs), _wxPromise = require("./../../../lib/wxPromise.js"), deviceInfo = {};

wx.getSystemInfo({
    success: function(t) {
        deviceInfo = t;
    }
});

var timeStamp = 0, touching = !1, _default = function(t) {
    function e() {
        var t, n, i, o;
        _classCallCheck(this, e);
        for (var a = arguments.length, r = Array(a), s = 0; s < a; s++) r[s] = arguments[s];
        return n = i = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(r))), 
        i.props = {
            phoneCardData: {
                type: Array
            }
        }, i.data = {
            tabs: [],
            selectCateId: 0,
            phoneData: [],
            colWidth: 359,
            tabsWidth: [],
            offset: 30,
            scrollLeft: 0,
            descText: []
        }, i.watch = {
            phoneCardData: function(t) {
                var e = this;
                if (t && t.hotBrandList) {
                    if (this.tabs = t.hotBrandList.filter(function(t) {
                        return t.hotModelList.filter(function(t) {
                            return t.stock > 0;
                        }).length > 0;
                    }).map(function(t) {
                        return {
                            tabCatName: t.brandName,
                            tabCatId: t.brandId,
                            hotModelList: t.hotModelList
                        };
                    }), this.tabs.length) {
                        this.clickTab(this.tabs[0].tabCatId);
                        var n = deviceInfo.windowWidth / 750, i = [], o = [], a = 0;
                        this.tabs.forEach(function(t) {
                            var r = t.hotModelList.filter(function(t) {
                                return t.stock > 0;
                            });
                            r.forEach(function(t, e) {
                                e % 2 == 0 ? (o = [ t ], e == r.length - 1 && i.push(o)) : (o.push(t), i.push(o));
                            });
                            var s = Math.round(r.length / 2), c = s * e.colWidth * n;
                            e.tabsWidth.push({
                                catId: t.tabCatId,
                                width: a
                            }), a += c;
                        }), this.phoneData = i;
                    }
                    this.descText = t.descText.split("|"), this.$apply();
                }
            }
        }, i.methods = {
            onTouchStart: function() {
                touching = !0;
            },
            onTouchEnd: function() {
                setTimeout(function() {
                    touching = !1;
                }, 500);
            },
            onClickPanel: function() {
                this.$log("SECONDPHONECARDCLK");
            },
            onGoodClick: function(t) {
                _wxPromise.wxPromise.navigateTo({
                    url: "/pages/webview/webview?url=" + encodeURIComponent(t)
                });
            },
            moreClick: function() {
                this.$log("SECONDPHONEALLCLK");
                var t = this.phoneCardData.btnUrl.replace(/^pages/, "/pages");
                _wxPromise.wxPromise.navigateTo({
                    url: t
                });
            },
            onScroll: function(t) {
                if (touching) {
                    var e = new Date().getTime();
                    if (!(e - timeStamp < 100)) {
                        timeStamp = e;
                        var n = t.detail.scrollLeft + this.offset;
                        t.detail.scrollWidth;
                        if (!(n < 0)) {
                            var i = this.tabsWidth.filter(function(t) {
                                return n >= t.width;
                            });
                            if (this.tabsWidth.length) {
                                var o = i[i.length - 1];
                                o.catId != this.selectCateId && this.clickTab(o.catId, !1);
                            }
                        }
                    }
                }
            }
        }, i.$repeat = {}, i.$props = {
            Tabs: {
                "xmlns:v-bind": "",
                "v-bind:tabClick.once": "clickTab",
                "v-bind:tabs.sync": "tabs"
            }
        }, i.$events = {}, i.components = {
            Tabs: _Tabs2.default
        }, o = n, _possibleConstructorReturn(i, o);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "clickTab",
        value: function(t) {
            var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            this.selectCateId = t, this.$apply(), this.$broadcast("setTab", this.selectCateId);
            var n = this.tabsWidth.find(function(e) {
                return e.catId == t;
            });
            n && e && (this.scrollLeft = n.width, this.$apply(), timeStamp = new Date().getTime() + 1e3);
        }
    } ]), e;
}(_wepy2.default.component);

exports.default = _default;