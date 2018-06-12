function e() {
    return o.get({
        url: "https://wq.jd.com/userattribute/QueryIsNewUser"
    }).then(function(e) {
        var r = e.body, n = !!(0 == r.retcode) && r.isNewUser == s.NEW;
        return t.resolve(n);
    }, function(e) {
        return t.reject(e);
    });
}

function r(r) {
    var n = r.length ? r.shift() : null;
    return n ? n.showType_xcx == l ? e().then(function(e) {
        return e ? n : null;
    }, function(e) {
        return t.reject(e);
    }) : t.resolve(n) : t.reject("banners is empty array");
}

function n() {
    return u.getPPMS(33882, {
        expire: "2s"
    }).then(function(e) {
        return e = e.filter(function(e) {
            return !!(e.img_xcx && e.url_xcx && i().isBetween(new Date(e.bdate), new Date(e.edate))) && (e.url_xcx = c.fixProtocol(e.url_xcx), 
            !0);
        }).sort(function(e, r) {
            return +new Date(e.bdate) - +new Date(r.bdate);
        }), t.resolve(e);
    }, function(e) {
        return t.reject(e);
    });
}

var t = require("../../../../libs/promise.min"), u = require("../../../../common/biz"), o = require("../../../../common/request/request"), i = require("../../../../libs/moment.min"), c = (require("../../../../common/fe_helper.js"), 
require("../../../../common/utils")), s = (new (require("../../../../common/logger"))("购物车-banner api"), 
{
    PRESENT: 1,
    NEW: 2,
    UNKNOW: 3
}), l = 2;

module.exports = {
    getBanner: function() {
        return n().then(r);
    }
};