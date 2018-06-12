function t(t, o) {
    if (!(t instanceof o)) throw new TypeError("Cannot call a class as a function");
}

var o = function() {
    function t(t, o) {
        for (var n = 0; n < o.length; n++) {
            var e = o[n];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(t, e.key, e);
        }
    }
    return function(o, n, e) {
        return n && t(o.prototype, n), e && t(o, e), o;
    };
}(), n = function() {
    function n(o) {
        var e = this;
        t(this, n), this.ctx = o, this.hasBindTouchStart = !1, this.hasBindTouchEnd = !1, 
        this.ctxTouchStart = o.onTouchStart, this.ctxTouchEnd = o.onTouchEnd, o.onTouchStart = function(t) {
            e.onTouchStart(t), e.ctxTouchStart && e.ctxTouchStart.call(o, t);
        }, o.onTouchEnd = function(t) {
            e.onTouchEnd(t), e.ctxTouchEnd && e.ctxTouchEnd.call(o, t);
        }, this.events = {
            swipeLeft: [],
            swipeRight: [],
            swipeUp: [],
            swipeDown: []
        };
    }
    return o(n, [ {
        key: "on",
        value: function(t, o) {
            this.events[t] = this.events[t], this.events[t].push(o);
        }
    }, {
        key: "off",
        value: function(t, o) {
            for (var n = this.events[t]; -1 != n.indexOf(o); ) n.splice(n.indexOf(o), 1);
        }
    }, {
        key: "destroy",
        value: function() {
            this.events = {
                swipeLeft: [],
                swipeRight: [],
                swipeUp: [],
                swipeDown: []
            }, this.ctxTouchStart && (this.ctx.ctxTouchStart = this.ctxTouchStart.bind(this.ctx)), 
            this.ctxTouchEnd && (this.ctx.onTouchEnd = this.ctxTouchEnd.bind(this.ctx)), this.ctx = null;
        }
    }, {
        key: "onTouchStart",
        value: function(t) {
            var o = t.touches[0], n = o.clientX, e = o.clientY;
            this._touchX = n, this._touchY = e, this._touchTime = Date.now();
        }
    }, {
        key: "run",
        value: function(t) {
            var o = this;
            t.forEach(function(t) {
                t.call(o.ctx);
            });
        }
    }, {
        key: "onTouchEnd",
        value: function(t) {
            var o = t.changedTouches[0], n = o.clientX, e = o.clientY, s = Date.now(), i = n - this._touchX, h = e - this._touchY, c = Math.abs(h) / (s - this._touchTime) * 1e3;
            Math.abs(i), this._touchTime;
            console.log("~~~~", i, h, c);
            var u = this.events, a = u.swipeLeft, r = u.swipeRight, l = u.swipeUp, f = u.swipeDown;
            0 == i ? h > 0 ? (console.log("down0"), this.run(f)) : (console.log("up0"), this.run(l)) : 0 == h && (i > 0 ? (console.log("right0"), 
            this.run(r)) : (this.run(a), console.log("left0"))), i > 0 && h < 0 ? Math.abs(h / i) < .2679 ? (this.run(r), 
            console.log("right1")) : Math.abs(h / i) > 3.7321 && (this.run(l), console.log("top1")) : i > 0 && h > 0 ? Math.abs(h / i) < .2679 ? (this.run(r), 
            console.log("right2")) : Math.abs(h / i) > 3.7321 && (console.log("down2"), this.run(f)) : i < 0 && h < 0 ? Math.abs(h / i) > 3.7321 ? (this.run(l), 
            console.log("top3")) : Math.abs(h / i) < .2679 && (this.run(a), console.log("left3")) : i < 0 && h > 0 && (Math.abs(h / i) < .2679 ? (this.run(a), 
            console.log("left4")) : Math.abs(h / i) > 3.7321 && (console.log("down4"), this.run(f)));
        }
    } ]), n;
}();

module.exports = n;