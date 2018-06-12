module.exports = Behavior({
    properties: {
        refreshTime: {
            type: Number,
            observer: function() {
                this.refresh();
            }
        }
    },
    methods: {
        refresh: function() {}
    }
});