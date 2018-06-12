function e() {
    var e = {
        enable: 1
    };
    return u.get({
        url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33196.jsonp",
        data: {
            t: Date.now()
        }
    }).then(function(t) {
        var r = t.body.data || [], a = r.length, i = n();
        return a && (e = r.find(function(e) {
            return e.page == i;
        }) || e), o.resolve(e);
    }, function(e) {
        return o.reject(e);
    });
}

function t() {
    var e = {
        source: s.WE_CHAT
    };
    return u.get({
        url: "https://wq.jd.com/pinbind/QueryPinStatus",
        data: e
    }).then(function(e) {
        var t = e.body;
        return 0 == t.errcode ? o.resolve(t) : o.reject(new Error("code:" + t.errcode + "，message:" + t.errmsg));
    }, function(e) {
        return o.reject(e);
    });
}

function r(e) {
    return !(e == l.NEED_UPDATE_PROFILE || e == l.NO_ASSET_HAS_ACCOUNT);
}

function n() {
    var e = getCurrentPages().slice(0).pop();
    return e.route || e.__route__ || "";
}

var a = function() {
    function e(e, t) {
        var r = [], n = !0, a = !1, o = void 0;
        try {
            for (var i, u = e[Symbol.iterator](); !(n = (i = u.next()).done) && (r.push(i.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            a = !0, o = e;
        } finally {
            try {
                !n && u.return && u.return();
            } finally {
                if (a) throw o;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), o = require("../../../libs/promise.min.js"), i = require("../../../bases/component.js"), u = require("../../../common/request/request"), c = new (require("../../../common/logger.js"))("pinbind组件"), s = {
    WE_CHAT: 2
}, l = {
    NEED_UPDATE_PROFILE: 1,
    NO_ASSET_HAS_ACCOUNT: 2,
    SWITHCHABLE: 3,
    UNBINED: 4
};

new i({
    properties: {
        show: {
            type: Boolean,
            value: !1
        }
    },
    ready: function() {
        var n = this;
        o.all([ e(), t() ]).then(function(e) {
            var t = a(e, 2), o = t[0], i = r(t[1].state);
            1 == o.enable && (Object.assign(n.data, {
                show: !i,
                activeId: o.activeId,
                level: o.level,
                scene: o.scene,
                title: o.title,
                text: o.desc,
                btnText: o.btnBindText
            }), n.setData(n.data));
        }).catch(function(e) {
            c.error(e);
        });
    },
    methods: {
        gotoAccountPage: function(e) {
            var t = n(), r = {
                sceneid: this.data.scene,
                rurl: "/" + t,
                bindactiveid: this.data.activeId,
                bindlevel: this.data.level
            };
            this.$goto("/pages/my_pages/account/account", r);
        }
    }
});