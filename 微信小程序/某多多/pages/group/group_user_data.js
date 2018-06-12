Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/time_util")), s = {
    leftUser: "leftUser",
    collapses: "collapses"
};

exports.default = {
    processUsersData: function(e, t) {
        t = t || {};
        var r = JSON.parse(JSON.stringify(e.users)), a = e.leftUserNum;
        t.dontShowleftUserIcon && (a = 0);
        var l = r.length + a;
        if (a) for (var u = 0; u < a && !(r.length >= 50); u++) r.push({
            avatarImg: "",
            type: s.leftUser,
            isLast: !1
        });
        if (50 !== l && r.length >= 50) {
            r = r.slice(0, 49);
            var o = {};
            o.isLast = !0, a ? (o.type = s.leftUser, r.push(o)) : (o.type = s.collapses, r.push(o));
        }
        return r.map(function(e) {
            return e.userItemClass = "group-detail-user", e.avatarImg || (e.type === s.leftUser && (e.userItemClass = [ e.userItemClass, "left-user" ].join(" "), 
            e.isLast && (e.userItemClass = [ e.userItemClass, "is-last" ].join(" "))), e.type === s.collapses && (e.userItemClass = [ e.userItemClass, "collapses" ].join(" "))), 
            e;
        }), r;
    },
    getUsersTemplateData: function(t, r) {
        var a = !!(r = r || {}).dontShowleftUserIcon, l = this.processUsersData(t, {
            dontShowleftUserIcon: a
        }), u = t.users;
        return u.map(function(s) {
            return s.formatJoinTimeStr = s.joinTime && e.default.formatTime(new Date(1e3 * s.joinTime)), 
            s;
        }), {
            usersData: l,
            users: u,
            leader: u[0],
            currentUser: t.selfOrderInfo || {},
            userType: s,
            leftUserNum: a ? 0 : t.leftUserNum,
            totalNum: t.users.length + t.leftUserNum,
            userListPopVisible: !1
        };
    }
};