module.exports = function() {
    return {
        data: {
            toast: {
                firstLine: "",
                show: !1
            }
        },
        showToast: function() {
            var t = this, s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = (s.title || "").split("\n");
            this.$setData("toast", {
                title: o,
                show: !0
            });
            var i = s.timeout || 5e3;
            setTimeout(function() {
                t.$setData("toast", {
                    show: !1
                });
            }, i);
        },
        hideToast: function() {
            this.$setData("toast", {
                show: !1
            });
        }
    };
};