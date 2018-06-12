function t(t, e) {
    var r = {
        projectid: t,
        total: e
    };
    return new a(function(t, e) {
        wx.$.request.get({
            url: "https://wq.jd.com/mcoss/categoryentry/getentryv2",
            data: r
        }).then(function(r) {
            var a = r.body;
            0 == a.errcode ? t(a.data || []) : e({
                code: a.errcode,
                message: a.msg
            });
        }, function(t) {
            e(t);
        });
    });
}

function e(t, e) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Date.now();
    /^\d{10}$/.test(t + "") && (t *= 1e3), /^\d{10}$/.test(e + "") && (e *= 1e3);
    var a = !t || (parseInt(t) == t ? r >= t : r >= Date.parse(t)), n = !e || (parseInt(e) == e ? r < e : r < Date.parse(e));
    return a && n;
}

var r = require("../../../../bases/component.js"), a = require("../../../../libs/promise.min.js"), n = [];

new r({
    data: {
        entries: []
    },
    attached: function() {
        if (n.length) return this.setData({
            entries: n
        });
        this.loadData();
    },
    methods: {
        loadData: function() {
            var r = this;
            this.biz.getPPMS(34460).then(function(a) {
                var n = void 0, i = !0, o = !1, s = void 0;
                try {
                    for (var u, c = a[Symbol.iterator](); !(i = (u = c.next()).done); i = !0) {
                        var d = u.value;
                        if (e(d.begin, d.end) && d.proid) {
                            n = d.proid;
                            break;
                        }
                    }
                } catch (t) {
                    o = !0, s = t;
                } finally {
                    try {
                        !i && c.return && c.return();
                    } finally {
                        if (o) throw s;
                    }
                }
                n && t(n, 4).then(function(t) {
                    r.processData(t);
                });
            });
        },
        processData: function(t) {
            var e = this;
            t.forEach(function(t, r) {
                if (!(r >= 4)) {
                    var a = t.list && t.list[0] || {};
                    n.push({
                        uid: "uid_" + r,
                        title: t.martname || "",
                        desc: a.content || "",
                        image: e.utils.getImg(a.img, 100),
                        url: a.url + "&PTAG=" + t.ext1
                    });
                }
            }), this.setData({
                entries: n
            });
        },
        onTap: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto(e);
        }
    }
});