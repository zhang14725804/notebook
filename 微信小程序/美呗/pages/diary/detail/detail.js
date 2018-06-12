var a = require("../../../utils/util.js"), t = require("../../../api/index.js"), e = getApp();

Page({
    data: {
        diaryDetail: {},
        comments: [],
        userId: null,
        sourceId: null,
        filters: {
            page: 1,
            sourceId: null,
            sourceType: 7,
            size: 20
        },
        hasMore: !1,
        commentPlaceholder: "我也回复一句...",
        commentContent: "",
        commentParams: {
            parentId: null,
            toUserId: null,
            sourceId: null,
            sourceType: 7,
            content: null
        }
    },
    onLoad: function(a) {
        var t = this.data.filters;
        t.sourceId = a.id, this.setData({
            filters: t,
            sourceId: a.id
        }), this.getDiaryDetail();
    },
    getDiaryDetail: function() {
        var e = this;
        wx.showLoading({
            title: "内容加载中"
        }), t.diary.getDiaryDetail(this.data.filters.sourceId).then(function(t) {
            var i = t.data;
            i.Data.CreateTime = a.formatDateZerofill(i.Data.CreateTime);
            var r = e.data.commentParams;
            r.toUserId = i.User.Id, r.sourceId = e.data.sourceId, e.setData({
                diaryDetail: i,
                userId: i.User.Id,
                commentParams: r
            }), e.getDiaryComment(), wx.hideLoading();
        });
    },
    getDiaryComment: function() {
        var e = this;
        t.diary.getDiaryComment(this.data.filters).then(function(t) {
            t.data.Data.forEach(function(t) {
                t.CreateTime = a.formatDateZerofill(t.CreateTime);
            });
            var i = e.data.comments;
            i = 1 == e.data.filters.page ? t.data.Data : i.concat(t.data.Data), e.setData({
                hasMore: t.data.HasMore,
                comments: i
            });
        });
    },
    onLoadmore: function() {
        if (this.data.hasMore) {
            var a = this.data.filters;
            a.page++, this.setData({
                filters: a
            }), this.getDiaryComment();
        }
    },
    preDiaryClick: function(a) {
        var t = a.currentTarget.dataset;
        wx.redirectTo({
            url: "detail?id=" + t.id
        });
    },
    seeDiarybookClick: function(a) {
        wx.redirectTo({
            url: "../list/list?baseid=" + this.data.diaryDetail.Data.DiaryBaseDataId + "&id=" + this.data.diaryDetail.Data.Id
        });
    },
    nextDiaryClick: function(a) {
        var t = a.currentTarget.dataset;
        wx.redirectTo({
            url: "detail?id=" + t.id
        });
    },
    diaryClicklike: function(a) {
        a.currentTarget.dataset;
        var i = {
            objectId: this.data.sourceId,
            objectType: 7
        };
        if (e.globalData.authToken) {
            var r = this.data.diaryDetail;
            r.Data.LikeNumber = r.Data.IsLike ? --r.Data.LikeNumber : ++r.Data.LikeNumber;
            var s = r.Data.LikeUserList;
            if (r.Data.IsLike) {
                for (var n in s) if (s[n].Id == e.globalData.userInfo.userId) {
                    s.splice(n, 1);
                    break;
                }
            } else s.unshift({
                Id: e.globalData.userInfo.userId,
                HeadImage: e.globalData.userInfo.headImage
            });
            r.Data.LikeUserList = s, r.Data.IsLike = !r.Data.IsLike, this.setData({
                diaryDetail: r
            });
        }
        t.diary.diaryClicklike(i).then(function(a) {});
    },
    onCommentFocused: function(a) {
        (!e.globalData.authToken || e.globalData.authToken.length < 1) && wx.navigateTo({
            url: "/pages/signIn/index"
        });
    },
    commentInput: function(a) {
        var t = this.data.commentParams;
        t.content = a.detail.value, this.setData({
            commentParams: t
        });
    },
    commentEvent: function(a) {
        var t = a.detail, e = this.data.commentParams;
        e.toUserId = t.touserid, e.parentId = t.parentid, this.setData({
            commentParams: e,
            commentPlaceholder: "@" + t.nickname
        });
    },
    onCommentConfirm: function() {
        this.commentSend();
    },
    commentSend: function() {
        var a = this;
        t.diary.createDiaryComment(this.data.commentParams).then(function(t) {
            200 == t.statusCode ? (wx.showToast({
                title: "回复成功！",
                icon: "success",
                duration: 2e3
            }), a.getDiaryComment()) : wx.showToast({
                title: t.data.message,
                icon: "none",
                duration: 2e3
            });
        });
        var e = this.data.commentParams;
        e.toUserId = this.data.userId, e.sourceId = this.data.sourceId, e.parentId = null, 
        this.setData({
            commentParams: e,
            commentPlaceholder: "我也回复一句...",
            commentContent: ""
        });
    },
    onShareAppMessage: function(a) {
        return {
            title: "美呗",
            path: "/pages/diary/detail/detail?id=" + this.data.filters.sourceId
        };
    }
});