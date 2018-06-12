function _asyncToGenerator(n) {
    return function() {
        var e = n.apply(this, arguments);
        return new Promise(function(n, t) {
            function r(o, i) {
                try {
                    var u = e[o](i), c = u.value;
                } catch (n) {
                    return void t(n);
                }
                if (!u.done) return Promise.resolve(c).then(function(n) {
                    r("next", n);
                }, function(n) {
                    r("throw", n);
                });
                n(c);
            }
            return r("next");
        });
    };
}

function isLocationOpen() {
    return new Promise(function(n, e) {
        wx.getSetting || n(!1), wx.getSetting({
            success: function(e) {
                n(e.authSetting["scope.userLocation"]);
            },
            fail: function() {
                n(!1);
            }
        });
    });
}

function getLocation() {
    return new Promise(function(n, e) {
        wx.getLocation({
            type: "gcj02",
            success: function(e) {
                n(e);
            },
            fail: function() {
                n(void 0);
            }
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    function n() {
        return e.apply(this, arguments);
    }
    var e = _asyncToGenerator(regeneratorRuntime.mark(function n() {
        var e;
        return regeneratorRuntime.wrap(function(n) {
            for (;;) switch (n.prev = n.next) {
              case 0:
                return n.next = 2, isLocationOpen();

              case 2:
                if (e = n.sent) {
                    n.next = 5;
                    break;
                }
                return n.abrupt("return", Promise.resolve(void 0));

              case 5:
                return n.abrupt("return", getLocation());

              case 6:
              case "end":
                return n.stop();
            }
        }, n, this);
    }));
    return n;
}();