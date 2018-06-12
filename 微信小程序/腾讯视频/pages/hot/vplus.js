var e = require("../../module/page"), t = require("./public/index")(), a = require("../../module/fns"), n = require("./data/fetch-vplus"), s = require("./consts").pageSize;

e("vplus", a.extend({}, t, {
    onLoad: function(e) {
        if (this.setData({
            page: "vplus",
            isShareOpen: this.$state && this.$state.firstShareOpen,
            pageLabel: ""
        }), this.tagname = e._tagname, !e.qq) throw new Error("没有qq");
        this.qq = encodeURIComponent(e.qq), this.fetchData(), wx.setNavigationBarTitle({
            title: this.tagname || "腾讯视频"
        }), this._onLoad();
    },
    fetchData: function(e) {
        var t = this;
        e = e || {}, n.get({
            pageContext: this.pageContext,
            qq: this.qq
        }, {
            suc: e.suc,
            fail: e.fail,
            complete: function(a) {
                if (e.complete) e.complete(); else {
                    var n = a.content;
                    e.isBottomLoad && (n = t.data.content.concat(n)), t.setData({
                        content: n,
                        response: a.response
                    }), t.pageContext = a.pageContext, t.refreshContext = a.refreshContext, t.hasNextPage = a.hasNextPage && t.data.content.length <= s;
                }
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: (this.tagname ? this.tagname + "·" : "") + "全网热播短视频",
            desc: "腾讯视频不负好时光",
            path: "/pages/hot/vplus?ptag=share&qq=" + this.qq + "&_tagname=" + this.tagname
        };
    }
}));