var t = getApp(), a = t.pathData.ACTIVITY_DOMAIN + "/wxa/wxsub/list", e = require("../enums"), n = t.pathData.ACTIVITY_DOMAIN + "/wxa/wxsub/del";

module.exports = {
    subscriptionInit: function(t) {
        return this.loadList(t);
    },
    $e_delete: t.confirm("", "是否确认退订?", function(a) {
        var e = this, s = a.currentTarget.dataset, r = s.subRcdId, i = s.id, u = s.index;
        t.request(n, {
            id: i,
            subRcdId: r,
            thirdKey: t.getThirdKey()
        }).then(function(a) {
            a.error || (t.toast("删除成功!", {
                duration: 1e3
            }), t.eventHandle.emit("subscription-change"), e.data.list.splice(u, 1), e.setDataLazy({
                list: [].concat(e.data.list),
                showEmptyInfo: !e.data.list.length
            }));
        });
    }),
    loadList: t.debounce(200, function(e) {
        var n = this;
        return t.request(a, {
            thirdKey: t.getThirdKey(),
            pLine: this.data.navActive
        }).then(function(t) {
            if (t.error) n.setDataLazy({
                showEmptyInfo: !0
            }); else {
                var a = t.data || [];
                n.dataTransfer(a), n.setDataLazy({
                    list: a,
                    showEmptyInfo: !a.length
                });
            }
        });
    }),
    $e_goToYouXuan: t.throttle(1e3, function(a) {
        var n = a.currentTarget.dataset, s = n.subscribeType, r = n.subId, i = t.pathData.youxuan.SUB_LIST_PATH + "/" + r + "/1";
        t.request(i).then(function(a) {
            if (a.data) {
                var n = a.data.list;
                n && n.length > 0 ? t.goto([ "/pages/youxuan/youxuan", {
                    youxuan: e.subscribeTypeToYouXuanType[s],
                    type: s,
                    subId: r,
                    sort: 1
                } ], !0) : t.toast("暂无新增数据", {
                    duration: 1e3,
                    image: ""
                });
            }
        });
    }),
    dataTransfer: function(t) {
        t && t.forEach(function(t) {
            return t.params = t.params ? JSON.parse(t.params) : {};
        });
    }
};