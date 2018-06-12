var t = require("../../../common/util/method");

module.exports = Behavior({
    properties: {
        css: {
            type: Object,
            value: {}
        },
        className: {
            type: String,
            value: ""
        }
    },
    data: {
        _style: ""
    },
    attached: function() {
        this._createStyle();
    },
    methods: {
        _createStyle: function() {
            var e = this.data.css;
            this.setData({
                _style: t.createStyle(e)
            });
        }
    }
});