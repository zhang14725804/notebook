function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = require("../../utils/util.js"), o = require("../../utils/keplerReport.js").init(), i = getApp();

Page({
    data: (a = {
        productDir: "/kwxitem",
        screenHeight: 0,
        screenWidth: 0,
        assessImgWidth: 0,
        assessImgHeight: 0,
        wareId: "",
        toffset: 1,
        tnum: 10,
        ttype: "0",
        tabHoverAll: "tab-hover",
        tabHoverPic: "",
        tabHoverGood: "",
        tabHoverNomal: "",
        tabHoverBad: "",
        toTopDisplay: "block",
        scrollTop: 0,
        commentInfo: {}
    }, t(a, "toTopDisplay", "none"), t(a, "scrollTop", 0), t(a, "bigPicDisable", !1), 
    a),
    onLoad: function(t) {
        var a = this;
        a.setData({
            wareId: t.wareId,
            ttype: t.type
        }), 4 == t.type ? a.nagvToPic() : a.nagvToALL(), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    screenHeight: t.windowHeight,
                    screenWidth: t.windowWidth
                });
            }
        }), this.assessImg(a.data.screenWidth, 10, 10, 4), o.set({
            urlParam: t,
            skuid: t.wareId,
            title: "商品评价",
            shopid: "",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        this.setData({
            bigPicDisable: !1
        }), o.pv();
    },
    assessImg: function(t, a, e, o) {
        var i = (t - 2 * a - 3 * e) / o;
        this.setData({
            assessImgWidth: i,
            assessImgHeight: i
        });
    },
    toViewPage: function(t) {
        this.setData({
            commentInfo: t
        });
    },
    getData: function(t, a, o, n, s) {
        var r = this;
        e.request({
            url: i.globalRequestUrl + r.data.productDir + "/newComments/newCommentsDetail.json?wareId=" + t + "&offset=" + a + "&num=" + o + "&type=" + n + "&checkParam=LUIPPTP",
            success: s.bind(r),
            complete: function() {
                wx.hideToast();
            },
            fail: function(t) {
                e.reportErr("assess newCommentsDetail.json: " + t.errMsg);
            }
        });
    },
    nagvToALL: function(t) {
        var a = this;
        wx.showToast({
            title: "评价在路上...",
            icon: "loading",
            duration: 3e3
        }), a.setData({
            ttype: "0",
            toffset: 1,
            tnum: 10,
            tabHoverAll: "tab-hover",
            tabHoverPic: "",
            tabHoverGood: "",
            tabHoverNomal: "",
            tabHoverBad: ""
        }), this.unionClick("MProductdetail_CommentAllTab", "5", "", "", t), a.getData(a.data.wareId, a.data.toffset, a.data.tnum, a.data.ttype, a.toViewPage);
    },
    nagvToPic: function(t) {
        wx.showToast({
            title: "评价在路上...",
            icon: "loading",
            duration: 3e3
        });
        var a = this;
        a.setData({
            ttype: "4",
            toffset: 1,
            tnum: 10,
            tabHoverAll: "",
            tabHoverPic: "tab-hover",
            tabHoverGood: "",
            tabHoverNomal: "",
            tabHoverBad: ""
        }), this.unionClick("MProductdetail_CommentPictureTab", "5", "", "", t), a.getData(a.data.wareId, a.data.toffset, a.data.tnum, a.data.ttype, a.toViewPage);
    },
    nagvToGood: function(t) {
        wx.showToast({
            title: "评价在路上...",
            icon: "loading",
            duration: 3e3
        });
        var a = this;
        a.setData({
            ttype: "3",
            toffset: 1,
            tnum: 10,
            tabHoverAll: "",
            tabHoverPic: "",
            tabHoverGood: "tab-hover",
            tabHoverNomal: "",
            tabHoverBad: ""
        }), this.unionClick("MProductdetail_CommentFavorableTab", "5", "", "", t), a.getData(a.data.wareId, a.data.toffset, a.data.tnum, a.data.ttype, a.toViewPage);
    },
    nagvToNomal: function(t) {
        wx.showToast({
            title: "评价在路上...",
            icon: "loading",
            duration: 3e3
        });
        var a = this;
        a.setData({
            ttype: "2",
            toffset: 1,
            tnum: 10,
            tabHoverAll: "",
            tabHoverPic: "",
            tabHoverGood: "",
            tabHoverNomal: "tab-hover",
            tabHoverBad: ""
        }), this.unionClick("MProductdetail_CommentMediumTab", "5", "", "", t), a.getData(a.data.wareId, a.data.toffset, a.data.tnum, a.data.ttype, a.toViewPage);
    },
    nagvToBad: function(t) {
        wx.showToast({
            title: "评价在路上...",
            icon: "loading",
            duration: 3e3
        });
        var a = this;
        a.setData({
            ttype: "1",
            toffset: 1,
            tnum: 10,
            tabHoverAll: "",
            tabHoverPic: "",
            tabHoverGood: "",
            tabHoverNomal: "",
            tabHoverBad: "tab-hover"
        }), this.unionClick("MProductdetail_CommentPoorTab", "5", "", "", t), a.getData(a.data.wareId, a.data.toffset, a.data.tnum, a.data.ttype, a.toViewPage);
    },
    toViewPageAdd: function(t) {
        var a = this, e = t.wareDetailComment.commentInfoList, o = a.data.commentInfo.wareDetailComment.commentInfoList;
        o = o.concat(e);
        var i = a.data.commentInfo;
        i.wareDetailComment.commentInfoList = o, a.setData({
            commentInfo: i
        });
    },
    toTopTap: function(t) {
        this.setData({
            toTopDisplay: "none",
            scrollTop: .001 * Math.random()
        });
    },
    listScroll: function(t) {
        t.detail.scrollTop > this.data.screenHeight ? this.setData({
            toTopDisplay: "block"
        }) : this.setData({
            toTopDisplay: "none"
        });
    },
    scrollDownRefresh: function() {
        var t = this;
        t.setData({
            toffset: t.data.toffset + 1,
            toTopDisplay: "block"
        }), t.getData(t.data.wareId, t.data.toffset, t.data.tnum, t.data.ttype, t.toViewPageAdd);
    },
    nagvToProduct: function() {
        wx.navigateBack({
            delta: 1,
            success: function(t) {},
            fail: function() {},
            complete: function() {}
        });
    },
    gotoBigPic: function(t) {
        for (var a = [], e = t.currentTarget.dataset.arr, o = 0; o < e.length; o++) a.push(e[o].picURL);
        wx.previewImage({
            current: t.currentTarget.dataset.src,
            urls: a
        });
    },
    unionClick: function(t, a, e, i, n) {
        o.click({
            eid: t,
            elevel: a,
            eparam: e,
            pname: "",
            pparam: "",
            target: i,
            event: n
        });
    }
});