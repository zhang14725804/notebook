(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../../utils/ppdog"), c = a(b), d = require("../../../utils/regenerator-runtime"), e = a(d), f = require("../../../utils/RequestApi");
    Page({
        data: {
            onGid: "",
            editted: !1,
            groups: []
        },
        onShow: function() {
            var a = this;
            console.log("[group list] > onShow"), f.Request.getGroups().then(function(b) {
                a.setData(b);
            });
        },
        onHide: function() {
            console.log("[group list] > onHide"), f.Request.syncListData();
        },
        onUnload: function() {
            console.log("[group list] > onUnload"), this.onHide();
        },
        bindItemTap: function(a) {
            var b = a.currentTarget.dataset.id;
            this.data.editted || (f.Request.setGid(b), c.default.wx.navigateBack());
        },
        bindItemEditTap: function(a) {
            var b = a.currentTarget.dataset, c = b.id, d = b.name;
            wx.navigateTo({
                url: "../edit/edit?name=" + d + "&id=" + c
            });
        },
        bindItemDelTap: function(a) {
            var b = this, c = a.currentTarget.dataset.id;
            f.Request.operationSeq({
                grpid: c,
                act: "gd"
            }).then(function(a) {
                b.setData({
                    groups: a.toJS()
                });
            });
        },
        bindGlistEditTap: function() {
            this.setData({
                editted: !0
            });
        },
        bindGlistEditDoneTap: function() {
            this.setData({
                editted: !1
            });
        },
        bindGaddTap: function() {
            wx.navigateTo({
                url: "../edit/edit"
            });
        }
    });
})();