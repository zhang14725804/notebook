Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    lottery: "抽奖",
    freeTrial: "免费试用",
    appOnly: "App专享",
    preSale: "预售",
    capitalGift: "包团送礼"
};

exports.default = {
    getGoodsIconsData: function(a) {
        if (a) {
            var t = [];
            return a.isLottery && t.push({
                iconName: e.lottery
            }), a.isFreeTrial && t.push({
                iconName: e.freeTrial
            }), (a.isCapitalGift || a.isCapitalGiftLottery) && t.push({
                iconName: e.capitalGift
            }), a.isApp && t.push({
                iconName: e.appOnly
            }), a.isPreSale && t.push({
                iconName: e.preSale
            }), t;
        }
    }
};