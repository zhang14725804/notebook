Component({
    properties: {
        sortData: {
            type: Array
        },
        visible: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        onClose: function() {
            this.setData({
                visible: !1
            }), this.triggerEvent("closeProject");
        },
        _selectedEvent: function(e) {
            this.onClose();
            var t = e.currentTarget.dataset;
            this.triggerEvent("selectedEvent", {
                id: t.id,
                name: t.name
            });
        }
    }
});