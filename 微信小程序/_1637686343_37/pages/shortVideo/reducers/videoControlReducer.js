function e(e) {
    return e || t();
}

function t() {
    return {
        rateList: [ {
            rate: 2,
            name: "高清"
        }, {
            rate: 1,
            name: "流畅"
        } ],
        rate: i.default.storage.handleStorageMuti("get", "rate") || 2,
        showRate: !1,
        showShare: !1
    };
}

function r(e) {
    return Object.assign({}, e, {
        showRate: !e.showRate
    });
}

function a(e, t) {
    var r = t.rate;
    return i.default.storage.handleStorageMuti("set", "rate", r), Object.assign({}, e, {
        rateList: e.rateList.map(function(e) {
            return e.className = e.rate === r ? "clarity-active" : "", e;
        }),
        rate: r,
        showRate: !1
    });
}

function n(e, r) {
    var a = r.rates || [], n = r.flag, s = t().rateList.reduce(function(e, t) {
        return -1 !== a.indexOf(t.rate) && e.push(t), e;
    }, []), u = s.some(function(t) {
        return t.rate === e.rate;
    }) ? e.rate : (s[0] || {}).rate;
    return u && i.default.storage.handleStorageMuti("set", "rate", u), n || (u = 0), 
    Object.assign({}, e, {
        rateList: s,
        rate: u
    });
}

function s(e) {
    return Object.assign({}, e, {
        showShare: !0
    });
}

function u(e) {
    return Object.assign({}, e, {
        showShare: !1
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(t, i) {
    switch (i.type) {
      case "SET_RATE":
        return a(t, i);

      case "SET_RATE_LIST":
        return n(t, i);

      case "SWITCH_RATE":
        return r(t);

      case "SHOW_SHARE":
        return s(t);

      case "HIDE_SHARE":
        return u(t);

      case "CHANGE_RATE_STATE":
        return Object.assign(t, i.options);

      default:
        return e(t);
    }
};

var i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/utils/util"));