Widget({
    onLoad: function(e) {
        function l(e) {
            t.setGlobalAlpha(s), s += .1, console.log(e), t.drawImage(e, -21, 0, 258, 172), 
            t.draw(), s > 1 && (o++, s = .5, clearInterval(a), console.log("show完成"));
        }
        console.log(e);
        var t = this.getContext();
        t.setFillStyle("red");
        var i = [ "http://imgcache.qq.com/qqlive/images//still/files/0u/0ubmvcm34.jpg", "http://imgcache.qq.com/qqlive/images//still/files/0x/0xkwjry34.jpg", "http://imgcache.qq.com/qqlive/images//still/files/05/05l9uee34.jpg", "http://imgcache.qq.com/qqlive/images//still/files/0o/0o2yzmh34.jpg", "http://imgcache.qq.com/qqlive/images//still/files/0r/0r3l4js34.jpg", "http://imgcache.qq.com/qqlive/images//still/files/0v/0vonggg34.jpg" ], o = 0, s = .5, a = 0;
        setInterval(function() {
            o == i.length && (o = 0), a = setInterval(function() {
                l(i[o]);
            }, 60);
        }, 2e3);
    },
    onDataPush: function(e) {
        console.log(e.data);
        e.data;
    }
});