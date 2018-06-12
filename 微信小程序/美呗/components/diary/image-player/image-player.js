var e = require("../../../utils/util.js");

Component({
    properties: {
        dataIndex: {
            type: Number
        },
        dataUrls: {
            type: Array
        }
    },
    data: {},
    methods: {
        _imagePreview: function(r) {
            var t = r.currentTarget.dataset;
            e.images.preview(t.index, t.urls);
        }
    }
});