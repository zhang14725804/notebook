var t = require("../../../utils/util.js");

Component({
    properties: {
        source: {
            type: String,
            value: "pingtai"
        },
        formIdType: {
            type: String,
            value: "common"
        }
    },
    data: {
        source: "pingtai",
        formIdType: "common"
    },
    methods: {
        submitHandler: function(t) {
            var o = this.data, e = o.formIdType, r = o.source, i = t.detail.formId;
            console.log("the form id is", i), this.postFormId(i, r, e);
        },
        postFormId: function(o, e, r, i) {
            t.postFormId(o, e, i, r);
        }
    },
    attached: function() {
        var t = this.properties.source;
        this.setData({
            source: t
        });
    }
});