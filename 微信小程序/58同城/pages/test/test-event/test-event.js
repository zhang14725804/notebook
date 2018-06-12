var n = getApp(), o = require("../../common/ready")();

Page(Object.assign({
    data: {},
    onLoad: function() {},
    initData: function() {
        n.eventHandle.emit("gps-location", function() {
            console.log("eventtest js gps");
        });
    },
    logout: function() {
        n.eventHandle.emit("logout", function() {
            console.log("denglu logout");
        });
    }
}, o));