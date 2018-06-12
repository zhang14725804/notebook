var t = require("../../wxParse/wxParse.js");

Component({
    properties: {
        qaData: {
            type: Object
        }
    },
    data: {},
    ready: function() {
        t.wxParse("Content", "html", this.data.qaData.Description, this, 0);
    },
    methods: {
        _jumpDetailEvent: function() {
            this.triggerEvent("jumpDetailEvent");
        }
    }
});