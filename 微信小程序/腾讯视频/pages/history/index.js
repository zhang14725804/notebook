function t(t, e, s) {
    for (var o = arguments.length, a = Array(o > 3 ? o - 3 : 0), i = 3; i < o; i++) a[i - 3] = arguments[i];
    clearTimeout(t.tId), t.tId = setTimeout(function() {
        t.apply(e, a);
    }, s);
}

function e(t) {
    var e = t.currentTarget.dataset, s = t.touches[0], o = Math.abs(s.pageY - this.touchY) / Math.abs(s.pageX - this.touchX), a = s.pageX < this.touchX ? 1 : 0;
    if (o < .2 && !this.data.control.showEdit) {
        var i = e.idx, n = this.data.response.earlyList, r = this.data.response.yestodayList, c = this.data.response.todayList, d = this.data.control.selectedCount, l = +e.type;
        switch (a ? d += 1 : d -= 1, l) {
          case 0:
            c[i]._selected = a;
            break;

          case 1:
            r[i]._selected = a;
            break;

          case 2:
            n[i]._selected = a;
        }
        this.setData({
            "response.earlyList": n,
            "response.todayList": c,
            "response.yestodayList": r,
            "control.selectedCount": Math.max(0, d)
        });
    }
}

var s, o = require("../../module/page"), a = require("../../module/dataset/history/index"), i = require("../../module/dataset/marklabel/index"), n = require("../../module/boss.js"), r = "https://i.gtimg.cn/qqlive/images/tinyapp/", c = {}, d = {
    1: r + "history_icon_pc.svg",
    2: r + "history_icon_pc.svg",
    3: r + "history_icon_phone.svg",
    4: r + "history_icon_phone.svg",
    5: r + "history_icon_phone.svg",
    8: r + "history_icon_tv.svg",
    9: r + "history_icon_phone.svg"
};

