wx.getSystemInfoSync().system.match(/ios/i);

module.exports = {
    data: [ "videoContext", "getinforaw", "videoCore" ],
    controller: function(e, n) {
        var t = n.videoContext, o = n.getinforaw, i = n.videoCore, r = !1;
        e.emit("plugin-hdlist-render", o.fl.fi.map(function(e) {
            return {
                cname: e.cname.replace(/[;\(\)]/g, " "),
                cname_short: e.cname.split(";")[0],
                name: e.name,
                selected: !!+e.sl
            };
        }).filter(function(e) {
            return e;
        }));
        var a = 0;
        e.on("videotimeupdate", function(e) {
            e > 1 && (a = e);
        }), e.on("contentchange", function(n) {
            var o = a;
            r && (e.emit("plugin-hdlist-render", n.getinforaw.fl.fi.map(function(e) {
                return {
                    cname: e.cname.replace(/[;\(\)]/g, " "),
                    cname_short: e.cname.split(";")[0],
                    name: e.name,
                    selected: !!+e.sl
                };
            }).filter(function(e) {
                return e;
            })), o && e.on("videostart", function(e) {
                console.log("plugin-hdlist videoplay", "seek", o, e), t.seek(o);
            }, !0), setTimeout(function() {
                r = !1;
            }, 0));
        }), e.on("beforeplaydatachange", function(e) {
            r && (delete e.progressDuration, delete e.progressBaseTime, delete e.progressSkipTime, 
            delete e.progressTime);
        }), e.switchDefn = function() {
            return r = !0, i.switchDefn.apply(i, arguments);
        };
    }
};