var o = require("../../module/component.js");

module.exports = o("actionmodal", function() {
    return {
        data: {
            isShowActionModal: !1,
            actionText: "",
            cancelText: "取消"
        },
        onActionModalCancel: function() {
            this.hideActionModal();
        },
        showActionModal: function() {
            this.$setData("actionmodal", {
                isShowActionModal: !0
            });
        },
        hideActionModal: function() {
            this.$setData("actionmodal", {
                isShowActionModal: !1
            });
        }
    };
});