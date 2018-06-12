function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            function a(i, n) {
                try {
                    var o = t[i](n), s = o.value;
                } catch (e) {
                    return void r(e);
                }
                if (!o.done) return Promise.resolve(s).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(s);
            }
            return a("next");
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

function _applyDecoratedDescriptor(e, t, r, a, i) {
    var n = {};
    return Object.keys(a).forEach(function(e) {
        n[e] = a[e];
    }), n.enumerable = !!n.enumerable, n.configurable = !!n.configurable, ("value" in n || n.initializer) && (n.writable = !0), 
    n = r.slice().reverse().reduce(function(r, a) {
        return a(e, t, r) || r;
    }, n), i && void 0 !== n.initializer && (n.value = n.initializer ? n.initializer.call(i) : void 0, 
    n.initializer = void 0), void 0 === n.initializer && (Object.defineProperty(e, t, n), 
    n = null), n;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var a = t[r];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, r, a) {
        return r && e(t.prototype, r), a && e(t, a), t;
    };
}(), _get = function e(t, r, a) {
    null === t && (t = Function.prototype);
    var i = Object.getOwnPropertyDescriptor(t, r);
    if (void 0 === i) {
        var n = Object.getPrototypeOf(t);
        return null === n ? void 0 : e(n, r, a);
    }
    if ("value" in i) return i.value;
    var o = i.get;
    if (void 0 !== o) return o.call(a);
}, _desc, _value, _class, _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _NineImage = require("./../../components/NineImage.js"), _NineImage2 = _interopRequireDefault(_NineImage), _BaseBoard = require("./../../components/BaseBoard.js"), _BaseBoard2 = _interopRequireDefault(_BaseBoard), _routeParams = require("./../../store/routeParams.js"), _routeParams2 = _interopRequireDefault(_routeParams), _handleImg = require("./../../lib/handleImg.js"), _handleImg2 = _interopRequireDefault(_handleImg), _serviceConfig = require("./../../data/serviceConfig.js"), _serviceConfig2 = _interopRequireDefault(_serviceConfig), _wxPromise = require("./../../lib/wxPromise.js"), _Popup = require("./../../components/post/Popup.js"), _Popup2 = _interopRequireDefault(_Popup), _Banner = require("./../../components/post/Banner.js"), _Banner2 = _interopRequireDefault(_Banner), _pageCache = require("./../../store/pageCache.js"), _pageCache2 = _interopRequireDefault(_pageCache), _TipBar = require("./../../components/common/TipBar.js"), _TipBar2 = _interopRequireDefault(_TipBar), _operationKit = require("./../../lib/operationKit.js"), _decorators = require("./../../lib/decorators.js"), _postParams = require("./../../store/postParams.js"), _postParams2 = _interopRequireDefault(_postParams), _PrivilegeModal = require("./../../components/post/PrivilegeModal.js"), _PrivilegeModal2 = _interopRequireDefault(_PrivilegeModal), _DialogCommon = require("./../../components/DialogCommon.js"), _DialogCommon2 = _interopRequireDefault(_DialogCommon), _CrazyFormId = require("./../../components/common/CrazyFormId.js"), _CrazyFormId2 = _interopRequireDefault(_CrazyFormId), _BindMobile = require("./../../lib/BindMobile.js"), _BindMobile2 = _interopRequireDefault(_BindMobile), _TextAreaEle = require("./../../components/common/TextAreaEle.js"), _TextAreaEle2 = _interopRequireDefault(_TextAreaEle), _getLocation = require("./../../lib/getLocation.js"), _getLocation2 = _interopRequireDefault(_getLocation), _callbackFromWebview = require("./../../logic/callbackFromWebview.js"), _PageFrame = require("./../../components/common/PageFrame.js"), _PageFrame2 = _interopRequireDefault(_PageFrame), _entryInfo = require("./../../store/entryInfo.js"), _entryInfo2 = _interopRequireDefault(_entryInfo), post = (_class = function(e) {
    function t() {
        var e, r, a, i, n;
        _classCallCheck(this, t);
        for (var o = arguments.length, s = Array(o), c = 0; c < o; c++) s[c] = arguments[c];
        return a = i = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(s))), 
        i.config = {
            navigationBarTitleText: "发布",
            backgroundColor: "#F2F3F6"
        }, i.$repeat = {}, i.$props = {
            nineImage: {
                "xmlns:v-bind": "",
                "v-bind:maxCount.once": "picsPropCount",
                "v-bind:size.once": "picsPropSize",
                "v-bind:distance.once": "picsPropDistance",
                "v-bind:imageList.sync": "imageList",
                bindtap: "imgUploadClick"
            },
            BaseBoard: {
                "v-bind:show.sync": "ShowBoard",
                "v-bind:onConfirm.once": "rcvPrice",
                "v-bind:onClose.once": "onClose"
            },
            Popup: {
                "v-bind:groupid.sync": "groupid",
                "v-bind:groupsectionid.sync": "groupsectionid",
                "v-bind:onConfirm.once": "rcvCircle",
                "v-bind:onClose.once": "onClose"
            },
            PrivilegeModal: {
                "v-bind:privileges.sync": "privileges",
                "v-bind:onPrivilegeChange.sync": "onPrivilegeChange",
                "v-bind:onClose.once": "onPriviModalClose"
            },
            TextAreaEle: {
                "v-bind:class.sync": "textareaClass",
                placeholderClass: "desc-placeholder",
                "v-bind:placeholder.once": "contentPlaceholder",
                "v-bind:maxlength.once": "contentMaxLen",
                "v-bind:value.sync": "contentValue",
                "v-bind:bindblur.once": "onContentBlur"
            }
        }, i.$events = {}, i.components = {
            PageFrame: _PageFrame2.default,
            nineImage: _NineImage2.default,
            BaseBoard: _BaseBoard2.default,
            Popup: _Popup2.default,
            Banner: _Banner2.default,
            TipBar: _TipBar2.default,
            PrivilegeModal: _PrivilegeModal2.default,
            DialogCommon: _DialogCommon2.default,
            CrazyFormId: _CrazyFormId2.default,
            TextAreaEle: _TextAreaEle2.default
        }, i.data = {
            isIphoneX: !1,
            osType: "",
            options: "",
            postChannel: "",
            context: "",
            infoId: "",
            oriInfo: {},
            groupid: "",
            ShowCircle: !1,
            ShowBoard: !1,
            groupsectionid: "",
            picsPropCount: 12,
            picsPropSize: 174,
            picsPropDistance: 20,
            imageList: [],
            _gpsCity: "",
            gpsCityData: !1,
            newLabelIcons: [ "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/post/notfreefreight.png", "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/post/freefreight.png" ],
            newLabelState: 0,
            title: {
                value: "",
                placeholder: "为闲置宝贝取个诱人的名字吧",
                maxLen: 30
            },
            titleAvailLen: 30,
            contentValue: "",
            contentPlaceholder: "在这里详细描述一下你的宝贝吧，如品牌、规格、成色、购买渠道、转手原因等",
            contentMaxLen: 15e3,
            category: {
                value: "",
                placeholder: "分类",
                cateId: ""
            },
            circle: {
                value: "",
                placeholder: "选择板块",
                groupsectionid: ""
            },
            privilege: {
                show: !1,
                value: "",
                placeholder: "选择特权",
                ids: []
            },
            privileges: [],
            position: {
                value: "",
                placeholder: "选择宝贝位置",
                lon: "",
                lat: "",
                localId: ""
            },
            showPriceInputModal: !1,
            price: {
                value: "",
                placeholder: "开价",
                oriPrice: "",
                freight: "",
                postageExplain: 1
            },
            serviceTriggers: {},
            services: [],
            mobileBound: !1,
            openingModal: !1,
            shareConfig: {
                title: "3秒发布闲置宝贝，秒速成交，戳此发布",
                path: "/pages/post/post"
            },
            showBasicParams: !1,
            postParams: {
                params: "",
                paramsText: "",
                placeholder: "选择参数"
            },
            postResult: "",
            isMini: !1
        }, i.computed = {
            showBanner: function() {
                var e = {};
                if (/(^postest2_[0-7]$)|(^postest2_putbottom[1-6]$)|(^postest2_toufang[1-6]$)|(^postest1206_mp$)|(^postest1206vx$)/.test(this.postChannel)) e = {
                    bannerPresent: this.postChannel.includes("postest") && "postest2_0" != this.postChannel,
                    bannerClose: this.imageList && this.imageList.length > 0,
                    bannerSrc: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/post/banner/" + this.postChannel + "." + ("postest2_1" == this.postChannel ? "png" : "jpg")
                }; else {
                    var t = this.options.bannerIdx || 0;
                    e = {
                        bannerPresent: 0 != t,
                        bannerClose: this.imageList && this.imageList.length > 0,
                        bannerSrc: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/post/banner/postest2_toufang" + t + ".jpg"
                    };
                }
                return this.$invoke("Banner", "setVisibility", e), e;
            },
            formFrontEnd: function() {
                return !this.showPriceInputModal && !this.openingModal;
            },
            showBaseBoard: function() {
                return !this.ShowCircle && this.showPriceInputModal;
            },
            computeServiceTriggers: function() {
                var e = {
                    cateId: this.category.cateId,
                    lon: this.position.lon,
                    lat: this.position.lat,
                    areaId: this.position.localId,
                    nowprice: this.price.value
                };
                return this.serviceTriggers = e, e;
            },
            textareaClass: function() {
                return "post-desc-text " + this.osType;
            }
        }, i.watch = {
            serviceTriggers: function(e) {
                this.pullServiceList();
            },
            category: function(e) {
                console.log(e.cateId, "cate id", _postParams2.default.cateId);
                var t = /^(2101019)|(2111005)|(2111006)|(2111007)|(2111008)|(2111009)|(2111000)/g.test(e.cateId);
                this.showBasicParams = /^(2101)/g.test(e.cateId) && !t, _postParams2.default.cateId && _postParams2.default.cateId !== e.cateId && _postParams2.default.clear();
            }
        }, i.methods = (r = {
            threeDayoversell: function() {
                this.$log("POSTSECRET_CLICK", "WAPOST"), _wxPromise.wxPromise.navigateTo({
                    url: "/pages/post/threeDayoversell"
                });
            },
            onBasicParams: function() {
                function e() {
                    return t.apply(this, arguments);
                }
                var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                    return regeneratorRuntime.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            console.info("onBasicParams"), _wxPromise.wxPromise.navigateTo({
                                url: "/pages/post/postparams?cateId=" + this.category.cateId
                            });

                          case 2:
                          case "end":
                            return e.stop();
                        }
                    }, e, this);
                }));
                return e;
            }(),
            onShowCircle: function() {
                this.$log("circlemoduleclick"), this.$broadcast("popupshow"), this.showPriceInputModal = !0, 
                this.ShowCircle = !0;
            },
            onPrivilege: function() {
                this.$log("onPrivilege"), this.openingModal = !0, this.$invoke("PrivilegeModal", "open"), 
                this.$apply();
            },
            goHome: function() {
                _wxPromise.wxPromise.reLaunch({
                    url: "/pages/index/index"
                });
            },
            onTitleInput: function(e) {
                this.titleAvailLen = Math.max(this.title.maxLen - e.detail.value.length, 0);
            },
            onTitleBlur: function(e) {
                var t = this;
                this.$log("onTitleBlur"), this.title.value = e.detail.value;
                var r = e.detail.value;
                this.getRecommendCate(r).then(function(e) {
                    if (0 != e.respCode || !Array.isArray(e.respData)) return {};
                    var r = e.respData.filter(function(e) {
                        return !/^2123/.test(e.cateId);
                    });
                    if (r.length > 0) {
                        var a = r[0];
                        t.category = {
                            value: a.cateName,
                            placeholder: a.cateName,
                            cateId: a.cateId
                        }, t.$apply();
                    }
                }), this.$apply();
            },
            onPosition: function() {
                this.$log("onPosition"), _wxPromise.wxPromise.navigateTo({
                    url: "/subPages/trade/buy/city"
                });
            },
            onCate: function(e) {
                this.$log("onCate"), _wxPromise.wxPromise.navigateTo({
                    url: "/pages/post/postcate?cateId=" + this.category.cateId + "&actType=back"
                });
            },
            onPrice: function() {
                this.$log("onPrice"), this.showPriceInputModal = !0, this.ShowBoard = !0;
            },
            onPost: function() {
                function e() {
                    return t.apply(this, arguments);
                }
                var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                    var t, r = this;
                    return regeneratorRuntime.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return this.$log("RELEASE_BTN_TAP"), e.next = 3, this.doPost();

                          case 3:
                            t = e.sent, t.pass ? (_callbackFromWebview.postSuccessCallback.call(this, this.options, t), 
                            this.postSuccessLogs().forEach(function(e) {
                                return r.$log(e);
                            })) : this.$log("RELEASE_BTN_FAIL", null, {
                                failStep: t.failStep,
                                failDetail: t.failDetail
                            });

                          case 5:
                          case "end":
                            return e.stop();
                        }
                    }, e, this);
                }));
                return e;
            }(),
            toggleNewLabel: function() {
                this.$log("toggleNewLabel"), this.newLabelState = 1 == this.newLabelState ? 0 : 1;
            },
            onServiceQuestion: function(e) {
                this.services[e].detailEntryWaUrl && _wxPromise.wxRefine.navigateTo({
                    url: this.services[e].detailEntryWaUrl
                });
            },
            onServiceSwitch: function(e, t) {
                this.services[e].selected = t.detail.value;
            }
        }, _applyDecoratedDescriptor(r, "onBasicParams", [ _decorators.noConcurrent ], Object.getOwnPropertyDescriptor(r, "onBasicParams"), r), 
        _applyDecoratedDescriptor(r, "onPost", [ _decorators.noConcurrent ], Object.getOwnPropertyDescriptor(r, "onPost"), r), 
        r), i.onContentBlur = function(e) {
            i.$log("onTitleBlur");
            var t = e.detail.value;
            i.contentValue = t.substring(0, Math.min(t.length, i.contentMaxLen)), t.length >= i.contentMaxLen && i.$toast({
                title: "宝贝描述最多" + i.contentMaxLen + "个字",
                type: "fail",
                duration: 1500
            });
        }, i.rcvPrice = function(e) {
            console.log("价格信息为：", e), Object.assign(i.price, {
                value: e.wish,
                oriPrice: e.origin,
                freight: e.freight,
                postageExplain: e.isFree ? 2 : e.freight ? 0 : 1
            }), i.$apply();
        }, i.rcvCircle = function(e) {
            Object.assign(i.circle, {
                value: e.value,
                groupsectionid: e.groupsectionid
            }), i.groupsectionid = e.groupsectionid, i.$apply();
        }, i.onClose = function() {
            i.showPriceInputModal = !1, i.ShowCircle = !1, i.$apply();
        }, i.onPriviModalClose = function() {
            i.openingModal = !1, i.$apply();
        }, i.onPrivilegeChange = function() {
            var e = i.privileges.filter(function(e) {
                return e.selected;
            });
            Object.assign(i.privilege, {
                value: e.map(function(e) {
                    return e.name;
                }).join(","),
                ids: e.filter(function(e) {
                    return e.privilegeId;
                }).map(function(e) {
                    return e.privilegeId;
                })
            }), i.$apply();
        }, n = a, _possibleConstructorReturn(i, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "doPost",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, r, a, i;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if ("ok" == (t = this.checkFormLocal())) {
                            e.next = 4;
                            break;
                        }
                        return this.$toast({
                            title: t,
                            type: "fail",
                            duration: 1500
                        }), e.abrupt("return", {
                            pass: !1,
                            failStep: "localCheck",
                            failDetail: t
                        });

                      case 4:
                        return e.next = 6, this.checkFormRemote();

                      case 6:
                        if (r = e.sent, r.pass) {
                            e.next = 9;
                            break;
                        }
                        return e.abrupt("return", r);

                      case 9:
                        return a = void 0, e.prev = 10, e.next = 13, this.updateGood();

                      case 13:
                        a = e.sent, a = a || {
                            state: "fail",
                            errMsg: ""
                        }, e.next = 21;
                        break;

                      case 17:
                        e.prev = 17, e.t0 = e.catch(10), console.error("[发布/编辑失败]", e.t0), a = {
                            state: "fail",
                            errMsg: ""
                        };

                      case 21:
                        if (this.postResult = a.state, "success" == a.state || "partialSucc" == a.state) {
                            e.next = 25;
                            break;
                        }
                        return this.$toast({
                            title: a.errMsg || "发布失败",
                            type: "fail",
                            duration: 1500
                        }), e.abrupt("return", {
                            pass: !1,
                            failStep: "postApi",
                            failDetail: a.errMsg || ""
                        });

                      case 25:
                        return i = this.options.pageChannel || this.options.channel || "none", "success" == a.state ? _wxPromise.wxPromise.redirectTo({
                            url: "/pages/post/postsuccess?infoId=" + this.infoId + "&invitePostBanner=" + a.invitePostBanner + "&pageChannel=" + i + (this.options.backRefresh ? "&backRefresh=1" : "")
                        }) : _wxPromise.wxPromise.navigateTo({
                            url: "/pages/post/postsuccess?infoId=" + this.infoId + "&errMsg=" + a.errMsg + "&invitePostBanner=" + a.invitePostBanner + "&pageChannel=" + i
                        }), e.abrupt("return", {
                            pass: !0,
                            failStep: "",
                            failDetail: "",
                            infoId: this.infoId
                        });

                      case 28:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 10, 17 ] ]);
            }));
            return e;
        }()
    }, {
        key: "checkFormLocal",
        value: function() {
            return 0 == this.imageList.length ? "请添加宝贝照片" : /^\s*$/.test(this.title.value) ? "请填写宝贝标题" : this.position.value ? this.category.value ? !this.postParams.params && this.showBasicParams ? "请选择基本参数" : "" == this.price.value ? "请给宝贝开个价" : "" == this.circle.value && this.groupid ? "请选择板块" : this.imageList.some(function(e) {
                return "uploading" == e.uploadState;
            }) ? "正在上传宝贝靓照，请稍等" : this.imageList.some(function(e) {
                return "failed" == e.uploadState;
            }) ? "图片上传失败，请重试" : "ok" : "请选择宝贝分类" : "请选择宝贝位置";
        }
    }, {
        key: "checkFormRemote",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, r, a, i, n, o;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return t = new _BindMobile2.default({
                            checkLevel: "hard",
                            fromLog: "release",
                            wepyInstance: this
                        }), r = this.pullContentCheck(), a = t.checkBind(), e.next = 5, r;

                      case 5:
                        if (i = e.sent, i.isPass) {
                            e.next = 9;
                            break;
                        }
                        return this.$invoke("TipBar", "open", {
                            content: i.tip
                        }), e.abrupt("return", {
                            pass: !1,
                            failStep: "serverContent",
                            failDetail: ""
                        });

                      case 9:
                        return e.next = 11, a;

                      case 11:
                        if (n = e.sent) {
                            e.next = 18;
                            break;
                        }
                        return e.next = 15, t.doBind();

                      case 15:
                        if (o = e.sent, "success" == o.result) {
                            e.next = 18;
                            break;
                        }
                        return e.abrupt("return", {
                            pass: !1,
                            failStep: "boundMobile",
                            failDetail: ""
                        });

                      case 18:
                        return e.abrupt("return", {
                            pass: !0,
                            failStep: "",
                            failDetail: ""
                        });

                      case 19:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "checkUserPunish",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, r;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.$login();

                      case 2:
                        return e.next = 4, this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getuserpunish",
                            method: "POST",
                            data: {
                                getuid: this.$loginCenter.zzUserInfo.uid,
                                source: 2
                            }
                        });

                      case 4:
                        if (t = e.sent, 0 == t.respCode) {
                            e.next = 9;
                            break;
                        }
                        return this.$toast({
                            title: t.errMsg || t.respData.errMsg || "",
                            type: "fail"
                        }), console.warn("getuserpunish 接口未正常返回：", t), e.abrupt("return", {
                            pass: !1
                        });

                      case 9:
                        if (r = t.respData, 0 != r.actType) {
                            e.next = 12;
                            break;
                        }
                        return e.abrupt("return", {
                            pass: !0
                        });

                      case 12:
                        return this.openingModal = !0, this.$apply(), this.$invoke("DialogCommon", "open", {
                            title: "提示",
                            content: r.punishDesc,
                            hideCloseIcon: !0,
                            buttons: [ {
                                text: "知道了",
                                preventClose: !0,
                                clickHandler: function() {
                                    _wxPromise.wxPromise.navigateBack();
                                }
                            } ]
                        }), e.abrupt("return", {
                            pass: !1
                        });

                      case 16:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "pullContentCheck",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/checkcontent",
                            method: "POST",
                            data: {
                                content: this.contentValue
                            }
                        });

                      case 2:
                        if (t = e.sent, 0 == t.respCode) {
                            e.next = 5;
                            break;
                        }
                        return e.abrupt("return", {
                            isPass: !1,
                            tip: t.errMsg || "网络异常",
                            words: []
                        });

                      case 5:
                        return e.abrupt("return", t.respData);

                      case 6:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "rcvCrossPageFields",
        value: function(e) {
            var t = e.flow, r = "forward" == t ? _routeParams2.default.getOpenFromRoute() : _routeParams2.default.getBackFromRoute(), a = "forward" == t ? _routeParams2.default.getOpenFromData() : _routeParams2.default.getBackFromData();
            if (!a) return void ("forward" == t ? _routeParams2.default.clearOpenFrom() : _routeParams2.default.clearBackFrom());
            switch (r) {
              case "pages/post/postcate":
              case "subPages/hotCates/postGuide":
                Object.assign(this.category, {
                    value: a.postCateName,
                    cateId: a.cateId
                });
                break;

              case "subPages/trade/bindphonenumber/bindphonenumber":
                this.mobileBound = a.bindMobileSuccess;
                break;

              case "subPages/trade/buy/city":
                Object.assign(this.position, {
                    value: a.name,
                    lon: a.lon,
                    lat: a.lat,
                    localId: a.localId
                });
                break;

              case "subPages/phoneEval/result":
                Object.assign(this.title, {
                    value: a.title,
                    availLen: Math.max(this.title.maxLen - a.title.length, 0)
                }), this.contentValue = a.content, Object.assign(this.category, {
                    value: a.cateName,
                    cateId: a.cateId
                }), Object.assign(this.price, {
                    value: a.nowPrice
                }), _postParams2.default.params = [ a.params, [] ];
            }
            "forward" == t ? _routeParams2.default.clearOpenFrom() : _routeParams2.default.clearBackFrom(), 
            this.$apply();
        }
    }, {
        key: "getGPSCity",
        value: function() {
            var e = this;
            (0, _getLocation2.default)({
                systemDisableTip: "转转发现你关闭了微信的“定位服务”，导致获取不了你的地理位置，请去“手机设置-应用授权”里打开吧",
                authFailTip: "请开启“定位服务”哦，以便附近的转友更容易找到你的宝贝~",
                success: function(t) {
                    var r = t.latitude, a = t.longitude;
                    e.$http({
                        url: "https://app.zhuanzhuan.com/zz/transfer/getCityDispLocal",
                        method: "POST",
                        data: {
                            lng: a,
                            lat: r
                        },
                        success: function(t) {
                            0 == t.data.respCode ? (e._gpsCity = t.data.respData.city_localName + " " + t.data.respData.region_localName, 
                            e.position.value || Object.assign(e.position, {
                                value: e._gpsCity,
                                lon: a,
                                lat: r,
                                localId: t.data.respData.street_id
                            }), e.$apply()) : (e._gpsCity = "定位失败", e.$apply());
                        },
                        fail: function(t) {
                            e._gpsCity = "定位失败", e.$apply();
                        }
                    });
                },
                fail: function(t) {
                    t.latitude, t.longitude;
                    e._gpsCity = "定位失败", e.$apply();
                }
            });
        }
    }, {
        key: "pullEditInfo",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, r;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getInfoToUpdateById",
                            data: {
                                infoId: this.infoId
                            },
                            method: "POST"
                        });

                      case 2:
                        if (t = e.sent, 0 == t.respCode) {
                            e.next = 5;
                            break;
                        }
                        return e.abrupt("return", this.$toast({
                            title: "网络异常",
                            type: "fail"
                        }));

                      case 5:
                        r = t.respData, this.oriInfo = r, this.applyDataApi2Local(r), r.basicParams && this.setPostParams(r.basicParams), 
                        this.mobileBound = !0, this.$apply();

                      case 11:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "postSuccessLogs",
        value: function() {
            var e = [], t = this.services.filter(function(e) {
                return e.selected;
            }).map(function(e) {
                return e.serviceId;
            });
            return (t.includes("1") || t.includes("12")) && e.push("YANJISERVICE_POST_SUCCESS_" + this.context), 
            e.push("POST_SUCCESS"), e;
        }
    }, {
        key: "updateGood",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.$httpWithLogin({
                            url: "new" == this.context ? "https://app.zhuanzhuan.com/zzopen/miniapp/addinfo" : "https://app.zhuanzhuan.com/zzopen/miniapp/updateInfo",
                            method: "POST",
                            data: this.formatDataLocal2Api()
                        });

                      case 2:
                        return t = e.sent, this.infoId = "new" == this.context ? t.respData.infoId : this.infoId, 
                        e.abrupt("return", {
                            state: 0 != t.respCode ? "fail" : t.respData.errMsg ? "partialSucc" : "success",
                            invitePostBanner: t.respData && t.respData.invitePostBanner ? 1 : 0,
                            errMsg: t.errMsg || t.respData.errMsg
                        });

                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "pullServiceList",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, r, a = this;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (t = {
                            isEdit: "edit" === this.context ? 1 : 0,
                            cateId: this.category.cateId,
                            lon: this.position.lon,
                            lat: this.position.lat,
                            areaId: this.position.localId,
                            hasparams: 1,
                            nowprice: this.price.value,
                            basicParam: this.showBasicParams ? this.postParams.params || "" : this.oriInfo.basicParams || "",
                            selectedservice: this.services.filter(function(e) {
                                return e.selected;
                            }).map(function(e) {
                                return e.serviceId;
                            }).join("|")
                        }, t.areaId && t.cateId) {
                            e.next = 3;
                            break;
                        }
                        return e.abrupt("return");

                      case 3:
                        return e.next = 5, this.$http({
                            url: "https://app.zhuanzhuan.com/zz/transfer/infoServiceList",
                            data: t,
                            method: "POST"
                        });

                      case 5:
                        if (r = e.sent, 0 == r.respCode) {
                            e.next = 8;
                            break;
                        }
                        return e.abrupt("return");

                      case 8:
                        this.services = (r.respData.services || []).filter(function(e) {
                            return _serviceConfig2.default.supportPost(e.serviceId);
                        }).map(function(e) {
                            return Object.assign({}, e, {
                                selected: "edit" == a.context ? a.oriInfo.serviceQualitys && a.oriInfo.serviceQualitys.map(function(e) {
                                    return e.serviceId;
                                }).includes(e.serviceId) : 1 == e.defaultSelected,
                                detailEntryWaUrl: e.detailEntryWaUrl || _serviceConfig2.default.introPages[e.serviceId]
                            });
                        }), this.$apply();

                      case 10:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "configShareOpts",
        value: function() {
            if (wx.hideShareMenu && wx.hideShareMenu(), this.options.shareType && "none" != this.options.shareType) {
                switch (this.options.shareType) {
                  case "echo":
                    this.shareConfig.path = (0, _operationKit.appendUrlParam)("/pages/post/post", {
                        channel: this.options.channel,
                        bannerIdx: this.options.bannerIdx,
                        shareType: this.options.shareType
                    });
                    break;

                  default:
                    console.warn("[post] unknown shareType:", this.options.shareType);
                }
                wx.showShareMenu && wx.showShareMenu();
            }
        }
    }, {
        key: "$log",
        value: function(e, r, a) {
            var i = {
                context: this.context
            };
            _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "$log", this).call(this, e, r, Object.assign({}, i, a));
        }
    }, {
        key: "onLoad",
        value: function(e) {
            var t = this;
            if (this.isIphoneX = this.$root.$parent.globalData.isIphoneX, e._forcedRefresh) return void _pageCache2.default.restore("pages/post/post", this);
            console.log(e, "options"), e.groupId && this.$log("circlemoduleshow"), this.options = this.$wxpage.options = e, 
            "forward" == e.dataFlow && this.rcvCrossPageFields({
                flow: "forward"
            }), this.isMini = this.options.type && "mini" == this.options.type, this.configShareOpts(), 
            this.postChannel = this.$wxpage.options.postChannel || this.$wxpage.options.channel || "", 
            this.context = e.infoId ? "edit" : "new", this.infoId = e.infoId || "", this.groupid = e.groupId ? e.groupId : "", 
            e.cateId && (this.category.cateId = e.cateId), "edit" == this.context && this.pullEditInfo(), 
            "forward" != e.dataFlow && this.restoreDraft(), this.pullPrivileges(), this.getGPSCity(), 
            this.checkUserPunish(), this.$log("RELEASE_VIEW"), this.$log("VIEW", "WAPOSTSECRET"), 
            _wxPromise.wxPromise.getSystemInfo().then(function(e) {
                t.osType = e.platform, t.$apply();
            }), this.$updatePageFrame({
                backHome: {
                    extraStyle: "bottom: 110rpx"
                }
            });
        }
    }, {
        key: "pullPrivileges",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if ("new" == this.context) {
                            e.next = 2;
                            break;
                        }
                        return e.abrupt("return");

                      case 2:
                        return e.next = 4, this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zzopen/miniapp/postPrivilegeList"
                        });

                      case 4:
                        if (t = e.sent, 0 == t.respCode) {
                            e.next = 8;
                            break;
                        }
                        return console.error("获取特权列表失败", t), e.abrupt("return");

                      case 8:
                        this.privileges = t.respData.privileges.concat([ {
                            privilegeId: "",
                            name: "不使用特权",
                            expire: ""
                        } ]), this.privileges.forEach(function(e) {
                            e.rule = e.rule && e.rule.replace(/\\n/g, "\n");
                        }), this.privilege.show = this.privileges.length > 1, this.privileges.length > 1 && (this.privileges[0].selected = !0), 
                        this.onPrivilegeChange(), this.$apply();

                      case 14:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "getRecommendCate",
        value: function(e) {
            return this.$httpWithLogin({
                url: "https://app.zhuanzhuan.com/zz/transfer/getRecommendCate",
                data: {
                    title: e
                }
            });
        }
    }, {
        key: "formatDataLocal2Api",
        value: function() {
            var e = null;
            e = "new" == this.context ? {
                oriInfo: {},
                extraInfo: {
                    cateId: this.category.cateId,
                    friendPacketId: this.options.friendPacketId || ""
                }
            } : {
                oriInfo: this.oriInfo,
                extraInfo: {
                    cateId: this.category.cateId,
                    infoId: this.infoId,
                    basicParam: JSON.stringify(this.oriInfo.basicParams)
                }
            };
            var t = {
                channel: this.postChannel,
                entryChannel: _entryInfo2.default.channel,
                pageChannel: this.options.pageChannel || this.options.channel || "none",
                privilegeIds: this.privilege.ids,
                title: this.title.value,
                content: this.contentValue || "感兴趣就来联系我吧",
                cateId: this.category.cateId,
                lon: this.position.lon,
                lat: this.position.lat,
                area: this.position.localId,
                nowPrice: this.price.value,
                oriPrice: this.price.oriPrice,
                freigth: this.price.freight,
                freight: this.price.freight,
                postageExplain: this.price.postageExplain,
                pics: this.imageList.map(function(e) {
                    return e.remotePath;
                }).join("|"),
                source: 103,
                isnewlabel: this.newLabelState,
                picMd5s: "",
                business: this.position.localId,
                localId: this.position.localId,
                groupid: this.groupid,
                groupsectionid: this.groupsectionid,
                type: this.options.type || "",
                services: this.services.filter(function(e) {
                    return e.selected;
                }).map(function(e) {
                    return {
                        serviceId: e.serviceId,
                        qualitys: []
                    };
                }),
                redPacketActivityId: this.options.redPacketActivityId,
                inviteRedPacketUserId: this.options.inviteRedPacketUserId
            };
            return this.showBasicParams && (t.basicParam = this.postParams.params), Object.assign({}, e.oriInfo, t, e.extraInfo);
        }
    }, {
        key: "applyDataApi2Local",
        value: function(e) {
            this.imageList = e.pics.split("|").map(function(e) {
                return {
                    localPath: _handleImg2.default.handleSingle(e),
                    uploadState: "succeeded",
                    remotePath: e
                };
            }), this.newLabelState = e.isNewLabel, Object.assign(this.title, {
                value: e.title,
                availLen: Math.max(this.title.maxLen - e.title.length, 0)
            }), this.contentValue = e.content, Object.assign(this.category, {
                value: e.cateName,
                cateId: e.cateId
            }), Object.assign(this.circle, {
                groupsectionid: e.groupsectionid
            }), this.groupid = e.groupId || "", this.groupsectionid = e.groupSectionId, Object.assign(this.position, {
                value: e.cityName + " " + e.areaName,
                lon: e.lon,
                lat: e.lat,
                localId: e.area
            }), 0 == e.freigth && (e.freigth = ""), Object.assign(this.price, {
                value: e.nowPrice,
                oriPrice: e.oriPrice,
                freight: e.freigth,
                postageExplain: e.postageExplain
            }), this.$invoke("BaseBoard", "resetValues", {
                wishPrice: this.price.value,
                originPrice: this.price.oriPrice,
                freightPrice: this.price.freight,
                isFree: 2 == this.postageExplain
            });
        }
    }, {
        key: "saveDraft",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, r, a, i, n, o, s, c;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if ("new" == this.context) {
                            e.next = 2;
                            break;
                        }
                        return e.abrupt("return");

                      case 2:
                        if ("success" != this.postResult && "partialSucc" != this.postResult) {
                            e.next = 4;
                            break;
                        }
                        return e.abrupt("return", this.clearDraft());

                      case 4:
                        for (t = [ "imageList", "newLabelState", "title", "titleAvailLen", "content", "category", "position", "price" ], 
                        r = {}, a = !0, i = !1, n = void 0, e.prev = 9, o = t[Symbol.iterator](); !(a = (s = o.next()).done); a = !0) c = s.value, 
                        r[c] = this[c];
                        e.next = 17;
                        break;

                      case 13:
                        e.prev = 13, e.t0 = e.catch(9), i = !0, n = e.t0;

                      case 17:
                        e.prev = 17, e.prev = 18, !a && o.return && o.return();

                      case 20:
                        if (e.prev = 20, !i) {
                            e.next = 23;
                            break;
                        }
                        throw n;

                      case 23:
                        return e.finish(20);

                      case 24:
                        return e.finish(17);

                      case 25:
                        return r.imageList.forEach(function(e) {
                            "succeeded" != e.uploadState && (e.uploadState = "idle");
                        }), e.next = 28, _wxPromise.wxPromise.setStorage({
                            key: "postDraft",
                            data: r
                        });

                      case 28:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 9, 13, 17, 25 ], [ 18, , 20, 24 ] ]);
            }));
            return e;
        }()
    }, {
        key: "restoreDraft",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if ("new" == this.context) {
                            e.next = 2;
                            break;
                        }
                        return e.abrupt("return");

                      case 2:
                        return e.next = 4, _wxPromise.wxResolve.getStorage({
                            key: "postDraft"
                        });

                      case 4:
                        t = e.sent, t.succeeded && t.data && (Object.assign(this, t.data), this.$apply());

                      case 6:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "clearDraft",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, _wxPromise.wxPromise.setStorage({
                            key: "postDraft",
                            data: ""
                        });

                      case 2:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "textOverflowEllipsis",
        value: function(e, t) {
            var r = e.length;
            return e.substr(0, t) + (r > t ? "..." : "");
        }
    }, {
        key: "filterPostParams",
        value: function(e) {
            if (!Array.isArray(e)) return {};
            var t = e.map(function(e) {
                return {
                    paramId: e.paramId,
                    valueId: e.valueId
                };
            }), r = e.map(function(e) {
                return e.valueName;
            }).join("·");
            return r = this.textOverflowEllipsis(r, 16), {
                params: t,
                paramsText: r
            };
        }
    }, {
        key: "setPostParams",
        value: function(e) {
            console.log("setPostParams", e), this.postParams.params = JSON.stringify(this.filterPostParams(e).params), 
            this.postParams.paramsText = this.filterPostParams(e).paramsText, console.log(this.postParams), 
            this.$apply();
        }
    }, {
        key: "onShow",
        value: function() {
            this.rcvCrossPageFields({
                flow: "backward"
            }), this.setPostParams(_postParams2.default.params), this.$apply();
        }
    }, {
        key: "onUnload",
        value: function() {
            _pageCache2.default.cache("pages/post/post", this), this.saveDraft(), 2 == getCurrentPages().length && _routeParams2.default.setBackFromData({}, "pages/post/post"), 
            _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "onUnload", this) && _get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "onUnload", this).call(this);
        }
    }, {
        key: "onShareAppMessage",
        value: function() {
            return this.shareConfig;
        }
    } ]), t;
}(_wepy2.default.page), _applyDecoratedDescriptor(_class.prototype, "updateGood", [ _decorators.noConcurrent ], Object.getOwnPropertyDescriptor(_class.prototype, "updateGood"), _class.prototype), 
_class);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(post, "pages/post/post"));