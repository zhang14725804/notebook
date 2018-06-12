module.exports = Behavior({
    properties: {
        hidden: {
            type: Boolean,
            value: !1,
            observer: "_toogleVisiable"
        }
    },
    methods: {
        _toogleVisiable: function(e, o) {
            this.setData({
                hidden: !!e
            });
        }
    }
});