(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b() {
        this._evtObjs = {}, this._outdatedMsgs = {};
    }
    function c() {}
    var d = require("../../utils/ppdog"), e = a(d), f = require("../../utils/regenerator-runtime"), g = a(f);
    "use strict", b.prototype.on = function(a, b, c) {
        this._evtObjs[a] || (this._evtObjs[a] = []), this._evtObjs[a].push({
            handler: b,
            once: c
        });
        var d = this;
        return function() {
            d.off(a, b);
        };
    }, b.prototype.once = function(a, b) {
        this._evtObjs[a] || (this._evtObjs[a] = []), this._evtObjs[a].push({
            handler: b,
            once: !0
        });
        var c = this;
        return function() {
            c.off(a, b);
        };
    }, b.prototype.wait = function(a, b) {
        return this._outdatedMsgs[a] ? (b.apply(null, this._outdatedMsgs[a]), c) : this.on(a, b, !0);
    }, b.prototype.off = function(a, b) {
        var c, d = this;
        return c = a ? [ a ] : Object.keys(this._evtObjs), c.forEach(function(a) {
            if (!b) d._evtObjs[a] = []; else {
                var c = d._evtObjs[a] || [], e = [];
                c.forEach(function(a) {
                    a.handler !== b && e.push(a);
                }), d._evtObjs[a] = e;
            }
        }), this;
    }, b.prototype.clear = function() {
        this._evtObjs = {};
    }, b.prototype.emit = function(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        this._outdatedMsgs[a] = b;
        var c = this._evtObjs[a] || [];
        c.forEach(function(a) {
            if (!(a.once && a.called)) {
                a.called = !0;
                try {
                    a.handler && a.handler.apply(null, b);
                } catch (a) {
                    console.error(a.stack || a.message || a);
                }
            }
        });
    }, b.prototype.emitAsync = function() {
        var a = arguments, b = this;
        setTimeout(function() {
            b.emit.apply(b, a);
        }, 0);
    }, b.prototype.assign = function(a) {
        var b = this;
        [ "on", "once", "off", "clear", "wait", "emit", "emitAsync" ].forEach(function(c) {
            var d = b[c];
            a[c] = function() {
                return d.apply(b, arguments);
            };
        });
    };
    new b().assign(b), module.exports = b;
})();