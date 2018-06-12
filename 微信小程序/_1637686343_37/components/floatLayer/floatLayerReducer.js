function t() {
    var t = wx.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
    });
    return t.translate3d(0, 0, 0).step(), t.export();
}

function e(e, n) {
    var r = {};
    return r.animation = t(), r.show = !0, r.msg = n.msg, r.tips = n.tips, Object.assign({}, e, r);
}

function n(t, e) {
    return t.animation = r(e), t;
}

function r(t) {
    var e = wx.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
    });
    return e.translate3d(0, "100%", 0).step(), e.export();
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments[1];
    switch (r.type) {
      case "SHOW_ANIMATION":
        return e(t, r);

      case "HIDE_ANIMATION":
        return n(t, r.rightTime);

      default:
        return t;
    }
};