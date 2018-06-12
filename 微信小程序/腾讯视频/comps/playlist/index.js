var t, e, s = require("../../module/dataset/attent/index"), i = require("../../module/boss.js");

module.exports = function() {
    return {
        data: {
            playlist: {
                request: {
                    dataVersion: ""
                },
                response: {
                    updateFlag: 0,
                    total: 0,
                    videoAttentInfoList: []
                }
            }
        },
        onPullDownRefresh: function() {
            this._fetchPlaylist(!0);
        },
        onLoad: function() {
            var s = getCurrentPages();
            e = s[s.length - 1].$name, t = i({
                page_url: e
            });
        },
        preloadPlaylist: function() {
            s.list(this.data.playlist.request, !0);
        },
        onShow: function() {
            this._fetchPlaylist(!1);
        },
        refreshPlayList: function() {
            this._fetchPlaylist(!0);
        },
        _fetchPlaylist: function(t) {
            var e = this;
            s.list(e.data.playlist.request, t).then(function(t) {
                if (wx.stopPullDownRefresh(), t && 0 == t.errCode) {
                    var s = t.VideoAttentInfoList;
                    s.forEach(function(t) {
                        t.poster && t.poster.imageUrl && (t.poster.imageUrl = t.poster.imageUrl.replace(/http\:\/\//i, "https://"));
                    }), s = s.filter(function(t) {
                        return "" != t.cid || "" != t.vid;
                    }), e.setData({
                        "playlist.response.updateFlag": t.updateFlag,
                        "playlist.response.total": t.total,
                        "playlist.response.videoAttentInfoList": s,
                        "playlist.request.dataVersion": t.dataVersion
                    });
                } else e.setData({
                    "playlist.response.videoAttentInfoList": []
                });
            }, function(t) {
                wx.stopPullDownRefresh(), e.setData({
                    "playlist.response.videoAttentInfoList": []
                });
            });
        },
        onTapPlaylistScrollList: function() {
            this.data.playlist.response.videoAttentInfoList.length < 3 && this.$route("playlist");
        },
        onTapPlaylist: function(s) {
            t.click(e + ":playlist-item");
            var i = s.currentTarget.dataset, a = i.vid || "", l = i.cid || "", n = i.url || "";
            a || l || (l = n.match(/cid\=([a-z0-9]{15})/)[1] || "");
            var o = [ "vid=" + a, "cid=" + l ].join("&");
            this.$route("play?" + o);
        }
    };
};