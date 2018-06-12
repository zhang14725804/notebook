(function() {
    global.webpackJsonp([ 3 ], {
        100: function(a, b) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            }), b.default = {
                data: function() {
                    return {};
                },
                methods: {
                    handleGetUserInfo: function() {
                        wx.navigateBack();
                    }
                }
            };
        },
        162: function() {},
        187: function(a, b) {
            "use strict";
            var c = function() {
                var a = this, b = a.$createElement, c = a._self._c || b;
                return c("div", {
                    staticClass: "wxLogin"
                }, [ c("button", {
                    staticClass: "button",
                    attrs: {
                        "open-type": "getUserInfo",
                        eventid: "0"
                    },
                    on: {
                        getuserinfo: a.handleGetUserInfo
                    }
                }, [ a._v("微信登陆") ]) ], 1);
            };
            c._withStripped = !0;
            b.a = {
                render: c,
                staticRenderFns: []
            }, !1;
        },
        76: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(100), e = c.n(d), f = c(187), g = c(0), h = g(e.a, f.a, function() {
                !1 || c(162);
            }, null, null);
            h.options.__file = "src\\pages\\auth\\index.vue", h.esModule && Object.keys(h.esModule).some(function(a) {
                return "default" !== a && "__" !== a.substr(0, 2);
            }) && console.error("named exports are not supported in *.vue files."), h.options.functional && console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."), 
            !1, b["default"] = h.exports;
        },
        81: function(a, b, c) {
            "use strict";
            function d(a) {
                return a && a.__esModule ? a : {
                    default: a
                };
            }
            var e = c(5), f = d(e), g = c(76), h = d(g);
            var i = new f.default(h.default);
            i.$mount("#app");
        }
    }, [ 81 ]);
})();