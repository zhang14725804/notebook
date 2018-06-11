Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    CommentStatus: require("./comment").CommentStatus,
    AuthorizationType: {
        SMS: 1,
        Weibo: 2,
        WeChat: 3,
        QQ: 4
    },
    PaymentType: {
        AliPay: 1,
        WeChat: 2,
        QQPay: 3,
        ApplePay: 4
    },
    GroupStatus: {
        OnGoing: 0,
        Success: 1,
        Failed: 2
    },
    GroupRole: {
        NotInGroup: 0,
        Member: 1,
        Lead: 2
    },
    RegionType: {
        Province: "1",
        City: "2",
        District: "3"
    },
    Region: {
        China: "1"
    },
    AddressClass: {
        Default: "1",
        Common: "0"
    },
    OrderStatus: {
        Unconfirmed: "0",
        Confirmed: "1",
        Cancelled: "2"
    },
    PaymentStatus: {
        Unpayed: "0",
        Payed: "2",
        RefundApplied: "3",
        Refunded: "4"
    },
    ShipmentStatus: {
        Unshipped: "0",
        Shipping: "1",
        Received: "2"
    },
    rateStatus: {
        rateEnable: "1",
        rateUnable: "0"
    },
    OrderCombinedStatus: {
        Unpayed: 0,
        Unconfirmed: 1,
        Confirmed: 2,
        Shipping: 3,
        Received: 4,
        Cancelled: 5,
        UnshippedRefunding: 6,
        UnshippedRefunded: 7,
        ShippingRefunding: 8,
        ShippingRefunded: 9,
        Expired: 10,
        UnconfirmedRefunding: 11,
        UnconfirmedRefunded: 12
    },
    SkuStatus: {
        OnSale: "ONSALE",
        InStock: "INSTOCK",
        Unavailable: "UNAVAILABLE"
    },
    WaterMark: {
        Default: "!share_v2",
        WeChatMsg: "!share_v3",
        Share: "!share",
        Transparent: "!transparent",
        None: ""
    },
    Mall: {
        NoCS: "此商家暂未开启在线客服功能",
        NoCSOnline: {
            NormalMall: "当前没有在线客服，在线客服的服务时间是9:00~20:00。您的话将会变成留言",
            DefaultMall: "在线客服的服务时间是9:00~18:00。您的话将会变成留言"
        },
        PddMall: [ 1, 11 ],
        ServiceStart: 9,
        ServiceEnd: {
            NormalMall: 20,
            DefaultMall: 18
        }
    },
    GoodsType: {
        DEFAULT: 1,
        IMPORTS: 2,
        OVERSEAS_TRANSSHIP: 3,
        OVERSEAS_DM: 4,
        MOBILE_DATA: 5,
        MOBILE_FARE: 6,
        TRADE_COUPON: 7
    },
    EVENT_TYPE: {
        DEFAULT: 0,
        LUCKY_DRAW: 1,
        SPIKE: 2,
        TZMD: 3,
        GET_EXTRA_FOR_FREE: 4,
        SUPER_SPIKE: 5,
        NEW_USER_GROUP: 6,
        FREE_TRIAL: 7,
        CAPITAL_GIFT: 8,
        CAPITAL_GIFT_LOTTERY: 9,
        TZYY: 10,
        DEPOSITE_GROUP: 11,
        MULTIPLY_GOODS_DISCOUNT: 12,
        LIMIT_TIME_DISCOUNT: 16,
        LIMIT_COUNT_DISCOUNT: 18
    },
    OrderType: {
        All: 0,
        PendingPay: 1,
        Shipping: 2,
        Collecting: 3,
        Evaluating: 4
    },
    OrderDesc: {
        Received: "已签收"
    },
    ForceContactBound: 5,
    ForceContactHighBound: 10,
    OFFICIAL_MALL_ID: {
        Online: "606",
        Hutaojie: "40",
        Weipin: "16"
    },
    PROBLEM_TYPE_DESC: {
        1: "未收到货",
        2: "水果破损腐烂",
        3: "商品少发漏发发错",
        4: "商品与描述不一致",
        5: "退款过程遇到问题",
        0: "其他"
    },
    CookieKey: {
        AccessToken: "PDDAccessToken",
        WebpEnable: "webp",
        UA: "ua",
        AB: "ab",
        SP: "sp",
        GP: "gp",
        UID: "pdd_user_id",
        UserGrade: "egrp"
    },
    LocalStorageKey: {
        AccessToken: "AccessToken",
        ShowAlertDelayLoad: "ShowAlertDelayLoad",
        DelayLoadTimestamp: "DelayLoadTimestamp",
        UID: "0e4f9612e0fbe579",
        NewbeeGift: "0a6afe66ccefef54",
        FreeCouponsIndex: "index_tz",
        LastGoodsID: "LASTGOODSID",
        LastVisitGoods: "c3a4ac3acbffadc9",
        LastGroupOrderID: "LASTGROUPORDERID",
        LastVisitGroup: "72d02a9490f4271b",
        GoodsLikeData: "LIKEDATA",
        SuperSpike: "e4429941e04239f6",
        WeixinInfo: "weixinInfo",
        ReloadAddresses: "reloadAddresses",
        PartnerList: "b493518d3aacfa04",
        OrderInfoCaches: "ORDER_INFO_CACHES",
        CheckAppDownload: "e1adaa118ffc8534",
        AppDownloadUsers: "618bf2394a0be09f",
        InCacheOrderType: "in_cache_order_type",
        Speical99: "speical99",
        OnePurchase: "onePurchase",
        LastRankIndex: "LAST_RANK_INDEX",
        LastVisitData: "lastVisitData",
        SearchHistory: "SEARCH_HISTORY",
        FreeTrial: "58b303885a50357c",
        FreeTrialAlert: "freeTrialAlert",
        LastPaymentType: "LastPaymentType",
        AfterPayed: "afterpayed",
        IndexTopTab: "indexTopTab",
        LastPersonalMsg: "LastPersonalMsg",
        IphoneResultKey: "LuckyWheelIphoneResult",
        AB: "ab",
        SP: "sp",
        GP: "gp",
        UserGrade: "egrp"
    },
    AlertType: {
        Alert: {
            AlertNewUserGroup: "alert_new_user_group",
            AlertAppDownload: "alert_app_download",
            AlertOpenAppNotification: "alert_open_app_notification",
            AlertCouponSend: "alert_coupon_send",
            AlertFreeTrial: "alert_free_trial",
            IDCardHint: "ID_card_hint"
        },
        Confirm: {
            ConfirmDefault: "confirm_default",
            ConfirmShipment: "confirm_shipment",
            ConfirmAppGroup: "confirm_app_group",
            ConfimWeChatWapPay: "confirm_wechat_wap_pay",
            ConfirmAppUpdate: "confirm_app_udpate",
            ConfirmJSPhotoAppUpdate: "confirm_jsphoto_app_update",
            ConfirmAfterGroupShare: "confirm_after_group_share"
        }
    },
    ShareChannel: {
        Unknown: "unknown",
        AppMessage: "message",
        Timeline: "timeline",
        QQ: "qq",
        QQZone: "qzone",
        QQWeibo: "qq_weibo",
        SinaWeibo: "weibo"
    },
    BanRegions: [ "广东 广州", "广东 " ],
    APIRetryLimit: 3,
    CDNImgHostName: "http://pinduoduoimg.yangkeduo.com/",
    ImprTime: 1e3,
    ImprTimeTest: 700,
    CouponBatchType: {
        GroupFreeCoupon: 7,
        MallCoupon: 8,
        GoodsCoupon: 9,
        VirtualGoods: 13
    },
    ContactURLType: {
        LowPrice: 1,
        HighPrice: 2
    },
    TrackingChannels: [ "src", "from", "campaign", "cid" ],
    TrackingEvent: {
        OpenAddress: "open_address",
        SkipAppGroup: "skip_app_group",
        AlertAppDownload: {
            Show: "a_a_d_s",
            Download: "a_a_d_d",
            Close: "a_a_d_c"
        }
    },
    LotteryStatus: {
        Start: 0,
        BeforeConfirm: 1,
        Confirm: 2,
        Complete: 3
    },
    NativeStorageKey: {
        CheckUpdateTime: "check_update_time"
    },
    AppDownloadUrl: {
        Default: "download.html",
        IOS: "https://itunes.apple.com/cn/app/pin-duo-duo/id1044283059?l=zh&mt=8",
        Android: "http://pinduoduo.oss-cn-shanghai.aliyuncs.com/android/pinduoduo_latest.apk"
    },
    QueryTag: {
        Skip: {
            AppGroup: "app_group"
        }
    },
    LastVisitDuration: {
        Goods: 864e5,
        Group: 864e5
    },
    NoLongerPromptAppDownload: "-1",
    AppDownloadUsersMaxNum: 10,
    ForceContactUIDThreshold: {
        minNumber: 2,
        maxNumber: 4
    },
    GoodsCat: {
        Fruit: 84,
        Crab: 103
    },
    PromotionType: {
        SuperBrand: "super_brand",
        Event618: "mid_year"
    },
    AuthorizeRequest: {
        Time: "7200000",
        Length: 32
    },
    GroupOrderType: {
        Default: 0,
        ZCJB: 1
    },
    GroupBannerV2AppID: [ 1, 2, 3, 25 ],
    QRCodeType: {
        Default: 0,
        Resubscribe: 1,
        GroupBanner: 2,
        NewUserGroup: 3,
        ABAlert: 4,
        LuckyWheel: 5,
        AfterpayAlert: 6,
        GPAlert: 7
    },
    ApplePaySupportStatus: {
        Support: 0,
        NotSupport: 1,
        VersionTooLow: 2,
        NotBindChinaUnionPayCard: 3
    },
    ShareImgGoods: [],
    ForceContactAppIDs: [ 1, 2, 3, 26 ],
    TrackingReferKeys: [ "refer_page_name", "refer_page_section", "refer_page_element" ],
    QQInvokeScript: "http://imgcache.gtimg.cn/channel/lib/components/adapt/adapt-3.0.js?max_age=86400000&_bid=2106",
    TabsConstants: [ {
        label: "全部",
        type: 0,
        url: "all"
    }, {
        label: "待付款",
        type: 1,
        url: "unpaid"
    }, {
        label: "待分享",
        type: 5,
        url: "grouping"
    }, {
        label: "待发货",
        type: 2,
        url: "unshipping"
    }, {
        label: "待收货",
        type: 3,
        url: "unreceived"
    }, {
        label: "待评价",
        type: 4,
        url: "unrated"
    } ]
};

exports.default = e;