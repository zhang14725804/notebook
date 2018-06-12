var t = {
    show: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (e.content) {
            if (e.page) this.page = e.page; else {
                var i = getCurrentPages();
                this.page = i[i.length - 1];
            }
            this.page && this.page.setData({
                toast: {}
            }), clearTimeout(this.timeoutId), this.page.setData({
                toast: {
                    icon: e.icon || t.ICON.WARNING,
                    content: e.content
                }
            }), void 0 === e.duration && (e.duration = 1500), e.duration > 0 && (this.timeoutId = setTimeout(this.hide.bind(this), e.duration));
        }
    },
    hide: function() {
        clearTimeout(this.timeoutId), this.page && this.page.setData({
            toast: {}
        }), delete this.page;
    }
};

t.ICON = {
    NONE: "none",
    SUCCESS: "success_circle",
    LOADING: "waiting_circle",
    INFO: "info",
    SEARCH: "search",
    WARNING: "warn",
    ERROR: "cancel"
}, module.exports = t;