function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../../../libs/lodash.core.min.js")), i = t(require("../../../../../utils/api.js")), a = getApp();

Component({
    properties: {
        gameId: {
            type: String,
            value: ""
        },
        isFriend: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        ui: {
            isFirstEntry: !0
        },
        resource: {
            images: {
                dogcryImage: "https://sr.aihuishou.com/activity/minapp/dogcry.png"
            }
        },
        activityInfo: {},
        friendList: []
    },
    methods: {
        getActivityInfo: function() {
            var t = this, r = t.data.gameId;
            a.fetch(i.default.getDetailCollectCardActivity + r, {}, function(i, a, r) {
                0 == a.code && "success" == r && (e.default.forEach(a.data.friendList, function(t) {
                    t.headerImgUrl = decodeURIComponent(t.headerImgUrl);
                }), t.setData({
                    activityInfo: a.data
                }));
            });
        }
    },
    ready: function() {
        this.getActivityInfo();
    }
});