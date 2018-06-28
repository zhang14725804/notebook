var mapi = {

    "my": {
        "baseinfo": {
            "path": "/mstation/member/baseInfo",
            "method": "GET",
            "query": "",
            "result": ""
        },
        "login": {
            "path": "/mstation/member/login",
            "method": "POST",
            "body": "mobile,verifyCode,mergeType",
            "result": ""
        },
        "getcode": {
            "path": "/mstation/member/verifyCode",
            "method": "GET",
            "query": "mobile",
            "result": ""
        },
        "getOrderList": {
            "path": "/mstation/order/listasyn",
            "method": "GET",
            "query": "type=5&pageCount=5&currentPage=1"
        },
        "getAddressList": {
            "path": "/mstation/addressBook/list",
            "method": "GET",
            "query": ""
        },
        "addNewAddr": {
            "path": "/mstation/addressBook/book",
            "method": "POST",
            "query": ""
        },
        "delAddr": {
            "path": "/mstation/addressBook/book",
            "method": "get",
            "query": "id"
        },
        "coupon": {
            "path": "/mstation/coupon/queryCoupon",
            "method": "get",
            "query": "status"
        },
        "getPointCount": {
            "path": "/mstation/credits/count",
            "method": "get",
            "query": ""
        },
        "getPointDetail": {
            "path": "/mstation/credits/detail",
            "method": "get",
            "query": ""
        }
    },
    "product": {
        "getCategory": {
            "path": "/mstation/product/industryCategoryList",
            "method": "get",
            "query": "parentId=0&depth=4"
            //https://m.ueater.com/mstation/product/industryCategoryList?parentId=0&depth=4
        },
        "getProductList": {
            "path": "/mstation/product/industryCategoryCatIdList/{0}/list",
            "method": "get",
            "query": "parentId=0&depth=4"
            //https://m.ueater.com/mstation/product/industryCategoryCatIdList/1010/list?state=2&pageCount=10&currentPage=1&categoryId=1010
            //https://m.ueater.com/mstation/product/industryCategoryCatIdList/1010/list?state=2&pageCount=10&currentPage=2&categoryId=1010
        },
        "getProductBaseinfo": {
            "path": "/mapi/product/{0}/baseInfo/?",
            "method": "get",
            "query": ""
        },
        "getProductDetail": {
            "path": "/mapi/product/detail",
            "method": "get",
            "query": "productId"
        }
    }
}

export default mapi;