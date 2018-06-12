function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getPaopaoList = function() {
    return t.commonPostRequest({
        url: "" + n.default.OUTERHOST.PUB + u.PROXY,
        reqParams: {
            authcookie: o.default.getAuthcookie(),
            device_id: o.default.getAnonymousUid(),
            agenttype: r.default.mAgenttype,
            proxyUri: u.LIST
        }
    }).then(function(e) {
        return n.default.isObject(e) ? e : {};
    }).catch(function(e) {
        return Promise.reject(e);
    });
}, exports.getPaopaoBaseInfo = function(e, a) {
    return t.commonPostRequest({
        url: "" + n.default.OUTERHOST.PUB + u.PROXY,
        reqParams: {
            authcookie: o.default.getAuthcookie(),
            device_id: o.default.getAnonymousUid(),
            agenttype: r.default.mAgenttype,
            atoken: e,
            cIds: a,
            qypid: r.default.ptid,
            proxyUri: u.BASEINFO
        }
    }).then(function(e) {
        return n.default.isArray(e) ? e : [];
    }).catch(function(e) {
        return Promise.reject(e);
    });
};

var t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}(require("../../common/serviceApi/serviceApi")), o = e(require("../../common/user/user")), r = e(require("../../common/login/constant")), n = e(require("../../common/utils/util")), u = {
    LIST: "apis/e/paopao/list.action",
    BASEINFO: "apis/e/starwall/wallBaseInfos.action",
    PROXY: "/h5/mina/proxy/paopao/"
};