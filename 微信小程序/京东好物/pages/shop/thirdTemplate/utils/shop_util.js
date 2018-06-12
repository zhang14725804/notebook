module.exports = {
    getShopConfigure: function() {
        var p = {
            shop_beijingts: {
                shopID: 120726,
                shopName: "北京图书大厦旗舰店",
                JDM_AppId: "kepler-wx-wxshop-beijingts",
                wxVersion: "wxshop_beijingts"
            },
            shop_wfujingts: {
                shopID: 128792,
                shopName: "王府井书店旗舰店",
                JDM_AppId: "kepler-wx-wxshop-wfujingts",
                wxVersion: "wxshop_wfujingts"
            },
            shop_yayunts: {
                shopID: 58409,
                shopName: "亚运村图书大厦",
                JDM_AppId: "kepler-wx-wxshop-yayunts",
                wxVersion: "wxshop_yayunts"
            },
            shop_zhguancts: {
                shopID: 47381,
                shopName: "中关村图书大厦旗舰店",
                JDM_AppId: "kepler-wx-wxshop-zhguancts",
                wxVersion: "wxshop_zhguancts"
            },
            shop_dd: {
                shopID: 1000039942,
                shopName: "叮咚官方旗舰店",
                JDM_AppId: "kepler-wx-wxshop-dd",
                wxVersion: "wxshop_dd"
            },
            shop_feishi: {
                shopID: 1000003120,
                shopName: "菲诗小铺官方旗舰店",
                JDM_AppId: "kepler-wx-wxshop-feishi",
                wxVersion: "wxshop_feishi"
            },
            shop_bcw: {
                shopID: 1000003685,
                shopName: "百草味京东自营旗舰店",
                JDM_AppId: "kepler-wx-wxshop-bcw",
                wxVersion: "wxshop_bcw"
            },
            shop_lppz: {
                shopID: 1000006804,
                shopName: "良品铺子京东自营旗舰店",
                JDM_AppId: "kepler-wx-wxshop-lppz",
                wxVersion: "wxshop_lppz"
            },
            shop_td: {
                shopID: 1000073642,
                shopName: "淘豆京东自营旗舰店",
                JDM_AppId: "kepler-wx-wxshop-td",
                wxVersion: "wxshop_td"
            },
            shop_ksw: {
                shopID: 1000007563,
                shopName: "口水娃京东自营旗舰店",
                JDM_AppId: "kepler-wx-wxshop-ksw",
                wxVersion: "wxshop_ksw"
            },
            shop_Ileven: {
                shopID: 1000078075,
                shopName: "ileven京东自营旗舰店",
                JDM_AppId: "kepler-wx-wxshop-Ileven",
                wxVersion: "wxshop_Ileven"
            },
            shop_3MJS: {
                shopID: 1000002305,
                shopName: "3M净水京东自营旗舰店",
                JDM_AppId: "kepler-wx-wxshop-mjs",
                wxVersion: "wxshop_mjs"
            },
            shop_jycf: {
                shopID: 1000001465,
                shopName: "九阳厨房电器京东自营旗舰店",
                JDM_AppId: "kepler-wx-wxshop-jycf",
                wxVersion: "wxshop_jycf"
            },
            shop_Levis: {
                shopID: 68668,
                shopName: "Levi's 官方旗舰店",
                JDM_AppId: "kepler-wx-wxshop-Levi",
                wxVersion: "wxshop_Levi"
            },
            shop_twb: {
                shopID: 169763,
                shopName: "天王手表旗舰店",
                JDM_AppId: "kepler-wx-wxshop-twb",
                wxVersion: "wxshop_twb"
            }
        }, s = new Object();
        return s.client = "apple", s.appClientVersion = "5.7.0", s.configure = p.shop_beijingts, 
        s;
    }
};