function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var e = require("../../../../bases/component.js"), a = require("../../../../common/logger.js"), r = require("api"), s = require("draw"), n = require("../../../../common/toast/toast"), o = new a("购物车-优惠券弹层"), i = {
    AVAILABLE: "1",
    DISABLED: "2",
    LOADING: "3",
    OVER: "4"
};

new e({
    properties: {
        data: {
            type: Object,
            value: {
                vid: null,
                list: []
            },
            observer: "loadData"
        }
    },
    attached: function() {},
    rawData: {},
    methods: {
        loadData: function(e) {
            var a = this, s = (e = e || {
                list: [],
                vid: null
            }).list;
            this.rawData = {};
            var n = s.length > 0, o = r.format(s), i = o.gettable, u = o.useable;
            this.setData({
                show: n,
                gettable: i,
                useable: u,
                vid: e.vid || ""
            }), [].concat(t(i), t(u)).forEach(function(t) {
                a.rawData[t.encryptedKey] = t;
            });
        },
        setDrawButtonStatus: function(t, e) {
            var a = {};
            a["gettable[" + t + "].status"] = e, this.setData(a);
        },
        draw: function(t) {
            var e = this, a = t.currentTarget.dataset, r = a.key, u = a.roleId, c = a.index;
            this.rawData[r].status != i.LOADING && (this.setDrawButtonStatus(c, i.LOADING), 
            s.draw({
                key: r,
                roleId: u
            }).then(function(a) {
                var r = a.success, s = 34 == a.code;
                e.setDrawButtonStatus(c, r ? i.DISABLED : s ? i.LOADING : i.OVER), r && e.triggerEvent("drawafter", t);
            }).catch(function(t) {
                o.error(t), n.show({
                    icon: n.ICON.WARNING,
                    content: t.message
                }), e.setDrawButtonStatus(c, i.OVER);
            }));
        },
        noscroll: function(t) {},
        close: function(t) {
            this.triggerEvent("close", t);
        }
    }
});