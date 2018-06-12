function _asyncToGenerator(e) {
    return function() {
        var n = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function o(s, r) {
                try {
                    var i = n[s](r), c = i.value;
                } catch (e) {
                    return void t(e);
                }
                if (!i.done) return Promise.resolve(c).then(function(e) {
                    o("next", e);
                }, function(e) {
                    o("throw", e);
                });
                e(c);
            }
            return o("next");
        });
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var isGetting = !1, getLocation = function() {
    return new Promise(function(e) {
        console.log("new location"), wx.getLocation({
            type: "gcj02",
            success: function(n) {
                console.log(n, "位置信息2"), e(n);
            },
            fail: function(n) {
                e(n);
            }
        });
    });
}, showGuide = function(e, n) {
    var t = {};
    return new Promise(function(o) {
        var s = e.errMsg;
        s.includes("fail") && s.includes("auth") ? (t.content = n.authFailTip, t.success = function(e) {
            return console.log("confirm", e), e.confirm ? void o({
                errMsg: "ok"
            }) : e.cancel ? void o({
                errMsg: "cancel open setting"
            }) : void o({
                errMsg: "refusing open setting"
            });
        }, t.confirmText = "去开启", t.cancelText = "取消") : (t.content = n.systemDisableTip, 
        t.showCancel = !1, t.success = function() {
            return o({
                errMsg: "system forbids wechat from getting location"
            });
        }, t.confirmText = "知道了"), t.fail = function() {
            return o({
                errMsg: "wx.showModal fail"
            });
        }, t.title = "授权提示", wx.showModal(t);
    });
}, openSetting = function() {
    return new Promise(function(e) {
        wx.openSetting({
            success: function(n) {
                n.errMsg.includes("ok") && n.authSetting["scope.userLocation"] ? setTimeout(function() {
                    e({
                        errMsg: "ok"
                    });
                }, 1e3) : e({
                    errMsg: "refusing authorize location infomation"
                });
            },
            fail: function() {
                e({
                    errMsg: "wx.openSetting fail"
                });
            }
        });
    });
};

exports.default = _asyncToGenerator(regeneratorRuntime.mark(function e() {
    var n, t, o, s, r, i, c = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return regeneratorRuntime.wrap(function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            if (!isGetting) {
                e.next = 2;
                break;
            }
            return e.abrupt("return");

          case 2:
            return isGetting = !0, n = function(e) {
                isGetting = !1, c.success && "function" == typeof c.success && c.success(e);
            }, t = function(e) {
                isGetting = !1, c.fail && "function" == typeof c.fail && c.fail(e);
            }, e.next = 7, getLocation();

          case 7:
            if (o = e.sent, s = {}, !o.errMsg.includes("ok")) {
                e.next = 15;
                break;
            }
            return console.log("getLocationRes success"), n(o), e.abrupt("return");

          case 15:
            return console.log("getLocationRes fail"), e.next = 18, showGuide(o, c);

          case 18:
            s = e.sent;

          case 19:
            if (r = {}, s.errMsg.includes("ok")) {
                e.next = 26;
                break;
            }
            return t(s), console.log("modalRes fail"), e.abrupt("return");

          case 26:
            return console.log("modalRes success"), e.next = 29, openSetting();

          case 29:
            r = e.sent;

          case 30:
            if (i = {}, r.errMsg.includes("ok")) {
                e.next = 37;
                break;
            }
            return t(r), console.log("settingRes fail"), e.abrupt("return");

          case 37:
            return console.log("settingRes success"), e.next = 40, getLocation();

          case 40:
            i = e.sent;

          case 41:
            i.errMsg.includes("ok") ? (console.log("tryAgainRes success"), n(i)) : (console.log("tryAgainRes fail", i, 123), 
            t(i));

          case 42:
          case "end":
            return e.stop();
        }
    }, e, this);
}));