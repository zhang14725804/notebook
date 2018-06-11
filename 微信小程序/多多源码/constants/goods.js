Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    GoodsType: {
        DEFAULT: 1,
        IMPORTS: 2,
        OVERSEAS_TRANSSHIP: 3,
        OVERSEAS_DM: 4,
        MOBILE_DATA: 5,
        MOBILE_FARE: 6,
        TRADE_COUPON: 7,
        QQ_COIN: 8,
        OIL_CARD: 9,
        MAKE_UP: 10
    },
    GoodsCat: {
        Fruit: 84,
        Crab: 103
    },
    SkuStatus: {
        OnSale: "ONSALE",
        InStock: "INSTOCK",
        Unavailable: "UNAVAILABLE"
    },
    ChannelSign: {
        0: {
            tag: 0,
            title: "限时秒杀",
            subTitle: "准时抢好品 限量不等人",
            fontColor: "#E02E24",
            backgroundColor: "#FDF4F4",
            iconClass: "icon-mark-alarmclock-"
        },
        1: {
            tag: 1,
            title: "名品折扣",
            subTitle: "大牌名品低价购",
            fontColor: "#ffc32a",
            backgroundColor: "#fffff5",
            iconClass: "icon-mark-zhe-"
        },
        2: {
            tag: 2,
            title: "爱逛街",
            subTitle: "时尚抢先 爆款特价",
            fontColor: "#ff70b0",
            backgroundColor: "#fff5fa",
            iconClass: "icon-mark-skirt-"
        },
        3: {
            tag: 3,
            title: "品质水果",
            subTitle: "全球精选 闪电发货",
            fontColor: "#1ecd16",
            backgroundColor: "#f3fff2",
            iconClass: "icon-mark-fruit-"
        },
        4: {
            tag: 4,
            title: "品牌清仓",
            subTitle: "放心品质 低价清仓",
            fontColor: "#fc6cad",
            backgroundColor: "#fff5fa",
            iconClass: "icon-mark-bag-"
        },
        "-1": {
            tag: -1,
            fontColor: "#e02e24",
            backgroundColor: "#fafafa",
            iconClass: ""
        }
    },
    PromotionEventType: {
        LIMIT_TIME_DISCOUNT: 2,
        LIMIT_COUNT_DISCOUNT: 3
    },
    SourceChannel: {
        GOODS_DETAIL_BOTTOM_BUY: "0",
        GOODS_DETAIL_LOCAL_GROUP: "1",
        GROUP_DETAIL_TO_GOODS_DETAIL: "2",
        GROUP_DETAIL_BUY: "3",
        PERSONAL_COLLECTION: "4"
    }
};