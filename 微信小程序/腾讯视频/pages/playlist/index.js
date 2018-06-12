function t(t, e, o) {
    for (var n = arguments.length, s = Array(n > 3 ? n - 3 : 0), i = 3; i < n; i++) s[i - 3] = arguments[i];
    clearTimeout(t.tId), t.tId = setTimeout(function() {
        t.apply(e, s);
    }, o);
}

function e(t) {
    var e = t.currentTarget.dataset, o = t.touches[0], n = Math.abs(o.pageY - this.touchY) / Math.abs(o.pageX - this.touchX), s = o.pageX < this.touchX ? 1 : 0;
    if (n < .2 && !this.data.control.showEdit) {
        var i = e.idx, a = this.data.response.videoAttentInfoList, r = this.data.control.selectedCount;
        s ? r += 1 : r -= 1, a[i]._selected = s, this.setData({
            "response.videoAttentInfoList": a,
            "control.selectedCount": r
        });
    }
}

var o, n = require("../../module/page"), s = require("../../module/dataset/attent/index"), i = require("../../module/boss.js"), a = require("../../module/dataset/marklabel/index"), r = {};

n("playlist", {
    data: {
        request: {
            dataVersion: ""
        },
        response: {
            emptyTitle: "您的看单还没有添加视频",
            emptyDetail: "在详情页可点击加入看单按钮添加视频",
            updateFlag: 0,
            total: 0,
            videoAttentInfoList: []
        },
        control: {
            isAndroid: !1,
            showEdit: !1,
            selectedCount: 0,
            loading: !0,
            pullDown: !1
        }
    },
    onPullDownRefresh: function() {
        this._load(!0), this.setData({
            "control.pullDown": !0
        });
    },
    onShow: function() {
        this.setData({
            "control.pullDown": !1
        });
    },
    onUnload: function() {
        this.onHideEdit();
    },
    onLoad: function() {
        var t = this, e = getCurrentPages(), n = e[e.length - 1];
        o = i({
            page_url: n.$name
        }), this.setData({
            "control.loading": !0
        }), this._load = function(e) {
            s.list(t.data.request, e).then(function(e) {
                if (wx.stopPullDownRefresh(), e && 0 == e.errCode) {
                    var o = e.VideoAttentInfoList || [], n = 0;
                    o.forEach(function(t, e) {
                        var o = t.poster.markLabelList;
                        Array.isArray(o) && o.forEach(function(t) {
                            if (t) {
                                var e = a[t.primeText]["2x"];
                                t.background = {}, t.markImageUrl ? t.background.image = "background-image: url(" + t.markImageUrl + ");" : e && (t.background.image = "background-image: url(" + e + ");");
                            }
                        }), t.poster.imageUrl = t.poster.imageUrl.replace(/^http\:/i, "https:"), t._selected = 0, 
                        t._index = e;
                        var s = [ t.vid, t.cid, t.poster && t.poster.action && t.poster.action.url ].join("_");
                        r[s] && (t._selected = 1, n += 1);
                    });
                    var s = wx.getSystemInfoSync(), i = Math.round((s.windowHeight - 264) / 2) - 33;
                    t.setData({
                        "response.videoAttentInfoList": o,
                        "control.selectedCount": n,
                        "control.showEdit": t.data.control.showEdit,
                        "control.loading": !1,
                        "control.pullDown": !1,
                        "control.emptyMarginTop": i
                    });
                }
            }, function(e) {
                wx.stopPullDownRefresh(), t.setData({
                    "control.pullDown": !1,
                    "control.loading": !1
                });
            }), setTimeout(function() {
                0 == t.data.response.videoAttentInfoList.length && (wx.stopPullDownRefresh(), t.setData({
                    "control.loading": !1
                }));
            }, 5e3);
        }, wx.getNetworkType({
            success: function(e) {
                t._load(!/2g|3g|4g/.test(e.networkType));
            },
            fail: function() {
                t._load(!0);
            }
        });
        var c = wx.getSystemInfoSync(), l = !/iphone/.test(c.model.toLowerCase());
        t.setData({
            "control.isAndroid": l
        });
    },
    onTapAll: function() {
        if (this.data.control.selectedCount > 0 && !this.data.control.showEdit) {
            var t = this.data.response.videoAttentInfoList;
            t.forEach(function(t) {
                t._selected = 0;
                var e = [ t.vid, t.cid, t.poster && t.poster.action && t.poster.action.url ].join("_");
                r[e] = 0;
            }), this.setData({
                "response.videoAttentInfoList": t,
                "control.selectedCount": 0
            });
        }
    },
    onTapPlaylist: function(t) {
        var e = t.currentTarget.dataset, n = e.idx, s = e.selected, i = this.data.response.videoAttentInfoList, a = this.data.control.selectedCount;
        if (this.data.control.showEdit) this.onSelect(t); else if (1 == s) i[n]._selected = 0, 
        a -= 1, a = Math.max(0, a), this.setData({
            "response.videoAttentInfoList": i,
            "control.selectedCount": a
        }); else if (0 == a) {
            o.click("playlist:list-item");
            var r = e.vid || "", c = e.cid || "", l = e.url || "";
            r || c || (c = l.match(/cid\=([a-z0-9]{15})/)[1] || "");
            var d = [ "vid=" + r, "cid=" + c ].join("&");
            this.$route("play?" + d);
        }
    },
    onTouchStartPlaylistItem: function(t) {
        var e = t.touches[0];
        this.touchX = e.pageX, this.touchY = e.pageY;
    },
    onTouchMovePlaylistItem: function(o) {
        if (this.data.control.selectedCount > 0) {
            var n = this.data.response.videoAttentInfoList;
            n.forEach(function(t) {
                t._selected = 0;
                var e = [ t.vid, t.cid, t.poster && t.poster.action && t.poster.action.url ].join("_");
                r[e] = 0;
            }), this.setData({
                "response.videoAttentInfoList": n,
                "control.selectedCount": 0
            });
        } else t(e, this, 60, o);
    },
    onShowEdit: function() {
        this.setData({
            "control.showEdit": !0
        });
    },
    onHideEdit: function() {
        var t = this.data.response.videoAttentInfoList;
        t.forEach(function(t) {
            t._selected = 0;
            var e = [ t.vid, t.cid, t.poster && t.poster.action && t.poster.action.url ].join("_");
            r[e] = 0;
        }), this.setData({
            "response.videoAttentInfoList": t,
            "control.selectedCount": 0,
            "control.showEdit": !1
        });
    },
    onSelect: require("../../module/fns").lock(function(t, e) {
        var o = e.currentTarget.dataset, n = 1 == o.selected ? 0 : 1, s = o.idx, i = this.data.response.videoAttentInfoList, a = this.data.control.selectedCount;
        i[s]._selected = n, 1 == n ? a += 1 : a -= 1, a = Math.min(Math.max(0, a), i.length);
        var c = [ o.vid, o.cid, o.url ].join("_");
        r[c] = n, this.setData({
            "response.videoAttentInfoList": i,
            "control.selectedCount": a
        }), setTimeout(function() {
            t();
        }, 60);
    }),
    onSelectAll: function(t) {
        if (this.data.control.showEdit) {
            var e = this.data.response.videoAttentInfoList, o = this.data.control.selectedCount, n = o < e.length;
            e.forEach(function(t) {
                t._selected = n ? 1 : 0;
                var e = [ t.vid, t.cid, t.poster && t.poster.action && t.poster.action.url ].join("_");
                r[e] = n;
            }), o = n ? e.length : 0, this.setData({
                "response.videoAttentInfoList": e,
                "control.selectedCount": o
            });
        }
    },
    onDelete: function(t) {
        var e = this, o = +t.currentTarget.dataset.idx, n = this.data.response.videoAttentInfoList, s = this.data.control.selectedCount;
        wx.showModal({
            title: "确定要删除这条记录吗？",
            cancelText: "我再想想",
            confirmText: "狠心删除",
            success: function(t) {
                t.confirm ? e.doDelete(o) : (n[o]._selected = 0, s -= 1, s = Math.max(0, s), e.setData({
                    "control.selectedCount": s,
                    "response.videoAttentInfoList": n
                }));
            }
        });
    },
    onDeleteMulti: function(t) {
        var e = this.data.control.selectedCount, o = this;
        e > 0 && wx.showModal({
            title: "确定要删除" + e + "条记录吗?",
            cancelText: "我再想想",
            confirmText: "狠心删除",
            success: function(t) {
                t.confirm && o.doDelete();
            }
        });
    },
    doDelete: function(t) {
        var e = this.data.response.videoAttentInfoList, o = [], n = !1, i = this;
        void 0 !== t ? o.push(e[t]) : e.forEach(function(t) {
            1 == t._selected && o.push(t);
        }), n = o.length == e.length, o.length > 0 && s.del(o, n).then(function(t) {
            t && 0 == t.errCode ? wx.showToast({
                title: "删除成功",
                success: function() {
                    i.onHideEdit(), i.onLoad({
                        forceRefresh: !0
                    });
                }
            }) : wx.showToast({
                title: "删除失败",
                success: i.onHideEdit
            });
        }, function(t) {
            wx.showToast({
                title: "删除失败",
                success: i.onHideEdit
            });
        });
    }
});