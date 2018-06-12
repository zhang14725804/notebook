Component({
    properties: {
        title: {
            type: String
        },
        content: {
            type: String
        },
        buttonText: {
            type: String
        },
        showAlert: {
            type: Boolean
        }
    },
    methods: {
        hidden: function() {
            this.setData({
                showAlert: !1
            });
        }
    }
});