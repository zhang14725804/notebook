var e = function() {
    function e(e, t) {
        var a = [], n = !0, i = !1, r = void 0;
        try {
            for (var c, o = e[Symbol.iterator](); !(n = (c = o.next()).done) && (a.push(c.value), 
            !t || a.length !== t); n = !0) ;
        } catch (e) {
            i = !0, r = e;
        } finally {
            try {
                !n && o.return && o.return();
            } finally {
                if (i) throw r;
            }
        }
        return a;
    }
    return function(t, a) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }
    return e;
}, a = require("../../../npm/@mtfe/mt-weapp-url/stringify.js"), n = require("../../../utils/util"), i = require("../../../utils/lx"), r = getApp(), c = {
    cheap: {
        route: "offer",
        pic: "http://p1.meituan.net/codeman/10c3dff6f94377b6bf618dc49ce958db2988.png"
    },
    quality: {
        pic: "http://p0.meituan.net/codeman/b7e49f8ad4e6c78e72da7856ff26285e2530.png"
    },
    nightlife: {
        pic: "http://p1.meituan.net/codeman/a96f52de117c24eaf91eb9af25eed5c82432.png"
    },
    weekend: {
        pic: "http://p1.meituan.net/codeman/12675ff335aeb9384f3c7ad842915dd13653.png"
    },
    breakfast: {
        pic: "http://p1.meituan.net/codeman/e2901b28871b5f0ce220f2622c11e4042847.png"
    },
    lunch: {
        pic: "http://p1.meituan.net/codeman/7f2cb45a39194f16f4957835c9044c2c3923.png"
    },
    dinner: {
        pic: "http://p1.meituan.net/codeman/eacb8aaed62dfca96bde2b666799498f4131.png"
    }
};

Component({
    properties: {
        config: {
            type: Object,
            observer: "_initProm"
        },
        emitLx: {
            type: Number,
            observer: function(e) {
                1 !== e && this._initProm();
            }
        }
    },
    data: {},
    attached: function() {},
    methods: {
        navigate: function(e) {
            var t = e.path, n = Object.assign({
                recId: e.id,
                recFrom: e.from,
                theme: e.theme
            }, this.query, this.location), i = "/index/pages/h5/h5?weburl=" + encodeURIComponent("" + this.base + t + "?" + (0, 
            a.stringify)(n));
            wx.navigateTo({
                url: i
            });
        },
        lxReport: function(e, a, n, r) {
            i[e](a, t({
                title_title: n.themeName,
                content_type: n.from,
                content_id: n.id,
                cateid: n.cateId,
                cateinfoid: n.cateInfoId,
                format_color: n.bgColor,
                format_postion: r + 1,
                global_id: n.globalId,
                stid: n.stid
            }, this.valLab));
        },
        itemClick: function(e) {
            var t = e.currentTarget.dataset.idx, a = this.data.list[t], i = e.currentTarget.dataset.source, r = e.detail.formId;
            n.postFormId(r, i), a && (this.lxReport("moduleClick", "b_r4bbp", a, t), this.navigate(a));
        },
        _initProm: function() {
            var t = this;
            console.log("活动位置埋点触发");
            var a = this.properties.config;
            this.initProm = Promise.all([ r.getCityInfo(), r.getSysInfo(), r.getAuthInfo() ]).then(function(i) {
                var c = e(i, 2), o = c[0], d = c[1];
                Object.assign(t, a);
                var u = o.id, p = r.globalData, s = p.uuid, m = p.userId, f = p.token, l = p.location, b = l.latitude, h = l.longitude;
                t.location = {
                    lat: b,
                    lng: h
                };
                var g = {
                    client: "xiaochengxu",
                    uuid: s,
                    ci: u
                }, v = {
                    utm_source: d.brand,
                    utm_medium: "xiaochengxu"
                };
                return Object.assign(g, v, t.query), f && Object.assign(g, {
                    userId: m,
                    token: f
                }), t.query = g, n.request(t.api, {
                    query: Object.assign({
                        position: "" + [ b, h ]
                    }, g)
                });
            }).then(function(e) {
                if (e && e.data) {
                    var a = e.data, n = a.datas, i = a.entrance, r = a.style;
                    switch (t.valLab = {
                        format_entrance: i,
                        format_type: r
                    }, r) {
                      case "4":
                        n[2].mask = "http://p1.meituan.net/codeman/2eb6e0374bce777a374748359e9f400611876.png", 
                        n[3].mask = "http://p0.meituan.net/codeman/cedafb267555381dabc4f9291d2bedbd9352.png";

                      case "2":
                        n[0].mask = "http://p1.meituan.net/codeman/17f6e5a1a31d135da927c902be62ea4f9262.png", 
                        n[1].mask = "http://p1.meituan.net/codeman/cface68b0264d3bce2296e455960043011118.png";
                        break;

                      case "3":
                        n[1].mask = "http://p1.meituan.net/codeman/e5ce198e37b6e71a63baf5926ecb093411268.png", 
                        n[2].mask = "http://p0.meituan.net/codeman/5268910cc28eb58702dd1cccadfd21d512198.png";

                      case "1":
                        n[0].mask = "http://p1.meituan.net/codeman/f4bebe6d44d463c3abf45a10c420cf3217894.png", 
                        n[0].className = "whole";
                    }
                    return n.forEach(function(e, a) {
                        var n = c[e.theme];
                        n && (e.themePic = n.pic || e.themePic, e.path = n.route || e.theme), e.discountTag && !isNaN(Number(e.discountTag)) && delete e.discountTag, 
                        t.lxReport("moduleView", "b_RjlUT", e, a);
                    }), t.setData({
                        list: n
                    }), n;
                }
            });
        }
    }
});