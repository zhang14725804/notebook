(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a, b) {
        return function() {
            try {
                a && a.apply(this, arguments);
            } finally {
                b && b.apply(this, arguments);
            }
        };
    }
    var c = require("../../utils/ppdog"), d = a(c), e = require("../../utils/regenerator-runtime"), f = a(e), g = require("./component.js"), h = require("../../components/blacktips/index"), i = require("../../components/password/index"), j = require("./message.js"), k = require("./promise.js"), l = getApp(), m = require("./fns.js");
    module.exports = function(a, c) {
        return c.name = a, c.comps = c.comps || [], c.comps.push(h), c.comps.push(i), g.use(c, c.comps, "Page[" + a + "]"), 
        c.$setData = function(a, b) {
            if ("string" == m.type(a)) {
                var c = {};
                return m.objEach(b, function(b, d) {
                    c[a + "." + b] = d;
                }), this.setData(c);
            }
            return "object" == m.type(a) ? this.setData(a) : void 0;
        }, c.onShow = b(c.onShow, function() {
            l.currentPage = this.name, clearTimeout(l.pageTimer);
        }), c.onHide = b(c.onHide, function() {
            clearTimeout(l.pageTimer);
        }), c.$setTimeout = function(a, b) {
            l.currentPage !== this.name || (clearTimeout(l.pageTimer), l.pageTimer = setTimeout(a, b));
        }, c.checkPassword = function(a) {
            return new k(function(b) {
                j.once("password_keyboard_check_success", b), j.emit("password_keyboard_show", a);
            });
        }, Page(c), c;
    };
})();