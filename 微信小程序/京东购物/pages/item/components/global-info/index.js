new (require("../../../../bases/component"))({
    properties: {
        serviceIconList: Array,
        isQqjx: String,
        showGlobalInfoFlag: Boolean
    },
    ready: function() {
        this.data.isQqjx;
    },
    methods: {
        closePanel: function() {
            this.triggerEvent("closeGlobalInfoPanel");
        }
    }
});