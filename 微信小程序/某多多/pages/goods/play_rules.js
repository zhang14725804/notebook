Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    default: "拼团玩法",
    freeTrial: "免费试用团玩法",
    capitalGift: ""
}, t = [ [ "支付开团", "或参团" ], [ "邀请好友", "参团" ], [ "人数达到", "分别发货" ], [ "人数不够", "自动退款" ] ], a = [ [ "0元开团", "或参团" ], [ "邀请好友", "参团" ], [ "人数达到", "成团" ], [ "随机抽中", "未中赠券" ] ], i = [ [ "支付订单", "开团送礼" ], [ "分享好友", "赠送礼物" ], [ "全部领取", "成团发货" ], [ "人数不够", "自动退款" ] ];

exports.default = {
    getPlayRules: function(l) {
        var r = e.default, f = t;
        return l && (l.isFreeTrial ? (r = e.freeTrial, f = a) : (l.isCapitalGift || l.isCapitalGiftLottery) && (r = e.capitalGift, 
        f = i)), {
            title: r,
            flow: f
        };
    }
};