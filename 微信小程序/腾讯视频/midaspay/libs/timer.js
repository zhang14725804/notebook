var t = require("./util"), i = function(t) {
    t = t || {}, this.opt = t, this.interval = null;
};

i.prototype.stop = function(t) {
    0 == t ? clearTimeout(this.interval) : 1 == t && clearInterval(this.interval), this.interval = null;
}, exports.CountDown = function(t) {
    if (t = t || {}, i.call(this, t), !(t.time && t.beforeCount && t.counting && t.countEnd)) throw Error("can not use countDown");
    t.beforeCount();
    var n = t.time, e = function() {
        if (this.interval) return t.counting(n), n <= 0 ? (this.stop(1), void t.countEnd()) : void n--;
    };
    e(), this.interval = setInterval(e.bind(this), 1e3);
}, t.inherits(exports.CountDown, i), exports.Timeout = function(t) {
    (t = t || {}).time = t.time || 5, i.call(this, t), this.interval = setTimeout(function() {
        this.interval && (this.stop(0), t.timeUp && t.timeUp());
    }.bind(this), 1e3 * t.time);
}, t.inherits(exports.Timeout, i);