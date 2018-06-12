function t(t) {
    this._ctx = t || this;
}

var s = t.prototype;

s.on = function(t, s) {
    if ("function" == typeof s) return this._cbs = this._cbs || {}, this._cbs[t] && this._cbs[t].length > 0 && console.log("Emitter - 重复定义事件", t), 
    (this._cbs[t] || (this._cbs[t] = [])).push(s), this;
    console.error("fn must be a function");
}, s.once = function(t, s) {
    function i() {
        n.off(t, i), s.apply(this, arguments);
    }
    {
        if ("function" == typeof s) {
            var n = this;
            return this._cbs = this._cbs || {}, i.fn = s, this.on(t, i), this;
        }
        console.error("fn must be a function");
    }
}, s.off = function(t, s) {
    if (this._cbs = this._cbs || {}, !arguments.length) return this._cbs = {}, this;
    var i = this._cbs[t];
    if (!i) return this;
    if (1 === arguments.length) return delete this._cbs[t], this;
    for (var n, c = 0; c < i.length; c++) if ((n = i[c]) === s || n.fn === s) {
        i.splice(c, 1);
        break;
    }
    return this;
}, s.emit = function(t) {
    this._cbs = this._cbs || {};
    var s = [].slice.call(arguments), i = this._cbs[t];
    if (i) {
        i = i.slice(0), s.shift();
        for (var n = 0, c = i.length; n < c; n++) try {
            i[n].apply(this._ctx, s);
        } catch (t) {
            console.error(t);
        }
    }
    return this;
}, module.exports = t;