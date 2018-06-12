var t, e, r = require("../../module/dataset/history/index"), o = require("../../module/boss.js");

module.exports = function() {
    return {
        data: {
            history: {
                request: {
                    dataVersion: 0,
                    pageContext: ""
                },
                response: {
                    recordList: []
                }
            }
        },
        onPullDownRefresh: function() {
            this._fetchHistory(!0);
        },
        onLoad: function() {
            var r = getCurrentPages();
            e = r[r.length - 1].$name, t = o({
                page_url: e
            });
        },
        preloadHistory: function() {
            r.list(this.data.history.request, !0);
        },
        onShow: function() {
            r.sync(), this._fetchHistory(!0);
        },
        refreshHistroy: function() {
            this._fetchHistory(!0);
        },
        _fetchHistory: function(t) {
            var e = this;
            r.list(e.data.history.request, t).then(function(t) {
                if (console.log("#{User} _fetchHistory", t), wx.stopPullDownRefresh(), t && 0 == t.errCode) {
                    var r = t.recordList;
                    r.forEach(function(t) {
                        t.poster && t.poster.imageUrl && (t.poster.imageUrl = t.poster.imageUrl.replace(/http\:\/\//i, "https://")), 
                        t.poster && t.poster.markLabelList && t.poster.markLabelList.forEach(function(e) {
                            !e.bgColor && e.primeText && (t._primeText = e.primeText);
                        });
                    }), e.setData({
                        "history.response.recordList": r
                    });
                } else e.setData({
                    "history.response.recordList": []
                });
            }, function(t) {
                wx.stopPullDownRefresh(), e.setData({
                    "history.response.recordList": []
                });
            });
        },
        onTapHistoryScrollList: function() {
            this.data.history.response.recordList.length < 3 && this.$route("history");
        },
        onTapHistory: function(r) {
            t.click(e + ":history-item");
            var o = r.currentTarget.dataset, s = [ "vid=" + (o.vid || ""), "cid=" + (o.cid || "") ].join("&");
            this.$route("play?" + s);
        }
    };
};