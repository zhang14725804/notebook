Component({
    properties: {
        Projects: {
            type: Array,
            value: []
        },
        color: {
            type: String,
            value: "color-ff8083"
        },
        desc: {
            type: String,
            value: ""
        },
        fullWidth: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        imageBaseUri: "https://cdn-ssl.meb.com/wxa/v1/"
    },
    methods: {}
});