function e() {
    var t = e.animation;
    return t || (t = e.animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
    })), t;
}

function t(e, t) {
    if (void 0 !== t.length) {
        for (var n = [], i = 0; i < t.length; i++) n.push({
            showDesc: !1
        });
        return Object.assign({}, t.desc, {
            descList: n,
            ind: t.ind,
            length: t.length
        }) || e;
    }
    return t.desc || e;
}

function n(t, n) {
    if (void 0 !== t.descList) return t.descList.forEach(function(t, i) {
        var s = e();
        i == n.ind && (t.showDesc = !t.showDesc, s.rotate(t.showDesc ? 180 : 0).step()), 
        t.filmAnimation = s.export();
    }), Object.assign({}, t, {
        ind: n.ind
    });
    var i = e(), s = t.showDesc;
    return i.rotate(s ? 0 : 180).step(), {
        showDesc: !s,
        filmAnimation: i.export()
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = arguments[1];
    return "INIT" === i.type ? t(e, i) : "SWITCH_DESC" === i.type ? n(e, i) : e;
};