function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function t() {
    e(this, t), this.skuId = 0, this.skuName = "", this.AdvertCount = {
        ad: ""
    }, this.skuPrice = {
        p: "-1.00",
        op: "-1.00"
    }, this.ad = "", this.category = [ 0, 0, 0 ], this.images = [], this.promov2 = [], 
    this.stock = {
        StockState: 33,
        serviceInfo: "由 商家 发货，并提供售后服务。",
        IsPurchase: !1,
        ArrivalDate: "",
        cla: [],
        rid: null,
        PopType: 0,
        vd: null,
        isJDexpress: "0",
        isSam: !1,
        Dti: null,
        rn: -1,
        afsCode: 1,
        support: [],
        dcashDesc: "",
        area: {
            countyName: "宝安区",
            success: !0,
            townName: "",
            cityName: "深圳市",
            provinceName: "广东"
        },
        Dc: [ {
            ordermin: 0,
            dcash: 0,
            dtype: 0,
            freihtType: 1
        } ],
        rfg: 0,
        stockDesc: "",
        channel: 1,
        sidDely: "-1",
        skuState: 1,
        Ext: "fare:0,is7ToReturn:1",
        realSkuId: 0,
        StockStateName: "现货",
        weightValue: "",
        D: {
            vender: "",
            id: 0,
            df: "",
            po: "true",
            deliver: "",
            cg: "",
            url: "",
            vid: 0,
            type: 0,
            linkphone: ""
        }
    };
};