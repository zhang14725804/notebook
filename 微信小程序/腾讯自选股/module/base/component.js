(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a, d, e) {
        d && d.forEach(function(d) {
            "function" == typeof d && (d = d()), i.objEach(d, function(d, f) {
                if (a.hasOwnProperty(d)) switch (d) {
                  case "comps":
                    return void b(a, f);

                  case "onReady":
                  case "onShow":
                  case "onHide":
                  case "onUnload":
                  case "onPullDownRefresh":
                  case "onReachBottom":
                  case "onLoad":
                  case "onNavigate":
                  case "onAwake":
                  case "onPreload":
                  case "fetchData":
                    return void (a[d] = c(a[d], f));

                  case "data":
                    return void (a[d] = i.extend({}, a.data, f));

                  default:
                    console.warn("Property " + d + " is already defined by " + e);
                }
                a[d] = f;
            });
        });
    }
    function c(a, b) {
        return function() {
            try {
                a && a.apply(this, arguments);
            } finally {
                b && b.apply(this, arguments);
            }
        };
    }
    function d(a, c) {
        return "function" == i.type(a) && 1 == arguments.length && (c = a, a = ""), function() {
            var d = c.apply(this, arguments);
            if (d || (console.error("Illegal component options [" + (a || "Anonymous") + "]"), 
            d = {}), b(d, d.comps, "Component[" + (a || "Anonymous") + "]"), delete d.comps, 
            a && d.data) {
                var e = {};
                e[a] = d.data, d.data = e;
            }
            return d;
        };
    }
    var e = require("../../utils/ppdog"), f = a(e), g = require("../../utils/regenerator-runtime"), h = a(g), i = require("./fns.js");
    d.use = b, module.exports = d;
})();