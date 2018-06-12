function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = e(require("../../common/pingback/pv")), t = e(require("../../common/pingback/click")), r = e(require("../../common/user/user")), s = e(require("../../components/searchLayout/searchLayout")), i = require("../../vendor/redux/redux"), c = e(require("../../vendor/redux-plugins/reduxTrunk")), o = e(require("./reducers/index")), n = e(require("./actions/index")), u = {
    onLoad: function() {
        var e = this;
        r.default.init();
        var a = (0, i.combineReducers)(o.default);
        this.store = (0, i.createStore)(a, (0, i.applyMiddleware)(c.default)), this.store.subscribe(function() {
            e.setData(e.store.getState());
        }), this.setData({
            keyword: "",
            rpage: "wx_searchsy"
        });
        var t = {
            page: "iqySearch"
        };
        this.loadSearchData().then(function(a) {
            var r = e.searchDataHandle(a);
            e.store.dispatch(n.default.initSearchLayout(r.searchRecordData, r.hotquery, "", "", "", t));
        }, function() {
            e.store.dispatch(n.default.initSearchLayout({}, {}, "", "", "", t));
        });
    },
    reLoadSearchHistory: function() {
        var e = this.searchDataHandle({}), a = this.store.getState().searchLayout.searchHistory;
        a && a.list && (a.list = e.searchRecordData, this.store.dispatch(n.default.updateSearchState({
            searchHistory: a
        })));
    },
    onShow: function() {
        a.default.send({
            rpage: "wx_searchsy"
        }), this.reLoadSearchHistory();
    },
    onHide: function() {
        this.hideSearchLayout();
    },
    clickPingback: function(e) {
        t.default.send({
            rpage: "wx_searchsy",
            block: e.block,
            rseat: e.rseat
        });
    },
    onShareAppMessage: function() {
        return {
            title: "爱奇艺搜索",
            desc: "轻松追剧，悦享品质",
            path: "/pages/iqySearch/iqySearch"
        };
    },
    onPullDownRefresh: function() {}
};

Page(Object.assign({}, u, s.default));