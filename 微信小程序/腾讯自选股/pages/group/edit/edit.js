(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../../utils/ppdog"), c = a(b), d = require("../../../utils/regenerator-runtime"), e = a(d), f = require("../../../utils/RequestApi");
    Page({
        data: {
            inputVal: {
                grpid: "",
                grpname: ""
            }
        },
        onLoad: function(a) {
            var b = a.id, c = a.name;
            c ? wx.setNavigationBarTitle({
                title: "修改分组"
            }) : wx.setNavigationBarTitle({
                title: "添加分组"
            }), this.setData({
                inputVal: {
                    grpid: b,
                    grpname: c
                }
            });
        },
        onHide: function() {
            console.log("[group add] > onHide"), f.Request.syncListData();
        },
        onUnload: function() {
            console.log("[group add] > onUnload"), this.onHide();
        },
        bindNameInput: function(a) {
            var b = a.detail.value;
            b = 6 <= b.length ? b.slice(0, 6) : b, this.setData({
                "inputVal.grpname": b
            });
        },
        bindSubmitTap: function() {
            var a = this.data.inputVal, b = a.grpid, d = a.grpname, e = "gu";
            b || (b = "tmp" + new Date().getTime(), e = "ga"), 0 < d.length && f.Request.operationSeq({
                grpid: b,
                grpname: d,
                act: e
            }).then(function() {
                c.default.wx.navigateBack();
            });
        }
    });
})();