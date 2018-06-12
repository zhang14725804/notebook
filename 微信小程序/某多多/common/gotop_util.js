function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = e(require("./system_info")), t = e(require("./logger")), a = {
    showGoTopBtn: function(e, t) {
        t && !isNaN(e) && (t.winHeight || (t.winHeight = o.default.getWindowHeightSync()), 
        e > t.winHeight ? t.data.goTopClass || t.setData({
            goTopClass: !0
        }) : t.data.goTopClass && t.setData({
            goTopClass: !1
        }));
    },
    goTop: function(e) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 300;
        wx.pageScrollTo && wx.pageScrollTo({
            scrollTop: 0,
            duration: o
        }), e || t.default.send({
            op: "click",
            event: "pop_btn_clk",
            page_section: "pop_list",
            page_element: "top_btn"
        });
    }
};

exports.default = a;