var e = getApp();

e.createPage({
    methodOptions: {
        e_intentionTap: {
            type: "goto"
        }
    },
    data: {
        pageName: "service-seek",
        pageType: "list",
        intentionList: [ {
            cateid: 1,
            name: "找工作"
        }, {
            cateid: 2,
            name: "求人才"
        }, {
            cateid: 3,
            name: "求租房"
        }, {
            cateid: 5,
            name: "求购房"
        }, {
            cateid: 30,
            name: "求二手车"
        }, {
            cateid: 31,
            name: "求装修服务"
        }, {
            cateid: 32,
            name: "求招商加盟"
        }, {
            cateid: 33,
            name: "求家政服务"
        }, {
            cateid: 34,
            name: "求搬家服务"
        }, {
            cateid: 35,
            name: "求教育培训"
        }, {
            cateid: 37,
            name: "更多其他"
        } ]
    },
    _onShow: function() {
        e.storage.setSync("pagetype", "");
    },
    $e_intentionTap: function(t) {
        var i = t.currentTarget.dataset.cateid;
        e.getUserThirdKey();
        e.getPPU() ? e.goto([ "/pages/service-seek-detail/service-seek-detail", {
            cateid: i,
            cityId: this.urlParams.cityId || "",
            dispCityId: this.urlParams.dispCityId || ""
        } ], !0) : e.eventHandle.emit("check-setting", this._toUserPage.bind(this, i));
    },
    _toUserPage: function(t) {
        e.eventHandle.emit("passport-login", this.loginCallBack.bind(this, t, this.urlParams.cityId || "", this.urlParams.dispCityId || ""), "/pages/service-seek-detail/service-seek-detail");
    },
    loginCallBack: function(t) {
        e.getPPU() && e.goto([ "/pages/service-seek-detail/service-seek-detail", {
            cateid: t,
            cityId: this.urlParams.cityId || "",
            dispCityId: this.urlParams.dispCityId || ""
        } ], !0);
    }
});