(function() {
    global.webpackJsonp([ 4 ], {
        171: function() {},
        71: function(a, b, c) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var d = c(84), e = c.n(d), f = c(0), g = f(e.a, null, function() {
                !1 || c(171);
            }, null, null);
            g.options.__file = "src\\App.vue", g.esModule && Object.keys(g.esModule).some(function(a) {
                return "default" !== a && "__" !== a.substr(0, 2);
            }) && console.error("named exports are not supported in *.vue files."), !1, b["default"] = g.exports;
        },
        75: function(a, b, c) {
            "use strict";
            function d(a) {
                return a && a.__esModule ? a : {
                    default: a
                };
            }
            Object.defineProperty(b, "__esModule", {
                value: !0
            });
            var e = c(5), f = d(e), g = c(71), h = d(g);
            f.default.config.productionTip = !1, h.default.mpType = "app";
            var i = new f.default(h.default);
            i.$mount(), b.default = {
                config: {
                    pages: [ "^pages/activity/hotpost/main", "pages/activity/hotpostReward/main" ],
                    window: {
                        backgroundTextStyle: "light",
                        navigationBarBackgroundColor: "#fff",
                        navigationBarTitleText: "WeChat",
                        navigationBarTextStyle: "black"
                    }
                }
            };
        },
        84: function(a, b) {
            "use strict";
            Object.defineProperty(b, "__esModule", {
                value: !0
            }), b.default = {
                created: function() {
                    console.log("WX mini program has created.");
                }
            };
        }
    }, [ 75 ]);
})();