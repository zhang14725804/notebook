var t = getApp();

module.exports = function() {
    return {
        e_btn_service_seek: function(e) {
            e.detail.formId;
            t.goto(e.detail.target.dataset.url, !0);
        }
    };
};