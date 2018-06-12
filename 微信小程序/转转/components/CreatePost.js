function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function r(i, o) {
                try {
                    var s = t[i](o), a = s.value;
                } catch (e) {
                    return void n(e);
                }
                if (!s.done) return Promise.resolve(a).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(a);
            }
            return r("next");
        });
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
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _handleImg = require("./../lib/handleImg.js"), _handleImg2 = _interopRequireDefault(_handleImg), _canvasKit = require("./../lib/canvasKit.js"), _canvasKit2 = _interopRequireDefault(_canvasKit), _wxPromise = require("./../lib/wxPromise.js"), _operationKit = require("./../lib/operationKit.js"), Share = function(e) {
    function t() {
        var e, n, r, i;
        _classCallCheck(this, t);
        for (var o = arguments.length, s = Array(o), a = 0; a < o; a++) s[a] = arguments[a];
        return n = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(s))), 
        r.props = {
            info: {
                type: Object,
                default: {}
            },
            infoId: {
                default: ""
            }
        }, r.data = {
            dataInfo: {
                promise: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/relaeseshare/good-promise.png"
            },
            postUrl: "",
            createdPost: "waiting",
            showPoster: !1,
            fetchSysInfo: null
        }, r.watch = {
            createdPost: function(e) {
                this.showPoster && "waiting" != e && this.openPoster();
            }
        }, r.methods = {
            savePictureTap: function() {
                var e = this;
                this.$log("SAVE_PIC_TAP"), wx.getSetting({
                    success: function(t) {
                        t["scope.writePhotosAlbum"] ? e.savePicture() : wx.authorize({
                            scope: "scope.writePhotosAlbum",
                            success: function() {
                                e.savePicture();
                            },
                            fail: function() {
                                wx.showModal({
                                    content: "拒绝保存相册会导致部分功能不可用。如需授权请点击右上角【...】-【关于转转官方】- 右上角【...】-【设置】-保存到相册",
                                    showCancel: !1,
                                    confirmText: "知道了"
                                });
                            }
                        });
                    }
                });
            },
            closeTap: function() {
                this.showPoster = !1;
            }
        }, i = n, _possibleConstructorReturn(r, i);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "createPost",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.prev = 0, e.next = 3, this.drawCustomPoster(this.dataInfo);

                      case 3:
                        return e.next = 5, (0, _operationKit.delay)(1e3);

                      case 5:
                        return e.next = 7, _wxPromise.wxPromise.canvasToTempFilePath({
                            canvasId: "poster"
                        });

                      case 7:
                        t = e.sent, this.postUrl = t.tempFilePath, this.createdPost = "success", this.$apply(), 
                        e.next = 18;
                        break;

                      case 13:
                        e.prev = 13, e.t0 = e.catch(0), console.error("create poster failed:", e.t0), this.createdPost = "fail", 
                        this.$apply();

                      case 18:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 0, 13 ] ]);
            }));
            return e;
        }()
    }, {
        key: "checkCompatible",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.fetchSysInfo;

                      case 2:
                        if (t = e.sent, !t.system.toLowerCase().includes("ios") || "6.5.22" != t.version) {
                            e.next = 5;
                            break;
                        }
                        return e.abrupt("return", {
                            compatible: !1,
                            errMsg: "唔，当前微信版本暂不支持图片保存…请升级到最新版"
                        });

                      case 5:
                        return e.abrupt("return", {
                            compatible: !0,
                            errMsg: ""
                        });

                      case 6:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "openPoster",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.checkCompatible();

                      case 2:
                        if (t = e.sent, t.compatible) {
                            e.next = 6;
                            break;
                        }
                        return wx.showModal({
                            title: "提示",
                            content: t.errMsg
                        }), e.abrupt("return");

                      case 6:
                        "waiting" == this.createdPost ? wx.showLoading({
                            title: "正在生成图片"
                        }) : "success" == this.createdPost ? wx.hideLoading() : (wx.hideLoading(), this.$toast({
                            title: "生成图片失败",
                            type: "fail"
                        })), this.showPoster = !0, this.$apply();

                      case 9:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "savePicture",
        value: function() {
            var e = this;
            wx.saveImageToPhotosAlbum ? wx.saveImageToPhotosAlbum({
                filePath: this.postUrl,
                success: function(t) {
                    e.$emit("translateWitch", 1), wx.showToast({
                        title: "保存成功，快去朋友圈分享吧！",
                        type: "success"
                    }), e.$log("SAVE_PIC_SUCCESS");
                }
            }) : this.compatible();
        }
    }, {
        key: "compatible",
        value: function() {
            wx.showModal({
                title: "提示",
                content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
            });
        }
    }, {
        key: "downloadResource",
        value: function(e) {
            return new Promise(function(t, n) {
                wx.downloadFile({
                    url: e,
                    success: function(e) {
                        t(e.tempFilePath);
                    },
                    fail: function(t) {
                        n(t), console.error("下载文件失败:", t, "url:", e);
                    }
                });
            });
        }
    }, {
        key: "creatQrCode",
        value: function(e) {
            var t = this, n = {
                source: 103,
                page: "subPages/trade/detail/detail",
                scene: "d_" + this.infoId + "_m" + e,
                width: 800,
                autoColor: "false",
                lineColor: {
                    r: "0",
                    g: "0",
                    b: "0"
                }
            };
            return this.info.isSelf ? n.scene = "rd_" + this.infoId + "_ms_msg0" : n.scene = "d_" + this.infoId + "_ms_msg" + e, 
            new Promise(function(e, r) {
                t.$httpWithLogin({
                    url: "https://app.zhuanzhuan.com/zzopen/wxcommon/createCode2",
                    data: n
                }).then(function(t) {
                    0 == t.respCode ? e("https://pic2.58cdn.com.cn/zhuanzh/" + t.respData.picUrl) : r(t);
                }).catch(function(e) {
                    r(e);
                });
            });
        }
    }, {
        key: "clipString",
        value: function(e, t) {
            return e.length > t ? e.substring(0, t) + "…" : e;
        }
    }, {
        key: "drawCustomPoster",
        value: function() {
            function e(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
                var n, r, i, o, s, a, c, u, l, h, p, f, d, m, w, g, y, v, x, _, b, P, S, I, k, C, T, z = this;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        n = {
                            self: [ "转让个闲置，难得的好物，希望能转给有需要的人，让它继续发挥余热~", "我有个闲置宝贝要转，希望万能的票圈能为它找到合适的归处。", "转让个闲置宝贝，难得的好物~东西是旧的，但有它陪伴的生活却是新的~" ],
                            other: [ "帮朋友转个闲置，希望它能继续为你发挥余热~" ]
                        }, r = parseInt(3 * Math.random()), i = parseInt(1 * Math.random()), o = n.self[r], 
                        s = this.info.pics.split("|")[0], a = this.info.userInfo.portrait;
                        try {
                            /(http)/.test(s) || (s = "https://pic2.58cdn.com.cn/zhuanzh/" + this.info.pics.split("|")[0]), 
                            !/(https)/.test(a) && /(http)/.test(a) && (a = a.replace("http", "https")), a = a.replace("https://zzpic", "https://pic"), 
                            !/(https)/.test(s) && /(http)/.test(s) && (s = s.replace("http", "https"));
                        } catch (e) {
                            console.error(e);
                        }
                        return c = [ this.creatQrCode(r).then(function(e) {
                            return z.downloadResource(e);
                        }), this.downloadResource(s), this.downloadResource(a), this.downloadResource(t.promise) ], 
                        u = c[0], l = c[1], h = c[2], p = c[3], e.next = 10, l;

                      case 10:
                        return f = e.sent, d = wx.createCanvasContext("poster"), d.scale(.5, .5), e.t0 = d, 
                        e.t1 = f, e.next = 17, _wxPromise.wxPromise.getImageInfo({
                            src: f
                        });

                      case 17:
                        return e.t2 = e.sent, m = {
                            ctx: e.t0,
                            picFile: e.t1,
                            picInfo: e.t2,
                            x: 0,
                            y: 368,
                            w: 1500,
                            h: 1392
                        }, d.setFillStyle("white"), d.fillRect(0, 0, 1500, 3053), _canvasKit2.default.aspectFill(m), 
                        d.stroke(), e.next = 25, h;

                      case 25:
                        return w = e.sent, d.drawImage(w, 56, 58, 168, 168), d.setFontSize(70), d.setFillStyle("#576b95"), 
                        g = this.clipString(this.info.userInfo.nickname, 4), d.fillText(g, 266, 125), y = 276 + this.computedStringLength(g, 70), 
                        e.next = 34, p;

                      case 34:
                        return v = e.sent, d.drawImage(v, y, 62, 429, 75), d.setFontSize(60), d.setFillStyle("#43474c"), 
                        d.fillText(o.substring(0, 20), 266, 226), d.setFontSize(60), d.setFillStyle("#43474c"), 
                        d.fillText(o.substring(20), 266, 302), d.setFontSize(60), d.setFillStyle("black"), 
                        x = this.computedStringLength(this.info.title, 60), _ = (1500 - this.computedStringLength(this.info.title.substring(0, 15), 60)) / 2, 
                        b = 0, this.info.title.length > 15 ? d.fillText(this.info.title.substring(0, 15) + "…", _, 1852) : d.fillText(this.info.title.substring(0, 15), _, 1852), 
                        d.setFontSize(40), d.setFillStyle("red"), P = (1500 - (this.computedStringLength("￥", 40) + this.computedStringLength(this.info.nowPrice + "", 80))) / 2, 
                        d.fillText("￥", P, 1962 + b), d.setFontSize(80), d.setFillStyle("red"), S = P + this.computedStringLength("￥", 40), 
                        d.fillText(this.info.nowPrice, S, 1962 + b), this.info && 0 != this.info.oriPrice && (d.setFontSize(60), 
                        d.setFillStyle("#a4a4a4"), I = this.computedStringLength("原价" + this.info.oriPrice, 60), 
                        k = (1500 - I) / 2, d.fillText("原价" + this.info.oriPrice, k, 2062 + b), d.moveTo(k, 2032 + b), 
                        d.setStrokeStyle("#a4a4a4"), d.setLineWidth(5), d.lineTo(k + I, 2032 + b), d.stroke()), 
                        C = 545, e.next = 61, u;

                      case 61:
                        T = e.sent, d.drawImage(T, C, 2091 + b, 410, 410), d.setFontSize(50), d.setFillStyle("#a4a4a4"), 
                        d.fillText("长按屏幕识别小程序码查看详情", 400, 2598 + b), d.setFontSize(200), d.setFillStyle("#6e6e6e"), 
                        d.fillText("提到了我", 0, 3040), d.draw();

                      case 70:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "computedStringLength",
        value: function(e, t) {
            var n = 0, r = e.match(/[A-Za-z0-9\w]/g);
            return n = r ? r.length : 0, (e.length - n) * t + n * t / 2;
        }
    }, {
        key: "onLoad",
        value: function() {
            this.fetchSysInfo = _wxPromise.wxPromise.getSystemInfo();
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = Share;