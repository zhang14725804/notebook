Component({
    properties: {
        size: String,
        stepper: {
            type: Number,
            value: 1
        },
        min: {
            type: Number,
            value: 1
        },
        max: {
            type: Number,
            value: 1 / 0
        },
        step: {
            type: Number,
            value: 1
        }
    },
    methods: {
        handleZanStepperChange: function(e, t) {
            var n = e.currentTarget.dataset, r = (void 0 === n ? {} : n).disabled, i = this.data.step, a = this.data.stepper, s = {
                previous: a
            };
            if (r) return null;
            "minus" === t ? a -= i : "plus" === t && (a += i), s.current = a, this.triggerEvent("change", s), 
            this.triggerEvent(t);
        },
        handleZanStepperMinus: function(e) {
            this.handleZanStepperChange(e, "minus");
        },
        handleZanStepperPlus: function(e) {
            this.handleZanStepperChange(e, "plus");
        },
        handleZanStepperBlur: function(e) {
            var t = this, n = e.detail.value, r = this.data, i = r.min, a = r.max;
            n != this.privous && (n ? ((n = +n) > a ? n = a : n < i && (n = i), this.setData({
                stepper: n
            }), this.triggerEvent("change", {
                previous: this.privous,
                current: n
            })) : setTimeout(function() {
                t.triggerEvent("change", {
                    previous: t.privous,
                    current: t.privous
                });
            }, 16));
        },
        handleZanStepperFocus: function(e) {
            var t = e.detail.value;
            this.privous = t;
        },
        disableBubble: function() {}
    }
});