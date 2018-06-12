function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), i = function() {
    function i() {
        e(this, i);
    }
    return t(i, [ {
        key: "init",
        value: function(e) {
            this.items = e.items, this.originalLength = e.items.length, this.itemsLength = e.items.length, 
            this.i = e.initItem || 0, this.circle = e.circle || 3, this.t = 0, this.speed = 80, 
            this.result = e.result, this.callback = e.callback;
        }
    }, {
        key: "rotate",
        value: function(e, t) {
            var i = this;
            !function() {
                for (var n = 0, s = i.originalLength; n < s; n++) i.items[n] = !1;
                i.items[i.i] = !0, e.setData({
                    selectedStatus: i.items
                }), i.i++, i.i == i.itemsLength && (i.i = 0, i.t++), i.t <= i.circle ? (i.t == i.circle - 1 && (i.speed += 10), 
                i.t == i.circle && (i.itemsLength = i.result), setTimeout(function() {
                    i.rotate.call(i, e, t);
                }, i.speed)) : setTimeout(i.callback, i.speed + 5);
            }();
        }
    } ]), i;
}();

exports.default = new i();