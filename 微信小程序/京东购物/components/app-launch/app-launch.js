var e = require("../../bases/component.js"), t = require("../../common/cookie-v2/cookie"), o = require("../../common/fe_report/usability.js"), i = require("../../api/Ptag/Ptag_utils").default, a = require("../../api/Ptag/Ptag_constants");

new e({
    properties: {
        skuId: String
    },
    data: {
        isShow: !0,
        parameter: ""
    },
    attached: function() {
        var e = t.getCookie("PPRD_P").split("-"), o = this.properties.skuId, i = void 0;
        e.map(function(e) {
            -1 != e.indexOf("EA") && (i = e);
        });
        var a = '{\n        "category":"jump",\n        "des":"productDetail",\n        "skuId":"' + o + '",\n        "m_source": "wxapp",\n        "visitkey": "' + t.getCookie("visitkey") + '",\n            "pin": "' + t.getCookie("jdpin") + '",\n            "sid": "' + t.getCookie("visitkey") + "|" + t.getCookie("__wga").split(".").pop() + '",\n            "__jda": "' + t.getCookie("__jda") + '",\n            "__jdv": "' + t.getCookie("__jdv") + '",\n            "unpl": "' + (t.getCookie("unpl") || "") + '",\n            "cookie_ptag": "' + i + '"}';
        this.setData({
            parameter: "openApp.jdMobile://virtual?params=" + encodeURIComponent(a)
        });
    },
    methods: {
        launchAppError: function(e) {
            o.umpBiz({
                bizid: "760",
                operation: 2,
                result: "1",
                message: JSON.stringify(e)
            }), this.toast.show({
                content: "请至应用市场/APP STORE 下载京东app"
            }), console.log("返回app参数" + this.data.parameter), console.log(e);
        },
        close: function() {
            this.setData({
                isShow: !1
            });
        },
        clickUmp: function() {
            i.addPtag(a.DETAIL_APP_SHARE);
        }
    }
});