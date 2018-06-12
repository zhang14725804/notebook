Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function t() {
    if (!(this instanceof t)) return new t();
    this._callbacks = {}, this._fired = {};
};

t.prototype.emit = function(t, e) {
    for (var s, i, r, l, a, n = 2, c = this._callbacks; n--; ) if (i = n ? t : "__all__", 
    s = c[i]) for (l = 0, a = s.length; l < a; l++) if (r = s[l]) {
        for (var o = [], f = n ? 1 : 0; f < arguments.length; f++) o.push(arguments[f]);
        r.apply(this, o);
    } else s.splice(l, 1), l--, a--;
    return this;
}, t.prototype.on = function(t, e) {
    return this._callbacks[t] = this._callbacks[t] || [], this._callbacks[t].push(e), 
    this;
}, t.prototype.removeListener = function(t, e) {
    var s = this._callbacks;
    if (t) if (e) {
        var i = s[t];
        if (i) for (var r = i.length, l = 0; l < r; l++) e === i[l] && (i[l] = null);
    } else s[t] = []; else this._callbacks = {};
    return this;
};

var e = new t();

exports.default = e;