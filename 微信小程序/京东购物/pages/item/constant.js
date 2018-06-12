var t = {
    JX: {
        name: "京东精选",
        url: "https://img10.360buyimg.com/jdphoto/s100x28_jfs/t20245/149/17300525/2688/443ac7d3/5af560bbN3ae1dda3.png",
        width: 100,
        height: 28
    },
    Global_POP: {
        name: "全球购",
        url: "https://img10.360buyimg.com/jdphoto/s68x28_jfs/t19774/351/2377805112/2165/35f3b101/5af16e93N9cbb5d45.png",
        width: 68,
        height: 28
    },
    Global_ZY: {
        name: "全球购自营",
        url: "https://img10.360buyimg.com/jdphoto/s116x28_jfs/t16666/177/2434981533/3178/61e2c559/5af16e95N5f8bea61.png",
        width: 116,
        height: 28
    },
    Market_POP: {
        name: "京东超市",
        url: "https://img10.360buyimg.com/jdphoto/s102x28_jfs/t18574/246/2434089402/2368/8468a10d/5af16eeaNf0a0ea0f.png",
        width: 102,
        height: 28
    },
    Market_ZY: {
        name: "京东超市-自营",
        url: "https://img10.360buyimg.com/jdphoto/s151x28_jfs/t19630/150/2351597362/3374/878385d3/5af16eedNddb49362.png",
        width: 151,
        height: 28
    },
    Poverty_ZY: {
        name: "扶贫特产-自营",
        url: "https://img10.360buyimg.com/jdphoto/s135x28_jfs/t17893/153/2339644015/3435/664d9caf/5af16f02N7a033158.png",
        width: 135,
        height: 28
    },
    Poverty_POP: {
        name: "扶贫特产",
        url: "https://img10.360buyimg.com/jdphoto/s88x28_jfs/t17101/274/2341506818/2519/73b32d3f/5af16efeN76ebb5b8.png",
        width: 88,
        height: 28
    },
    Sam: {
        name: "山姆",
        url: "https://img10.360buyimg.com/jdphoto/s57x28_jfs/t19798/255/381638645/1777/71a20f4c/5af16f93N048903ff.png",
        width: 57,
        height: 28
    },
    Sam_express: {
        name: "山姆-京东配送",
        url: "https://img10.360buyimg.com/jdphoto/s148x28_jfs/t16675/36/2343853623/3876/cf5aef43/5af16fbaN08ead6c6.png",
        width: 148,
        height: 28
    },
    ZY: {
        name: "京东自营",
        url: "https://img10.360buyimg.com/jdphoto/s48x28_jfs/t16837/175/2336746342/1085/d4b6cf2c/5af16f73N5f0ce6d0.png",
        width: 48,
        height: 28
    },
    JD_express: {
        name: "京东配送",
        url: "https://img10.360buyimg.com/jdphoto/s98x28_jfs/t17173/65/2338433075/2662/c4af0771/5af16f69Nfeefdda0.png",
        width: 98,
        height: 28
    },
    LOC: {
        name: "到店服务",
        url: "https://img10.360buyimg.com/jdphoto/s110x28_jfs/t4549/11/4711942375/1439/f10da1dc/591400f5Nc755a218.png",
        width: 110,
        height: 28
    },
    OTC: {
        name: "药品",
        url: "https://img10.360buyimg.com/jdphoto/s48x28_jfs/t16924/322/2320753884/1420/f6a4a454/5af16f82N4dacefa1.png",
        width: 48,
        height: 28
    }
}, m = {
    babelUrls: [ /pro\.m\.jd\.com\/mall\/active\/\S+\/index\.html/, /pro\.m\.jd\.com\/wq\/active\/\S+\/index\.html/, /pro\.m\.jd\.com\/mall\/event\/\S+\/index\.html/, /pro\.m\.jd\.com\/wq\/event\/\S+\/index\.html/, /h5\.m\.jd\.com\/active\/\S+\/index\.html/, /h5\.m\.jd\.com\/wq\/active\/\S+\/index\.html/, /h5\.m\.jd\.com\/event\/\S+\/index\.html/, /h5\.m\.jd\.com\/wq\/event\/\S+\/index\.html/ ],
    JshopUrls: [ /sale\.jd\.com\/act\/\w+\.html/, /sale\.jd\.com\/m\/act\/\w+\.html/, /sale\.jd\.com\/app\/act\/\w+\.html/, /sale\.jd\.com\/wq\/act\/\w+\.html/, /sale\.jd\.hk\/app\/act\/\w+\.html/, /sale\.jd\.hk\/m\/act\/\w+\.html/ ],
    wqUrls: [ /wq\.jd\.com\/mshop\/gethomepage\?\S*?venderId=(\d+)/ ],
    PCDetail: [ /item\.jd\.com\/(\d+)\.html/, /item\.jd\.hk\/(\d+)\.html/, /item\.yiyaojd\.com\/(\d+)\.html/ ],
    MDetail: [ /m\.jd\.com\/product\/(\d+)\.html/, /m\.jd\.com\/ware\/view\.action\?\S*?wareId=(\d+)/, /item\.m\.jd\.com\/product\/(\d+)\.html/, /item\.m\.jd\.com\/ware\/view\.action\?\S*?wareId=(\d+)/, /m\.yiyaojd\.com\/ware\/view\.action\?\S*?wareId=(\d+)/, /m\.yiyaojd\.com\/product\/(\d+)/, /mitem\.jd\.hk\/product\/(\d+)\.html/, /mitem\.jd\.hk\/ware\/view\.action\?\S*?wareId=(\d+)/ ],
    WQDetail: [ /wqitem\.jd\.com\/item\/view\?\S*?sku=(\d+)/, /wqitem\.jd\.hk\/item\/view\?\S*?sku=(\d+)/, /wq\.jd\.com\/item\/view\?\S*?sku=(\d+)/, /wqitem\.jd\.com\/item\/view\?\S*?sku=(\d+)/, /wqmitem\.jd\.com\/item\/view\?\S*?sku=(\d+)/ ]
};

module.exports = {
    TITLE_ICONS: t,
    REObj: m
};