Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = {
    LotteryRule: 1,
    PortalLottery: 2,
    GroupModal: 6,
    PortalFreeTrial: 7,
    PortalPromotionSlip: 8,
    ShowShareTimeline: 9,
    ShowGroupTitlePrefix: 10,
    GroupBuyButtonText: 11,
    LaunchAPPTimeLineShare: 12
}, t = {
    BanList: 2,
    Eco: 3,
    ZJ: 4,
    SubEco: 5,
    Other: 6
}, e = {
    PortalLottery: {
        Goods: 1,
        Icon: 2
    },
    PortalFreeTrial: {
        Goods: 1,
        Icon: 2
    }
}, r = {};

r[t.BanList] = {}, r[t.BanList][o.LotteryRule] = 0, r[t.BanList][o.PortalLottery] = 0, 
r[t.BanList][o.GroupModal] = 0, r[t.BanList][o.PortalFreeTrial] = 0, r[t.BanList][o.PortalPromotionSlip] = 0, 
r[t.BanList][o.BirthpetStrategy] = 0, r[t.BanList][o.ShowShareTimeline] = 0, r[t.BanList][o.ShowGroupTitlePrefix] = 1, 
r[t.BanList][o.GroupBuyButtonText] = 0, r[t.BanList][o.LaunchAPPTimeLineShare] = 0, 
r[t.Eco] = {}, r[t.Eco][o.LotteryRule] = 0, r[t.Eco][o.PortalLottery] = 0, r[t.Eco][o.GroupModal] = 0, 
r[t.Eco][o.PortalFreeTrial] = 0, r[t.Eco][o.PortalPromotionSlip] = 0, r[t.Eco][o.BirthpetStrategy] = 0, 
r[t.Eco][o.ShowShareTimeline] = 0, r[t.Eco][o.ShowGroupTitlePrefix] = 0, r[t.Eco][o.GroupBuyButtonText] = 0, 
r[t.Eco][o.LaunchAPPTimeLineShare] = 0, r[t.ZJ] = {}, r[t.ZJ][o.LotteryRule] = 0, 
r[t.ZJ][o.PortalLottery] = 0, r[t.ZJ][o.GroupModal] = 0, r[t.ZJ][o.PortalFreeTrial] = 0, 
r[t.ZJ][o.PortalPromotionSlip] = 0, r[t.ZJ][o.BirthpetStrategy] = 0, r[t.ZJ][o.ShowShareTimeline] = 0, 
r[t.ZJ][o.ShowGroupTitlePrefix] = 0, r[t.ZJ][o.GroupBuyButtonText] = 0, r[t.ZJ][o.LaunchAPPTimeLineShare] = 0, 
r[t.SubEco] = {}, r[t.SubEco][o.LotteryRule] = 1, r[t.SubEco][o.PortalLottery] = e.PortalLottery.Goods, 
r[t.SubEco][o.GroupModal] = 0, r[t.SubEco][o.PortalFreeTrial] = e.PortalFreeTrial.Goods, 
r[t.SubEco][o.PortalPromotionSlip] = 1, r[t.SubEco][o.BirthpetStrategy] = 2, r[t.SubEco][o.ShowShareTimeline] = 1, 
r[t.SubEco][o.ShowGroupTitlePrefix] = 0, r[t.SubEco][o.GroupBuyButtonText] = 1, 
r[t.SubEco][o.LaunchAPPTimeLineShare] = 0, r[t.Other] = {}, r[t.Other][o.LotteryRule] = 1, 
r[t.Other][o.PortalLottery] = e.PortalLottery.Goods, r[t.Other][o.GroupModal] = 1, 
r[t.Other][o.PortalFreeTrial] = e.PortalFreeTrial.Goods, r[t.Other][o.PortalPromotionSlip] = 1, 
r[t.Other][o.BirthpetStrategy] = 2, r[t.Other][o.ShowShareTimeline] = 1, r[t.Other][o.ShowGroupTitlePrefix] = 0, 
r[t.Other][o.GroupBuyButtonText] = 1, r[t.Other][o.LaunchAPPTimeLineShare] = 1, 
exports.default = {
    Scene: o,
    Role: t,
    Result: r,
    ExtraField: e
};