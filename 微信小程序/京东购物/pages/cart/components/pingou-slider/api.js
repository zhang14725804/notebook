var e = require("../../../../libs/promise.min"), t = (require("../../../../common/biz"), 
require("../../../../common/request/request")), r = (require("../../../../libs/moment.min"), 
require("../../../../common/fe_helper.js"));

require("../../../../common/utils"), new (require("../../../../common/logger"))("拼购slider组件");

module.exports = {
    getList: function() {
        var i = {
            actid: 149089,
            pi: 1,
            pc: 20
        };
        return t.get({
            url: "https://wq.jd.com/mcoss/seckill/pingou",
            data: i,
            expire: "3m"
        }).then(function(t) {
            var i = t.body;
            return 0 == i.errCode ? (i.data.list.filter(function(e) {
                return e.sImg200x200 = r.getImg(e.sImg200x200), 1 != e.dwSkuState;
            }), e.resolve({
                total: i.data.total,
                list: i.data.list.slice(0, 10)
            })) : e.reject(i);
        });
    },
    getTuanExInfo: function() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return r.length ? t.get({
            url: "https://wq.jd.com/pingou_core/GetBatTuanNum",
            data: {
                skuids: r.join(","),
                expire: "3m",
                callback: "cb"
            }
        }).then(function(t) {
            var r = t.body;
            return 0 == r.iRet ? (delete r.iRet, delete r.errmsg, e.resolve(r)) : e.reject(r);
        }) : e.reject("params skus is empty!");
    }
};