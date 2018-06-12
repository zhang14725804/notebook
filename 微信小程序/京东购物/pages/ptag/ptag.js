new (require("../page.js"))({
    data: {
        test: 1
    },
    onLoad: function() {
        console.log("on load=====");
    },
    onWrapperTap: function(t) {
        console.log("e.target.dataset==", t.target.dataset), wx.showToast({
            title: "" + t.target.dataset.ptag
        });
    },
    onChildClick: function(t) {
        console.log("onChildClick==", t);
    },
    onCatchtap: function(t) {
        console.log("onCatchtap==", t);
    }
});