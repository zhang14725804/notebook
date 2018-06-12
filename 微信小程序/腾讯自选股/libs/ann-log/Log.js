(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var c = function() {
        function a(a, b) {
            for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
            c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
        }
        return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b;
        };
    }(), d = require("../../utils/ppdog"), e = a(d), f = require("../../utils/regenerator-runtime"), g = a(f), h = require("./config"), i = a(h), j = require("./expand/index"), k = require("./utils"), l = {}, m = function() {
        function a(c, d) {
            b(this, a), this.name = c, this.dir = d, this._logHistory = {};
        }
        return c(a, [ {
            key: "getLogHistory",
            value: function() {
                var a = 0 < arguments.length && void 0 !== arguments[0] && arguments[0];
                return !0 === a ? JSON.stringify(l) : l;
            }
        }, {
            key: "pageError",
            value: function() {
                return this._print("pageError", arguments), this;
            }
        }, {
            key: "debug",
            value: function() {
                return this._print("debug", arguments), this;
            }
        }, {
            key: "log",
            value: function() {
                return this._print("log", arguments), this;
            }
        }, {
            key: "info",
            value: function() {
                return this._print("info", arguments), this;
            }
        }, {
            key: "warn",
            value: function() {
                return this._print("warn", arguments), this;
            }
        }, {
            key: "error",
            value: function() {
                if (i.default.throwError) throw new Error(arguments); else this._print("error", arguments);
            }
        }, {
            key: "_print",
            value: function(a, b) {
                if (this._canLog(a)) {
                    this.dir ? l[this.dir] ? l[this.dir][this.name] = this._logHistory : (l[this.dir] = {}, 
                    l[this.dir][this.name] = this._logHistory) : l[this.name] = this._logHistory;
                    var c = this, d = {
                        time: (0, k.getNewStr)(),
                        name: this.name,
                        args: b,
                        level: a
                    };
                    j.expanders && 0 < j.expanders.length && Object.keys(j.expanders).forEach(function(a) {
                        j.expanders[a].call(c, d);
                    });
                }
            }
        }, {
            key: "_canLog",
            value: function() {
                return i.default.level && (!0 === i.default.level || eqOrIn(i.default.level, level));
            }
        } ]), a;
    }();
    exports.default = m, module.exports = exports["default"];
})();