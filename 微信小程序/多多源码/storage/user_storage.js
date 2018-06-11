function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = e(require("../constants/storage_keys")), r = e(require("../common/object_util")), t = e(require("../common/data_util")), o = e(require("../common/storage_util")), a = {
    userInfo: null,
    saveUserLocalInfo: function(e) {
        if (e && 0 != e.length) {
            var t = this.getUserLocalInfo() || {};
            t = r.default.assign(t, e);
            try {
                wx.setStorageSync(n.default.USER_INFO, t), this.userInfo = t;
            } catch (e) {
                console.log(e);
            }
        }
    },
    clearUserLocalInfo: function() {
        try {
            wx.removeStorageSync(n.default.USER_INFO), this.userInfo = null;
        } catch (e) {
            console.error(e);
        }
    },
    getUserLocalInfo: function() {
        try {
            this.userInfo || (this.userInfo = o.default.getStorageSync(n.default.USER_INFO));
        } catch (e) {
            this.userInfo = null;
        }
        return this.userInfo;
    },
    getAccessToken: function() {
        var e = this.getUserLocalInfo();
        return e ? e.accessToken : null;
    },
    getOpenId: function() {
        var e = this.getUserLocalInfo();
        return e ? e.openId : null;
    },
    saveUserInfo: function(e) {
        if (e) {
            var r = e.access_token, t = e.uid, o = {};
            t && (o[n.default.UID] = parseInt(t, 10).toString(36)), r && (o.accessToken = r), 
            e.user_info && e.user_info.nick_name && (o.nickName = e.user_info.nick_name), e.user_info && e.user_info.avatar_url && (o.avatarUrl = e.user_info.avatar_url), 
            e.user_info && e.user_info.gender && (o.gender = e.user_info.gender), e.user_info && e.user_info.province && (o.province = e.user_info.province), 
            e.user_info && e.user_info.city && (o.city = e.user_info.city), e.user_info && e.user_info.open_id && (o.openId = e.user_info.open_id), 
            e.createTime && (o.createTime = e.createTime), o.is_weapp_newer = e.is_weapp_newer, 
            this.saveUserLocalInfo(o);
        }
    },
    saveUserId: function(e) {
        if (e) {
            var r = {};
            r[n.default.UID] = parseInt(e, 10).toString(36), this.saveUserLocalInfo(r);
        }
    },
    getUserId: function() {
        var e = this.getUserLocalInfo();
        return e && e[n.default.UID] ? t.default.trans36To10(e[n.default.UID]) : null;
    },
    getEgrp: function() {
        var e = this.getUserLocalInfo();
        if (e) {
            var n = e.EGRP;
            return n && Date.now() < n.expTime ? n.value : null;
        }
        return null;
    },
    setEgrp: function(e) {
        null != e && this.saveUserLocalInfo({
            EGRP: {
                expTime: Date.now() + 6e5,
                value: parseInt(e, 10)
            }
        });
    },
    getProvinceId: function() {
        var e = this.getUserLocalInfo();
        if (e) {
            var n = e.provinceId;
            return n && Date.now() < n.expTime ? n.value : null;
        }
        return null;
    },
    setProvinceId: function(e) {
        null != e && this.saveUserLocalInfo({
            provinceId: {
                expTime: Date.now() + 864e5,
                value: parseInt(e, 10)
            }
        });
    },
    setNickNameAndAvatarUrl: function(e) {
        var n = (e = e || {}).nickName || "", r = e.avatarUrl || "", t = e.gender || "";
        this.saveUserLocalInfo({
            nickName: n,
            avatarUrl: r,
            gender: t
        });
    }
};

exports.default = a;