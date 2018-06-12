function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function t(i, o) {
                try {
                    var u = r[i](o), a = u.value;
                } catch (e) {
                    return void n(e);
                }
                if (!u.done) return Promise.resolve(a).then(function(e) {
                    t("next", e);
                }, function(e) {
                    t("throw", e);
                });
                e(a);
            }
            return t("next");
        });
    };
}

function requireMobile(e) {
    var r = e.checkLevel, n = void 0 === r ? "soft" : r, t = e.fromLog, i = void 0 === t ? "" : t;
    return function(e, r, t) {
        var o = t.value;
        t.value = _asyncToGenerator(regeneratorRuntime.mark(function e() {
            for (var r = arguments.length, t = Array(r), u = 0; u < r; u++) t[u] = arguments[u];
            var a, c, s;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return a = new _BindMobile2.default({
                        checkLevel: n,
                        fromLog: i,
                        wepyInstance: this
                    }), e.next = 3, a.checkBind();

                  case 3:
                    if (c = e.sent) {
                        e.next = 10;
                        break;
                    }
                    return e.next = 7, a.doBind();

                  case 7:
                    if (s = e.sent, "success" == s.result) {
                        e.next = 10;
                        break;
                    }
                    return e.abrupt("return");

                  case 10:
                    return e.abrupt("return", o.apply(this, t));

                  case 11:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        }));
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.requireMobile = requireMobile;

var _BindMobile = require("./../BindMobile.js"), _BindMobile2 = _interopRequireDefault(_BindMobile);