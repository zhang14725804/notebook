var t = require("../../module/page"), e = require("./public/index")(), a = require("../../module/fns"), n = require("./data/fetch-tag"), s = require("./consts").pageSize;

t("tag", a.extend({}, e, {
    onLoad: function(t) {
        if (this.setData({
            page: "tag",
            isShareOpen: this.$state && this.$state.firstShareOpen,
            pageLabel: ""
        }), this.tagname = t._tagname, !t.datakey) throw new Error("没有datakey");
        this.datakey = t.datakey, this.fetchData(), wx.setNavigationBarTitle({
            title: t._tagname || "腾讯视频"
        }), this._onLoad();
    },
    fetchData: function(t) {
        var e = this;
        t = t || {}, n.get({
            pageContext: this.pageContext,
            datakey: this.datakey
        }, {
            suc: t.suc,
            fail: t.fail,
            complete: function(a) {
                if (t.complete) t.complete(); else {
                    var n = a.content;
                    t.isBottomLoad && (n = e.data.content.concat(n)), e.setData({
                        content: n,
                        response: a.response
                    }), e.pageContext = a.pageContext, e.refreshContext = a.refreshContext, e.hasNextPage = a.hasNextPage && e.data.content.length <= s;
                }
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: (this.tagname ? this.tagname + "·" : "") + "全网热播短视频",
            desc: "腾讯视频不负好时光",
            path: "/pages/hot/tag?ptag=share&_tagname=" + this.tagname + "&datakey=" + this.datakey
        };
    }
}));