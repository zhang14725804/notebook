Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.arrayMethods = void 0;

var e = require("../util/lang"), r = Array.prototype, t = exports.arrayMethods = Object.create(r);

[ "push", "pop", "shift", "unshift", "splice", "sort", "reverse" ].forEach(function(s) {
    var a = r[s];
    (0, e.def)(t, s, function() {
        for (var e = arguments.length, r = new Array(e); e--; ) r[e] = arguments[e];
        var t = a.apply(this, r), o = this.__ob__, i = void 0;
        switch (s) {
          case "push":
          case "unshift":
            i = r;
            break;

          case "splice":
            i = r.slice(2);
        }
        return i && o.observeArray(i), o.dep.notify(o.pageObj, this), t;
    });
});