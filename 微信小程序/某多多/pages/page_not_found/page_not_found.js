var e = require("../../common/index"), n = {
    onLoad: function() {
        setTimeout(function() {
            e.Navigation.redirectForward("/pages/index/index");
        }, 1200);
    }
};

(0, e.PddPage)(n, {
    pageName: "page_not_found"
});