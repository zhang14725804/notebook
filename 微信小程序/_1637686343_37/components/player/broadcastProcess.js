function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    return e.default = t, e;
}

function e(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function r(t) {
    return new p.default(function(e, r) {
        return 2 == t || 3 == t || 4 == t ? r(!1) : e(!0);
    });
}

function i(t, e, r) {
    function i() {
        var i = f.default.time.countdownFormat(t, o);
        r.store.dispatch(e.showTime(i)), i.total <= 0 && (clearInterval(r.timeinterval), 
        r.loadPage());
    }
    var o = r.store.getState().serverTimeBias;
    i(), r.timeinterval = setInterval(i, 1e3);
}

function o(t, e, r) {
    return t < e ? 0 : t >= e && t < r ? 1 : 2;
}

function n(t) {
    var e = {
        lc: t.channelId,
        lp: t.qipuId
    };
    return m.getLiveSource(e);
}

function a() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return t.sort(function(t, e) {
        return t.bid - e.bid;
    }), t;
}

function s() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = t.find(function(t, e) {
        return 2 == t.bid;
    });
    return e || t[0];
}

function c(t, e) {
    return t.program && 2 == t.program.payMark || u(e);
}

function u() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = {};
    return t.data && (e = t.data), e && e.prv && "1" == e.previewType || "1" == e.prv && "2" != e.previewType;
}

function h(t, e) {
    return t.program && 3 == t.program.payMark || u(e);
}

function d(t) {
    return t && t.program && 1 == t.program.payMark;
}

function l(t) {
    var e = t.program.vipTypes;
    return f.default.isArray(e) && 1 == e[0];
}

function v(t, e) {
    var r, i = new RegExp("(.*)" + e + "=([^;]+);");
    return (r = t.match(i)) ? r[2] : "";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var p = e(require("../../common/polyfill/promise")), f = e(require("../../common/utils/util")), m = t(require("../../pages/liveVideo/service/liveBroadcast")), g = e(require("../../common/user/user")), y = t(require("../../common/source/videoUtil")), w = require("../../common/source/qiyiVideoSource");

exports.default = {
    playLiveVideo: function(t, e) {
        var i = this, o = this, n = t.nowTime, a = (t.startTime, t.endTime, new Date().getTime() - n);
        return this.store.dispatch(e.setTimeBias(a)), r(t.pano).then(function() {
            return i.liveFlow(t, e, o);
        }).then(function(t) {
            0 != t && 2 != t || i.store.dispatch(e.showLiveLayer(!0));
        }).catch(function() {});
    },
    liveFlow: function(t, e, r) {
        var a = this, s = t.nowTime, c = t.startTime, u = t.endTime, h = o(s, c, u);
        return this.store.dispatch(e.liveStatus(h)), 2 == h ? p.default.resolve(h) : n(t).then(function(o) {
            if (a.store.dispatch(e.getLiveInterfaceInfo(o)), 0 == h) return i(c, e, r), h;
            a.passBroadcast(o, t.qipuId, e, h);
        }).catch(function() {});
    },
    displayStream: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = this, r = arguments[1], i = arguments[2];
        this.store.getState();
        void 0 !== i ? this.player.setUrl(i) : this.player.setUrl(t.url), this.store.dispatch(r.setVideoModel()).then(function() {
            e.autoPlay();
        });
    },
    autoPlay: function() {
        var t = this;
        setTimeout(function() {
            t.canPlay() && t.player.play();
        }, 1e3);
    },
    passBroadcast: function(t, e, r, i) {
        var o = this, n = t.data, c = a(n && n.streams);
        this.store.dispatch(r.getLiveStream(c));
        var u = s(c);
        if (0 == n.boss) return this.displayStream(u, r), i;
        2 == n.boss && m.getLiveAuthSource(u, e).then(function(t) {
            t.data && t.data.data, o.store.getState().getLiveInterfaceInfo.data;
            var e = u.url + "&QY00001=" + v(t.header["Set-Cookie"], "QY00001") + "&t=" + t.data.data.t;
            o.displayStream(u, r, e);
        }).catch(function(t) {
            var e = o.store.getState().getLiveInterfaceInfo.data || {}, i = t.errorMessage || {};
            if (t && t.data) n = t.data; else var n = {};
            o.showLayerBeforeStart(e, n, i, r);
        });
    },
    getLiveError: function(t, e) {
        var r = y.getError(t, e);
        return r.buttonclick = r.buttonclick, r;
    },
    showLayerBeforeStart: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i = arguments[3];
        c(t, e) ? this.store.dispatch(i.showError(this.getLiveError({
            content: "vipckPurchaseFail"
        }, {
            contentA: "本直播为VIP付费直播",
            buttonText: "看看其他视频",
            buttonclick: goToIndex
        }), !0)) : h(t, e) ? this.store.dispatch(i.showError(this.getLiveError({
            content: "vipckTicketFail"
        }, {
            contentA: "本直播为VIP用券直播",
            buttonText: "看看其他视频",
            buttonclick: goToIndex
        }), !0)) : d(t) ? g.default.isLogin() ? g.default.isVip() ? this.store.dispatch(i.showError(this.getLiveError(r))) : g.default.isExpiredVip() ? this.store.dispatch(i.showError(this.getLiveError(r))) : this.store.dispatch(i.showError(y.getError({
            content: "vipckfail"
        }, {
            contentA: "本直播为VIP直播",
            contentB: "请开通VIP会员后观看"
        }), !0)) : this.store.dispatch(i.showError(y.getError({
            content: "anonymousLayer"
        }, {
            contentA: "本直播为VIP直播",
            contentB: "VIP用户请在登录后观看"
        }))) : l(t) ? this.store.dispatch(i.showError(this.getLiveError((0, w.message)("miniLimit")))) : r && "domestic" == r.content ? this.store.dispatch(i.showError(this.getLiveError({
            content: "domestic"
        }, {
            contentB: "您所在的地区暂时无法观看当前直播"
        }))) : this.store.dispatch(i.showError(this.getLiveError(r)));
    }
};