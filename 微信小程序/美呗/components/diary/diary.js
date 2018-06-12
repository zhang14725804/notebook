Component({
    properties: {
        data: {
            type: Object,
            value: {}
        },
        index: {
            type: Number,
            value: 0
        },
        hasSolid: {
            type: Boolean,
            value: !0
        }
    },
    data: {},
    methods: {
        onTapDiary: function(e) {
            var t = e.currentTarget.dataset;
            this.triggerEvent("tapDiary", {
                baseid: t.baseid,
                id: t.id
            });
        }
    }
});