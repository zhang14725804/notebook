function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../../../libs/lodash.core.min.js")), e = t(require("../../../../../utils/api.js")), i = getApp();

Component({
    properties: {
        isFirstEntry: {
            type: Boolean,
            value: !1
        },
        isSwiper: {
            type: Boolean,
            value: !1
        },
        gameId: {
            type: String,
            value: "-1"
        }
    },
    data: {
        ui: {
            swiper: {
                scrollleft: 0
            }
        },
        resource: {
            images: {
                collectcard: "../../../../resource/images/activity/springfestival/collectcard.png"
            }
        },
        defaultCard: {
            id: -1,
            productName: "",
            imgUrl: "",
            isFriend: !1,
            isCollected: !1,
            friendName: "",
            content: "搜寻中"
        },
        myCard: {
            id: 1,
            productName: "",
            imgUrl: "",
            isFriend: !1,
            isCollected: !1,
            friendName: "",
            content: "搜寻中"
        },
        activityInfo: {},
        activityData: {
            card: []
        }
    },
    methods: {
        getActivityInfo: function() {
            var t = this, a = t.data.gameId;
            i.fetch(e.default.getDetailCollectCardActivity + a, {}, function(a, e, i) {
                0 == e.code && "success" == i && (t.setData({
                    activityInfo: e.data
                }), t.getCardLsit(e.data));
            });
        },
        getCardLsit: function(t) {
            var e = this, i = t.brandList;
            t.friendList, wx.getStorageSync("mobileInfo");
            e.data.activityData.card = [], a.default.forEach(i, function(a) {
                var i = {
                    brandId: a.brandId,
                    productName: a.brandName,
                    isCollected: 1 == a.isFinish,
                    imgUrl: decodeURIComponent(a.logoUrl),
                    isFriend: t.nickName != a.nickName,
                    friendName: a.nickName,
                    headerImage: a.headerImgUrl
                };
                e.data.activityData.card.push(i);
            }), e.sortCardLsit(e.data.activityData.card), e.setData({
                "activityData.card": e.data.activityData.card
            });
        },
        sortCardLsit: function(t) {
            var e = this, i = [], r = [], c = [];
            a.default.forEach(t, function(t, a) {
                t.isCollected ? r.push(t) : i.push(t);
            }), a.default.forEach(r, function(t, a) {
                if (!t.isFriend) {
                    var e = r[0];
                    r[0] = r[a], r[a] = e;
                }
            }), c = [].concat(r, i), e.data.activityData.card = c;
        }
    },
    attached: function() {},
    ready: function() {
        this.getActivityInfo();
    }
});