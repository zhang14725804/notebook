var e = require("../../bases/component.js"), r = new (require("../../common/logger"))("components/returnapp");

new e({
    properties: {
        option: Object
    },
    data: {},
    methods: {
        retuanApp: function(e) {
            wx.navigateBackMiniProgram({
                extraData: {},
                success: function(e) {
                    r.info("returnapp success");
                },
                fail: function(e) {
                    r.error("returnapp failed", e);
                }
            }), this.triggerEvent("retuanApp", e);
        }
    }
});