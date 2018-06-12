function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (c.default.os.isAndroid) return e;
    var r;
    switch (t.networkType) {
      case "wifi":
        r = 4;
        break;

      case "4g":
        r = 2;
        break;

      default:
        r = 1;
    }
    var a = c.default.storage.handleStorageMuti("get", "rate") || r;
    return Object.assign({}, e, {
        rate: a
    });
}

function r(e) {
    return e || a();
}

function a(e) {
    var t = {
        rateList: [ {
            rate: 2,
            name: "高清",
            canPlay: !0
        }, {
            rate: 1,
            name: "流畅",
            canPlay: !0
        } ],
        showRate: !1,
        showShare: !1
    };
    return c.default.os.isIOS ? t.rateList.unshift({
        rate: 4,
        name: "超清",
        canPlay: !0
    }) : t.rate = c.default.storage.handleStorageMuti("get", "rate") || 2, t;
}

function n(e) {
    return Object.assign({}, e, {
        showRate: !e.showRate
    });
}

function s(e, t) {
    var r = t.rate;
    return c.default.storage.handleStorageMuti("set", "rate", r), Object.assign({}, e, {
        rateList: e.rateList.map(function(e) {
            return e.className = e.rate === r ? "clarity-active" : "", e;
        }),
        rate: r,
        showRate: !1
    });
}

function u(e, t) {
    var r = t.rates || [], n = t.flag, s = t.canPlay, u = a(r).rateList.reduce(function(e, t) {
        return !1 === s && 4 == t.rate && (t.canPlay = s), e.push(t), e;
    }, []), i = u.some(function(t) {
        return t.rate === e.rate;
    }) ? e.rate : (u[0] || {}).rate;
    return i && c.default.storage.handleStorageMuti("set", "rate", i), n || (i = 0), 
    Object.assign({}, e, {
        rateList: u,
        rate: i
    });
}

function i(e) {
    return Object.assign({}, e, {
        showShare: !0
    });
}

function o(e) {
    return Object.assign({}, e, {
        showShare: !1
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e, a) {
    switch (a.type) {
      case "SET_RATE":
        return s(e, a);

      case "SET_RATE_LIST":
        return u(e, a);

      case "SWITCH_RATE":
        return n(e);

      case "SHOW_SHARE":
        return i(e);

      case "HIDE_SHARE":
        return o(e);

      case "CHANGE_RATE_STATE":
        return Object.assign(e, a.options);

      case "SET_VIDEO_MODEL":
        return t(e, a);

      default:
        return r(e);
    }
};

var c = e(require("../../../common/utils/util"));

e(require("../../../common/polyfill/promise"));