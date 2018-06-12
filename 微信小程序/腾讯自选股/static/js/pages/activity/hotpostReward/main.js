(function() {
    global.webpackJsonp([ 1 ], {
        158: function() {},
        161: function() {},
        163: function() {},
        165: function() {},
        166: function() {},
        167: function() {},
        169: function() {},
        172: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(86), e = c.n(d), f = c(195), g = c(0), h = g(e.a, f.a, function() {
                !1 || c(167);
            }, null, null);
            h.options.__file = "src\\components\\CommonReward.vue", h.esModule && Object.keys(h.esModule).some(function(a) {
                return "default" !== a && "__" !== a.substr(0, 2);
            }) && console.error("named exports are not supported in *.vue files."), h.options.functional && console.error("[vue-loader] CommonReward.vue: functional components are not supported with templates, they should use render functions."), 
            !1, b["default"] = h.exports;
        },
        173: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(87), e = c.n(d), f = c(186), g = c(0), h = g(e.a, f.a, function() {
                !1 || c(158);
            }, null, null);
            h.options.__file = "src\\components\\GoldReward.vue", h.esModule && Object.keys(h.esModule).some(function(a) {
                return "default" !== a && "__" !== a.substr(0, 2);
            }) && console.error("named exports are not supported in *.vue files."), h.options.functional && console.error("[vue-loader] GoldReward.vue: functional components are not supported with templates, they should use render functions."), 
            !1, b["default"] = h.exports;
        },
        176: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(90), e = c.n(d), f = c(191), g = c(0), h = g(e.a, f.a, function() {
                !1 || c(163);
            }, null, null);
            h.options.__file = "src\\components\\NoReward.vue", h.esModule && Object.keys(h.esModule).some(function(a) {
                return "default" !== a && "__" !== a.substr(0, 2);
            }) && console.error("named exports are not supported in *.vue files."), h.options.functional && console.error("[vue-loader] NoReward.vue: functional components are not supported with templates, they should use render functions."), 
            !1, b["default"] = h.exports;
        },
        177: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(91), e = c.n(d), f = c(194), g = c(0), h = g(e.a, f.a, function() {
                !1 || c(166);
            }, null, null);
            h.options.__file = "src\\components\\NotLogin.vue", h.esModule && Object.keys(h.esModule).some(function(a) {
                return "default" !== a && "__" !== a.substr(0, 2);
            }) && console.error("named exports are not supported in *.vue files."), h.options.functional && console.error("[vue-loader] NotLogin.vue: functional components are not supported with templates, they should use render functions."), 
            !1, b["default"] = h.exports;
        },
        178: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(92), e = c.n(d), f = c(197), g = c(0), h = g(e.a, f.a, function() {
                !1 || c(169);
            }, null, null);
            h.options.__file = "src\\components\\RewardHead.vue", h.esModule && Object.keys(h.esModule).some(function(a) {
                return "default" !== a && "__" !== a.substr(0, 2);
            }) && console.error("named exports are not supported in *.vue files."), h.options.functional && console.error("[vue-loader] RewardHead.vue: functional components are not supported with templates, they should use render functions."), 
            !1, b["default"] = h.exports;
        },
        181: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(96), e = c.n(d), f = c(193), g = c(0), h = g(e.a, f.a, function() {
                !1 || c(165);
            }, null, null);
            h.options.__file = "src\\components\\rewardRule.vue", h.esModule && Object.keys(h.esModule).some(function(a) {
                return "default" !== a && "__" !== a.substr(0, 2);
            }) && console.error("named exports are not supported in *.vue files."), h.options.functional && console.error("[vue-loader] rewardRule.vue: functional components are not supported with templates, they should use render functions."), 
            !1, b["default"] = h.exports;
        },
        186: function(a, b) {
            "use strict";
            var c = function() {
                var a = this, b = a.$createElement, c = a._self._c || b;
                return c("div", {
                    staticClass: "goldReward"
                }, [ c("div", {
                    staticClass: "card"
                }, [ c("div", {
                    staticClass: "pic"
                }, [ c("img", {
                    staticClass: "image",
                    attrs: {
                        mode: "aspectFill",
                        src: a.reward.detail.image_url
                    }
                }), a._v(" "), c("div", {
                    staticClass: "content"
                }, [ c("CardContent", {
                    attrs: {
                        content: a.reward.detail.content,
                        mpcomid: "0"
                    }
                }) ], 1) ]), a._v(" "), c("div", {
                    staticClass: "info"
                }, [ c("div", [ c("img", {
                    staticClass: "user-head-img",
                    attrs: {
                        src: a.reward.user_image
                    }
                }) ]), a._v(" "), c("div", {
                    staticClass: "user-name"
                }, [ a._v(a._s(a.reward.user_name)) ]), a._v(" "), c("div", {
                    staticClass: "post-info"
                }, [ c("span", [ a._v(a._s(a.reward.detail.created_at)) ]), a._v(" 发表于"), c("span", {
                    directives: [ {
                        name: "tap",
                        rawName: "v-tap",
                        value: {
                            methods: a.handleNavigateStock
                        },
                        expression: "{methods: handleNavigateStock}"
                    } ],
                    staticClass: "bk",
                    attrs: {
                        eventid: "0"
                    },
                    on: {
                        tap: a.handleNavigateStock
                    }
                }, [ a._v("#" + a._s(a.reward.detail.stock_name) + "#") ]) ]), a._v(" "), c("div", {
                    staticClass: "reward-text-h1 gold-h1"
                }, [ c("div", {
                    staticClass: "reward-text-h1-border"
                }), a._v(" "), c("div", {
                    staticClass: "reward-text-h1-container"
                }, [ c("div", {
                    staticClass: "left"
                }), c("div", {
                    staticClass: "text"
                }, [ a._v("金句奖" + a._s(a.reward.prize) + "元") ]), c("div", {
                    staticClass: "right"
                }) ]), a._v(" "), c("div", {
                    staticClass: "reward-text-h1-border"
                }) ]), a._v(" "), c("div", {
                    staticClass: "like-info"
                }, [ c("div", {
                    staticClass: "support"
                }, [ a._v(a._s(a.reward.detail.like_num) + "人点赞") ]), a._v(" "), c("div", {
                    staticClass: "like-heart"
                }) ]) ]) ]) ]);
            };
            c._withStripped = !0;
            b.a = {
                render: c,
                staticRenderFns: []
            }, !1;
        },
        189: function(a, b) {
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
                }), a._v(" "), a.notLogin ? c("NotLogin", {
                    attrs: {
                        mpcomid: "2"
                    }
                }) : a._e(), a._v(" "), a.rewardData && ("no" === a.rewardData.type || "expired" === a.rewardData.type) ? c("NoReward", {
                    attrs: {
                        reward: a.rewardData,
                        mpcomid: "3"
                    }
                }) : a._e(), a._v(" "), a.rewardData && "common" === a.rewardData.type ? c("CommonReward", {
                    attrs: {
                        reward: a.rewardData,
                        mpcomid: "4"
                    }
                }) : a._e(), a._v(" "), a.rewardData && "gold" === a.rewardData.type ? c("GoldReward", {
                    attrs: {
                        reward: a.rewardData,
                        mpcomid: "5"
                    }
                }) : a._e(), a._v(" "), c("div", {
                    staticClass: "bottom"
                }), a._v(" "), c("Rule", {
                    ref: "ActivityRule",
                    attrs: {
                        title: "领取说明",
                        mpcomid: "6"
                    }
                }), a._v(" "), c("Loadingbar", {
                    ref: "loading",
                    attrs: {
                        mpcomid: "7"
                    }
                }) ], 1);
            };
            c._withStripped = !0;
            b.a = {
                render: c,
                staticRenderFns: []
            }, !1;
        },
        191: function(a, b) {
            "use strict";
            var c = function() {
                var a = this, b = a.$createElement, c = a._self._c || b;
                return c("div", {
                    staticClass: "noReward card-bg"
                }, [ c("div", {
                    staticClass: "user-info"
                }, [ c("div", {
                    staticClass: "user-img"
                }, [ c("img", {
                    staticClass: "image",
                    attrs: {
                        src: a.reward.user_image
                    }
                }) ]), a._v(" "), c("div", {
                    staticClass: "user-name"
                }, [ a._v(a._s(a.reward.user_name)) ]) ]), a._v(" "), a._m(0), a._v(" "), "no" === a.reward.type ? c("div", {
                    staticClass: "reward-text-h2"
                }, [ c("div", {
                    staticClass: "p"
                }, [ a._v("很遗憾您未中奖") ]), a._v(" "), c("div", {
                    staticClass: "p"
                }, [ a._v("别灰心，后续活动更精彩") ]) ]) : a._e(), a._v(" "), "expired" === a.reward.type ? c("div", {
                    staticClass: "reward-text-h2"
                }, [ c("div", {
                    staticClass: "p"
                }, [ a._v("领奖已过期！") ]), a._v(" "), c("div", {
                    staticClass: "p"
                }, [ a._v("别灰心，后续活动更精彩") ]) ]) : a._e() ]);
            };
            c._withStripped = !0;
            b.a = {
                render: c,
                staticRenderFns: [ function() {
                    var a = this, b = a.$createElement, c = a._self._c || b;
                    return c("div", {
                        staticClass: "reward-text-h1"
                    }, [ c("div", {
                        staticClass: "reward-text-h1-border"
                    }), a._v(" "), c("div", {
                        staticClass: "reward-text-h1-container"
                    }, [ c("div", {
                        staticClass: "left"
                    }), c("div", {
                        staticClass: "text"
                    }, [ a._v("感谢参与") ]), c("div", {
                        staticClass: "right"
                    }) ]), a._v(" "), c("div", {
                        staticClass: "reward-text-h1-border"
                    }) ]);
                } ]
            }, !1;
        },
        193: function(a, b) {
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
                    }, [ a._v("6月1日-6月4日12:00，用户可在本页面查询中奖信息，过期未查询视为放弃领奖机会。") ]), a._v(" "), c("div", {
                        staticClass: "item"
                    }, [ a._v("红包现金将在7个工作日内直接发放到微信钱包或QQ钱包，取决于用户使用哪个账号登录自选股。请务必确认已开通相应的钱包实名认证功能，如未实名奖金无法到账。") ]) ]);
                } ]
            }, !1;
        },
        194: function(a, b) {
            "use strict";
            var c = function() {
                var a = this, b = a.$createElement, c = a._self._c || b;
                return c("div", {
                    staticClass: "notLogin card-bg"
                }, [ a._m(0), a._v(" "), a._m(1), a._v(" "), c("div", {
                    staticClass: "reward-text-h2"
                }, [ c("p", [ a._v("请登录查看抽奖结果~") ]) ], 1) ]);
            };
            c._withStripped = !0;
            b.a = {
                render: c,
                staticRenderFns: [ function() {
                    var a = this, b = a.$createElement, c = a._self._c || b;
                    return c("div", {
                        staticClass: "user-info"
                    }, [ c("div", {
                        staticClass: "user-img"
                    }, [ c("img", {
                        staticClass: "image",
                        attrs: {
                            src: "https://mat1.gtimg.com/finance/images/stock/p/unknown/15d3eb45fc7cf3a4.png"
                        }
                    }) ]) ]);
                }, function() {
                    var a = this, b = a.$createElement, c = a._self._c || b;
                    return c("div", {
                        staticClass: "reward-text-h1"
                    }, [ c("div", {
                        staticClass: "reward-text-h1-border"
                    }), a._v(" "), c("div", {
                        staticClass: "reward-text-h1-container"
                    }, [ c("div", {
                        staticClass: "left"
                    }), c("div", {
                        staticClass: "text"
                    }, [ a._v("未登录") ]), c("div", {
                        staticClass: "right"
                    }) ]), a._v(" "), c("div", {
                        staticClass: "reward-text-h1-border"
                    }) ]);
                } ]
            }, !1;
        },
        195: function(a, b) {
            "use strict";
            var c = function() {
                var a = this, b = a.$createElement, c = a._self._c || b;
                return c("div", {
                    staticClass: "commonReward card-bg"
                }, [ c("div", {
                    staticClass: "user-info"
                }, [ c("div", {
                    staticClass: "user-img"
                }, [ c("img", {
                    staticClass: "image",
                    attrs: {
                        src: a.reward.user_image
                    }
                }) ]), a._v(" "), c("div", {
                    staticClass: "user-name"
                }, [ a._v(a._s(a.reward.user_name)) ]) ]), a._v(" "), a._m(0), a._v(" "), c("div", {
                    staticClass: "reward-prize"
                }, [ c("span", {
                    staticClass: "num"
                }, [ a._v(a._s(a.reward.prize)) ]), c("span", {
                    staticClass: "yuan"
                }, [ a._v("元") ]) ]), a._v(" "), a._m(1) ]);
            };
            c._withStripped = !0;
            b.a = {
                render: c,
                staticRenderFns: [ function() {
                    var a = this, b = a.$createElement, c = a._self._c || b;
                    return c("div", {
                        staticClass: "reward-text-h1 common-h1"
                    }, [ c("div", {
                        staticClass: "reward-text-h1-container"
                    }, [ c("div", {
                        staticClass: "left"
                    }), c("div", {
                        staticClass: "text"
                    }, [ a._v("恭喜您获得") ]), c("div", {
                        staticClass: "right"
                    }) ]) ]);
                }, function() {
                    var a = this, b = a.$createElement, c = a._self._c || b;
                    return c("div", {
                        staticClass: "reward-text-h2 common-h2"
                    }, [ c("div", {
                        staticClass: "p"
                    }, [ a._v("感谢投票支持金句活动") ]), a._v(" "), c("div", {
                        staticClass: "p"
                    }, [ a._v("请继续互动发言，后续活动更精彩") ]) ]);
                } ]
            }, !1;
        },
        197: function(a, b) {
            "use strict";
            var c = function() {
                var a = this, b = a.$createElement, c = a._self._c || b;
                return c("div", {
                    attrs: {
                        id: "hotpost-reward-header"
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
                }, [ a._v("领取说明") ]) ]), a._v(" "), c("div", {
                    staticClass: "title"
                }) ]);
            };
            c._withStripped = !0;
            b.a = {
                render: c,
                staticRenderFns: []
            }, !1;
        },
        72: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(98), e = c.n(d), f = c(189), g = c(0), h = g(e.a, f.a, function() {
                !1 || c(161);
            }, null, null);
            h.options.__file = "src\\pages\\activity\\hotpostReward\\index.vue", h.esModule && Object.keys(h.esModule).some(function(a) {
                return "default" !== a && "__" !== a.substr(0, 2);
            }) && console.error("named exports are not supported in *.vue files."), h.options.functional && console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."), 
            !1, b["default"] = h.exports;
        },
        76: function(a, b, c) {
            "use strict";
            function d(a) {
                return a && a.__esModule ? a : {
                    default: a
                };
            }
            var e = c(5), f = d(e), g = c(72), h = d(g);
            var i = new f.default(h.default);
            i.$mount("#app");
        },
        77: function(a, b, c) {
            "use strict";
            function d(a) {
                return a && a.__esModule ? a : {
                    default: a
                };
            }
            function e(a) {
                return {
                    user_name: a.nickname,
                    user_image: a.headimgurl.replace(/http:\/\//g, "https://")
                };
            }
            function f(a) {
                return a && a.created_at ? {
                    image_url: a.image_url.replace(/http:\/\//g, "https://"),
                    content: (0, o.formatContent)(a.content),
                    created_at: a.created_at.slice(0, 10).replace(/-/g, "."),
                    stock_id: a.stock_id,
                    stock_name: a.stock_name,
                    like_num: a.like_num
                } : null;
            }
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var g = c(5), h = d(g), i = c(70), j = d(i), k = c(18), l = d(k), m = c(28), n = d(m), o = c(19);
            h.default.use(j.default);
            var p = new j.default.Store({
                state: {
                    reward: null,
                    hasEnd: 0
                },
                mutations: {
                    getReward: function(a, b) {
                        var c = n.default.getHost("getReward");
                        l.default.getData(c, b).then(function(b) {
                            console.log(b), a.hasEnd = b.isEnd;
                            var c, d, g = e(b), h = g.user_name, i = g.user_image, j = f(b.subject);
                            "no" === b.data ? (c = 0, d = "no") : "expired" === b.data ? (c = 0, d = "expired") : (c = b.data, 
                            d = j ? "gold" : "common"), a.reward = {
                                user_name: h,
                                user_image: i,
                                detail: j,
                                prize: c,
                                type: d
                            };
                        }).catch(function(a) {
                            console.log(a);
                        });
                    }
                }
            });
            b.default = p;
        },
        86: function(a, b) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            }), b.default = {
                props: [ "reward" ],
                methods: {}
            };
        },
        87: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(68), e = function(a) {
                return a && a.__esModule ? a : {
                    default: a
                };
            }(d);
            b.default = {
                props: [ "reward" ],
                components: {
                    CardContent: e.default
                },
                methods: {
                    handleNavigateStock: function() {
                        var a = this.reward.detail.stock_id, b = this.reward.detail.stock_name;
                        wx.navigateTo({
                            url: "/pages/quote/quote?symbol=" + a + "&name=" + b
                        });
                    }
                }
            };
        },
        90: function(a, b) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            }), b.default = {
                props: [ "reward" ]
            };
        },
        91: function(a, b) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            }), b.default = {};
        },
        92: function(a, b) {
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
        96: function(a, b) {
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
        98: function(a, b, c) {
            "use strict";
            function d(a) {
                return a && a.__esModule ? a : {
                    default: a
                };
            }
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var e, f, g, h = c(77), i = d(h), j = c(178), k = d(j), l = c(181), m = d(l), n = c(69), o = d(n), p = c(177), q = d(p), r = c(176), s = d(r), t = c(172), u = d(t), v = c(173), w = d(v), x = c(18), y = d(x), z = !0;
            !1, b.default = {
                data: function() {
                    return {
                        schedule_id: "best_publish_6",
                        isNative: !1,
                        hasLogin: !1,
                        notLogin: !1,
                        globalStyle: {
                            title: "金句活动领奖页",
                            backgroundColor: "#d0c1aa",
                            enableBounce: "no"
                        }
                    };
                },
                watch: {
                    rewardData: function(a, b) {
                        this.isNative || !a || b || this.reportAction("user_login_miniprogram");
                    }
                },
                computed: {
                    rewardData: function() {
                        var a = i.default.state.reward;
                        return a && this.$refs.loading.hide(), a;
                    }
                },
                components: {
                    Top: k.default,
                    Login: e,
                    Rule: m.default,
                    Loadingbar: o.default,
                    NotLogin: q.default,
                    GoldReward: w.default,
                    CommonReward: u.default,
                    NoReward: s.default
                },
                directives: {
                    disableContextMenu: f,
                    setGlobalStyle: g
                },
                methods: {
                    reportAction: function(a) {
                        y.default.sendReport({
                            fsop: a
                        });
                    },
                    handleTapRule: function() {
                        console.log("tap rule"), this.$refs.ActivityRule.show();
                    },
                    handleLoginSuc: function(a) {
                        this.hasLogin = !0, this.notLogin = !1, i.default.commit("getReward", {
                            schedule_id: this.schedule_id,
                            userInfo: a.loginInfo
                        }), y.default.setReportCommonParams({
                            fuser_id: a.loginInfo.uin || a.loginInfo.luin || a.loginInfo.openid
                        }), this.reportAction("user_login_success");
                    },
                    handleLoginFail: function() {
                        this.$refs.loading.hide(), this.notLogin = !0, z && (this.$refs.Login.login(!0), 
                        z = !1), this.reportAction("user_login_fail");
                    }
                },
                beforeMount: function() {
                    i.default.commit("getReward", {
                        schedule_id: this.schedule_id
                    }), y.default.setReportCommonParams({
                        fproduct_id: 10012,
                        fchannel_id: "hotpost_reward",
                        fplat_form: this.isNative ? "app" : "miniprogram",
                        fdm: this.isNative ? encodeURIComponent("relay.finance.qq.com") : "",
                        furl: this.isNative ? encodeURIComponent("relay.finance.qq.com/stockhtm/activity/hotPost2/reward.html") : "",
                        fscene: this.isNative ? "" : getApp().config && getApp().config.scene
                    }), this.reportAction(this.isNative ? "enter_hotpostReward_h5" : "enter_hotpostReward_miniprogram");
                },
                mounted: function() {
                    var a = this;
                    this.$children.forEach(function(b) {
                        var c = b.$vnode.data.ref;
                        c && (a.$refs[c] = b);
                    }), !1, this.rewardData || this.$refs.loading.show();
                }
            };
        }
    }, [ 76 ]);
})();