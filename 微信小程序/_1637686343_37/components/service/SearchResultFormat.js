function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

function t(n) {
    this.option = n || {};
}

function e() {
    this.configs = [];
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = n(require("../searchLayout/searchBind")), r = (n(require("../searchLayout/bind/bindBase")), 
n(require("../searchLayout/bind/bindIntent")), n(require("../searchLayout/bind/bindMovie")), 
n(require("../searchLayout/bind/bindNullData")), n(require("../searchLayout/bind/bindOther")), 
n(require("../searchLayout/bind/bindSingle")), n(require("../searchLayout/bind/bindSource")), 
n(require("../searchLayout/bind/bindTV")), n(require("../searchLayout/bind/bindStar")), 
{}), a = [], c = !1;

e.prototype.register = function(n) {
    return this.configs.push(n), this;
}, e.prototype.run = function(n, t) {
    n = this.beforeBindCallBack(n, t);
    for (var e = 0, i = this.configs.length; e < i; e++) {
        var r = this.configs[e];
        if (r.condition(n)) {
            n = r.bindCallBack(n, t);
            break;
        }
    }
    return n = this.afterBindCallBack(n, t);
}, e.prototype.beforeBindCallBack = function(n, t) {
    return this.configs.forEach(function(e) {
        e.beforeBindCallBack && (n = e.beforeBindCallBack(n, t));
    }), n;
}, e.prototype.afterBindCallBack = function(n, t) {
    return this.configs.forEach(function(e) {
        e.afterBindCallBack && (n = e.afterBindCallBack(n, t));
    }), n;
}, e.prototype.create = function(n) {
    var t = {};
    return this.configs.forEach(function(e) {
        e.create && (t = e.create(n));
    }), t;
}, e.prototype.end = function(n) {
    var t = {};
    return this.configs.forEach(function(e) {
        e.end && (t = e.end(n));
    }), t;
};

var o = new e(), u = i.default.getComponents();

for (var s in u) {
    var f = u[s];
    o.register(f);
}

t.prototype = {
    getData4PTmpl: function(n) {
        var t = this, e = [], i = [];
        n.data.list.forEach(function(n, t) {
            n.is3D || i.push(n);
        }), n.data.list = i, o.create(n), n.data.list.forEach(function(t, i) {
            t.index = i, (t = o.run(t, n)) && Object.keys(t).length <= 2 && e.push(t);
        });
        var a = o.end(n);
        a && e.unshift(a);
        var u = e[e.length - 1];
        u.relateSearch && (c = !0, e.pop(), e.splice(9, 0, u));
        var s = [];
        return e.forEach(function(n, e) {
            if (n.clickPingback) {
                for (var i in n.clickPingback) n.clickPingback[i].position = e + 1, r[i] = n.clickPingback[i], 
                t.formatDocIds(i, n.clickPingback[i], s);
                delete n.clickPingback;
            }
        }), t.setDocIds(s), e;
    },
    formatDocIds: function(n, t, e) {
        if ("intent" != n) {
            var i = "relate" == n ? "" : n;
            e.push([ i, t.s_site || "", t.c1 || "" ].join(","));
        }
    },
    setDocIds: function(n) {
        a = n.join(";");
    }
}, exports.default = {
    getSearchFormat: function(n) {
        return new t(n);
    },
    getClickPingback: function() {
        return r;
    },
    spbParam: function() {
        return {
            s_docids: a,
            s_att: c ? 3 : ""
        };
    }
};