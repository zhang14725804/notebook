function t() {
    this._evtObjs = {}, this._outdatedMsgs = {};
}

function e() {}

t.prototype.on = function(t, e, s) {
    this._evtObjs[t] || (this._evtObjs[t] = []), this._evtObjs[t].push({
        handler: e,
        once: s
    });
    var n = this;
    return function() {
        n.off(t, e);
    };
}, t.prototype.wait = function(t, s) {
    return this._outdatedMsgs[t] ? (s.apply(null, this._outdatedMsgs[t]), e) : this.on(t, s, !0);
}, t.prototype.off = function(t, e) {
    var s = this;
    return (t ? [ t ] : Object.keys(this._evtObjs)).forEach(function(t) {
        if (e) {
            var n = [];
            (s._evtObjs[t] || []).forEach(function(t) {
                t.handler !== e && n.push(t);
            }), s._evtObjs[t] = n;
        } else s._evtObjs[t] = [];
    }), this;
}, t.prototype.emit = function(t) {
    var e = Array.prototype.slice.call(arguments, 1);
    this._outdatedMsgs[t] = e, (this._evtObjs[t] || []).forEach(function(t) {
        if (!t.once || !t.called) {
            t.called = !0;
            try {
                t.handler && t.handler.apply(null, e);
            } catch (t) {
                console.error(t.stack || t.message || t);
            }
        }
    });
}, t.prototype.emitAsync = function() {
    var t = arguments, e = this;
    setTimeout(function() {
        e.emit.apply(e, t);
    }, 0);
}, t.prototype.assign = function(t) {
    var e = this;
    [ "on", "off", "wait", "emit", "emitAsync" ].forEach(function(s) {
        var n = e[s];
        t[s] = function() {
            return n.apply(e, arguments);
        };
    });
}, new t().assign(t), module.exports = t;