Component({
    properties: {
        mode: {
            type: String,
            value: ""
        },
        gameId: {
            type: Number,
            value: "-1"
        },
        amount: {
            type: String,
            value: ""
        },
        isFriend: {
            type: Boolean,
            value: !0
        },
        brandImage: {
            type: String,
            value: ""
        }
    },
    data: {
        moduleControl: {
            index: !1,
            finashed: !1,
            inconsistent: !1,
            helpedOther: !1,
            collectSuccess: !1,
            helpedFriend: !1,
            gameEnd: !1
        },
        cardInfo: {
            icon: ""
        },
        tips: {
            image: "",
            title: "",
            content: ""
        },
        resource: {
            images: {
                finashedCollectImage: "https://sr.aihuishou.com/activity/minapp/icon-collect-success.png",
                inconsistentCollectImage: "https://sr.aihuishou.com/activity/minapp/redpackcry.png",
                helpedOtherCollectImage: "https://sr.aihuishou.com/activity/minapp/redpackunhappy.png",
                collectSuccessCollectImage: "https://sr.aihuishou.com/activity/minapp/collectsuccess.png",
                helpedFriendCollectImage: "https://sr.aihuishou.com/activity/minapp/redpackscare.png",
                gameEndCollectImage: "https://sr.aihuishou.com/activity/minapp/redpackfear.png"
            }
        }
    },
    methods: {
        setTips: function(e, t, a) {
            var o = {
                image: e,
                title: t,
                content: a
            };
            this.data.tips = o;
        },
        setBrandImage: function() {
            var e = this, t = e.properties.brandImage;
            e.setData({
                "cardInfo.icon": t
            });
        },
        getModuleControl: function() {
            var e = this, t = e.properties.mode;
            switch (e.data.moduleControl = {
                index: !1,
                finashed: !1,
                inconsistent: !1,
                helpedOther: !1,
                collectSuccess: !1,
                gameEnd: !1
            }, t) {
              case "index":
                e.data.moduleControl.index = !0, e.data.cardInfo.icon = "";
                break;

              case "finashed":
                e.data.moduleControl.finashed = !0, e.setTips(e.data.resource.images.finashedCollectImage, "ta已经集齐啦！", "不是你慢了，是别人手太快");
                break;

              case "inconsistent":
                e.data.moduleControl.inconsistent = !0, e.setTips(e.data.resource.images.inconsistentCollectImage, "蓝过，不符合ta的搜集", "相爱的你们总是错过");
                break;

              case "helpedOther":
                e.data.moduleControl.helpedOther = !0, e.setTips(e.data.resource.images.helpedOtherCollectImage, "你已经帮过别的好友啦!", "ta在等你你却帮了别人....");
                break;

              case "collectSuccess":
                e.data.moduleControl.collectSuccess = !0, e.setTips(e.data.resource.images.collectSuccessCollectImage, "集卡成功，你获得了" + e.data.amount + "元红包", "发起活动，奖金累计2元即可提现");
                break;

              case "helpedfriend":
                e.data.moduleControl.helpedFriend = !0, e.setTips(e.data.resource.images.helpedFriendCollectImage, "你已经帮过该好友啦!", "这么钟情人家，莫非.......");
                break;

              case "gameEnd":
                e.data.moduleControl.gameEnd = !0, e.setTips(e.data.resource.images.gameEndCollectImage, "您差一点完成本轮游戏", "你来或不来，大奖就等在那里哟");
                break;

              case "friendGameEnd":
                e.data.moduleControl.friendGameEnd = !0, e.setTips(e.data.resource.images.gameEndCollectImage, "您的好友差一点完成本轮游戏", "你来或不来，大奖就等在那里哟");
            }
            e.setData({
                moduleControl: e.data.moduleControl,
                tips: e.data.tips
            });
        }
    },
    attached: function() {},
    ready: function() {
        var e = this;
        e.setBrandImage(), e.getModuleControl();
    }
});