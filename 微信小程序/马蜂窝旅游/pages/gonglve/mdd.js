var t = getApp();

require("../../utils/mfw_stat.js");

Page({
    data: {
        title: "",
        page: {},
        mdd: {},
        list: [],
        _num: "1"
    },
    onLoad: function(a) {
        var e = this, i = t.getPageParameter(a, "mddid") || 0, d = t.getPageParameter(a, "_num") || "1";
        e.setData({
            _num: d,
            mddid: i,
            showBackhomeIcon: getCurrentPages().length < 2
        }), e.getMddInfo(), e.getUrl(d, 1);
    },
    onShow: function() {},
    getMddInfo: function() {
        var a = this, e = a.data.mddid;
        t.request({
            url: "/destination/item/" + e,
            success: function(i) {
                t.log(e, "get mdd success"), a.setData({
                    mdd: i
                }), wx.setNavigationBarTitle({
                    title: i.name || ""
                });
            },
            fail: function() {
                t.log(e, "get mdd error");
            },
            complete: function() {
                t.log(e, "get mdd complete");
            }
        });
    },
    getPageData: function(a, e) {
        var i = this, d = i.data.mddid;
        i.currNo !== a && (t.log(d, "get list " + a + " start"), i.currNo = a, 1 == a && wx.showNavigationBarLoading(), 
        a > 1 && i.setData({
            loadingmore: !0
        }), t.request({
            url: e + JSON.stringify({
                data_style: "destination",
                filter_style: "destination",
                filter: {
                    id: d
                },
                page: {
                    no: a,
                    num: 5
                }
            }),
            success: function(a) {
                t.log(d, "get list success");
                a.list;
                i.setData({
                    page: a.page,
                    list: i.data.list.concat(a.list)
                });
            },
            fail: function() {
                t.log(d, "get list error"), 1 === a && wx.showModal({
                    title: "",
                    content: "哎哟，加载失败了",
                    confirmText: "点击重试",
                    cancelText: "关闭",
                    confirmColor: "#ff9d00",
                    success: function(t) {
                        t.confirm && i.getPageData(a, e);
                    }
                });
            },
            complete: function() {
                t.log(d, "get list complete"), wx.hideNavigationBarLoading(), i.currNo = void 0, 
                i.setData({
                    loadingmore: !1
                });
            }
        }));
    },
    bindLoadmore: function(t) {
        var a = this;
        t.currentTarget.dataset;
        a.data.page.next && a.getUrl(a.data._num, a.data.page.no + 1);
    },
    glClick: function(t) {
        var a = this, e = t.currentTarget.dataset, i = "";
        a.data.mddid;
        switch (a.data._num) {
          case "1":
            i = "detail?id=" + e.id;
            break;

          case "2":
            i = "../note/detail?id=" + e.id;
            break;

          case "3":
            i = "../question/question?id=" + e.id;
        }
        wx.navigateTo({
            url: i
        });
    },
    onShareAppMessage: function() {
        var t = this;
        return {
            title: "全球旅游消费指南",
            path: t.__route__ + "?mddid=" + t.data.mddid,
            desc: t.data.mdd && t.data.mdd.name ? t.data.mdd.name + "最新最潮的旅游攻略都在这，出门就靠它了" : "快来看，这里有全世界最新最潮的旅游攻略"
        };
    },
    menuClick: function(t) {
        this.setData({
            _num: t.target.dataset.num
        });
        var a = this;
        switch (t.target.dataset.num) {
          case "1":
            a.data.list = [], a.data.page = {}, a.getPageData(1, "/guide/item/?jsondata=");
            break;

          case "2":
            a.data.list = [], a.data.page = {}, a.getPageData(1, "/note/item/?jsondata=");
            break;

          case "3":
            a.data.list = [], a.data.page = {}, a.getPageData(1, "/qa/question/?jsondata=");
        }
    },
    getUrl: function(t, a) {
        var e = this;
        switch (t) {
          case "1":
            e.getPageData(a, "/guide/item/?jsondata=");
            break;

          case "2":
            e.getPageData(a, "/note/item/?jsondata=");
            break;

          case "3":
            e.getPageData(a, "/qa/question/?jsondata=");
        }
    }
});