Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = [ {
    name: "默认排序",
    sortTypeName: "PRIORITY"
}, {
    name: "销量排序",
    sortTypeName: "COUNT"
}, {
    name: "最新上架",
    sortTypeName: "ID"
}, {
    name: "价格从高到低",
    sortTypeName: "PRICE_DESC"
}, {
    name: "价格从低到高",
    sortTypeName: "PRICE_ASC"
} ], t = {
    good_fruit: "11",
    bargain: "12",
    super_spike: "14",
    go_shopping: "15",
    food: "17",
    furniture: "18",
    maternal: "20",
    electric_city: "23"
}, i = {
    11: {
        spikeTitle: "每日抢鲜",
        title: "品质水果",
        subTitle: "24H闪电发货 闪电退款",
        spikeRestfulParam: 19,
        spikeCmdId: 20012,
        goodsCmdId: 10421,
        tabCmdId: 10299
    },
    12: {
        title: "热销特卖",
        dayRecommandTitle: "今日推荐",
        recTitle: "今日好货，为您精选",
        subTitle: "每天9点·14点·20点更新",
        isGenTianType: !0,
        genTianId: "2",
        hasSpecialUrl: !0,
        tabUrl: "getGenTianTabData",
        goodsUrl: "getGenTianGoodsData",
        noSortTypeName: !0,
        recommendCmdId: 10421,
        tabCmdId: 10295,
        goodsCmdId: 10273
    },
    14: {
        spikeTitle: "每日疯抢",
        title: "品牌清仓",
        subTitle: "每天11点·21点更新",
        isGenTianType: !0,
        genTianId: "11",
        sortEnable: !1,
        hasSpecialUrl: !0,
        tabUrl: "getGenTianTabData",
        genTianTabParam_use_page: !0,
        goodsUrl: "getGenTianGoodsData",
        noSortTypeName: !0,
        spikeRestfulParam: 6,
        tabCmdId: 10295,
        spikeCmdId: 20012,
        goodsCmdId: 10273
    },
    15: {
        spikeTitle: "每日疯抢",
        title: "爱逛街",
        subTitle: "每天10点·20点更新",
        spikeUrl: "spike_go_shopping",
        isSpecialOfferSubjects: !0,
        hasSpecialUrl: !0,
        doubleSelect: !0,
        tabUrl: "getIShoppingTabData",
        genTianTabParam_use_page: !0,
        goodsUrl: "getIShoppingGoddsData",
        tabCmdId: 10297,
        spikeCmdId: 10300,
        goodsCmdId: 10278
    },
    16: {
        title: "特价爆款",
        goodsCmdId: 10421,
        tabCmdId: 10299
    },
    17: {
        spikeTitle: "每日试吃",
        title: "美食汇",
        subTitle: "",
        dayRecommandTitle: "特价推荐",
        recTitle: "",
        spikeRestfulParam: 7,
        spikeCmdId: 20012,
        goodsCmdId: 10421,
        recommendCmdId: 10421,
        tabCmdId: 10299
    },
    18: {
        spikeTitle: "优品速抢",
        title: "家居优品",
        subTitle: "一站购齐，买退无优",
        spikeUrl: "api/spike/spike_list?type=8",
        spikeCmdId: 2001,
        spikeType: 8,
        goodsCmdId: 10421,
        tabCmdId: 10299
    },
    20: {
        spikeTitle: "每日疯抢",
        title: "省钱妈咪",
        subTitle: "每天10点·20点更新",
        spikeUrl: "spike_mother_baby",
        spikeCmdId: 10073,
        goodsCmdId: 10421,
        tabCmdId: 10299
    },
    21: {
        spikeTitle: "品牌限时购",
        title: "名品折扣",
        subTitle: "品牌好货 每日上新",
        isGenTianType: !0,
        genTianId: "15",
        sortEnable: !1,
        hasSpecialUrl: !0,
        tabUrl: "getGenTianTabData",
        genTianTabParam_use_page: !0,
        goodsUrl: "getGenTianGoodsData",
        noSortTypeName: !0,
        tabCmdId: 10295,
        goodsCmdId: 10273
    },
    22: {
        spikeTitle: "每日疯抢",
        title: "时尚穿搭",
        subTitle: "每日上新，买手推荐",
        spikeUrl: "api/spike/spike_list?type=22",
        spikeType: 22,
        spikeCmdId: 2001,
        goodsCmdId: 10421,
        tabCmdId: 10299
    },
    23: {
        spikeTitle: "品牌限时抢",
        title: "电器城",
        subTitle: "七天退换，全国联保",
        spikeRestfulParam: 18,
        spikeCmdId: 20012,
        goodsCmdId: 10421,
        tabCmdId: 10299
    },
    default: {
        tabCmdId: 10299,
        goodsCmdId: 10421
    }
}, a = {
    economical_brand: {
        spikeTitle: "品牌限时购",
        title: "名品折扣",
        subTitle: "品牌好货 每日上新",
        spikeUrl: "api/spike/spike_list?type=23"
    }
};

exports.SubjectsNameIndex = t, exports.SortTypeData = e, exports.SubjectsSpikeInfo = i, 
exports.noSubjectsSpikeInfo = a;