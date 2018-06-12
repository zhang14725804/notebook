var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../api/Ptag/Ptag_utils.js")), t = require("../../../../bases/component.js"), r = require("../../../../common/logger.js"), i = require("../../../../libs/promise.min.js"), n = (require("../../../../common/request/request"), 
require("../../../../api/Ptag/report_manager"), require("../../../../common/fe_helper.js"), 
require("../../../../common/biz"), require("../../../../common/toast/toast"), new r("拼购滑动组件")), a = require("../../../../behaviors/attributes"), o = require("api");

new t({
    behaviors: [ a ],
    properties: {},
    data: {
        lineTitle: "京东拼购",
        titleText: "京东拼购",
        linkText: "",
        tuanLimit: {}
    },
    attached: function() {
        var e = this;
        o.getList().then(function(t) {
            var r = t.total, n = t.list;
            return e.setData({
                linkText: "查看" + r + "个火热拼购",
                list: n
            }), i.resolve(n.map(function(e) {
                return e.sSkuId;
            }));
        }).then(o.getTuanExInfo).then(function(t) {
            var r = {};
            for (var i in t) if (t.hasOwnProperty(i)) {
                var n = t[i];
                n.length && (r[i] = n[0].needcount);
            }
            e.setData({
                tuanLimit: r
            });
        }).catch(function(e) {
            return n.error(e);
        });
    },
    methods: {
        onItemTap: function(t) {
            e.default.addPtag("7014.18.43"), this.$goto("/pages/pingou/tuan99/tuan99", {
                ptag: "137081.6.1"
            });
        }
    }
});