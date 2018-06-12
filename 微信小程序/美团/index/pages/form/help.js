module.exports = {
    failTip: function(i) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, s = t.nav, a = t.index, e = void 0 === a ? 0 : a;
        s ? (this.switchButton(e), this.setData({
            isFormShow: !1
        }), wx.redirectTo({
            url: this.shareParam.path
        })) : (this.setData({
            isFormShow: !0
        }), setTimeout(function() {
            wx.showToast({
                title: "" + i,
                icon: "none"
            });
        }, 1e3), wx.hideShareMenu(), this.switchButton(e), 2 === e && (this.errMsg = i));
    },
    checkState: function(i) {
        if (!i) return this.failTip("发起活动失败"), void wx.showModal({
            content: "发起活动失败，请退出后重试"
        });
        switch (this.status = i.status, i.status) {
          case 200:
            wx.showToast({
                title: "参加活动成功"
            }), this.switchButton(1), this.setData({
                isFormShow: !0
            });
            break;

          case 44300:
            this.failTip("参数错误");
            break;

          case 44301:
            this.failTip("用户未登录", {
                index: 0
            });
            break;

          case 44302:
            this.failTip("活动未开始");
            break;

          case 44330:
            this.failTip("您已参与过活动", {
                nav: !0,
                index: 1
            });
            break;

          case 44331:
            this.failTip("奖品已发完", {
                index: 2
            });
            break;

          case 44334:
            this.failTip("活动已结束", {
                index: 2
            });
            break;

          case 44404:
            this.failTip("活动不存在", {
                index: 2
            });
            break;

          case 44600:
            this.failTip("今天没有名额了，明天再来吧～", {
                index: 2
            });
            break;

          default:
            this.failTip("未知错误");
        }
    },
    loadNotices: function(i) {
        i.data && this.setData({
            noticeList: i.data
        });
    }
};