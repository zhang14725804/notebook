require("../../../utils/util.js");

Component({
    properties: {
        isHideTopLine: {
            type: Boolean,
            value: !1
        },
        isHideBottomLine: {
            type: Boolean,
            value: !1
        },
        diary: {
            type: Object
        },
        isShowCurrentDiaryLoc: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        _jumpDetailEvent: function() {
            this.triggerEvent("jumpDetailEvent");
        }
    }
});