var e = require("../../../../common/fe_helper.js");

module.exports = function(r) {
    var t = Object.assign({}, r);
    return t.postTime = t.creationTime.substr(0, 10), t.skuDesc = (t.productColor + " " + t.productSize).trim(), 
    t.thumbs = t.images ? t.images.map(function(r) {
        var t = r.imgUrl.replace(/\/n\d{1,2}\//i, "/n8/");
        return e.getImg(t, 200, 400);
    }) : [], t;
};