getApp();

Component({
    properties: {
        netState: {
            type: Number,
            value: 0,
            observer: function(e, o) {
                console.log("netError"), console.log(e);
            }
        }
    },
    data: {},
    methods: {
        onReachBottom: function() {
            console.log("重新加载"), this.triggerEvent("reloadevent");
        }
    }
});