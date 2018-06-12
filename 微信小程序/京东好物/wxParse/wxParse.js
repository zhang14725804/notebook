function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function t(e) {
    var t = this, a = e.target.dataset.src, i = e.target.dataset.from;
    void 0 !== i && i.length > 0 && wx.previewImage({
        current: a,
        urls: t.data[i].imageUrls
    });
}

function a(e, t) {
    var a = e.data[t].view.imagePadding, i = l - 2 * a, r = 0, n = 0, o = !1, d = 1;
    e.data.scaleTimer && clearInterval(e.data.scaleTimer);
    var s = e.data.scaleTimer = setInterval(function() {
        wx.createSelectorQuery().select(".scale-box").boundingClientRect(function(t) {
            t ? (r = t.width, n = t.height) : clearInterval(e.data.scaleTimer);
        }).exec(function() {
            0 != r && (o || (d = i / r, wx.pageScrollTo({
                scrollTop: e.data.scrollPostion + 50,
                duration: 200
            })), o = !0, e.setData({
                wxParseItem: {
                    scaleParentStyle: "width:" + i + "px;height:" + parseInt(n) + "px;overflow:hidden;",
                    scaleBoxStyle: "transform-origin: 0px 0px 0px;transform:scale(" + d + ")"
                }
            }));
        });
    }, 800);
    setTimeout(function() {
        clearInterval(s);
    }, 1e4);
}

function i(e) {
    var t = this, a = e.target.dataset.from, i = e.target.dataset.idx;
    void 0 !== a && a.length > 0 && r(e, i, t, a);
}

function r(t, a, i, r) {
    var o, l = i.data[r];
    if (l && 0 != l.images.length) {
        var d = l.images, s = n(t.detail.width, t.detail.height, i, r), g = d[a].index, c = "" + r, h = !0, u = !1, v = void 0;
        try {
            for (var m, f = g.split(".")[Symbol.iterator](); !(h = (m = f.next()).done); h = !0) c += ".nodes[" + m.value + "]";
        } catch (e) {
            u = !0, v = e;
        } finally {
            try {
                !h && f.return && f.return();
            } finally {
                if (u) throw v;
            }
        }
        var w = c + ".width", x = c + ".height";
        i.setData((o = {}, e(o, w, s.imageWidth), e(o, x, s.imageheight), o));
    }
}

function n(e, t, a, i) {
    var r = 0, n = 0, o = 0, s = {}, g = a.data[i].view.imagePadding;
    return r = l - 2 * g, d, e > r ? (o = (n = r) * t / e, s.imageWidth = n, s.imageheight = o) : (s.imageWidth = e, 
    s.imageheight = t), s;
}

var o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./html2json.js")), l = 0, d = 0;

wx.getSystemInfo({
    success: function(e) {
        l = e.windowWidth, d = e.windowHeight;
    }
}), module.exports = {
    wxParse: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData", r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', l = arguments[3], d = arguments[4], s = arguments.length > 5 && void 0 !== arguments[5] && arguments[5], g = l, c = {};
        "html" == r && (c = o.default.html2json(n, e, s)), c.view = {}, c.view.imagePadding = 0, 
        void 0 !== d && (c.view.imagePadding = d);
        var h = {};
        h[e] = c, g.setData(h), s && a(g, e), g.wxParseImgLoad = i, g.wxParseImgTap = t;
    },
    wxParseTemArray: function(e, t, a, i) {
        for (var r = [], n = i.data, o = null, l = 0; l < a; l++) {
            var d = n[t + l].nodes;
            r.push(d);
        }
        e = e || "wxParseTemArray", (o = JSON.parse('{"' + e + '":""}'))[e] = r, i.setData(o);
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", a = arguments[2];
        o.default.emojisInit(e, t, a);
    }
};