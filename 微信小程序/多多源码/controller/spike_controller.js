function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../common/index"), i = e(require("../storage/ram_manager")), a = e(require("./formid_controller")), s = {
    setRemind: function(e, t, a) {
        this.isSettingRemind = !1;
        var s = e.goodsId;
        !0 === a.data ? (this.$showToast("已设提醒，开抢前3分钟自动提醒，请您留意微信消息"), i.default.spikeRemindGoodsIds.push(s.toString()), 
        this.setData(t)) : a.error_code && "2000101" === a.error_code && this.$showToast("商品即将开抢，请点击商品前往抢购");
    },
    cancelRemind: function(e, a, s) {
        this.isCancelingRemind = !1;
        var o = e.goodsId;
        s.data ? (this.$showToast("提醒已取消，您可能会抢不到哦"), t.Util.removeItemFromArr(i.default.spikeRemindGoodsIds, o.toString()), 
        this.setData(a)) : this.$showToast(s.err_msg || "取消失败，请稍后重试");
    },
    goodsRemindSetup: function(e, s, o, n, r) {
        var d = e.detail && e.detail.formId, c = e.currentTarget && e.currentTarget.dataset || {}, u = c.buttonType, m = c.goodsId, l = s, f = (t.User.getUserLocalInfo() || {}).nickName, g = void 0, h = {};
        switch (u) {
          case "on":
            o.forwardGoods(e, "btn");
            break;

          case "off":
            return;

          case "remind":
            if (o.isCancelingRemind || i.default.spikeRemindGoodsIds.indexOf(m.toString()) < 0 || !l) return;
            switch (g = t.DataUtil.accMul(l.startTime, 1e3), !0) {
              case g - Date.parse(new Date()) < 0:
                return void o.$showToast("商品限时抢购中，请点击商品前往抢购");

              case g - Date.parse(new Date()) < 18e4:
                return void o.$showToast("商品即将开抢，请点击商品前往抢购");
            }
            h = {
                start_time: g,
                goods_id: m
            }, o.isCancelingRemind = !0, a.default.cancel(h, t.Util.bind(this.cancelRemind, o, l, n), function() {
                o.isCancelingRemind = !1, o.$showToast("取消失败，请稍后重试");
            }), "function" == typeof r && r();
            break;

          case "coming":
            if (o.isSettingRemind || i.default.spikeRemindGoodsIds.indexOf(m.toString()) >= 0 || !l) return;
            switch (g = t.DataUtil.accMul(l.startTime, 1e3), !0) {
              case g - Date.parse(new Date()) < 0:
                return void o.$showToast("商品限时抢购中，请点击商品前往抢购");

              case g - Date.parse(new Date()) < 18e4:
                return void o.$showToast("商品即将开抢，请点击商品前往抢购");
            }
            h = {
                scene: 1,
                form_id: d,
                template_info: {
                    nick_name: f,
                    goods_id: m,
                    goods_name: l.goodsName,
                    original_price: t.DataUtil.accMul(l.marketPrice, 100),
                    discount_price: t.DataUtil.accMul(l.salePrice, 100),
                    start_time: g
                }
            }, o.isSettingRemind = !0, a.default.upload(h, t.Util.bind(this.setRemind, o, l, n), function() {
                o.isSettingRemind = !1, o.$showToast("设置失败，请稍后重试");
            }), "function" == typeof r && r();
        }
    }
};

exports.default = s;