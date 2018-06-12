function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../common/pingback/pv")), a = e(require("../../common/pingback/click")), i = e(require("../../common/pingback/block")), r = e(require("../../common/user/user")), o = require("../../common/form/form"), s = e(require("../../components/login/login")), c = e(require("../../components/history/playRecordService")), u = e(require("../../components/history/recordService")), n = e(require("../../components/subscribe/playSubService")), l = e(require("../../components/subscribe/subscribeService")), d = e(require("../../components/mutiAccount/mutiAccount")), p = (e(require("../../common/utils/util")), 
require("../../vendor/redux/redux")), h = e(require("../../vendor/redux-plugins/reduxTrunk")), g = e(require("./reducers/index")), f = e(require("./actions/index")), m = {
    app: getApp(),
    onLoad: function(e) {
        var t = this;
        r.default.init();
        var a = (0, p.combineReducers)(g.default);
        this.store = (0, p.createStore)(a, (0, p.applyMiddleware)(h.default)), this.store.subscribe(function() {
            t.setData(t.store.getState());
        }), this.loadPage(), this.setData({
            curpage: "wx_pcenter",
            enableScroll: !0
        });
        this.app.emitter.on("afterToggleByWechatwx_pcenter", this.switchMutiSuccess), this.app.emitter.on("showMutiAfterWechatwx_pcenter", this.showMutiDialogByWechat), 
        this.app.emitter.on("hideMutiDialog", this.hideMutiDialog);
    },
    loadPage: function() {
        var e = r.default.getAuthcookie();
        if (this.loadLoginState(), e) this.getSearchData({
            pageNum: 1
        }); else {
            var t = c.default.get() || [], a = n.default.get() || [];
            this.store.dispatch(f.default.completeLoad()), this.store.dispatch(f.default.setSubscribe(a)), 
            this.store.dispatch(f.default.setData(t)), t.length > 0 && i.default.send({
                rpage: "wx_pcenter",
                block: "wx_pcenter_playstory"
            });
        }
    },
    getSearchData: function(e) {
        var t = this;
        this.store.dispatch(f.default.showLoad());
        var a = this.app.globalData.systemInfo, o = {
            version: a.version,
            os: a.system.split(" ")[1] || "",
            ua: a.model,
            ckuid: r.default.getAnonymousUid(),
            auth: r.default.getAuthcookie(),
            page_size: 9
        }, s = Object.assign({}, {
            page_num: e.pageNum
        }, o);
        u.default.getAllRecord(s).then(function(e) {
            return t.store.dispatch(f.default.completeLoad()), {
                results: e.data && e.data.data || []
            };
        }).then(function(a) {
            return a.results.length || (a.isEmpty = !0), a.isEmpty ? t.store.dispatch(f.default.nomoreLoad()) : i.default.send({
                rpage: "wx_pcenter",
                block: "wx_pcenter_playstory"
            }), t.store.dispatch(f.default.setData(a.results, !0, e.pageNum)), a.results;
        }).catch(function(e) {});
        var c = {
            ckuid: r.default.getAnonymousUid(),
            authcookie: r.default.getAuthcookie(),
            containsUgc: 1,
            subTypes: "1,2,7",
            pageSize: 9,
            page: 0
        };
        l.default.getAllSubscribes(c).then(function(e) {
            return t.store.dispatch(f.default.completeLoad()), {
                results: e.data && e.data.data || []
            };
        }).then(function(a) {
            return a.results.length || (a.isEmpty = !0), a.isEmpty ? t.store.dispatch(f.default.nomoreLoad()) : i.default.send({
                rpage: "wx_pcenter",
                block: "wx_pcenter_mycollect"
            }), t.store.dispatch(f.default.setSubscribe(a.results, !0, e.pageNum)), a.results;
        }).catch(function(e) {});
    },
    playRecord: function(e) {
        var t = e.currentTarget.dataset, a = t.id, i = t.type, r = t.tvid, o = "", s = "", c = {};
        1 == i ? (this.store.getState().record.forEach(function(e, t) {
            e.id == a && (c = e);
        }), o = "wx_pcenter_history", s = "wx_pcenter_playstory") : (this.store.getState().subscribes.forEach(function(e, t) {
            e.tvId == r && (c = e);
        }), o = "wx_pcenter_collection", s = "wx_pcenter_mycollect"), this.clickPingback({
            block: s,
            rseat: o
        }), this._playVideo({
            qipuId: 1 == i ? c.qipuId : c.tvId,
            vid: c.vid,
            id: c.id,
            albumName: c.albumName,
            sourceName: c.sourceName,
            aid: c.aid,
            type: c.type || ""
        });
    },
    _playVideo: function(e) {
        wx.navigateTo({
            url: "/pages/video/video?qipuId=" + e.qipuId + "&id=" + e.id + "&aid=" + e.aid + "&type=" + e.type + "&albumName=" + e.albumName + "&sourceName=" + e.sourceName + "&rfr=wx_pcenter"
        });
    },
    findmore: function(e) {
        var t = e.detail.formId, a = e.currentTarget.dataset.rseat || "";
        (0, o.collectFormIdMuti)(t, a);
        this.store.getState().record;
        wx.navigateTo({
            url: "/subPackage/pages/playLog/playLog?rfr=wx_pcenter"
        });
    },
    findSubscribeMore: function() {
        this.store.getState().subscribes;
        wx.navigateTo({
            url: "/subPackage/pages/subscribeLog/subscribeLog?rfr=wx_pcenter"
        });
    },
    feedback: function(e) {
        var t = e.detail.formId, a = e.currentTarget.dataset.rseat || "";
        (0, o.collectFormIdMuti)(t, a), this.clickPingback({
            block: "",
            rseat: "wx_pcenter_feedback"
        }), wx.navigateTo({
            url: "/subPackage/pages/userSet/userSet?rfr=wx_pcenter"
        });
    },
    onShow: function(e) {
        t.default.send({
            rpage: "wx_pcenter"
        }), this.onShow.run ? this.data.mutiDialogFlag || this.loadPage() : this.onShow.run = !0, 
        wx.hideLoading && wx.hideLoading(), wx.hideKeyboard();
    },
    onUnload: function() {
        this.app.emitter.off("afterToggleByWechatwx_pcenter", this.switchMutiSuccess), this.app.emitter.off("showMutiAfterWechatwx_pcenter", this.showMutiDialogByWechat), 
        this.app.emitter.off("hideMutiDialog", this.hideMutiDialog);
    },
    clickPingback: function(e) {
        a.default.send({
            rpage: "wx_pcenter",
            block: e.block,
            rseat: e.rseat
        });
    },
    loginSuccessCb: function() {
        this.loadPage();
    },
    collectLoginForm: function(e) {
        var t = e.detail.formId, a = e.currentTarget.dataset.rseat || "";
        (0, o.collectFormIdMuti)(t, a);
    },
    onPullDownRefresh: function() {},
    switchMutiSuccess: function() {
        this.loginSuccessCb();
    },
    showMutiDialogByWechat: function() {
        this.setData({
            enableScroll: !1
        });
    },
    hideMutiDialog: function() {
        this.setData({
            enableScroll: !0,
            mutiDialogFlag: !1
        });
    }
};

Page(Object.assign({}, m, s.default, d.default));