function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("common/login/index"));

var t = e(require("common/pingback/launch")), a = e(require("common/emitter/Emitter")), n = e(require("common/utils/util"));

App({
    app: getApp(),
    emitter: new a.default(),
    onLaunch: function(e) {
        var a = this, o = {};
        this.globalData.showScene = n.default.isObject(e) ? e.scene : "", this.globalData.mutiPhone = "", 
        this.globalData.vfm = n.default.isObject(e) && n.default.isObject(e.query) ? e.query.vfm : "", 
        n.default.isObject(e) && n.default.isObject(e.query) && void 0 !== e.query.vfm && Object.assign(o, {
            vfm: e.query.vfm
        });
        try {
            var i = wx.getSystemInfoSync();
            this.globalData.systemInfo = i, Object.assign(o, {
                ua_model: i.model
            });
        } catch (e) {}
        wx.getNetworkType({
            success: function(e) {
                t.default.send(Object.assign(o, {
                    net_work: e.networkType
                })), a.globalData.networkType = e.networkType;
            },
            fail: function(e) {
                t.default.send(o);
            }
        }), wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(e) {
            a.globalData.networkType = e.networkType;
        });
    },
    onShow: function(e) {
        this.globalData.showScene = n.default.isObject(e) ? e.scene : "", this.globalData.agentversion = "2.3.0", 
        this.globalData.vfm = n.default.isObject(e) && n.default.isObject(e.query) ? e.query.vfm : "", 
        this.globalData.path = n.default.isObject(e) ? e.path : "";
    },
    onError: function(e) {},
    onHide: function() {
        this.globalData.vfm = "", this.globalData.path = "";
    },
    globalData: {
        userInfo: {},
        channel: {
            channelId: "2"
        },
        systemInfo: {}
    }
});