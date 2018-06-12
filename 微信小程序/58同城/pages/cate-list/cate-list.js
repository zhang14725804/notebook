var e = require("../common/search-module")(), t = require("../subscription/enums"), a = getApp(), o = {
    cateId: "",
    cateCode: ""
};

a.createPage([ {
    methodOptions: {
        e_cateListTap: {
            type: "goto"
        },
        e_goToYuanXuan: {
            type: "goto"
        }
    },
    data: {
        pageType: "list",
        pageName: "cate-list",
        loaded: !1,
        showSearchResult: !1,
        searchResult: [],
        hotWords: [],
        searchWords: [],
        key: "",
        isSearchModuleShow: !0,
        list: [],
        params: "",
        cateCode: -1
    },
    _onLoad: function(e) {
        o.cateId = e.cateId, o.cateCode = e.cateCode, this.data.cateCode = e.cateCode;
    },
    $e_goToSubscription: function(e) {
        a.eventHandle.emit("check-setting", function() {
            a.request(a.pathData.youxuan.GET_SUBID).then(function(e) {
                var o = e.error ? e.data : e, n = o.code;
                0 === n && a.goto([ "/pages/youxuan/youxuan", {
                    youxuan: t.subscribeTypeToYouXuanType[1],
                    type: 1,
                    subId: o.data,
                    newEntrance: "1",
                    sort: 1
                } ], !1), 1 === n && a.goto("/pages/subscription/subscription", !1), 2 === n && a.goto([ "/pages/subscription/add/add", {
                    pLine: 1,
                    code: 1,
                    type: 1,
                    newEntrance: "1"
                } ], !1);
            });
        });
    },
    $e_cateListTap: function(e) {
        var t = e.currentTarget.dataset, o = t.cateId, n = t.url;
        o && a.goto(n, !0);
    },
    initData: function() {
        var e = this;
        return this.setDataLazy({
            loaded: !0
        }), a.request(a.pathData.CATE_PATH, {
            cateCode: o.cateCode
        }, {
            show: !0
        }).then(function(t) {
            if (t.error) a.alert("网络异常,请稍后重试"); else {
                for (var n = t.data || [], s = 0, c = n.length; s < c; s++) {
                    var r = 4 - n[s].cateList.length % 4;
                    if (r < 4) for (var i = 0; i < r; i++) n[s].cateList.push(" ");
                }
                e.setDataLazy({
                    list: n,
                    cateCode: o.cateCode
                });
            }
        });
    },
    _onShow: function() {
        wx.setStorageSync("pagetype", "");
    },
    cateListTongJi: function(e) {
        var t = "";
        switch (Number(e)) {
          case 4:
            t = "job_index";
            break;

          case 7:
            t = "pet_index";
            break;

          case 8:
            t = "yellowpage_index";
            break;

          default:
            t = "quanzhan";
        }
        return t;
    }
}, e ]);