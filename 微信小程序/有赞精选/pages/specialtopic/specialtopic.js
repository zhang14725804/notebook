!function() {
    require("./../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 40 ], {
    321: function(t, e, o) {
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var i = a(o(3)), n = a(o(0)), d = a(o(1)), l = a(o(23)), c = a(o(322)), s = a(o(323)), p = a(o(329)), u = (getApp(), 
        {
            wf: "loadWfTopic",
            fl: "loadFlTopic"
        }), f = {
            data: (0, i.default)({
                topicId: 0,
                type: null,
                goodsInfo: null,
                windowWidth: 0,
                windowHeight: 0,
                itemSize: 0,
                loadFail: !1,
                iconNetworkError: "../../../icons/ic_network_error.png"
            }, l.default.data, s.default.data, p.default.data),
            onLoad: function(t) {
                var e = this, o = t.type, a = void 0 === o ? "wf" : o, i = t.topic_id;
                this.setData({
                    type: a,
                    topicId: i
                }), wx.getSystemInfo({
                    success: function(t) {
                        var o = t.windowWidth, a = t.windowHeight;
                        e.setData({
                            windowWidth: o,
                            windowHeight: a,
                            itemSize: o / 2 - 12
                        });
                    },
                    complete: function() {
                        e[u[a]]();
                    }
                });
            },
            onShow: function() {
                n.default.page.show();
            },
            onSharePage: function() {
                this.onShareAppMessage();
            },
            onShareAppMessage: function() {
                var t = this.data, e = t.goodsInfo, o = t.topicId, a = t.type;
                return {
                    title: e.title,
                    path: "/pages/specialtopic/specialtopic?topic_id=" + o + "&type=" + a
                };
            },
            onItemClick: function(t) {
                var e, o = this.data, a = o.type, i = o.goods, d = o.sections, l = t.currentTarget.dataset, c = l.itemIndex, s = l.chunkIndex, p = l.sectionIndex;
                "wf" === a ? e = i[c] : "fl" === a && (e = d[p].goodsList[s][c]), e.dcps && 0 < e.dcps && n.default.setGlobalData({
                    dc_ps: e.dcps + ""
                }), e.collection && 0 != e.collection && n.default.setGlobalData({
                    channel: e.collection + ""
                }), wx.navigateTo({
                    url: "/pages/goods/detail/index?alias=" + e.goods_alias
                });
            }
        };
        (0, d.default)((0, i.default)(f, c.default, l.default.component, p.default.component, s.default.component));
    }
}, [ 321 ]);