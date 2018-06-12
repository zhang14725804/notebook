new (require("../../../bases/component"))({
    properties: {
        modal: Object
    },
    data: {
        icon: {
            success: "/assets/images/success.png",
            fail: "/assets/images/error.png"
        }
    },
    methods: {
        confirm: function(e) {
            var t = e.currentTarget.dataset.action;
            this.triggerEvent("confirm", {
                action: t
            });
        },
        cancel: function(e) {
            var t = e.currentTarget.dataset.action;
            this.triggerEvent("cancel", {
                action: t
            });
        },
        close: function(e) {
            this.triggerEvent("close");
        }
    }
});