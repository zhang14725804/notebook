function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function promisify(e, i) {
    var t = i.dealFail, a = void 0 !== t && t, r = {};
    for (var o in e) {
        (function(i) {
            if ("function" != typeof e[i] || /[^a]sync$/i.test(i)) return r[i] = e[i], "continue";
            r[i] = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return new Promise(function(r, o) {
                    return e[i](Object.assign({}, t, {
                        success: function(e) {
                            Object.assign(e, {
                                succeeded: !0
                            }), t.success && t.success(e), r(e);
                        },
                        fail: function(e) {
                            Object.assign(e, {
                                succeeded: !1
                            }), t.fail && t.fail(e), a ? r(e) : o(e);
                        }
                    }));
                });
            };
        })(o);
    }
    return r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.wxResolve = exports.wxPromise = exports.wxRefine = void 0;

var _Navigator = require("./navigate/Navigator.js"), _Navigator2 = _interopRequireDefault(_Navigator), wxRefine = exports.wxRefine = function() {
    var e = {
        navigateTo: _Navigator2.default.navigateTo,
        redirectTo: _Navigator2.default.redirectTo,
        navigateBack: _Navigator2.default.navigateBack
    };
    return Object.assign({}, wx, e);
}(), wxPromise = exports.wxPromise = promisify(wxRefine, {
    dealFail: !1
}), wxResolve = exports.wxResolve = promisify(wxRefine, {
    dealFail: !0
});