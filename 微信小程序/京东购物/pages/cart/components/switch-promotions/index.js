var t = require("../../../../bases/component.js");

new (require("../../../../common/logger.js"))("购物车-促销列表");

new t({
    properties: {
        promotion: {
            type: Object,
            value: {
                list: []
            },
            observer: "loadList"
        }
    },
    methods: {
        loadList: function(t, e) {
            this.setData(t);
        },
        hasChange: function(t) {
            var e = this.data.list.find(function(t) {
                return 1 == t.sstate;
            });
            return !!e && e.pid != t;
        },
        select: function(t) {
            var e = t.currentTarget.dataset.pid;
            this.hasChange(e) && this.triggerEvent("select", t);
        },
        close: function(t) {
            this.triggerEvent("select", t);
        }
    }
});