var t = require("../../../../bases/component.js"), e = require("../common-behavior.js"), r = require("../../model.js");

new t({
    behaviors: [ e ],
    data: {
        entries: []
    },
    methods: {
        refresh: function() {
            this.loadEntryData();
        },
        loadEntryData: function() {
            var t = this;
            r.getGroupTag(6, 13).then(function(e) {
                var r = [];
                e.forEach(function(e) {
                    e.tagname && e.tagshortdesc && e.tagimg && e.tagurl ? r.push({
                        title: e.tagname,
                        des: e.tagshortdesc,
                        image: t.utils.getImg(e.tagimg, 148),
                        url: e.tagurl + "&ptag=138067.19." + e.tagid
                    }) : r = [];
                }), r.length < 6 && (r = []), t.setData({
                    entries: r
                });
            }).catch(function(t) {
                return console.log("recommend error", t);
            });
        },
        gotoUrl: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            });
        }
    }
});