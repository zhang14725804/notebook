function e(o, t, c) {
    t && t.forEach(function(t) {
        "function" == typeof t && (t = t()), a.objEach(t, function(t, s) {
            if (o.hasOwnProperty(t)) switch (t) {
              case "comps":
                return void e(o, s);

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
                return void (o[t] = n(o[t], s));

              case "data":
                return void (o[t] = a.extend({}, o.data, s));

              default:
                console.warn("Property " + t + " is already defined by " + c);
            }
            o[t] = s;
        });
    });
}

function n(e, n) {
    return function() {
        try {
            n && n.apply(this, arguments);
        } finally {
            e && e.apply(this, arguments);
        }
    };
}

function o(n, o) {
    return "function" == a.type(n) && 1 == arguments.length && (o = n, n = ""), function() {
        var a = o.apply(this, arguments);
        if (a || (console.error("Illegal component options [" + (n || "Anonymous") + "]"), 
        a = {}), e(a, a.comps, "Component[" + (n || "Anonymous") + "]"), delete a.comps, 
        n && a.data) {
            var t = {};
            t[n] = a.data, a.data = t;
        }
        return a;
    };
}

var a = require("./fns.js");

o.use = e, module.exports = o;