var a = getApp();

a.createPage({
    methodOptions: {},
    data: {
        pageType: "user",
        pageName: "user-resume-detail",
        info: {}
    },
    initData: function() {
        var t = this;
        this.data.resumeId = this.pageData.resumeId, a.request("/resume/detail", {
            resumeId: this.pageData.resumeId
        }).then(function(e) {
            if (e.error) a.alert("网络异常,请稍后重试"); else {
                var r = e.data, d = r.pic, s = r.advantages;
                d = d ? "url(" + d + ")" : d, e.data.pic = d;
                var i = [];
                i = s ? s.split(",").filter(function(a) {
                    return !!a;
                }) : i, e.data.advantagesArr = i, e.data.targetCates = e.data.targetCate && e.data.targetCate.length > 0 ? e.data.targetCate.split(",") : [], 
                e.data.targetAreas = e.data.targetArea && e.data.targetArea.length > 0 ? e.data.targetArea.split(",") : [], 
                e.data.expList = e.data.expList || [], e.data.eduList = e.data.eduList || [], t.setDataLazy({
                    info: e.data
                });
            }
        });
    }
});