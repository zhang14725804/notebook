function _asyncToGenerator(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, n) {
            function r(a, s) {
                try {
                    var o = e[a](s), i = o.value;
                } catch (t) {
                    return void n(t);
                }
                if (!o.done) return Promise.resolve(i).then(function(t) {
                    r("next", t);
                }, function(t) {
                    r("throw", t);
                });
                t(i);
            }
            return r("next");
        });
    };
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _operationKit = require("./operationKit.js"), Toast = function t() {
    var e = this;
    _classCallCheck(this, t), this._icons = {
        success: "/images/tipsucc.png",
        fail: "/images/tipfail.png"
    }, this._defaultOpts = {
        title: "",
        type: "fail",
        duration: 2e3
    }, this.toast = function() {
        var t = _asyncToGenerator(regeneratorRuntime.mark(function t(n) {
            var r;
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (n = Object.assign({}, e._defaultOpts, n), !((r = n.title.length) <= 7)) {
                        t.next = 6;
                        break;
                    }
                    return t.abrupt("return", e.sysToastIcon(n));

                  case 6:
                    if (!(r <= 20)) {
                        t.next = 10;
                        break;
                    }
                    return t.abrupt("return", e.sysToastText(n));

                  case 10:
                    return t.abrupt("return", e.sysToastModal(n));

                  case 11:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }));
        return function(e) {
            return t.apply(this, arguments);
        };
    }(), this.sysToastIcon = function() {
        var t = _asyncToGenerator(regeneratorRuntime.mark(function t(n) {
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return wx.showToast({
                        title: n.title,
                        image: e._icons[n.type],
                        duration: n.duration,
                        success: n.success,
                        fail: n.fail,
                        complete: n.complete
                    }), t.next = 3, (0, _operationKit.delay)(n.duration);

                  case 3:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }));
        return function(e) {
            return t.apply(this, arguments);
        };
    }(), this.sysToastText = function() {
        var t = _asyncToGenerator(regeneratorRuntime.mark(function t(n) {
            var r, a;
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (wx.setTabBarItem) {
                        t.next = 2;
                        break;
                    }
                    return t.abrupt("return", e.sysToastModal(n));

                  case 2:
                    return r = n.title, r.includes("\n") || (a = Math.ceil(r.length / 2), r = r.substring(0, a) + "\n" + r.substring(a)), 
                    wx.showToast({
                        title: r,
                        icon: "none",
                        duration: n.duration,
                        success: n.success,
                        fail: n.fail,
                        complete: n.complete
                    }), t.next = 7, (0, _operationKit.delay)(n.duration);

                  case 7:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }));
        return function(e) {
            return t.apply(this, arguments);
        };
    }(), this.sysToastModal = function() {
        var t = _asyncToGenerator(regeneratorRuntime.mark(function t(n) {
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.abrupt("return", new Promise(function(t, e) {
                        wx.showModal({
                            title: "提示",
                            content: n.title,
                            showCancel: !1,
                            confirmText: "知道了",
                            success: n.success,
                            fail: n.fail,
                            complete: function() {
                                n.complete && n.complete.apply(n, arguments), t();
                            }
                        });
                    }));

                  case 1:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }));
        return function(e) {
            return t.apply(this, arguments);
        };
    }();
};

exports.default = new Toast().toast;