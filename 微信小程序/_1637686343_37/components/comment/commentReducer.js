function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    var t = Date.now() - new Date(1e3 * e).getTime(), n = "";
    return t <= 6e4 ? n = "一分钟前" : t > 6e4 && t < 36e5 ? n = Math.round(t / 6e4) + "分钟前" : t >= 36e5 && t < 864e5 ? n = Math.round(t / 36e5) + "小时前" : t >= 864e5 && (n = new Date(1e3 * e).getMonth() + 1 + "月" + new Date(1e3 * e).getDate() + "日"), 
    n;
}

function n() {
    arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    var e = arguments[1].comments, n = (o.default.storage.handleStorageMuti("getInfo"), 
    o.default.storage.handleStorageMuti("get", "commentKeys"));
    for (var r in e) e[r] = Object.assign({}, e[r], {
        addTime: t(e[r].addTime),
        likes: e[r].likes
    }), !i.default.getUid() && n.indexOf(e[r].contentId) > -1 && (e[r] = Object.assign({}, e[r], {
        agree: !0,
        likes: (0, s.upvoteHandle)(e[r].counterList.likes),
        counterList: {
            likes: e[r].counterList.likes + 1
        }
    }));
    return Object.assign({}, e);
}

function r(e, t) {
    var n = t.contentId, r = t.comments, i = t.isAgree, o = t.likes, a = void 0 === o ? 0 : o;
    for (var u in r) r[u].contentId == n && (r[u] = Object.assign({}, r[u], {
        agree: !i,
        likes: (0, s.upvoteHandle)(a),
        counterList: {
            likes: a
        }
    }));
    return Object.assign({}, e, r);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "SHOW_COMMENTS":
        return n(e, t);

      case "TOGGLE_COMMENT_STATUS":
        return r(e, t);

      default:
        return e;
    }
};

var i = e(require("../../common/user/user")), o = e(require("../../common/utils/util")), s = require("../../common/source/videoUtil");