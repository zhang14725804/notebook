Component({
    properties: {
        commentData: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        _commentEvent: function(t) {
            var e = t.currentTarget.dataset;
            this.triggerEvent("commentEvent", {
                parentid: e.parentid,
                touserid: e.touserid,
                nickname: e.nickname
            });
        }
    }
});