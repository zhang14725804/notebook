Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    index: {
        pv: {}
    },
    spike: {
        pv: {},
        pageName: "seckill",
        title: "限时秒杀"
    },
    subject: {
        pv: {
            keys: [ "subject_id" ]
        }
    },
    free_trial_page: {
        pv: {},
        pageName: "free_try",
        title: "免费试用团"
    },
    lottery: {
        pv: {},
        title: "抽奖"
    },
    catgoods: {
        pv: {
            keys: [ "opt_id", "opt_type" ]
        },
        pageName: "opt"
    },
    new_arrivals: {
        pv: {},
        pageName: "shangxin"
    },
    haitao: {
        pv: {}
    },
    classification: {
        pv: {},
        pageName: "search",
        native: {
            android: {
                name: "classification",
                version: "3.0.0"
            },
            ios: {
                name: "pdd_search",
                version: "3.0.0"
            }
        }
    },
    search_result: {
        pv: {
            keys: [ "search_key" ]
        }
    },
    personal: {
        pv: {}
    },
    profile: {
        pv: {},
        pageName: "friend_profile",
        requireLogin: !0,
        title: "个人主页"
    },
    my_friends: {
        pv: {},
        requireLogin: !0,
        title: "我的好友"
    },
    friends_requests: {
        pv: {},
        requireLogin: !0,
        title: "好友申请",
        pageName: "requesting_friends"
    },
    friends_recommends: {
        pv: {},
        requireLogin: !0,
        title: "好友推荐",
        pageName: "recommended_friends"
    },
    orders: {
        pv: {
            keys: [ "type" ]
        },
        pageName: "my_order",
        requireLogin: !0,
        title: "我的订单",
        native: {
            android: {
                name: "pdd_orders",
                version: "2.6.0"
            },
            ios: {
                name: "pdd_orders",
                version: "2.14.0"
            }
        }
    },
    groups: {
        pv: {
            keys: [ {
                key: "status",
                default: 3
            } ]
        },
        pageName: "my_group",
        requireLogin: !0,
        title: "我的团"
    },
    mylottery: {
        pv: {},
        pageName: "my_lottery",
        requireLogin: !0,
        title: "我的抽奖"
    },
    chat_list: {
        pv: {},
        requireLogin: !0,
        title: "我的消息"
    },
    coupons: {
        pv: {},
        pageName: "my_coupons",
        requireLogin: !0,
        title: "我的优惠券"
    },
    complaint_list: {
        pv: {},
        pageName: "complaint",
        requireLogin: !0
    },
    order: {
        pv: {
            keys: [ "order_sn" ]
        },
        pageName: "order_detail",
        requireLogin: !0
    },
    group: {
        pv: {
            indiv: !1,
            keys: [ "group_order_id" ]
        },
        pageName: "group_detail",
        requireLogin: !0,
        tkShareClick: !0
    },
    goods: {
        pv: {
            keys: [ "goods_id" ]
        },
        pageName: "goods_detail",
        tkShareClick: !0,
        native: {
            android: {
                name: "pdd_goods_detail",
                version: "3.13.0"
            },
            ios: {
                name: "pdd_goods_detail",
                version: "3.15.0"
            }
        }
    },
    order_checkout: {
        pv: {
            keys: [ "goods_id", "sku_id", "group_id", {
                key: "goods_number",
                default: 1
            } ]
        },
        requireLogin: !0
    },
    mall_page: {
        pv: {
            keys: [ "mall_id" ]
        },
        pageName: "mall",
        native: {
            android: {
                name: "pdd_mall",
                version: "2.1.0"
            },
            ios: {
                name: "pdd_mall",
                version: "1.3.0"
            }
        }
    },
    mall_certificates: {
        pv: {
            keys: [ "mall_id" ]
        },
        pageName: "mall_certificates",
        requireLogin: !0,
        title: "经营证照"
    },
    tzfree_list: {
        pv: {},
        pageName: "free_group_list"
    },
    expiring_coupons: {
        pv: {
            keys: [ "expire_batch_ids" ]
        },
        pageName: "expired_coupon",
        requireLogin: !0
    },
    coupon_push_someusers: {
        requireLogin: !0
    },
    coupon_event_v2: {
        pv: {},
        pageName: "red_packet",
        requireLogin: !0
    },
    chat_detail: {
        pv: {
            keys: [ "mall_id" ]
        },
        pageName: "talk",
        requireLogin: !0
    },
    chat_detail_friends: {
        pv: {
            keys: [ "other_uid" ]
        },
        pageName: "chat_detail_friends",
        requireLogin: !0
    },
    additional_comments: {
        pv: {},
        requireLogin: !0,
        native: {
            android: {
                name: "pdd_additional_comment",
                version: "3.20.0"
            },
            ios: {
                name: "pdd_additional_comment",
                version: "3.20.0"
            }
        }
    },
    addresses: {
        pv: {},
        requireLogin: !0,
        title: "收货地址"
    },
    alipay_callback: {
        pv: {}
    },
    wechat_h5_pay_callback: {
        pv: {},
        requireLogin: !0
    },
    anniversary: {},
    app_about: {
        pv: {}
    },
    app: {},
    authorize: {
        pv: {},
        requireLogin: !0
    },
    black_friday: {},
    comments: {
        pv: {},
        requireLogin: !0,
        native: {
            android: {
                name: "pdd_comment",
                version: "3.20.0"
            },
            ios: {
                name: "pdd_comment",
                version: "3.20.0"
            }
        }
    },
    complaint_guide: {
        pv: {}
    },
    complaint_old: {
        pv: {},
        requireLogin: !0
    },
    coupon_recommend: {
        pv: {},
        requireLogin: !0
    },
    coupon_share: {
        pv: {
            keys: [ "share_code", "ownerID" ]
        },
        pageName: "coupon",
        requireLogin: !0
    },
    deal_made: {
        pv: {},
        requireLogin: !0
    },
    double11: {},
    download: {},
    faq: {
        pv: {}
    },
    goods_comments: {
        pv: {
            keys: [ "goods_id" ]
        }
    },
    goods_express: {
        pv: {
            keys: [ "order_sn", "goods_id", "tracking_number", "shipping_id" ]
        },
        requireLogin: !0
    },
    goods_skip: {
        pv: {
            keys: [ "goods_id" ]
        }
    },
    login: {
        pv: {}
    },
    lottery_list: {
        pv: {
            keys: [ "lucky_id" ]
        }
    },
    setting: {
        pv: {}
    },
    skip: {
        pv: {}
    },
    suggestion: {
        pv: {},
        title: "常见问题"
    },
    terms: {
        pv: {}
    },
    personal_feedback: {
        pv: {},
        title: "意见反馈"
    },
    feedback_commit: {
        pv: {
            keys: [ {
                key: "type",
                default: 1
            } ]
        },
        title: "意见反馈",
        requireLogin: !0
    },
    qqoauth_callback: {},
    wboauth_callback: {},
    complaint: {
        pv: {
            keys: [ "order_sn" ]
        },
        pageName: "complaint_make",
        requireLogin: !0
    },
    complaint_detail: {
        pv: {
            keys: [ "after_sales_id", "order_sn" ]
        },
        requireLogin: !0
    },
    haitao_spike: {
        pv: {},
        pageName: "haitao_seckill"
    },
    app_coupon_popup: {},
    subjects: {
        pv: {
            keys: [ "subjects_id" ]
        }
    },
    fruit: {
        pv: {},
        title: "拼好货"
    },
    flash_groups: {},
    new_year_coupon_square: {
        title: "年货节领券专区"
    },
    new_year: {},
    express_complaint: {
        pv: {},
        title: "物流投诉",
        requireLogin: !0
    },
    one_yuan_purchase: {
        pv: {},
        title: "一元团"
    },
    womens_day: {
        pv: {},
        title: "拼多多女神节"
    },
    spring_summer: {
        pv: {},
        title: "拼多多换季清仓"
    },
    april_promo: {
        pv: {},
        title: "拼多多换季上新"
    },
    april_new_home: {
        pv: {},
        title: "拼多多焕新家"
    },
    tuan_success_recommend: {
        pv: {
            keys: [ "goods_id" ]
        },
        title: "猜你喜欢"
    },
    coupon_newbee: {
        pv: {
            keys: [ "coupon_id" ]
        },
        title: "优惠券适用商品"
    },
    coupon_download: {
        pv: {}
    },
    detail: {
        pv: {},
        title: "商品详情"
    }
};

exports.PageInfo = e;