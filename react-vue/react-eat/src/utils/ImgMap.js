const image_biz_orderlist = "0";
const image_biz_productlist = "0";
const image_biz_productdetail = "1";
const image_biz_category = "2";

const image_init_index = 1;

String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

let ImageMap = {
    getImage: function (pid, index, biz, code, itype) {
        let ft = "https://image.ueater.com/{0}/{1}/{2}_{3}_{4}_{5}.{6}";
        let url = ft.format(pid % 99, pid % 37, pid, index, biz, code, itype)
        return url;
        // "http://img-dev.ueater.local:8080/6/36/1590_1_0_N_W.jpg".format();
    },
    getImageUrlForOrder: function (pid) {
        let url = this.getImage(pid, image_init_index, image_biz_orderlist, "N", "jpg");
        return url;
    },
    getImageUrlForCategory: function (pid) {
        let url = this.getImage(pid, image_init_index, image_biz_category, "N", "jpg");
        return url;
    },
    getImageUrlForProductList: function (pid) {
        let url = this.getImage(pid, image_init_index, image_biz_productlist, "L", "jpg");
        return url;
    },
    getImageUrlForProductBanner: function (pid, index) {
        let url = this.getImage(pid, index, image_biz_productlist, "N", "jpg");
        return url;
    },
    getImageUrlForProductContent: function (pid, index) {
        let url = this.getImage(pid, index, image_biz_productdetail, "N", "jpg");
        return url;
    }
}

export default ImageMap;





