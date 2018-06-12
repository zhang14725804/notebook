var t = getApp();

module.exports = {
    getTownList: function() {
        var e = this;
        t.request(t.pathData.city.GET_TOWN_LIST_PATH).then(function(t) {
            if (!t.error) {
                var i = t.data && t.data.list ? t.data.list : [];
                e.townAllList = i;
            }
        });
    },
    getTownInfoByNum: function(t) {
        return console.log("this.pageIndex:" + this.pageIndex), t.slice(0, this.pageIndex * this.pageNum);
    },
    setTownSearchList: function(t) {
        if (this.pageIndex = 1, t) {
            var e = [];
            e = this.townAllList.filter(function(e, i) {
                return "-1" !== e.id && (-1 !== e.desc.indexOf(t) || -1 !== e.name.indexOf(t) || -1 !== e.shortName.indexOf(t) || -1 !== e.pinyin.indexOf(t));
            }), this.searchTownList = e, this.setDataLazy({
                townList: this.getTownInfoByNum(e)
            });
        }
    }
};