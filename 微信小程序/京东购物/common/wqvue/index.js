function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.WqComponent = exports.WqVue = void 0;

var n = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), r = require("./parser/pageParser"), i = e(require("../../bases/page.js")), s = e(require("../../bases/component.js")), o = require("./util/env");

exports.WqVue = function() {
    function e(n) {
        t(this, e), this.pObj = o.isXcx ? (0, r.parse)(n, n.store) : vparse(n, n.store), 
        !o.isXcx && this.regBasicComs(), this.register();
    }
    return n(e, [ {
        key: "register",
        value: function() {
            o.isXcx ? new i.default(this.pObj) : new Vue(this.pObj);
        }
    }, {
        key: "regBasicComs",
        value: function(e) {
            function t() {
                return e.apply(this, arguments);
            }
            return t.toString = function() {
                return e.toString();
            }, t;
        }(function() {
            regBasicComs(Vue);
        })
    } ]), e;
}(), exports.WqComponent = function() {
    function e(n, i) {
        t(this, e), this.pObj = o.isXcx ? (0, r.componentParse)(n, n.store) : vComponentParse(n, n.store), 
        this.name = i, this.register();
    }
    return n(e, [ {
        key: "register",
        value: function() {
            o.isXcx ? new s.default(this.pObj) : Vue.component(this.name, this.pObj);
        }
    } ]), e;
}();