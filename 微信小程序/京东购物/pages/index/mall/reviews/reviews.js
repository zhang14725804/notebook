var e = require("../../../../bases/component.js"), i = (require("../../../../libs/promise.min.js"), 
require("../common-behavior.js"), require("../../model.js")), t = require("../../utils.js");

new e({
    properties: {
        reviewsConfig: {
            type: Object,
            observer: function(e) {
                this.init(e);
            }
        }
    },
    data: {
        entries: [],
        moreDesc: "",
        moreUrl: ""
    },
    methods: {
        init: function() {
            var e = this, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            i.getRecommendFeedList(1104, 3).then(function(n) {
                var s = [], o = [];
                n.splice(0, 3).forEach(function(i) {
                    i.skuid && (s.push({
                        view: i.viewnum >= 1e4 ? 1 * (i.viewnum / 1e4).toFixed(1) + "万+" : i.viewnum,
                        title: i.title || i.abstract || i.commentcontent,
                        image: t.clipImg(e.utils.getImg(i.sharepicurl.split(",")[0], 430, 200), 430, 200),
                        url: r.moreUrl.replace(/\?ptag=\d+\.\d+\.\d+/g, "?ptag=138067.20.10") + "&shareid=" + i.shareid + "&pps=" + i.pps,
                        skuid: i.skuid
                    }), o.push(i.skuid));
                }), e.setData({
                    entries: s,
                    moreDesc: r.moreDesc,
                    moreUrl: r.moreUrl
                }), s.length < 3 || (e.biz.getSkuPrice(o).then(function(i) {
                    for (var t in i) !function(e) {
                        s.forEach(function(t, r) {
                            e == t.skuid && (t.price = i[e].price > 0 ? "¥" + i[e].price : "");
                        });
                    }(t);
                    e.setData({
                        entries: s
                    });
                }), i.getSkuInfo(o).then(function(i) {
                    for (var t in i) !function(t) {
                        s.forEach(function(r, n) {
                            t == r.skuid && (r.cover = e.utils.getImg(i[t].imagePath, 200));
                        });
                    }(t);
                    e.setData({
                        entries: s
                    });
                }));
            }).catch(function(e) {
                return console.log("reviews error", e);
            });
        },
        gotoUrl: function(e) {
            var i = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: i
            });
        }
    }
});