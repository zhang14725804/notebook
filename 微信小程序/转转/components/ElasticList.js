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
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), deviceInfo = {}, rpx2px = .5;

wx.getSystemInfo({
    success: function(e) {
        deviceInfo = e, rpx2px = deviceInfo.windowWidth / 750;
    }
});

var pageScrollTop = 0, currentItem = 0, currentPage = 0, listRemainPage = 0, loadedImgKey = 0, timestamp = 0, database = [], _default = function(e) {
    function t() {
        var e, a, i, n;
        _classCallCheck(this, t);
        for (var r = arguments.length, o = Array(r), l = 0; l < r; l++) o[l] = arguments[l];
        return a = i = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(o))), 
        i.props = {
            pageSize: {
                type: Number,
                default: 20
            },
            elastic: {
                type: Boolean,
                default: !0
            },
            rangePageNum: {
                type: Number,
                default: 2
            },
            preLoad: {
                type: Boolean,
                default: !0
            },
            preLoadPageNum: {
                type: Number,
                default: 1
            },
            imgLazyLoad: {
                type: Boolean,
                default: !0
            },
            imgLazyNum: {
                type: Number,
                default: 20
            },
            imgKey: {
                type: String,
                default: ""
            },
            itemHeight: {
                type: Number
            },
            loadHandle: {
                type: Function
            },
            listData: {
                type: Array,
                default: [],
                twoWay: !0
            },
            enableListenElastic: {
                type: Boolean,
                default: !1,
                twoWay: !0
            },
            listStartScrollTop: {
                type: Number,
                default: 0
            },
            pageNum: {
                type: Number,
                default: 1,
                twoWay: !0
            },
            scrollEventEmitLimit: {
                type: Number,
                default: 50
            }
        }, i.data = {
            pageRange: ""
        }, i.watch = {
            pageRange: function(e) {
                var t = this;
                if (this.elastic) {
                    var a = e.split("-");
                    a.length && (a[2] <= 2 * this.rangePageNum + 1 || (this.listData = database.map(function(e, i) {
                        return i < a[0] * t.pageSize || i >= (parseInt(a[1]) + 1) * t.pageSize ? {} : e;
                    }), this.$apply()));
                }
            },
            listData: function(e, t) {
                var a = this;
                if (!e || !e.length) return void (database = []);
                e.forEach(function(e, t) {
                    a.isEmptyObject(e) || (database[t] = e);
                }), this.loadLazyImg();
            }
        }, i.computed = {
            listItemHeight: function() {
                return this.itemHeight * rpx2px;
            }
        }, i.events = {
            startElasticList: function() {
                this.enableListenElastic = !0;
            },
            pauseElasticList: function() {
                this.enableListenElastic = !1;
            },
            stopElasticList: function() {
                this.enableListenElastic = !1, this.listData = listData;
            },
            elasticListOnScroll: function(e) {
                var t = new Date().getTime();
                if (!(t - timestamp < this.scrollEventEmitLimit) && (timestamp = t, this.enableListenElastic)) {
                    var a = e.scrollTop || e.detail.scrollTop || 0, i = a > pageScrollTop ? "down" : "up";
                    pageScrollTop = a, pageScrollTop + deviceInfo.screenHeight < this.listStartScrollTop || (this.calcRange(), 
                    "down" == i && (currentPage + this.preLoadPageNum >= listRemainPage && (console.info("预加载第" + (this.pageNum + 1) + "页"), 
                    this.loadHandle.call(this.$parent, this.pageNum + 1)), this.loadLazyImg()));
                }
            }
        }, n = a, _possibleConstructorReturn(i, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "calcRange",
        value: function() {
            var e = pageScrollTop + deviceInfo.screenHeight - this.listStartScrollTop;
            listRemainPage = Math.ceil(this.listData.length / this.pageSize), currentItem = Math.floor(e / this.listItemHeight), 
            currentPage = Math.floor(currentItem / this.pageSize);
            var t = Math.max(0, currentPage - this.rangePageNum), a = Math.min(listRemainPage, currentPage + this.rangePageNum);
            this.pageRange = t + "-" + a + "-" + listRemainPage;
        }
    }, {
        key: "loadLazyImg",
        value: function() {
            if (!((loadedImgKey = this.listData.findIndex(function(e) {
                return e.lazyImg;
            })) - currentItem > this.imgLazyNum)) {
                var e = Math.min(loadedImgKey + this.imgLazyNum, this.listData.length);
                this.listData.forEach(function(t, a) {
                    a >= loadedImgKey && a <= e && (t.lazyImg = !1);
                }), console.info("图片加载:", loadedImgKey, e), this.$apply();
            }
        }
    }, {
        key: "isEmptyObject",
        value: function(e) {
            var t;
            for (t in e) return !1;
            return !0;
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = _default;