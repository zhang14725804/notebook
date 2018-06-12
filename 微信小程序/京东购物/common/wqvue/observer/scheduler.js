function e() {
    c = t.length = o.length = 0, u = {}, l = a = !1;
}

function n() {
    a = !0;
    var n = void 0, i = void 0;
    for (t.sort(function(e, n) {
        return e.id - n.id;
    }), c = 0; c < t.length; c++) if (n = t[c], i = n.id, u[i] = null, n.run(), null != u[i] && (s[i] = (s[i] || 0) + 1, 
    s[i] > r)) {
        console.error("You may have an infinite update loop " + (n.user ? 'in watcher with expression "' + n.expression + '"' : "in a component render function."), n.instance);
        break;
    }
    e();
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.MAX_UPDATE_COUNT = void 0, exports.queueWatcher = function(e) {
    var r = e.id;
    if (null == u[r]) {
        if (u[r] = !0, a) {
            for (var o = t.length - 1; o > c && t[o].id > e.id; ) o--;
            t.splice(o + 1, 0, e);
        } else t.push(e);
        l || (l = !0, (0, i.nextTick)(n));
    }
};

var i = require("../util/index"), r = exports.MAX_UPDATE_COUNT = 100, t = [], o = [], u = {}, s = {}, l = !1, a = !1, c = 0;