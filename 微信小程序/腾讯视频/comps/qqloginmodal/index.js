var o = require("../../module/component.js"), t = "qqloginmodal";

require("../../module/login"), require("../../module/cache");

module.exports = o(t, function() {
    return {
        data: {
            isShowActionModal: !1,
            actionText: "",
            cancelText: "",
            inBottom: !0
        },
        onReady: function() {},
        onActionModalCancel: function() {
            this.hideActionModal();
        },
        onActionModalConfirm: function() {
            this.$switch("user");
        },
        showActionModal: function() {
            this.$setData(t, {
                isShowActionModal: !0
            });
        },
        hideActionModal: function() {
            this.$setData(t, {
                isShowActionModal: !1
            });
        }
    };
});