var e = require("../../../wxParse/wxParse.js");

Component({
    properties: {
        anwser: {
            type: Object
        }
    },
    data: {},
    ready: function() {
        e.wxParse("Content", "html", this.data.anwser.Description, this, 0);
    },
    methods: {}
});