o("history", {
    data: {
        request: {
            dataVersion: 0,
            pageContext: ""
        },
        response: {
            emptyTitle: "看过的都看完了",
            emptyDetail: "快去开始您的观影之旅吧！",
            recordList: [],
            todayList: [],
            yestodayList: [],
            earlyList: []
        },
        control: {
            height: 0,
            currentTitle: "今天",
            isAndroid: !1,
            loading: !0,
            showEdit: !1,
            selectedCount: 0,
            pullDown: !1
        }
    },
    onPullDownRefresh: function() {
        this._load(!0), this.setData({
            "control.pullDown": !0
        });
    },
    onUnload: function() {
        this.onHideEdit();
    },
    onShow: function() {
        this.setData({
            "control.pullDown": !1
        });
    },
    onLoad: function() {
        var t = this, e = this, o = getCurrentPages(), r = o[o.length - 1];
        s = n({
            page_url: r.$name
        }), wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    "control.height": e.windowHeight
                });
            }
        }), this.setData({
            "control.loading": !0
        }), this._load = function(t) {
            a.list(e.data.request, t).then(function(t) {
                if (wx.stopPullDownRefresh(), t && 0 == t.errCode) {
                    var s = t.recordList, o = Math.floor(new Date().getTime() / 864e5), a = [], n = [], r = [], l = 0, h = "今天";
                    try {
                        s.forEach(function(t, e) {
                            t.poster.markLabelList && t.poster.markLabelList.forEach(function(e) {
                                var s = i[e.primeText], o = s && s["2x"];
                                e.background = {}, e.markImageUrl ? e.background.image = "background-image: url(" + markImageUrl + ");" : o && (e.background.image = "background-image: url(" + o + ");"), 
                                t._primeText = e.primeText;
                            }), t.poster.imageUrl && (t.poster.imageUrl = t.poster.imageUrl.replace(/^http\:/i, "https:")), 
                            t.playFromIcon = d[t.playFrom], t._selected = 0;
                            var s = [ t.vid, t.cid, t.poster && t.poster.action && t.poster.action.url ].join("_");
                            c[s] && (t._selected = 1, l += 1);
                            var p = o - Math.round(new Date(1e3 * t.uiDate) / 864e5);
                            p > 2 ? (t._type = 2, t._index = a.length, a.push(t)) : 1 <= p && p <= 2 ? (t._type = 1, 
                            t._index = n.length, n.push(t)) : (t._type = 0, t._index = r.length, r.push(t)), 
                            0 == r.length ? h = "昨天" : 0 == r.length && 0 == n.length ? h = "更早" : 0 == r.length && 0 == n.length && 0 == a.length && (h = "");
                        });
                    } catch (t) {
                        console.error("render history error : " + t);
                    }
                    var p = wx.getSystemInfoSync(), u = Math.round((p.windowHeight - 264) / 2) - 33;
                    e.setData({
                        "control.currentTitle": h,
                        "response.recordList": s,
                        "response.earlyList": a,
                        "response.yestodayList": n,
                        "response.todayList": r,
                        "control.selectedCount": l,
                        "control.showEdit": e.data.control.showEdit,
                        "control.loading": !1,
                        "control.pullDown": !1,
                        "control.emptyMarginTop": u
                    });
                }
            }, function(t) {
                e.setData({
                    "response.isEmpty": !0,
                    "control.loading": !1,
                    "control.pullDown": !1
                }), wx.stopPullDownRefresh();
            }), setTimeout(function() {
                0 === e.data.response.recordList.length && (e.setData({
                    "response.isEmpty": !0,
                    "control.loading": !1
                }), wx.stopPullDownRefresh());
            }, 5e3);
        }, wx.getNetworkType({
            success: function(t) {
                e._load(!/2g|3g|4g/.test(t.networkType));
            },
            fail: function() {
                e._load(!0);
            }
        });
        var l = wx.getSystemInfoSync(), h = !/iphone/.test(l.model.toLowerCase());
        e.setData({
            "control.isAndroid": h
        });
    },
    onPageScroll: function(t) {
        if (t && t.detail) {
            var e = t.detail.scrollTop, s = 104 * this.data.response.todayList.length, o = s + 104 * this.data.response.yestodayList.length, a = o + 104 * this.data.response.earlyList.length, i = "";
            e <= s && s > 0 ? i = "今天" : e > s && e < o && o > 0 ? i = "昨天" : e > o && e <= a && a > 0 && (i = "更早"), 
            i.length > 0 && this.setData({
                "control.currentTitle": i
            });
        }
    },
    onTapAll: function() {
        if (this.data.control.selectedCount > 0 && !this.data.control.showEdit) {
            var t = this.data.response.yestodayList, e = this.data.response.earlyList, s = this.data.response.todayList;
            [ t, e, s ].forEach(function(t) {
                t.forEach(function(t) {
                    t._selected = 0;
                    var e = [ t.vid, t.cid, t.poster && t.poster.action && t.poster.action.url ].join("_");
                    c[e] = 0;
                });
            }), this.setData({
                "response.earlyList": e,
                "response.yestodayList": t,
                "response.todayList": s,
                "control.selectedCount": 0
            });
        }
    },
    onTapHistory: function(t) {
        var e = t.currentTarget.dataset, o = e.idx, a = e.type, i = e.selected, n = [], r = this.data.control.selectedCount;
        if (this.data.control.showEdit) this.onSelect(t); else if (1 == i) {
            var c = "response.";
            switch (r -= 1, r = Math.max(0, r), a) {
              case 0:
                n = this.data.response.todayList, c += "todayList";
                break;

              case 1:
                n = this.data.response.yestodayList, c += "yestodayList";
                break;

              case 2:
                n = this.data.response.earlyList, c += "earlyList";
            }
            n[o]._selected = 0;
            var d = {
                "control.selectedCount": r
            };
            d[c] = n, this.setData(d);
        } else if (0 == r) {
            s.click("history:list-item");
            var l = e.vid || "", h = e.cid || "", p = e.url || "";
            l || h || (h = p.match(/cid\=([a-z0-9]{15})/)[1] || "");
            var u = [ "vid=" + l, "cid=" + h ].join("&");
            this.$route("play?" + u);
        }
    },
    onTouchStartPlaylistItem: function(t) {
        var e = t.touches[0];
        this.touchX = e.pageX, this.touchY = e.pageY;
    },
    onTouchMovePlaylistItem: function(s) {
        if (this.data.control.selectedCount > 0 && !this.data.control.showEdit) {
            var o = this.data.response.yestodayList, a = this.data.response.earlyList, i = this.data.response.todayList;
            [ o, a, i ].forEach(function(t) {
                t.forEach(function(t) {
                    t._selected = 0;
                    var e = [ t.vid, t.cid, t.poster && t.poster.action && t.poster.action.url ].join("_");
                    c[e] = 0;
                });
            }), this.setData({
                "response.earlyList": a,
                "response.yestodayList": o,
                "response.todayList": i,
                "control.selectedCount": 0
            });
        } else t(e, this, 60, s);
    },
    onShowEdit: function() {
        this.setData({
            "control.showEdit": !0
        });
    },
    onHideEdit: function() {
        var t = this.data.response.yestodayList, e = this.data.response.earlyList, s = this.data.response.todayList;
        [ t, e, s ].forEach(function(t) {
            t.forEach(function(t) {
                t._selected = 0;
                var e = [ t.vid, t.cid, t.poster && t.poster.action && t.poster.action.url ].join("_");
                c[e] = 0;
            });
        }), this.setData({
            "response.earlyList": e,
            "response.yestodayList": t,
            "response.todayList": s,
            "control.selectedCount": 0,
            "control.showEdit": !1
        });
    },
    onSelect: require("../../module/fns").lock(function(t, e) {
        var s = e.currentTarget.dataset, o = 1 == s.selected ? 0 : 1, a = s.idx, i = +s.type, n = this.data.control.selectedCount, r = [], d = "response.", l = {};
        switch (i) {
          case 0:
            r = this.data.response.todayList, d += "todayList";
            break;

          case 1:
            r = this.data.response.yestodayList, d += "yestodayList";
            break;

          case 2:
            r = this.data.response.earlyList, d += "earlyList";
        }
        r[a]._selected = o;
        var h = [ s.vid, s.cid, s.url ].join("_");
        c[h] = o, 1 == o ? n += 1 : n -= 1, n = Math.min(Math.max(0, n), this.data.response.recordList.length), 
        l["control.selectedCount"] = n, l[d] = r, this.setData(l), setTimeout(function() {
            t();
        }, 60);
    }),
    onSelectAll: function(t) {
        if (this.data.control.showEdit) {
            var e = this.data.response.earlyList, s = this.data.response.yestodayList, o = this.data.response.todayList, a = this.data.control.selectedCount, i = a < e.length + s.length + o.length;
            [ s, e, o ].forEach(function(t) {
                t.forEach(function(t) {
                    t._selected = i ? 1 : 0;
                    var e = [ t.vid, t.cid, t.poster && t.poster.action && t.poster.action.url ].join("_");
                    c[e] = i;
                });
            }), a = i ? s.length + e.length + o.length : 0, this.setData({
                "response.earlyList": e,
                "response.todayList": o,
                "response.yestodayList": s,
                "control.selectedCount": a
            });
        }
    },
    onDelete: function(t) {
        var e = this, s = t.currentTarget.dataset, o = +s.type, a = +s.idx, i = (this.data.response.yestodayList, 
        this.data.response.todayList, this.data.response.earlyList, this.data.control.selectedCount), n = [], r = "response.", c = {};
        wx.showModal({
            title: "确定要删除这条记录吗？",
            cancelText: "我再想想",
            confirmText: "狠心删除",
            success: function(t) {
                if (t.confirm) e.doDelete(a, o); else {
                    switch (o) {
                      case 0:
                        n = e.data.response.todayList, r += "todayList";
                        break;

                      case 1:
                        n = e.data.response.yestodayList, r += "yestodayList";
                        break;

                      case 2:
                        n = e.data.response.earlyList, r += "earlyList";
                    }
                    n[a]._selected = 0, c[r] = n, i -= 1, i = Math.max(0, i), c["control.selectedCount"] = i, 
                    e.setData(c);
                }
            }
        });
    },
    onDeleteMulti: function(t) {
        var e = this.data.control.selectedCount, s = this;
        e > 0 && wx.showModal({
            title: "确定要删除" + e + "条记录吗?",
            cancelText: "我再想想",
            confirmText: "狠心删除",
            success: function(t) {
                t.confirm && s.doDelete();
            }
        });
    },
    doDelete: function(t, e) {
        var s = this.data.response.yestodayList, o = this.data.response.todayList, i = this.data.response.earlyList, n = [], r = !1, c = this;
        if (void 0 !== t && void 0 !== e) switch (e) {
          case 0:
            n.push(o[t].recordId);
            break;

          case 1:
            n.push(s[t].recordId);
            break;

          case 2:
            n.push(i[t].recordId);
        } else [ s, i, o ].forEach(function(t) {
            t.forEach(function(t) {
                1 == t._selected && n.push(t.recordId);
            });
        });
        r = n.length == s.length + i.length + o.length, n.length > 0 && a.del(n, r).then(function(t) {
            t && 0 == t.errCode && wx.showToast({
                title: "删除成功",
                success: function() {
                    c.onHideEdit(), c._load(!0);
                }
            });
        }, function(t) {
            wx.showToast({
                title: "删除失败",
                success: function() {
                    c.onHideEdit();
                }
            });
        });
    }
});