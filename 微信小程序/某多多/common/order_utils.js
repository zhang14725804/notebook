Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../constants/order")), t = e.default.LotteryStatus, d = {
    getOrderCombinedStatus: function(d, r, u, n, a) {
        var i = a && a.eventType;
        if (r == e.default.PaymentStatus.RefundApplied && i != e.default.EVENT_TYPE.LUCKY_DRAW && i != e.default.EVENT_TYPE.FREE_TRIAL && (r = e.default.PaymentStatus.Payed), 
        n > t.Start && d == e.default.OrderStatus.Unconfirmed) {
            if (r == e.default.PaymentStatus.Payed) return e.default.OrderCombinedStatus.Expired;
            if (r == e.default.PaymentStatus.RefundApplied) return e.default.OrderCombinedStatus.UnconfirmedRefunding;
            if (r == e.default.PaymentStatus.Refunded) return e.default.OrderCombinedStatus.UnconfirmedRefunded;
        }
        if (r == e.default.PaymentStatus.Unpayed) return d == e.default.OrderStatus.Cancelled || n > t.Start ? e.default.OrderCombinedStatus.Cancelled : e.default.OrderCombinedStatus.Unpayed;
        if (r == e.default.PaymentStatus.Payed) if (u == e.default.ShipmentStatus.Unshipped) {
            if (d == e.default.OrderStatus.Unconfirmed) return e.default.OrderCombinedStatus.Unconfirmed;
            if (d == e.default.OrderStatus.Confirmed) return e.default.OrderCombinedStatus.Confirmed;
        } else {
            if (u == e.default.ShipmentStatus.Shipping) return e.default.OrderCombinedStatus.Shipping;
            if (u == e.default.ShipmentStatus.Received) return e.default.OrderCombinedStatus.Received;
        } else if (r == e.default.PaymentStatus.RefundApplied) {
            if (d == e.default.OrderStatus.Unconfirmed) return e.default.OrderCombinedStatus.UnconfirmedRefunding;
            if (u == e.default.ShipmentStatus.Unshipped) return e.default.OrderCombinedStatus.UnshippedRefunding;
            if (u == e.default.ShipmentStatus.Shipping || u == e.default.ShipmentStatus.Received) return e.default.OrderCombinedStatus.ShippingRefunding;
        } else if (r == e.default.PaymentStatus.Refunded) return d == e.default.OrderStatus.Unconfirmed ? e.default.OrderCombinedStatus.UnconfirmedRefunded : u == e.default.ShipmentStatus.Unshipped ? e.default.OrderCombinedStatus.UnshippedRefunded : e.default.OrderCombinedStatus.ShippingRefunded;
        return null;
    },
    getOrderCombinedStatusDescription: function(d, r, u, n, a) {
        if (18 == a) return "卖家已同意，售后处理中";
        if (17 == a) return "待收货";
        if (16 == a) return "交易成功";
        if (15 == a) return "售后申请中，待用户处理";
        if (14 == a) return "售后申请中，待卖家处理";
        switch (d) {
          case e.default.OrderCombinedStatus.Unpayed:
            return r > t.Start ? "交易已取消" : "待支付";

          case e.default.OrderCombinedStatus.Unconfirmed:
            return "拼团中";

          case e.default.OrderCombinedStatus.Confirmed:
            return r === t.Complete ? u ? "一等奖，待发货" : "二等奖，已退款并送券" : r === t.Start ? "已成团，待抽奖" : null != r ? "开奖中" : 1 == a ? "未发货，退款待卖家处理" : 2 == a || 3 == a ? "未发货，退款待平台处理" : 4 == a ? "未发货，退款中" : 5 == a ? "未发货，退款成功" : 9 == a ? "未发货，退款待用户处理" : 10 == a ? "已发货，退货待用户寄出" : 11 == a ? "已发货，退货待卖家签收" : "已成团，待发货";

          case e.default.OrderCombinedStatus.Shipping:
            return r === t.Complete && u ? "一等奖，待收货" : 1 == a ? "已发货，退款待卖家处理" : 2 == a || 3 == a ? "已发货，退款待平台处理" : 4 == a ? "已发货，退款中" : 5 == a ? "已发货，退款成功" : 9 == a ? "已发货，退款待用户处理" : 10 == a ? "已签收，退货待用户寄出" : 11 == a ? "已签收，退货待卖家签收" : "待收货";

          case e.default.OrderCombinedStatus.Received:
            var i = "已签收";
            if ("1" == n ? i = "待评价" : "0" == n && (i = "已评价"), r === t.Complete && u) return "一等奖，" + i;
            if ("1" == n || "0" == n) {
                if (1 == a) return "已签收，退款待卖家处理";
                if (2 == a || 3 == a) return "已签收，退款待平台处理";
                if (4 == a) return "已签收，退款中";
                if (5 == a) return "已签收，退款成功";
                if (9 == a) return "已签收，退款待用户处理";
            }
            return i;

          case e.default.OrderCombinedStatus.Cancelled:
            return "交易已取消";

          case e.default.OrderCombinedStatus.UnshippedRefunding:
            return r !== t.Complete || u ? "未发货，退款处理中" : "二等奖，退款中";

          case e.default.OrderCombinedStatus.UnshippedRefunded:
            return r !== t.Complete || u ? "未发货，退款成功" : "二等奖，已退款并送券";

          case e.default.OrderCombinedStatus.ShippingRefunding:
            return "已发货，退款处理中";

          case e.default.OrderCombinedStatus.ShippingRefunded:
            return "已发货，退款成功";

          case e.default.OrderCombinedStatus.Expired:
            return "拼团失败";

          case e.default.OrderCombinedStatus.UnconfirmedRefunding:
            return "未成团，退款处理中";

          case e.default.OrderCombinedStatus.UnconfirmedRefunded:
            return "未成团，退款成功";

          default:
            return "";
        }
    },
    isBargainOrder: function(e) {
        return e && 6 == e.order_type;
    }
};

exports.default = d;