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
            var o = t[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, a, o) {
        return a && e(t.prototype, a), o && e(t, o), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _uploadImg = require("./../lib/uploadImg.js"), _uploadImg2 = _interopRequireDefault(_uploadImg), sourceType = [ [ "camera" ], [ "album" ], [ "camera", "album" ] ], sizeType = [ [ "compressed" ], [ "original" ], [ "compressed", "original" ] ], NineImage = function(e) {
    function t() {
        var e, a, o, r;
        _classCallCheck(this, t);
        for (var i = arguments.length, n = Array(i), u = 0; u < i; u++) n[u] = arguments[u];
        return a = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(n))), 
        o.data = {}, o.props = {
            sourceTypeIndex: {
                type: Number,
                default: 2
            },
            sizeTypeIndex: {
                type: Number,
                default: 2
            },
            maxCount: {
                type: Number
            },
            size: {
                type: Number
            },
            distance: {
                type: Number
            },
            imageList: {
                type: Array,
                twoWay: !0
            }
        }, o.computed = {
            remainCount: function() {
                return this.maxCount - this.imageList.length;
            },
            isAble: function() {
                return this.imageList.length > 0;
            },
            showChoose: function() {
                return this.remainCount > 0;
            }
        }, o.methods = {
            chooseImage: function() {
                var e = this;
                if (this.$log("chooseImage"), this.remainCount <= 0) return void this.$toast({
                    title: "最多添加12张图片哦~",
                    type: "fail"
                });
                wx.chooseImage({
                    sourceType: sourceType[this.sourceTypeIndex],
                    sizeType: sizeType[this.sizeTypeIndex],
                    count: this.remainCount,
                    success: function(t) {
                        var a = e.imageList.concat(t.tempFilePaths.map(function(e) {
                            return {
                                localPath: e,
                                uploadState: "idle",
                                remotePath: ""
                            };
                        }));
                        e.imageList = a, e.uploadImages(), e.$apply();
                    },
                    complete: function(e) {
                        console.log("complete", e);
                    }
                });
            },
            removeImage: function(e) {
                var t = e.target.dataset.index, a = this.imageList.slice(0, t), o = this.imageList.slice(t + 1), r = a.concat(o);
                this.imageList = r;
            },
            previewImage: function(e) {
                var t = e.target.dataset.src;
                _wepy2.default.previewImage({
                    current: t,
                    urls: this.imageList.map(function(e) {
                        return e.localPath;
                    })
                });
            },
            retry: function(e) {
                this.uploadImage(this.imageList[e], !0);
            }
        }, r = a, _possibleConstructorReturn(o, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "uploadImage",
        value: function(e) {
            var t = this, a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            "succeeded" != e.uploadState && "uploading" != e.uploadState && ("failed" != e.uploadState || a) && (e.uploadState = "uploading", 
            (0, _uploadImg2.default)({
                tempFilePath: e.localPath,
                success: function(a) {
                    try {
                        e.remotePath = a.data.data.imgUrl, e.uploadState = "succeeded", t.$apply();
                    } catch (a) {
                        console.debug(a), e.remotePath = "", e.uploadState = "failed", t.$apply();
                    }
                },
                fail: function(a) {
                    e.remotePath = "", e.uploadState = "failed", t.$apply(), console.log("[upload image failed] res:", a, "image:", e);
                }
            }));
        }
    }, {
        key: "uploadImages",
        value: function() {
            var e = !0, t = !1, a = void 0;
            try {
                for (var o, r = this.imageList[Symbol.iterator](); !(e = (o = r.next()).done); e = !0) {
                    var i = o.value;
                    this.uploadImage(i);
                }
            } catch (e) {
                t = !0, a = e;
            } finally {
                try {
                    !e && r.return && r.return();
                } finally {
                    if (t) throw a;
                }
            }
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = NineImage;