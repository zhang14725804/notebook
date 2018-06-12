Component({
    properties: {
        modelData: {
            type: Object
        }
    },
    data: {
        modelData: {
            showCancel: !1,
            cancelText: "取消",
            confirmText: "确定",
            content: "",
            title: "",
            isShow: !1
        }
    },
    methods: {
        setUserWxInfo: function(t) {
            this.triggerEvent("myevent", t);
        }
    }
});