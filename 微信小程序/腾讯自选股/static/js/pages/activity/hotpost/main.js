(function() {
    global.webpackJsonp([ 2 ], {
        155: function() {},
        156: function() {},
        160: function() {},
        164: function() {},
        168: function() {},
        170: function() {},
        174: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(88), e = c.n(d), f = c(183), g = c(0), h = g(e.a, f.a, function() {
                !1 || c(155);
            }, null, null);
            h.options.__file = "src\\components\\Header.vue", h.esModule && Object.keys(h.esModule).some(function(a) {
                return "default" !== a && "__" !== a.substr(0, 2);
            }) && console.error("named exports are not supported in *.vue files."), h.options.functional && console.error("[vue-loader] Header.vue: functional components are not supported with templates, they should use render functions."), 
            !1, b["default"] = h.exports;
        },
        175: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(89), e = c.n(d), f = c(184), g = c(0), h = g(e.a, f.a, function() {
                !1 || c(156);
            }, null, null);
            h.options.__file = "src\\components\\LikeBtn.vue", h.esModule && Object.keys(h.esModule).some(function(a) {
                return "default" !== a && "__" !== a.substr(0, 2);
            }) && console.error("named exports are not supported in *.vue files."), h.options.functional && console.error("[vue-loader] LikeBtn.vue: functional components are not supported with templates, they should use render functions."), 
            !1, b["default"] = h.exports;
        },
        179: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(93), e = c.n(d), f = c(198), g = c(0), h = g(e.a, f.a, function() {
                !1 || c(170);
            }, null, null);
            h.options.__file = "src\\components\\Swiper.vue", h.esModule && Object.keys(h.esModule).some(function(a) {
                return "default" !== a && "__" !== a.substr(0, 2);
            }) && console.error("named exports are not supported in *.vue files."), h.options.functional && console.error("[vue-loader] Swiper.vue: functional components are not supported with templates, they should use render functions."), 
            !1, b["default"] = h.exports;
        },
        180: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(95), e = c.n(d), f = c(188), g = c(0), h = g(e.a, f.a, function() {
                !1 || c(160);
            }, null, null);
            h.options.__file = "src\\components\\msgBox.vue", h.esModule && Object.keys(h.esModule).some(function(a) {
                return "default" !== a && "__" !== a.substr(0, 2);
            }) && console.error("named exports are not supported in *.vue files."), h.options.functional && console.error("[vue-loader] msgBox.vue: functional components are not supported with templates, they should use render functions."), 
            !1, b["default"] = h.exports;
        },
        182: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(97), e = c.n(d), f = c(192), g = c(0), h = g(e.a, f.a, function() {
                !1 || c(164);
            }, null, null);
            h.options.__file = "src\\components\\rule.vue", h.esModule && Object.keys(h.esModule).some(function(a) {
                return "default" !== a && "__" !== a.substr(0, 2);
            }) && console.error("named exports are not supported in *.vue files."), h.options.functional && console.error("[vue-loader] rule.vue: functional components are not supported with templates, they should use render functions."), 
            !1, b["default"] = h.exports;
        },
        183: function(a, b) {
            "use strict";
            var c = function() {
                var a = this, b = a.$createElement, c = a._self._c || b;
                return c("div", {
                    attrs: {
                        id: "hotpost-header"
                    }
                }, [ c("div", {
                    staticClass: "top"
                }, [ c("div", {
                    directives: [ {
                        name: "tap",
                        rawName: "v-tap",
                        value: {
                            methods: a.handleTapRule
                        },
                        expression: "{methods: handleTapRule}"
                    } ],
                    staticClass: "rule_btn",
                    attrs: {
                        eventid: "0"
                    },
                    on: {
                        tap: a.handleTapRule
                    }
                }, [ a._v("活动规则") ]) ]) ]);
            };
            c._withStripped = !0;
            b.a = {
                render: c,
                staticRenderFns: []
            }, !1;
        },
        184: function(a, b) {
            "use strict";
            var c = function() {
                var a = this, b = a.$createElement, c = a._self._c || b;
                return c("div", {
                    directives: [ {
                        name: "tap",
                        rawName: "v-tap",
                        value: {
                            methods: a.handleTapLike
                        },
                        expression: "{methods: handleTapLike}"
                    } ],
                    ref: "buttonWrapper",
                    staticClass: "hotpost-buttonWrapper",
                    attrs: {
                        eventid: "0"
                    },
                    on: {
                        tap: a.handleTapLike
                    }
                }, [ c("div", {
                    class: [ "plus", a.anim ]
                }, [ a._v(" +1 ") ]), a._v(" "), a.hasLiked ? c("div", {
                    class: [ "unlikeBtn", a.anim ]
                }) : c("div", {
                    class: [ "likeBtn", a.anim ]
                }) ]);
            };
            c._withStripped = !0;
            b.a = {
                render: c,
                staticRenderFns: []
            }, !1;
        },
        188: function(a, b) {
            "use strict";
            var c = function() {
                var a = this, b = a.$createElement, c = a._self._c || b;
                return c("div", {
                    ref: "boxWrapper",
                    class: [ "wrapperClass", a.msgBoxClassName ]
                }, [ c("div", {
                    class: a.boxClass
                }, [ c("div", {
                    ref: "box",
                    staticClass: "msgBox outerStyle"
                }, [ c("div", {
                    staticClass: "msgBox-container containerStyle"
                }, [ c("div", {
                    staticClass: "msgBox-title titleStyle"
                }, a._l(a.title, function(b) {
                    return c("div", [ c("div", [ a._v(a._s(b)) ]) ]);
                })), a._v(" "), c("div", {
                    staticClass: "msgBox-content contentStyle"
                }, a._l(a.content, function(b) {
                    return c("div", [ c("div", [ a._v(a._s(b)) ]) ]);
                })), a._v(" "), c("div", {
                    staticClass: "msgBox-bottom bottomStyle"
                }, [ "alert" === a.type ? c("div", {
                    staticClass: "alert"
                }, [ c("div", {
                    directives: [ {
                        name: "tap",
                        rawName: "v-tap",
                        value: {
                            methods: a.clickOk
                        },
                        expression: "{methods: clickOk}"
                    } ],
                    staticClass: "ok okStyle",
                    attrs: {
                        eventid: "0"
                    },
                    on: {
                        tap: a.clickOk
                    }
                }, [ a._v(a._s(a.okButtonText)) ]) ]) : a._e(), a._v(" "), "confirm" === a.type ? c("div", {
                    staticClass: "confirm"
                }, [ c("div", {
                    directives: [ {
                        name: "tap",
                        rawName: "v-tap",
                        value: {
                            methods: a.clickSure
                        },
                        expression: "{methods: clickSure}"
                    } ],
                    staticClass: "sure sureStyle",
                    attrs: {
                        eventid: "1"
                    },
                    on: {
                        tap: a.clickSure
                    }
                }, [ a._v(a._s(a.sureButtonText)) ]), a._v(" "), c("div", {
                    directives: [ {
                        name: "tap",
                        rawName: "v-tap",
                        value: {
                            methods: a.clickCancel
                        },
                        expression: "{methods: clickCancel}"
                    } ],
                    staticClass: "cancel cancelStyle",
                    attrs: {
                        eventid: "2"
                    },
                    on: {
                        tap: a.clickCancel
                    }
                }, [ a._v(" " + a._s(a.cancelButtonText)) ]) ]) : a._e() ]) ]) ]), a._v(" "), c("div", {
                    staticClass: "popup-mask maskStyle"
                }) ]) ]);
            };
            c._withStripped = !0;
            b.a = {
                render: c,
                staticRenderFns: []
            }, !1;
        },
        192: function(a, b) {
            "use strict";
            var c = function() {
                var a = this, b = a.$createElement, c = a._self._c || b;
                return c("div", {
                    class: a.msgBoxClassName,
                    attrs: {
                        id: "hotpost-rule"
                    }
                }, [ c("div", {
                    staticClass: "rule-mask"
                }), a._v(" "), c("div", {
                    staticClass: "rule-container"
                }, [ c("div", {
                    staticClass: "rule-title"
                }, [ a._v(a._s(a.title)) ]), a._v(" "), a._m(0) ]), a._v(" "), c("div", {
                    directives: [ {
                        name: "tap",
                        rawName: "v-tap",
                        value: {
                            methods: a.tapClose
                        },
                        expression: "{methods: tapClose}"
                    } ],
                    staticClass: "rule-close",
                    attrs: {
                        eventid: "0"
                    },
                    on: {
                        tap: a.tapClose
                    }
                }) ]);
            };
            c._withStripped = !0;
            b.a = {
                render: c,
                staticRenderFns: [ function() {
                    var a = this, b = a.$createElement, c = a._self._c || b;
                    return c("div", {
                        staticClass: "rule-content"
                    }, [ c("div", {
                        staticClass: "item"
                    }, [ a._v("截止5月31日24:00，获得点赞最多的金句，其发帖用户可获1888元现金红包，其余金句发帖用户可获得500元现金红包。") ]), a._v(" "), c("div", {
                        staticClass: "item"
                    }, [ a._v("5月和6月，自选股金句活动定期开展，每周五评选出本周金句并发放最高1888元金句红包，请持续关注。发帖路径：任意行情页-点击左下角[评论]-进入行情评论版。") ]), a._v(" "), c("div", {
                        staticClass: "item"
                    }, [ a._v("点赞或分享本页面金句的用户，有机会领取18元小红包，一共200个名额。截止5月28日在行情评论版单帖获10赞以上的用户，也可领取现金红包1个。以上请在6月1日来自选股-行情评论版-公告区查询中奖信息。") ]) ]);
                } ]
            }, !1;
        },
        196: function(a, b) {
            "use strict";
            var c = function() {
                var a = this, b = a.$createElement, c = a._self._c || b;
                return c("div", {
                    directives: [ {
                        name: "disableContextMenu",
                        rawName: "v-disableContextMenu"
                    }, {
                        name: "setGlobalStyle",
                        rawName: "v-setGlobalStyle",
                        value: a.globalStyle,
                        expression: "globalStyle"
                    } ],
                    staticClass: "container"
                }, [ a.isNative ? c("Login", {
                    ref: "Login",
                    attrs: {
                        eventid: "0",
                        mpcomid: "0"
                    },
                    on: {
                        loginSuccess: a.handleLoginSuc,
                        loginFail: a.handleLoginFail
                    }
                }) : a._e(), a._v(" "), c("Top", {
                    attrs: {
                        eventid: "1",
                        mpcomid: "1"
                    },
                    on: {
                        tapRule: a.handleTapRule
                    }
                }), a._v(" "), a.isNative ? c("SwiperNative", {
                    ref: "SwiperNative",
                    attrs: {
                        items: a.shuffledPosts,
                        eventid: "3",
                        mpcomid: "3"
                    },
                    on: {
                        tapLike: a.handleTapLike,
                        tapShare: a.handleTapShare
                    }
                }) : c("Swiper", {
                    ref: "Swiper",
                    attrs: {
                        items: a.shuffledPosts,
                        eventid: "2",
                        mpcomid: "2"
                    },
                    on: {
                        tapLike: a.handleTapLike
                    }
                }), a._v(" "), c("div", {
                    staticClass: "bottom"
                }), a._v(" "), c("Rule", {
                    ref: "ActivityRule",
                    attrs: {
                        title: "活动规则",
                        mpcomid: "4"
                    }
                }), a._v(" "), c("MsgBox", {
                    ref: "UpdateTips",
                    attrs: {
                        title: [ "提示" ],
                        content: [ "您当前的版本不支持新的转发分享", "去更新吧！体验更好的自选股" ],
                        type: "alert",
                        "box-class": "updateTipClass",
                        "button-text": {
                            ok: "立即更新"
                        },
                        eventid: "4",
                        mpcomid: "5"
                    },
                    on: {
                        ok: a.handleUpdate
                    }
                }), a._v(" "), c("MsgBox", {
                    ref: "EndTips",
                    attrs: {
                        title: [ "提示" ],
                        content: [ "活动已结束", "后续活动更精彩！" ],
                        type: "alert",
                        "box-class": "updateTipClass",
                        "button-text": {
                            ok: "我知道了"
                        },
                        mpcomid: "6"
                    }
                }), a._v(" "), c("ShareCanvas", {
                    ref: "ShareCanvas",
                    attrs: {
                        mpcomid: "7"
                    }
                }), a._v(" "), c("Loadingbar", {
                    ref: "loading",
                    attrs: {
                        mpcomid: "8"
                    }
                }) ], 1);
            };
            c._withStripped = !0;
            b.a = {
                render: c,
                staticRenderFns: []
            }, !1;
        },
        198: function(a, b) {
            "use strict";
            var c = function() {
                var a = this, b = a.$createElement, c = a._self._c || b;
                return c("div", {
                    attrs: {
                        id: "hotpost-swiper"
                    }
                }, [ c("swiper", {
                    staticClass: "wrapper",
                    attrs: {
                        duration: "500",
                        current: a.current,
                        "previous-margin": "78rpx",
                        "next-margin": "78rpx",
                        "skip-hidden-item-layout": "true",
                        eventid: "2"
                    },
                    on: {
                        change: a.changCrt
                    }
                }, a._l(a.items, function(b, d) {
                    return c("div", {
                        key: b.subject_id
                    }, [ c("swiper-item", {
                        staticClass: "swiper-item",
                        attrs: {
                            mpcomid: "2-" + d
                        }
                    }, [ c("div", {
                        staticClass: "li"
                    }, [ c("div", {
                        class: [ "card", d === a.current ? "expand" : "", d === a.prev ? "shrink" : "" ]
                    }, [ c("div", {
                        staticClass: "box"
                    }, [ c("div", {
                        staticClass: "pic"
                    }, [ c("image", {
                        staticClass: "image",
                        attrs: {
                            mode: "aspectFill",
                            src: b.image_url
                        }
                    }), a._v(" "), c("div", {
                        staticClass: "content"
                    }, [ c("CardContent", {
                        attrs: {
                            content: b.content,
                            mpcomid: "0-" + d
                        }
                    }) ], 1) ]), a._v(" "), c("div", {
                        staticClass: "info"
                    }, [ c("div", [ c("img", {
                        staticClass: "user-head-img",
                        attrs: {
                            src: b.user_image
                        }
                    }) ]), a._v(" "), c("div", {
                        staticClass: "user-name"
                    }, [ a._v(a._s(b.user_name)) ]), a._v(" "), c("div", {
                        staticClass: "post-info"
                    }, [ c("span", [ a._v(a._s(b.created_at)) ]), a._v(" 发表于"), c("span", {
                        staticClass: "bk",
                        attrs: {
                            "data-id": b.stock_id,
                            "data-name": b.stock_name,
                            eventid: "0-" + d
                        },
                        on: {
                            tap: a.handleNavigateStock
                        }
                    }, [ a._v("#" + a._s(b.stock_name) + "#") ]) ]), a._v(" "), c("div", {
                        staticClass: "like-info"
                    }, [ c("div", {
                        staticClass: "support"
                    }, [ a._v(a._s(b.like_num) + "人喜欢") ]), a._v(" "), c("div", {
                        staticClass: "button"
                    }, [ c("LikeBtn", {
                        attrs: {
                            item: b,
                            eventid: "1-" + d,
                            mpcomid: "1-" + d
                        },
                        on: {
                            tapBtn: a.handleTapLike
                        }
                    }) ], 1) ]) ]) ]) ]) ]) ]) ], 1);
                })), a._v(" "), a.items.length ? c("div", {
                    staticClass: "pageNum"
                }, [ c("span", {
                    staticClass: "curPage"
                }, [ a._v(a._s(a.current + 1)) ]), c("span", {
                    staticClass: "slash"
                }, [ a._v("-") ]), a._v(a._s(a.items.length)) ]) : a._e() ], 1);
            };
            c._withStripped = !0;
            b.a = {
                render: c,
                staticRenderFns: []
            }, !1;
        },
        73: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(99), e = c.n(d), f = c(196), g = c(0), h = g(e.a, f.a, function() {
                !1 || c(168);
            }, null, null);
            h.options.__file = "src\\pages\\activity\\hotpost\\index.vue", h.esModule && Object.keys(h.esModule).some(function(a) {
                return "default" !== a && "__" !== a.substr(0, 2);
            }) && console.error("named exports are not supported in *.vue files."), h.options.functional && console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."), 
            !1, b["default"] = h.exports;
        },
        78: function(a, b, c) {
            "use strict";
            function d(a) {
                return a && a.__esModule ? a : {
                    default: a
                };
            }
            var e = c(5), f = d(e), g = c(73), h = d(g);
            var i = new f.default(h.default);
            i.$mount("#app");
        },
        79: function(a, b, c) {
            "use strict";
            function d(a) {
                return a && a.__esModule ? a : {
                    default: a
                };
            }
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var e = c(30), f = d(e), g = c(5), h = d(g), i = c(70), j = d(i), k = c(19), l = c(18), m = d(l), n = c(28), o = d(n);
            console.log(m.default), h.default.use(j.default);
            var p = new j.default.Store({
                state: {
                    posts: [],
                    shuffledPosts: [],
                    hasEnd: null,
                    checkWxUserInfo: null
                },
                mutations: {
                    checkUserinfo: function(a) {
                        m.default.checkWxUserInfo().then(function(b) {
                            b && (a.checkWxUserInfo = !0);
                        });
                    },
                    getPosts: function(a, b) {
                        var c = o.default.getHost("getRssDetail");
                        m.default.getData(c, b).then(function(b) {
                            a.hasEnd = b.isEnd, b = b.data;
                            var c = [];
                            if (a.shuffledPosts && a.shuffledPosts.length) a.shuffledPosts.forEach(function(a) {
                                var c = b[a.subject_id];
                                a.like_id = c.like_id, ++a.has_update;
                            }); else {
                                for (var d in b) if ("object" === (0, f.default)(b[d])) {
                                    c.push(b[d]);
                                    var e = c[c.length - 1];
                                    e.created_at = e.created_at.slice(0, 10).replace(/-/g, "."), e.content = (0, k.formatContent)(e.content), 
                                    e.has_update = 0, e.user_image = e.user_image.replace(/http:\/\//g, "https://"), 
                                    e.image_url = e.image_url.replace(/http:\/\//g, "https://");
                                }
                                a.posts = c, a.shuffledPosts = (0, k.shuffle)(a.posts);
                            }
                        }).catch(function(a) {
                            console.log(a);
                        });
                    },
                    like: function(a, b) {
                        var c = o.default.getHost("putRssLike");
                        m.default.postData(c, b).then(function() {
                            a.checkWxUserInfo = !0, a.shuffledPosts.forEach(function(a) {
                                a.subject_id === b.publish_id && (a.like_id = !a.like_id, a.like_num = a.like_id ? a.like_num + 1 : a.like_num - 1);
                            });
                        }).catch(function(a) {
                            console.log(a);
                        });
                    }
                }
            });
            b.default = p;
        },
        88: function(a, b) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            }), b.default = {
                methods: {
                    handleTapRule: function() {
                        this.$emit("tapRule");
                    }
                }
            };
        },
        89: function(a, b) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var c;
            b.default = {
                props: [ "item" ],
                data: function() {
                    return {
                        anim: "",
                        hasLiked: !1
                    };
                },
                watch: {
                    "item.like_id": function(a) {
                        this.hasLiked = a, this.anim = "";
                    },
                    "item.has_update": function() {
                        this.reset();
                    }
                },
                methods: {
                    handleTapLike: function() {
                        if (!c) {
                            if (this.$emit("tapBtn", this.item), !this.$parent.$parent.hasUserInfo) return;
                            this.animate(), c = setTimeout(function() {
                                c = null;
                            }, 500);
                        }
                    },
                    animate: function() {
                        this.hasLiked = !this.hasLiked, this.anim = this.hasLiked ? "likeAnim" : "unlikeAnim";
                    },
                    reset: function() {
                        this.hasLiked = this.item.like_id, this.anim = "";
                    }
                },
                mounted: function() {
                    this.hasLiked = this.item.like_id;
                }
            };
        },
        93: function(a, b, c) {
            "use strict";
            function d(a) {
                return a && a.__esModule ? a : {
                    default: a
                };
            }
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var e = c(175), f = d(e), g = c(68), h = d(g);
            b.default = {
                data: function() {
                    return {
                        current: 0,
                        prev: -1
                    };
                },
                components: {
                    LikeBtn: f.default,
                    CardContent: h.default
                },
                props: [ "items" ],
                methods: {
                    handleTapLike: function(a) {
                        this.$emit("tapLike", a);
                    },
                    changCrt: function(a) {
                        "touch" === a.mp.detail.source && (this.prev = this.current, this.current = a.mp.detail.current);
                    },
                    reset: function() {
                        console.log("reset"), this.current = 0, this.prev = -1;
                    },
                    handleNavigateStock: function(a) {
                        if (a && a.target && a.target.dataset.id) {
                            var b = a.target.dataset, c = b.id, d = b.name;
                            wx.navigateTo({
                                url: "/pages/quote/quote?symbol=" + c + "&name=" + d
                            });
                        }
                    }
                }
            };
        },
        95: function(a, b) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            }), b.default = {
                props: [ "title", "content", "boxClass", "type", "buttonText" ],
                data: function() {
                    var a = this.buttonText;
                    return {
                        msgBoxClassName: "hide",
                        okButtonText: a && a.ok || "我知道了",
                        sureButtonText: a && a.sure || "确定",
                        cancelButtonText: a && a.cancel || "取消",
                        top: 0
                    };
                },
                mounted: function() {},
                methods: {
                    hide: function() {
                        this.msgBoxClassName = "hide";
                    },
                    show: function() {
                        this.msgBoxClassName = "show";
                    },
                    clickOk: function() {
                        this.msgBoxClassName = "hide", this.$emit("ok");
                    },
                    clickSure: function() {
                        this.msgBoxClassName = "hide", this.$emit("sure");
                    },
                    clickCancel: function() {
                        this.msgBoxClassName = "hide", this.$emit("cancel");
                    }
                }
            };
        },
        97: function(a, b) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            }), b.default = {
                props: [ "title" ],
                data: function() {
                    return {
                        msgBoxClassName: "hidden"
                    };
                },
                methods: {
                    show: function() {
                        this.msgBoxClassName = "show";
                    },
                    tapClose: function() {
                        this.msgBoxClassName = "hidden";
                    }
                },
                mounted: function() {}
            };
        },
        99: function(a, b, c) {
            "use strict";
            function d(a) {
                return a && a.__esModule ? a : {
                    default: a
                };
            }
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var e, f, g, h, i, j = c(79), k = d(j), l = c(174), m = d(l), n = c(180), o = d(n), p = c(179), q = d(p), r = c(182), s = d(r), t = c(69), u = d(t), v = c(19), w = c(18), x = d(w);
            !1, b.default = {
                data: function() {
                    return {
                        schedule_id: "best_publish_6",
                        isNative: !1,
                        hasLogin: !1,
                        hasUserInfo: !1,
                        globalStyle: {
                            title: "社区热议，股民金句走一波",
                            backgroundColor: "#d0c1aa",
                            enableBounce: "no"
                        }
                    };
                },
                computed: {
                    checkUserinfo: function() {
                        var a = k.default.state.checkWxUserInfo;
                        return a && !this.hasUserInfo && (this.hasUserInfo = !0), a;
                    },
                    shuffledPosts: function() {
                        var a = k.default.state.shuffledPosts;
                        return a && a.length && this.$refs.loading.hide(), a;
                    },
                    hasEnd: function() {
                        return console.log("hasEnd", k.default.state.hasEnd), k.default.state.hasEnd;
                    }
                },
                components: {
                    Top: m.default,
                    Swiper: q.default,
                    SwiperNative: g,
                    MsgBox: o.default,
                    Login: f,
                    ShareCanvas: e,
                    Rule: s.default,
                    Loadingbar: u.default
                },
                directives: {
                    disableContextMenu: h,
                    setGlobalStyle: i
                },
                watch: {
                    shuffledPosts: function(a, b) {
                        !this.isNative && a.length && 0 === b.length && this.reportAction("user_login_miniprogram");
                    }
                },
                methods: {
                    reportAction: function(a) {
                        x.default.sendReport({
                            fsop: a
                        });
                    },
                    handleTapRule: function() {
                        console.log("tap rule"), this.$refs.ActivityRule.show();
                    },
                    handleUpdate: function() {
                        var a = /\bAndroid([^;]+)/.test(navigator.userAgent);
                        if (this.reportAction("user_update_app"), a) {
                            window.location.href = "http://stockapp.finance.qq.com/apk/index.php?num=" + 2900;
                        } else window.location.href = "http://ifzq.gtimg.cn/appstock/app/appd/";
                    },
                    handleTapLike: function(a) {
                        var b = a.subject_id, c = a.like_id;
                        if (this.reportAction("user_tap_like"), this.isNative) {
                            var d = this.$refs.Login.loginInfo;
                            d ? (this.hasEnd && this.$refs.EndTips.show(), k.default.commit("like", {
                                publish_id: b,
                                attitude: c ? 0 : -1,
                                userInfo: d
                            })) : this.hasEnd ? this.$refs.EndTips.show() : this.$refs.Login.login(!0);
                        } else this.hasEnd && this.$refs.EndTips.show(), k.default.commit("like", {
                            publish_id: b,
                            attitude: c ? 0 : -1
                        });
                    },
                    handleTapShare: function(a) {
                        var b = this, c = this.$refs.Login.clientInfo, d = c.appver;
                        ">" === (0, v.compareVer)(d, "5.13.0") ? (this.reportAction("user_tap_share"), this.$refs.loading.show(), 
                        this.$refs.ShareCanvas.share(a).then(function(a) {
                            console.log("hide loading", a), b.$refs.loading.hide();
                        })) : this.$refs.UpdateTips.show();
                    },
                    handleLoginSuc: function(a) {
                        this.hasLogin = !0, k.default.commit("getPosts", {
                            schedule_id: this.schedule_id,
                            userInfo: a.loginInfo
                        });
                        var b = a.loginInfo;
                        x.default.setReportCommonParams({
                            fuser_id: b.uin || b.luin || b.openid
                        }), this.reportAction("user_login_success");
                    },
                    handleLoginFail: function() {
                        this.shuffledPosts && this.shuffledPosts.length || k.default.commit("getPosts", {
                            schedule_id: this.schedule_id
                        }), this.reportAction("user_login_fail");
                    }
                },
                beforeMount: function() {
                    x.default.setReportCommonParams({
                        fproduct_id: 10012,
                        fchannel_id: "hotpost",
                        fplat_form: this.isNative ? "app" : "miniprogram",
                        fdm: this.isNative ? encodeURIComponent("relay.finance.qq.com") : "",
                        furl: this.isNative ? encodeURIComponent("relay.finance.qq.com/stockhtm/activity/hotPost2/index.html") : "",
                        fscene: this.isNative ? "" : getApp().config && getApp().config.scene
                    }), this.reportAction(this.isNative ? "enter_hotpost_h5" : "enter_hotpost_miniprogram"), 
                    k.default.commit("getPosts", {
                        schedule_id: this.schedule_id
                    });
                },
                mounted: function() {
                    var a = this;
                    this.$children.forEach(function(b) {
                        var c = b.$vnode.data.ref;
                        c && (a.$refs[c] = b);
                    }), !1, this.shuffledPosts && this.shuffledPosts.length || this.$refs.loading.show();
                },
                onUnload: function() {
                    this.$refs.Swiper.reset();
                },
                onShow: function() {
                    k.default.commit("checkUserinfo"), this.shuffledPosts && this.shuffledPosts.length || k.default.commit("getPosts", {
                        schedule_id: this.schedule_id
                    });
                },
                onShareAppMessage: function() {
                    return {
                        title: "社区热议，股民金句走一波",
                        path: "/pages/activity/hotpost/main",
                        imageUrl: "http://mat1.gtimg.com/finance/images/stock/p/activity/c1d4f8f4331ecdd5.png"
                    };
                }
            };
        }
    }, [ 78 ]);
})();